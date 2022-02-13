import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Route, Routes, Switch, useNavigate} from 'react-router-dom';
import HomeScreen from '../components/home/HomeScreen';
import LoginScreen from '../components/home/LoginScreen';
import { setLoginData, setLogout } from '../redux/actions/auth';

const PrivateRouter = ()=>{

    const navigator = useNavigate();
    const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem("nicostore-token");
    const user = localStorage.getItem("nicostore-user")

    if(token & user) {
        // me redirecciona al login
        dispatch( setLoginData(token, user) );
        navigator('/home');
    }
  }, []);

  return <>
    <Route exact path="/" element={<LoginScreen />} />
  </>
}

export default PrivateRouter;