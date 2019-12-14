// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";


let visitsData = [
    { id: 2, date: "2019-09-12", time_h: "12", time_m: "0", patientName: "Jonas", doctorName: "Petras Petraitis"},
    { id: 4, date: "2019-10-12", time_h: "12", time_m: "15", patientName: "Petras", doctorName: "Simas Simaitis"},
    { id: 6, date: "2019-11-12", time_h: "12", time_m: "30", patientName: "Povilas", doctorName: "Zigmas Zigmaitis"},
    { id: 8, date: "2019-12-12", time_h: "12", time_m: "45", patientName: "Simas", doctorName: "Paulius Paulauskas"}
];
let doctorsData = [
    {id: 3, name: "Vardas1", surname: "Pavarde1", speciality: "Bendra"},
    {id: 4, name: "Vardas2", surname: "Pavarde2", speciality: "Bendra"}
];




function VisitsPage() {
  const [showAdd, setShowAdd] = useState(false);

  const removeModals = [];
  const detailsModals = [];
  const editModals = [];
  visitsData.forEach(visit => {
    const [showRemove, setShowRemove] = useState(false);
    removeModals[visit.id] = {showRemove, setShowRemove};

    const [showDetails, setShowDetails] = useState(false);
    detailsModals[visit.id] = {showDetails, setShowDetails};

    const [showEdit, setShowEdit] = useState(false);
    editModals[visit.id] = {showEdit, setShowEdit};
  });
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Vizitai"
        />
        
      <div className="rooms-type-select">
        <Form.Select className="w-auto mr-2">
            <option value="aaa">Pasirinkite patalpos tipą</option>
            <option value="1">Palatos</option>
            <option value="2">Kabinetai</option>
            <option value="3">Laboratorijos</option>
        </Form.Select>

        <div className="add-visit-button">
            <Button color="primary" onClick={() => setShowAdd(true)}>+ Registruoti vizitą</Button>
            <Modal                //Add new room modal (pop-up)
              show={showAdd} 
              handleClose={() => setShowAdd(false)} 
              title='Registruoti vizitą' 
              bodyContent={
                <Form>
                    <Form.Input name='date' type="date" label='Data' placeholder='Įveskite vizito datą' />
                    <Form.Label>Laikas</Form.Label>
                    <Form.Select className="w-auto mr-2">
                        <option value="8" name="time_h">08</option>
                        <option value="9" name="time_h">09</option>
                        <option value="10" name="time_h">10</option>
                        <option value="11" name="time_h">11</option>
                        <option value="12" name="time_h">12</option>
                        <option value="13" name="time_h">13</option>
                        <option value="14" name="time_h">14</option>
                        <option value="15" name="time_h">15</option>
                        <option value="16" name="time_h">16</option>
                        <option value="17" name="time_h">17</option>
                        <option value="18" name="time_h">18</option>
                        <option value="19" name="time_h">19</option>
                    </Form.Select>:  
                    <Form.Select className="w-auto mr-2">
                        <option value="0" name="time_m">00</option>
                        <option value="15" name="time_m">15</option>
                        <option value="30" name="time_m">30</option>
                        <option value="45" name="time_m">45</option>
                    </Form.Select>
                    <br /><br />
                    <Form.Label>Gydytojas</Form.Label>
                    <Form.Select className="w-auto mr-2">
                        <option value="0" name="doctorSelection">---</option>
                        {doctorsData.map(doctor => (
                            <option value={doctor.id} name="doctorSelection">{doctor.name} {doctor.surname} ({doctor.speciality})</option>
                        ))}
                    </Form.Select>
                    <br /><br />
                    <Form.Input name='reason' label='Nusiskundimas' placeholder='Trumpai parašykite priežastį' />
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
                        <Table.Col><div>{visit.date}</div></Table.Col>
                        <Table.Col><div>{visit.time_h}:{visit.time_m}</div></Table.Col>
                        <Table.Col><div>{visit.patientName}</div></Table.Col>
                        <Table.Col><div>{visit.doctorName}</div></Table.Col>
                    <Table.Col alignContent="right">
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
                                value={visit.date}
                              />
                              <Form.Label>Laikas</Form.Label>
                              <Form.Input disabled
                                value={visit.time_h}
                              />
                              <Form.Label>Pacientas</Form.Label>
                              <Form.Input disabled
                                value={visit.patientName}
                              />
                              <Form.Label>Gydytojas</Form.Label>
                              <Form.Input disabled
                                value={visit.doctorName}
                              />
                              <Form.Label>Nusiskundimas</Form.Label>
                              <Form.Input disabled
                                value={visit.reason}
                              />
                            </Form>
                          }
                          actions={[
                              { label:"Uždaryti", onClick:() => detailsModals[visit.id].setShowDetails(false) }
                          ]}/>




                        <Button color="warning" onClick={() => editModals[visit.id].setShowEdit(true)}>Redaguoti</Button>
                        <Modal                //Edit room (pop-up)
                          show={editModals[visit.id].showEdit} 
                          handleClose={() => editModals[visit.id].setShowEdit(false)} 
                          title='Redaguoti vizitą' 
                          bodyContent={
                            <Form>
                              <Form.Label>Data</Form.Label>
                              <Form.Input 
                                value={visit.date}
                              />
                              <Form.Label>Laikas (val)</Form.Label>
                              <Form.Input 
                                value={visit.time_h}
                              />
                              <Form.Label>Laikas (min)</Form.Label>
                              <Form.Input 
                                value={visit.time_m}
                              />
                              <Form.Label>Gydytojas</Form.Label>
                            <Form.Select className="w-auto mr-2">
                                <option value="0">Pasirinkite gydytoją</option>
                                <option value="1">Palatos</option>
                                <option value="2">Kabinetai</option>
                                <option value="3">Laboratorijos</option>
                            </Form.Select>
                              <Form.Label>Nusiskundimas</Form.Label>
                              <Form.Input
                                value={visit.reason}
                              />
                            </Form>
                          }
                          actions={[
                              { label:"Atšaukti", onClick:() => editModals[visit.id].setShowEdit(false) },
                              { label:"Išsaugoti", color:"primary", onClick:() => editModals[visit.id].setShowEdit(false) }
                          ]}/>



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
                            { label:"Patvirtinti", color:"primary", onClick:() => removeModals[visit.id].setShowRemove(false) }
                          ]} />
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
