// @flow

import React, { useState, useEffect } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";

function Doctor(user){
    if (user.tipas == 2) {
        return (
            <option value={user.gydytojas}> {user.vardas + " " + user.pavarde} </option>
            );
    }
}

const DetailsModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState(props.user);

    return (
        <React.Fragment>
            <Button color="info" onClick={() => setShowModal(true)}>Detalesnė informacija</Button>
            <Modal                //User details (pop-up)
                contentStyle={{overflowY: 'scroll', height: '85%'}}
                show={showModal}
                handleClose={() => setShowModal(false)}
                title='Vartotojo detalės'
                bodyContent={(
                    <Form>
                        <Form.Label>Elektroninis paštas</Form.Label>
                        <Form.Input
                            name="el_Pastas"
                            value={user.el_Pastas}
                            disabled
                        />
                        <Form.Label>Slaptažodis</Form.Label>
                        <Form.Input
                            name="slaptazodis"
                            value={user.slaptazodis}
                            disabled
                        />
                        <Form.Label>Vardas</Form.Label>
                        <Form.Input
                            name="vardas"
                            value={user.vardas}
                            disabled
                        />
                        <Form.Label>Pavardė</Form.Label>
                        <Form.Input
                            name="pavarde"
                            value={user.pavarde}
                            disabled
                        />
                        <Form.Label>Telefonas</Form.Label>
                        <Form.Input
                            name="telefonas"
                            value={user.telefonas}
                            disabled
                        />
                        <Form.Label>Gimimo data</Form.Label>
                        <Form.Input
                            name="gimimo_Data"
                            value={user.gimimo_Data}
                            disabled
                        />
                        <Form.Label>Asmens kodas</Form.Label>
                        <Form.Input
                            name="asmens_Kodas"
                            value={user.asmens_Kodas}
                            disabled
                        />
                        <Form.Label>Lytis</Form.Label>
                        <Form.Select name="lytis" value={user.lytis} disabled>
                            <option key="vyras" value="vyras"> Vyras </option>
                            <option key="moteris" value="moteris"> Moteris </option>
                        </Form.Select>
                        {user.tipas == 2 ? (
                            <React.Fragment>
                                <Form.Input name='laipsnis' label='Tabelio numeris' value={user.tabelio_Numeris} disabled />
                                <Form.Input name='laipsnis' label='Laipsnis' value={user.laipsnis} disabled />
                                <Form.Select label="Specializacija" name="specializacijos_Kodas" value={user.specializacijos_Kodas} disabled>
                                    <option value="1"> Bendra </option>
                                    <option value="2"> Oftolmologas </option>
                                    <option value="3"> LOR </option>
                                    <option value="4"> Traumatologas </option>
                                    <option value="5"> Chirurgas </option>
                                    <option value="6"> Kardiologas </option>
                                    <option value="7"> Infektologas </option>
                                    <option value="8"> Dermatologas </option>
                                    <option value="9"> Odontologas </option>
                                </Form.Select>
                            </React.Fragment>
                        ) : (<React.Fragment></React.Fragment>)}

                        {user.tipas == 3 ? (
                            <React.Fragment>
                                <Form.Input name='tabelio_Numeris' label='Tabelio numeris' value={user.tabelio_Numeris} disabled />
                            </React.Fragment>
                        ) : (<React.Fragment></React.Fragment>)}

                        {user.tipas == 4 ? (
                            <React.Fragment>
                                <Form.Input name='ugis' label='Ūgis' value={user.ugis}  placeholder='Įveskite vartotojo ūgį' disabled />
                                <Form.Input name='mase' label='Mase' value={user.mase}  placeholder='Įveskite vartotojo masę' disabled />
                                <Form.Select label="Kraujo grupė" name="kraujo_grupe" value={user.kraujo_Grupe} disabled>
                                    <option value="0"> 0 </option>
                                    <option value="A"> A </option>
                                    <option value="B"> B </option>
                                    <option value="AB"> AB </option>
                                </Form.Select>
                                <Form.Select label="Rezus" name="rezus" value={user.rezus} disabled>
                                    <option value="1"> + </option>
                                    <option value="0"> - </option>
                                </Form.Select>
                            </React.Fragment>
                        ) : (<React.Fragment></React.Fragment>)}
                    </Form>
                )}
                actions={[
                    { label:"Uždaryti", onClick:() => setShowModal(false) }
                ]}/>
        </React.Fragment>
    );
};

const RemoveModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const submitForm = () => {
        setShowModal(false);
        fetch('https://localhost:44398/vartotojas/deleteuserbyid/' + props.user.id, {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(props.user)
        });
        window.location.reload();
    }

    return (
        <React.Fragment>
            <Button color="danger" onClick={() => setShowModal(true)}>Šalinti</Button>
            <Modal      //remove user modal
                show={showModal}
                handleClose={() => setShowModal(false)}
                title="Kabineto šalinimas"
                bodyContent={
                    <Text className="remove-room-text">
                        Ar tikrai norite pašalinti {props.user.id} vartotoją?
                    </Text>
                }
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
                ]} />
        </React.Fragment>
    );
};

const DoctorModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState(props.user);

    const [users, setUsers] = useState(props.users);

    const submitForm = () => {
        setShowModal(false);
        fetch('https://localhost:44398/vartotojas/assigndoctor/' + user.asmens_Kodas, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        });
    }

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    return (
        <React.Fragment>
            <Button
                color="gray"
                disabled={props.user.tipas !== "4"}
                onClick={() => setShowModal(true)}>
                Priskirti gydytojui
            </Button>
            <Modal                //Assign user to doctor (pop-up)
                show={showModal}
                handleClose={() => setShowModal(false)}
                title='Priskirti gydytojui'
                bodyContent={
                    <Form>
                        <Form.Select label="Gydytojo vardas pavardė" name="priskirtas" value={user.priskirtas} onChange={handleInputChange}>
                            <option disabled selected value> -- pasirinkite gydytoją -- </option>
                            {props.users.map(doctor => (
                                Doctor(doctor)
                            ))}
                        </Form.Select>
                    </Form>
                }
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
                ]}/>
        </React.Fragment>
    );
};

const EditModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState(props.user);

    const submitForm = () => {
        setShowModal(false);
        fetch('https://localhost:44398/vartotojas/updateuserbyid/' + user.id, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        });
    }

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }


    return (
        <React.Fragment>
            <Button color="warning" onClick={() => setShowModal(true)}>Redaguoti</Button>
            <Modal                //Edit user (pop-up)
                contentStyle={{overflowY: 'scroll', height: '85%'}}
                show={showModal}
                handleClose={() => setShowModal(false)}
                title='Redaguoti vartotoją'
                bodyContent={(
                    <Form>
                        <Form.Label>Elektroninis paštas</Form.Label>
                        <Form.Input
                            name="el_Pastas"
                            value={user.el_Pastas}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Slaptažodis</Form.Label>
                        <Form.Input
                            name="slaptazodis"
                            value={user.slaptazodis}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Vardas</Form.Label>
                        <Form.Input
                            name="vardas"
                            value={user.vardas}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Pavardė</Form.Label>
                        <Form.Input
                            name="pavarde"
                            value={user.pavarde}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Telefonas</Form.Label>
                        <Form.Input
                            name="telefonas"
                            value={user.telefonas}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Gimimo data</Form.Label>
                        <Form.Input
                            value={user.gimimo_Data}
                            disabled
                        />
                        <Form.Label>Asmens kodas</Form.Label>
                        <Form.Input
                            name="asmens_Kodas"
                            value={user.asmens_Kodas}
                            disabled
                        />
                        <Form.Label>Lytis</Form.Label>
                        <Form.Select name="lytis" value={user.lytis} onChange={handleInputChange}>
                            <option key="vyras" value="vyras"> Vyras </option>
                            <option key="moteris" value="moteris"> Moteris </option>
                        </Form.Select>
                        {user.tipas == 2 ? (
                            <React.Fragment>
                                <Form.Input name='tabelio_Numeris' label='Tabelio numeris' value={user.tabelio_Numeris} disabled />
                                <Form.Input name='laipsnis' label='Laipsnis' value={user.laipsnis} onChange={handleInputChange} />
                                <Form.Select label="Specializacija" name="specializacijos_Kodas" value={user.specializacijos_Kodas} onChange={handleInputChange}>
                                    <option value="1"> Bendra </option>
                                    <option value="2"> Oftolmologas </option>
                                    <option value="3"> LOR </option>
                                    <option value="4"> Traumatologas </option>
                                    <option value="5"> Chirurgas </option>
                                    <option value="6"> Kardiologas </option>
                                    <option value="7"> Infektologas </option>
                                    <option value="8"> Dermatologas </option>
                                    <option value="9"> Odontologas </option>
                                </Form.Select>
                            </React.Fragment>
                        ) : (<React.Fragment></React.Fragment>)}

                        {user.tipas == 3 ? (
                            <React.Fragment>
                                <Form.Input name='tabelio_Numeris' label='Tabelio numeris' value={user.tabelio_Numeris} disabled />
                            </React.Fragment>
                        ) : (<React.Fragment></React.Fragment>)}

                        {user.tipas == 4 ? (
                            <React.Fragment>
                                <Form.Input name='ugis' label='Ūgis' value={user.ugis}  placeholder='Įveskite vartotojo ūgį' onChange={handleInputChange} />
                                <Form.Input name='mase' label='Mase' value={user.mase}  placeholder='Įveskite vartotojo masę' onChange={handleInputChange} />
                                <Form.Select label="Kraujo grupė" name="kraujo_Grupe" value={user.kraujo_Grupe} onChange={handleInputChange}>
                                    <option disabled selected value> -- pasirinkite kraujo grupę -- </option>
                                    <option value="0"> 0 </option>
                                    <option value="A"> A </option>
                                    <option value="B"> B </option>
                                    <option value="AB"> AB </option>
                                </Form.Select>
                                <Form.Select label="Rezus" name="rezus" value={user.rezus} onChange={handleInputChange}>
                                    <option disabled selected value> -- pasirinkite rezus -- </option>
                                    <option value="1"> + </option>
                                    <option value="0"> - </option>
                                </Form.Select>
                            </React.Fragment>
                        ) : (<React.Fragment></React.Fragment>)}
                    </Form>
                )}
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Išsaugoti", color:"primary", onClick:() => submitForm()  }
                ]}/>
        </React.Fragment>
    );
};

const NewModal = () => {

    const Details = () => {
        return (<div>labas</div>)
    };

    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState({
        tipas: "1",
        lytis: 'vyras',
        specializacija: "1",
        kraujo_Grupe: "0",
        rezus: "0"
    });

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const submitForm = () => {
        setShowModal(false);
        fetch('https://localhost:44398/vartotojas/createnewuser', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        });
    }


    return (
        <React.Fragment>
            <Button color="primary" onClick={() => setShowModal(true)}>+ Pridėti vartotoją</Button>
            <Modal                //Add new user modal (pop-up)
                contentStyle={{overflowY: 'scroll', height: '85%'}}
                show={showModal}
                handleClose={() => setShowModal(false)}
                title='Pridėti vartotoją'
                bodyContent={(
                    <Form>
                    <Form.Select label="Vartotojo tipas" name="tipas" value={user.tipas} onChange={handleInputChange}>
                    <option value="1"> Administratorius </option>
                    <option value="2"> Gydytojas </option>
                    <option value="3"> Laborantas </option>
                    <option value="4"> Pacientas </option>
                    </Form.Select>
                    <Form.Input name='el_Pastas' label='Elektroninis paštas'  placeholder='Įveskite vartotojo el paštą' onChange={handleInputChange} />
                    <Form.Input name='slaptazodis' label='Slaptažodis'  placeholder='Įveskite vartotojo slaptažodį' onChange={handleInputChange} />
                    <Form.Input name='vardas' label='Vardas'  placeholder='Įveskite vartotojo vardą' onChange={handleInputChange} />
                    <Form.Input name='pavarde' label='Pavardė' placeholder='Įveskite vartotojo pavardę' onChange={handleInputChange} />
                    <Form.Input name='asmens_Kodas' label='Asmens kodas' placeholder='Įveskite vartotojo asmens kodą' onChange={handleInputChange} />
                    <Form.Input name='gimimo_Data' label='Gimimo data' placeholder='Įveskite vartotojo gimimo datą' onChange={handleInputChange}/>
                    <Form.Input name='telefonas' label='Telefonas' placeholder='Įveskite vartotojo telefoną' onChange={handleInputChange}/>
                    <Form.Select label="Lytis" name="lytis" value={user.lytis} onChange={handleInputChange}>
                    <option key="vyras" value="vyras"> Vyras </option>
                    <option key="moteris" value="moteris"> Moteris </option>
                    </Form.Select>
                {user.tipas == 2 ? (
                    <React.Fragment>
                    <Form.Input name='laipsnis' label='Laipsnis'  placeholder='Įveskite vartotojo laipsni' onChange={handleInputChange} />
                    <Form.Select label="Specializacija" name="specializacijos_Kodas" value={user.specializacijos_Kodas} onChange={handleInputChange}>
                    <option value="1"> Bendra </option>
                    <option value="2"> Oftolmologas </option>
                    <option value="3"> LOR </option>
                    <option value="4"> Traumatologas </option>
                    <option value="5"> Chirurgas </option>
                    <option value="6"> Kardiologas </option>
                    <option value="7"> Infektologas </option>
                    <option value="8"> Dermatologas </option>
                    <option value="9"> Odontologas </option>
                    </Form.Select>
                    </React.Fragment>
                    ) : (<React.Fragment></React.Fragment>)}

                {user.tipas == 4 ? (
                    <React.Fragment>
                    <Form.Input name='ugis' label='Ūgis'  placeholder='Įveskite vartotojo ūgį' onChange={handleInputChange} />
                    <Form.Input name='mase' label='Mase'  placeholder='Įveskite vartotojo masę' onChange={handleInputChange} />
                    <Form.Select label="Kraujo grupė" name="kraujo_grupe" value={user.kraujo_grupe} onChange={handleInputChange}>
                    <option value="0"> 0 </option>
                    <option value="A"> A </option>
                    <option value="B"> B </option>
                    <option value="AB"> AB </option>
                    </Form.Select>
                    <Form.Select label="Rezus" name="rezus" value={user.rezus} onChange={handleInputChange}>
                    <option value="1"> + </option>
                    <option value="0"> - </option>
                    </Form.Select>
                    </React.Fragment>
                    ) : (<React.Fragment></React.Fragment>)}
                    </Form>
                )}
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Patvirtinti", color:"primary", onClick:() => submitForm()  }
                ]}/>
        </React.Fragment>
    );
};

const UsersPage = () => {
    const [showAdd, setShowAdd] = useState(false);

    const [hasError, setErrors] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


const fetchUsers = () =>
    fetch("https://localhost:44398/vartotojas/getallusers")
        .then(res => res.json())
        .then(data => {
            setUsers(data);

        })
        .catch(err => setErrors(err));

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <SiteWrapper>
            <Page.Content>
                <Page.Header
                    title="Vartotojai"
                />

                <div className="rooms-type-select">
                    <div className="add-room-button">
                        <NewModal/>
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
                                    {isLoading ? (
                                        <div>loading</div>
                                    ) : users.map(user => (
                                            <Table.Row key={user.id}>
                                                <Table.Col>
                                                    <div>{user.id}</div>
                                                </Table.Col>
                                                <Table.Col>
                                                    <div>{user.vardas}</div>
                                                </Table.Col>
                                                <Table.Col>
                                                    <div>{user.pavarde}</div>
                                                </Table.Col>
                                                <Table.Col>
                                                    <div>{user.tipo_Vardas}</div>
                                                </Table.Col>
                                                <Table.Col alignContent="right">
                                                    <Button.List>
                                                        <DetailsModal user={user}/>
                                                        <DoctorModal user={user} users={users}/>
                                                        <EditModal user={user}/>
                                                        <RemoveModal user={user}/>

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
