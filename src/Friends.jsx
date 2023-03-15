import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "./functions";
import { useNavigate } from "react-router-dom"
import './App.css'
import { LoadingContext } from "./LoadingContextWrapper";




const Friends = () => {

    
    return (
        <>
        <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div>
        <div className="row mt-3"> 
        <div className="col-4">Search </div></div>
        </>
        
    )
}
export default Friends;