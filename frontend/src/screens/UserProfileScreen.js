import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserProfile, updateUserProfile } from '../actions/userActions'

import { USER_PROFILE_UPDATE_RESET} from '../constants/userConstants'

function UserProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userProfileDetail = useSelector(state => state.userProfileDetail)
    const { error, loading, user } = userProfileDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userProfileUpdate)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")

        } else {
            if (!user || !user.name || success) {
                dispatch({
                    type:USER_PROFILE_UPDATE_RESET
                })
                dispatch(getUserProfile('profile'))

            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')

        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

                <Form onSubmit={submitHandler}>
                    <Form.Group
                        controlId='name'
                        className='mb-3'
                    >
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId='email'
                    >
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId='password'
                    >
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId='confirmPassword'
                    >
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Re-Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='info'
                        className='my-3 rounded-pill'
                    >
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>Orders</h2>
            </Col>
        </Row>
    )
}

export default UserProfileScreen
