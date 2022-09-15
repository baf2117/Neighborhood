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
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
namespace neighborhood
{
    class notificationsapi
    {
        IRepository<Notifications> _RepositoryNotifications;
        IRepository<Profile> _RepositoryProfile;
        string bloburl;
        string blobname;
        string PublicKey;
        string PrivateKey;
        string twiliouser;
        string twiliopassword;
        string twilionumber;
        string baseUrl;

        public notificationsapi(IRepository<Notifications> repositoryNotifications, IConfiguration configuration, IRepository<Profile> repositoryProfile)
        {
            _RepositoryNotifications = repositoryNotifications;
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


        [FunctionName("notifications_get_all")]
        public async Task<IActionResult> GetAll(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "notifications")] HttpRequest req,
             ILogger log)
        {
            string rangeQuery = req.Query["range"];
            var range = rangeQuery.Substring(1, rangeQuery.Length - 2).Split(",");
            var skip = int.Parse(range[0]);
            var take = int.Parse(range[1]);
            var pageSize = (int.Parse(range[1]) - skip) + 1;

            var profile = _RepositoryProfile.Get().Where(p => p.UserId == req.Headers["user"][0]).FirstOrDefault();

            var notifications = await _RepositoryNotifications.Get()
               .Where(r => r.ProfileId == profile.Id)
               .OrderByDescending(x => x.Created)
               .ToArrayAsync();

            int datalength = notifications.Length;

            notifications = notifications
                .Skip(skip)
                .Take(pageSize)
                .ToArray();

            foreach (var item in notifications)
            {
                item.Created = item.Created.AddHours(-6);
            }

            IReadOnlyDictionary<string, StringValues> headers = new Dictionary<string, StringValues>
                {
                    {"Content-Range", $"range {skip}-{pageSize}/{datalength}"},
                    {"Access-Control-Expose-Headers", "Content-Range"},
                };

            return new OkObjectResultWithHeaders(notifications, headers);
        }


        [FunctionName("notifications_get")]
        public async Task<IActionResult> Get([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "notifications/{id}")] HttpRequest req,
            ILogger log,
            Guid id)
        {
            var notifications = _RepositoryNotifications.GetById(id);

            if (notifications == null)
                return new NotFoundResult();

            return new OkObjectResult(notifications);
        }

        [FunctionName("notifications_get_admin")]
        public async Task<IActionResult> GetAdminNotification(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "notificationsadmin/{id}")] HttpRequest req,
            ILogger log, Guid id)
        {
            try
            {
                var notifications = _RepositoryNotifications.GetById(id);

                if (notifications == null)
                    return new NotFoundResult();

                return new OkObjectResult(notifications);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e);
            }
        }

        [FunctionName("notifications_get_alladmin")]
        public async Task<IActionResult> GetAllAdmin(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "notificationsadmin")] HttpRequest req,
             ILogger log)
        {
            string rangeQuery = req.Query["range"];
            var range = rangeQuery.Substring(1, rangeQuery.Length - 2).Split(",");
            var skip = int.Parse(range[0]);
            var take = int.Parse(range[1]);
            var pageSize = (int.Parse(range[1]) - skip) + 1;


            var notifications = await _RepositoryNotifications.Get()
               .Include(x => x.Profile)
               .OrderByDescending(x => x.Created)
               .ToArrayAsync();

            int datalength = notifications.Length;

            notifications = notifications
                .Skip(skip)
                .Take(pageSize)
                .ToArray();

            foreach (var item in notifications)
            {
                item.Created = item.Created.AddHours(-6);
            }

            IReadOnlyDictionary<string, StringValues> headers = new Dictionary<string, StringValues>
                {
                    {"Content-Range", $"range {skip}-{pageSize}/{datalength}"},
                    {"Access-Control-Expose-Headers", "Content-Range"},
                };

            return new OkObjectResultWithHeaders(notifications, headers);
        }

        [FunctionName("notification_post")]
        public async Task<ActionResult> Post(
          [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "notifications")] HttpRequest req,
          ILogger log)
        {
            try
            {
                string body = await new StreamReader(req.Body).ReadToEndAsync();

                var model = System.Text.Json.JsonSerializer.Deserialize<NotificationModel>(body);

                var profile = _RepositoryProfile.Get().Where(p => p.UserId == req.Headers["user"][0]).FirstOrDefault();

                var flags = FlagtoFlags(profile.Flags);

                if (!flags.Item1)
                {
                    return new BadRequestObjectResult(new { error = "Unser inactive" });
                }

                var notification = new Notifications()
                {
                    Description = model.Description,
                    ProfileId = profile.Id,
                };

                _RepositoryNotifications.Insert(notification);

                return new OkObjectResult(new { id = notification.Id });
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