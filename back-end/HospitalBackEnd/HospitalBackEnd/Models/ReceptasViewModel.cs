using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HospitalBackEnd.Models
{
    public class SiuntimasViewModel
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public string Komentaras { get; set; }
        public int Specialistas { get; set; }
        public int PacientasID { get; set; }
        public int GydytojasID { get; set; }
    }
}
