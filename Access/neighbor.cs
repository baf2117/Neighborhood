using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Globalization;
using System.Collections.Specialized;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Data.SqlClient;
using System.Data;

namespace neighborhood
{
    class neighbor
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
        RazorViewToStringRenderer _RazorViewToStringRenderer;
        public neighbor(IRepository<Visits> repositoryVisits, IConfiguration configuration, 
        IRepository<Profile> repositoryProfile,
        RazorViewToStringRenderer razorViewToStringRenderer)
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
            _RazorViewToStringRenderer = razorViewToStringRenderer;
        }


        // Esta funcion de vuelve la pagina de pagos
        [FunctionName("Access")]
        public async Task<HttpResponseMessage> Complement(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Access/{id}")] HttpRequest req, Guid id, ILogger log, ExecutionContext context)
        {
            try
            {
                var visit = _RepositoryVisits.GetById(id);

                var templateModel = new neighborhood.Views.AccessInfoTemplateModel()
                {
                    DPI = visit.DPI,
                    Date = visit.Date.ToShortDateString(),
                    Phone = visit.Phone,
                    Name = visit.Name,
                    Address = visit.Profile.Address
                };

                var htmlContent = await _RazorViewToStringRenderer.RenderViewToStringAsync(templateModel);


                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(htmlContent);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
                return response;
            }
            catch (Exception e)
            {
                var errorModel = new neighborhood.Views.ErrorPaymentTemplateModel();
                var htmlContent = await _RazorViewToStringRenderer.RenderViewToStringAsync(errorModel);
                var responseerror = new HttpResponseMessage(HttpStatusCode.OK);
                responseerror.Content = new StringContent(htmlContent);
                responseerror.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
                return responseerror;
            }
        }
    }
}