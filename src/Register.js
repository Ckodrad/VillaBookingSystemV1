import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider, { UserContext } from './AuthProvider';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userDuplicate, setUserDuplicate] = useState(false)
    const { SignUp, user } = useContext(UserContext)
    const navigate = useNavigate()

    // Formik ValidationSchema

    const RegisterSchema = Yup.object().shape({
        username: Yup.string()
            .min(8, 'Please enter more than 8 characters')
            .required('This field is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
        password: Yup.string()
            .min(10, 'Please enter more than 10 characters')
            .required('This field is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required('This field is required')
    })

    const onSubmit = (e) => {
        SignUp(username, email, password)

        // Check for username duplications
        if (!user) { setUserDuplicate(true) }
    }

    const navigateLogin = () => {
        navigate('/login')
    }

    // Check if user authenticated or not
    useEffect(() => {
        if (user) {
            navigate("/home")
        }
    }, [user])

    return (
        <div className='form-container'>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, handleChange, values, handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className='title'>
                            Create Account
                        </div>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                name='username'
                                value={values.username}
                                type="text"
                                placeholder="John Apple"
                                id="floatingUsername"
                                onChange={(e) => {
                                    handleChange(e)
                                    setUsername(e.target.value)
                                }}
                                isInvalid={!!errors.username}
                            />
                            <label htmlFor='floatingUsername'>Username</label>
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Floating>

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

                        <Form.Floating className="mb-3">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                id="floatingPassword"
                                onChange={(e) => {
                                    handleChange(e)
                                    setPassword(e.target.value)
                                }}
                                isInvalid={!!errors.password}
                            />
                            <label htmlFor='floatingPassword'>Password</label>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                name="confirmPassword"
                                type="password"
                                placeholder="Password"
                                id="floatingConfirmPassword"
                                onChange={(e) => handleChange(e)}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <label htmlFor='floatingConfirmPassword'>Confirm Password</label>
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Floating>
                        {userDuplicate &&
                            <>
                                <Alert status='error' style={{ marginBottom: "15px" }}>
                                    <AlertIcon />
                                    Account already exists. Please try a new username
                                </Alert>
                            </>
                        }
                        <Form.Text id="RegisterIfNoAccount" muted>
                            Already registered? Click <a onClick={navigateLogin} className="redirectRegister">here</a> to sign in
                        </Form.Text>
                        <br /><br />
                        <button type="submit" className='submitForm'>
                            Sign Up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register;