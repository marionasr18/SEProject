import React, { useCallback, useEffect, useState } from 'react';
// import moment from 'moment'
import { FetchData } from '../functions';
import { isEmpty } from 'lodash';


const SeeUserRequest = ({ event, onSwipe }) => {

  const [state, setState] = useState({
    eventsData: [],
    requestsData: [],
  })
  const FillData = useCallback(async () => {
    let token = sessionStorage.getItem('auth')
    
    let data = await FetchData(`http://localhost:3001/api/events/viewRequestStatus/${token}`, 'get')
    let finaldata = data.data
    if (finaldata.success === 1)
      setState(prv => {
        return {
          ...prv,
          requestsData: finaldata.data
        }
      })

  }, [])
  useEffect(() => {
    FillData()
  }, [])

  const drawCards = useCallback(() => {
   
   return state.requestsData?.map(e => {
    return (<>
       <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{e.event_name}</div>
    <p className="text-gray-700 text-base">
{e.status}    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.event_date}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.sport_name}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.field_name}</span>
  </div>
</div>

    </>)
})
  }, [state.requestsData])


  
return(<>

<div className='row mt-4'>
{drawCards()}
</div>
</>)
};

export default SeeUserRequest;
