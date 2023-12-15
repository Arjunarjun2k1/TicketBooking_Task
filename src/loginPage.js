import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ()=>{
    const [userData,setUserData] = useState({name:'',password:''})
    const [userDataError,setUserDataError] = useState({name:'',password:''})
    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const navigate = useNavigate()

    const validate = ()=>{
        let  isError = false
        if(userData.name==='' && userData.password===''){
            setUserDataError({
                name:'Enter UserName',
                password:'Enter Password'
            })
            isError=true
        }else if(userData.name===''){
            setUserDataError({
                ...userDataError,
                name:'Enter UserName'
            })
            isError=true
        }else if(userData.password==='' || userData.password.length<8){
            setUserDataError({
                ...userDataError,
                password:'Password should contain minimum 8 characters'
            })
            isError=true
        }else if(!regex.test(userData.password)){
            setUserDataError({
                ...userDataError,
                password:'Password should contain one uppercase,lowercase,number and special character'
            })
            isError=true
        }
    return isError;
    }

    const handleLogin = ()=>{
        if(!validate()){
            navigate('/bookTickets')
        }
    }

    const handleUserData = (e)=>{
        let {name,value} = e.target
        setUserData({
            ...userData,
            [name]:value
        })
        setUserDataError({
            ...userDataError,
            [name]:''
        })
    }
    return(
        <>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
            <h2>Welcome to Ticket Booking</h2>
            <h4>Login to Continue</h4>
            <input style={{padding:'8px',margin:'10px'}} placeholder="UserName" type="text" name="name" value={userData.name} onChange={(e)=>handleUserData(e)} />
            <p style={{color:'red'}}>{userDataError.name}</p>
            <input style={{padding:'8px',margin:'10px'}} placeholder="Password" type="password" name="password" value={userData.password}  onChange={(e)=>handleUserData(e)} />
            <p style={{color:'red'}}>{userDataError.password}</p>
            <button onClick={handleLogin}>Login</button>
        </div>
        </>
    )
}

export default LoginPage;