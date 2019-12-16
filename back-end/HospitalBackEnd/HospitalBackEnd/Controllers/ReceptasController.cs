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
    public class ReceptasController : Controller
    {
        private AppDb Db { get; set; }

        public ReceptasController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllPrescriptions()
        {
            List<ReceptasViewModel> users = new List<ReceptasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM receptai";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new ReceptasViewModel()
                    {
                        Id = reader["id"] != DBNull.Value ? Convert.ToInt32(reader["id"]) : -1,
                        Israsymo_data = reader["israsymo_data"] != DBNull.Value ? Convert.ToString(reader["israsymo_data"]) : null,
                        Komentaras = reader["komentaras"] != DBNull.Value ? Convert.ToString(reader["komentaras"]) : null,
                        Nuolaida = reader["nuolaida"] != DBNull.Value ? Convert.ToString(reader["nuolaida"]) : null,
                        Laikotarpis_d = reader["laikotarpis_d"] != DBNull.Value ? Convert.ToInt32(reader["laikotarpis_d"]) : -1,
                        Doze_d = reader["doze_d"] != DBNull.Value ? Convert.ToInt32(reader["doze_d"]) : -1,
                        GydytojasID = reader["fk_GYDYTOJASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_GYDYTOJASid"]) : -1,
                        VaistasID = reader["fk_VAISTASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_VAISTASid"]) : -1,
                        PacientasID = reader["fk_PACIENTASid"] != DBNull.Value ? Convert.ToInt32(reader["fk_PACIENTASid"]) : -1,
                    });
                }
            }
            return Json(users);
        }
        [HttpGet]
        public IActionResult GetPrescriptionByID(int id)
        {
            ReceptasViewModel prescriptionByID;
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT * FROM receptai WHERE id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    prescriptionByID = new ReceptasViewModel()
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Israsymo_data = Convert.ToString(reader["israsymo_data"]),
                        Komentaras = Convert.ToString(reader["komentaras"]),
                        Nuolaida = Convert.ToString(reader["nuolaida"]),
                        Laikotarpis_d = Convert.ToInt32(reader["laikotarpis_d"]),
                        Doze_d = Convert.ToInt32(reader["doze_d"]),
                        PacientasID = Convert.ToInt32(reader["fk_PACIENTASid"]),
                        GydytojasID = Convert.ToInt32(reader["fk_GYDYTOJASid"]),
                        VaistasID = Convert.ToInt32(reader["fk_VAISTASid"])
                    };
                }
                return Json(prescriptionByID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: recepto su tokiu ID nėra.");
            }
        }
        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateNewPrescription([FromBody]ReceptasViewModel prescription)
        {
            if (prescription.Israsymo_data == null)
            {
                return BadRequest("Nenurodyta israsymo_data.");
            }

            if (prescription.Komentaras == null)
            {
                return BadRequest("Nenurodytas komentaras.");
            }

            if (prescription.Laikotarpis_d == 0)
            {
                return BadRequest("Nenurodytas laikotarpis_d.");
            }

            if (prescription.Doze_d == 0)
            {
                return BadRequest("Nenurodyta dozė.");
            }

            if (prescription.PacientasID == 0)
            {
                return BadRequest("Nenurodytas pacientas.");
            }

            if (prescription.GydytojasID == 0)
            {
                return BadRequest("Nenurodytas gydytojas.");
            }

            if (prescription.VaistasID == 0)
            {
                return BadRequest("Nenurodytas vaistas.");
            }

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO receptai (israsymo_data, laikotarpis_d, doze_d, komentaras, nuolaida, fk_GYDYTOJASid, fk_VAISTASid, fk_PACIENTASid)
                VALUES(@Israsymo_data, @Laikotarpis_d, @Doze_d, @Komentaras, @Nuolaida, @GydytojasID, @VaistasID, @PacientasID)";
                cmd.Parameters.AddWithValue("@Israsymo_data", prescription.Israsymo_data);
                cmd.Parameters.AddWithValue("@Laikotarpis_d", prescription.Laikotarpis_d);
                cmd.Parameters.AddWithValue("@Komentaras", prescription.Komentaras);
                cmd.Parameters.AddWithValue("@Nuolaida", prescription.Nuolaida);
                cmd.Parameters.AddWithValue("@GydytojasID", prescription.GydytojasID);
                cmd.Parameters.AddWithValue("@VaistasID", prescription.VaistasID);
                cmd.Parameters.AddWithValue("@PacientasID", prescription.PacientasID);
                cmd.ExecuteNonQuery();


                return Ok("Receptas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: recepto užregistruoti nepavyko.");
            }
        }
    }
}