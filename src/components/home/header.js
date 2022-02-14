import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  faGear,
  faMagnifyingGlass,
  faRightFromBracket,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import Swal from 'sweetalert2';
import ProductList from '../products/productComponent';

const HeaderComponent = ()=>{

  const navigator = useNavigate();
  const [search, setSearch] = useState('')
  const [prod, setProd] = useState([]);
  const dispatch = useDispatch();

  const {user, token} = useSelector(state=>state.auth);

  const handleOptClick = ()=>{
    return navigator("/admin");
  }
  

  const handleSearch = ()=>{

    setSearch(search.trim());

    if(search.trim().length === 0) {
      setProd([]);
      return;
    }

    fetch(`http://localhost:8500/producto/search?q=${search.trim()}`, {
      method: 'GET',
      headers: {
        auth: token
      }
    }).then(async(response)=>{
      const jsonRes = await response.json();

      if(!jsonRes.ok) {
        Swal.fire({
          title: jsonRes.mensaje,
          text: jsonRes.error.sqlMessage
        });
        return;
      }

      // const salida = <div>{jsonRes.output.map(prod=><ProductCard prod={prod} />)}</div>;

      setProd(jsonRes.output)

      if(jsonRes.output.length === 0) {
        Swal.fire({
          title: jsonRes.mensaje,
          text: "No se encontraron productos con el criterio de búsqueda"
        });
      }
      // console.log(salida);

      // MySwal.fire({
      //   title: 'Resultados de búsqueda',
      //   html: jsonRes.output.length === 0?
      //     '<center>No se encontraron resultados</center>':
      //     salida
      // });
    })

    
  }

  return (
    <>
    <div className="header">
      <NavLink to="/home" className="logo">
        Gramor design
      </NavLink>
      <div className="search">
        <input 
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          type="text" 
          placeholder="Busque algo"
        />
        <div className="opt">
          <button
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass}/>&nbsp;Buscar
          </button>
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
    { prod && prod.length !== 0 &&
      <div className="search-res">
        <center>
          <b>Resultados de búsqueda</b>
        </center>
        <ProductList customProd={prod} />    
      </div>
    }
    </>
  )
}

export default HeaderComponent;
