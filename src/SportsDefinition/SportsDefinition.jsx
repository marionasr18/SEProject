import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";
import Table from 'react-bootstrap/Table';
import axios from 'axios';




const SportsDefinition = () => {

    const nav = useNavigate();

    const STATE = {
        sportsCode: '',
        sportsName: '',
        sportsDesc: '',
        rowData: []
    }
    const [state, setState] = useState(STATE)
    const FillData = useCallback(async () => {
        debugger
        let data = await FetchData('http://localhost:3001/api/sports/getAllSports', 'get')
        let finaldata = data.data
        if (finaldata.success === 1)
            setState(prv => {
                return {
                    ...prv,
                    rowData: finaldata.data
                }
            })
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
    const handleBack = useCallback(() => {
        nav(-1)
    }, [])
    const handleSave = useCallback(async () => {
        let objToSave = {
                sport_name: state.sportsName,
                description: state.sportsDesc,
        }
        const data = await FetchData('http://localhost:3001/api/sports/createSport', 'post', objToSave)
        if (data.data.success === 1) {
            setState(STATE)
            alert('Sports added succesfully.')
            FillData()
            // nav('/login')
        }
    }, [state])
    const handleDelete = useCallback(async (obj) => {
        let token = sessionStorage.getItem('auth');

            axios.delete(`http://localhost:3001/api/sports/deleteSport/${obj.sport_id}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },

            })
            .then((response) => {
              alert(response.data.message);
            })
            .catch((error) => {
              alert(error);
            });
            FillData()
        // const data = await FetchData(`http://localhost:3001/api/sports/deleteSport/${obj.sport_id}`, 'get')
        // if (data.data.success === 1) {
        //     setState(STATE)
        //     alert('Sports added succesfully.')
        //     FillData()
        //     // nav('/login')
        // }
    }, [state])
    return (
        <>
            <NavigationBar />
            <div className="row ml-5">

                <div className="col-12">
                    <div className="row mt-4" >
                        <div className="col-7 ml-4 title text-primary">
                            Sports Definition
                        </div>
                        <div className="col-2 offset-3 ml-4 title text-primary">
                            <button className="btn btn-danger" onClick={handleBack}>Back</button>
                        </div>
                    </div> 
                               {/* <div className="row mt-5">
                        <div className="col-3">Sports Code</div>
                        <div className="col-5">
                            <input type="text" className="form-control" value={state.sportsCode} name="sportsCode" onChange={handleChange} />
                        </div> */}
                    {/* </div> */}
                    <div className="row mt-3">
                        <div className="col-3">Sports Name</div>
                        <div className="col-5">
                            <input type="text" className="form-control" value={state.sportsName} name="sportsName" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3">Sports Description</div>
                        <div className="col-5">
                            <input type="text" className="form-control" value={state.sportsDesc} name="sportsDesc" onChange={handleChange} ></input>
                        </div>
                    </div>
                    {/* <Footer/> */}
                    <div className="row mt-5">

                        {/* <button type="button" className="btn btn-warning offset-7 col-1" style={{ backgroundColor: 'yellow', color: 'black' }}>Undo</button> */}
                        <button type="button" onClick={handleSave} className="btn btn-success col-1 offset-9 " style={{ backgroundColor: 'green', color: 'white' }}>Save</button>

                    </div>
                </div>
                <div className="row mt-2">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>SPORT Name</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.rowData.map(e => {
                                return (<tr>
                                    <td>{e.sport_name}</td>
                                    <td>{e.description}</td>
                                    <td><button onClick={()=>handleDelete(e)}>Delete</button></td>
                                </tr>)

                            })}
                        </tbody>
                    </Table>
                </div>
            </div></>

    )
}
export default SportsDefinition;