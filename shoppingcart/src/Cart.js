import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Cart() {
    let totalprice=0
    const {cart,setCart, loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [userdata,setUserdata]=useState([])
    const [mess,setMess]=useState('')

    useEffect(()=>{
        if(!cart.items){
            return
        }
        let token=localStorage.getItem('token')
        fetch('/product/usercartdata',{
            method:"POST",
            headers:{"Content-Type":"application/json","Authentication":`Bearer ${token}`},
            body:JSON.stringify({ids:Object.keys(cart.items)})
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setUserdata(data.userdata)
            }else{
                setMess(data.message)
            }
        })
    },[])
    function handleqty(id){
        return cart.items[id]
    }
    function handleprice(id,price){
        let pprice= handleqty(id)*price
        totalprice +=pprice
        return pprice
    }

    let _cart={...cart}
    function handleinc(e,id,qty){
        let currentqty= handleqty(id)
        if(currentqty===qty){
            alert('You Have Reched Max. Quentity')
            return
        }
        _cart.items[id]=currentqty+1
        _cart.totalItems +=1
        setCart(_cart)
    }

    function handledec(e,id,qty){
        let currentqty= handleqty(id)
        if(currentqty===1){
            alert('You Have Atleast Min. Quentity')
            return
        }
        _cart.items[id]=currentqty-1
        _cart.totalItems -=1
        setCart(_cart)
    }

    function handledelete(e,id){
       let currentqty = handleqty(id)
       delete _cart.items[id]
       _cart.totalItems -=currentqty
       
       setCart(_cart)
       let deletedata=userdata.filter((value)=>{
        return value._id !==id
       })
       setUserdata(deletedata)
       localStorage.setItem('cart',JSON.stringify(deletedata))
    }

    function checkout(e){
        let data={cart:cart,loginame:loginame}
        let token=localStorage.getItem('token')
        fetch('/product/usercheckout',{
            method:"POST",
            headers:{"Content-Type":"application/json","Authentication":`Bearer ${token}`},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                setCart('')
                localStorage.setItem('cart',JSON.stringify(''))
                alert("Successfully Checkout")
            }else{
                setMess(data.message)
            }
        })
    }

    if(!loginame){
        navigate('/')
    }else{
    if(!cart.items){
        return(
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 d-flex">
                            <img src="/empty-cart.png" alt="Error" className="mx-auto" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }else{
    return ( 
        <section id="cart">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">My Cart</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S. No.</th>
                                    <th>Product Name</th>
                                    <th>Image1</th>
                                    <th>Image2</th>
                                    <th>Product Quentity</th>
                                    <th>Product Price</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.map((value,key)=>(
                                <tr key={value._id}>
                                    <td>{key+1}</td>
                                    <td>{value.name}</td>
                                    <td><img src={value.img.img1} alt={value.img.img1} /></td>
                                    <td><img src={value.img.img2} alt={value.img.img2} /></td>
                                    <td><i className="bi bi-plus fs-5 me-2" onClick={(e)=>{handleinc(e,value._id,value.qty)}} ></i>{handleqty(value._id)}<i className="bi bi-dash fs-5 ms-2" onClick={(e)=>{handledec(e,value._id,value.qty)}}></i></td>
                                    <td>{handleprice(value._id,value.price)}</td>
                                    <td><i className="bi bi-trash fs-4" onClick={(e)=>{handledelete(e,value._id)}}></i></td>
                                </tr>
                                ))}
                            <tr>
                                <td>Total Amount :-</td>
                                <td colSpan={6}>{totalprice}</td>
                            </tr>
                            <tr>
                                <td colSpan={7}><button onClick={(e)=>{checkout(e)}} className="btn btn-warning form-control">CheckOut</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
     )
    }
}}

export default Cart;