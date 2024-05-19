import { Link, useNavigate } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
function Catigory() {
    const [alldata,setAlldata]=useState([])
    const [mess,setMess]=useState()
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    
    
    useEffect(()=>{
        let token=localStorage.getItem('token')
        fetch('/product/catigory',{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setAlldata(data.alldata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    let catidelete=(e,id)=>{
        let token=localStorage.getItem('token')
        fetch(`/product/catidelete/${id}`,{
            method:"DELETE",
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            console.log(data)
            if(data.status===200){
                setMess(data.message)
                let c=alldata.filter((value)=>{
                    return value._id!==id
                })
                setAlldata(c)
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
                        <h2 className="text-center">Catigory Managment</h2>
                    <Link to='/addcatigory'><button className="btn btn-primary" style={{float:"right"}}><i className="bi bi-plus-circle fs-6"></i> Add Catigory</button></Link>
                        <p>{mess}</p>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Catigory Name</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!alldata.length==0?(
                                    <>
                                {alldata.map((value,key)=>(
                                <tr key={value._id}>
                                    <td>{key+1}</td>
                                    <td>{value.name}</td>
                                    <td><button className="btn btn-danger" onClick={(e)=>{catidelete(e,value._id)}}>Delete</button></td>
                                </tr>
                                ))}
                                </>
                            ):(
                            <tr>
                                <td colSpan="3" className="text-center"><h4>No Record Found</h4></td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
     );
}}

export default Catigory;