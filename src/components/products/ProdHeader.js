import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const ProdHeaderComponent = ()=>{

  const navigator = useNavigate();

  const handleOptClick = ()=>{
    return navigator("/admin");
  }

  const route = window.location.pathname;

  return (
    <div className="header-opt">
      <NavLink to="/home" className="logo">
	    Nicole
      </NavLink>
      <nav className='menu'>
          <ol>
                <NavLink
                    to="/admin"
                    className={route === "/admin"? "activenode":""}
                >
                    Agregar producto
                </NavLink>
                <NavLink
                    to="/edit"
                    className={route==="/edit"?"activenode":""}
                >
                    Editar Producto
                </NavLink>
          </ol>
      </nav>
    </div>
  )
}

export default ProdHeaderComponent;
