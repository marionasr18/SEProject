import React, { useCallback, useEffect, useState } from 'react';
import './AcceptDeclinePlayers.css';
import moment from 'moment'
import { FetchData } from '../functions';
import { isEmpty } from 'lodash';
import logo from './SESilouhette.jpg';



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
    let objToSave = {
      status: 'Accepted',
      eventId: currentRequest.event_id,
      userId: id.user_id,
    }
    debugger
    const data = await FetchData('http://localhost:3001/api/events/acceptDeclineRequest', 'post', objToSave)
    if (data.data.success === 1) 
    {
      let _data = {
        
          "recipient":id.email,
          "subject":"Approval",
          "body":`Mr. ${id.username}, You have been approved to the game`
      
      }
      const dataMail = await FetchData('http://localhost:3001/api/sendMail', 'post', _data)

      alert('Sent succesfully.')
      FillData()
      // nav('/login')
    }
  }, [state])
  const onRejectClick = useCallback(async (id) => {
    let objToSave = {
      status: 'Declined',
      eventId: currentRequest.event_id,
      userId: id.user_id,
    }
    const data = await FetchData('http://localhost:3001/api/events/acceptDeclineRequest', 'post', objToSave)
    if (data.data.success === 1) {
      let _data = {
        
        "recipient":id.email,
        "subject":"Rejected",
        "body":`Mr. ${id.username},Unfortunately You have not been approved to the event`
    
    }
    const dataMail = await FetchData('http://localhost:3001/api/sendMail', 'post', _data)
      alert('Sent succesfully.')
      FillData()
    }
  }, [state])
  const drawCards = useCallback(() => {
    if( isEmpty(state.requestsData)){
      return(<>
      <h1 className='ml-5'>There is no pending request.</h1>
      </>)
    }
    return (
      <ul>
        {state.requestsData?.map(e => (
          <li key={e.user_id} className="row ml-4" style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <img
              src={e.profile_picture?e.profile_picture:logo}
              alt={logo}
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
  const nextRequest = () => {
    setStateView(false)
    setCurrentIndex(currentIndex + 1);
  };
  const previousRequest = () => {
    setStateView(false)
    setCurrentIndex(currentIndex - 1);
  };

  const currentRequest = state.eventsData[currentIndex];
  console.log(currentRequest)
  if (!currentRequest) {
    return(<> <p>No more requests!</p> 
    <a className='ml-1 text-primary'  onClick={()=>setCurrentIndex(0)}>Start from begining</a></>)
  }
return(<>
{/* <div className='row'>
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
            <button onClick={nextRequest}>View Next</button></div>
        </div>
      </div>
    </div>
  </div>
</div></div> */}
<div className="container">
<div className="row">
    <div className="col-lg-4 offset-3">
        <div className="card card-margin">
            <div className="card-header no-border">
                <h5 className="card-title">{currentRequest.sport_name}</h5>
            </div>
            <div className="card-body pt-0">
                <div className="widget-49">
                    <div className="widget-49-title-wrapper">
                        <div className="widget-49-date-primary">
                            <span className="widget-49-date-day">{moment(currentRequest.event_date).format('MM/DD/YYYY')}</span>
                            {/* <span className="widget-49-date-month">{currentRequest.event_date}</span> */}
                        </div>
                        <div className="widget-49-meeting-info">
                            <span className="widget-49-pro-title">{currentRequest.event_location} at field {currentRequest.field_name}</span>
                           
                        </div>
                    </div>
                    <ol className="widget-49-meeting-points">
                      <span className="widget-49-meeting-time">12:00 to 13.30 Hrs</span>

                        <li className="widget-49-meeting-item"><span>{currentRequest.event_description}</span></li>
                        {/* <li className="widget-49-meeting-item"><span>Data migration is in scope</span></li>
                        <li className="widget-49-meeting-item"><span>Session timeout increase to 30 minutes</span></li> */}
                    </ol>
                    <div className="widget-49-meeting-action">
                    <button className='btn btn-success' onClick={(e) => handleLearnMore(currentRequest.event_id)}>View All</button>
                    <button className='btn btn-primary offset-2' onClick={nextRequest}> Previous</button>
                    <button className='btn btn-primary ' onClick={previousRequest}>View Next</button>
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div className='row mt-4'>
{stateView&&drawCards()}</div>
</>)
};

export default AcceptDeclinePlayers;
