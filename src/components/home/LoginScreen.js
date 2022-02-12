import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import {useDispatch, useSelector} from 'react-redux';
import {startLogin} from '../../redux/actions/auth';
import {useNavigate} from 'react-router-dom';
// userroot.com@
// U53r.r00t
const LoginScreen = ()=>{

  const [values, handleChange, _] = useCustomForm({
    email: "",
    pass: ""
  });

  const dispatch = useDispatch();
  const {logged} = useSelector(state => state.auth);
  const navigator = useNavigate();

  const handleLogin = (e)=>{
    e.preventDefault();

    dispatch( startLogin(values.email, values.pass) );
  }

  if(logged) {
    return navigator('/home');
  }

  return (
    <div className="main-cont">
      <div className="login-form">
	<h1>Nicole Store</h1>
	<form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input 
	    type="email" 
	    name="email" 
	    id="email"
	    placeholder="alguien@dominio.com"
	    onChange={handleChange}
	    value={values.email}
	  />
          <label htmlFor="pass">Contraseña</label>
          <input 
	    type="password" 
	    name="pass" 
	    id="pass" 
	    placeholder="alguien@dominio.com"
	    required={true}
	    onChange={handleChange}
	    value={values.pass}
	  />
	  <input type="submit" value="Iniciar sesión" />
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;