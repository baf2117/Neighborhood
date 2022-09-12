namespace neighborhood
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Primitives;

    class OkObjectResultWithHeaders : OkObjectResult
    {
        IReadOnlyDictionary<string, StringValues> headers;
        public OkObjectResultWithHeaders(object value, IReadOnlyDictionary<string, StringValues> headers) : base(value)
        {
            this.headers = headers;
        }

        public override void ExecuteResult(ActionContext context)
        {
            AddHeaders(context.HttpContext.Response.Headers);
            base.ExecuteResult(context);
        }

        public override Task ExecuteResultAsync(ActionContext context)
        {
            AddHeaders(context.HttpContext.Response.Headers);
            return base.ExecuteResultAsync(context);
        }

        private void AddHeaders(IHeaderDictionary responseHeader)
        {
            foreach (var header in this.headers)
            {
                responseHeader.Add(header.Key, header.Value);
            }
        }
    }

}