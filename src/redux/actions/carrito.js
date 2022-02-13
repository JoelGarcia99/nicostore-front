import Swal from "sweetalert2";
import types from "../types";

export const fetchCarrito = (token)=>{
  return async(dispatch)=>{
    const res = await fetch(`http://localhost:8500/carrito`, {
      method: 'GET',
      headers: {
	    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'auth': token
      }
    });

    let jsonRes = await res.json();

    if(!jsonRes.ok) {

        const res2 = await fetch(`http://localhost:8500/carrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'auth': token
            }
        });
        jsonRes = await res2.json();

        if(!res2.ok) {
            Swal.fire({
                title: `Error generando el carrito. Recargue.`,
                text: jsonRes.mensaje,
                onClose: ()=>Swal.close()
            });
            return;
        }

    }
    
    dispatch( setCarrito({
       __id: jsonRes.__id
    }) );
  }
}

export const addItemCarrito = (producto) => {
    return async(dispatch, getState)=>{
        const {token} = getState().auth;
        const {__id:id_carrito} = getState().cart;

        const res = await fetch(`http://localhost:8500/compra`, {
            method: 'POST',
            body: new URLSearchParams({
                id_producto: producto.__id,
                id_precio: producto.id_precio,
                cantidad: 1
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'auth': token
            }
        });

        const jsonRes = await res.json();

        if(!jsonRes.ok) {
            Swal.fire({
                title: `No se pudo agregar el producto ${producto.nombre}`,
                text: JSON.stringify(jsonRes2.error),
                onClose: ()=>Swal.close()
            });
            return;
        }

        const res2 = await fetch(`http://localhost:8500/carrito/agregar`, {
            method: 'POST',
            body: new URLSearchParams({
                id_carrito,
                id_compra: jsonRes.compra.__id,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'auth': token
            }
        });

        const jsonRes2 = await res2.json();
        if(!jsonRes2.ok) {
            Swal.fire({
                title: `No se pudo agregar el producto ${producto.nombre}`,
                text: JSON.stringify(jsonRes2.error),
                onClose: ()=>Swal.close()
            });
            return;
        }

        Swal.fire({
            title: `Se ha agregado el producto ${producto.nombre} al carrito`,
            text: jsonRes2.mensaje,
            onClose: ()=>Swal.close()
        });
    }
}

export const setCarrito = (carrito)=>({
  type: types.getCarrito,
  payload: carrito
});

export const addCarritoCompra = (compra)=>({

});
