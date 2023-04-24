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
  const drawRequestList = useCallback(() => {
    return state.requestsData.map(e => {
      return (<div> {e.username}</div>)
    })

  }, [state.requestsData])
  const declineRequest = () => {

    setCurrentIndex(currentIndex + 1);
  };

  const currentRequest = state.eventsData[currentIndex];

  if (!currentRequest) {
    return <p>No more requests!</p>;
  }

  return (<>
    <div className='row '>
      <div className='offset-4'>
        <h2>Sport {currentRequest.sport_name}</h2>
        The game will be played {currentRequest.event_location} at field {currentRequest.field_name}
        <p>{(currentRequest.event_date)}</p>
        <div className='row'>
          <div className='col-4'>
            <button onClick={(e) => handleLearnMore(currentRequest.event_id)}>Learn more</button></div>
          <div className='col-5'>
            <button onClick={declineRequest}>View Next</button></div>
        </div>
      </div>
    </div>
  
  </>);
};

export default AcceptDeclinePlayers;
