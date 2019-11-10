// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";
import queryString from "querystring";
import SiteWrapper from "../SiteWrapper.react";
import { NewVisit } from ".";
import { ListVisit } from ".";
import reactC3js from "react-c3js";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";


class Visits extends React.Component{
 selectOption(){
    

    
    
    
}
state={
    action: "list"
}

render() {
  
  
  return (
      
    
      <Page.Content>
          <ListVisit />
        
      </Page.Content>
    
  );
}


}
export default Visits;