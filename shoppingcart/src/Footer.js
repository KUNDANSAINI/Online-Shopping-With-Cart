import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
        <section id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <p className="text-center"><Link to="/dashbord"><img src="./background/download.jpeg" alt="Error"/></Link></p>
                        <p>CAMBRIDGE, MG09 99HT. 9870 ST VINCENT PLACE, GLASGOW, DC 45 FR 45, Jaipur, India</p>
                    </div>
                    <div className="col-md-3" id="mail">
                        <h6>CONTACT</h6>
                        <ul>
                            <Link to="/about"><li>About Us</li></Link>
                            <Link to="/contact"><li>Contact Us</li></Link>
                            <Link to="/contact"><li>Feedback</li></Link>
                            <Link to="/myorder"><li>My Orders</li></Link>
                            <Link to="/cart"><li>Cart</li></Link>
                        </ul>
                    </div>
                    <div className="col-md-3 ps-5">
                        <h6>MAIL US:</h6>
                        <p>9863 - 9867 MILL ROAD, CAMBRIDGE, MG09 99HT. 9870 ST VINCENT PLACE, GLASGOW, DC 45 FR 45, Jaipur, India</p>
                        <h6>SOCIAL:</h6>
                        <i className="bi bi-facebook"></i> <i className="bi bi-twitter-x ms-3"></i> <i className="bi bi-youtube ms-3"></i>
                    </div>
                    <div className="col-md-3">
                        <h6>Contact</h6>
                        <ul>
                            <li>Telephone: <Link to="#">+1 800 603 6035</Link></li>
                            <li className="mt-2">E-mail: <Link to="#">mail@demolink.org</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        <hr/>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <span><i class="bi bi-shop"></i> Become a Seller</span>
                </div>
                <div className="col-md-6">
                <span><i class="bi bi-c-circle"></i> 2023-2024 Shopping Cart</span>
                </div>
            </div>
        </div>
        </section>
        </>
    );
}

export default Footer;