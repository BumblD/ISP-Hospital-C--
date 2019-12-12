using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalBackEnd.Models
{
    public class VizitasViewModel
    {
        public int ID { get; set; }
        public DateTime Data { get; set; }
        public int Laikas_val { get; set; }
        public int Laikas_min { get; set; }
        public string Nusiskundimas { get; set; }
        public bool Patvirtinimas { get; set; }
        public string Gydytojas { get; set; }
        public int GydytojasID { get; set; }
        public string Pacientas { get; set; }
        public int PacientasID { get; set; }
    }
}
