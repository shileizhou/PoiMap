using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PoiMap.Models;


namespace PoiMap.Controllers
{
    public class PoisController : ApiController
    {
        // GET api/<controller>

        //public IEnumerable<Pois> Get()
        //{
        //    PoisOps poisInst;
        //    poisInst = new PoisOps();

        //    var myObjectResponse = poisInst.GetPoi("ChIJ9wzTpBhawokRWLkRYU6k64E");

        //    return new Pois[] { myObjectResponse };

        //        //return new string[] { "value1", "value2" };
        //}

        //GET api/<controller>/5
        public Pois Get([FromUri]string Id)
        {
            PoisOps poisInst;
            poisInst = new PoisOps();

            Pois myObjectResponse = poisInst.GetPoi(Id);

            return myObjectResponse;
        }

        //[System.Web.Http.HttpGet]
        //public HttpResponseMessage GetPois([FromBody]string Id)
        //{
        //    PoisOps poisInst;
        //    poisInst = new PoisOps();

        //    Pois myObjectResponse = poisInst.GetPoi(Id);

        //    //return myObjectResponse;

        //    // in your case this will be result of some service method and then
        //    if (myObjectResponse == null)
        //        return Request.CreateResponse(HttpStatusCode.NotFound);

        //    return Request.CreateResponse(HttpStatusCode.OK, myObjectResponse);
        //}

        // POST api/<controller>
        public string Post([FromBody] Pois value)
        {
            PoisOps poisInst;
            poisInst = new PoisOps();

            return poisInst.InsertPoi(value);

        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}