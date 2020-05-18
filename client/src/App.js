import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './component/Listprod';
import Product from './component/Product';
import Cart from './component/Cart';
import Signin from './component/Signin';
import { useSelector } from 'react-redux';
import Register from './component/Register';
import Products from './component/Products';
import Shipping from './component/Shipping';
import Payment from './component/Payment';
import PlaceOrder from './component/PlaceOrder';
import Order from './component/Order';
import Profile from './component/Profile';
import Orders from './component/Orders';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

 
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand input-group-prepend">
            <Link className='ml-5' to="/" ><a href="#"  >Net-Resteau</a></Link>

          </div>
           
          
          <div className="header-links">
            <Link to='/cart/:id'><i class="fas fa-shopping-cart text-white"><a href="cart.html"></a></i></Link>
            <div className="dropdown">
                <a href="#"  >Category</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/category/sucré">Sucré</Link>
                    <Link to="/category/salé">Salé</Link>
                  </li>
                </ul>
          </div>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        
        <main className="main">
          <div className="content">
            <Route path="/orders" component={Orders} />
            <Route path="/profile" component={Profile} />
            <Route path="/order/:id" component={Order} />
            <Route path="/products" component={Products} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/signin" component={Signin} />
            <Route path="/register" component={Register} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/category/:id" component={Home} />
            <Route path="/" exact={true} component={Home} />


          </div>

        </main>
        <footer className="footer">
          All right reserved.
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
