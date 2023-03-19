import React, { useContext, useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'


export function Auth() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        debugger
        if (location.pathname === "signUp") {
            navigate('/signUp', { replace: true })
        }
        else if (!localStorage.getItem('auth')) {
            navigate('/login', { replace: true })
        }
        else {
            if (location.pathname === '/') {
                navigate('/profile')
            }
        }
        // if (sessionStorage.getItem("item_key") === 'regular') {

        //     navigate('/', { replace: true })

        // }
    }, [location.pathname])



    return (
        <Outlet />
    )
}
