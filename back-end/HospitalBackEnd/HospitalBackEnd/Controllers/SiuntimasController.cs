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
    public class SiuntimasController : Controller
    {
        private AppDb Db { get; set; }

        public SiuntimasController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllDispatches()
        {
            List<SiuntimasViewModel> users = new List<SiuntimasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM siuntimai";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new SiuntimasViewModel()
                    {
                        Id = reader["id"] != DBNull.Value ? Convert.ToInt32(reader["id"]) : -1,
                        Data = reader["data"] != DBNull.Value ? Convert.ToString(reader["data"]) : null,
                        Komentaras = reader["komentaras"] != DBNull.Value ? Convert.ToString(reader["komentaras"]) : null,
                        Specialistas = reader["specialistas"] != DBNull.Value ? Convert.ToInt32(reader["specialistas"]) : -1,
                        PacientasID = reader["fk_PACIENTASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_PACIENTASid"]) : -1,
                        GydytojasID = reader["fk_GYDYTOJASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_GYDYTOJASid"]) : -1,
                    });
                }
            }
            return Json(users);
        }
        [HttpGet]
        public IActionResult GetDispatchByID(int id)
        {
            SiuntimasViewModel dispatchByID;
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT * FROM siuntimai WHERE id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    dispatchByID = new SiuntimasViewModel()
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Data = Convert.ToString(reader["data"]),
                        Komentaras = Convert.ToString(reader["komentaras"]),
                        Specialistas = Convert.ToInt32(reader["specialistas"]),
                        PacientasID = Convert.ToInt32(reader["fk_PACIENTASid"]),
                        GydytojasID = Convert.ToInt32(reader["fk_GYDYTOJASid"])
                    };
                }
                return Json(dispatchByID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: siuntimo su tokiu ID nėra.");
            }
        }
        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateNewDispatch([FromBody]SiuntimasViewModel dispatch)
        {
            if (dispatch.Data == null)
            {
                return BadRequest("Nenurodyta data.");
            }

            if (dispatch.Komentaras == null)
            {
                return BadRequest("Nenurodytas komentaras.");
            }

            if (dispatch.Specialistas == 0)
            {
                return BadRequest("Nenurodytas specialistas.");
            }

            if (dispatch.PacientasID == 0)
            {
                return BadRequest("Nenurodytas pacientas.");
            }

            if (dispatch.GydytojasID == 0)
            {
                return BadRequest("Nenurodytas gydytojas.");
            }

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO siuntimai (data, komentaras, specialistas, fk_PACIENTASid, fk_GYDYTOJASid)
                VALUES(@Data, @Komentaras, @Specialistas, @PacientasID, @GydytojasID)";
                cmd.Parameters.AddWithValue("@Data", dispatch.Data);
                cmd.Parameters.AddWithValue("@Komentaras", dispatch.Komentaras);
                cmd.Parameters.AddWithValue("@Specialistas", dispatch.Specialistas);
                cmd.Parameters.AddWithValue("@PacientasID", dispatch.PacientasID);
                cmd.Parameters.AddWithValue("@GydytojasID", dispatch.GydytojasID);
                cmd.ExecuteNonQuery();


                return Ok("Siuntimas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: siuntimo užregistruoti nepavyko.");
            }
        }
    }
}