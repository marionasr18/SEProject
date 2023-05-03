import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import NavigationBar from "../NavigationBar";
import axios from "axios";

const ReceivedFriendRequest = () => {
    const STATE = {
        playersList: [],
        playersListNotFiltered: [],
    }
    const [state, setState] = useState(STATE)

    const FillData = useCallback(async () => {
        let token = sessionStorage.getItem('auth')
        //let data = await FetchData('http://localhost:3001/api/users/getAllUser', 'get')
        let data = await FetchData(`http://localhost:3001/api/connections/friendRequests/pending/${token}`, 'get')
        debugger
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
const onAcceptClick = useCallback(async(id)=>{
    // let token = sessionStorage.getItem('auth');

    // let objToSave = {
    //     event_name: state.eventName,
    //     event_location: state.location,
    //     event_description: state.desc,
    //     user_id: token,
    //     sport_id: state.sports,
    //     field_id: state.field,

    //     capacity: state.capacity,
    // }
    const data = await FetchData(`http://localhost:3001/api/connections/friendRequests/accept/${id.connection_id}`, 'post')
    if (data.data.success === 1) {
        setState(STATE)
        alert('Friend added succesfully.')
        alert('Sent succesfully.')
        FillData()
        // nav('/login')
    }
},[state])
const onRejectClick = useCallback(async(id)=>{
    let token = sessionStorage.getItem('auth');

    axios.delete(`http://localhost:3001/api/connections/friendRequests/pending/${id.connection_id}`, {
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
},[state])
    const drawCards = useCallback(() => {
        return (
            <ul>
              {state.playersListNotFiltered?.map(e => (
                <li key={e.user_id} className="row ml-4" style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                  <img
                    src={e.profile_picture}
                    alt="https://orig00.deviantart.net/d7b0/f/2011/166/d/4/avatar_100x100_by_demonfox_zephz-d3iyw6a.png"
                    className="rounded-circle col-2"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div className="text-left user-item col-4">
                    {e.username}
                  </div>
                  <button className="col-3 btn-success" onClick={()=>onAcceptClick(e)}>Accept</button>
                  <button className="col-3 btn-danger" onClick={()=>onRejectClick(e)}>Reject</button>
                </li>
              ))}
            </ul>
          );
          
    }, [state.playersListNotFiltered])

                            return (
                            <>
                                {/* <NavigationBar /> */}
                                {/* <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div>
                                <div className="row mt-3">
                                    <div className="col-2 ml-5">Search </div>
                                    <div className="col-5"> <input type="text" className="form-control" value={state.fieldsCode} name="fieldsCode" onBlur={handleChange} /></div>
                                </div> */}
                                <div className="row mt-4">
                                    {drawCards()}
                                </div>
                            </>

                            )
}
                            export default ReceivedFriendRequest;
