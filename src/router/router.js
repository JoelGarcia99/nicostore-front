import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminScreen from '../components/admin/Admin';
import EditProduct from '../components/admin/EditProd';
import CarritoScreen from '../components/carrito/CarritoScreen';
import HomeScreen from '../components/home/HomeScreen';
import LoginScreen from '../components/home/LoginScreen';
import RegisterScreen from '../components/home/RegisterScreen';
import { setLoginData, startLogout } from '../redux/actions/auth';

const privateRoutes = {
  home: "/home",
  admin: "/admin",
  edit: "/edit",
  cart: "/cart"
}

const publicRoutes = {
  login: "/",
  register: "/registro"
}

const RouterComponent = ()=>{

  let location = window.location.pathname;
  location = location.split('/');
  location = `/${location[location.length - 1]}`;

  const dispatch = useDispatch();

  const token = localStorage.getItem("nicostore-token");
  const user = localStorage.getItem("nicostore-user")

  for(let value in privateRoutes) {  
    if(privateRoutes[value] === location) {    
      if(!token || !user) {
        dispatch( startLogout() );
        window.location.href = "http://localhost:3000/";
      }
      else {
        dispatch( setLoginData(user, token) );
      }
    }
  }

  for(let value in publicRoutes) {
    if(publicRoutes[value] === location) {
      if(token && user) {
        // me redirecciona al login
        dispatch( setLoginData(user, token) );
        window.location.href = "http://localhost:3000/home";
        return;
      }
    }
  }
  

  return <div>
      <Routes>
        <Route exact path={publicRoutes.login} element={<LoginScreen />} />
        <Route exact path={privateRoutes.admin} element={<AdminScreen />} />
        <Route exact path={privateRoutes.home} element={<HomeScreen />} />
        <Route exact path={privateRoutes.edit} element={<EditProduct />} />
        <Route exact path={privateRoutes.cart} element={<CarritoScreen />} />
        <Route exact path={publicRoutes.register} element={<RegisterScreen />} />
      </Routes>
  </div>
}

export default RouterComponent;
