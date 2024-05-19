import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Left from "./Left";
import { Contextapi } from "./Contextapi";

function Updateproduct() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [name,setName]=useState('')
    const [decs,setDecs]=useState('')
    const [moredet,setMoredet]=useState('')
    const [price,setPrice]=useState('')
    const [qty,setQty]=useState('')
    const [status,setStatus]=useState('')
    const [img,setImg]=useState('')
    const [img2,setImg2]=useState('')
    const [mess,setMess]=useState('')
    let {id}=useParams()
    //console.log(id)


    function handleform(e){
        e.preventDefault()
        //console.log(name,decs,price,status)
        let imghandle=((img.size)/(1024))
        let imghandle2=((img2.size)/(1024))
        if(imghandle && imghandle2 >=49){
            alert("Please Enter Image Size Should Be Less Then 50KB")
        }
        else{
            let fdata=new FormData()
            fdata.append('name',name)
            fdata.append('decs',decs)
            fdata.append('moredet',moredet)
            fdata.append('price',price)
            fdata.append('qty',qty)
            fdata.append('status',status)
            fdata.append('img',img)
            fdata.append('img2',img2)
            let token=localStorage.getItem('token')
        fetch(`/product/proupdate/${id}`,{
            method:"PUT",
            headers:{"Authentication":`Bearer ${token}`},
            body:fdata
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                setMess(data.message)
            }else{
                setMess(data.message)
            }
        })
    }}

    useEffect(()=>{
        let token=localStorage.getItem('token')
        fetch(`/product/updateproduct/${id}`,{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setName(data.apidata.name)
                setDecs(data.apidata.decs)
                setPrice(data.apidata.price)
                setStatus(data.apidata.status)
                setQty(data.apidata.qty)
                setMoredet(data.apidata.moredet)
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
                        <h2 className="text-center">Update Product</h2>
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
                            <label>Status</label>
                            <select className="form-select" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                                <option value="Out-Stock">Out-Stock</option>
                                <option value="In-Stock">In-Stock</option>
                            </select>
                            <label>Image</label>
                            <input type="file" className="form-control" onChange={(e)=>{setImg(e.target.files[0])}}/>
                            <label>Image</label>
                            <input type="file" className="form-control" onChange={(e)=>{setImg2(e.target.files[0])}}/>
                            <button type="submit" className="form-control btn btn-success mt-2 mb-2">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     );
    }}


export default Updateproduct;