// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";


let roomsData = [
    { Number: 1, Area: 49, TypeId: 1, TypeName: "Palata", Size: 6 },
    { Number: 2, Area: 11, TypeId: 2, TypeName: "Kabinetas", Size: 1 },
    { Number: 3, Area: 12, TypeId: 3, TypeName: "Procedūrinis k.", Size: 2 },
    { Number: 4, Area: 45, TypeId: 1, TypeName: "Palata", Size: 4 },
    { Number: 5, Area: 33, TypeId: 1, TypeName: "Palata", Size: 4 },
    { Number: 6, Area: 66, TypeId: 3, TypeName: "Procedūrinis k.", Size: 2 },
    { Number: 7, Area: 69, TypeId: 1, TypeName: "Palata", Size: 8},
    { Number: 8, Area: 41, TypeId: 2, TypeName: "Kabinetas", Size: 1 },
    { Number: 9, Area: 22, TypeId: 3, TypeName: "Procedūrinis k.", Size: 2 },
    { Number: 10, Area: 53, TypeId: 2, TypeName: "Kabinetas", Size: 1 }
];

function RoomsPage() {
  const [showAdd, setShowAdd] = useState(false);

  const removeModals = [];
  const patientModals = []
  const doctorModals = [];
  roomsData.forEach(room => {
    const [showRemove, setShowRemove] = useState(false);
    removeModals[room.Number] = {showRemove, setShowRemove};
    
    const [showPatient, setShowPatient] = useState(false);
    patientModals[room.Number] = {showPatient, setShowPatient};

    const [showDoctor, setShowDoctor] = useState(false);
    doctorModals[room.Number] = {showDoctor, setShowDoctor};
  });
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Patalpos"
        />
        
      <div className="rooms-type-select">
        <Form.Select className="w-auto mr-2">
            <option value="aaa">Pasirinkite patalpos tipą</option>
            <option value="1">Palatos</option>
            <option value="2">Kabinetai</option>
            <option value="3">Procedūriniai kabinetai</option>
        </Form.Select>
        <div className="add-room-button">
            <Button color="primary" onClick={() => setShowAdd(true)}>+ Pridėti patalpą</Button>
            <Modal                //Add new room modal (pop-up)
              show={showAdd} 
              handleClose={() => setShowAdd(false)} 
              title='Pridėti patalpą' 
              bodyContent={
                <Form>
                  <Form.Input name='number' label='Numeris' placeholder='Įveskite unikalų patalpos numerį' />
                  <Form.Input name='area' label='Plotas' placeholder='Įveskite patalpos plotą' />
                  <Form.Label>Patalpos tipas</Form.Label>
                  <Form.SelectGroup>
                    <Form.SelectGroupItem label="Palata" name="type" value="1" />
                    <Form.SelectGroupItem label="Kabinetas" name="type" value="2" />
                    <Form.SelectGroupItem label="Procedūrinis kabinetas" name="type" value="3" />
                  </Form.SelectGroup>
                  <Form.Input name='size' label='Vietų skaičius' placeholder='Įveskite vietų skaičių' />
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
                    <Table.ColHeader><strong>Nr.</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Plotas</strong></Table.ColHeader>
                    <Table.ColHeader>
                        <strong>Tipas</strong>
                    </Table.ColHeader>
                    <Table.ColHeader><strong>Vietų sk.</strong></Table.ColHeader>
                    <Table.ColHeader/>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {roomsData.map(room => (
                  <Table.Row key={room.Number}>
                    <Table.Col>
                        <div>{room.Number}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{room.Area} m<sup>2</sup></div>
                    </Table.Col>
                    <Table.Col>
                        <div>{room.TypeName}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{room.Size}</div>
                    </Table.Col>
                    <Table.Col alignContent="right">
                      <Button.List>
                        <Button color="info">Detalesnė informacija</Button>

                        <Button color="gray" disabled={room.TypeId !== 1} onClick={() => patientModals[room.Number].setShowPatient(true)}>
                          Priskirti pacientui
                        </Button>
                        <Modal                //Assign room to patient (pop-up)
                          show={patientModals[room.Number].showPatient} 
                          handleClose={() => patientModals[room.Number].setShowPatient(false)} 
                          title='Pridėti patalpą' 
                          bodyContent={
                            <Form>
                              <Form.Label>Paciento vardas pavardė</Form.Label>
                              <Form.Input
                                className="mb-3"
                                icon="search"
                                placeholder="Įveskite paciento vardą ir pavardę..."
                                position="append"
                              />
                              <Form.Label>Palata priskiriama nuo</Form.Label>
                              <Form.DatePicker
                               format="yyyy/mm/dd"
                               monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
                              <Form.Label>Palata priskiriama iki</Form.Label>
                              <Form.DatePicker
                               format="yyyy/mm/dd"
                               monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
                            </Form>
                          }
                          actions={[
                              { label:"Atšaukti", onClick:() => patientModals[room.Number].setShowPatient(false) }, 
                              { label:"Patvirtinti", color:"primary", onClick:() => patientModals[room.Number].setShowPatient(false) }
                          ]}/>

                        <Button color="gray" disabled={room.TypeId !== 3}>Priskirti procedūrai</Button>

                        <Button 
                          color="gray" 
                          disabled={room.TypeId !== 2 && room.TypeId !== 3} 
                          onClick={() => doctorModals[room.Number].setShowDoctor(true)}>
                          Priskirti gydytojui
                        </Button>
                        <Modal                //Assign room to doctor (pop-up)
                          show={doctorModals[room.Number].showDoctor} 
                          handleClose={() => doctorModals[room.Number].setShowDoctor(false)} 
                          title='Pridėti patalpą' 
                          bodyContent={
                            <Form>
                              <Form.Label>Gydytojo vardas pavardė</Form.Label>
                              <Form.Input
                                className="mb-3"
                                icon="search"
                                placeholder="Įveskite paciento vardą ir pavardę..."
                                position="append"
                              />
                              <Form.Label>Kabinetas priskiriamas nuo</Form.Label>
                              <Form.DatePicker
                               format="yyyy/mm/dd"
                               monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
                              <Form.Label>Kabinetas priskiriamas iki</Form.Label>
                              <Form.DatePicker
                               format="yyyy/mm/dd"
                               monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
                            </Form>
                          }
                          actions={[
                              { label:"Atšaukti", onClick:() => doctorModals[room.Number].setShowDoctor(false) }, 
                              { label:"Patvirtinti", color:"primary", onClick:() => doctorModals[room.Number].setShowDoctor(false) }
                          ]}/>

                        <Button color="warning">Redaguoti</Button>

                        <Button color="danger" onClick={() => removeModals[room.Number].setShowRemove(true)}>Šalinti</Button>
                        <Modal      //remove room modal
                          show={removeModals[room.Number].showRemove} 
                          handleClose={() => removeModals[room.Number].setShowRemove(false)} 
                          title="Kabineto šalinimas"
                          bodyContent={
                            <Text className="remove-room-text">
                              Ar tikrai norite pašalinti {room.Number} patalpą?
                            </Text>
                          }
                          actions={[
                            { label:"Atšaukti", onClick:() => removeModals[room.Number].setShowRemove(false) }, 
                            { label:"Patvirtinti", color:"primary", onClick:() => removeModals[room.Number].setShowRemove(false) }
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

export default RoomsPage;
