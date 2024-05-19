import { useState } from "react";

function Forgot() {
    const [email,setEmail]=useState('')
    const [mess,setMess]=useState('')

    function handleform(e){
        e.preventDefault()
        const data={email}
        fetch('/auth/forgot',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setMess(data.message)
            }else{
                setMess(data.message)
            }
        })
    }
    return ( 
        <section id="forgot">
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2 className="text-center">Forgot Password</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Email ID:</label>
                            <input type="email" className="form-control"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            <button type="submit" className="btn btn-info form-control mt-2">Send Link</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
     );
}

export default Forgot;