using System;
using System.Collections.Generic;

namespace WebAPI.DbEntities
{
    public partial class LandmarkDatum
    {
        public int LandmarkId { get; set; }
        public string LandmarkName { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string ContactNumber { get; set; }
        public int PointOrder { get; set; }
        public double Distance { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
