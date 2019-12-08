// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";






const vistsData = [
    { id: 1, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Petras Petraitis"},
    { id: 2, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Simas Simaitis"},
    { id: 3, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Zigmas Zigmaitis"},
    { id: 4, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Paulius Paulauskas"}
    
];

function ListVisitPage() {
    const [showAdd, setShowAdd] = useState(false);
    const [showFilter, setShowFilter] =useState(false);
  
    const removeModals = [];
    vistsData.forEach(visit => {
      const [showRemove, setShowRemove] = useState(false);
      removeModals[visit.id] = {showRemove, setShowRemove};
    });
    return (
        <SiteWrapper>
        <Page.Content>
        <Page.Header
          title="Vizitai"
        />
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <div style={{marginLeft: "auto"}}>

            <Button
                color="primary"
                href="/FilterVisit"
                RootComponent="a"
                >
                    Vizitų paieška
            </Button>
            
        </div>
        <div style={{marginRight: "auto"}}>
        <Button
                
                color="primary"
                href="/NewVisit"
                RootComponent="a"
                >
                    Naujas vizitas
            </Button>
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
                    <Table.ColHeader><strong>ID.</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Data</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Laikas</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Pacientas</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Gydytojas</strong></Table.ColHeader>
                    <Table.ColHeader/>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {vistsData.map(visit => (
                  <Table.Row key={visit.id}>
                    <Table.Col>
                        <div>{visit.id}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{visit.date} </div>
                    </Table.Col>
                    <Table.Col>
                        <div>{visit.time}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{visit.patientName}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{visit.doctorName}</div>
                    </Table.Col>
                    <Table.Col alignContent="right">
                      <Button.List>
                        <Button
                            color="info"
                            href="/DetailsVisit"
                            RootComponent="a"
                        >
                            Detalesnė informacija
                        </Button>
                        
                        
                        
                        <Button
                            color="warning"
                            href="/EditVisit"
                            RootComponent="a"
                            >
                                Redaguoti
                            </Button>
                        <Button color="danger" onClick={() => removeModals[visit.id].setShowRemove(true)}>Šalinti</Button>
                        <Modal
                          show={removeModals[visit.id].showRemove} 
                          handleClose={() => removeModals[visit.id].setShowRemove(false)} 
                          title="Vizito šalinimas"
                          bodyContent={
                            <Text style={{fontSize: "initial", textAlign: "center"}}>
                              Ar tikrai norite pašalinti vizitą (ID = {visit.id})?
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

export default ListVisitPage;
