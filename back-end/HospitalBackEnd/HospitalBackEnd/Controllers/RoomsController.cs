using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace HospitalBackEnd.Controllers
{
    public class RoomsController : Controller
    {
        private AppDb Db { get; set; }

        public RoomsController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public IActionResult GetAllRooms()
        {
            List<RoomViewModel> rooms = new List<RoomViewModel>();

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT * FROM patalpos p JOIN patalpos_tipas pt on p.tipas = pt.id";

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        rooms.Add(new RoomViewModel()
                        {
                            Number = Convert.ToInt32(reader["nr"]),
                            Area = Convert.ToDouble(reader["plotas"]),
                            Size = Convert.ToInt32(reader["vietu_sk"]),
                            TypeId = Convert.ToInt32(reader["tipas"]),
                            TypeName = Convert.ToString(reader["name"])
                        }); ;
                    }
                }
                return Json(rooms);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Serverio klaida: patalpų informacijos gauti nepavyko.");
            }
        }

        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateRoom([FromBody]RoomViewModel room)
        {
            if (room == null)
            {
                return BadRequest("Neivesti duomenys");
            }

            if (room.Number < 0)
            {
                return BadRequest("Blogas nr");
            }

            if (room.Area < 0)
            {
                return BadRequest("Blogas plotas");
            }

            if (!new List<int>() { 1, 2, 3 }.Contains(room.TypeId)) // shouldn't be hardcoded xD
            {
                return BadRequest("Blogas tipo id");
            }

            if (room.Size < 0)
            {
                return BadRequest("Nenurodytas vietu sk");
            }

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("INSERT INTO patalpos (nr, plotas, vietu_sk, tipas) VALUES({0}, {1}, {2}, {3})"
                                                                        , room.Number, room.Area, room.Size, room.TypeId);
                int code = cmd.ExecuteNonQuery();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Patalpos pridėti nepavyko, patikrinkite duomenis.");
            }
        }

        [HttpGet]
        public IActionResult GetRoomDetails([FromRoute] int id)
        {
            RoomDetailedViewModel room = new RoomDetailedViewModel();
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format(@"SELECT p.*, pt.name AS pname, CONCAT(ai.vardas, ' ', ai.pavarde) as gydytojas, tt.name AS tname, (SELECT GROUP_CONCAT(CONCAT(aii.vardas, ' ', aii.pavarde) SEPARATOR ';')
                                                FROM pacientai pp
                                                LEFT JOIN asmenine_info aii on aii.asmens_kodas = pp.fk_ASMENINE_INFOasmens_kodas
                                                WHERE pp.fk_PATALPAid = p.nr
                                                GROUP BY pp.fk_PATALPAid) as pacientai
                                                FROM patalpos p 
                                                JOIN patalpos_tipas pt on p.tipas = pt.id
                                                LEFT JOIN personalo_darbuotojai pd on pd.fk_PATALPAnr = p.nr
                                                LEFT JOIN asmenine_info ai on ai.asmens_kodas = pd.fk_ASMENINE_INFOasmens_kodas
                                                LEFT JOIN tyrimai t on t.fk_PATALPAnr = p.nr
                                                LEFT JOIN tyrimo_tipas tt on tt.id = t.tipas
                                                LEFT JOIN pacientai pp on pp.fk_PATALPAid = p.nr
                                                LEFT JOIN asmenine_info aii on aii.asmens_kodas = pp.fk_ASMENINE_INFOasmens_kodas
                                                WHERE p.nr = {0}
                                                GROUP BY p.nr", id);

                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    room.Number = Convert.ToInt32(reader["nr"]);
                    room.Address = "Studentų g. 55 - " + room.Number + ", Kaunas, Lietuva";
                    room.Doctor = Convert.ToString(reader["gydytojas"]);
                    room.Procedure = Convert.ToString(reader["tname"]);
                    room.Patients = Convert.ToString(reader["pacientai"]).Split(";").ToList();
                }
                return Json(room);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Serverio klaida: patalpos detalių gauti nepavyko.");
            }
        }

        [HttpGet]
        public IActionResult GetAllRoomDetails()
        {
            List<RoomDetailedViewModel> rooms = new List<RoomDetailedViewModel>();
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format(@"SELECT p.*, pt.name AS pname, CONCAT(ai.vardas, ' ', ai.pavarde) as gydytojas, tt.name AS tname, (SELECT GROUP_CONCAT(CONCAT(aii.vardas, ' ', aii.pavarde) SEPARATOR ';')
                                                FROM pacientai pp
                                                LEFT JOIN asmenine_info aii on aii.asmens_kodas = pp.fk_ASMENINE_INFOasmens_kodas
                                                WHERE pp.fk_PATALPAid = p.nr
                                                GROUP BY pp.fk_PATALPAid) as pacientai
                                                FROM patalpos p 
                                                JOIN patalpos_tipas pt on p.tipas = pt.id
                                                LEFT JOIN personalo_darbuotojai pd on pd.fk_PATALPAnr = p.nr
                                                LEFT JOIN asmenine_info ai on ai.asmens_kodas = pd.fk_ASMENINE_INFOasmens_kodas
                                                LEFT JOIN tyrimai t on t.fk_PATALPAnr = p.nr
                                                LEFT JOIN tyrimo_tipas tt on tt.id = t.tipas
                                                LEFT JOIN pacientai pp on pp.fk_PATALPAid = p.nr
                                                LEFT JOIN asmenine_info aii on aii.asmens_kodas = pp.fk_ASMENINE_INFOasmens_kodas
                                                GROUP BY p.nr");

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        rooms.Add(new RoomDetailedViewModel()
                        {
                            Number = Convert.ToInt32(reader["nr"]),
                            Address = "Studentų g. 55 - " + Convert.ToInt32(reader["nr"]) + ", Kaunas, Lietuva",
                            Doctor = Convert.ToString(reader["gydytojas"]),
                            Procedure = Convert.ToString(reader["tname"]),
                            Patients = Convert.ToString(reader["pacientai"]).Split(";").ToList()
                        });
                    }
                }
                return Json(rooms);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Serverio klaida: patalpos detalių gauti nepavyko.");
            }
        }

        [HttpDelete]
        public IActionResult DeleteRoom([FromRoute] int id)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format(@"DELETE FROM patalpos where nr = {0}", id);
                int code = cmd.ExecuteNonQuery();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Patalpos ištrinti nepavyko patikrinkite, kas ją naudoja.");
            }
        }

        [HttpPost]
        public IActionResult AssignToDoctor([FromBody] RoomAssignmentModel data)
        //public IActionResult AssignToDoctor([FromRoute] int id, [FromBody] int tabNum, [FromBody] DateTime from, [FromBody] DateTime to)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format(@"SELECT * FROM patalpos_uzimtumas where patalpa_id = {0}", data.RoomId);
                var res = cmd.ExecuteReader().Read();
                Db.Connection.Close();

                if (res)
                    return StatusCode(500, "Patalpos priskirti nepavyko patikrinkite kas ją naudoja.");
                else
                {
                    Db.Connection.Open();
                    cmd.CommandText = (string.Format(@"UPDATE personalo_darbuotojai SET fk_PATALPAnr = {0} WHERE tabelio_numeris = {1}", data.RoomId, data.TabNum));
                    cmd.ExecuteNonQuery();

                    cmd.CommandText = (string.Format(@"INSERT INTO patalpos_uzimtumas (patalpa_id, nuo, iki) VALUES ({0}, '{1}', '{2}')", data.RoomId, data.From.Date, data.To.Date));
                    cmd.ExecuteNonQuery();
                    Db.Connection.Close();
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Patalpos priskirti nepavyko patikrinkite kas ją naudoja.");
            }
        }

        [HttpPost]
        public IActionResult AssignToProcedure([FromBody] RoomAssignmentModel data)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format(@"SELECT * FROM patalpos_uzimtumas where patalpa_id = {0}", data.RoomId);
                var res = cmd.ExecuteReader().Read();
                Db.Connection.Close();

                if (res)
                    return StatusCode(500, "Patalpos priskirti nepavyko patikrinkite kas ją naudoja.");
                else
                {
                    Db.Connection.Open();
                    cmd.CommandText = (string.Format(@"INSERT INTO patalpos_uzimtumas(patalpa_id, nuo, iki) VALUES ({0}, '{1}', '{2}')", data.RoomId, data.From.Date, data.To.Date));
                    cmd.ExecuteNonQuery();
                    Db.Connection.Close();
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Patalpos priskirti nepavyko patikrinkite kas ją naudoja.");
            }
        }

        [HttpPost]
        public IActionResult AssignToPatient([FromBody] RoomAssignmentModel data)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format(@"SELECT * FROM patalpos_uzimtumas where patalpa_id = {0} and pacientas_asmensk = {1}", data.RoomId, data.PatientCode);
                var res = cmd.ExecuteReader().Read();
                Db.Connection.Close();

                Db.Connection.Open();
                cmd.CommandText = string.Format(@"SELECT *
                                                FROM patalpos_uzimtumas pu 
                                                JOIN patalpos p on pu.patalpa_id = p.nr
                                                WHERE pu.pacientas_asmensk IS NOT NULL AND p.nr = {0}
                                                GROUP BY pu.patalpa_id
                                                HAVING COUNT(pu.patalpa_id) < p.vietu_sk", data.RoomId);
                var res2 = cmd.ExecuteReader().Read();
                Db.Connection.Close();

                if (res || !res2)
                    return StatusCode(500, "Patalpos priskirti nepavyko patikrinkite kas ją naudoja.");
                else
                {
                    Db.Connection.Open();
                    cmd.CommandText = string.Format(@"INSERT INTO patalpos_uzimtumas(patalpa_id, nuo, iki, pacientas_asmensk) VALUES ({0}, '{1}', '{2}', {3})", data.RoomId, data.From.Date, data.To.Date, data.PatientCode);
                    cmd.ExecuteNonQuery();
                    Db.Connection.Close();
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Patalpos priskirti nepavyko patikrinkite kas ją naudoja.");
            }
        }

        [HttpPost]
        public IActionResult EditRoom([FromBody] EditRoomModel data)
        {
            if (data == null)
            {
                return BadRequest("Neivesti duomenys");
            }

            if (data.Number < 0)
            {
                return BadRequest("Blogas nr");
            }

            if (data.Area < 0)
            {
                return BadRequest("Blogas plotas");
            }

            if (!new List<int>() { 1, 2, 3 }.Contains(data.TypeId)) // shouldn't be hardcoded xD
            {
                return BadRequest("Blogas tipo id");
            }

            if (data.Size < 0)
            {
                return BadRequest("Nenurodytas vietu sk");
            }

            if (string.IsNullOrEmpty(data.Address))
            {
                return BadRequest("Nenurodytas adresas");
            }

            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("UPDATE patalpos SET nr = {0}, plotas = {1}, vietu_sk = {2}, tipas = {3} WHERE nr = {4}", data.Number, data.Area, data.Size, data.TypeId, data.Number);
                cmd.ExecuteNonQuery();
                Db.Connection.Close();

                if (data.TypeId == 1) // palatos
                {
                    Db.Connection.Open();
                    cmd.CommandText = string.Format(@"SELECT * FROM patalpos_uzimtumas WHERE patalpa_id = {0}", data.Number);
                    var reader2 = cmd.ExecuteReader();
                    List<RoomAvailabilityModel> rooms = new List<RoomAvailabilityModel>();
                    while (reader2.Read())
                    {
                        rooms.Add(new RoomAvailabilityModel()
                        {
                            roomId = Convert.ToInt32(reader2["patalpa_id"]),
                            personCode = Convert.ToInt32(reader2["pacientas_asmensk"])
                        });
                    }
                    Db.Connection.Close();

                    foreach (var room in rooms)
                    {
                        if(!data.Patients.Contains(room.personCode.ToString()))
                        {
                            Db.Connection.Open();
                            cmd.CommandText = string.Format("DELETE FROM patalpos_uzimtumas WHERE pacientas_asmensk = {0} AND patalpa_id = {1}", room.personCode, data.Number);
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
                else if (data.TypeId == 2) // kabinetai
                {
                    Db.Connection.Open();
                    cmd.CommandText = string.Format("UPDATE personalo_darbuotojai SET fk_PATALPAnr = {0} WHERE fk_PATALPAnr = {1}", null, data.Number);
                    cmd.ExecuteNonQuery();

                    cmd.CommandText = string.Format("UPDATE personalo_darbuotojai SET fk_PATALPAnr = {0} WHERE tabelio_numeris = {1}", data.Number, data.Doctor);
                    cmd.ExecuteNonQuery();
                    Db.Connection.Close();
                }
                else // laboratorijos
                {
                    Db.Connection.Open();
                    cmd.CommandText = string.Format(@"SELECT * FROM proceduros_tipas WHERE name LIKE '%{0}%'", data.Procedure);
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Db.Connection.Close();

                        string ids = Convert.ToString(reader["patalpa_id"]);
                        int procedureId = Convert.ToInt32(reader["id"]);

                        if (string.IsNullOrEmpty(data.Procedure))
                        {
                            Db.Connection.Open();
                            ids.Replace(data.Number.ToString() + ";", "");
                            cmd.CommandText = string.Format("UPDATE proceduros_tipas SET patalpa_id = {0} WHERE id = {1}", ids, procedureId);
                            cmd.ExecuteNonQuery();
                            Db.Connection.Close();
                        }
                        else if (!ids.Contains(data.Number.ToString()))
                        {
                            Db.Connection.Open();
                            ids.Concat(data.Number.ToString() + ";");
                            cmd.CommandText = string.Format("UPDATE proceduros_tipas SET patalpa_id = {0} WHERE id = {1}", ids, procedureId);
                            cmd.ExecuteNonQuery();
                            Db.Connection.Close();
                        }
                    }
                    else
                    {
                        return StatusCode(500, "Patalpos redaguoti nepavyko patikrinkite duomenis.");
                    }
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Patalpos redaguoti nepavyko patikrinkite duomenis.");
            }
        }
    }
}