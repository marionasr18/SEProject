import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './app.css';
// import data from './Users.json';


export default function SignUp() {
    const data = [
        {
            "username": "mario",
            "pass": "123",
            "role": "regular"
        },
        {
            "username": "omar",
            "pass": "456",
            "role": "admin"
        }
    ]
    const nav = useNavigate()
    const [obj, setObj] = useState({ 'username': '', 'password': '', 'passConfirmation': '' })
    const submitHandle = () => {
        try {

            const user = data.map(object => {
                return object.username;
            })
            if (user.indexOf(obj.username) !== -1) {
                alert("username already existed !")
                return;
            }
            if (obj.password !== obj.passConfirmation) {
                alert("Please make sure that the password match")
                return;
            }

        } catch (error) {
            alert(error)
        }
    }
    const backHandle = useCallback(() => {

        nav("/login", { replace: true })
    }, [])
    const handlePassConfirm = useCallback(
        (e) => {


            setObj(item => ({
                ...item, passConfirmation: e.target.value
            }))
            // console.log(obj.passConfirmation)
        }, [obj.passConfirmation])
    const handlePass = useCallback(
        (e) => {
            setObj(item => ({
                ...item, password: e.target.value
            }))
            // console.log(obj.password)
        }, [obj.password])
    const handleUname = useCallback(
        (e) => {

            setObj(item => ({
                ...item, username: e.target.value
            }))
            // console.log(obj.username)
        }, [obj.username])
    return (
        <form className="ui form" id='cont' >

            <div className="field">
                <label>User Name</label>
                <input type="text" name="first-name" value={obj.username} onChange={handleUname} />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" name="pass-1" value={obj.password} onChange={handlePass} />
            </div>
            <div className="field">
                <label>Confirm Password</label>
                <input type="password" name="pass-2" value={obj.passConfirmation} onChange={handlePassConfirm} />
            </div>
            <button className="ui button" onClick={submitHandle}>Submit</button>
            <button className="ui button" onClick={backHandle}> <i className='chevron left icon'></i>Back</button>
        </form>
    )
}
