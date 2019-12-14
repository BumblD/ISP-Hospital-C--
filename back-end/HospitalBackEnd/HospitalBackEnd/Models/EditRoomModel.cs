using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalBackEnd.Models
{
    public class EditRoomModel
    {
        public int Number { get; set; }
        public double Area { get; set; }
        public int Size { get; set; }
        public int TypeId { get; set; }
        public string Address { get; set; }
        public string Patients { get; set; }
        public string Doctor { get; set; }
        public string Procedure { get; set; }
    }
}
