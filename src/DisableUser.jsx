import React, { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import logo from './SESilouhette.jpg';
import { FetchData } from "./functions";
import NavigationBar from "./NavigationBar";

const DisableUser = () => {
    const STATE = {
        playersList: [],
        playersListNotFiltered: [],
    }
    const [state, setState] = useState(STATE)

    const FillData = useCallback(async () => {
        let data = await FetchData('http://localhost:3001/api/users/getAllUser', 'get')
        let finaldata = data.data
        setState(prv => {
            return {
                ...prv,
                // playersList:data.data,
                playersListNotFiltered: finaldata.data,
            }
        })
    }, [])
    useEffect(() => {
        FillData()
    }, [])
    const handleSendRequest = useCallback(async (id) => {

            axios.delete(`http://localhost:3001/api/users/deleteUser/${id.user_id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
        
            })
            .then((response) => {
                alert('User Deactivated successfully')
            })
            .catch((error) => {
              alert(error);
            });
      

    }, [])
    const drawCards = useCallback(() => {
        return state.playersListNotFiltered?.map(e => {
            return (
                <>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">

                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24  rounded-full shadow-lg" src={e.profile_picture?e.profile_picture:logo} alt={logo} />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{e.username} </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{e.address}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">Add friend</a> */}
                                <button className="btn btn-outline-primary" onClick={()=>handleSendRequest(e)}>Disable User</button>
                            </div>
                        </div>
                    </div>
                </>)
        })
    }, [state.playersListNotFiltered])
    // const handleChange = useCallback(async(e) => {
    //     let value = e.target.value
    //     let dataFetched = await FetchData(`http://localhost:3001/api/users/getAllUser`, 'get')
        
    //     setState(prv => {
    //         return {
    //             ...prv,
    //             playersListNotFiltered: dataFetched.data.data
    //         }
    //     })

    // }, [])
    return (
        <>
             <NavigationBar /> 
            {/* <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div> */}
            {/* <div className="row mt-3">
                <div className="col-2 ml-5">Search </div>
                <div className="col-5"> <input type="text" className="form-control" value={state.fieldsCode} name="fieldsCode" handleChange={handleChange} /></div>
            </div> */}
            <div className="row mt-4">
                {drawCards()}
            </div>
        </>

    )
}
export default DisableUser;
