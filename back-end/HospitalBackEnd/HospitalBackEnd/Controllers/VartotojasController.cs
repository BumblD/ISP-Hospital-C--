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
    public class VartotojasController : Controller
    {
        private AppDb Db { get; set; }

        public VartotojasController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        public JsonResult GetAllUsers()
        {
            List<VartotojasViewModel> users = new List<VartotojasViewModel>();

            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT 
                                    asmenine_info.asmens_kodas as asmens_kodas,
                                    asmenine_info.vardas as vardas,
                                    asmenine_info.pavarde as pavarde,
                                    asmenine_info.gimimo_data as gimimo_data,
                                    asmenine_info.telefonas as telefonas,
                                    lyties_tipas.name as lytis,
                                    vartotojo_info.el_pastas as el_pastas,
                                    vartotojo_info.slaptazodis as slaptazodis,
                                    vartotojo_info.tipas as tipas,
                                    vartotojo_tipas.name as tipo_vardas,
                                    gydytojo_tipas.name as specializacija,
                                    pacientai.ugis as ugis,
                                    pacientai.mase as mase,
                                    kraujo_grupe.name as kraujo_grupe,
                                    pacientai.rezus as rezus,
                                    gydytojai.laipsnis as laipsnis
                                FROM asmenine_info
                                    LEFT JOIN vartotojo_info ON asmenine_info.fk_VARTOTOJO_INFOid=vartotojo_info.id
                                    LEFT JOIN personalo_darbuotojai ON asmenine_info.asmens_kodas=personalo_darbuotojai.fk_ASMENINE_INFOasmens_kodas
                                    LEFT JOIN pacientai ON asmenine_info.asmens_kodas=pacientai.fk_ASMENINE_INFOasmens_kodas
                                    LEFT JOIN gydytojai ON personalo_darbuotojai.tabelio_numeris=gydytojai.fk_PERSONALO_DARBUOTOJAStabelio_numeris
                                    LEFT JOIN vartotojo_tipas ON vartotojo_info.tipas=vartotojo_tipas.id
                                    LEFT JOIN kraujo_grupe ON pacientai.kraujo_grupe=kraujo_grupe.id
                                    LEFT JOIN gydytojo_tipas ON gydytojai.specializacija=gydytojo_tipas.id
                                    LEFT JOIN lyties_tipas ON asmenine_info.lytis=lyties_tipas.id";

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new VartotojasViewModel()
                    {
                        Asmens_Kodas = reader["asmens_kodas"] != DBNull.Value ? Convert.ToString(reader["asmens_kodas"]): null,
                        Vardas = reader["vardas"] != DBNull.Value ? Convert.ToString(reader["vardas"]): null,
                        Pavarde = reader["pavarde"] != DBNull.Value ? Convert.ToString(reader["pavarde"]): null,
                        Gimimo_Data = reader["gimimo_data"] != DBNull.Value ? Convert.ToString(reader["gimimo_data"]): null,
                        Telefonas = reader["telefonas"] != DBNull.Value ? Convert.ToString(reader["telefonas"]): null,
                        Lytis = reader["lytis"] != DBNull.Value ? Convert.ToString(reader["lytis"]): null,
                        El_Pastas = reader["el_pastas"] != DBNull.Value ? Convert.ToString(reader["el_pastas"]): null,
                        Slaptazodis = reader["slaptazodis"] != DBNull.Value ? Convert.ToString(reader["slaptazodis"]): null,
                        Tipas = reader["tipas"] != DBNull.Value ? Convert.ToInt32(reader["tipas"]): -1,
                        Tipo_Vardas = reader["tipo_vardas"] != DBNull.Value ? Convert.ToString(reader["tipo_vardas"]): null,
                        Specializacija = reader["specializacija"] != DBNull.Value ? Convert.ToString(reader["specializacija"]): null,
                        Ugis = reader["ugis"] != DBNull.Value ? Convert.ToDouble(reader["ugis"]): -1,
                        Mase = reader["mase"] != DBNull.Value ? Convert.ToDouble(reader["mase"]): -1,
                        Kraujo_Grupe = reader["kraujo_grupe"] != DBNull.Value ? Convert.ToString(reader["kraujo_grupe"]): null,
                        Rezus = reader["rezus"] != DBNull.Value ? Convert.ToInt32(reader["rezus"]): -1,
                        Laipsnis = reader["laipsnis"] != DBNull.Value ? Convert.ToString(reader["laipsnis"]): null,
                    });
                }
            }
            return Json(users);
        }
        
        [HttpGet]
        public IActionResult GetUserByID([FromRoute] int id)
        {
            VartotojasViewModel userByID;
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"SELECT 
                                    asmenine_info.asmens_kodas as asmens_kodas,
                                    asmenine_info.vardas as vardas,
                                    asmenine_info.pavarde as pavarde,
                                    asmenine_info.gimimo_data as gimimo_data,
                                    asmenine_info.telefonas as telefonas,
                                    lyties_tipas.name as lytis,
                                    vartotojo_info.el_pastas as el_pastas,
                                    vartotojo_info.slaptazodis as slaptazodis,
                                    vartotojo_info.tipas as tipas,
                                    vartotojo_tipas.name as tipo_vardas,
                                    gydytojo_tipas.name as specializacija,
                                    pacientai.ugis as ugis,
                                    pacientai.mase as mase,
                                    kraujo_grupe.name as kraujo_grupe,
                                    pacientai.rezus as rezus,
                                    gydytojai.laipsnis as laipsnis,
                                    personalo_darbuotojai.tabelio_Numeris as tabelio_numeris
                                FROM asmenine_info
                                    LEFT JOIN vartotojo_info ON asmenine_info.fk_VARTOTOJO_INFOid=vartotojo_info.id
                                    LEFT JOIN personalo_darbuotojai ON asmenine_info.asmens_kodas=personalo_darbuotojai.fk_ASMENINE_INFOasmens_kodas
                                    LEFT JOIN pacientai ON asmenine_info.asmens_kodas=pacientai.fk_ASMENINE_INFOasmens_kodas
                                    LEFT JOIN gydytojai ON personalo_darbuotojai.tabelio_numeris=gydytojai.fk_PERSONALO_DARBUOTOJAStabelio_numeris
                                    LEFT JOIN vartotojo_tipas ON vartotojo_info.tipas=vartotojo_tipas.id
                                    LEFT JOIN kraujo_grupe ON pacientai.kraujo_grupe=kraujo_grupe.id
                                    LEFT JOIN gydytojo_tipas ON gydytojai.specializacija=gydytojo_tipas.id
                                    LEFT JOIN lyties_tipas ON asmenine_info.lytis=lyties_tipas.id 
                                 WHERE vartotojo_info.id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    userByID = new VartotojasViewModel()
                    {
                        Asmens_Kodas = reader["asmens_kodas"] != DBNull.Value ? Convert.ToString(reader["asmens_kodas"]): null,
                        Vardas = reader["vardas"] != DBNull.Value ? Convert.ToString(reader["vardas"]): null,
                        Pavarde = reader["pavarde"] != DBNull.Value ? Convert.ToString(reader["pavarde"]): null,
                        Gimimo_Data = reader["gimimo_data"] != DBNull.Value ? Convert.ToString(reader["gimimo_data"]): null,
                        Telefonas = reader["telefonas"] != DBNull.Value ? Convert.ToString(reader["telefonas"]): null,
                        Lytis = reader["lytis"] != DBNull.Value ? Convert.ToString(reader["lytis"]): null,
                        El_Pastas = reader["el_pastas"] != DBNull.Value ? Convert.ToString(reader["el_pastas"]): null,
                        Slaptazodis = reader["slaptazodis"] != DBNull.Value ? Convert.ToString(reader["slaptazodis"]): null,
                        Tipas = reader["tipas"] != DBNull.Value ? Convert.ToInt32(reader["tipas"]): -1,
                        Tipo_Vardas = reader["tipo_vardas"] != DBNull.Value ? Convert.ToString(reader["tipo_vardas"]): null,
                        Specializacija = reader["specializacija"] != DBNull.Value ? Convert.ToString(reader["specializacija"]): null,
                        Ugis = reader["ugis"] != DBNull.Value ? Convert.ToDouble(reader["ugis"]): -1,
                        Mase = reader["mase"] != DBNull.Value ? Convert.ToDouble(reader["mase"]): -1,
                        Kraujo_Grupe = reader["kraujo_grupe"] != DBNull.Value ? Convert.ToString(reader["kraujo_grupe"]): null,
                        Rezus = reader["rezus"] != DBNull.Value ? Convert.ToInt32(reader["rezus"]): -1,
                        Laipsnis = reader["laipsnis"] != DBNull.Value ? Convert.ToString(reader["laipsnis"]): null,
                        Tabelio_Numeris = reader["tabelio_numeris"] != DBNull.Value ? Convert.ToInt32(reader["tabelio_numeris"]): -1,
                    };
                }
                return Json(userByID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vartotojo su tokiu ID nėra.");
            }
        }
        
        // POST api/<controller>
        [Produces("application/json")]
        [HttpPost]
        public IActionResult CreateNewUser([FromBody]VartotojasViewModel user)
        {
            if (user.El_Pastas == null)
            {
                return BadRequest("Nenurodytas el. paštas.");
            }
            
            if (user.Slaptazodis == null)
            {
                return BadRequest("Nenurodytas slaptazodis.");
            }
            
            if (user.Asmens_Kodas == null)
            {
                return BadRequest("Nenurodytas asmens kodas.");
            }
            
            if (user.Vardas == null)
            {
                return BadRequest("Nenurodytas vardas.");
            }
            
            if (user.Pavarde == null)
            {
                return BadRequest("Nenurodyta pavardė.");
            }
            
            if (user.Gimimo_Data == null)
            {
                return BadRequest("Nenurodyta gimimo data.");
            }
            
            if (user.Telefonas == null)
            {
                return BadRequest("Nenurodytas telefonas.");
            }
            
            if (user.Lytis == null)
            {
                return BadRequest("Nenurodyta lytis.");
            }
            
            return user.Tipas switch
            {
                1 => CreateAdministrator(user),
                2 => CreateDoctor(user),
                3 => CreateLabWorker(user),
                4 => CreatePatient(user),
                _ => BadRequest("Netinkamas arba nenurodytas vartotojo tipas.")
            };
        }

        public IActionResult CreatePatient(VartotojasViewModel user)
        {
            if (user.Ugis <= 0)
            {
                return BadRequest("Nenurodytas arba netinkamas ūgis.");
            }
            
            if (user.Mase <= 0)
            {
                return BadRequest("Nenurodyta arba netinkama masė.");
            }
            
            if (user.Rezus < 0)
            {
                return BadRequest("Nenurodytas rezus.");
            }
            
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO vartotojo_info (el_pastas, slaptazodis, tipas) VALUES(@El_Pastas, @Slaptazodis, @Tipas)";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@Tipas", user.Tipas);
                cmd.ExecuteNonQuery();

                long id = cmd.LastInsertedId;
                
                cmd.CommandText = @"INSERT INTO asmenine_info (asmens_kodas, vardas, pavarde, gimimo_data, telefonas, lytis, fk_VARTOTOJO_INFOid) VALUES(@asmens_kodas, @vardas, @pavarde, @gimimo_data, @telefonas, @lytis, @fk_VARTOTOJO_INFOid)";
                cmd.Parameters.AddWithValue("@asmens_kodas", user.Asmens_Kodas);
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", id);
                cmd.ExecuteNonQuery();

                int kraujo_grupe = -1;

                switch (user.Kraujo_Grupe)
                {
                    case "0":
                        kraujo_grupe = 1;
                        break;
                    case "A":
                        kraujo_grupe = 2;
                        break;
                    case "B":
                        kraujo_grupe = 3;
                        break;
                    case "AB":
                        kraujo_grupe = 4;
                        break;
                    default:
                        return BadRequest("Netinkama arba nenurodyta kraujo grupė.");
                }
                
                cmd.CommandText = @"INSERT INTO pacientai (ugis, mase, kraujo_grupe, rezus, fk_ASMENINE_INFOasmens_kodas) VALUES(@ugis, @mase, @kraujo_grupe, @rezus, @fk_ASMENINE_INFOasmens_kodas)";
                cmd.Parameters.AddWithValue("@ugis", user.Ugis);
                cmd.Parameters.AddWithValue("@mase", user.Mase);
                cmd.Parameters.AddWithValue("@kraujo_grupe", kraujo_grupe);
                cmd.Parameters.AddWithValue("@rezus", user.Rezus);
                cmd.Parameters.AddWithValue("@fk_ASMENINE_INFOasmens_kodas", user.Asmens_Kodas);
                cmd.ExecuteNonQuery();

                return Ok("Pacientas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: paciento užregistruoti nepavyko.");
            }
        }
        
        public IActionResult CreateDoctor(VartotojasViewModel user)
        {
            
            if (user.Laipsnis == null)
            {
                return BadRequest("Nenurodytas laipsnis.");
            }
            
            if (user.Specializacijos_kodas <= 0)
            {
                return BadRequest("Nenurodyta specializacija.");
            }
            
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO vartotojo_info (el_pastas, slaptazodis, tipas) VALUES(@El_Pastas, @Slaptazodis, @Tipas)";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@Tipas", user.Tipas);
                cmd.ExecuteNonQuery();

                long id = cmd.LastInsertedId;
                
                cmd.CommandText = @"INSERT INTO asmenine_info (asmens_kodas, vardas, pavarde, gimimo_data, telefonas, lytis, fk_VARTOTOJO_INFOid) VALUES(@asmens_kodas, @vardas, @pavarde, @gimimo_data, @telefonas, @lytis, @fk_VARTOTOJO_INFOid)";
                cmd.Parameters.AddWithValue("@asmens_kodas", user.Asmens_Kodas);
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"INSERT INTO personalo_darbuotojai (fk_ASMENINE_INFOasmens_kodas) VALUES(@fk_ASMENINE_INFOasmens_kodas)";
                cmd.Parameters.AddWithValue("@fk_ASMENINE_INFOasmens_kodas", user.Asmens_Kodas);
                cmd.ExecuteNonQuery();

                long tab = cmd.LastInsertedId;
                
                cmd.CommandText = @"INSERT INTO gydytojai (laipsnis, specializacija, fk_PERSONALO_DARBUOTOJAStabelio_numeris) VALUES(@laipsnis, @specializacija, @fk_PERSONALO_DARBUOTOJAStabelio_numeris)";
                cmd.Parameters.AddWithValue("@laipsnis", user.Laipsnis);
                cmd.Parameters.AddWithValue("@specializacija", user.Specializacijos_kodas);
                cmd.Parameters.AddWithValue("@fk_PERSONALO_DARBUOTOJAStabelio_numeris", tab);
                cmd.ExecuteNonQuery();

                return Ok("Gydytojas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: gydytojo užregistruoti nepavyko.");
            }
        }
        
        public IActionResult CreateLabWorker(VartotojasViewModel user)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO vartotojo_info (el_pastas, slaptazodis, tipas) VALUES(@El_Pastas, @Slaptazodis, @Tipas)";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@Tipas", user.Tipas);
                cmd.ExecuteNonQuery();

                long id = cmd.LastInsertedId;
                
                cmd.CommandText = @"INSERT INTO asmenine_info (asmens_kodas, vardas, pavarde, gimimo_data, telefonas, lytis, fk_VARTOTOJO_INFOid) VALUES(@asmens_kodas, @vardas, @pavarde, @gimimo_data, @telefonas, @lytis, @fk_VARTOTOJO_INFOid)";
                cmd.Parameters.AddWithValue("@asmens_kodas", user.Asmens_Kodas);
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"INSERT INTO personalo_darbuotojai (fk_ASMENINE_INFOasmens_kodas) VALUES(@fk_ASMENINE_INFOasmens_kodas)";
                cmd.Parameters.AddWithValue("@fk_ASMENINE_INFOasmens_kodas", user.Asmens_Kodas);
                cmd.ExecuteNonQuery();

                long tab = cmd.LastInsertedId;

                return Ok("Laborantas užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: laboranto užregistruoti nepavyko.");
            }
        }
        
        public IActionResult CreateAdministrator(VartotojasViewModel user)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"INSERT INTO vartotojo_info (el_pastas, slaptazodis, tipas) VALUES(@El_Pastas, @Slaptazodis, @Tipas)";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@Tipas", user.Tipas);
                cmd.ExecuteNonQuery();

                long id = cmd.LastInsertedId;
                
                cmd.CommandText = @"INSERT INTO asmenine_info (asmens_kodas, vardas, pavarde, gimimo_data, telefonas, lytis, fk_VARTOTOJO_INFOid) VALUES(@asmens_kodas, @vardas, @pavarde, @gimimo_data, @telefonas, @lytis, @fk_VARTOTOJO_INFOid)";
                cmd.Parameters.AddWithValue("@asmens_kodas", user.Asmens_Kodas);
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", id);
                cmd.ExecuteNonQuery();

                return Ok("Administratorius užregistruotas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: administratoriaus užregistruoti nepavyko.");
            }
        }

        [HttpPut]
        public IActionResult UpdateUserByID([FromRoute] int id, [FromBody]VartotojasViewModel user)
        {
            if (user.El_Pastas == null)
            {
                return BadRequest("Nenurodytas el. paštas.");
            }
            
            if (user.Asmens_Kodas == null)
            {
                return BadRequest("Nenurodytas asmens kodas.");
            }
            
            if (user.Vardas == null)
            {
                return BadRequest("Nenurodytas vardas.");
            }
            
            if (user.Pavarde == null)
            {
                return BadRequest("Nenurodyta pavardė.");
            }
            
            if (user.Gimimo_Data == null)
            {
                return BadRequest("Nenurodyta gimimo data.");
            }
            
            if (user.Telefonas == null)
            {
                return BadRequest("Nenurodytas telefonas.");
            }
            
            if (user.Lytis == null)
            {
                return BadRequest("Nenurodyta lytis.");
            }
            
            return user.Tipas switch
            {
                1 => UpdateAdministrator(id, user),
                2 => UpdateDoctor(id, user),
                3 => UpdateLabWorker(id, user),
                4 => UpdatePatient(id, user),
                _ => BadRequest("Netinkamas arba nenurodytas vartotojo tipas.")
            };
        }
        
        [HttpPut]
        public IActionResult AssignDoctor([FromRoute] string id, [FromBody] int doctor)
        {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                
            cmd.CommandText = @"UPDATE pacientai
                                    SET fk_GYDYTOJASid=@doctor
                                    WHERE fk_ASMENINE_INFOasmens_kodas=@id";
            cmd.Parameters.AddWithValue("@doctor", doctor);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();
            
            return Ok("Gydytojas priskirtas sėkmingai.");
        }

        public IActionResult UpdatePatient(int user_id, VartotojasViewModel user)
        {
            if (user.Ugis <= 0)
            {
                return BadRequest("Nenurodytas arba netinkamas ūgis.");
            }
            
            if (user.Mase <= 0)
            {
                return BadRequest("Nenurodyta arba netinkama masė.");
            }
            
            if (user.Rezus < 0)
            {
                return BadRequest("Nenurodytas rezus.");
            }
            
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                
                cmd.CommandText = @"UPDATE vartotojo_info
                                    SET el_pastas=@El_Pastas,
                                        slaptazodis=@Slaptazodis
                                    WHERE id=@id";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@id", user_id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"UPDATE asmenine_info
                                    SET vardas=@vardas,
                                        pavarde=@pavarde,
                                        gimimo_data=@gimimo_data,
                                        telefonas=@telefonas,
                                        lytis=@lytis
                                    WHERE fk_VARTOTOJO_INFOid=@fk_VARTOTOJO_INFOid";
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", user_id);
                cmd.ExecuteNonQuery();

                int kraujo_grupe = -1;

                switch (user.Kraujo_Grupe)
                {
                    case "0":
                        kraujo_grupe = 1;
                        break;
                    case "A":
                        kraujo_grupe = 2;
                        break;
                    case "B":
                        kraujo_grupe = 3;
                        break;
                    case "AB":
                        kraujo_grupe = 4;
                        break;
                    default:
                        return BadRequest("Netinkama arba nenurodyta kraujo grupė.");
                }
                cmd.CommandText = @"UPDATE pacientai
                                    SET ugis=@ugis,
                                        mase=@mase,
                                        kraujo_grupe=@kraujo_grupe,
                                        rezus=@rezus
                                    WHERE fk_ASMENINE_INFOasmens_kodas=@fk_ASMENINE_INFOasmens_kodas";
                cmd.Parameters.AddWithValue("@ugis", user.Ugis);
                cmd.Parameters.AddWithValue("@mase", user.Mase);
                cmd.Parameters.AddWithValue("@kraujo_grupe", kraujo_grupe);
                cmd.Parameters.AddWithValue("@rezus", user.Rezus);
                cmd.Parameters.AddWithValue("@fk_ASMENINE_INFOasmens_kodas", user.Asmens_Kodas);
                cmd.ExecuteNonQuery();

                return Ok("Pacientas pakesitas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: paciento pakeisti nepavyko.");
            }
        }
        
        public IActionResult UpdateDoctor(int user_id, VartotojasViewModel user)
        {
            
            if (user.Laipsnis == null)
            {
                return BadRequest("Nenurodytas laipsnis.");
            }
            
            if (user.Specializacijos_kodas <= 0)
            {
                return BadRequest("Nenurodyta specializacija.");
            }
            
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"UPDATE vartotojo_info
                                    SET el_pastas=@El_Pastas,
                                        slaptazodis=@Slaptazodis
                                    WHERE id=@id";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@id", user_id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"UPDATE asmenine_info
                                    SET vardas=@vardas,
                                        pavarde=@pavarde,
                                        gimimo_data=@gimimo_data,
                                        telefonas=@telefonas,
                                        lytis=@lytis
                                    WHERE fk_VARTOTOJO_INFOid=@fk_VARTOTOJO_INFOid";
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", user_id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"UPDATE gydytojai
                                    SET laipsnis=@laipsnis,
                                        specializacija=@specializacija
                                    WHERE fk_PERSONALO_DARBUOTOJAStabelio_numeris=@fk_PERSONALO_DARBUOTOJAStabelio_numeris";

                cmd.Parameters.AddWithValue("@laipsnis", user.Laipsnis);
                cmd.Parameters.AddWithValue("@specializacija", user.Specializacijos_kodas);
                cmd.Parameters.AddWithValue("@fk_PERSONALO_DARBUOTOJAStabelio_numeris", user.Tabelio_Numeris);
                cmd.ExecuteNonQuery();

                return Ok("Gydytojas pakeistas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: gydytojo pakeisti nepavyko.");
            }
        }
        
        public IActionResult UpdateLabWorker(int user_id, VartotojasViewModel user)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"UPDATE vartotojo_info
                                    SET el_pastas=@El_Pastas,
                                        slaptazodis=@Slaptazodis
                                    WHERE id=@id";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@id", user_id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"UPDATE asmenine_info
                                    SET vardas=@vardas,
                                        pavarde=@pavarde,
                                        gimimo_data=@gimimo_data,
                                        telefonas=@telefonas,
                                        lytis=@lytis
                                    WHERE fk_VARTOTOJO_INFOid=@fk_VARTOTOJO_INFOid";
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", user_id);
                cmd.ExecuteNonQuery();

                return Ok("Laborantas pakeistas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: laboranto pakeisti nepavyko.");
            }
        }
        
        public IActionResult UpdateAdministrator(int user_id, VartotojasViewModel user)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"UPDATE vartotojo_info
                                    SET el_pastas=@El_Pastas,
                                        slaptazodis=@Slaptazodis
                                    WHERE id=@id";
                cmd.Parameters.AddWithValue("@El_Pastas", user.El_Pastas);
                cmd.Parameters.AddWithValue("@Slaptazodis", user.Slaptazodis);
                cmd.Parameters.AddWithValue("@id", user_id);
                cmd.ExecuteNonQuery();
                
                cmd.CommandText = @"UPDATE asmenine_info
                                    SET vardas=@vardas,
                                        pavarde=@pavarde,
                                        gimimo_data=@gimimo_data,
                                        telefonas=@telefonas,
                                        lytis=@lytis
                                    WHERE fk_VARTOTOJO_INFOid=@fk_VARTOTOJO_INFOid";
                cmd.Parameters.AddWithValue("@vardas", user.Vardas);
                cmd.Parameters.AddWithValue("@pavarde", user.Pavarde);
                cmd.Parameters.AddWithValue("@gimimo_data", user.Gimimo_Data);
                cmd.Parameters.AddWithValue("@telefonas", user.Telefonas);
                cmd.Parameters.AddWithValue("@lytis", user.Lytis.Equals("vyras") ? 1: 2);
                cmd.Parameters.AddWithValue("@fk_VARTOTOJO_INFOid", user_id);
                cmd.ExecuteNonQuery();

                return Ok("Administratorius pakeistas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: administratoriaus pakeisti nepavyko.");
            }
        }
        
        
        // DELETE api/<controller>/5
        [HttpDelete]
        public IActionResult DeleteUserByID([FromRoute] int id)
        {
            try
            {
                Db.Connection.Open();
                var cmd = Db.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = @"DELETE FROM vartotojo_info WHERE id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                int code = cmd.ExecuteNonQuery();

                return Ok("Vartotojas pašalintas sėkmingai.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Serverio klaida: vartotojo pašalinti nepavyko.");
            }
        }
    }
}