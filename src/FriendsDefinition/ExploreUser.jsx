import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import NavigationBar from "../NavigationBar";

const ExploreUser = () => {
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
        let token = sessionStorage.getItem('auth');

        let objToSave = {
            sender_id: token,
            receiver_id: id.user_id
        }
        const data = await FetchData('http://localhost:3001/api/connections/sendFriendRequests', 'post', objToSave)
        if (data.data.success === 1) {
            setState(STATE)
            alert('Request Sent Successfully.')
            FillData()
            // nav('/login')
        }

    }, [])
    const drawCards = useCallback(() => {
        return state.playersListNotFiltered?.map(e => {
            return (
                <>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">

                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24  rounded-full shadow-lg" src={e.image} alt="No img" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{e.username} </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{e.address}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
                                <button className="btn-primary" onClick={()=>handleSendRequest(e)}>Add Friend</button>
                            </div>
                        </div>
                    </div>
                </>)
        })
    }, [state.playersListNotFiltered])
    const handleChange = useCallback((e) => {
        let value = e.target.value

        setState(prv => {
            let filteredPlayers = prv.playersListNotFiltered.filter(e => e.first_name === value || e.last_name === value)
            return {
                ...prv,
                playersList: filteredPlayers
            }
        })

    }, [])
    return (
        <>
            {/* <NavigationBar /> */}
            {/* <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div> */}
            <div className="row mt-3">
                <div className="col-2 ml-5">Search </div>
                <div className="col-5"> <input type="text" className="form-control" value={state.fieldsCode} name="fieldsCode" onBlur={handleChange} /></div>
            </div>
            <div className="row mt-4">
                {drawCards()}
            </div>
        </>

    )
}
export default ExploreUser;
