// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";


function handleSubmit(){

}


function NewVisitPage() {
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Vizitų paieška"
        />
        
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <form action="/FilteredVisit" method="get">
                  <Form.Input name='date1' label='Data nuo' placeholder='Įveskite datą (nuo)' />
                  <Form.Input name='date2' label='Data iki' placeholder='Įveskite datą (iki)' />
                  <Form.Input name='doctroID' label='Daktaro ID' placeholder='Įveskite daktaro ID' />
                  <input type="submit" value="submit" />
                </form>
        </div>

      </Page.Content>
      </SiteWrapper>
  );
}

export default NewVisitPage;
