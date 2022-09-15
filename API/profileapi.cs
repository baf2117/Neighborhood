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
using Microsoft.Extensions.Primitives;

namespace neighborhood
{
    class profileapi
    {
        IRepository<Profile> _RepositoryProfile;
        string bloburl;
        string blobname;
        string PublicKey;
        string PrivateKey;

        public profileapi(IRepository<Profile> repositoryProfile, IConfiguration configuration)
        {
            _RepositoryProfile = repositoryProfile;
            bloburl = configuration.GetValue<string>("storage");
            blobname = configuration.GetValue<string>("storageblob");
            PublicKey = configuration.GetValue<string>("PublicKey");
            PrivateKey = configuration.GetValue<string>("PrivateKey");
        }

        [FunctionName("profile_get")]
        public async Task<IActionResult> Get([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profile/{id}")] HttpRequest req,
            ILogger log,
            string id, ExecutionContext context)
        {
            var profile = _RepositoryProfile.Get().Where(p => p.UserId == id).FirstOrDefault();

            if (profile == null)
                return new NotFoundResult();

            var flags = FlagtoFlags(profile.Flags);

            var response = new
            {
                Id = profile.Id,
                UserId = profile.UserId,
                Created = profile.Created,
                Address = profile.Address,
                Email = profile.Email,
                Enable = flags.Item1,
                Admin = flags.Item2,
                Phone = profile.Phone,
                Name = profile.Name,
                LastName = profile.LastName
            };

            return new OkObjectResult(response);
        }

        [FunctionName("profile_get_byauth0id")]
        public async Task<IActionResult> ValidateAuth0User([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "auth0/{id}")] HttpRequest req,
            ILogger log,
            string id)
        {
            try
            {
                var profile = _RepositoryProfile.Get().Where(p => p.UserId == id).FirstOrDefault();

                if (profile == null)
                {
                    Profile p = new Profile()
                    {
                        UserId = id,
                        Flags = 0,
                        Name = "",
                        LastName = "",
                        Address = "",
                        Email = "",
                        Phone = "",
                    };

                    _RepositoryProfile.Insert(p);
                }

                return new OkResult();
            }
            catch (Exception e)
            {
                log.LogError(e.ToString());
                return new BadRequestResult();
            }
        }

        [FunctionName("profile_update")]
        public async Task<IActionResult> UpdateProfile([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "profile/{id}")] HttpRequest req,
         ILogger log, Guid id, ExecutionContext context)
        {

            string body = await new StreamReader(req.Body).ReadToEndAsync();

            var model = System.Text.Json.JsonSerializer.Deserialize<ProfileUpdateModel>(body);

            var profile = _RepositoryProfile.Get().Where(p => p.UserId == model.UserId).FirstOrDefault();

            if (profile == null)
            {
                return new BadRequestObjectResult("Perfil no encontrado");
            }

            profile.Name = model.Name;
            profile.LastName = model.LastName;
            profile.Address = model.Address;
            profile.Email = model.Email;
            profile.Phone = model.Phone;

            _RepositoryProfile.Update(profile);

            var flags = FlagtoFlags(profile.Flags);

            var response = new
            {
                Id = profile.Id,
                UserId = profile.UserId,
                Created = profile.Created,
                Address = profile.Address,
                Email = profile.Email,
                Enable = flags.Item1,
                Phone = profile.Phone,
                Name = profile.Name,
                LastName = profile.LastName
            };

            return new OkObjectResult(response);
        }

        [FunctionName("profile_update_admin")]
        public async Task<IActionResult> UpdateProfileAdmin([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "profilesadmin/{id}")] HttpRequest req,
            ILogger log, Guid id, ExecutionContext context)
        {
            string body = await new StreamReader(req.Body).ReadToEndAsync();

            var model = System.Text.Json.JsonSerializer.Deserialize<ProfileUpdateModel>(body);

            var profile = _RepositoryProfile.Get()
                .Where(p => p.UserId == model.UserId)
                .FirstOrDefault();

            var flag = 0;
            if (profile == null)
            {
                return new BadRequestObjectResult("Perfil no encontrado");
            }

            profile.Name = model.Name;
            profile.LastName = model.LastName;
            profile.Address = model.Address;
            profile.Email = model.Email;
            profile.Phone = model.Phone;

            flag += model.Enable ? 1 : 0;
            flag += model.Admin ? 2 : 0;

            profile.Flags = flag;

            _RepositoryProfile.Update(profile);

            var flags = FlagtoFlags(profile.Flags);

            var response = new
            {
                Id = profile.Id,
                UserId = profile.UserId,
                Created = profile.Created,
                Address = profile.Address,
                Email = profile.Email,
                Enable = flags.Item1,
                Admin = flags.Item2,
                Phone = profile.Phone,
                Name = profile.Name,
                LastName = profile.LastName
            };

            return new OkObjectResult(response);
        }

        [FunctionName("profile_get_admin")]
        public async Task<IActionResult> GetAdmin(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profilesadmin/{id}")] HttpRequest req,
            ILogger log, String id, ExecutionContext context)
        {
            try
            {
                var profile = _RepositoryProfile.Get()
                    .Where(p => p.Id == new Guid(id))
                    .FirstOrDefault();

                if (profile == null)
                {
                    return new NotFoundResult();
                }

                var flags = FlagtoFlags(profile.Flags);

                var response = new
                {
                    Id = profile.Id,
                    UserId = profile.UserId,
                    Created = profile.Created,
                    Address = profile.Address,
                    Email = profile.Email,
                    Enable = flags.Item1,
                    Admin = flags.Item2,
                    Phone = profile.Phone,
                    Name = profile.Name,
                    LastName = profile.LastName
                };

                return new OkObjectResult(response);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e);
            }
        }

        [FunctionName("profile_getall_admin")]
        public async Task<IActionResult> GetAllAdmin(
                   [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profilesadmin")] HttpRequest req,
             ILogger log)
        {
            try
            {
                string rangeQuery = req.Query["range"];
                var range = rangeQuery.Substring(1, rangeQuery.Length - 2).Split(",");
                var skip = int.Parse(range[0]);
                var take = int.Parse(range[1]);
                var pageSize = (int.Parse(range[1]) - skip) + 1;

                var profiles = _RepositoryProfile.Get()
                   .OrderByDescending(x => x.Created)
                   .ToArray();

                int datalength = profiles.Length;

                profiles = profiles
                    .Skip(skip)
                    .Take(pageSize)
                    .ToArray();

                foreach (var item in profiles)
                {
                    item.Created = item.Created.AddHours(-6);
                }

                IReadOnlyDictionary<string, StringValues> headers = new Dictionary<string, StringValues>
                {
                    {"Content-Range", $"range {skip}-{pageSize}/{datalength}"},
                    {"Access-Control-Expose-Headers", "Content-Range"},
                };

                return new OkObjectResultWithHeaders(profiles, headers);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e);
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