// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";


function handleSubmit(){

}

const vistsData = [
    { id: 1, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Petras Petraitis"},
    { id: 2, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Simas Simaitis"},
    { id: 3, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Zigmas Zigmaitis"},
    { id: 4, date: "2019-12-12", time: "12:00", patientName: "Jonas", doctorName: "Paulius Paulauskas"}
    
];
function NewVisitPage() {
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Paieškos rezultatai"
        />
        
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
                    <Table.ColHeader><strong>Data</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Laikas</strong></Table.ColHeader>
                    <Table.ColHeader><strong>Gydytojas</strong></Table.ColHeader>
                    <Table.ColHeader/>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {vistsData.map(visit => (
                  <Table.Row key={visit.id}>
                    <Table.Col>
                        <div>{visit.date} </div>
                    </Table.Col>
                    <Table.Col>
                        <div>{visit.time}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{visit.doctorName}</div>
                    </Table.Col>
                    <Table.Col alignContent="right">
                      <Button.List>
                        <Button
                            href="/NewVisit"
                            RootComponent="a"
                            color="warning"
                            >
                                Registruotis
                        </Button>
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

export default NewVisitPage;
