// @flow

import React, { useState } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";


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

                <div className="rooms-type-select">
                    <Form.Select className="w-auto mr-2">
                        <option value="aaa">Pasirinkite gydymo tipą</option>
                        <option value="1">Proceduros</option>
                        <option value="2">Tyrimai</option>
                        <option value="3">Siuntimai</option>
                        <option value="4">Receptai</option>
                    </Form.Select>
                    <div className="add-room-button">
                        <Button color="primary" onClick={() => setShowAdd(true)}>+ Pridėti gydymą</Button>
                        <Modal                //Add new user modal (pop-up)
                            show={showAdd}
                            handleClose={() => setShowAdd(false)}
                            title='Pridėti gydymą'
                            bodyContent={
                                <Form>
                                    <Form.Input name='number' label='Numeris' placeholder='Įveskite unikalų vartotojo numerį' />
                                    <Form.Input name='name' label='Vardas' placeholder='Įveskite vartotojo vardą' />
                                    <Form.Input name='surname' label='Pavardė' placeholder='Įveskite vartotojo pavardę' />
                                    <Form.Input name='id' label='Asmens kodas' placeholder='Įveskite vartotojo asmens kodą' />
                                    <Form.Input name='birthdate' label='Gimimo data' placeholder='Įveskite vartotojo gimimo datą' />
                                    <Form.Input name='phone' label='Telefonas' placeholder='Įveskite vartotojo telefoną' />
                                    <Form.Label>Lytis</Form.Label>
                                    <Form.SelectGroup>
                                        <Form.SelectGroupItem label="Vyras" name="sex" value="1" />
                                        <Form.SelectGroupItem label="Moteris" name="sex" value="2" />
                                    </Form.SelectGroup>
                                    <Form.Label>Patalpos tipas</Form.Label>
                                    <Form.SelectGroup>
                                        <Form.SelectGroupItem label="Procedura" name="type" value="1" />
                                        <Form.SelectGroupItem label="Gydytojas" name="type" value="2" />
                                        <Form.SelectGroupItem label="Laborantas" name="type" value="3" />
                                        <Form.SelectGroupItem label="Administratorius" name="type" value="4" />
                                    </Form.SelectGroup>
                                </Form>
                            }
                            actions={[
                                { label:"Atšaukti", onClick:() => setShowAdd(false) },
                                { label:"Patvirtinti", color:"primary", onClick:() => setShowAdd(false) }
                            ]}/>
                    </div>
                </div>
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
                                        <Table.ColHeader><strong>Nr.</strong></Table.ColHeader>
                                        <Table.ColHeader><strong>Vardas</strong></Table.ColHeader>
                                        <Table.ColHeader><strong>Pavardė</strong></Table.ColHeader>
                                        <Table.ColHeader><strong>Tipas</strong></Table.ColHeader>
                                        <Table.ColHeader/>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {usersData.map(user => (
                                        <Table.Row key={user.Number}>
                                            <Table.Col>
                                                <div>{user.Number}</div>
                                            </Table.Col>
                                            <Table.Col>
                                                <div>{user.Name}</div>
                                            </Table.Col>
                                            <Table.Col>
                                                <div>{user.Surname}</div>
                                            </Table.Col>
                                            <Table.Col>
                                                <div>{user.TypeName}</div>
                                            </Table.Col>
                                            <Table.Col alignContent="right">
                                                <Button.List>
                                                    <Button color="info" onClick={() => detailsModals[user.Number].setShowDetails(true)}>Detalesnė informacija</Button>
                                                    <Modal                //User details (pop-up)
                                                        show={detailsModals[user.Number].showDetails}
                                                        handleClose={() => detailsModals[user.Number].setShowDetails(false)}
                                                        title='Vartotojo detalės'
                                                        bodyContent={
                                                            <Form>
                                                                <Form.Label>Lytis</Form.Label>
                                                                <Form.Input disabled
                                                                            value={usersDetails[user.Number - 1].Sex}
                                                                />
                                                                <Form.Label>Gimimo data</Form.Label>
                                                                <Form.Input disabled
                                                                            value={usersDetails[user.Number - 1].Birthdate}
                                                                />
                                                                <Form.Label>Asmens kodas</Form.Label>
                                                                <Form.Input disabled
                                                                            value={usersDetails[user.Number - 1].ID}
                                                                />
                                                                <Form.Label>Telefonas</Form.Label>
                                                                <Form.Input disabled
                                                                            value={usersDetails[user.Number - 1].Phone}
                                                                />
                                                                {DetailsType(user, true)}
                                                            </Form>
                                                        }
                                                        actions={[
                                                            { label:"Uždaryti", onClick:() => detailsModals[user.Number].setShowDetails(false) }
                                                        ]}/>
                                                    <Button
                                                        color="gray"
                                                        disabled={user.TypeId !== 1}
                                                        onClick={() => doctorModals[user.Number].setShowDoctor(true)}>
                                                        Priskirti gydytojui
                                                    </Button>
                                                    <Modal                //Assign user to doctor (pop-up)
                                                        show={doctorModals[user.Number].showDoctor}
                                                        handleClose={() => doctorModals[user.Number].setShowDoctor(false)}
                                                        title='Priskirti gydytojui'
                                                        bodyContent={
                                                            <Form>
                                                                <Form.Label>Gydytojo vardas pavardė</Form.Label>
                                                                <Form.SelectGroup>
                                                                    {usersData.map(doctor => (
                                                                        Doctor(doctor)
                                                                    ))}

                                                                </Form.SelectGroup>
                                                            </Form>
                                                        }
                                                        actions={[
                                                            { label:"Atšaukti", onClick:() => doctorModals[user.Number].setShowDoctor(false) },
                                                            { label:"Patvirtinti", color:"primary", onClick:() => doctorModals[user.Number].setShowDoctor(false) }
                                                        ]}/>



                                                    <Button color="warning" onClick={() => editModals[user.Number].setShowEdit(true)}>Redaguoti</Button>
                                                    <Modal                //Edit user (pop-up)
                                                        show={editModals[user.Number].showEdit}
                                                        handleClose={() => editModals[user.Number].setShowEdit(false)}
                                                        title='Redaguoti vartotoją'
                                                        bodyContent={
                                                            <Form>
                                                                <Form.Label>Vardas</Form.Label>
                                                                <Form.Input
                                                                    value={user.Name}
                                                                />
                                                                <Form.Label>Pavardė</Form.Label>
                                                                <Form.Input
                                                                    value={user.Surname}
                                                                />
                                                                <Form.Label>Telefonas</Form.Label>
                                                                <Form.Input
                                                                    value={usersDetails[user.Number - 1].Phone}
                                                                />
                                                                <Form.Label>Gimimo data</Form.Label>
                                                                <Form.Input
                                                                    value={usersDetails[user.Number - 1].Birthdate}
                                                                />
                                                                <Form.Label>Asmens kodas</Form.Label>
                                                                <Form.Input
                                                                    value={usersDetails[user.Number - 1].ID}
                                                                />
                                                                <Form.Label>Lytis</Form.Label>
                                                                <Form.SelectGroup>
                                                                    <Form.SelectGroupItem checked={usersDetails[user.Number - 1].Sex === 1} label="Vyras" name="sex" value="1" />
                                                                    <Form.SelectGroupItem checked={usersDetails[user.Number - 1].Sex === 2} label="Moteris" name="sex" value="2" />
                                                                </Form.SelectGroup>
                                                                <Form.Label>Vartotojo tipas</Form.Label>
                                                                <Form.SelectGroup>
                                                                    <Form.SelectGroupItem checked={user.TypeId === 1} label="Pacientas" name="type" value="1" />
                                                                    <Form.SelectGroupItem checked={user.TypeId === 2} label="Gydytojas" name="type" value="2" />
                                                                    <Form.SelectGroupItem checked={user.TypeId === 3} label="Laborantas" name="type" value="3" />
                                                                    <Form.SelectGroupItem checked={user.TypeId === 4} label="Administratorius" name="type" value="4" />
                                                                </Form.SelectGroup>
                                                                {DetailsType(user, false)}
                                                            </Form>
                                                        }
                                                        actions={[
                                                            { label:"Atšaukti", onClick:() => editModals[user.Number].setShowEdit(false) },
                                                            { label:"Išsaugoti", color:"primary", onClick:() => editModals[user.Number].setShowEdit(false) }
                                                        ]}/>



                                                    <Button color="danger" onClick={() => removeModals[user.Number].setShowRemove(true)}>Šalinti</Button>
                                                    <Modal      //remove user modal
                                                        show={removeModals[user.Number].showRemove}
                                                        handleClose={() => removeModals[user.Number].setShowRemove(false)}
                                                        title="Kabineto šalinimas"
                                                        bodyContent={
                                                            <Text className="remove-room-text">
                                                                Ar tikrai norite pašalinti {user.Number} vartotoją?
                                                            </Text>
                                                        }
                                                        actions={[
                                                            { label:"Atšaukti", onClick:() => removeModals[user.Number].setShowRemove(false) },
                                                            { label:"Patvirtinti", color:"primary", onClick:() => removeModals[user.Number].setShowRemove(false) }
                                                        ]} />
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

export default UsersPage;
