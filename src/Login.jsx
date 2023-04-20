import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "./functions";
import { useNavigate } from "react-router-dom"
import './App.css'
import { LoadingContext } from "./LoadingContextWrapper";




const Login = () => {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');

    const [role, setRole] = useState('')
    const [users, setUsers] = useState([]);
    const nav = useNavigate();
    const { setIsLoading } = useContext(LoadingContext);


    const handleChangePs = useCallback(
        (e) => {
            setPass(e.target.value)
            // console.log(pass)
        }, [pass])
    const handleChangeNm = useCallback((e) => {


        setUname(e.target.value)
        // console.log(uname)


    }, [uname])


    async function handleSubmit(e) {
        e.preventDefault();

const params = {
    
        "username": uname,
        "password": pass,
     
   
}
setIsLoading(prv => prv + 1);
debugger
         let userData = await FetchData("http://localhost:3001/api/users/login", 'post',params).
         catch(error => {
             throw error
         })

 setIsLoading(prv => prv - 1)

        // const userData = users.find((user) => user.username === uname);

        // Compare user info
       

         if (userData) {
             setRole(userData)
             if (userData.data.success === 0) {
                 // Invalid password
                 alert("Invalid Username or Password")
             } else if (userData.data.success === 1) {
              
            
                     sessionStorage.setItem('auth',userData.data.token)
                    localStorage.setItem("item_key",uname);
                     nav("/profile", { replace: true })



             }
         } else {
             // Username not found
             alert("Invalid Username or Password")
         }
    }
    const handleSignUp = useCallback(() => {
        nav('/signUp')
    }, [])
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={uname} type="text" name="inputName" onChange={handleChangeNm} />
                        </div>
                        <div>
<<<<<<< HEAD
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
=======
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
>>>>>>> bf69d4f2520b55619f9382f40e00eeb52a076a04
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={pass} type="password" name="inputPass" onChange={handleChangePs} />
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                </div>
                            
                            </div>
                           
                        </div> */}
                        <div className="row">
                            <div className="col-4 offset-4"> 
                            <button  className="btn btn-primary"  onClick={handleSubmit}>Sign in</button>
                            </div>
                        </div>
                       
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? <button onClick={handleSignUp}>Sign up</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    )
}
export default Login;