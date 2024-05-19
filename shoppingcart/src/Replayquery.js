import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import Left from "./Left";
import { useNavigate, useParams } from "react-router-dom";

function Replayquery() {
    const {loginame}=useContext(Contextapi)
    const [eto,setEto]=useState('')
    const [efrom,setEfrom]=useState("boyfake051@gmail.com")
    const [subject,setSubject]=useState('')
    const [ebody,setEbody]=useState('')
    const [mess,setMess]=useState('')
    let navigate=useNavigate()
    let {id}=useParams()

    useEffect(()=>{
        fetch(`/feedback/singlequery/${id}`).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setEto(data.singledata.email)
            }else{

            }
        })
    },[])

    function handleform(e){
        e.preventDefault()
        const data={eto,efrom,subject,ebody}
        fetch(`/feedback/queryreplay/${id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                alert(data.message)
                navigate('/adminquery')
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
                        <h2 className="text-center">Query Reply</h2>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>To</label>
                            <input type="email" className="form-control" 
                            value={eto}
                            onChange={(e)=>{setEto(eto)}}
                            />
                            <label>From</label>
                            <input type="email" className="form-control" 
                            value={efrom}
                            onChange={(e)=>{setEfrom("boyfake051@gmail.com")}}
                            />
                            <label>Subject</label>
                            <input type="text" className="form-control" 
                            value={subject}
                            onChange={(e)=>{setSubject(e.target.value)}}
                            />
                            <label>Body</label>
                            <textarea className="form-control"
                            value={ebody}
                            onChange={(e)=>{setEbody(e.target.value)}}
                            ></textarea>
                            <button type="submit" className="btn btn-outline-success form-control mt-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     );
}
}

export default Replayquery;