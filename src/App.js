import React, { useEffect, useState } from "react";

import { Routes, Route, Outlet } from "react-router-dom"
import Login from "./Login";
import { Auth } from "./Auth";
import SignUp from "./SignUp";

import UserContextWrapper from "./LoadingContextWrapper";
import Loading from "./Loading";
import LoadingContextWrapper from "./LoadingContextWrapper";
import Profile from "./Profile";
import Friends from "./Friends";


function App() {

  const [ws, setWs] = useState(null);

  useEffect(() => {
    const url = 'ws://localhost:8000/ws';
    try {
      const socket = new WebSocket(url);
      socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
      });
      socket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
      });
      socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
      });
      setWs(socket);
    } catch (error) {
      console.error('WebSocket error:', error.message);
      // Display an error message to the user
    }
  },[])

  return (
    <LoadingContextWrapper>

      <Loading />



      <Routes>
        <Route path='/signUp' element={<SignUp />} />
        <Route element={<Auth />}>
          <Route path='/' element={<Outlet />}>
           
          <Route path='/login'>
            <Route index element={<Login />} />
            </Route>
            <Route path='/profile'>
            <Route index element={<Profile />} />
            </Route>
            <Route path='/friends'>
            <Route index element={<Friends />} />
            </Route>
          
         

        </Route>
        </Route>

      </Routes >


    </LoadingContextWrapper>
  );
}

export default App;
