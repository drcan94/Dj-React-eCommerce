import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import GetUserScreen from './screens/GetUserScreen'

function App() {
    return (
        <div>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} exact />
                        <Route path='/product/:id/' element={<ProductScreen />} />
                        <Route path='/cart/' element={<CartScreen />} />
                        <Route path='/shipping/' element={<ShippingScreen />} />
                        <Route path='/payment/' element={<PaymentScreen />} />
                        <Route path='/placeorder/' element={<PlaceOrderScreen />} />
                        <Route path='/order/:id/' element={<OrderScreen />} />
                        <Route path='/login/' element={<LoginScreen />} />
                        <Route path='/register/' element={<RegisterScreen />} />
                        <Route path='/profile/' element={<UserProfileScreen />} />
                        <Route path='/admin/allusers/' element={<UserListScreen />} />
                        <Route path='/admin/user/:id/' element={<GetUserScreen />} />
                    
                    </Routes>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default App;