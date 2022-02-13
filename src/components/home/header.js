import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  faGear,
  faMagnifyingGlass,
  faRightFromBracket,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

const HeaderComponent = ()=>{

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(state=>state.auth);

  const handleOptClick = ()=>{
    return navigator("/admin");
  }

  return (
    <div className="header">
      <NavLink to="/home" className="logo">
	      Nicole
      </NavLink>
      <div className="search">
        <input 
          type="text" 
          placeholder="Busque algo"
        />
        <div className="opt">
          <button><FontAwesomeIcon icon={faMagnifyingGlass}/>&nbsp;Buscar</button>
        </div>
      </div>
      <div className="trailing">
        <div
          onClick={()=>{
            dispatch( startLogout() );
            window.location.href = "http://localhost:3000/";
          }}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
          />
          &nbsp;
          Salir
        </div>
        <FontAwesomeIcon
          onClick={()=>{
            navigator('/cart');
          }}
          icon={faCartShopping}
        />
        {
          JSON.parse(user).es_admin !== 0 &&
          <FontAwesomeIcon 
            icon={faGear} 
            onClick={handleOptClick}
          />
        }
      </div>
    </div>
  )
}

export default HeaderComponent;
