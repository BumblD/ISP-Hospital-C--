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
    public class SpecializacijaController : Controller
    {
        private AppDb Db { get; set; }
        public SpecializacijaController(AppDb db)
        {
            Db = db;
        }

        // GET: api/<controller>
        [HttpGet]
        public JsonResult Get()
        {
            List<SpecializacijaViewModel> specialities = new List<SpecializacijaViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT *
                                FROM GYDYTOJO_TIPAS";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    specialities.Add(new SpecializacijaViewModel()
                    {
                        ID = Convert.ToInt32(reader["id"]),
                        Name = Convert.ToString(reader["name"])
                    });
                }
            }

            return Json(specialities);
        }

    }
}
