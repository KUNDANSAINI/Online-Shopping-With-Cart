import { Link } from "react-router-dom";

function Left() {
    return ( 
        <div className="col-md-3">
            <Link to={'/catigory'}><button className="btn btn-dark form-control mb-2">Catigory Managment</button></Link>
            <Link to={'/adminproduct'}><button className="btn btn-dark form-control mb-2">Product Managment</button></Link>
            <Link to={'/adminquery'}><button className="btn btn-dark form-control mb-2">Query Managment</button></Link>
        </div>
     );
}

export default Left;