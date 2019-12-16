// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import { Research } from ".";
import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";
import reactC3js from "react-c3js";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";


let usersData = [
    { Number: 1, Name: "Proc1", Surname: "Lig3", TypeId: 3, TypeName: "Procedura" },
    { Number: 2, Name: "Proc2", Surname: "Lig4", TypeId: 4, TypeName: "Procedura" },
    { Number: 3, Name: "Tyr1", Surname: "Lig1", TypeId: 1, TypeName: "Tyrimas" },
    { Number: 4, Name: "Tyr2", Surname: "Lig2", TypeId: 2, TypeName: "Tyrimas" },
    { Number: 5, Name: "Siunt1", Surname: "Siunt1", TypeId: 1, TypeName: "Siuntimas" },
    { Number: 6, Name: "Siunt2", Surname: "Siunt2", TypeId: 2, TypeName: "Siuntimas" },
    { Number: 7, Name: "Rec1", Surname: "Rec1", TypeId: 1, TypeName: "Receptas"},
    { Number: 8, Name: "Rec2", Surname: "Rec2", TypeId: 2, TypeName: "Receptas" },
    { Number: 9, Name: "Rec3", Surname: "Rec3", TypeId: 3, TypeName: "Receptas" },
];

let usersDetails = [
    { Number: 1, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010010",  Doctor: "Albertas Daktarinkus"},
    { Number: 2, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010020",  Doctor: ""},
    { Number: 3, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010030",  Doctor: ""},
    { Number: 4, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010040",  Doctor: ""},
    { Number: 5, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010050",  Doctor: ""},
    { Number: 6, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010060",  Doctor: ""},
    { Number: 7, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010070",  Doctor: ""},
    { Number: 8, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010080",  Doctor: ""},
    { Number: 9, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010090",  Doctor: ""},
    { Number: 10, Sex: 1, Phone: "860012345", Birthdate: "2000-01-01", ID: "30001010100",  Doctor: "" }
];

function DetailsType(user, readOnly) {
    if (user.TypeId === 1) {
        return (
            <div>
                <Form.Label>Priskirta gydytojui</Form.Label>
                <Form.Input readOnly={readOnly}
                            value={usersDetails[user.Number - 1].Doctor}
                />
            </div>
        );
    }
}

function Doctor(user){
    if (user.TypeId == 2) {
        return (
            <Form.SelectGroupItem label={user.Name + " " + user.Surname}/>
            );
    }
}

function UsersPage() {
    const [showAdd, setShowAdd] = useState(false);

    const removeModals = [];
    const doctorModals = [];
    const detailsModals = [];
    const editModals = [];
    usersData.forEach(user => {
        const [showRemove, setShowRemove] = useState(false);
        removeModals[user.Number] = {showRemove, setShowRemove};

        const [showDoctor, setShowDoctor] = useState(false);
        doctorModals[user.Number] = {showDoctor, setShowDoctor};

        const [showDetails, setShowDetails] = useState(false);
        detailsModals[user.Number] = {showDetails, setShowDetails};

        const [showEdit, setShowEdit] = useState(false);
        editModals[user.Number] = {showEdit, setShowEdit};
    });

    return (
        <SiteWrapper>
            <Page.Content>
                <Page.Header
                    title="Gydymas"
                />
        <div style={{display: 'flex', margin: '0em 0.7em 1em 0em'}}>
        <div style={{marginRight: "auto"}}>

            <Button
                color="primary"
                href="/Research"
                RootComponent="a"
                >
                    Tyrimai
            </Button>
            
        </div>
        <div style={{marginRight: "auto"}}>
        <Button
                
                color="primary"
                href="/Procedures"
                RootComponent="a"
                >
                    Procedūros
            </Button>
        </div>
        <div style={{marginRight: "auto"}}>
        <Button
                
                color="primary"
                href="/Prescriptions"
                RootComponent="a"
                >
                    Receptai
            </Button>
        </div>
        <div style={{marginRight: "auto"}}>
        <Button
                
                color="primary"
                href="/Dispatch"
                RootComponent="a"
                >
                    Siuntimai
            </Button>
        </div>
      </div>
               

        </Page.Content>
        </SiteWrapper>
    );
}

export default UsersPage;
