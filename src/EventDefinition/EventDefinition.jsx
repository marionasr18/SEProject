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
        fieldsCode: '',
        fieldsName: '',
        fieldsDesc: '',
        fieldsLocation: '',
        sports: '',
        tabid: 1,
        sportsOptions: [{ value: 'bas', label: 'Baskteball' },
        { value: 'voll', label: 'Volley Ball' },
        { value: 'fut', label: 'Futsal' },
        { value: 'foot', label: 'Foot Ball' },],
    }

    const [state, setState] = useState(STATE)
    const [dateOfEvent, setDateOfEvent] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endtTime, setEndtTime] = useState('10:00');

    const FillData = useCallback(async () => {
        let data = await FetchData('DataFiles/PlayersData.json', 'get')
        console.log(data.data)
    }, [])
    useEffect(() => {
        FillData()
    }, [])
    console.log(state)
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
    const drawGamesToJoin = useCallback(() => {
        return (<>
            <div className="shadow-card flex flex-col rounded-xl bg-white bg-clip-border">
                <div className="mx-4 -mt-6 translate-y-0">
                    <a blur-shadow-image="true">
                        <img
                            className=""
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card image"
                        />
                    </a>
                </div>
                <div className="text-secondary flex-1 p-6">
                     <a href="#">
                        <h4 className="font-medium">Material Tailwind</h4>
                    </a> 
                    <p className="opcacity-60 mb-3">
                        Game 1
                    </p>
                    <button
                        className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                    >
                        Read More
                    </button>
                </div>
            </div>
            </> )

    }, [])

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
                            <input type="text" className="form-control  " value={state.capacity} name="capacity" onChange={handleChange} ></input>
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
                <div className="row ml-2 mt-3 ">{drawGamesToJoin() } </div>

            }
            {
                state.tabid ===3 &&
                <div className="row ml-2 mt-3 "><AcceptDeclinePlayers/> </div>

            }
        </>
    )
}
export default EventDefinition;