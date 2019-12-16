import * as React from "react";
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
  Empty,
  Email,
  ProfilePage,
  Rooms,
  Visits,
  NewVisit,
  ListVisit,
  FilterVisit,
  FilteredVisit,
  EditVisit,
  DetailsVisit,
  Users,
  Healthcare,
  Research,
  Procedures,
  Prescriptions,
  Dispatch,
  DetailsPrescription,
  DetailsProcedure,
  DetailsResearch,
  DetailsDispatch,
  NewPrescription,
  NewResearch,
  NewDispatch,
  NewProcedure
} from "./pages";

import HomePage from "./HomePage.react";
import FormElementsPage from "./FormElementsPage.react";
import PricingCardsPage from "./interface/PricingCardsPage.react";
import CardsDesignPage from "./interface/CardsDesignPage.react";
import StoreCardsPage from "./components/StoreCardsPage.react.js";
import IconPage from "./components/IconPage.react.js";
import ChartsPage from "./interface/ChartsPage.react";
import GalleryPage from "./GalleryPage.react";
import MapCardsPage from "./components/MapCardsPage.react";
import BlogPage from "./components/BlogPage.react";

import "tabler-react/dist/Tabler.css";
import { visible } from "ansi-colors";


function App(props) {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
              <Redirect to="/login"/>
          )}/>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/400" component={Error400} />
          <Route exact path="/401" component={Error401} />
          <Route exact path="/403" component={Error403} />
          <Route exact path="/404" component={Error404} />
          <Route exact path="/500" component={Error500} />
          <Route exact path="/503" component={Error503} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/cards" component={CardsDesignPage} />
          <Route exact path="/charts" component={ChartsPage} />
          <Route exact path="/email" component={Email} />
          <Route exact path="/empty-page" component={Empty} />
          <Route exact path="/form-elements" component={FormElementsPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/gallery" component={GalleryPage} />
          <Route exact path="/icons" component={IconPage} />
          <Route exact path="/maps" component={MapCardsPage} />
          <Route exact path="/pricing-cards" component={PricingCardsPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/store" component={StoreCardsPage} />
          <Route exact path="/rooms" component={Rooms} />
          <Route exact path="/visits" component={Visits} />
          <Route exact path="/NewVisit" component={NewVisit} />
          <Route exact path="/ListVisit" component={ListVisit} />
          <Route exact path="/FilterVisit" component={FilterVisit} />
          <Route exact path="/FilteredVisit" component={FilteredVisit} />
          <Route exact path="/EditVisit" component={EditVisit} />
          <Route exact path="/DetailsVisit" component={DetailsVisit} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/healthcare" component={Healthcare} />
          <Route exact path="/research" component={Research} />
          <Route exact path="/procedures" component={Procedures} />
          <Route exact path="/prescriptions" component={Prescriptions} />
          <Route exact path="/detailsdispatch" component={DetailsDispatch} />
          <Route exact path="/detailsprescription" component={DetailsPrescription} />
          <Route exact path="/detailsprocedure" component={DetailsProcedure} />
          <Route exact path="/detailsresearch" component={DetailsResearch} />
          <Route exact path="/newdispatch" component={NewDispatch} />
          <Route exact path="/newprocedure" component={NewProcedure} />
          <Route exact path="/newresearch" component={NewResearch} />
          <Route exact path="/newprescription" component={NewPrescription} />
          <Route exact path="/dispatch" component={Dispatch} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
