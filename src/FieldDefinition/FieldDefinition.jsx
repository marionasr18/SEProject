import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";




const FieldDefinition = () => {
    const STATE = {
        fieldsCode: '',
        fieldsName: '',
        fieldsDesc: '',
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
        setState(prv=>{
            return{
                ...prv,
                [e.target.name]:e.target.value
            }
        })
    })

    return (
        <div className="row ml-5">
            <div className="col-12">
            <div className="row mt-4 ml-4 title text-primary">Fields Definition</div>
            <div className="row mt-5">
                <div className="col-3">Field Code</div>
                <div className="col-5">
                    <input type="text" className="form-control"  value={state.fieldsCode}  name="fieldsCode" onChange={handleChange} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">Field Name</div>
                <div className="col-5">
                    <input type="text" className="form-control"  value={state.fieldsName}  name="fieldsName" onChange={handleChange} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">Field Description</div>
                <div className="col-5">
                    <input type="text" className="form-control"  value={state.fieldsDesc} name="fieldsDesc" onChange={handleChange} ></input>
                </div>
            </div>
            {/* <Footer/> */}
            <div className="row mt-5">
          
            <button type="button" className="btn btn-warning offset-7 col-1"style={{ backgroundColor: 'yellow', color: 'black' }}>Undo</button>
            <button type="button" className="btn btn-success col-1 offset-1 " style={{ backgroundColor: 'green', color: 'white' }}>Save</button>

            </div>
            </div>
        </div>

    )
}
export default FieldDefinition;