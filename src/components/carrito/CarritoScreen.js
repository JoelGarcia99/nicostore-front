import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import HeaderComponent from '../home/header';
import ProductCard from '../products/ProductCard';
import { format } from 'fecha';

const CarritoScreen = ()=>{
    
    const [state, setState] = useState({
        cargando: true,
    });

    const {token} = useSelector(state=>state.auth);
    const {__id:carrito_id} = useSelector(state=>state.cart);
    let {user} = useSelector(state=>state.auth);

    user = JSON.parse(user);
  useEffect(()=>{

    fetch(`http://localhost:8500/carrito/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'auth': token
            }
        }
    ).then(async(res)=>{
        const jsonRes = await res.json();
        if(!jsonRes.ok) {
            Swal.fire({
                title: `No se pudo obtener el carrito`,
                text: jsonRes.mensaje,
                onClose: ()=>Swal.close()
            });
            return;
        }

        setState({
            ...state,
            cargando: false,
            items: jsonRes.carrito
        });
    })

  }, []);

  if(state.cargando) return <h1>Cargando carrito...</h1>

  // calculando total
  let total = 0;
  
  for(let producto in state.items) {
    total += state.items[producto].total
  }

  return (
    <>
    <HeaderComponent />
    <center><h2>Detalles del carrito</h2></center>
    <div className='cart-home'>
        <span className='cart-d'>
            <h3>Detalles del pedido</h3>
            <span>
                La compra se cerrará por whatsapp
            </span>
            <br/>
            <h3>Detalles generales</h3>
            <b>Items en el carrito</b>
            <small>Actualmente hay {state.items.length} productos agregados</small>
            <b>Total a pagar</b>
            <small>El monto a pagar es de ${total}</small>
            <br/>
            <h3>Detalles de factura</h3>
            <b>ID de factura</b>
            <small>{carrito_id}</small>
            <b>A nombre de</b>
            <small>{user.nombre}&nbsp;{user.apellido}</small>
            <b>Fecha de factura</b>
            <small>{format(new Date(), 'dddd MMMM Do, YYYY')}</small>
            <br/>
            <button className='btnPay'>Pagar carrito</button>
        </span>
        <div className='cart'>
        {
            state.items.map((item)=>{
                return <ProductCard 
                    key={item.__id}
                    prod={item}
                    showCart={false}
                />
            })
        }
        </div>
    </div>
    </>
  )
}

export default CarritoScreen;
