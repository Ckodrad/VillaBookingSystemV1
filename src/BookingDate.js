import { DatePicker, InputGroup, DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { format } from 'date-fns';
import { useState, useContext } from 'react';
import { UserContext } from './AuthProvider';
import Button from 'react-bootstrap/Button';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays'
import parseISO from 'date-fns/parseISO'
import { parse } from '@fortawesome/fontawesome-svg-core';

const BookingDate = () => {
    const { CreateBooking } = useContext(UserContext)
    const [checkIn, setCheckIn] = useState()
    const [checkout, setCheckOut] = useState()

    const submitBooking = (e) => {
        e.preventDefault()
        console.log(isBefore(checkIn, new Date()))
        CreateBooking(checkIn, checkout)
    }

    return (
        <div>
            <form onSubmit={submitBooking}>
                <InputGroup style={{ width: 'auto', margin: 'auto' }}>
                    <InputGroup.Addon><b>Check-In Date</b></InputGroup.Addon>
                    <DatePicker format="MMMM dd, yyyy" block appearance="subtle" size='lg' style={{ width: 270 }} editable={false} placeholder='Choose Date' oneTap='true'
                        onChange={(date) => { setCheckIn(date.toLocaleDateString()) }}
                        shouldDisableDate={date => isBefore(date, new Date())}
                    />
                    <InputGroup.Addon><b>Check-Out Date</b></InputGroup.Addon>
                    <DatePicker format="MMMM dd, yyyy" block appearance="subtle" size='lg' style={{ width: 300 }} editable={false} placeholder='Choose Date' oneTap='true'
                        onChange={(date) => { setCheckOut(date.toLocaleDateString()) }}
                        disabled={!checkIn}
                        shouldDisableDate={date => isBefore(date, addDays(parseISO(checkIn), 1))}
                    />
                </InputGroup>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Button variant="primary" style={{ marginTop: '20px', textAlign: 'right' }} type='submit' >Submit</Button>
            </form>
        </div>
    )
}

export default BookingDate;