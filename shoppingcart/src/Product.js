import { useContext, useEffect,  useState } from "react"
import { Link } from "react-router-dom"
import { Contextapi } from "./Contextapi"
function Product(props) {
    const {cart,setCart,loginame,setProfiledata}=useContext(Contextapi)
    const{catidata,allprodata}=props
    const [catigory,setCatigory]=useState('')
    const [filterproduct,setFilterproduct]=useState([])
    useEffect(()=>{setFilterproduct(allprodata)},[allprodata])
    let _cart={...cart}
    function addcart(e,id,qty){
        if(!_cart.items){
            _cart.items={}
        }
        if(_cart.items[id]>=qty){
            alert('Your Quentity Is Max.')
            return
        }
        if(!_cart.items[id]){
            _cart.items[id]=1
        }
        else{
            _cart.items[id] +=1
        }
        if(!_cart.totalItems){
            _cart.totalItems=1
        }else{
            _cart.totalItems +=1
        }
        setCart(_cart)
        localStorage.setItem('cart',JSON.stringify(_cart))
    }

    function handleform(e){
        e.preventDefault()
        if(catigory){
            let w=allprodata.filter((value)=>{
                return value.catigory===catigory
            })
            //console.log(w)
            setFilterproduct(w)
        }
    }

    function handleproduct(e){
        setFilterproduct(allprodata)
    }

    useEffect(()=>{
        fetch(`/auth/profiledata/${loginame}`,{
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===200){
                setProfiledata(data.profiledata)
            }
        })
    },[])

    return (
        <>
        <section id="search">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <button onClick={(e)=>{handleproduct(e)}} className="btn btn-primary form-control">All Product</button>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-3">
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <select className="form-select" value={catigory} onChange={(e)=>{setCatigory(e.target.value)}}> 
                            <option value="">Select</option>
                                {catidata.map((value)=>(
                                    <option value={value.name} key={value._id}>{value.name}</option>
                                 ))}
                            </select>
                            <button type="submit" className="btn btn-success ms-1">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>


        <section id="product">
            <div className="container">
                <div className="row">
                    {filterproduct.map((value)=>(
                    <div className="col-md-3" key={value._id}>
                        <div className="card">
                            <div id="img" className="d-flex">
                            <img src={value.img.img1} className="card-img-top mx-auto" alt={value.img.img1} />
                            </div>
                            <div className="card-body">
                                <div id="name">
                                <h5 className="card-title">{value.name}</h5>
                                </div>
                                <div id="decs">
                                <p className="card-text">{value.decs}</p>
                                </div>
                                <p className="card-text"><i className="bi bi-currency-rupee"></i>{value.price}</p>
                                <p className="card-text">Total Quentity: {value.qty}</p>
                                <p className="card-text">{value.status}</p>
                                <Link to={`/moredetails/${value._id}`}><button className="btn btn-primary ms-1">More Details</button></Link>
                                <i onClick={(e)=>{addcart(e,value._id,value.qty)}} className="bi bi-bag-plus"></i>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}

export default Product;