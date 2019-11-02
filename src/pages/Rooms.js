// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";


const roomsData = [
    { Number: 1, Area: 49, TypeId: 1, TypeName: "Palata", Size: 6 },
    { Number: 2, Area: 11, TypeId: 2, TypeName: "Kabinetas", Size: 1 },
    { Number: 3, Area: 12, TypeId: 3, TypeName: "Procedūrinis kabinetas", Size: 2 },
    { Number: 4, Area: 45, TypeId: 1, TypeName: "Palata", Size: 4 },
    { Number: 5, Area: 33, TypeId: 1, TypeName: "Palata", Size: 4 },
    { Number: 6, Area: 66, TypeId: 3, TypeName: "Procedūrinis kabinetas", Size: 2 },
    { Number: 7, Area: 69, TypeId: 1, TypeName: "Palata", Size: 8},
    { Number: 8, Area: 41, TypeId: 2, TypeName: "Kabinetas", Size: 1 },
    { Number: 9, Area: 22, TypeId: 3, TypeName: "Procedūrinis kabinetas", Size: 2 },
    { Number: 10, Area: 53, TypeId: 2, TypeName: "Kabinetas", Size: 1 }
];

function RoomsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Patalpos"
        />
        
      <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <Form.Select className="w-auto mr-2">
            <option value="">Pasirinkite patalpos tipą</option>
            <option value="1">Palatos</option>
            <option value="2">Kabinetai</option>
            <option value="3">Procedūriniai kabinetai</option>
        </Form.Select>
        <div style={{marginLeft: "auto"}}>
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
                        <Button color="gray" disabled={room.TypeId !== 1}>Priskirti pacientui</Button>
                        <Button color="gray" disabled={room.TypeId !== 3}>Priskirti procedūrai</Button>
                        <Button color="gray" disabled={room.TypeId !== 2 && room.TypeId !== 3}>Priskirti gydytojui</Button>
                        <Button color="warning">Redaguoti</Button>
                        <Button color="danger" onClick={() => setShowRemove(true)}>Šalinti</Button>
                        <Modal 
                          show={showRemove} 
                          handleClose={() => setShowRemove(false)} 
                          title='Kabineto šalinimas'
                          bodyContent='asdasdasd'/>
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
