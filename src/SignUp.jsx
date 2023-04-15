import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchData } from './functions';
import Select from 'react-select';
import NavigationBar from './NavigationBar';
import FileDialogue from './FileDialogue';

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
    const loc = useLocation()
    console.log(loc)
    const STATE = {
        fieldsCode: '',
        imgUrl: '',
        fieldsName: '',
        fieldsDesc: '',
        fieldsLocation: '',
        sports: '',
        sportsOptions: [{ value: 'bas', label: 'Baskteball' },
        { value: 'voll', label: 'Volley Ball' },
        { value: 'fut', label: 'Futsal' },
        { value: 'foot', label: 'Foot Ball' },],
    }

    const [state, setState] = useState(STATE)
    const FillData = useCallback(async () => {
        let data = await FetchData('DataFiles/PlayersData.json', 'get')
        console.log(data.data)
    }, [])
    useEffect(() => {
        FillData()
    }, [])
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
    const handleBack = useCallback(() => {

        nav(-1)
    }, [])
    // const handlePassConfirm = useCallback(
    //     (e) => {


    //         setObj(item => ({
    //             ...item, passConfirmation: e.target.value
    //         }))
    //         // console.log(obj.passConfirmation)
    //     }, [obj.passConfirmation])
    // const handlePass = useCallback(
    //     (e) => {
    //         setObj(item => ({
    //             ...item, password: e.target.value
    //         }))
    //         // console.log(obj.password)
    //     }, [obj.password])
    // const handleUname = useCallback(
    //     (e) => {

    //         setObj(item => ({
    //             ...item, username: e.target.value
    //         }))
    //         // console.log(obj.username)
    //     }, [obj.username])
    const onUpld = useCallback((imageUrl) => setState({ ...state, imgUrl: imageUrl }), [])
    return (
        <>
            {loc.pathname === '/editProfile' && <NavigationBar />}
            <div className="row ml-5">
                <div className="col-12">
                    {/* <div className="row">
                    <div className="col-2 offset-10">
                      
                    </div>
                </div> */}
                    <div className="row mt-3" >
                        {loc.pathname === '/editProfile' && <div className="col-7 ml-4 title text-primary">
                            Edit Your Profile
                        </div>}
                        {loc.pathname === '/signUp' && <div className="col-7 ml-4 title text-primary">
                            Sign Up
                        </div>}
                        <div className="col-2 offset-3 ml-4 title text-primary">
                            <button className="btn btn-danger" onClick={handleBack}>Back</button>
                        </div>
                    </div>
                            <div className="row mt-3">
                                <div className="col-3">First Name</div>
                                <div className="col-5">
                                    <input type="text" className="form-control" value={state.firstCode} name="firstCode" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-3 required">Last Name</div>
                                <div className="col-5">
                                    <input type="text" className="form-control " value={state.lastName} name="lastName" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-3">Password</div>
                                <div className="col-5 ">
                                    <input type="text" className="form-control " value={state.fieldsDesc} name="fieldsDesc" onChange={handleChange} ></input>
                                </div>
                            </div>
                          
                         
                    <div className="row mt-2">
                        <div className="col-3">Password Confirmation</div>
                        <div className="col-5 ">
                            <input type="text" className="form-control " value={state.fieldsDesc} name="fieldsDesc" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-3">Sex</div>
                        <div className="col-2 ">
                            <input type="text" className="form-control " value={state.fieldsDesc} name="fieldsDesc" onChange={handleChange} ></input>
                        </div>
                        <div className="col-1">Age</div>
                        <div className="col-2 ">
                            <input type="number" className="form-control " value={state.fieldsDesc} name="fieldsDesc" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-3">Sports</div>
                        <div className="col-5">
                            <Select
                                defaultValue={state.sports}
                                onChange={handleChange}
                                options={state.sportsOptions}
                            />
                        </div>
                    </div>
                   <div className='row'>
                   <div className=" ui small image">
                    <FileDialogue imgUrl={state.imgUrl} onUpload={onUpld} />
                </div>
                   </div>

                    {loc.pathname === '/editProfile' && <div className="row mt-5">

                        <button type="button" className="btn btn-warning offset-7 col-1" style={{ backgroundColor: 'yellow', color: 'black' }}>Undo</button>
                        <button type="button" className="btn btn-success col-1 offset-1 " style={{ backgroundColor: 'green', color: 'white' }}>Save</button>

                    </div>}
                    {loc.pathname === '/signUp' && <div className="row mt-5">

                        {/* <button type="button" className="btn btn-warning offset-7 col-1" style={{ backgroundColor: 'yellow', color: 'black' }}>Undo</button> */}
                        <button type="button" className="btn btn-success col-1 offset-1 " style={{ backgroundColor: 'green', color: 'white' }}>SignUp</button>

                    </div>}
                </div>
            </div>
        </>
    )
}
