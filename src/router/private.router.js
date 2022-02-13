import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Route, Routes, Switch, useNavigate} from 'react-router-dom';
import HomeScreen from '../components/home/HomeScreen';
import LoginScreen from '../components/home/LoginScreen';
import { setLogout } from '../redux/actions/auth';

const PublicRouter = ()=>{

    const navigator = useNavigate();
    const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem("nicostore-token");

    if(!token) {
        // me redirecciona al login
        dispatch( setLogout() );
        navigator('/');
    }
  }, []);

  return <>
        <Route exact path="/home" element={<HomeScreen />} />
    </>;

}

export default PublicRouter;