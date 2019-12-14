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
          title="Recepto peržiūra"
        />
        
        
        <h1>Vizitas #1</h1>
        
        <p>Data: 2019-12-12</p>
        
        <p>Laikas: 12:00</p>
        
        <p>Pacientas: Vardenis Pavardenis</p>
        
        <p>Specialistas: Oftolmologas</p>
        
        <p>Gydytojas: Jonas Jonaitis</p>
        
        <p>Nusiskundimas: Galvos skausmas</p>

        <p>Gydytojo komentaras: komentaro nėra</p>
        
        <p>Paskirtas gydymas: Vaistai nuo galvos skausmo</p>
        
        <p>Vartojimas: 3 kart dienoj po 1 tablete</p>
        
        
        
        
        
        
        

      </Page.Content>
      </SiteWrapper>
  );
}

export default EditVisitPage;
