import React, { useContext } from 'react'
import LoadingContextWrapper, { LoadingContext } from './LoadingContextWrapper'
import logo from './loading-icon-animated-gif-14.jpg'
import './App.css'


export default function Loading() {
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    return (
        isLoading > 0 &&
        <img src={logo} alt='loading' className='rounded mx-auto d-block' />
    )
}
