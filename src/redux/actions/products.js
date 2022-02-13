import Swal from "sweetalert2";
import types from "../types";


export const startFetching = (from = 0, n=20) => {
    return async(dispatch, getState)=>{

        dispatch( setLoading() );
        
        const res = await fetch(
            `http://localhost:8500/producto?from=${from}&n=${n}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'auth': getState().auth.token
                }
            }
        );
        const jsonRes = await res.json();

        if(!jsonRes.ok) {
            Swal.fire({
                title: "Ooops!",
                text: jsonRes.mensaje,
                onClose: ()=>Swal.close()
            });
            return;
        }

        dispatch( setProducts(jsonRes.productos) );
    }
}

export const setLoading = (isLoading=true)=>({
    type: types.fetchPro,
    payload: {
        isLoading
    }
});

export const setProducts = (products) => ({
    type: types.fetchPro,
    payload: {
        products,
        isLoading: false
    }
});

export const addProduct = async({product, token})=>{

    const valor = {valor: product.valor};
    delete product.valor;


    const res = await fetch(`http://localhost:8500/producto`, {
      method: 'POST',
      body: new URLSearchParams({
	    ...product
      }),
      headers: {
	    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'auth': token
      }
    });

    product.valor = valor.valor;

    let jsonRes = await res.json();
    
    if(!jsonRes.ok) {
        Swal.fire({
            title: jsonRes.mensaje,
            text: JSON.stringify(jsonRes.error),
            onClose: ()=>Swal.close()
        });
        return {};
    }
    else {
        await addPrice({
            precio: {
                valor: valor.valor,
                id_producto: jsonRes.producto.__id
            },
            token
        })
    }

    return jsonRes;
}


export const addPrice = async({precio, token})=>{

    const res = await fetch(`http://localhost:8500/producto/precio`, {
      method: 'POST',
      body: new URLSearchParams({
	    ...precio
      }),
      headers: {
	    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'auth': token
      }
    });

    const jsonRes = await res.json();
    
    if(!jsonRes.ok) {
        Swal.fire({
            title: jsonRes.mensaje,
            text: JSON.stringify(jsonRes.error),
            onClose: ()=>Swal.close()
        });
        return;
    }
    else {
        Swal.fire({
            title: "Operación exitosa",
            text: jsonRes.mensaje,
            onClose: ()=>Swal.close()
        });
    }

    return jsonRes;
}

