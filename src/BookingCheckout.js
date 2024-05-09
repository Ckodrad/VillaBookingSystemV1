import axios from "axios";
import { useEffect, useState, useContext, createContext } from "react";
import {
    Input, InputGroup, InputLeftElement, InputRightElement, Stack, InputLeftAddon
} from '@chakra-ui/react'
import { UserContext } from './AuthProvider';

export const BookingContext = createContext()

const BookingCheckout = ({ children }) => {
    const [price, setPrice] = useState(0)
    const [room, setRoom] = useState("")
    const { user, email, checkOut, checkIn, roomType } = useContext(UserContext)

    const getPaymentInfo = () => {
        axios
            .get("/api/bookingPayment")
            .then((res) => {
                setPrice(res.data.totalPrice)
            })
    }


    const makePayment = () => {
        const finalPrice = { 'price': price }
        axios
            .post("/api/bookingPayment", finalPrice)
            .then((res) => {
                window.snap.pay(res.data['token'])
                console.log(res.data['token'])
            })
    }

    useEffect(() => {
        // You can also change below url value to any script url you wish to load, 
        // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;

        // Optional: set script attribute, for example snap.js have data-client-key attribute 
        // (change the value according to your client-key)
        const myMidtransClientKey = 'SB-Mid-client-fuYyNru5CVhU37ho';
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }
    }, []);




    return (
        <div className="form-container">
            <Stack spacing={3}>
                <InputGroup>
                    <InputLeftAddon
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='Name'
                    />
                    <Input className="Name" placeholder={user} isDisabled='true' />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='Email'
                    />
                    <Input className="Email" placeholder={email} isDisabled='true' />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='Check-in Date'
                    />
                    <Input className="checkIn" placeholder={checkIn} isDisabled='true' />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='Check-out Date'
                    />
                    <Input className="checkOut" placeholder={checkOut} isDisabled='true' />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='Room Type'
                    />
                    <Input className="Room" placeholder={roomType} isDisabled='true' />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='Rp.'
                    />
                    <Input className="paymentAmount" placeholder='Enter amount' onChange={(e) => setPrice(e.target.value)} />
                </InputGroup>
            </Stack>
            <button onClick={makePayment}>Click here to pay</button>
        </div>
    )
}

export default BookingCheckout;