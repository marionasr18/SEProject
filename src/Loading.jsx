import React, { useContext } from 'react'
import LoadingContextWrapper, { LoadingContext } from './LoadingContextWrapper'
<<<<<<< HEAD
import logo from './loading-icon-animated-gif-14.jpg'
// import './App.css'
=======
import logo from './loaderSe.webp'
import './App.css'
>>>>>>> bf69d4f2520b55619f9382f40e00eeb52a076a04


export default function Loading() {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const loaderStyle = {
        display: isLoading > 0 ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        opacity: 0.4,

        // backgroundColor: 'rgba(0, 0, 0, 0)',
      };
    
    return (
<<<<<<< HEAD
        isLoading > 0 &&
        <div className='loading-overlay'>
            <img src={logo} alt='loading' className='loading-icon' />
        </div>
    )
=======
    <div style={loaderStyle}>    
        <img src={logo} alt='loading' className='rounded mx-auto d-block' />
  </div>  )
>>>>>>> bf69d4f2520b55619f9382f40e00eeb52a076a04
}
