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
          title="Naujas vizitas"
        />
        
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <form action="/visits" method="get">
            <Form.Input name='date' label='Data' placeholder='Įveskite vizito datą' />
            <Form.Input name='time' label='Laikas' placeholder='Įveskite vizito laiką' />
            <Form.Input name='doctroID' label='Daktaro ID' placeholder='Įveskite daktaro ID' />
            <Form.Input name='patientID' label='Paciento ID' placeholder='Įveskite paciento ID' />
            <Form.Input name='details' label='Nusiskundimas' placeholder='Trumpai parašykite nusiskundimo pobūdį' /> 
            <input type="submit" value="submit" />
            
        </form>
        </div>

      </Page.Content>
      </SiteWrapper>
  );
}

export default NewVisitPage;
