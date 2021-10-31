using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text;

namespace WebApplicationRapnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiamondController : ControllerBase
    {
        private readonly ILogger<DiamondController> _logger;

        public DiamondController(ILogger<DiamondController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Diamond> Get(int pageNumber=0, int pageSize=3)
        {
            List<Diamond> values = System.IO.File.ReadLines("Diamonds.csv")
                                            .Skip(1)
                                            //.Skip(pageNumber * pageSize)
                                            //.Take(pageSize)
                                            .Select(v => GetDiamondValueFromCsv(v))
                                            .ToList();

            return values;
        }
        [HttpPost]
        public ActionResult<Diamond> AddDimond([FromBody] Diamond diamond)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            StringBuilder sb = new StringBuilder();

            sb.Append($"{diamond.Shape},");
            sb.Append($"{diamond.Size},");
            sb.Append($"{diamond.Color},");
            sb.Append($"{diamond.Clarity},");
            sb.Append($"{diamond.Price},");
            sb.Append($"{diamond.ListPrice}");
            AddDiamondToCsv(sb.ToString());

            return Ok(diamond);
        }



        private void AddDiamondToCsv(string str)
        {
            System.IO.File.AppendAllLines("Diamonds.csv", new List<string>() { str });
        }

        private Diamond GetDiamondValueFromCsv(string csvLine)
        {
           
            string[] values = csvLine.Split(',');
            var diamond = new Diamond()
            {
                Shape = values[0],
                Size = Convert.ToDecimal(values[1]),
                Color = values[2],
                Clarity = values[3],
                Price = Convert.ToDecimal(values[4]),
                ListPrice = Convert.ToDecimal(values[5])
            };
            return diamond;
        }
    }
}
