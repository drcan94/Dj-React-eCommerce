import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Row, Card, Col, ListGroup, Image, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'

function CartItem() {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    let { cartItems } = cart // means --> const cartItems = cart.cartItems

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        navigate("/login?redirect=shipping")
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2} className='my-2'>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                      
                                        <Form.Select
                                            aria-label="Items"
                                            as='select'
                                            className='px-3 my-2'
                                            value={item.qty}
                                            onChange={
                                                (e) => dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                            }
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={
                                                () => removeFromCartHandler(item.product)
                                            }
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce(
                                    (acc, item) => acc + item.qty, 0
                                )}) Items
                            </h2>
                            ${cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price, 0
                            ).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item className='d-grid gap-2'>
                            <Button
                                type='button'
                                className='rounded-3'
                                disabled={
                                    cartItems.length === 0
                                }
                                onClick={checkOutHandler}
                            >
                                PROCEED TO CHECKOUT
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartItem
