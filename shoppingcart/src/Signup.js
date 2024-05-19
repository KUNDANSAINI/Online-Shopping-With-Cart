import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [dob,setDob]=useState('')
    const [mob,setMob]=useState('')
    //const [gender,setGender]=useState('')
    const [mess,setMess]=useState('')

    function handleform(e){
        e.preventDefault()
            const signupdata={fname,lname,email,password,dob,mob}
            fetch('/auth/signup',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(signupdata)
            }).then((result)=>{return result.json()}).then((data)=>{
                if(data.status===201){
                    setMess(data.message)
                }else{
                    setMess(data.message)
                }
            })
    }
    return ( 
        <section id="signup">
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>Signup</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>First Name</label>
                            <input type="text" className="form-control"
                            value={fname}
                            onChange={(e)=>{setFname(e.target.value)}}
                            />
                            <label>Last Name</label>
                            <input type="text" className="form-control"
                            value={lname}
                            onChange={(e)=>{setLname(e.target.value)}}
                            />
                            <label>Email</label>
                            <input type="email" className="form-control"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            <label>Password</label>
                            <input type="text" className="form-control"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}/>
                            <label>DOB</label>
                            <input type="date" className="form-control text-uppercase"
                            value={dob}
                            onChange={(e)=>{setDob(e.target.value)}}
                            />
                            <label>Mobile No.</label>
                            <input type="number" className="form-control"
                            value={mob}
                            onChange={(e)=>{setMob(e.target.value)}}
                            />
                            {/* <label>Gender</label>
                            <div>
                            <input type="radio" name="gender" className="form-check-input"
                            value='male'
                            onChange={(e)=>{setGender(e.target.value)}}
                            /><label className="form-check-label">Male</label>
                            </div>
                            <div>
                            <input type="radio" name="gender" className="form-check-input"
                            value='female'
                            onChange={(e)=>{setGender(e.target.value)}}
                            /><label className="form-check-label">Female</label>
                            </div> */}
                            <button type="submit" className="form-control btn btn-secondary mt-2">Create Account</button>
                        </form>
                        <p id="acc"><Link to={'/'}>Already Have Account</Link></p>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
     );
}

export default Signup;