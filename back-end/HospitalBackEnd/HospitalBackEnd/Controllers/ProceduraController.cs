using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Renci.SshNet.Messages.Connection;

namespace HospitalBackEnd.Controllers
{
    public class ProceduraController : Controller
    {
        private AppDb Db { get; set; }

        public ProceduraController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllProcedures()
        {
            List<ProceduraViewModel> users = new List<ProceduraViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM israsytos_proceduros";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new ProceduraViewModel()
                    {
                        Id = reader["id"] != DBNull.Value ? Convert.ToInt32(reader["id"]) : -1,
                        Data = reader["data"] != DBNull.Value ? Convert.ToString(reader["data"]) : null,
                        Komentaras = reader["komentaras"] != DBNull.Value ? Convert.ToString(reader["komentaras"]) : null,
                        Kiekis = reader["kiekis"] != DBNull.Value ? Convert.ToInt32(reader["kiekis"]) : -1,
                        Procedura = reader["procedura"] != DBNull.Value ? Convert.ToInt32(reader["procedura"]) : -1,
                        GydytojasID = reader["fk_GYDYTOJASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_GYDYTOJASid"]) : -1,
                        PatalpaID = reader["fk_PATALPAnr"] != DBNull.Value ? Convert.ToInt32(reader["fk_PATALPAnr"]) : -1,
                        PacientasID = reader["fk_PACIENTASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_PACIENTASid"]) : -1,
                    });
                }
            }
            return Json(users);
        }
        [HttpGet]
        public IActionResult GetProcedureByID(int id)
        {
            ProceduraViewModel procedureByID;
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT * FROM israsytos_proceduros WHERE id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    procedureByID = new ProceduraViewModel()
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Data = Convert.ToString(reader["data"]),
                        Komentaras = Convert.ToString(reader["komentaras"]),
                        Kiekis = Convert.ToInt32(reader["kiekis"]),
                        Procedura = Convert.ToInt32(reader["procedura"]),
                        PacientasID = Convert.ToInt32(reader["fk_PACIENTASid"]),
                        GydytojasID = Convert.ToInt32(reader["fk_GYDYTOJASid"]),
                        PatalpaID = Convert.ToInt32(reader["fk_PATALPAnr"])
                    };
                }
                return Json(procedureByID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: procedūros su tokiu ID nėra.");
            }
        }
        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateNewProcedure([FromBody]ProceduraViewModel procedure)
        {
            if (procedure.Data == null)
            {
                return BadRequest("Nenurodyta data.");
            }

            if (procedure.Komentaras == null)
            {
                return BadRequest("Nenurodytas komentaras.");
            }

            if (procedure.Kiekis == 0)
            {
                return BadRequest("Nenurodytas kiekis.");
            }

            if (procedure.Procedura == 0)
            {
                return BadRequest("Nenurodyta procedūra.");
            }

            if (procedure.PacientasID == 0)
            {
                return BadRequest("Nenurodytas pacientas.");
            }

            if (procedure.GydytojasID == 0)
            {
                return BadRequest("Nenurodytas gydytojas.");
            }

            if (procedure.PatalpaID == 0)
            {
                return BadRequest("Nenurodyta patalpa.");
            }

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO israsytos_proceduros (data, kiekis, komentaras, procedura, fk_GYDYTOJASid, fk_PATALPAnr, fk_PACIENTASid)
                VALUES(@Data, @Kiekis, @Komentaras, @Procedura, @GydytojasID, @PatalpaID, @PacientasID)";
                cmd.Parameters.AddWithValue("@Data", procedure.Data);
                cmd.Parameters.AddWithValue("@Kiekis", procedure.Kiekis);
                cmd.Parameters.AddWithValue("@Komentaras", procedure.Komentaras);
                cmd.Parameters.AddWithValue("@ProceduraID", procedure.Procedura);
                cmd.Parameters.AddWithValue("@GydytojasID", procedure.GydytojasID);
                cmd.Parameters.AddWithValue("@PatalpaID", procedure.PatalpaID);
                cmd.Parameters.AddWithValue("@PacientasID", procedure.PacientasID);
                cmd.ExecuteNonQuery();


                return Ok("Procedūra užregistruota sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: procedūros užregistruoti nepavyko.");
            }
        }

        [HttpPut]
        public IActionResult AssignPatient([FromRoute] string id, [FromBody] int patient)
        {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;

            cmd.CommandText = @"UPDATE israsytos_proceduros
                                    SET fk_PACIENTASid=@patient
                                    WHERE id=@id";
            cmd.Parameters.AddWithValue("@patient", patient);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();

            return Ok("Pacientas priskirtas sėkmingai.");
        }
    }
}