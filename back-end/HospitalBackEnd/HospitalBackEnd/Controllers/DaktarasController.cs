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
    public class DaktarasController : Controller
    {
        private AppDb Db { get; set; }
        public DaktarasController(AppDb db)
        {
            Db = db;
        }

        // GET: api/<controller>
        [HttpGet]
        public JsonResult Get()
        {
            List<DaktarasViewModel> doctors = new List<DaktarasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT
                                    gydytojai.id,
                                    asmenine_info.vardas,
                                    asmenine_info.pavarde,
                                    GYDYTOJO_TIPAS.name AS specializacija
                                FROM gydytojai
                                    LEFT JOIN personalo_darbuotojai ON gydytojai.fk_PERSONALO_DARBUOTOJAStabelio_numeris=personalo_darbuotojai.tabelio_numeris
                                    LEFT JOIN asmenine_info ON personalo_darbuotojai.fk_ASMENINE_INFOasmens_kodas=asmenine_info.asmens_kodas
                                    LEFT JOIN GYDYTOJO_TIPAS ON gydytojai.specializacija=GYDYTOJO_TIPAS.id";


            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    doctors.Add(new DaktarasViewModel()
                    {
                        ID = Convert.ToInt32(reader["id"]),
                        Vardas = Convert.ToString(reader["vardas"]),
                        Pavarde = Convert.ToString(reader["pavarde"]),
                        Specializacija = Convert.ToString(reader["specializacija"])
                    });
                }
            }
            return Json(doctors);

        }
    }
}
