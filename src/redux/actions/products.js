import Swal from "sweetalert2";
import types from "../types";


export const startFetching = (from = 0, n=100) => {
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

export const updateProduct = async({product, token})=>{

    let prod = {...product};

    const valor = {
        valor: prod.valor,
    };
    delete prod.__id;
    delete prod.undefined;
    delete prod.valor;
    delete prod.id_precio;
    delete prod.id_producto;

    // tratando imagen
    let reader = new FormData();

    for(let key in prod) {
        if(valor === 'imagen') continue;
        reader.append(key, prod[key]);
    }

    if(prod.imagen && prod.imagen.files?.length > 0) {
        reader.append('imagen', prod.imagen.files[0]);
    }

    const res = await fetch(`http://localhost:8500/producto/${product.__id}`, {
      method: 'PUT',
      body: reader,
      headers: {
        'auth': token
      }
    });

    // recuperando valores en caso de error
    prod.valor = valor.valor;

    //TODO: purgar producto en caso de error

    let jsonRes = await res.json();
    
    if(!jsonRes.ok) {
        Swal.fire({
            title: jsonRes.mensaje,
            text: jsonRes.error.error,
            onClose: ()=>Swal.close()
        });
        return {};
    }
    else {
        let res = await addPrice({
            precio: {
                valor: valor.valor,
                id_producto: product.__id
            },
            token
        })

        if(res.ok) {

        }
    }

    return jsonRes;
}

export const addProduct = async({product, token})=>{

    let prod = {...product};

    const valor = {
        valor: prod.valor,
    };
    delete prod.__id;
    delete prod.imagen_url;
    delete prod.undefined;
    delete prod.valor;
    delete prod.id_precio;
    delete prod.id_producto;

    // tratando imagen
    let reader = new FormData();

    for(let key in prod) {
        if(valor === 'imagen') continue;
        reader.append(key, prod[key]);
    }

    if(prod.imagen && prod.imagen.files?.length > 0) {
        reader.append('imagen', prod.imagen.files[0]);
    }

    const res = await fetch(`http://localhost:8500/producto`, {
      method: 'POST',
      body: reader,
      headers: {
        'auth': token
      }
    });

    // recuperando valores en caso de error
    prod.valor = valor.valor;

    //TODO: purgar producto en caso de error

    let jsonRes = await res.json();
    
    if(!jsonRes.ok) {
        Swal.fire({
            title: jsonRes.mensaje,
            text: jsonRes.error.error,
            onClose: ()=>Swal.close()
        });
        return {};
    }
    else {
        let res = await addPrice({
            precio: {
                valor: valor.valor,
                id_producto: jsonRes.producto.__id
            },
            token
        })

        if(res.ok) {

        }
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

