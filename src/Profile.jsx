// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FetchData } from './functions';
import { cloneDeep, isEmpty } from "lodash";
import axios from "axios";

import NavigationBar from './NavigationBar';
function Profile() {
  const STATE = {
    articles:[]
  }
  const [state,setState]=useState(STATE)
  useEffect(()=>{
FillData()
  },[])
const FillData = useCallback(async()=>{
const _data = {
  country:'us',
  category:'sports',
  apiKey:'9f79c0c7e60f45ef824d2876e97a1ee2'
}
let queryparams = new URLSearchParams({ ..._data });
  // let data = await FetchData('https://newsapi.org/v2/top-headlines','get',_data)
  let data = await axios({ method: 'get', url: 'https://newsapi.org/v2/top-headlines' + `${!isEmpty(_data) ? `?${queryparams.toString()}` : ''}`, crossDomain: true, signal: null });
    console.log(data.data.articles)

  setState(prv=>{return{
    ...prv,
    articles:data.data.articles
  }})
},[])
const drawArticles = useCallback(()=>{
  debugger
  return state.articles.map(e=>{
    return(<>
      <a href={`#${e.url}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={e.urlToImage} alt=""/>
          <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{e.content}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{e.description}</p>
          </div>
      </a>
      </>)
  })
  
},[ state.articles])

  return (<>
   <NavigationBar/>
   {drawArticles()}
  </> );
}

export default Profile;