import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { getListMyOrders } from '../actions/orderActions'

function OrderScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const [sdkReady, setSdkReady] = useState(false)

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    // clientID ?
    // AeDXja18ckwFUkl-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!order || successPay || order._id !== Number(id)) {
            dispatch({
                type:ORDER_PAY_RESET,
            })
            dispatch(getOrderDetails(id))

            // for orderListMy update
            dispatch(getListMyOrders())

        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, id, successPay])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>
            {error}
        </Message>
    ) : (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup
                        variant='flush'
                    >
                        <ListGroup.Item>
                            <h2>Shipping</h2 >
                            <p>
                                <strong>
                                    Name: {order.user.name}
                                </strong>
                            </p>
                            <p>
                                <strong>
                                    Email: <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                                </strong>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {' '}
                                {order.shippingAddress.postalCode}
                                {' '}
                                {order.shippingAddress.country}
                            </p>

                            {
                                order.isDelivered ?
                                    (
                                        <Message variant='success'>Delivered at {order.deliveredAt}</Message>
                                    ) : (
                                        <Message variant='warning'>Not Delivered</Message>
                                    )
                            }


                        </ListGroup.Item >

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod === "paypal" && `PayPal`}
                                {order.paymentMethod === "stripe" && `Stripe`}
                            </p>

                            {
                                order.isPaid ?
                                    (
                                        <Message variant='success'>Paid at {order.paidAt}</Message>
                                    ) : (
                                        <Message variant='warning'>Not Paid</Message>
                                    )
                            }

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length === 0
                                    ? (
                                        <Message variant='info'>
                                            Order is empty
                                        </Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {
                                                order.orderItems.map((item, index) => (
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
                    </ListGroup >
                </Col >
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
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                     
                            {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        {
                                            loadingPay && (
                                                <Loader />
                                            )}
                                        {
                                            !sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton 
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )
                                        }
                                    </ListGroup.Item>
                                )
                            }


                        </ListGroup>

                    </Card>
                </Col>

            </Row >
        </div >
    )
}

export default OrderScreen
