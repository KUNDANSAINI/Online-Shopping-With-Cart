import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Myorders() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [mess,setMess]=useState('')
    const [orderdata,setOrderdata]=useState([])
    useEffect(()=>{
        let data={loginame:loginame}
        let token=localStorage.getItem('token')
        fetch('/product/myorder',{
            method:"POST",
            headers:{"Content-Type":"application/json","Authentication":`Bearer ${token}`},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                setOrderdata(data.orderdata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    function handlecancel(e,id){
        let token=localStorage.getItem('token')
        fetch(`/product/orderdelete/${id}`,{
            method:"DELETE",
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            console.log(data)
            if(data.status===200){
                alert("Order Successfully Cancel")
                let cancel=orderdata.filter((value)=>{
                    return value._id !==id
                })
                setOrderdata(cancel)
            }else{
                setMess(data.message)
            }
        })
    }

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <section id="order">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">My Orders</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Product</th>
                                    <th>Image1</th>
                                    <th>Image2</th>
                                    <th>Price</th>
                                    <th>Quentity</th>
                                    <th>Catigory</th>
                                    <th>Order Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderdata.map((value,k)=>(
                                <tr key={value._id}>
                                    <td>{k+1}</td>
                                    <td>{value.name}</td>
                                    <td><img src={value.img.img1} alt={value.img.img1} /></td>
                                    <td><img src={value.img.img2} alt={value.img.img2} /></td>
                                    <td>{value.price}</td>
                                    <td>{value.qty}</td>
                                    <td>{value.catigory}</td>
                                    <td><button onClick={(e)=>{handlecancel(e,value._id)}} className="btn btn-danger">Cancel</button></td>
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

export default Myorders;