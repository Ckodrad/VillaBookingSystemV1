import './App.css';
import NavBar from './Navbar';
import {Routes, Route} from "react-router-dom";
import Login from './Login'
import Home from './Home'
import Register from './Register'
import AuthProvider from './AuthProvider';
import { BookingContext } from './BookingCheckout';
import SwiperTest from './Swiper';
import Booking from './Booking';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51InJ6GFfu0aPr0Ln89w0oFcFmRTMeYFz1bztw3ukmUBKSmdD9ynpzgDo815jfTAwEUTRh87iL7Ur0gTucp129Kif00LuC8oKHp')

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/SwiperTest" element={<SwiperTest/>}/>
          <Route path="/Booking" element={<Booking/>}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
