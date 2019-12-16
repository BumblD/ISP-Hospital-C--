// @flow

import React, { useState, useEffect } from "react";

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";

let myID = 1;
let myRole = 4;
let myPatientID = 112;
let data_nuo = "2020-01-06";
let data_iki = "2020-01-07";
let specialistas = 3;



let visitsDemo = [
  { id: 2, data: "2019-09-12", laikas_val: 12, laikas_min: 0, nusiskundimas: "Pilvo skausmas", patvirtinimas: false, gydytojas: "Petras Petraitis", gydytojasID: 3, pacientas: "Jonas", pacientasID: 1},
  { id: 4, data: "2019-10-12", laikas_val: 12, laikas_min: 15, nusiskundimas: "", patvirtinimas: false, gydytojas: "Simas Simaitis", gydytojasID: 3, pacientas: "Petras", pacientasID: 2},
  { id: 6, data: "2019-11-12", laikas_val: 12, laikas_min: 30, nusiskundimas: "", patvirtinimas: false, gydytojas: "Zigmas Zigmaitis", gydytojasID: 3, pacientas: "Povilas", pacientasID: 3},
  { id: 8, data: "2019-12-12", laikas_val: 12, laikas_min: 45, nusiskundimas: "", patvirtinimas: false, gydytojas: "Paulius Paulauskas", gydytojasID: 4, pacientas: "Simas", pacientasID: 4}
];
let visitsDemo1 = [
  { id: 2, data: "2019-09-12", laikas_val: 12, laikas_min: 0, nusiskundimas: "Pilvo skausmas", patvirtinimas: false, gydytojas: "Petras Petraitis", gydytojasID: 3, pacientas: "Jonas", pacientasID: 1},
  { id: 4, data: "2019-10-12", laikas_val: 12, laikas_min: 15, nusiskundimas: "", patvirtinimas: false, gydytojas: "Simas Simaitis", gydytojasID: 3, pacientas: "Petras", pacientasID: 2},
  { id: 6, data: "2019-11-12", laikas_val: 12, laikas_min: 30, nusiskundimas: "", patvirtinimas: false, gydytojas: "Zigmas Zigmaitis", gydytojasID: 3, pacientas: "Povilas", pacientasID: 3},
  { id: 2, data: "2019-09-12", laikas_val: 12, laikas_min: 0, nusiskundimas: "Pilvo skausmas", patvirtinimas: false, gydytojas: "Petras Petraitis", gydytojasID: 3, pacientas: "Jonas", pacientasID: 1},
  { id: 4, data: "2019-10-12", laikas_val: 12, laikas_min: 15, nusiskundimas: "", patvirtinimas: false, gydytojas: "Simas Simaitis", gydytojasID: 3, pacientas: "Petras", pacientasID: 2},
  { id: 8, data: "2019-12-12", laikas_val: 12, laikas_min: 45, nusiskundimas: "", patvirtinimas: false, gydytojas: "Paulius Paulauskas", gydytojasID: 4, pacientas: "Simas", pacientasID: 4}
];
let doctors = [
  {id: 3, vardas: "Vardas1", pavarde: "Pavarde1", specializacija: "Bendra"},
  {id: 4, vardas: "Vardas2", pavarde: "Pavarde2", specializacija: "Bendra"}
];

function Doctor(user){
    if (user.tipas == 2) {
        return (
            <option value={user.gydytojas}> {user.vardas + " " + user.pavarde} </option>
            );
    }
}

const DetailsModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [visit, setVisit] = useState(props.visit);

    return (
        <React.Fragment>
            <Button color="info" onClick={() => setShowModal(true)}>Detalesnė informacija</Button>
            <Modal                //User details (pop-up)
                contentStyle={{overflowY: 'scroll', height: '85%'}}
                show={showModal}
                handleClose={() => setShowModal(false)}
                title='Vizito informacija'
                bodyContent={(
                    <Form>
                        <Form.Label>Data</Form.Label>
                        <Form.Input
                            name="data"
                            value={visit.data}
                            disabled
                        />
                        <Form.Label>Laikas (val)</Form.Label>
                        <Form.Input
                            name="laikas_val"
                            value={visit.laikas_val}
                            disabled
                        />
                        <Form.Label>Laikas (min)</Form.Label>
                        <Form.Input
                            name="laikas_min"
                            value={visit.laikas_min}
                            disabled
                        />
                        <Form.Label>Gydytojas</Form.Label>
                        <Form.Input
                            name="gydytojas"
                            value={visit.gydytojas}
                            disabled
                        />
                        <Form.Label>Nusiskundimas</Form.Label>
                        <Form.Input
                            name="nusiskundimas"
                            value={visit.nusiskundimas}
                            disabled
                        />
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
        fetch('https://localhost:44398/api/vizitas/' + props.visit.id, {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(props.visit)
        });
        window.location.reload();
    }

    return (
        <React.Fragment>
            <Button color="danger" onClick={() => setShowModal(true)}>Šalinti</Button>
            <Modal      //remove user modal
                show={showModal}
                handleClose={() => setShowModal(false)}
                title="Vizito šalinimas"
                bodyContent={
                    <Text className="remove-room-text">
                        Ar tikrai norite pašalinti vizitą (ID={props.visit.id})?
                    </Text>
                }
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
                ]} />
        </React.Fragment>
    );
};

const AcceptModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const submitForm = () => {
      setShowModal(false);
      fetch('https://localhost:44398/api/vizitas/accept/' + props.visit.id, {
          method: 'delete',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(props.visit)
      });
      window.location.reload();
  }

  return (
      <React.Fragment>
          <Button color="green" onClick={() => setShowModal(true)}>Patvirtinti</Button>
          <Modal      //remove user modal
              show={showModal}
              handleClose={() => setShowModal(false)}
              title="Vizito patvirtinimas"
              bodyContent={
                  <Text className="remove-room-text">
                      Ar tikrai norite patvirtinti vizitą (ID={props.visit.id})?
                  </Text>
              }
              actions={[
                  { label:"Atšaukti", onClick:() => setShowModal(false) },
                  { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
              ]} />
      </React.Fragment>
  );
};



const EditModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [visit, setVisit] = useState(props.visit);

    const submitForm = () => {
        setShowModal(false);
        fetch('https://localhost:44398/api/vizitas/' + visit.id, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(visit)
        });
    }

    const handleInputChange = (e) => {
        setVisit({
            ...visit,
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
                title='Vizito redagavimas'
                bodyContent={(
                    <Form>
                        <Form.Label>Data</Form.Label>
                        <Form.Input
                            name="data"
                            type="date"
                            value={visit.data}
                            onChange={handleInputChange}
                        />
                        
                        <Form.Label>Laikas (val)</Form.Label>
                        <Form.Select name="laikas_val" value={visit.laikas_val} onChange={handleInputChange}>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                        </Form.Select>
                        <Form.Label>Laikas (min)</Form.Label>
                        <Form.Select name="laikas_min" value={visit.laikas_min} onChange={handleInputChange}>
                          <option value="0">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </Form.Select>
                        <Form.Label>Gydytojas</Form.Label>
                        <Form.Select name="gydytojasID" value={visit.gydytojasID} onChange={handleInputChange}>
                          <option key="3" value="3"> Kristina </option>
                          <option key="4" value="4"> Loreta </option>
                        </Form.Select>

                        <Form.Label>Nusiskundimas</Form.Label>
                        <Form.Input
                            name="nusiskundimas"
                            value={visit.nusiskundimas}
                            onChange={handleInputChange}
                        />

                        
                    </Form>
                )}
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Išsaugoti", color:"primary", onClick:() => submitForm()  }
                ]}/>
        </React.Fragment>
    );
};

const RegisterModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [visit, setVisit] = useState(props.visit);

  const submitForm = () => {
      setShowModal(false);
      fetch('https://localhost:44398/api/vizitas/' + visit.id, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(visit)
      });
  }

  const handleInputChange = (e) => {
      setVisit({
          ...visit,
          [e.currentTarget.name]: e.currentTarget.value
      });
  }


  return (
      <React.Fragment>
          <Button color="blue" onClick={() => setShowModal(true)}>Registruotis</Button>
          <Modal                //Edit user (pop-up)
              contentStyle={{overflowY: 'scroll', height: '85%'}}
              show={showModal}
              handleClose={() => setShowModal(false)}
              title='Naujas vizitas'
              bodyContent={(
                  <Form>
                      <Form.Label>Paciento ID</Form.Label>
                      {myRole == 1 ? (
                        <React.Fragment>
                        <Form.Input
                          name="pacientasID"
                          type="number"
                          onChange={handleInputChange}
                      />
                      </React.Fragment>) : (<React.Fragment>
                        <Form.Input
                          name="pacientasID"
                          type="number"
                          value={myPatientID}
                          disabled
                          onChange={handleInputChange}
                      />
                      </React.Fragment>)
                      }
                      <Form.Label>Data</Form.Label>
                      <Form.Input
                          name="data"
                          type="date"
                          value={visit.data}
                          disabled
                          onChange={handleInputChange}
                      />
                      
                      <Form.Label>Laikas (val)</Form.Label>
                      <Form.Select disabled name="laikas_val" value={visit.laikas_val} onChange={handleInputChange}>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                      </Form.Select>
                      <Form.Label>Laikas (min)</Form.Label>
                      <Form.Select disabled name="laikas_min" value={visit.laikas_min} onChange={handleInputChange}>
                        <option value="0">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </Form.Select>
                      <Form.Label>Gydytojas</Form.Label>
                      <Form.Select disabled name="gydytojasID" value={visit.gydytojasID} onChange={handleInputChange}>
                        <option key="3" value="3"> Kristina </option>
                        <option key="4" value="4"> Loreta </option>
                      </Form.Select>

                      <Form.Label>Nusiskundimas</Form.Label>
                      <Form.Input
                          name="nusiskundimas"
                          value={visit.nusiskundimas}
                          onChange={handleInputChange}
                      />

                      
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

    const [visit, setVisit] = useState({
        id: 0,
        data: "2019-01-01",
        laikas_val: 8,
        laikas_min: 0,
        nusiskundimas: "Skausmas",
        patvirtinimas: false,
        gydytojas: "baseDoctor",
        gydytojasID: 0,
        pacientas: "basePatient",
        pacientasID: myPatientID
        
        
    });

    const handleInputChange = (e) => {
        setVisit({
            ...visit,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const submitForm = () => {
        setShowModal(false);
        fetch('https://localhost:44398/api/vizitas', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(visit)
        });
    }


    return (
        <React.Fragment>
            <Button color="primary" onClick={() => setShowModal(true)}>+ Naujas vizitas</Button>
            <Modal                //Add new user modal (pop-up)
                contentStyle={{overflowY: 'scroll', height: '85%'}}
                show={showModal}
                handleClose={() => setShowModal(false)}
                title='Naujas vizitas'
                bodyContent={(
                    <Form>
                      <Form.Label>Paciento ID</Form.Label>
                      {myRole == 1 ? (
                        <React.Fragment>
                        <Form.Input
                          name="pacientasID"
                          type="number"
                          onChange={handleInputChange}
                      />
                      </React.Fragment>) : (<React.Fragment>
                        <Form.Input
                          name="pacientasID"
                          type="number"
                          value={visit.pacientasID}
                          disabled
                          onChange={handleInputChange}
                      />
                      </React.Fragment>)
                      }
                    <Form.Input name='data' type="date" label='Data'  value={visit.data} placeholder='Įveskite vizito datą' onChange={handleInputChange} />
                    <Form.Select label="Laikas (val)" name="laikas_val" value={visit.laikas_val} onChange={handleInputChange}>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    </Form.Select>
                    <Form.Select label="Laikas (min)" name="laikas_min" value={visit.laikas_min} onChange={handleInputChange}>
                    <option value="0">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    </Form.Select>
                    <Form.Select label="Gydytojas" name="gydytojasID" value={visit.gydytojasID} onChange={handleInputChange}>
                    <option key="3" value="3"> Kristina </option>
                    <option key="4" value="4"> Loreta </option>
                    </Form.Select>
                    <Form.Input name='nusiskundimas' label='Nusiskundimas'  placeholder='Įveskite nusiskundimą' onChange={handleInputChange} />
                    </Form>
                )}
                actions={[
                    { label:"Atšaukti", onClick:() => setShowModal(false) },
                    { label:"Patvirtinti", color:"primary", onClick:() => submitForm()  }
                ]}/>
        </React.Fragment>
    );
};



const FilterModal = (props) => {

  const Details = () => {
      return (<div>labas</div>)
  };

  const [showModal, setShowModal] = useState(false);

  const [filterData, setFilterData] = useState({
      data_nuo: "2019-01-01",
      data_iki: "2019-12-31",
      gydytojasID: 3
  });

  const handleInputChange = (e) => {
      setFilterData({
          ...filterData,
          [e.currentTarget.name]: e.currentTarget.value
      });
  }

  const submitForm = () => {
      setShowModal(false);
      


  }


  return (
      <React.Fragment>
          <Button color="primary" onClick={() => setShowModal(true)}>Vizito paieška</Button>
          <Modal                //Add new user modal (pop-up)
              contentStyle={{overflowY: 'scroll', height: '85%'}}
              show={showModal}
              handleClose={() => setShowModal(false)}
              title='Vizito paiešką'
              bodyContent={(
                  <Form>
                  <Form.Input name='data_nuo' type="date" label='Data nuo'  value={filterData.data_nuo} placeholder='Įveskite laikotarpio pradžią' onChange={handleInputChange} />
                  <Form.Input name='data_iki' type="date" label='Data iki'  value={filterData.data_iki} placeholder='Įveskite laikotarpio pabaigą' onChange={handleInputChange} />
                  
                  <Form.Select label="Gydytojas" name="gydytojasID" value={filterData.gydytojasID} onChange={handleInputChange}>
                  <option key="3" value="3"> Kristina </option>
                  <option key="4" value="4"> Loreta </option>
                  </Form.Select>
                  </Form>
              )}
              actions={[
                  { label:"Atšaukti", onClick:() => setShowModal(false) },
                  { label:"Ieškoti", color:"primary", onClick:() => submitForm()  }
              ]}/>
      </React.Fragment>
  );
};





const VisitsPage = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showFiltered, setShowFiltered] = useState(false);

    const [hasError, setErrors] = useState(false);
    const [visits, setVisits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState(false);


const fetchVisits = () =>
    fetch("https://localhost:44398/api/vizitas/" + myID + "/" + myRole)
        .then(res => res.json())
        .then(data => {
            setVisits(data);

        })
        .catch(err => setErrors(err));

const fetchDoctors = () =>
    fetch()
        .then(res => res.json())
        .then(data => {
          setDoctors(data);
        })
        .catch(err => setErrors(err));

    useEffect(() => {
        fetchVisits();
    }, []);

    return (
        <SiteWrapper>
            <Page.Content>
                <Page.Header
                    title="Vizitai"
                />

                <div className="rooms-type-select">
                  {(myRole === 1 || myRole === 4) && !showFiltered && <FilterModal changeFilter={showFiltered, setShowFiltered}/>}
                    <div className="add-room-button">
                        {(myRole === 1 || myRole === 4) && !showFiltered && <NewModal />}
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
                                        {!showFiltered && <Table.ColHeader><strong>ID</strong></Table.ColHeader>}
                                        <Table.ColHeader><strong>Data</strong></Table.ColHeader>
                                        <Table.ColHeader><strong>Laikas</strong></Table.ColHeader>
                                        {!showFiltered && (myRole === 1 || myRole ===4) && <Table.ColHeader><strong>Pacientas</strong></Table.ColHeader>}
                                        <Table.ColHeader><strong>Gydytojas</strong></Table.ColHeader>
                                        <Table.ColHeader/>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {isLoading ? (
                                        <div>loading</div>
                                    ) : visits.map(visit => (
                                            <Table.Row key={visit.id}>
                                                {!showFiltered &&
                                                <Table.Col>
                                                    <div>{visit.id}</div>
                                                </Table.Col>}
                                                <Table.Col>
                                                    <div>{visit.data}</div>
                                                </Table.Col>
                                                <Table.Col>
                                                  <div>{visit.laikas_val} {visit.laikas_min}</div>
                                                </Table.Col>
                                                {!showFiltered && (myRole === 1 || myRole ===4) &&
                                                <Table.Col>
                                                    <div>{visit.pacientas}</div>
                                                </Table.Col>}
                                                <Table.Col>
                                                    <div>{visit.gydytojas}</div>
                                                </Table.Col>
                                                <Table.Col alignContent="right">
                                                    <Button.List>
                                                        {!showFiltered && <DetailsModal visit={visit}/>}
                                                        {!showFiltered && <EditModal visit={visit}/>}
                                                        {!showFiltered && myRole === 2 && <AcceptModal visit={visit} />}
                                                        {!showFiltered && <RemoveModal visit={visit}/>}
                                                        {showFiltered && <RegisterModal visit={visit}/>}
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
export default VisitsPage;
