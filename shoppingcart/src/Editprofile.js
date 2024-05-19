import { useContext, useEffect, useState } from "react"
import { Contextapi } from "./Contextapi"
import { useNavigate } from "react-router-dom"

function Editprofile() { 

    const {loginame}=useContext(Contextapi)
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    const [dob,setDob]=useState('')
    const [mob,setMob]=useState('')
    const [id,setID]=useState('')
    const [mess,setMess]=useState('')
    let navigate=useNavigate()

    
    useEffect(()=>{
        fetch(`/auth/profilesingledata/${loginame}`,{
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setFname(data.profilesingledata.fname)
                setLname(data.profilesingledata.lname)
                setMob(data.profilesingledata.mobile)
                setDob(data.profilesingledata.dob)
                setID(data.profilesingledata._id)
            }else{
                setMess(data.message)
            }
        })
    },[])
    
    function handleform(e,id){
        e.preventDefault()
        const data={fname,lname,dob,mob}
        fetch(`/auth/profile/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                alert(data.message)
                navigate('/dashbord')
            }else{
                setMess(data.message)
            }
        })
    }
        return ( 
            <section id="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <p>{mess}</p>
                            <h2 className="text-center">{loginame}</h2>
                            <form onSubmit={(e)=>{handleform(e,id)}}>
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
                                <button type="submit" className="btn btn-outline-success form-control mt-2">Profile Update</button>
                            </form>    
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </section>
         );
}

export default Editprofile;