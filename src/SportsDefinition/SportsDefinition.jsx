import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";




const SportsDefinition = () => {

    const nav = useNavigate();

    const STATE = {
        sportsCode: '',
        sportsName: '',
        sportsDesc: '',
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
    },[])
    const handleBack = useCallback(() => {
        nav(-1)
    }, [])

    return (
        <>
         <NavigationBar/>
        <div className="row ml-5">
            
            <div className="col-12">
            <div className="row mt-4" >
                        <div className="col-7 ml-4 title text-primary">
                            Fields Definition
                        </div>
                        <div className="col-2 offset-3 ml-4 title text-primary">
                            <button className="btn btn-danger" onClick={handleBack}>Back</button>
                        </div>
                    </div>            <div className="row mt-5">
                <div className="col-3">Sports Code</div>
                <div className="col-5">
                    <input type="text" className="form-control"  value={state.sportsCode}  name="sportsCode" onChange={handleChange} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">Sports Name</div>
                <div className="col-5">
                    <input type="text" className="form-control"  value={state.sportsName}  name="sportsName" onChange={handleChange} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">Sports Description</div>
                <div className="col-5">
                    <input type="text" className="form-control"  value={state.sportsDesc} name="sportsDesc" onChange={handleChange} ></input>
                </div>
            </div>
            {/* <Footer/> */}
            <div className="row mt-5">
          
            <button type="button" className="btn btn-warning offset-7 col-1"style={{ backgroundColor: 'yellow', color: 'black' }}>Undo</button>
            <button type="button" className="btn btn-success col-1 offset-1 " style={{ backgroundColor: 'green', color: 'white' }}>Save</button>

            </div>
            </div>
        </div></>

    )
}
export default SportsDefinition;