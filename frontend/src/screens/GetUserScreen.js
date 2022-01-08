import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Form, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUser, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'
function GetUserScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [message, setMessage] = useState('')

    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const getUserState = useSelector(state => state.getUser)
    const { error, loading, user } = getUserState

    const userUpdate = useSelector(state => state.updateUser)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }


    useEffect(() => {

        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET,
            })
            navigate('/admin/allusers')

        } else {
            if (!userInfo.isAdmin) {
                navigate("/login")
            } else if (isEmpty(user) || user._id !== Number(id)) {

                dispatch(getUser(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, navigate, user, id])


    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            _id: user._id,
            name,
            email,
            isAdmin
        }))

    }

    return (
        <div>

            <FormContainer>
                <div className='text-end'>
                    <Link to='/admin/allusers/'
                        className='btn btn-dark'>
                        Go to User List
                    </Link>
                </div>

                <h2>Edit User</h2>
                {loadingUpdate && (<Loader />)}
                
                {errorUpdate && (<Message
                    variant='danger'
                >
                    {errorUpdate}
                </Message>)}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message
                        variant='danger'
                    >
                        {error}
                    </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group
                            controlId='name'
                            className='mb-3'
                        >
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control

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
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="isAdmin">
                            <Form.Check
                                type="checkbox"
                                label="IsAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>



                        <Button
                            type='submit'
                            variant='info'
                            className='my-3 rounded-pill'
                        >
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>


        </div>
    )
}

export default GetUserScreen
