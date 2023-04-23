import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";
import Select from 'react-select';
import NavigationBar from "../NavigationBar";
import axios from 'axios';
import Table from 'react-bootstrap/Table';






const FieldDefinition = () => {

    const nav = useNavigate();

    const STATE = {
        fieldsCode: '',
        fieldsName: '',
        fieldsDesc: '',
        rowData:[],
        fieldsLocation: '',
        fieldsPhoneNumber: '',
        sports: '',
        sportsOptions: [{ value: 'bas', label: 'Baskteball' },
        { value: 'voll', label: 'Volley Ball' },
        { value: 'fut', label: 'Futsal' },
        { value: 'foot', label: 'Foot Ball' },],
    }

    const [state, setState] = useState(STATE)
    const FillData = useCallback(async () => {
        let data = await FetchData('http://localhost:3001/api/fields/getAllFields', 'get')
        let finaldata = data.data
        if (finaldata.success === 1)
            setState(prv => {
                return {
                    ...prv,
                    rowData: finaldata.data
                }
            })
        let data2 = await FetchData('http://localhost:3001/api/sports/getAllSports', 'get')
        let finaldata2 = data2.data
        if (finaldata.success === 1)
            setState(prv => {
                return {
                    ...prv,
                    sportsOptions: finaldata2.data.map(e=>{
                        return{
                            value:e.sport_id,
                            label:e.sport_name,
                        }
                    })
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
    const handleSave = useCallback(async () => {
        let objToSave = {
           field_name :state.fieldsName,
           field_description:state.fieldsDesc,
           address:state.fieldsLocation,
           phone_number:state.fieldsPhoneNumber,
           sport_id:state.description,
        }
        const data = await FetchData('http://localhost:3001/api/fields/createField', 'post', objToSave)
        if (data.data.success === 1) {
            setState(STATE)
            alert('Event added succesfully.')
            FillData()
            // nav('/login')
        }
    }, [state])
    const handleDelete = useCallback(async (obj) => {
        let token = sessionStorage.getItem('auth');

            axios.delete(`http://localhost:3001/api/fields/deleteField/${obj.field_id }`, {
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
    const handleBack = useCallback(() => {
        nav(-1)
    }, [])

    return (
        <>
            <NavigationBar />
            <div className="row ml-5 animated fadeIn activeComponent">
                <div className="col-12">
                    {/* <div className="row">
                        <div className="col-2 offset-10">
                          
                        </div>
                    </div> */}
                    <div className="row mt-3" >
                        <div className="col-7 ml-4 title text-primary">
                            Fields Definition
                        </div>
                        <div className="col-2 offset-3 ml-4 title text-primary">
                            <button className="btn btn-danger" onClick={handleBack}>Back</button>
                        </div>
                    </div>
                    {/* <div className="row mt-3">
                        <div className="col-3">Field Code</div>
                        <div className="col-5">
                            <input type="text" className="form-control" value={state.fieldsCode} name="fieldsCode" onChange={handleChange} />
                        </div>
                    </div> */}
                    <div className="row mt-2">
                        <div className="col-3 required">Field Name</div>
                        <div className="col-5">
                            <input type="text" className="form-control " value={state.fieldsName} name="fieldsName" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-3">Field Description</div>
                        <div className="col-5 ">
                            <input type="text" className="form-control  " style={{ height: "50px" }} value={state.fieldsDesc} name="fieldsDesc" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-3">Sports</div>
                        <div className="col-5">
                            <Select
                                defaultValue={state.sports}
                                onChange={(e)=>{setState(prv=>{
                                    return{
                                        ...prv,
                                        sports:e.value
                                    }
                                })}}
                                options={state.sportsOptions}
                            />
                        </div>
                    </div>
                    {/* <Footer/> */}
                    <div className="row mt-3">
                        <div className="col-3">Field Location</div>
                        <div className="col-5">
                            <input type="text" className="form-control" value={state.fieldsLocation} name="fieldsLocation" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3">Field Phone Number</div>
                        <div className="col-5">
                            <input type="number" className="form-control" value={state.fieldsPhoneNumber} name="fieldsPhoneNumber" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-5">

                        {/* <button type="button" className="btn btn-warning offset-7 col-1" style={{ backgroundColor: 'yellow', color: 'black' }}>Undo</button> */}
                        <button type="button" className="btn btn-success col-1 offset-9 " onClick={handleSave} style={{ backgroundColor: 'green', color: 'white' }}>Save</button>

                    </div>
                </div>
                <div className="row mt-2">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Field Name</th>
                                <th>Description</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                {/* <th>Sports</th> */}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.rowData.map(e => {
                                return (<tr>
                                    <td>{e.field_name }</td>
                                    <td>{e.field_description }</td>
                                    <td>{e.address}</td>
                                    <td>{e.phone_number  }</td>
                                    <td><button color="danger" onClick={()=>handleDelete(e)}>Delete</button></td>
                                </tr>)

                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
export default FieldDefinition;