import { useContext } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function AdminDashbord() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()

    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <section id="mid">
        <div className="container-fluid">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">Mid</div>
                </div>
            </div>
        </section>
     );
}}

export default AdminDashbord;