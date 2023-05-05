import { useCallback, useEffect, useState } from 'react';
import FileDialogue from '../FileDialogue';




// import './app.css';
// import data from './Users.json';


export default function ProfileOfUser({props}) {
debugger

    const STATE = {
        email: '',
        imgUrl: '',
        sex: '',
        phoneNb: '',
        dob: '',
        password: '',
        passConfirm: true,
        usernameConfirm: true,
        passwordConfirm: '',
        sports: '',
        sportsOptions: [{ value: 'bas', label: 'Baskteball' },
        { value: 'voll', label: 'Volley Ball' },
        { value: 'fut', label: 'Futsal' },
        { value: 'foot', label: 'Foot Ball' },],
    }

    const [state, setState] = useState(STATE)
   
    const handleChange = useCallback((e) => {
        setState(prv => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }, [])
    // const submitHandle = () => {
    //     try {

    //         const user = data.map(object => {
    //             return object.username;
    //         })
    //         if (user.indexOf(obj.username) !== -1) {
    //             alert("username already existed !")
    //             return;
    //         }
    //         if (obj.password !== obj.passConfirmation) {
    //             alert("Please make sure that the password match")
    //             return;
    //         }

    //     } catch (error) {
    //         alert(error)
    //     }
    // }
  
   
      
  

    const onUpld = useCallback((imageUrl) => setState(prv => { return { ...prv, imgUrl: imageUrl } }), [])
    return (
        <>
            <div className="container rounded bg-white mt-1 mb-1">
                <div className="row">
                    <div className="col border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            {/* <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /> */}
                            <img src={props.profile_picture} onUpload={onUpld} />
                            <span> </span></div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center ">
                                {/* <h4 className="text-right">Profile Settings</h4> */}
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-8"><label className="labels">Username</label>
                                    <input type="text" className="form-control" disabled={true} onChange={handleChange} placeholder="username" value={props.username} name='username' /></div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Mobile Number</label><input  disabled={true} 
                                type="number" onChange={handleChange} className="form-control"  value={props.phoneNumber} name='phoneNb' /></div>
                                <div className="col-md-12"><label className="labels">Address </label><input  disabled={true} 
                                type="text" className="form-control" onChange={handleChange}  value={props.address} name="address" /></div>
                                <div className="col-md-12"><label className="labels">Email ID</label><input  
                                disabled={true} type="text" className="form-control" onChange={handleChange}  value={props.email} name='email' /></div>
                            
                            </div>
                            {/* <div className="row mt-3">
                                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" onChange={handleChange} placeholder="country" value="" /></div>
                                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" onChange={handleChange} placeholder="state" /></div>
                            </div> */}
                         
                            </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                        <div className="col-2 offset-3 ml-4 title text-primary">
                        </div>
                            {/* <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br/> */}
                            <div className="col-md-12"><label className="labels">Date of Birth</label><input  disabled={true} type="text" 
                            className="form-control" onChange={handleChange} value={props.dob} name='dob' /></div> <br />
                            <div className="col-md-12"><label className="labels">Gender</label><input  
                            disabled={true} type="text" className="form-control" onChange={handleChange} value={props.gender} name='sex' /></div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}






