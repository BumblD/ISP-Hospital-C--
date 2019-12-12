using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalBackEnd.Models
{
    public class DaktarasViewModel
    {
        public int ID { get; set; }
        public string Vardas { get; set; }
        public string Pavarde { get; set; }
        public string Specializacija { get; set; }
    }
}
