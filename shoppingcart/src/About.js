import { useContext } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function About() {
    const {loginame}=useContext(Contextapi)
    let navigate=useNavigate()


    if(!loginame){
        navigate('/')
    }else{
    return ( 
        <>
        <section id="about">
            <div id="off" className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={"./background/kalyan-quote.png"} alt="Error" />
                        </div>
                    </div>
            </div>

            <div id="group" className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h2>Flipkart Group Companies</h2>
                        <p>The Flipkart Group is one of India’s leading digital commerce entities and includes group companies Flipkart, Myntra, Flipkart Wholesale, Flipkart Health+, and Cleartrip.Started in 2007, Flipkart has enabled millions of sellers, merchants, and small businesses to participate in India's digital commerce revolution. With a registered customer base of more than 500 million, Flipkart's marketplace offers over 150 million products across 80+ categories. Today, there are over 14 lakh sellers on the platform, including Shopsy sellers. With a focus on empowering and delighting every Indian by delivering value through technology and innovation, Flipkart has created lakhs of jobs in the ecosystem while empowering generations of entrepreneurs and MSMEs. Flipkart is known for pioneering services such as Cash on Delivery, No Cost EMI and easy returns, which are customer-centric innovations that have made online shopping more accessible and affordable for millions of Indians. In 2024, Flipkart also introduced the Flipkart UPI handle to further enhance its digital payment offerings for all customers and further India’s digital economy vision.</p>
                    </div>
                    <div className="col-md-4">
                        <img src={"./background/about-office-image.png"} alt="Error" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <h2 className="text-center">Meet Our Leaders</h2>
                    <div className="col-md-4">
                        <div className="img">
                        <img src={"./background/kalyan.png"} alt="Error"/>
                        </div>
                        <h4 className="text-center">Kalyan Krishnamurthy</h4>
                        <p className="text-center">Chief Executive Officer, Flipkart Group</p>
                    </div>
                    <div className="col-md-4">
                        <div className="img">
                        <img src={"./background/sriram.png"} alt="Error"/>
                        </div>
                        <h4 className="text-center">Sriram Venkataraman</h4>
                        <p className="text-center">Chief Financial Officer, Flipkart Group</p>
                    </div>
                    <div className="col-md-4">
                        <div className="img">
                        <img src={"./background/jeyandran.png"} alt="Error"/>
                        </div>
                        <h4 className="text-center">Jeyandran Venugopal</h4>
                        <p className="text-center">Chief Product and Technology Officer, Flipkart</p>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
     );
}}

export default About;