import { useContext, useState } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Addcatigory() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [name,setName]=useState('')
    const [mess,setMess]=useState('')

    function handleform(e){
        e.preventDefault()
        const catidata={name}
        let token=localStorage.getItem('token')
        fetch('/product/addcatigory',{
            method:"POST",
            headers:{"Content-Type":"application/json","Authentication":`Bearer ${token}`},
            body:JSON.stringify(catidata)
        }).then((result)=>{return result.json()}).then((data)=>{
            console.log(data)
            if(data.status===201){
                setMess(data.message)
            }else{
                setMess(data.message)
            }
        })
    }

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <section id="mid">
        <div className="container-fluid">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">
                        <h2 className="text-center">New Catigory</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Name</label>
                            <input type="text" className="form-control" 
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            />
                            <button type="submit" className="btn btn-success form-control mt-2">Add Catigory</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     );
}}

export default Addcatigory;