import {  useContext, useLayoutEffect, useState } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [name,setName]=useState('')
    const [decs,setDecs]=useState('')
    const [moredet,setMoredet]=useState('')
    const [price,setPrice]=useState('')
    const [qty,setQty]=useState('')
    const [catigory,setCatigory]=useState('')
    const [img,setImg]=useState('')
    const [img2,setImg2]=useState('')
    const [mess,setMess]=useState('')
    const [catialldata,setCatialldata]=useState([])


    function handleform(e){
        e.preventDefault()
        //console.log(name,decs,price,catigory,status)
        let imgvalid=((img.size)/(1024))
        let imgvalid2=((img2.size)/(1024))
        if(!img){
            setMess("Please Enter Product Image")
        }
        else if(!img2){
            setMess("Please Enter Product Image2")
        }
        else if(imgvalid && imgvalid2>=49){
            alert("Please Enter Image Size Should Be Less Then 50KB")
        }
        else{
        let fdata=new FormData()
        fdata.append('name',name)
        fdata.append('decs',decs)
        fdata.append('moredet',moredet)
        fdata.append('price',price)
        fdata.append('qty',qty)
        fdata.append('catigory',catigory)
        fdata.append('img',img)
        fdata.append('img2',img2)
        let token=localStorage.getItem('token')
        fetch('/product/addproduct',{
            method:"POST",
            headers:{"Authentication":`Bearer ${token}`},
            body:fdata
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data.status===201){
                setMess(data.message)
            }else{
                setMess(data.message)
            }
        })
    }
    }

    useLayoutEffect(()=>{
        let token=localStorage.getItem('token')
        fetch('/product/catigory',{
            headers:{"Authentication":`Bearer ${token}`},
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setCatialldata(data.alldata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <section id="mid">
        <div className="container-fluid">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">
                        <h2 className="text-center">New Product</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Name</label>
                            <input type="text" className="form-control"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            />
                            <label>Decripation</label>
                            <textarea className="form-control"
                            value={decs}
                            onChange={(e)=>{setDecs(e.target.value)}}
                            ></textarea>
                            <label>More Details</label>
                            <textarea className="form-control"
                            value={moredet}
                            onChange={(e)=>{setMoredet(e.target.value)}}
                            ></textarea>
                            <label>Price</label>
                            <input type="number" className="form-control"
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}
                            />
                            <label>Quantity</label>
                            <input type="number" className="form-control"
                            value={qty}
                            onChange={(e)=>{setQty(e.target.value)}}
                            />
                            <label>Catigory</label>
                            <select className="form-select" value={catigory} onChange={(e)=>{setCatigory(e.target.value)}}>
                                <option value="">select</option>
                            {catialldata.map((value)=>(
                                <option value={value.name} key={value._id}>{value.name}</option>
                            ))}
                            </select>
                            <label>Image1</label>
                            <input type="file" className="form-control" onChange={(e)=>{setImg(e.target.files[0])}} />
                            <label>Image2</label>
                            <input type="file" className="form-control" onChange={(e)=>{setImg2(e.target.files[0])}} />
                            <button type="submit" className="form-control btn btn-success mt-2">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     );
}}

export default AddProduct;