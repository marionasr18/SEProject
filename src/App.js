import React, { useEffect, useState } from "react";

import { Routes, Route, Outlet } from "react-router-dom"
import Login from "./Login";
import { Auth } from "./Auth";
import SignUp from "./SignUp";

import UserContextWrapper from "./LoadingContextWrapper";
import Loading from "./Loading";
import LoadingContextWrapper from "./LoadingContextWrapper";
import Profile from "./Profile";
import SportsDefinition from "./SportsDefinition/SportsDefinition";
import FieldDefinition from "./FieldDefinition/FieldDefinition";
import EventDefinition from "./EventDefinition/EventDefinition";
import Friends from "./FriendsDefinition/Friends";
import FriendsDefinition from "./FriendsDefinition/FriendsDefinition";


function App() {

  const [ws, setWs] = useState(null);

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
            <Route path='/friends'><Route index element={<FriendsDefinition />} /></Route>
            <Route path='/sportsDefinition'><Route index element={<SportsDefinition />} /></Route>
            <Route path='/fieldsDefinition'><Route index element={<FieldDefinition />} /></Route>
            <Route path='/editProfile'><Route index element={<SignUp />} /></Route>
            <Route path='/event'><Route index element={<EventDefinition />} /></Route>
         

        </Route>
        </Route>

      </Routes >


    </LoadingContextWrapper>
  );
}

export default App;
