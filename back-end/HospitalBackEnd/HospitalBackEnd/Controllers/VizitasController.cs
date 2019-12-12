using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HospitalBackEnd.Controllers
{
    [Route("api/[controller]")]
    public class VizitasController : Controller
    {
        private AppDb Db { get; set; }
        public VizitasController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllVisits()
        {
            List<VizitasViewModel> visits = new List<VizitasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT 
                                    vizitai.id,
                                    data,
                                    laikas_val,
                                    laikas_min,
                                    nusiskundimas,
                                    patvirtinimas,
                                    CONCAT(gyd.vardas, ' ', gyd.pavarde) AS gydytojas,
                                    CONCAT(pac.vardas, ' ', pac.pavarde) AS pacientas,
                                    vizitai.fk_GYDYTOJASid AS gydytojasid,
                                    vizitai.fk_PACIENTASid AS pacientasid
                                FROM vizitai
                                    LEFT JOIN gydytojai ON vizitai.fk_GYDYTOJASid=gydytojai.id
                                    LEFT JOIN personalo_darbuotojai ON gydytojai.fk_PERSONALO_DARBUOTOJAstabelio_numeris=personalo_darbuotojai.tabelio_numeris
                                    LEFT JOIN asmenine_info gyd ON personalo_darbuotojai.fk_ASMENINE_INFOasmens_kodas=gyd.asmens_kodas
                                    LEFT JOIN pacientai ON vizitai.fk_PACIENTASid=pacientai.id
                                    LEFT JOIN asmenine_info pac ON pacientai.fk_ASMENINE_INFOasmens_kodas=pac.asmens_kodas";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    visits.Add(new VizitasViewModel()
                    {
                        ID = Convert.ToInt32(reader["id"]),
                        Data = Convert.ToDateTime(reader["data"]),
                        Laikas_val = Convert.ToInt32(reader["laikas_val"]),
                        Laikas_min = Convert.ToInt32(reader["laikas_min"]),
                        Nusiskundimas = Convert.ToString(reader["nusiskundimas"]),
                        Patvirtinimas = Convert.ToBoolean(reader["patvirtinimas"]),
                        Gydytojas = Convert.ToString(reader["gydytojas"]),
                        GydytojasID = Convert.ToInt32(reader["gydytojasid"]),
                        Pacientas = Convert.ToString(reader["pacientas"]),
                        PacientasID = Convert.ToInt32(reader["pacientasid"])
                    });
                }
            }
            return Json(visits);
        }

        [HttpGet("{id}")]
        public JsonResult GetVisitByID(int id)
        {
            VizitasViewModel visitByID;
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM vizitai WHERE id = @id";
            cmd.Parameters.AddWithValue("@id", id);
            using (var reader = cmd.ExecuteReader())
            {
                reader.Read();
                visitByID = new VizitasViewModel()
                {
                    ID = Convert.ToInt32(reader["id"]),
                    Data = Convert.ToDateTime(reader["data"]),
                    Laikas_val = Convert.ToInt32(reader["laikas_val"]),
                    Laikas_min = Convert.ToInt32(reader["laikas_min"]),
                    Nusiskundimas = Convert.ToString(reader["nusiskundimas"]),
                    Patvirtinimas = Convert.ToBoolean(reader["patvirtinimas"]),
                    GydytojasID = Convert.ToInt32(reader["fk_GYDYTOJASid"]),
                    PacientasID = Convert.ToInt32(reader["fk_PACIENTASid"])
                };
            }
            return Json(visitByID);
        }

        [HttpGet("{begin}/{end}/{speciality}")]
        public JsonResult GetEmptyVisits(DateTime begin, DateTime end, int speciality)
        {
            List<VizitasViewModel> visits = new List<VizitasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT *
                                FROM grafikai
                                    LEFT JOIN gydytojai ON grafikai.fk_GYDYTOJASid=gydytojai.id
                                    WHERE gydytojai.specializacija=@Speciality
                                        AND grafikai.data>=@StartDate
                                        AND grafikai.data<=@EndDate";
            cmd.Parameters.AddWithValue("@Speciality", speciality);
            cmd.Parameters.AddWithValue("@StartDate", begin);
            cmd.Parameters.AddWithValue("@EndDate", end);
            
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    int startTime = Convert.ToInt32(reader["pradzia_val"]);
                    int endTime = Convert.ToInt32(reader["pabaiga_val"]);
                    DateTime visitDate = Convert.ToDateTime(reader["data"]);
                    int doctorID = Convert.ToInt32(reader["fk_GYDYTOJASid"]);
                    for(int i = startTime; i < endTime; i++)
                    {
                        visits.Add(new VizitasViewModel()
                        {
                            Data = visitDate,
                            Laikas_val = i,
                            Laikas_min = 0,
                            GydytojasID = doctorID
                        });
                        visits.Add(new VizitasViewModel()
                        {
                            Data = visitDate,
                            Laikas_val = i,
                            Laikas_min = 15,
                            GydytojasID = doctorID
                        });
                        visits.Add(new VizitasViewModel()
                        {
                            Data = visitDate,
                            Laikas_val = i,
                            Laikas_min = 30,
                            GydytojasID = doctorID
                        });
                        visits.Add(new VizitasViewModel()
                        {
                            Data = visitDate,
                            Laikas_val = i,
                            Laikas_min = 45,
                            GydytojasID = doctorID
                        });
                    }
                }
            }

            List<VizitasViewModel> selectedVisits = new List<VizitasViewModel>();

            
            cmd.CommandText = @"SELECT *
                                FROM vizitai
                                WHERE data>=@StartDate
                                    AND data<=@EndDate";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    selectedVisits.Add(new VizitasViewModel()
                    {
                        ID = Convert.ToInt32(reader["id"]),
                        Data = Convert.ToDateTime(reader["data"]),
                        Laikas_val = Convert.ToInt32(reader["laikas_val"]),
                        Laikas_min = Convert.ToInt32(reader["laikas_min"]),
                        Nusiskundimas = Convert.ToString(reader["nusiskundimas"]),
                        Patvirtinimas = Convert.ToBoolean(reader["patvirtinimas"]),
                        GydytojasID = Convert.ToInt32(reader["fk_GYDYTOJASid"]),
                        PacientasID = Convert.ToInt32(reader["fk_PACIENTASid"])
                    });
                }
            }
            foreach(var visit in selectedVisits)
            {
                visits.RemoveAll(item => (item.GydytojasID==visit.GydytojasID && item.Data==visit.Data && item.Laikas_val==visit.Laikas_val && item.Laikas_min==visit.Laikas_min));
            }
            

            return Json(visits.OrderBy(item => item.Data));
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{ id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void DeleteByID(int id)
        {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"DELETE FROM vizitai WHERE id=@id";
            cmd.Parameters.AddWithValue("@id", id);
            int code = cmd.ExecuteNonQuery();
        }
    }
}
