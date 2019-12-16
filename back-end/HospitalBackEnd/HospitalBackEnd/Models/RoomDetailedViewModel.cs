using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalBackEnd.Models
{
    public class RoomDetailedViewModel
    {
        public int Number { get; set; }
        public string Address { get; set; }
        public List<string> Patients { get; set; }
        public string Doctor { get; set; }
        public string Procedure { get; set; }
    }
}
