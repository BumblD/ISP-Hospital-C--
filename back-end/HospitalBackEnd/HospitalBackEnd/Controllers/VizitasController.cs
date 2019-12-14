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
        public IActionResult GetAllVisits()
        {
            List<VizitasViewModel> visits = new List<VizitasViewModel>();
            try
            {
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
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetVisitByID(int id)
        {
            VizitasViewModel visitByID;
            try
            {
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
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vizito su tokiu ID nėra.");
            }
        }

        [HttpGet("{begin}/{end}/{doctorID}")]
        public IActionResult GetAllEmptyVisits(DateTime begin, DateTime end, int doctorID)
        {
            List<VizitasViewModel> visits = new List<VizitasViewModel>();
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT *
                                    FROM grafikai
                                    WHERE fk_GYDYTOJASid=@GydytojasID
                                        AND grafikai.data>=@StartDate
                                        AND grafikai.data<=@EndDate";
                cmd.Parameters.AddWithValue("@GydytojasID", doctorID);
                cmd.Parameters.AddWithValue("@StartDate", begin);
                cmd.Parameters.AddWithValue("@EndDate", end);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int startTime = Convert.ToInt32(reader["pradzia_val"]);
                        int endTime = Convert.ToInt32(reader["pabaiga_val"]);
                        DateTime visitDate = Convert.ToDateTime(reader["data"]);
                        for (int i = startTime; i < endTime; i++)
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
                                WHERE fk_GYDYTOJASid=@GydytojasID
                                    AND data>=@StartDate
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
                foreach (var visit in selectedVisits)
                {
                    visits.RemoveAll(item => (item.Data == visit.Data && item.Laikas_val == visit.Laikas_val && item.Laikas_min == visit.Laikas_min));
                }


                return Json(visits.OrderBy(item => item.Data));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida.");
            }
        }

        // POST api/<controller>
        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateNewVisit([FromBody]VizitasViewModel visit)
        {
            
            if(visit == null)
            {
                return BadRequest("Nenurodytas vizitas.");
            }
            if (visit.Data < DateTime.Today)
            {
                return BadRequest("Blogai nurodyta vizito data.");
            }
            if (visit.Laikas_val < 8 || visit.Laikas_val >= 20)
            {
                return BadRequest("Blogai nurodytos vizito laiko valandos (8-20).");
            }
            if((visit.Laikas_min % 15 != 0) || visit.Laikas_min < 0 || visit.Laikas_min >= 60)
            {
                return BadRequest("Blogai nurodytos vizito laiko minutės (0, 15, 30, 45).");
            }
            if(visit.GydytojasID <= 0)
            {
                return BadRequest("Nenurodytas gydytojas.");
            }
            if(visit.PacientasID <= 0)
            {
                return BadRequest("Nenurodytas pacientas.");
            }
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO vizitai (data, laikas_val, laikas_min, nusiskundimas, patvirtinimas, fk_GYDYTOJASid, fk_PACIENTASid) VALUES(@Data, @Laikas_val, @Laikas_min, @Nusiskundimas, @Patvirtinimas, @GydytojasID, @PacientasID)";
                cmd.Parameters.AddWithValue("@Data", visit.Data);
                cmd.Parameters.AddWithValue("@Laikas_val", visit.Laikas_val);
                cmd.Parameters.AddWithValue("@Laikas_min", visit.Laikas_min);
                cmd.Parameters.AddWithValue("@Nusiskundimas", visit.Nusiskundimas);
                cmd.Parameters.AddWithValue("@Patvirtinimas", visit.Patvirtinimas);
                cmd.Parameters.AddWithValue("@GydytojasID", visit.GydytojasID);
                cmd.Parameters.AddWithValue("@PacientasID", visit.PacientasID);
                int code = cmd.ExecuteNonQuery();

                return Ok("Vizitas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vizito užregistruoti nepavyko.");
            }
            
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult UpdateVisitByID(int id, [FromBody]VizitasViewModel visit)
        {
            if (visit == null)
            {
                return BadRequest("Nenurodytas vizitas.");
            }
            if (visit.Data < DateTime.Today)
            {
                return BadRequest("Blogai nurodyta vizito data.");
            }
            if (visit.Laikas_val < 8 || visit.Laikas_val >= 20)
            {
                return BadRequest("Blogai nurodytos vizito laiko valandos (8-20).");
            }
            if ((visit.Laikas_min % 15 != 0) || visit.Laikas_min < 0 || visit.Laikas_min >= 60)
            {
                return BadRequest("Blogai nurodytos vizito laiko minutės (0, 15, 30, 45).");
            }
            if (visit.GydytojasID <= 0)
            {
                return BadRequest("Nenurodytas gydytojas.");
            }
            if (visit.PacientasID <= 0)
            {
                return BadRequest("Nenurodytas pacientas.");
            }
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"UPDATE vizitai
                                    SET data=@Data,
                                        laikas_val=@Laikas_val,
                                        laikas_min=@Laikas_min,
                                        nusiskundimas=@Nusiskundimas,
                                        patvirtinimas=false,
                                        fk_GYDYTOJASid=@GydytojasID,
                                        fk_PACIENTASid=@PacientasID
                                    WHERE id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Data", visit.Data);
                cmd.Parameters.AddWithValue("@Laikas_val", visit.Laikas_val);
                cmd.Parameters.AddWithValue("@Laikas_min", visit.Laikas_min);
                cmd.Parameters.AddWithValue("@Nusiskundimas", visit.Nusiskundimas);
                cmd.Parameters.AddWithValue("@GydytojasID", visit.GydytojasID);
                cmd.Parameters.AddWithValue("@PacientasID", visit.PacientasID);

                int code = cmd.ExecuteNonQuery();
                return Ok("Vizitas atnaujintas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vizito atnaujinti nepavyko.");
            }
        }

        [HttpGet("accept/{id}")]
        public IActionResult AcceptVisitByID(int id)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"UPDATE vizitai
                                    SET patvirtinimas=true
                                    WHERE id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                int code = cmd.ExecuteNonQuery();
                return Ok("Vizitas patvirtintas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vizito patvirtinti nepavyko.");
            }
            
        }

        [HttpGet("{id}/{role}")]
        public IActionResult GetVisitByUser(int id, int role)
        {
            List<VizitasViewModel> visits = new List<VizitasViewModel>();
            try
            { 
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                if (role == 1)
                {
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
                }
                else if(role == 2)
                {
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
                                    LEFT JOIN vartotojo_info ON gyd.fk_VARTOTOJO_INFOid=vartotojo_info.id
                                    LEFT JOIN pacientai ON vizitai.fk_PACIENTASid=pacientai.id
                                    LEFT JOIN asmenine_info pac ON pacientai.fk_ASMENINE_INFOasmens_kodas=pac.asmens_kodas
                                WHERE vartotojo_info.id=@id";
                    cmd.Parameters.AddWithValue("@id", id);
                }
                else
                {
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
                                    LEFT JOIN asmenine_info pac ON pacientai.fk_ASMENINE_INFOasmens_kodas=pac.asmens_kodas
                                    LEFT JOIN vartotojo_info ON pac.fk_VARTOTOJO_INFOid=vartotojo_info.id
                                WHERE vartotojo_info.id=@id";
                    cmd.Parameters.AddWithValue("@id", id);
                }

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
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida.");
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteVisitByID(int id)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"DELETE FROM vizitai WHERE id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                int code = cmd.ExecuteNonQuery();

                return Ok("Vizitas pašalintas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vizito pašalinti nepavyko.");
            }
        }
    }
}
