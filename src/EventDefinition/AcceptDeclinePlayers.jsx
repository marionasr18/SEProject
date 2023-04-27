import React, { useCallback, useEffect, useState } from 'react';
import './AcceptDeclinePlayers.css';
import { FetchData } from '../functions';

const AcceptDeclinePlayers = ({ event, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stateView, setStateView] = useState(false)
  const [state, setState] = useState({
    eventsData: [],
    requestsData: [],
  })
  const FillData = useCallback(async () => {
    let token = sessionStorage.getItem('auth')
    let data = await FetchData(`http://localhost:3001/api/events/getAllCreatedEvents/${token}`, 'get')
    let finaldata = data.data
    if (finaldata.success === 1)
      setState(prv => {
        return {
          ...prv,
          eventsData: finaldata.data
        }
      })

  }, [])
  useEffect(() => {
    FillData()
  }, [])
  const handleLearnMore = async (e) => {
    setStateView(true)
    let data = await FetchData(`http://localhost:3001/api/events/getRequestByEventId/${e}`, 'get')
    let finaldata = data.data
    if (finaldata.success === 1)
      setState(prv => {
        return {
          ...prv,
          requestsData: finaldata.data
        }
      })
  };

  const onAcceptClick = useCallback(async (id) => {
    let token = sessionStorage.getItem('auth');

    let objToSave = {
      event_name: state.eventName,
      event_location: state.location,
      event_description: state.desc,
      user_id: token,
      sport_id: state.sports,
      field_id: state.field,

      capacity: state.capacity,
    }
    const data = await FetchData('http://localhost:3001/api/events/createEvent', 'post', objToSave)
    if (data.data.success === 1) {
      setState({
        eventsData: [],
        requestsData: [],
      })
      alert('EVENT added succesfully.')
      FillData()
      // nav('/login')
    }
  }, [state])
  const onRejectClick = useCallback(async (id) => {
    let token = sessionStorage.getItem('auth');

    let objToSave = {
      event_name: state.eventName,
      event_location: state.location,
      event_description: state.desc,
      user_id: token,
      sport_id: state.sports,
      field_id: state.field,

      capacity: state.capacity,
    }
    const data = await FetchData('http://localhost:3001/api/events/createEvent', 'post', objToSave)
    if (data.data.success === 1) {
      setState({
        eventsData: [],
        requestsData: [],
      })
      alert('EVENT added succesfully.')
      FillData()
      // nav('/login')
    }
  }, [state])
  const drawCards = useCallback(() => {
    return (
      <ul>
        {state.requestsData?.map(e => (
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
            <button className="col-3 btn-success" onClick={() => onAcceptClick(e)}>Accept</button>
            <button className="col-3 btn-danger" onClick={() => onRejectClick(e)}>Reject</button>
          </li>
        ))}
      </ul>
    );

  }, [state.requestsData])
  const declineRequest = () => {

    setCurrentIndex(currentIndex + 1);
  };

  const currentRequest = state.eventsData[currentIndex];

  if (!currentRequest) {
    return <p>No more requests!</p>;
  }
return(<>
<div className='row'>
  <div className='d-flex justify-content-center '>
  <div className='text-center'>
    <div className='row'>
      <div className='offset-4'>
        <h2>Sport {currentRequest.sport_name}</h2>
        The game will be played {currentRequest.event_location} at field {currentRequest.field_name}
        <p>{(currentRequest.event_date)}</p>
        <div className='row'>
          <div className='col-7'>
            <button className='btn-success' onClick={(e) => handleLearnMore(currentRequest.event_id)}>Learn more</button></div>
          <div className='col-7'>
            <button onClick={declineRequest}>View Next</button></div>
        </div>
      </div>
    </div>
  </div>
</div></div>
<div className='row mt-4'>
{stateView&&drawCards()}</div>
</>)
};

export default AcceptDeclinePlayers;
