using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HospitalBackEnd.Models
{
    public class ReceptasViewModel
    {
        public int Id { get; set; }
        public string Israsymo_data { get; set; }
        public int Laikotarpis_d { get; set; }
        public int Doze_d { get; set; }
        public string Komentaras { get; set; }
        public string Nuolaida { get; set; }
        public int GydytojasID { get; set; }
        public int VaistasID { get; set; }
        public int PacientasID { get; set; }
        
    }
}
