import { getDefaultNormalizer } from "@testing-library/react"
import { useContext, useState } from "react";
import { UserContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import 'react-phone-number-input/style.css'
import Button from 'react-bootstrap/Button';
import BookingContact from "./BookingContactInfo";
import BookingDate from "./BookingDate";
import BookingRoom from "./BookingRoom";
import BookingCheckout from "./BookingCheckout";


import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'

const Booking = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const steps = [
        { title: 'Step 1', description: ' Contact Info' },
        { title: 'Step 2', description: 'Date & Time' },
        { title: 'Step 3', description: 'Select Rooms' },
        { title: 'Final Step', description: 'Confirm & Payment' }
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const showCurrentBookingIndex = () => {
        switch (activeStep) {
            case 0:
                return <BookingContact />
            case 1:
                return <BookingDate />
            case 2:
                return <BookingRoom />
            case 3:
                return <BookingCheckout />
        }
    }

    // If user not logged in, prompt them to register an account first
    if (!user) {
        navigate('/Register')
    }

    return (
        <>
            <div className="booking-form-header">
                <Stepper index={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className="booking-form-container">
                {showCurrentBookingIndex()}
                <Button variant="primary" style={{ marginTop: '20px', textAlign: 'right' }} onClick={() => setActiveStep(index => index - 1)}>Back</Button>
                <Button variant="primary" style={{ marginTop: '20px', textAlign: 'right' }} onClick={() => setActiveStep(index => index + 1)}>Next</Button>
            </div>
        </>
    )
}

export default Booking;