import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import NavigationBar from "../NavigationBar";

const ReceivedFriendRequest = () => {
    const STATE = {
        playersList: [],
        playersListNotFiltered: [],
    }
    const [state, setState] = useState(STATE)

    const FillData = useCallback(async () => {
        let token = sessionStorage.getItem('auth')
        let data = await FetchData('http://localhost:3001/api/users/getAllUser', 'get')
        // let data = await FetchData(`http://localhost:3001/api/friendRequests/pending/${token}`, 'get')
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

    const drawCards = useCallback(() => {
        return (
            <ul>
              {state.playersListNotFiltered?.map(e => (
                <li key={e.user_id} className="row ml-4" style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                  <img
                    src="https://orig00.deviantart.net/d7b0/f/2011/166/d/4/avatar_100x100_by_demonfox_zephz-d3iyw6a.png"
                    className="rounded-circle col-2"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div className="text-left user-item col-4">
                    FirstName LastName
                  </div>
                  <button className="col-3 btn-success">Accept</button>
                  <button className="col-3 btn-danger">Reject</button>
                </li>
              ))}
            </ul>
          );
          
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
                                <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div>
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
                            export default ReceivedFriendRequest;
