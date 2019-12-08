using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace HospitalBackEnd.Controllers
{
    public class PatalpaController : Controller
    {
        private AppDb Db { get; set; }

        public PatalpaController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllRooms()
        {
            List<PatalpaViewModel> rooms = new List<PatalpaViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM patalpos";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    rooms.Add(new PatalpaViewModel()
                    {
                        Nr = Convert.ToInt32(reader["nr"]),
                        Plotas = Convert.ToDouble(reader["plotas"]),
                        Vietu_sk = Convert.ToInt32(reader["vietu_sk"]),
                        Tipas = Convert.ToInt32(reader["tipas"])
                    });
                }
            }
            return Json(rooms);
        }
    }
}