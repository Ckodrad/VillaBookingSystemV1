import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import TypeWriter from 'typewriter-effect';
import Swiper from "./Swiper"
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const images = ['./HouseImage1.png','./HouseImage2.png','/LandImage.png']
    const urlImageString = `url(${images[0]})`

    // Rotating images
    useEffect(() => {
        const intervalImgIndex = setInterval(() => {
            if (currentImageIndex === images.length - 1) {
                setCurrentImageIndex(0)
            } else {
                setCurrentImageIndex(currentImageIndex + 1)
            }
        }, 3000)

        return () => {clearInterval(intervalImgIndex)}
    },[])



    return (
        <>
            <div className='home-container' style={{
                backgroundImage:''
                }}>
                <div className="home-title">
                    Welcome to Sahabat Resort & Retreat
                </div> 
                <div className="home-typewriter" >
                    Your one stop getway destination for 
                    <TypeWriter
                        options={{
                            strings:[
                                '<span><b class="relaxation">Relaxation</b> ⛱️</span>',
                                '<span><b>Vacation ✈️ </b></span>',
                                '<span><b>Business Meeting ⌨️ </b></span>',
                                '<span><b>Camping ⛺️ </b></span>',
                            ],
                            autoStart:true,
                            loop:true,
                            pauseFor:1000,
                        }}
                    />
                </div>
                <div>
                    <Nav.Item href="/Booking" >
                        <Nav.Link as={Link} to={"/Booking"}>
                            <Button variant="outline-dark">Book now</Button>
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </div>
            <div className="home-facility-container">
                <h4 style={{textAlign:'left'}}><b>Facilities</b></h4>
                Enjoy the following complimentary facilities during your stay. These are mantained, services, and sanitized routinely for your safety and convenience.
                <Swiper />       
            </div>

        </>
        
    )
}

export default Home;