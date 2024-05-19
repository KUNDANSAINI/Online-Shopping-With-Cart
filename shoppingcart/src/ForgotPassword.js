import {  useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ForgotPassword() {
    const [npass,setNpass]=useState('')
    const [cpass,setCpass]=useState('')
    const [tokenrespose,setTokenresponce]=useState('')
    const [mess,setMess]=useState('')
    let {token}=useParams()

    useLayoutEffect(()=>{
        fetch(`/auth/verifytoken/${token}`).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setTokenresponce(data.message)
            }else{
                setMess(data.message)
            }
        })
    },[])

    function handleform(e){
        e.preventDefault()
        const data={npass,cpass}
        fetch('/auth/forgotpassword',{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
    }

    if(!tokenrespose){
        return(
            <section id="tokenres">
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h4>Your Link Is Expired Please Login Again</h4>
                    <Link to="/">Click To Login</Link>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
        </section>
        );
    }else{
    return ( 
        <section id="forgotpass">
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2 className="text-center">Forgot Password</h2>
                        <form onClick={(e)=>{handleform(e)}}>
                            <label>New Password</label>
                            <input type="text" className="form-control"
                            value={npass}
                            onChange={(e)=>{setNpass(e.target.value)}}
                            />
                            <label>Confirm Password</label>
                            <input type="text" className="form-control"
                            value={cpass}
                            onChange={(e)=>{setCpass(e.target.value)}}
                            />
                            <button type="submit" className="btn btn-outline-info form-control mt-2">New Password</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
     );
}}

export default ForgotPassword;