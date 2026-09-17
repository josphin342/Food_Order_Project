import { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Menu from './components/Menu';
import { loadUser } from "./redux/actions/userAction";
import store from "./redux/store";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from  "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import MyOrders from "./components/MyOrders";
import Cart from "./components/Cart";
import OrderSuccess from "./components/OrderSuccess";
import ProtectedRoute from "./components/user/ProtectedRoute";
import RestaurantDetails from "./components/RestaurantDetails";
import AdminOrders from "./components/admin/AdminOrders";
import OrderDetails from "./components/OrderDetails";

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"



function App() {
  useEffect(() => { store.dispatch(loadUser()); }, []);
  return (
    <>
      <ToastContainer/>
      <Router>
        <div className="App">
          <Header/>
          <div className="container container-fluids">
            <Routes>
              <Route path="/" element={<Home />} exact/>
              <Route path="/eats/stores/search/:keyword" element={<Home />} exact />
              <Route path="/eats/stores/:id/menu" element={<Menu />}/>
              <Route path="/eats/stores/:id" element={<RestaurantDetails />}/>

              {/*user*/}
              <Route path="/users/login" element={<Login />}/>
              <Route path="/users/signup" element={<Register />}/>
              <Route path="/users/me" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
              
              <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/orders/:id"element={<OrderDetails />}/>
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path="/users/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}/>

              {/*admin*/}
              <Route path="/admin/orders" element={<ProtectedRoute roles={["admin"]}><AdminOrders /></ProtectedRoute>} />
              
            </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    </>
  )
 }


export default App
