import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "./functions";
import { useNavigate } from "react-router-dom"
import './App.css'
import { LoadingContext } from "./LoadingContextWrapper";
import NavigationBar from "./NavigationBar";




const Friends = () => {
    const FillData=useCallback(async()=>{
let data = await FetchData('DataFiles/PlayersData.json','get')
console.log(data.data)
    },[])
useEffect(()=>{
FillData()
},[])

    return (
        <>
        <NavigationBar/>
        <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div>
        <div className="row mt-3"> 
        <div className="col-4">Search </div></div>
        </>
        
    )
}
export default Friends;