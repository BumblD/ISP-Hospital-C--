// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";


function handleSubmit(){

}


function EditVisitPage() {
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Vizito redagavimas"
        />
        
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <form action="/visits" method="get">
            <Form.Input name='date' label='Data' value="2019-12-12" />
            
            <Form.Input name='time' label='Laikas' value='12:00' />
            <Form.Input name='doctroID' label='Daktaro ID' value='Vardenis Pavardenis' />
            <Form.Input name='patientID' label='Paciento ID' value='Jonas Jonaitis' />
            <Form.Input name='details' label='Nusiskundimas' value='Galvos skausmas' /> 
            <input type="submit" value="submit" />
            
        </form>
        </div>

      </Page.Content>
      </SiteWrapper>
  );
}

export default EditVisitPage;
