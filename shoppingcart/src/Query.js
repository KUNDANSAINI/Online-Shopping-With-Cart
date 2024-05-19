import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import Left from "./Left";
import { Link, useNavigate } from "react-router-dom";

function Query() {
    const {loginame}=useContext(Contextapi)
    const [querydata,setQuerydata]=useState([])
    const [mess,setMess]=useState('')
    let navigate=useNavigate()

    useEffect(()=>{
        fetch('/feedback/querydata').then((result)=>{return result.json()}).then((data)=>{
           // console.log(data)
            if(data.status===200){
                setQuerydata(data.querydata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    function deletequery(e,id){
        fetch(`/feedback/deletequery/${id}`,{
            method:"DELETE"
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                alert(data.message)
                let deletequery=querydata.filter((value)=>{
                    return value._id  !=id
                })
                setQuerydata(deletequery)
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
                            <h2 className="text-center">Quert Managment</h2>
                            <p>{mess}</p>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>User Email</th>
                                        <th>Replied</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {querydata.map((value,k)=>(
                                    <tr key={value._id}>
                                        <td>{k+1}</td>
                                        <td>{value.email}</td>
                                        {value.status==="Reply"?
                                        <td><Link to={`/query/${value._id}`}><button id="query">{value.status}</button></Link></td>
                                        :<td><Link to={`/query/${value._id}`}><button disabled id="query">{value.status}</button></Link></td>
                                        }
                                        <td><button onClick={(e)=>{deletequery(e,value._id)}} className="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
         );
    }
}

export default Query;