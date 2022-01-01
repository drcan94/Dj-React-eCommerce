import { 
    createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    productListReducer, 
    productDetailsReducer 
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userProfileDetailReducer,
    userProfileUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfileDetail: userProfileDetailReducer,
    userProfileUpdate: userProfileUpdateReducer,
})

const cartItemsFromLS = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLS = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLS = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    
    cart: { 
        cartItems: cartItemsFromLS,
        shippingAddress: shippingAddressFromLS,
    },
    
    userLogin: { 
        userInfo: userInfoFromLS
    },
    
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store