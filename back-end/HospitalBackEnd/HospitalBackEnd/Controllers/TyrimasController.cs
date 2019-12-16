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
    public class TyrimasController : Controller
    {
        private AppDb Db { get; set; }

        public TyrimasController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllResearch()
        {
            List<TyrimasViewModel> users = new List<TyrimasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM tyrimai";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new TyrimasViewModel()
                    {
                        Id = reader["id"] != DBNull.Value ? Convert.ToInt32(reader["id"]) : -1,
                        Data = reader["data"] != DBNull.Value ? Convert.ToString(reader["data"]) : null,
                        Komentaras = reader["komentaras"] != DBNull.Value ? Convert.ToString(reader["komentaras"]) : null,
                        Tipas = reader["tipas"] != DBNull.Value ? Convert.ToInt32(reader["tipas"]) : -1,
                        GydytojasID = reader["fk_GYDYTOJASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_GYDYTOJASid"]) : -1,
                        PatalpaID = reader["fk_PATALPAnr"] != DBNull.Value ? Convert.ToInt32(reader["fk_PATALPAnr"]) : -1,
                        PacientasID = reader["fk_PACIENTASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_PACIENTASid"]) : -1,
                    });
                }
            }
            return Json(users);
        }
        [HttpGet]
        public IActionResult GetResearchByID(int id)
        {
            TyrimasViewModel researchByID;
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT * FROM tyrimai WHERE id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    researchByID = new TyrimasViewModel()
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Data = Convert.ToString(reader["data"]),
                        Komentaras = Convert.ToString(reader["komentaras"]),
                        Tipas = Convert.ToInt32(reader["tipas"]),
                        PacientasID = Convert.ToInt32(reader["fk_PACIENTASid"]),
                        GydytojasID = Convert.ToInt32(reader["fk_GYDYTOJASid"]),
                        PatalpaID = Convert.ToInt32(reader["fk_PATALPAnr"])
                    };
                }
                return Json(researchByID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: tyrimo su tokiu ID nėra.");
            }
        }
        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateNewResearch([FromBody]TyrimasViewModel research)
        {
            if (research.Data == null)
            {
                return BadRequest("Nenurodyta data.");
            }

            if (research.Komentaras == null)
            {
                return BadRequest("Nenurodytas komentaras.");
            }

            if (research.Tipas == 0)
            {
                return BadRequest("Nenurodytas tipas.");
            }

            if (research.PacientasID == 0)
            {
                return BadRequest("Nenurodytas pacientas.");
            }

            if (research.GydytojasID == 0)
            {
                return BadRequest("Nenurodytas gydytojas.");
            }

            if (research.PatalpaID == 0)
            {
                return BadRequest("Nenurodyta patalpa.");
            }

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO tyrimai (data, tipas, komentaras, fk_PACIENTASid, fk_GYDYTOJASid, fk_PATALPAnr)
                VALUES(@Data, @Tipas, @Komentaras, @GydytojasID, @PatalpaID, @PatalpaID)";
                cmd.Parameters.AddWithValue("@Data", research.Data);
                cmd.Parameters.AddWithValue("@Tipas", research.Tipas);
                cmd.Parameters.AddWithValue("@Komentaras", research.Komentaras);
                cmd.Parameters.AddWithValue("@PacientasID", research.PacientasID);
                cmd.Parameters.AddWithValue("@GydytojasID", research.GydytojasID);
                cmd.Parameters.AddWithValue("@PatalpaID", research.PatalpaID);
                cmd.ExecuteNonQuery();


                return Ok("Tyrimas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: tyrimo užregistruoti nepavyko.");
            }
        }

        [HttpPut]
        public IActionResult AssignPatient([FromRoute] string id, [FromBody] int patient)
        {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;

            cmd.CommandText = @"UPDATE tyrimai
                                    SET fk_PACIENTASid=@patient
                                    WHERE id=@id";
            cmd.Parameters.AddWithValue("@patient", patient);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();

            return Ok("Pacientas priskirtas sėkmingai.");
        }
    }
}