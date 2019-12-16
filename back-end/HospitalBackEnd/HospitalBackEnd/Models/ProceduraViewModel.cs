using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HospitalBackEnd.Models
{
    public class ProceduraViewModel
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public int Kiekis { get; set; }
        public string Komentaras { get; set; }
        public int Procedura { get; set; }
        public int GydytojasID { get; set; }
        public int PatalpaID { get; set; }
        public int PacientasID { get; set; }
        
    }
}
