import React, { useContext, useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'


export function Auth() {
    const navigate = useNavigate();
    const location = useLocation();



    useEffect(() => {
        if (location.pathname === "signUp") {
            navigate('/signUp', { replace: true })
        }
        else if (!localStorage.getItem('auth')) {
            navigate('/login', { replace: true })
        }
        else {
            if (location.pathname === '/') {
                navigate('/')
            }
        }
        if (sessionStorage.getItem("item_key") === 'admin') {

            navigate('/profile', { replace: true })

        }
    }, [location.pathname])



    return (
        <Outlet />
    )
}
