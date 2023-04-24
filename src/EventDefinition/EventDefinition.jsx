import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import NavigationBar from "../NavigationBar";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import AcceptDeclinePlayers from "./AcceptDeclinePlayers";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";

const EventDefinition = () => {
    const NavArray = [
        { tabId: 1, label: "Create New Game" },
        { tabId: 2, label: "Join Game" },
        { tabId: 3, label: "View Created Games" },
        { tabId: 4, label: "View Pending Requests" },
    ]
    const nav = useNavigate();

    const STATE = {
        capacity: '',
        eventName: '',
        location: '',
        field: '',
        tabId: 1,
        sportsOptions: [],
        fieldOptions: [],
        requestToJoinData: [],
    }

    const [state, setState] = useState(STATE)
    const [dateOfEvent, setDateOfEvent] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endtTime, setEndtTime] = useState('10:00');

    const FillData = useCallback(async () => {
        let token = sessionStorage.getItem('auth')
        let data = await FetchData('http://localhost:3001/api/fields/getAllFields', 'get')
        let finaldata = data.data
        if (finaldata.success === 1)
            setState(prv => {
                return {
                    ...prv,
                    fieldOptions: finaldata.data.map(e => {
                        return {
                            value: e.field_id,
                            label: e.field_name,
                        }
                    })
                }
            })
        let data2 = await FetchData('http://localhost:3001/api/sports/getAllSports', 'get')
        let finaldata2 = data2.data
        if (finaldata2.success === 1)
            setState(prv => {
                return {
                    ...prv,
                    sportsOptions: finaldata2.data.map(e => {
                        return {
                            value: e.sport_id,
                            label: e.sport_name,
                        }
                    })
                }
            })
        if (state.tabId === 2) {
            let data3 = await FetchData(`http://localhost:3001/api/events/getEventToJoinById/${token}`, 'get')
            let finaldata3 = data3.data
            if (finaldata3.success === 1)
                setState(prv => {
                    return {
                        ...prv,
                        requestToJoinData: finaldata3.data
                    }
                })
        }
    }, [state.tabId])
    useEffect(() => {
        FillData()
    }, [state.tabId])
    const handleChange = useCallback((e) => {
        setState(prv => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }, [])
    const toggleNav = useCallback((id) => {
        setState((prv) => {
            return {
                ...prv,
                tabId: id
            }
        })
    }, [])
    const handleRequestToJoin = useCallback(async (e) => {
        debugger
        let token = sessionStorage.getItem('auth')
        const _data = {
            event_id: e.event_id,
            user_id: token,
        }
        let data = await FetchData('http://localhost:3001/api/events/requestToJoin', 'post', _data)
        let finaldata = data.data
        if (finaldata.success === 1)
            alert('Request Sent')


    }, [])
    const drawGamesToJoin = useCallback(() => {
        console.log(state.requestToJoinData)
        let arr = state.requestToJoinData
        // arr= [ {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // {
        //     "event_id": 2,
        //     "event_name": "Soccer Game",
        //     "event_date": "2023-05-01",
        //     "event_location": "Central Park",
        //     "event_description": "Come join us for a fun game of soccer!",
        //     "sport_name": "Football",
        //     "field_name": "Field A",
        //     "created_by": "marioTest"
        // },
        // ]
        return arr.map(e => {
            return (<>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{e.event_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {e.created_by} at {e.event_location}</h6>
                        <p className="card-text">Field Name : {e.field_name}</p>
                        <p className="card-text">{e.event_description}</p>
                        <a className="card-link">Starts At: {e.start_time}</a>
                        <a className="card-link">Ends At: {e.end_time}</a>
                        <div><button onClick={()=>handleRequestToJoin(e.event_id)}>Request to Join</button></div>
                    </div>
                </div>

            </>)
        })


    }, [state.requestToJoinData, state.tabId])
    
    const drawNav = () => {
        return NavArray.map((eachNav, key) => {
            return <NavItem key={key}>
                <NavLink className={state.tabId == eachNav.tabId ? 'active' : ''} onClick={()=>toggleNav(eachNav.tabId)}>
                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                        {eachNav.label}
                    </span>
                </NavLink>
            </NavItem>
        })
    }
    const handleCreateGame = useCallback(async () => {
        let token = sessionStorage.getItem('auth');

        let objToSave = {
            event_name: state.eventName,
            event_date: dateOfEvent,
            event_location: state.location,
            event_description: state.desc,
            user_id: token,
            sport_id: state.sports,
            field_id: state.field,
            start_time: startTime,
            end_time: endtTime,
            capacity: state.capacity,
        }
        const data = await FetchData('http://localhost:3001/api/events/createEvent', 'post', objToSave)
        if (data.data.success === 1) {
            setState(STATE)
            alert('EVENT added succesfully.')
            FillData()
            // nav('/login')
        }
    }, [state])
    return (
        <>
            <NavigationBar />
            <Nav tabs className='mt-4'>
                {drawNav()}
            </Nav>
            <TabContent activeTab={state.tabId}>
                <TabPane tabId={1}>
                <>
                   
                    <div className="row mt-2 ml-2">
                        <div className="col-2 required">Event Name</div>
                        <div className="col-4">
                            <input type="text" className="form-control  " value={state.eventName} name="eventName" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2 ml-2">
                        <div className="col-2 required">Event Description</div>
                        <div className="col-4">
                            <input type="text" className="form-control  " value={state.eventDesc} name="eventDesc" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2 ml-2">
                        <div className="col-2">Select Sport to play</div>
                        <div className="col-3">
                            <Select
                                defaultValue={state.sports}
                                onChange={e => {
                                    setState(prv => {
                                        return {
                                            ...prv,
                                            sports: e.value
                                        }
                                    })
                                }}
                                options={state.sportsOptions}
                            />
                        </div>
                    </div>

                    <div className="row mt-2 ml-2">
                        <div className="col-2">Select Capacity</div>
                        <div className="col-4">
                            <input type="number" className="form-control  " value={state.capacity} name="capacity" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2 ml-2">
                        <div className="col-2">Location</div>
                        <div className="col-4">
                            <input type="text" className="form-control " value={state.location} name="location" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2 ml-2">
                        <div className="col-2">Field</div>
                        <div className="col-4">
                            <Select
                                defaultValue={state.field}
                                onChange={e => {
                                    setState(prv => {
                                        return {
                                            ...prv,
                                            field: e.value
                                        }
                                    })
                                }}
                                options={state.fieldOptions}
                            />
                        </div>
                    </div>
                    <div className="row mt-2 ml-2">
                        <div className="col-2">Date</div>
                        <div className="col-4">
                            <DatePicker className="form-control" selected={dateOfEvent} onChange={(date) => setDateOfEvent(date)} />
                        </div>
                    </div>
                    <div className="row mt-4 ml-2">
                        <div className="col-2">Start Time</div>
                        <div className="col-2">
                            <TimePicker onChange={setStartTime} value={startTime} />
                        </div>
                        <div className="col-2">End Time</div>
                        <div className="col-2">
                            <TimePicker
                                clockIcon={null}
                                onChange={setEndtTime} value={endtTime} />
                        </div>
                    </div>
                    <div className="row mt-2 ml-2">
                        <div className="col-1 offset-9"><button className="btn-danger" onClick={handleCreateGame}>Create Game</button></div>

                    </div>
                </>

                </TabPane>
                <TabPane tabId={2}>
                <div className="row ml-2 mt-3 ">{drawGamesToJoin()} </div>
                </TabPane>
                <TabPane tabId={3}>
                <div className="row ml-2 mt-3 "><AcceptDeclinePlayers /> </div>       
                 </TabPane>

            </TabContent>
           
           
        </>
    )
}
export default EventDefinition;