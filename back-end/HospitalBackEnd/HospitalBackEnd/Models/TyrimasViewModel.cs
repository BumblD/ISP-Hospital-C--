using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HospitalBackEnd.Models
{
    public class TyrimasViewModel
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public string Komentaras { get; set; }
        public int Tipas { get; set; }
        public int GydytojasID { get; set; }
        public int PacientasID { get; set; }
        public int PatalpaID { get; set; }
    }
}
