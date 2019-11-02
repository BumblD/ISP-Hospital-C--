// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button } from "tabler-react";
//import Modal from "react-modal";
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
  const [show, setShow] = useState(false);  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
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
            <Button color="primary">+ Pridėti patalpą</Button>
            <div className="App">
      <h1>Creating react modal</h1>
      {!show && <button onClick={openModal}>Show modal</button>}    </div>
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
                                <Button color="danger">Šalinti</Button>
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
