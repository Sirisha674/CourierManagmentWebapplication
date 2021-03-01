using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DbEntities;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class CourierService : ICourierService
    {
        public async Task<object> GetLandmarks()
        {
            await using (CourierDbContext courierDbContext = new CourierDbContext())
            {
                var data = courierDbContext.LandmarkData.Select(x => new { 
                    Id = x.PointOrder,
                    Name = x.LandmarkName,
                    Address = x.Address,
                    PointOrder = x.PointOrder,
                    Distance = x.Distance
                }).ToList();
                return data;
            }
        }

        public async Task<object> AddLandmark(LandmarkEntity landmarkEntity)
        {
            var dist = CalculateDistance(landmarkEntity.Latitude, landmarkEntity.Longitude);
            if (dist == 0)
                return new { Message = "Latitude and Longtitude is matches with the Headquaters. Please modify and try once again." };
            if (dist < 1000)
                return new { Message = "Distance is " + dist.ToString() +" but it should be greater than 1000 meters. please try again." };
            var res = await InsertData(landmarkEntity);
            return res;
        }

        public async Task<object> DeleteData()
        {
            await using (CourierDbContext courierDbContext = new CourierDbContext())
            {
                var all = from c in courierDbContext.LandmarkData select c;
                courierDbContext.LandmarkData.RemoveRange(all);
                courierDbContext.SaveChanges();
                return new { Message = "Deleted succesfully."};
            }
        }
        public async Task<object> InsertData(LandmarkEntity landmarkEntity)
        {
            await using (CourierDbContext courierDbContext = new CourierDbContext())
            {
                var dist = CalculateDistance(landmarkEntity.Latitude, landmarkEntity.Longitude);
                LandmarkDatum landmarkDatum = new LandmarkDatum()
                {
                    LandmarkName = landmarkEntity.Name,
                    Address = landmarkEntity.Address,
                    Latitude = landmarkEntity.Latitude,
                    Longitude = landmarkEntity.Longitude,
                    ContactNumber = landmarkEntity.Phonenumber,
                    PointOrder = 1,
                    Distance = dist,
                    CreatedDate = DateTime.Now
                };
                var data = courierDbContext.LandmarkData.Select(x => new LandmarkDatum()
                {
                    LandmarkName = x.LandmarkName,
                    Address = x.Address,
                    Latitude = x.Latitude,
                    Longitude = x.Longitude,
                    ContactNumber = x.ContactNumber,
                    PointOrder = x.PointOrder,
                    Distance = x.Distance,
                    CreatedDate = x.CreatedDate
                }).ToList();

                if (data.Count > 0)
                    await DeleteData();

                data.Add(landmarkDatum);
                var sortedData = data.OrderBy(x => x.Distance).ToList();
                
                foreach(var (value, index) in sortedData.Select((v, i) => (v, i)))
                {
                    value.PointOrder = index+1;
                    courierDbContext.LandmarkData.Add(value);
                    await courierDbContext.SaveChangesAsync();
                }
                return new { Message = "Landmark added successfuly."};
            }
        }

        public double CalculateDistance(double lat2, double lon2)
        {
            using (CourierDbContext courierDbContext = new CourierDbContext())
            {
                var data = courierDbContext.Headquarters.Where(x => x.Name == "Hq1").Select(x => x).FirstOrDefault();
                double lat1 = data.Latitude;
                double lon1 = data.Longtitude;

                if ((lat1 == lat2) && (lon1 == lon2))
                {
                    return 0;
                }
                else
                {
                    double theta = lon1 - lon2;
                    double dist = Math.Sin(deg2rad(lat1)) * Math.Sin(deg2rad(lat2)) + Math.Cos(deg2rad(lat1)) * Math.Cos(deg2rad(lat2)) * Math.Cos(deg2rad(theta));
                    dist = Math.Acos(dist);
                    dist = rad2deg(dist);
                    dist = dist * 60 * 1.1515;
                    return (dist);
                }
            }
        }


        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //::  This function converts decimal degrees to radians             :::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        private double deg2rad(double deg)
        {
            return (deg * Math.PI / 180.0);
        }

        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //::  This function converts radians to decimal degrees             :::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        private double rad2deg(double rad)
        {
            return (rad / Math.PI * 180.0);
        }


    }
}
