export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.product === product._id)
}

