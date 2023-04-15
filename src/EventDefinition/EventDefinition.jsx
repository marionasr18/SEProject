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


    return (
        <>
            <NavigationBar />
            <div className="row">
                <div className="col-8 offset-4">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <ul className="navbar-nav">
                            <li className={state.tabid === 1 ? "nav-item active" : "nav-item"}>
                                <a className= {state.tabid === 1 ? "nav-link text-danger" : "nav-link"} onClick={() => toggleNav(1)}>Create New Game <span className="sr-only">(current)</span></a>
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
                               onChange={(e)=>{
                                console.log(e)
                                setState(prv=>{
                                    return{
                                        ...prv,
                                        sports:e.value
                                    }
                                })}}
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
                <div className="row ml-2 mt-3 title">here you can Join games </div>

            }
        </>
    )
}
export default EventDefinition;