import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import CartItem from '../components/CartItem'

function AddToCartScreen() {
    const { id } = useParams()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])


    return (
        <CartItem />
    )
}

export default AddToCartScreen
