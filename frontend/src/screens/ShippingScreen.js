import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    // useEffect(() => {

    // }, [navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')

    }

    return (
        <FormContainer>
            <CheckoutSteps step1 />
            <h1>Shipping</h1>
            <Form
                onSubmit={submitHandler}
            >

                <Form.Group
                    controlId='address'
                    className='mb-3'
                >
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId='city'
                    className='mb-3'
                >
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId='postalCode'
                    className='mb-3'
                >
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId='country'
                    className='mb-3'
                >
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='info'
                    className='my-3 rounded-pill'
                >
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
