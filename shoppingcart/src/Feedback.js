import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Feedback() {
    const [feedbackdata,setFeedbackdata]=useState([])
    const [mess,setMess]=useState("")
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()

    useEffect(()=>{
        let token=localStorage.getItem('token')
        fetch('/feedback/feedbackdata',{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setFeedbackdata(data.apidata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <section id="feedback">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Image</th>
                                    <th>Username</th>
                                    <th>Decripation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbackdata.map((value,k)=>(
                                <tr key={value._id}>
                                    <td>{k+1}</td>
                                    <td><img src={value.img} alt={value.img} /></td>
                                    <td>{value.username}</td>
                                    <td>{value.decs}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
     );
}}

export default Feedback;