import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import {useDispatch} from 'react-redux';
import {startLogin} from '../../redux/actions/auth';
import Swal from 'sweetalert2';
import Footer from './Footer';
// user@root.com
// U53r.r00t
const RegisterScreen = ()=>{

  const [values, handleChange, _] = useCustomForm({
    email: undefined,
    pass: undefined
  });

  const dispatch = useDispatch();

  const handleLogin = async(e)=>{
    e.preventDefault();

    const res = await fetch(`http://localhost:8500/user/register`, {
      method: 'POST',
      body: new URLSearchParams({
	      email: values.email, 
          pass: values.pass,
          nombre: values.nombre,
          apellido: values.apellido, 
      }),
      headers: {
	      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    });

    const jsonRes = await res.json();

    if(!jsonRes.ok) {
      Swal.fire({
        title: "No se pudo iniciar sesión",
        text: jsonRes.error.sqlMessage || `${jsonRes.error}. La contraseña debe tener mayúsculas, minúsculas, números, y caracteres.`,
        onClose: ()=>Swal.close()
      });
    }
    else{ 
        Swal.fire({
            title: "Ya puede iniciar sesión",
            text: jsonRes.mensaje,
            onClose: () => {
                window.location.href = "http://localhost:3000/";
            }
        });       
    }
  }

  return (
    <div className="main-cont">
      <div className="login-form">
	<h1>Gramor Design</h1>
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
    <label htmlFor="pass">Nombre</label>
    <input 
	    type="text" 
	    name="nombre" 
	    id="nombre" 
	    placeholder="Su nombre"
	    required={true}
	    onChange={handleChange}
	    value={values.nombre}
	  />
    <label htmlFor="pass">Apellidos</label>
    <input 
	    type="text" 
	    name="apellido" 
	    placeholder="Sus apellidos"
	    required={true}
	    onChange={handleChange}
	    value={values.apellido}
	  />
	  <input type="submit" value="Registrarse" />
      <button
        onClick={(e)=>{
            e.preventDefault();
            window.location.href = "http://localhost:3000/";
        }}
        >Iniciar sesión</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterScreen;
