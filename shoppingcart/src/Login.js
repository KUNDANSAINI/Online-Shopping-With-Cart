import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [mess,setMess]=useState('')
    let navigate=useNavigate()
    const {setLoginame,loginame}=useContext(Contextapi)

    function handleform(e){
        e.preventDefault()
        const logindata={username,password}
        fetch('/auth/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(logindata)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                localStorage.setItem('username',data.username)
                localStorage.setItem('token',data.token)
                if(data.role==="Admin"){
                    setLoginame(localStorage.getItem('username'))
                    navigate('/admindashbord')
                }else{
                    setLoginame(localStorage.getItem('username'))
                    navigate('/dashbord')
                }

            }else{
                setMess(data.message)
            }
        })
    }
       
        useEffect(()=>{
            if(loginame){
                if(loginame=="admin@gmail.com"){
                    navigate('/admindashbord')
                }else{
                    navigate('/dashbord')
                }
            }
        },[])
    return ( 
        <section id="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <div id="back">
                        <h2>Login</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Username</label>
                            <input type="text" className="form-control"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            />
                            <label>Password</label>
                            <input type="text" className="form-control"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <button type="submit" className="form-control btn btn-success mt-2">Login</button>
                        </form>
                        <p id="forgotpassword"><Link to={'/forgot'}>Forgot Password</Link></p>
                        <hr/>
                        <Link to={'/signup'}><button className="btn btn-primary form-control">Create Account</button></Link>
                    </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
     );
}

export default Login;