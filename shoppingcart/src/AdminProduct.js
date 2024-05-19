import { Link, useNavigate } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function AdminProduct() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()
    const [mess, setMess] = useState('')
    const [alldata, setAlldata] = useState([])

    useEffect(() => {
        let token=localStorage.getItem('token')
        fetch('/product/productdata',{
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result) => { return result.json() }).then((data) => {
            //console.log(data)
            if (data.status === 200) {
                setAlldata(data.productData)
            } else {
                setMess(data.message)
            }
        })
    }, [])

    function productdelete(e, id) {
        let token=localStorage.getItem('token')
        fetch(`/product/productdelete/${id}`, {
            method: "DELETE",
            headers:{"Authentication":`Bearer ${token}`}
        }).then((result) => { return result.json() }).then((data) => {
            //console.log(data)
            if (data.status === 200) {
                setMess(data.message)
                let newdata = alldata.filter((value) => {
                    return value._id !== id
                })
                setAlldata(newdata)
            } else {
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
                    <Left />
                    <div className="col-md-9">
                        <h2 className="text-center">Product Managment</h2>
                        <Link to='/addproduct'><button className="btn btn-success" id="addnew"><i className="bi bi-cart-check"></i> Add New Products</button></Link>
                        <p>{mess}</p>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Decripations</th>
                                    <th>More Details</th>
                                    <th>Image-1</th>
                                    <th>Image-2</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Quantity</th>
                                    <th>Catigory</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!alldata.length==0 ? (
                                    <>
                                        {alldata.map((value, key) => (
                                            <tr key={value._id}>
                                                <td>{key + 1}</td>
                                                <td>{value.name}</td>
                                                <td>{value.decs}</td>
                                                <td>{value.moredet}</td>
                                                <td><img style={{ width: '80px' }} src={value.img.img1} alt={value.img.img1}/></td>
                                                <td><img style={{ width: '80px' }} src={value.img.img2} alt={value.img.img2} /></td>
                                                <td>{value.price}</td>
                                                <td>{value.status}</td>
                                                <td>{value.qty}</td>
                                                <td>{value.catigory}</td>
                                                <td><Link to={`/productupdate/${value._id}`}><button className="btn btn-success">Update</button></Link></td>
                                                <td><button className="btn btn-danger" onClick={(e) => { productdelete(e, value._id) }}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </>
                                ):(
                                    <tr>
                                        <td colSpan="10" className="text-center"><h4>No Record Found</h4></td>
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

export default AdminProduct;