import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Dashbord from './Dashbord';
import AdminDashbord from './AdminDashbord';
import AdminProduct from './AdminProduct';
import Header from './Header';
import { Contextapi } from './Contextapi';
import { useState } from 'react';
import AddProduct from './AddProduct';
import Catigory from './Catigory';
import Addcatigory from './Addcatigory';
import Updateproduct from './Updateproduct';
import Moredetails from './Moredetails';
import Cart from './Cart';
import Myorders from './Myorders';
import Contact from './Contact';
import About from './About';
import Feedback from './Feedback';
import Forgot from './Forgot';
import ForgotPassword from './ForgotPassword';
import Editprofile from './Editprofile';
import Query from './Query';
import Replayquery from './Replayquery';
function App() {
  const [loginame,setLoginame]=useState(localStorage.getItem('username'))
  const [cart,setCart]=useState(JSON.parse(localStorage.getItem('cart')))
  const [profiledata,setProfiledata]=useState([])
  
  return ( 
    <Contextapi.Provider value={{loginame,setLoginame,cart,setCart,profiledata,setProfiledata}}>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashbord' element={<Dashbord/>}></Route>
        <Route path='/admindashbord' element={<AdminDashbord/>}></Route>
        <Route path='/adminproduct' element={<AdminProduct/>}></Route>
        <Route path='/addproduct' element={<AddProduct/>}></Route>
        <Route path='/catigory' element={<Catigory/>}></Route>
        <Route path='/addcatigory' element={<Addcatigory/>}></Route>
        <Route path='/productupdate/:id' element={<Updateproduct/>}></Route>
        <Route path='/moredetails/:id' element={<Moredetails/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/myorder' element={<Myorders/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/feedback' element={<Feedback/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/forgot' element={<Forgot/>}></Route>
        <Route path='/forgotpassword/:token' element={<ForgotPassword/>}></Route>
        <Route path='/editprofile' element={<Editprofile/>}></Route>
        <Route path='/adminquery' element={<Query/>}></Route>
        <Route path='/query/:id' element={<Replayquery/>}></Route>
      </Routes>
    </Router>
    </Contextapi.Provider>
   );
}

export default App;