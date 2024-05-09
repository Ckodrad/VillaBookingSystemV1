import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input'
import { UserContext } from './AuthProvider';


const BookingContact = () => {
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState(' ')

    const ContactSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('This field is required'),
        lastName: Yup.string()
            .required('This field is required'),
        phone: Yup.number(),
        email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
    })

    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                }}
                validationSchema={ContactSchema}
            >
                {({ errors, touched, handleSubmit, handleChange, handleBlur, values }) => (
                    <Form noValidate >
                        <div className='title'>
                            Contact Information
                        </div>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Floating className="mb-3" >
                                        <Form.Control
                                            name='firstName'
                                            value={values.firstName}
                                            type="text"
                                            placeholder="John"
                                            id="floatingFirstName"
                                            onChange={(e) => {
                                                handleChange(e)
                                                setFirstName(e.target.value)
                                            }}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <label htmlFor='floatingFirstName'>First Name</label>
                                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>

                                    </Form.Floating>
                                </Col>
                                <Col>
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            placeholder="Apple"
                                            id="floatingLastName"
                                            onChange={(e) => {
                                                handleChange(e)
                                                setLastName(e.target.value)
                                            }}

                                            isInvalid={!!errors.lastName}
                                        />
                                        <label htmlFor='floatingLastName'>Last Name</label>
                                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                    </Form.Floating>
                                </Col>
                            </Row>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    name='email'
                                    type="email"
                                    placeholder="Email"
                                    id="floatingEmail"
                                    onChange={(e) => {
                                        handleChange(e)
                                        setEmail(e.target.value)
                                    }}
                                    isInvalid={!!errors.email}
                                />
                                <label htmlFor='floatingEmail'>Email</label>
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Floating>
                        </Form.Group>
                        <PhoneInput
                            placeholder="Enter phone number"
                            name="phone"
                            defaultCountry="ID"
                            onChange={setPhone}
                        />
                    </Form>
                )}
            </Formik>

        </>
    )
}

export default BookingContact;