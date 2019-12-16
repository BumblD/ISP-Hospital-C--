// @flow

import React, { useState, useEffect } from "react";

import axios from 'axios';

import { Page, Grid, Form, Table, Card, Button, Text } from "tabler-react";

import Modal from "../components/Modal";

import SiteWrapper from "../SiteWrapper.react";

import "../styles/rooms.css";


const API = "https://localhost:44398/rooms/";

function DetailsType(room, roomDetails, readOnly) {
  if (room.TypeId === 1) {
    return (
      <div>
        <Form.Label>Priskirta pacientams</Form.Label>
        <Form.Textarea disabled = {readOnly}
          defaultValue = {roomDetails.patients.join(",\n")}
          rows={roomDetails.patients.length}
        />
      </div>
      );
  } else if (room.typeId === 2) {
    return (
      <div>
        <Form.Label>Priskirta gydytojui</Form.Label>
        <Form.Input readOnly = {readOnly}
          value={roomDetails.doctor}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Form.Label>Priskirta procedūrai</Form.Label>
        <Form.Input readOnly = {readOnly}
          value={roomDetails.procedure}
        />
      </div>
    );
  }
}

const DetailsModal = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);

  const fetchRoomDetails = () =>
  fetch(API + "GetRoomDetails/" + props.room.number)
      .then(res => res.json())
      .then(data => {
        setRoomDetails(data);
      })

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  return (
    <React.Fragment>
      <Button color="info" onClick={() => setShowDetails(true)}>Detalesnė informacija</Button>
      <Modal                //Room details (pop-up)
        show={showDetails} 
        handleClose={() => setShowDetails(false)} 
        title='Pridėti patalpą' 
        bodyContent={
          <Form>
            <Form.Label>Pilnas adresas</Form.Label>
            <Form.Input disabled
              value={roomDetails.address}
            />
            <Form.Label>Kabineto numeris</Form.Label>
            <Form.Input disabled
              value={props.room.number}
            />
            <Form.Label>Patalpos plotas</Form.Label>
            <Form.Input disabled
              value={props.room.area}
            />
            <Form.Label>Patalpos tipas</Form.Label>
            <Form.Input disabled
              value={props.room.typeName}
            />
            <Form.Label>Vietų skaičius</Form.Label>
            <Form.Input disabled
              value={props.room.size}
            />
            {DetailsType(props.room, roomDetails, true)}
          </Form>
        }
        actions={[
            { label:"Uždaryti", onClick:() => setShowDetails(false) }
        ]}/>
    </React.Fragment>);
};

const PatientModal = (props) => {
  const [showPatient, setShowPatient] = useState(false);
  
  const [assign, setAssign] = useState({
    roomId: props.room.number,
    patientCode: 0,
    from: "2019-12-16",
    to: "2019-12-23"
});

  const handleInputChange = (e) => {
    if ([e.currentTarget.name] == "roomId" || [e.currentTarget.name] == "patientCode") {
      setAssign({
          ...assign,
          [e.currentTarget.name]: parseInt(e.currentTarget.value)
      });
    } else {
      setAssign({
        ...assign,
        [e.currentTarget.name]: e.currentTarget.value
    });
    }
}

  const submitForm = () => {
    console.log(assign);
    fetch(API + "AssignToPatient", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(assign),
    }).then(res => {
      if(res.ok) {
        window.location.reload();
      } else {
        alert("Patikrinkite ar teisingai įvesti duomenys");
      }
    })
}

  return (<React.Fragment>
            <Button color="gray" disabled={props.room.typeId !== 1} onClick={() => setShowPatient(true)}>
              Priskirti pacientui
            </Button>
            <Modal                //Assign room to patient (pop-up)
              show={showPatient} 
              handleClose={() => setShowPatient(false)} 
              title='Pridėti patalpą' 
              bodyContent={
                <Form>
                  <Form.Label>Paciento asmens kodas</Form.Label>
                  <Form.Input
                    name="patientCode"
                    className="mb-3"
                    icon="search"
                    placeholder="Įveskite paciento asmens kodą"
                    position="append"
                    onChange={handleInputChange}
                  />
                  <Form.Label>Palata priskiriama nuo</Form.Label>
                  <Form.DatePicker
                    name="from"
                    format="yyyy/mm/dd"
                    monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
                    onChange={handleInputChange}
                  <Form.Label>Palata priskiriama iki</Form.Label>
                  <Form.DatePicker
                    name="to"
                    format="yyyy/mm/dd"
                    monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
                    onChange={handleInputChange}
                </Form>
              }
              actions={[
                  { label:"Atšaukti", onClick:() => setShowPatient(false) }, 
                  { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
              ]}/>
  </React.Fragment>);
};

const ProcedureModal = (props) => {
  const [showProcedure, setShowProcedure] = useState(false);

  const [assign, setAssign] = useState({
    roomId: props.room.number,
    procType: 0,
    from: "2019-12-16",
    to: "2019-12-23"
});

  const handleInputChange = (e) => {
    if ([e.currentTarget.name] == "roomId" || [e.currentTarget.name] == "procType") {
      setAssign({
          ...assign,
          [e.currentTarget.name]: parseInt(e.currentTarget.value)
      });
    } else {
      setAssign({
        ...assign,
        [e.currentTarget.name]: e.currentTarget.value
    });
    }
}

  const submitForm = () => {
    console.log(assign);
    fetch(API + "AssignToProcedure", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(assign),
    }).then(res => {
      if(res.ok) {
        window.location.reload();
      } else {
        alert("Patikrinkite ar teisingai įvesti duomenys");
      }
    })
}

  return (<React.Fragment>
    <Button color="gray" disabled={props.room.typeId !== 3} onClick={() => setShowProcedure(true)}>Priskirti procedūrai</Button>
    <Modal                //Assign room to procedure (pop-up)
      show={showProcedure} 
      handleClose={() => setShowProcedure(false)} 
      title='Pridėti patalpą' 
      bodyContent={
        <Form>
          <div className="procedure-type">
            <Form.Select className="w-auto mr-2" label="Procedūros tipas" name="procType" onChange={handleInputChange}>
                <option value="1">Šildymas</option>
                <option value="2">Ekoskopija</option>
                <option value="3">Keistas gydymo pavadinimas</option>
            </Form.Select>
          </div>
          <br/>
          <Form.Label>Patalpa procedūrai priskiriama nuo</Form.Label>
          <Form.DatePicker
            name="from"
            format="yyyy/mm/dd"
            monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
            onChange={handleInputChange}
          <Form.Label>Patalpa procedūrai priskiriama iki</Form.Label>
          <Form.DatePicker
            name="to"
            format="yyyy/mm/dd"
            monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
            onChange={handleInputChange}
        </Form>
      }
      actions={[
          { label:"Atšaukti", onClick:() => setShowProcedure(false) }, 
          { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
      ]}/>
  </React.Fragment>);
};

const DoctorModal = (props) => {
  const [showDoctor, setShowDoctor] = useState(false);

  const [assign, setAssign] = useState({
    roomId: props.room.number,
    tabNum: 0,
    from: "2019-12-16",
    to: "2019-12-23"
});

  const handleInputChange = (e) => {
    if ([e.currentTarget.name] == "roomId" || [e.currentTarget.name] == "tabNum") {
      setAssign({
          ...assign,
          [e.currentTarget.name]: parseInt(e.currentTarget.value)
      });
    } else {
      setAssign({
        ...assign,
        [e.currentTarget.name]: e.currentTarget.value
    });
    }
}

  const submitForm = () => {
    console.log(assign);
    fetch(API + "AssignToDoctor", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(assign),
    }).then(res => {
      if(res.ok) {
        window.location.reload();
      } else {
        alert("Patikrinkite ar teisingai įvesti duomenys");
      }
    })
}

  return (<React.Fragment>
    
    <Button 
      color="gray" 
      disabled={props.room.typeId !== 2 && props.room.typeId !== 3} 
      onClick={() => setShowDoctor(true)}>
      Priskirti gydytojui
    </Button>
    <Modal                //Assign room to doctor (pop-up)
      show={showDoctor} 
      handleClose={() => setShowDoctor(false)} 
      title='Pridėti patalpą' 
      bodyContent={
        <Form>
          <Form.Label>Gydytojo tabelio numeris</Form.Label>
          <Form.Input
            name="tabNum"
            className="mb-3"
            icon="search"
            placeholder="Įveskite gydytojo tabelio numerį..."
            position="append"
            onChange={handleInputChange}
          />
          <Form.Label>Kabinetas priskiriamas nuo</Form.Label>
          <Form.DatePicker
            name="from"
            format="yyyy/mm/dd"
            monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
            onChange={handleInputChange}
          <Form.Label>Kabinetas priskiriamas iki</Form.Label>
          <Form.DatePicker
            name="to"
            format="yyyy/mm/dd"
            monthLabels={["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]}/>
            onChange={handleInputChange}
        </Form>
      }
      actions={[
          { label:"Atšaukti", onClick:() => setShowDoctor(false) }, 
          { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
      ]}/>
  </React.Fragment>);
};

const EditModal = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);

  const fetchRoomDetails = () =>
  fetch(API + "GetRoomDetails/" + props.room.number)
      .then(res => res.json())
      .then(data => {
        setRoomDetails(data);
      })

  useEffect(() => {
    fetchRoomDetails();
  }, []);

return (<React.Fragment>
  <Button color="warning" onClick={() => setShowEdit(true)}>Redaguoti</Button>
  <Modal                //Edit room (pop-up)
    show={showEdit} 
    handleClose={() => setShowEdit(false)} 
    title='Pridėti patalpą' 
    bodyContent={
      <Form>
        <Form.Label>Pilnas adresas</Form.Label>
        <Form.Input 
          value={roomDetails.address}
        />
        <Form.Label>Kabineto numeris</Form.Label>
        <Form.Input 
          value={props.room.Number}
        />
        <Form.Label>Patalpos plotas</Form.Label>
        <Form.Input 
          value={props.room.Area}
        />
        <Form.Label>Patalpos tipas</Form.Label>
        <Form.SelectGroup>
          <Form.SelectGroupItem checked={props.room.typeId === 1} label="Palata" name="type" value="1" />
          <Form.SelectGroupItem checked={props.room.typeId === 2} label="Kabinetas" name="type" value="2" />
          <Form.SelectGroupItem checked={props.room.typeId === 3} label="Laboratorija" name="type" value="3" />
        </Form.SelectGroup>
        <Form.Label>Vietų skaičius</Form.Label>
        <Form.Input
          value={props.room.size}
        />
        {DetailsType(props.room, roomDetails, false)}
      </Form>
    }
    actions={[
        { label:"Atšaukti", onClick:() => setShowEdit(false) },
        { label:"Išsaugoti", color:"primary", onClick:() => setShowEdit(false) }
    ]}/>
</React.Fragment>);
}

const RemoveModal = (props) => {
  const [showRemove, setShowRemove] = useState(false);

  const submitForm = () => {
    fetch(API + "DeleteRoom" + "/" + props.room.number, {
        method: 'DELETE'
    }).then(res => {
      if(res.ok) {
        window.location.reload();
      } else {
        alert("Patikrinkite ar teisingai įvesti duomenys");
      }
    })
}

return (<React.Fragment>
    <Button color="danger" onClick={() => setShowRemove(true)}>Šalinti</Button>
  <Modal      //remove room modal
    show={showRemove} 
    handleClose={() => setShowRemove(false)} 
    title="Kabineto šalinimas"
    bodyContent={
      <Text className="remove-room-text">
        Ar tikrai norite pašalinti {props.room.number} patalpą?
      </Text>
    }
    actions={[
      { label:"Atšaukti", onClick:() => setShowRemove(false) }, 
      { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
    ]} />
</React.Fragment>);
}

const AddModal = () => {
  const [showAdd, setShowAdd] = useState(false);

  const [room, setRoom] = useState({
    number: 0,
    area: 0,
    size: 0,
    typeId: 1,
});

  const handleInputChange = (e) => {
    setRoom({
        ...room,
        [e.currentTarget.name]: parseInt(e.currentTarget.value)
    });
}

  const submitForm = () => {
    fetch(API + "CreateRoom", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(room),
    }).then(res => {
      if(res.ok) {
        window.location.reload();
      } else {
        alert("Patikrinkite ar teisingai įvesti duomenys");
      }
    })
}

  return (<React.Fragment>
    <Button color="primary" onClick={() => setShowAdd(true)}>+ Pridėti patalpą</Button>
    <Modal                //Add new room modal (pop-up)
      show={showAdd} 
      handleClose={() => setShowAdd(false)} 
      title='Pridėti patalpą' 
      bodyContent={
        <Form>
          <Form.Input name='number' label='Numeris' placeholder='Įveskite unikalų patalpos numerį' onChange={handleInputChange}/>
          <Form.Input name='area' label='Plotas' placeholder='Įveskite patalpos plotą' onChange={handleInputChange}/>
          <Form.Select label="Patalpos tipas" name="typeId" onChange={handleInputChange}>
              <option value="1">Palata</option>
              <option value="2">Kabinetas</option>
              <option value="3">Laboratorija</option>
          </Form.Select>
          <Form.Input name='size' label='Vietų skaičius' placeholder='Įveskite vietų skaičių' onChange={handleInputChange}/>
        </Form>
      }
      actions={[
          { label:"Atšaukti", onClick:() => setShowAdd(false) }, 
          { label:"Patvirtinti", color:"primary", onClick:() => submitForm() }
        ]}/>
  </React.Fragment>);
};



const RoomsPage = () => {
  const [showAdd, setShowAdd] = useState(false);

  const [hasError, setErrors] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = () =>
    fetch(API + "GetAllRooms")
        .then(res => res.json())
        .then(data => {
          setRoomsData(data);
        })
        .catch(err => setErrors(err));

    useEffect(() => {
      fetchRooms();
    }, []);
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Page.Header
          title="Patalpos"
        />
        
      <div className="rooms-type-select">
        <Form.Select className="w-auto mr-2">
            <option value="aaa">Pasirinkite patalpos tipą</option>
            <option value="1">Palatos</option>
            <option value="2">Kabinetai</option>
            <option value="3">Laboratorijos</option>
        </Form.Select>
        <div className="add-room-button">
            <AddModal />
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
                    <Table.ColHeader><strong>Plotas</strong></Table.ColHeader>
                    <Table.ColHeader>
                        <strong>Tipas</strong>
                    </Table.ColHeader>
                    <Table.ColHeader><strong>Vietų sk.</strong></Table.ColHeader>
                    <Table.ColHeader/>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {isLoading ? (
                    <div>Loading...</div>
                ) : roomsData.map(room => (
                  <Table.Row key={room.number}>
                    <Table.Col>
                        <div>{room.number}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{room.area} m<sup>2</sup></div>
                    </Table.Col>
                    <Table.Col>
                        <div>{room.typeName}</div>
                    </Table.Col>
                    <Table.Col>
                        <div>{room.size}</div>
                    </Table.Col>
                    <Table.Col alignContent="right">
                      <Button.List>
                        <DetailsModal room={room} />
                        <PatientModal room={room} />
                        <ProcedureModal room={room} />
                        <DoctorModal room={room} />
                        <EditModal room={room}/>
                        <RemoveModal room={room} />
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

export default RoomsPage;
