import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";
import Footer from "./Footer";

function Contact() {
    const [name,setName]=useState('')
    const [decs,setDecs]=useState('')
    const [email,setEmail]=useState('')
    const [img,setImg]=useState('')
    const [mess,setMess]=useState('')
    const [mess1,setMess1]=useState('')
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()

    function handleform(e){
        e.preventDefault()
        let imgsize=(img.size/1024)
        if(imgsize>49){
            alert('Please Image File Should Be Less Then 50KB')
        }else{
        let fdata=new FormData()
        fdata.append('name',name)
        fdata.append('decs',decs)
        fdata.append('img',img)
        fdata.append('username',loginame)
        let token=localStorage.getItem('token')
        fetch('/feedback/userfeedback',{
            method:"POST",
            headers:{"Authentication":`Bearer ${token}`},
            body:fdata
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                alert("Your Feedback Successfully Insart")
                navigate("/dashbord")
            }else{
                setMess(data.message)
            }
        })
    }}

    function emailform(e){
        e.preventDefault()
        const data={email}
        let token=localStorage.getItem('token')
        fetch('/feedback/response',{
            method:"POST",
            headers:{"Content-Type":"application/json","Authentication":`Bearer ${token}`},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                alert("Email Is Successfully Insert, Please Wait For Response And Check Your Email")
            }else{
                setMess1(data.message)
            }
        })
    }

    if(!loginame){
        navigate('/')
    }else{
    return (
        <>
        <section id="contact">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Contact Us</h1>
                    </div>
                </div>
            </div>

            <div className="container" id="text">
                <div className="row">
                    <div className="col-md-4">
                        <h2>How to Find Us</h2>
                        <p>If you have any questions, just fill in the contact form, and we will answer you shortly. If you are living nearby, come visit TaxExpert at one of our comfortable offices.</p>
                        <h5>Headquarters</h5>
                        <p>9863 - 9867 MILL ROAD, CAMBRIDGE, MG09 99HT.</p>
                        <p>Telephone: +1 800 603 6035</p>
                        <p className="email">E-mail: <Link to="#">mail@demolink.org</Link></p>
                        <h5>Support Centre</h5>
                        <p>9870 ST VINCENT PLACE, GLASGOW, DC 45 FR 45</p>
                        <p>Telephone: +1 800 603 6035</p>
                        <p className="email">E-mail: <Link to="#">mail@demolink.org</Link></p>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <h2>FeedBack</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <input type="text" className="form-control mt-2" placeholder="Name" 
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            />
                            <textarea className="form-control mt-2" placeholder="Decripations"
                            value={decs}
                            onChange={(e)=>{setDecs(e.target.value)}}
                            ></textarea>
                            <input type="file" className="form-control mt-2" onChange={(e)=>{setImg(e.target.files[0])}} />
                            <button type="submit" className="btn btn-success mt-2 form-control">Submit</button>
                        </form>

                        {/* Email Form Start */}
                        <div id="email">
                        <p>{mess1}</p>
                        <form onSubmit={(e)=>{emailform(e)}}>
                            <div className="input-group mt-2">
                                <input type="text" className="form-control" placeholder="Email Us" aria-label="Input group example" aria-describedby="btnGroupAddon2" 
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                />
                                <button className="btn input-group-text" id="btnGroupAddon2"><i className="bi bi-envelope"></i></button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
    );
}}

export default Contact;