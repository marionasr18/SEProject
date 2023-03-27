import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";
import Select from 'react-select';
import NavigationBar from "../NavigationBar";

const CreateJoinGame = () => {
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
    const handleChange = useCallback((e) => {
        setState(prv => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }, [])

    return (
        <>
            <NavigationBar />
            
            <div className="row ml-5">
            <h1>Here we are gonna create and join games</h1>
            </div>
        </>
    )
}
export default CreateJoinGame;