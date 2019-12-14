using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalBackEnd.Models
{
    public class RoomViewModel
    {
        public int Number { get; set; }
        public double Area { get; set; }
        public int Size { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
    }
}
