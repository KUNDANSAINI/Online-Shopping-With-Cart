import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Moredetails() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [allmoredata,setAllmoredata]=useState([])
    const [mess,setMess]=useState('')
    let {id}=useParams()
    //console.log(id)

    useEffect(()=>{
        let token=localStorage.getItem('token')
        fetch(`/product/moredetail/${id}`,{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setAllmoredata(data.moredata)
            }else{
                setMess(data.message)
            }
            
        })
    },[])

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <section id="details">
            <div className="container">
                <div className="row">
                    {allmoredata.map((value)=>(
                    <div className="col-md-12" key={value._id}>
                        <div className="card">
                            <div className="img">
                            <img src={`/${value.img.img1}`} className="card-img-top" alt={value.img.img1} />
                            <img src={`/${value.img.img2}`} className="card-img-top ms-5" alt={value.img.img2} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{value.name}</h5>
                                <div id="decs">
                                <p className="card-text">{value.decs}</p>
                                </div>
                                <p className="card-text">{value.moredet}</p>
                                <p className="card-text"><i className="bi bi-currency-rupee"></i>{value.price}</p>
                                <p className="card-text">Total Quentity: {value.qty}</p>
                                <p className="card-text">{value.status}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
     );
}}

export default Moredetails;