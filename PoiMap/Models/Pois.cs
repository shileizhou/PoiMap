using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PoiMap.Models
{
    public class Pois
    {

        public string PlaceId { get; set; }
        public string PlaceName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public decimal Longtitude { get; set; }
        public decimal Latitude { get; set; }
        public decimal Altitude { get; set; }
        public string Icon { get; set; }
        public string MainPhoto { get; set; }
        public string Video { get; set; }
        public string Wiki { get; set; }
        public string ARName { get; set; }
        public string ARPhoto { get; set; }
        public string Website { get; set; }
    
    }

}
}