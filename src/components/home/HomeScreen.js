import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarrito } from '../../redux/actions/carrito';
import ProductList from '../products/productComponent';
import Footer from './Footer';
import HeaderComponent from './header';

const HomeScreen = ()=>{

  const dispatch = useDispatch();
  const {user, token} = useSelector(state=>state.auth)

  useEffect(()=>{
    dispatch( fetchCarrito( token) );
  }, []);

  return <div>
    <HeaderComponent />
    <ProductList />
    <Footer />
  </div>
}

export default HomeScreen;

