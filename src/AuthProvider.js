import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const UserContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [roomType, setRoomType] = useState("")

    const LoginUser = (username, password) => {
        const profile = { "username": username, "password": password }

        axios
            .post("/api/Login/", profile)
            .then((res) => {
                setUser(res.data.username)
                setEmail(res.data.email)
                console.log(res.data.email)
            })
            .catch((err) => {
                console.log("Server responded with error: ", err);
            })
    }


    const SignUp = (username, email, password) => {
        const profile = { "username": username, "email": email, "password": password }

        axios
            .post("/api/SignUp/", profile)
            .then((res) => setUser(res.data.user))
            .catch((err) => {
                console.log("Server responded with error: ", err);
            })
    }

    const Logout = () => {
        axios
            .post("/api/Logout/")
            .then((res) => setUser(null))
            .catch((err) => {
                console.log("Server responded with error: ", err);
            })
    }

    const CreateBooking = (checkInDate, checkOutDate) => {
        const bookingInformation = { "checkInDate": checkInDate, "checkOutDate": checkOutDate }
        axios
            .post("/api/booking", bookingInformation)
            .then((res) => {
                console.log(res)
                setCheckIn(checkInDate)
                setCheckOut(checkOutDate)
            })
            .catch((err) => {
                console.log("Server responded with error: ", err);
            })
    }

    const SetRoomType = (room) => {
        setRoomType(room)
    }

    useEffect(() => {
        axios
            .get("/api/authenticate")
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user)
                } else {
                    setUser(null)
                }
            })
            .catch((err) => {
                console.log("Server responded with error: ", err)
            })
    }, [user])

    let contextData = {
        user: user,
        email:email,
        checkIn:checkIn,
        checkOut:checkOut,
        roomType:roomType,
        SetRoomType:SetRoomType,
        LoginUser: LoginUser,
        Logout: Logout,
        SignUp: SignUp,
        CreateBooking: CreateBooking,
    }

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;