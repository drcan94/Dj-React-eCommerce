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
                        <Route path='/login/' element={<LoginScreen />} />
                        <Route path='/register/' element={<RegisterScreen />} />
                        <Route path='/profile/' element={<UserProfileScreen />} />
                        <Route path='/shipping/' element={<ShippingScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default App;