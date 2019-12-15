using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalBackEnd.Models
{
    public class RoomAssignmentModel
    {
        public int RoomId { get; set; }
        public int? PatientCode { get; set; }
        public int? TabNum { get; set; }
        public int? ProcType { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}
