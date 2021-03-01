using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Services
{
    public interface ICourierService
    {
        public Task<object> GetLandmarks();
        public Task<object> AddLandmark(LandmarkEntity landmarkEntity);
    }
}
