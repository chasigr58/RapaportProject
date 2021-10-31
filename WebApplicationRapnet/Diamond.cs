using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationRapnet
{
    public class Diamond
    {
        public static int length { get; internal set; }
        [Required]
        public string Shape { get; set; }
        [Required]
        public decimal Size { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public string Clarity { get; set; }
        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }
        [Range(0.01, double.MaxValue)]
        public decimal ListPrice { get; set; }
      

    }
}
