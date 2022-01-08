import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod } = cart

    const [currentPaymentMethod, setCurrentPaymentMethod] = useState(paymentMethod)


    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()


    if (!shippingAddress.address) {
        navigate('/shipping')
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(currentPaymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Payment</h1>
            <Form
                onSubmit={submitHandler}
            >

                <Form.Group
                    controlId='paymentMethod'
                    className='mb-3'

                >
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            aria-label="radio 1"
                            id='paypal'
                            name='paypal'
                            value='paypal'
                            checked={currentPaymentMethod === "paypal"}

                            onChange={
                                (e) => setCurrentPaymentMethod(e.target.value)
                            }

                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            aria-label="radio 2"
                            id='stripe'
                            name='stripe'
                            value='stripe'
                            checked={currentPaymentMethod==="stripe"}

                            onChange={
                                (e) => setCurrentPaymentMethod(e.target.value)
                            }

                        ></Form.Check>

                    </Col>


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

export default PaymentScreen
