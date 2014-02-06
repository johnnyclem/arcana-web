using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Arcana.Web.Controllers
{
    public class BaseApiController : ApiController
    {
        protected HttpResponseMessage Success(object payload = null)
        {
            return Request.CreateResponse(HttpStatusCode.OK, payload);
        }

        protected HttpResponseMessage Error()
        {
            return Error(string.Empty);
        }

        protected HttpResponseMessage Error(string message)
        {
            return Error(HttpStatusCode.BadRequest, message);
        }

        protected HttpResponseMessage Error(HttpStatusCode statusCode, string message)
        {
            return Request.CreateResponse(statusCode, message);
        }
    }
}