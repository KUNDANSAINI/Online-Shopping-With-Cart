import { useContext, useEffect,  useState } from "react";
import Product from "./Product";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


function Dashbord() {
    const[allprodata,setAllprodata]=useState([])
    const [mess,setMess]=useState('')
    const [catidata,setCatidata]=useState([])
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()

    useEffect(()=>{ 
        let token=localStorage.getItem('token')
        fetch('/product/allproduct',{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setAllprodata(data.alldata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    useEffect(()=>{
        let token=localStorage.getItem('token')
        fetch('/product/catigory',{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setCatidata(data.alldata)
            }else{
                setMess(data.message)
            }
        })
    },[])

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <>
        <Product catidata={catidata} allprodata={allprodata}/>
        <Footer/>
        </>
     );
}}

export default Dashbord;