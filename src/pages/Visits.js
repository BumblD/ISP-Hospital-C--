// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";
import { getActiveElement } from "formik";


let visits = [
    { id: 2, data: "2019-09-12", laikas_val: 12, laikas_min: 0, nusiskundimas: "Pilvo skausmas", patvirtinimas: false, gydytojas: "Petras Petraitis", gydytojasID: 3, pacientas: "Jonas", pacientasID: 1},
    { id: 4, data: "2019-10-12", laikas_val: 12, laikas_min: 15, nusiskundimas: "", patvirtinimas: false, gydytojas: "Simas Simaitis", gydytojasID: 3, pacientas: "Petras", pacientasID: 2},
    { id: 6, data: "2019-11-12", laikas_val: 12, laikas_min: 30, nusiskundimas: "", patvirtinimas: false, gydytojas: "Zigmas Zigmaitis", gydytojasID: 3, pacientas: "Povilas", pacientasID: 3},
    { id: 8, data: "2019-12-12", laikas_val: 12, laikas_min: 45, nusiskundimas: "", patvirtinimas: false, gydytojas: "Paulius Paulauskas", gydytojasID: 4, pacientas: "Simas", pacientasID: 4}
];
let doctors = [
    {id: 3, vardas: "Vardas1", pavarde: "Pavarde1", specializacija: "Bendra"},
    {id: 4, vardas: "Vardas2", pavarde: "Pavarde2", specializacija: "Bendra"}
];


function getTime(visit){
    let output = visit.laikas_val+":";
    if(visit.laikas_min==0){
        output+="00";
    }else{
        output+=visit.laikas_min;
    }
    return output;
    
}
function getDoctor(doctor){
    return doctor.vardas + " " + doctor.pavarde + " (" + doctor.specializacija + ")";
}

function VisitsPage() {
    const [showAdd, setShowAdd] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const doctorsData = [];
    doctors.forEach(doctor => doctorsData[doctor.id] = doctor);

    const visitsData = [];
    visits.forEach(visit => visitsData[visit.id] = visit);

  const removeModals = [];
  const detailsModals = [];
  const editModals = [];
  const acceptModals = [];
  const registerModals = [];
  visitsData.forEach(visit => {
    const [showRegister, setShowRegister] = useState(false);
    registerModals[visit.id] = {showRegister, setShowRegister};

    const [showRemove, setShowRemove] = useState(false);
    removeModals[visit.id] = {showRemove, setShowRemove};

    const [showDetails, setShowDetails] = useState(false);
    detailsModals[visit.id] = {showDetails, setShowDetails};

    const [showEdit, setShowEdit] = useState(false);
    editModals[visit.id] = {showEdit, setShowEdit};

    const [showAccept, setShowAccept] = useState(false);
    acceptModals[visit.id] = {showAccept, setShowAccept};
  });
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Vizitai"
        />
        
      <div className="rooms-type-select">
      <Button color="primary" onClick={() => setShowFilter(true)}>Vizito paieška</Button>
            <Modal                //Add new room modal (pop-up)
              show={showFilter} 
              handleClose={() => setShowFilter(false)} 
              title='Vizito paieška' 
              bodyContent={
                <Form>
                    <Form.Input name="data_nuo" type="date" label='Data nuo'/>
                    <Form.Input name="data_iki" type="date" label="Data iki"/>

                    <Form.Label>Gydytojas</Form.Label>
                    <Form.Select className="w-auto mr-2">
                        <option value="0" name="gydytojasID">---</option>
                        {doctorsData.map(doctor => (
              <option value={doctor.id} name="gydytojasID">{getDoctor(doctor)}</option>
                        ))}
                    </Form.Select>
                </Form>
              }
              actions={[
                  { label:"Atšaukti", onClick:() => setShowFilter(false) }, 
                  { label:"Ieškoti", color:"primary", onClick:() => setShowFilter(false) }
                ]}/>

        <div className="add-room-button">
            <Button color="primary" onClick={() => setShowAdd(true)}>+ Registruoti vizitą</Button>
            <Modal                //Add new room modal (pop-up)
              show={showAdd} 
              handleClose={() => setShowAdd(false)} 
              title='Registruoti vizitą' 
              bodyContent={
                <Form>
                    <Form.Input name='date' type="date" label='Data' placeholder='Įveskite vizito datą' />
                    <Form.Label>Laikas</Form.Label>
                    <Form.Select className="w-auto mr-2" name="laikas_val">
                    <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>>
                    </Form.Select>:  
                    <Form.Select className="w-auto mr-2" name="laikas_min">
                        <option value="0">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                    </Form.Select>
                    <br /><br />
                    <Form.Label>Gydytojas</Form.Label>
                    <Form.Select className="w-auto mr-2" name="gydytojasID">
                        <option value="0">---</option>
                        {doctorsData.map(doctor => (
                            <option value={doctor.id}>{getDoctor(doctor)}</option>
                        ))}
                    </Form.Select>
                    <br /><br />
                    <Form.Input name='nusiskundimas' label='Nusiskundimas' placeholder='Trumpai parašykite priežastį' />
                </Form>
              }
              actions={[
                  { label:"Atšaukti", onClick:() => setShowAdd(false) }, 
                  { label:"Patvirtinti", color:"primary", onClick:() => setShowAdd(false) }
                ]}/>
        </div>
      </div>
        <Grid.Row cards deck>
          <Grid.Col width={12}>
            <Card>
              <Table
                responsive
                highlightRowOnHover
                hasOutline
                verticalAlign="center"
                cards
                className="text-nowrap"
              >
                <Table.Header>
                    <Table.Row>
                        <Table.ColHeader><strong>ID</strong></Table.ColHeader>
                        <Table.ColHeader><strong>Data</strong></Table.ColHeader>
                        <Table.ColHeader><strong>Laikas</strong></Table.ColHeader>
                        <Table.ColHeader><strong>Pacientas</strong></Table.ColHeader>
                        <Table.ColHeader><strong>Gydytojas</strong></Table.ColHeader>
                        <Table.ColHeader/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {visitsData.map(visit => (
                    <Table.Row key={visit.id}>
                        <Table.Col><div>{visit.id}</div></Table.Col>
                        <Table.Col><div>{visit.data}</div></Table.Col>
                        <Table.Col><div>{getTime(visit)}</div></Table.Col>
                        <Table.Col><div>{visit.pacientas}</div></Table.Col>
                        <Table.Col><div>{doctorsData[visit.gydytojasID].vardas} {doctorsData[visit.gydytojasID].pavarde}</div></Table.Col>
                        
                    <Table.Col >
                        <Button.List>
                            <Button color="info" onClick={() => detailsModals[visit.id].setShowDetails(true)}>Detalesnė informacija</Button>
                        <Modal                //Room details (pop-up)
                          show={detailsModals[visit.id].showDetails} 
                          handleClose={() => detailsModals[visit.id].setShowDetails(false)} 
                          title='Vizito informacija' 
                          bodyContent={
                            <Form>
                              <Form.Label>Data</Form.Label>
                              <Form.Input disabled
                                value={visit.data}
                              />
                              <Form.Label>Laikas</Form.Label>
                              <Form.Input disabled
                                value={getTime(visit)}
                              />
                              <Form.Label>Pacientas</Form.Label>
                              <Form.Input disabled
                                value={visit.pacientas}
                              />
                              <Form.Label>Gydytojas</Form.Label>
                              <Form.Input disabled
                                value={getDoctor(doctorsData[visit.gydytojasID])}
                              />
                              <Form.Label>Nusiskundimas</Form.Label>
                              <Form.Input disabled
                                value={visit.nusiskundimas}
                              />
                            </Form>
                          }
                          actions={[
                              { label:"Uždaryti", onClick:() => detailsModals[visit.id].setShowDetails(false) }
                          ]}/>




                        <Button color="warning" onClick={() => editModals[visit.id].setShowEdit(true)}>Redaguoti</Button>
                        <Modal  
                        
                          show={editModals[visit.id].showEdit} 
                          handleClose={() => editModals[visit.id].setShowEdit(false)} 
                          title='Redaguoti vizitą' 
                          bodyContent={
                            <Form>
                            <Form.Input name='date' type="date" label='Data' value={visit.data}/>
                            <Form.Label>Laikas</Form.Label>
                            
                            <Form.Select className="w-auto mr-2" name="laikas_val">
                                <option selected={visit.laikas_val === 8} value="8">08</option>
                                <option selected={visit.laikas_val === 9} value="9">09</option>
                                <option selected={visit.laikas_val === 10} value="10">10</option>
                                <option selected={visit.laikas_val === 11} value="11">11</option>
                                <option selected={visit.laikas_val === 12} value="12">12</option>
                                <option selected={visit.laikas_val === 13} value="13">13</option>
                                <option selected={visit.laikas_val === 14} value="14">14</option>
                                <option selected={visit.laikas_val === 15} value="15">15</option>
                                <option selected={visit.laikas_val === 16} value="16">16</option>
                                <option selected={visit.laikas_val === 17} value="17">17</option>
                                <option selected={visit.laikas_val === 18} value="18">18</option>
                                <option selected={visit.laikas_val === 19} value="19">19</option>>
                            </Form.Select>:  
                            <Form.Select className="w-auto mr-2" name="laikas_min">
                                <option selected={visit.laikas_min === 0} value="0">00</option>
                                <option selected={visit.laikas_min === 15} value="15">15</option>
                                <option selected={visit.laikas_min === 30} value="30">30</option>
                                <option selected={visit.laikas_min === 45} value="45">45</option>
                            </Form.Select>
                            <br /><br />
                            <Form.Label>Gydytojas</Form.Label>
                            <Form.Select className="w-auto mr-2" name="gydytojasID">
                                {doctorsData.map(doctor => (
                                    <option selected={visit.gydytojasID === doctor.id} value={doctor.id}>{getDoctor(doctor)}</option>
                                ))}
                            </Form.Select>
                            <br /><br />
                            <Form.Input name='nusiskundimas' value={visit.nusiskundimas} label='Nusiskundimas' placeholder='Trumpai parašykite priežastį' />
                        </Form>
                          }
                          actions={[
                              { label:"Atšaukti", onClick:() => editModals[visit.id].setShowEdit(false) },
                              { label:"Išsaugoti", color:"primary", onClick:() => editModals[visit.id].setShowEdit(false) }
                          ]}/>

                        <Button color="green" onClick={() => acceptModals[visit.id].setShowAccept(true)}>Patvirtinti</Button>
                        <Modal      //remove room modal
                          show={acceptModals[visit.id].showAccept} 
                          handleClose={() => acceptModals[visit.id].setShowAccept(false)} 
                          title="Vizito patvirtinimas"
                          bodyContent={
                            <Text className="remove-room-text">
                              Ar tikrai norite patvirtinti vizitą (ID={visit.id})?
                            </Text>
                          }
                          actions={[
                            { label:"Atšaukti", onClick:() => acceptModals[visit.id].setShowAccept(false) }, 
                            { label:"Patvirtinti", color:"primary", onClick:() => acceptModals[visit.id].setShowAccept(false) }
                          ]} />

                        <Button color="danger" onClick={() => removeModals[visit.id].setShowRemove(true)}>Šalinti</Button>
                        <Modal      //remove room modal
                          show={removeModals[visit.id].showRemove} 
                          handleClose={() => removeModals[visit.id].setShowRemove(false)} 
                          title="Vizito šalinimas"
                          bodyContent={
                            <Text className="remove-room-text">
                              Ar tikrai norite pašalinti vizitą (ID={visit.id})?
                            </Text>
                          }
                          actions={[
                            { label:"Atšaukti", onClick:() => removeModals[visit.id].setShowRemove(false) }, 
                            { label:"Patvirtinti", color:"primary", onClick:() => removeModals[visit.id].setShowRemove(false)}
                          ]} />




                        <Button color="blue" onClick={() => registerModals[visit.id].setShowRegister(true)}>Registruotis</Button>
                        <Modal  
                        
                          show={registerModals[visit.id].showRegister} 
                          handleClose={() => registerModals[visit.id].setShowRegister(false)} 
                          title='Vizito registracija' 
                          bodyContent={
                            <Form>
                            <Form.Input name='date' type="date" disabled label='Data' value={visit.data}/>
                            <Form.Label>Laikas</Form.Label>
                            
                            <Form.Select className="w-auto mr-2" disabled name="laikas_val" value={visit.laikas_val}>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>>
                            </Form.Select>:  
                            <Form.Select className="w-auto mr-2" disabled name="laikas_min" value={visit.laikas_min}>
                                <option value="0">00</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </Form.Select>
                            <br /><br />
                            <Form.Label>Gydytojas</Form.Label>
                            <Form.Select className="w-auto mr-2" disabled name="gydytojasID" value={visit.gydytojasID}>
                                {doctorsData.map(doctor => (
                                    <option selected={visit.gydytojasID === doctor.id} value={doctor.id}>{getDoctor(doctor)}</option>
                                ))}
                            </Form.Select>
                            <br /><br />
                            <Form.Input name='nusiskundimas' label='Nusiskundimas' placeholder='Trumpai parašykite priežastį' />
                        </Form>
                          }
                          actions={[
                              { label:"Atšaukti", onClick:() => registerModals[visit.id].setShowRegister(false) },
                              { label:"Išsaugoti", color:"primary", onClick:() => registerModals[visit.id].setShowRegister(false) }
                          ]}/>


                      </Button.List>
                    </Table.Col>
                  </Table.Row>
                ))}
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default VisitsPage;
