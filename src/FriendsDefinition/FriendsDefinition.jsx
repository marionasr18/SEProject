import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "../functions";
import { useNavigate } from "react-router-dom"
import '../App.css'
import { LoadingContext } from "../LoadingContextWrapper";
import NavigationBar from "../NavigationBar";
import Friends from "./Friends";

import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import ReceivedFriendRequest from "./ReceivedFriendRequest";



const FriendsDefinition = () => {

    const STATE = {
        playersList: [],
        tabId:1,
        playersListNotFiltered: [],
    }
    const [state, setState] = useState(STATE)
    const NavArray = [
        { tabId: 1, label: "View Friend" },
        { tabId: 2, label: "Explore" },
        { tabId: 3, label: "View Friend Requests" },
    ]
    const FillData = useCallback(async () => {
        let data = await FetchData('DataFiles/PlayersData.json', 'get')
        setState(prv => {
            return {
                ...prv,
                // playersList:data.data,
                playersListNotFiltered: data.data,
            }
        })
    }, [])
    useEffect(() => {
        FillData()
    }, [])

    const toggleNav = useCallback((id) => {
        setState((prv) => {
            return {
                ...prv,
                tabId: id
            }
        })
    }, [])
    const drawNav = () => {
        return NavArray.map((eachNav, key) => {
            return <NavItem key={key}>
                <NavLink className={state.tabId == eachNav.tabId ? 'active' : ''} onClick={()=>toggleNav(eachNav.tabId)}>
                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                        {eachNav.label}
                    </span>
                </NavLink>
            </NavItem>
        })
    }
    return (
        <>
            <NavigationBar />
            <Nav tabs className='mt-4'>
                {drawNav()}
            </Nav>
            <TabContent activeTab={state.tabId}>
                <TabPane tabId={1}>
                <Friends/>


                </TabPane>
                <TabPane tabId={2}>
                </TabPane>
                <TabPane tabId={3}>
                <ReceivedFriendRequest/>
                 </TabPane>

            </TabContent>
           
        </>

    )
}
export default FriendsDefinition;