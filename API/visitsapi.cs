using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Twilio;

namespace neighborhood
{
    class visitsapi
    {
        IRepository<Visits> _RepositoryVisits;
        IRepository<Profile> _RepositoryProfile;
        string bloburl;
        string blobname;
        string PublicKey;
        string PrivateKey;
        string twiliouser;
        string twiliopassword;
        string twilionumber;
        string baseUrl;

        public visitsapi(IRepository<Visits> repositoryVisits, IConfiguration configuration, IRepository<Profile> repositoryProfile)
        {
            _RepositoryVisits = repositoryVisits;
            _RepositoryProfile = repositoryProfile;
            bloburl = configuration.GetValue<string>("storage");
            blobname = configuration.GetValue<string>("storageblob");
            PublicKey = configuration.GetValue<string>("PublicKey");
            PrivateKey = configuration.GetValue<string>("PrivateKey");
            twiliouser = configuration.GetValue<string>("TwilioUserName");
            twiliopassword = configuration.GetValue<string>("TwilioPassword");
            twilionumber = configuration.GetValue<string>("TwilioNumber");
            baseUrl = configuration.GetValue<string>("baseUrl");
        }


        [FunctionName("visits_get_all")]
        public async Task<IActionResult> GetAll(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "visits")] HttpRequest req,
             ILogger log)
        {
            string rangeQuery = req.Query["range"];
            var range = rangeQuery.Substring(1, rangeQuery.Length - 2).Split(",");
            var skip = int.Parse(range[0]);
            var take = int.Parse(range[1]);
            var pageSize = (int.Parse(range[1]) - skip) + 1;

            var profile = _RepositoryProfile.Get().Where(p => p.UserId == req.Headers["user"][0]).FirstOrDefault();

            var visits = await _RepositoryVisits.Get()
               .Where(r => r.ProfileId == profile.Id)
               .OrderByDescending(x => x.Created)
               .ToArrayAsync();

            int datalength = visits.Length;

            visits = visits
                .Skip(skip)
                .Take(pageSize)
                .ToArray();

            foreach (var item in visits)
            {
                item.Created = item.Created.AddHours(-6);
            }

            IReadOnlyDictionary<string, StringValues> headers = new Dictionary<string, StringValues>
                {
                    {"Content-Range", $"range {skip}-{pageSize}/{datalength}"},
                    {"Access-Control-Expose-Headers", "Content-Range"},
                };

            return new OkObjectResultWithHeaders(visits, headers);
        }


        [FunctionName("visits_get")]
        public async Task<IActionResult> Get([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "visits/{id}")] HttpRequest req,
            ILogger log,
            Guid id)
        {
            var visits = _RepositoryVisits.GetById(id);

            if (visits == null)
                return new NotFoundResult();

            return new OkObjectResult(visits);
        }

        [FunctionName("visits_update")]
        public async Task<IActionResult> UpdateVisits([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "visits/{id}")] HttpRequest req,
         ILogger log, Guid id, ExecutionContext context)
        {

            string body = await new StreamReader(req.Body).ReadToEndAsync();

            var model = System.Text.Json.JsonSerializer.Deserialize<VisitsUpdateModel>(body);

            var visits = _RepositoryVisits.GetById(id);

            if (visits == null)
            {
                return new BadRequestObjectResult("Perfil no encontrado");
            }

            visits.Name = model.Name;
            visits.Phone = model.Phone;
            //visits.Date = model.Date,
            visits.DPI = visits.DPI;

            _RepositoryVisits.Update(visits);

            return new OkObjectResult(visits);
        }

        [FunctionName("visits_update_admin")]
        public async Task<IActionResult> UpdateVisitsAdmin([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "visits/admin/{id}")] HttpRequest req,
            ILogger log, Guid id, ExecutionContext context)
        {
            string body = await new StreamReader(req.Body).ReadToEndAsync();

            var model = System.Text.Json.JsonSerializer.Deserialize<VisitsUpdateModel>(body);

            var visits = _RepositoryVisits.GetById(id);

            if (visits == null)
            {
                return new BadRequestObjectResult("Perfil no encontrado");
            }

            visits.Name = model.Name;
            visits.Phone = model.Phone;
            //visits.Date = model.Date,
            visits.DPI = visits.DPI;

            _RepositoryVisits.Update(visits);

            return new OkObjectResult(visits);
        }

        [FunctionName("visits_get_alladmin")]
        public async Task<IActionResult> GetAllAdmin(
                    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "visitsadmin")] HttpRequest req,
                    ILogger log)
        {
            string rangeQuery = req.Query["range"];
            var range = rangeQuery.Substring(1, rangeQuery.Length - 2).Split(",");
            var skip = int.Parse(range[0]);
            var take = int.Parse(range[1]);
            var pageSize = (int.Parse(range[1]) - skip) + 1;

            var visits = await _RepositoryVisits.Get()
                .Include(x => x.Profile)
                .OrderByDescending(x => x.Created)
                .ToArrayAsync();

            int datalength = visits.Length;

            visits = visits
                .Skip(skip)
                .Take(pageSize)
                .ToArray();

            foreach (var item in visits)
            {
                item.Created = item.Created.AddHours(-6);
            }

            IReadOnlyDictionary<string, StringValues> headers = new Dictionary<string, StringValues>
                {
                    {"Content-Range", $"range {skip}-{pageSize}/{datalength}"},
                    {"Access-Control-Expose-Headers", "Content-Range"},
                };

            return new OkObjectResultWithHeaders(visits, headers);
        }

        [FunctionName("visits_post")]
        public async Task<ActionResult> Post(
     [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "visits")] HttpRequest req,
     ILogger log)
        {
            try
            {
                string body = await new StreamReader(req.Body).ReadToEndAsync();

                var model = System.Text.Json.JsonSerializer.Deserialize<VisitsModel>(body);

                var profile = _RepositoryProfile.Get().Where(p => p.UserId == req.Headers["user"][0]).FirstOrDefault();

                var flags = FlagtoFlags(profile.Flags);

                if (!flags.Item1)
                {
                    return new BadRequestObjectResult(new { error = "Unser inactive" });
                }

                var visits = new Visits()
                {
                    Name = model.Name,
                    Date = model.Date,
                    ProfileId = profile.Id,
                    DPI = model.DPI,
                    Phone = model.Phone
                };

                _RepositoryVisits.Insert(visits);

                TwilioClient.Init(twiliouser, twiliopassword);
                try
                {
                    var result = await Twilio.Rest.Api.V2010.Account.MessageResource.CreateAsync(
                        body: $"hola {model.Name}, en el siguiente link puedes encontrar tu pase de vista:  {baseUrl}/Access/{visits.Id}",
                        from: new Twilio.Types.PhoneNumber(twilionumber),
                        to: new Twilio.Types.PhoneNumber("whatsapp:" + visits.Phone)
                    );

                    if (result.ErrorCode != null)
                    {
                        return new BadRequestObjectResult(new { error = "No se ha podido enviar el mensaje al cliente, revise el numero telefónico" });
                    }


                    //Console.WriteLine(message.Body);
                }
                catch (Exception e)
                {
                    return new BadRequestObjectResult(new { error = "No se ha podido enviar el mensaje al cliente, revise el numero telefónico" });
                }

                // result.Sid
                return new OkObjectResult(new { id = visits.Id });
            }
            catch (Exception e)
            {
                log.LogInformation(e.ToString());
                return new BadRequestObjectResult(new { error = e.Message });
            }

        }

        public (bool, bool) FlagtoFlags(int flag)
        {
            int[] flags = new int[2];

            for (var i = 0; flag > 0; i++)
            {
                flags[i] = flag % 2;
                flag = flag / 2;
            }

            return (flags[0] == 1, flags[1] == 1);
        }


    }
}