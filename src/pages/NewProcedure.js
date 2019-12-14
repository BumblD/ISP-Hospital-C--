
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
          title="Nauja procedūra"
        />
        
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <form action="/visits" method="get">
            <Form.Input name='date' label='Data' placeholder='Įveskite vizito datą' />
            <Form.Input name='amount' label='Kiekis' placeholder='Įveskite kiekį' />
            <Form.Input name='comment' label='Komentaras' placeholder='Įveskite komentarą' />
            <Form.Input name='procedure' label='Procedūra' placeholder='Įveskite procedūrą' />
            <Form.Input name='doctorID' label='Daktaro ID' placeholder='Įveskite daktaro ID' />
            <Form.Input name='roomID' label='Patalpos ID' placeholder='Įveskite patalpos ID' />
            <Form.Input name='patientID' label='Paciento ID' placeholder='Įveskite paciento ID' />
            <input type="submit" value="submit" />
            
        </form>
        </div>

      </Page.Content>
      </SiteWrapper>
  );
}

export default NewVisitPage;
