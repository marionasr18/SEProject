import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";
import Select from 'react-select';
import NavigationBar from "../NavigationBar";





const EventDefinition = () => {

    const nav = useNavigate();

    const STATE = {
        fieldsCode: '',
        fieldsName: '',
        fieldsDesc: '',
        fieldsLocation: '',
        sports: '',
        sportsOptions: [{ value: 'bas', label: 'Baskteball' },
        { value: 'voll', label: 'Volley Ball' },
        { value: 'fut', label: 'Futsal' },
        { value: 'foot', label: 'Foot Ball' },],
    }

    const [state, setState] = useState(STATE)
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
    const handleBack = useCallback(() => {
        nav(-1)
    }, [])

    return (
        <>
            <NavigationBar />
            <div className="row mt-2 ml-5">
                <div className="offset-4">
                <input type="radio" value={state.JoinCreate} id="create"
              onChange={handleChange} name="gender" />
            <label for="male">Create</label>

            <input type="radio" value={state.JoinCreate} id="join"
              onChange={handleChange} name="gender"/>
            <label for="Join">Join</label>

                </div>
            </div>
        </>
    )
}
export default EventDefinition;