import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'


const Login = () => {
    const [username, setUsername] = useState('')
    const [userFound, setUserFound] = useState(true)
    const [password, setPassword] = useState('')
    const { LoginUser, user } = useContext(UserContext)
    const navigate = useNavigate()

    // Formik ValidationSchema

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(8, 'Please enter more than 8 characters')
            .required('This field is required'),
        password: Yup.string()
            .min(10, 'Please enter more than 10 characters')
            .required('This field is required'),
    })


    const onSubmit = () => {
        LoginUser(username, password)

        // Show error if user login not found (failed)
        if (!user) {
            setUserFound(false)
        }
    }

    const navigateRegister = () => {
        navigate("/register")
    }

    // Check if user authenticated or not
    useEffect(() => {
        if (user) {
            navigate("/home")
        }
    }, [user])

    // Google authentication response

    const responseMessage = (response) => {
        console.log(response)
    }

    const errorMessage = (error) => {
        console.log(error)
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, handleSubmit, handleChange, handleBlur, values }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className='title'>
                            Account Login
                        </div>
                        <Form.Group>
                            <Form.Floating className="mb-3" >
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
                        </Form.Group>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
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

                        {!userFound &&
                            <>
                                <Alert status='error' style={{ marginBottom: "15px" }}>
                                    <AlertIcon />
                                    User not found. Please try again
                                </Alert>
                            </>
                        }


                        <div id="RegisterIfNoAccount" style={{ marginBottom: '20px' }}>
                            <Form.Text muted >
                                Unable to sign in? <a onClick={navigateRegister} className="redirectRegister">Register now</a>
                            </Form.Text>
                        </div>

                        <button type="submit" className='submitForm'>
                            Login
                        </button>
                        <div>
                        </div>
                    </Form>
                )}
            </Formik>
            <hr />
            <div style={{ marginBottom: '20px' }}>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
        </div>
    )
}

export default Login;