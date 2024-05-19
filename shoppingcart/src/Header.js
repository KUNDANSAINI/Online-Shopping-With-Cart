import { useContext } from "react";
import { Contextapi } from "./Contextapi";
import { Link, useNavigate } from "react-router-dom"

function Header() {
    const { loginame, setLoginame, cart, profiledata, } = useContext(Contextapi)
    let navigate = useNavigate()

    function adminlogout(e) {
        setLoginame(localStorage.removeItem('username'))
        localStorage.removeItem('token')
        navigate('/')
    }


    if (!loginame) {
        return (<></>)
    }
    if (loginame === 'admin@gmail.com') {
        return (
            <section id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Welcome!! {loginame}</h4>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger logout" onClick={(e) => { adminlogout(e) }}><i className="bi bi-box-arrow-right fs-5"></i> Logout</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    else {
        return (
            <>
            <section id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div className="container">
                                    <Link to="/dashbord"><img src="./background/download.jpeg" alt="Error"/></Link>
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">
                                                <i className="bi bi-list"></i>
                                            </button>
                                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item">
                                                    <Link class="nav-link active" aria-current="page" to="/dashbord">Home</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                    <Link class="nav-link active" aria-current="page" to="/feedback">FeedBack</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                    <Link class="nav-link active" aria-current="page" to="/contact">Contact Us</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                    <Link class="nav-link active" aria-current="page" to="/about">About Us</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent:"end"}}>
                                            <ul className="navbar-nav">
                                            <Link to="/cart"><i className="bi bi-bag-plus mt-1"><span className="position-absolute translate-middle badge rounded-pill bg-danger">
                                            {!cart.totalItems ? 0 : cart.totalItems}
                                            <span className="visually-hidden">unread messages</span></span></i></Link>
                                            <li className="me-2"><Link to="/myorder"><button className="btn btn-info form-control mt-1"><i className="bi bi-truck fs-5"></i> Orders</button></Link></li>
                                            </ul>
                                        <div className="dropdown me-2">
                                            <button className="btn btn-primary form-control mt-1 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-person-check fs-5"></i> Profile
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                            {profiledata.map((value)=>(
                                                <div key={value._id}>
                                                <li>Name: {value.fname}</li>
                                                <li>Surename: {value.lname}</li>
                                                <li>Date Of Birth: {value.dob}</li>
                                                <li>Mobile No: {value.mobile}</li>
                                                </div>
                                            ))}
                                            <li><Link to="/editprofile"><button className="btn btn-outline-info form-control mt-2">Edit Profile</button></Link></li>
                                            <li><button className="btn btn-outline-danger form-control mt-2 " onClick={(e) => { adminlogout(e) }}>Logout</button></li>
                                            </ul>
                                        
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                    {/* <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <Link to="/dashbord"><button className="btn btn-dark">Home</button></Link>
                            <Link to="/feedback"><button className="btn btn-dark ms-2">FeedBack</button></Link>
                            <Link to="/contact"><button className="btn btn-dark ms-2">Contact Us</button></Link>
                            <Link to="/about"><button className="btn btn-dark ms-2">About Us</button></Link>
                        </div>
                        <div className="col-md-5">
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-check fs-5"></i> Profile
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                {profiledata.map((value)=>(
                                    <div key={value._id}>
                                    <li>Name: {value.fname}</li>
                                    <li>Surename: {value.lname}</li>
                                    <li>Date Of Birth: {value.dob}</li>
                                    <li>Mobile No: {value.mobile}</li>
                                    </div>
                                ))}
                                <li><Link to="/editprofile"><button className="btn btn-outline-info form-control mt-2">Edit Profile</button></Link></li>
                                <li><button className="btn btn-outline-danger form-control mt-2 " onClick={(e) => { adminlogout(e) }}>Logout</button></li>
                                </ul>
                            </div>
                            <Link to="/myorder"><button className="btn btn-info logout me-2"><i className="bi bi-truck fs-5"></i> Orders</button></Link>
                            <Link to="/cart"><i className="bi bi-bag-plus"><span className="position-absolute translate-middle badge rounded-pill bg-danger">
                                {!cart.totalItems ? 0 : cart.totalItems}
                                <span className="visually-hidden">unread messages</span></span></i></Link>
                        </div>
                    </div>
                </div> */}
                </section>


                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"></script>
            </>
        );
    }
}

export default Header;