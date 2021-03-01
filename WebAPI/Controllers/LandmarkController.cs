using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class LandmarkController : ControllerBase
    {

        public LandmarkController(ICourierService courierService)
        {
            _courierService = courierService;
        }

        private readonly ICourierService _courierService;

        /// <summary>
        /// Gets the landmarks.
        /// </summary>
        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var reponse = await _courierService.GetLandmarks();
            return this.Ok(reponse);

        }

        /// <summary>
        /// Add the landmark data
        /// </summary>
        [HttpPost()]
        public async Task<IActionResult> AddLandmark([FromBody] LandmarkEntity landmarkEntity)
        {
            var reponse = await _courierService.AddLandmark(landmarkEntity);
            return this.Ok(reponse);

        }
    }
}
