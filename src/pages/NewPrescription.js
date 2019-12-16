
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
          title="Naujas receptas"
        />
        
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <form action="/visits" method="get">
            <Form.Input name='date' label='Data' placeholder='Įveskite vizito datą' />
            <Form.Input name='period' label='Laikotarpis' placeholder='Įveskite laikotarpį' />
            <Form.Input name='dose' label='Dozė' placeholder='Įveskite dozę' />
            <Form.Input name='comment' label='Komentaras' placeholder='Įveskite komentarą' />
            <Form.Input name='discount' label='Nuolaida' placeholder='Įveskite nuolaidą' />
            <Form.Input name='patientID' label='Paciento ID' placeholder='Įveskite paciento ID' />
            <Form.Input name='prescriptionID' label='Recepto ID' placeholder='Įveskite recepto ID' />
            <Form.Input name='doctorID' label='Daktaro ID' placeholder='Įveskite daktaro ID' />
            <input type="submit" value="submit" />
        </form>
        </div>

      </Page.Content>
      </SiteWrapper>
  );
}

export default NewVisitPage;
