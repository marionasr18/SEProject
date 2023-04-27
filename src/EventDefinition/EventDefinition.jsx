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


const EventDefinition = () => {

    const nav = useNavigate();

    const STATE = {
        capacity: '',
        eventName: '',
        location: '',
        field: '',
        tabid: 1,
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
        if (state.tabid === 2) {
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
    }, [state.tabid])
    useEffect(() => {
        FillData()
    }, [state.tabid])
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
                tabid: id
            }
        })
    }, [])
    const handleRequestToJoin = useCallback(async(e) => {
        debugger
        let token = sessionStorage.getItem('auth')
        const _data = {
            event_id:e.event_id,
user_id : token,
        }
        let data = await FetchData('http://localhost:3001/api/events/requestToJoin', 'post',_data)
        let finaldata = data.data
        if (finaldata.success === 1)
            alert('Request Sent')
                
            
    }, [])
    const drawGamesToJoin = useCallback(() => {
        console.log(state.requestToJoinData)
        let arr = state.requestToJoinData
        arr= [ {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        {
            "event_id": 2,
            "event_name": "Soccer Game",
            "event_date": "2023-05-01",
            "event_location": "Central Park",
            "event_description": "Come join us for a fun game of soccer!",
            "sport_name": "Football",
            "field_name": "Field A",
            "created_by": "marioTest"
        },
        ]
       return arr.map(e => {
            return (<>
            <div className="col-3">
                <div className="flex flex-col rounded-xl bg-white bg-transparent bg-clip-border shadow-none">
                    <div className="flex">
                        <div className="text-secondary flex-1 p-6">
                            <span className="font-bold uppercase text-blue-500">{e.event_name}</span>
                            <p className="mb-5 opacity-80">
                               {e.event_description}
                               At {e.event_location}, {e.field_name}
                                by <span className="font-bold">{e.created_by}</span>, {e.event_date}
                            </p>
                            <div><button className="btn-success" onClick={()=>handleRequestToJoin(e)}>Request To Join</button></div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </>)
        })


    }, [state.requestToJoinData, state.tabid])

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
            <div className="row">
                <div className="col-8 offset-4">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <ul className="navbar-nav">
                            <li className={state.tabid === 1 ? "nav-item active" : "nav-item"}>
                                <a className={state.tabid === 1 ? "nav-link text-danger" : "nav-link"} onClick={() => toggleNav(1)}>Create New Game <span className="sr-only">(current)</span></a>
                            </li>
                            <li className={state.tabid === 2 ? "nav-item active" : "nav-item"}>
                                <a className={state.tabid === 2 ? "nav-link text-danger" : "nav-link"} onClick={() => toggleNav(2)}>Join Game <span className="sr-only">(current)</span></a>
                            </li>
                            <li className={state.tabid === 3 ? "nav-item active" : "nav-item"}>
                                <a className={state.tabid === 3 ? "nav-link text-danger" : "nav-link"} onClick={() => toggleNav(3)}>View Created Game <span className="sr-only">(current)</span></a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
            {
                state.tabid === 1 &&
                <>
                    <div className="row mt-2 ml-2">
                        <div className="col-1 offset-9"><button className="btn-success" onClick={handleCreateGame}>Create Game</button></div>

                    </div>
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
                </>

            }
            {
                state.tabid === 2 &&
                <div className="row ml-2 mt-3 ">{drawGamesToJoin()} </div>

            }
            {
                state.tabid === 3 &&
                <div className="row ml-2 mt-3 "><AcceptDeclinePlayers /> </div>

            }
        </>
    )
}
export default EventDefinition;