import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart

    cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (Number(cart.itemsPrice) === 0 ||cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    console.log(cart.itemsPrice)
    cart.taxPrice = (cart.itemsPrice * .08).toFixed(2) // %8 KDV :)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment')
        }

        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }

    }, [navigate, success])


    const placeOrder = (e) => {
        e.preventDefault()
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup
                        variant='flush'
                    >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city}
                                {' '}
                                {shippingAddress.postalCode}
                                {' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>

                            <strong>Method: </strong>
                            {paymentMethod === "paypal" && `PayPal`}
                            {paymentMethod === "stripe" && `Stripe`}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cart.cartItems.length === 0
                                    ? (
                                        <Message variant='info'>
                                            Your cart is empty
                                        </Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {
                                                cartItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={2}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col md={6}>
                                                                <Link to={`/product/${item.product}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>
                                    )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Item:
                                    </Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-grid gap-2'>
                                {error && <Message variant='danger'>{error}</Message>}

                            </ListGroup.Item>
                            <ListGroup.Item className='d-grid gap-2'>

                                <Button
                                    type='button'
                                    variant='info'
                                    className='rounded-pill'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default PlaceOrderScreen
