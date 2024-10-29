//using Microsoft.AspNetCore.Mvc;

//namespace APIforReact.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class WordsController : ControllerBase
//    {
//        private static readonly string[] TheWords = new[]
//        {
//            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
//        };

//        private readonly ILogger<WordsController> _logger;

//        public WordsController(ILogger<WordsController> logger)
//        {
//            _logger = logger;
//        }

//        [HttpGet(Name = "Get Words")]
//        public IEnumerable<NumberRequest> GetWeatherForecast()
//        {
//            return Enumerable.Range(1, 5).Select(index => new NumberRequest
//            {
//                //Words = TheWords[Random.Shared.Next(TheWords.Length)]
//            })
//            .ToArray();
//        }
//    }
//}
