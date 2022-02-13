import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCustomForm from '../../hooks/useCustomForm';
import { addProduct } from '../../redux/actions/products';
import ProdHeaderComponent from '../products/ProdHeader';

const AdminScreen = ()=>{

    const [values, handleChange, handleReset] = useCustomForm({
        nombre: "",
        descripcion: "",
        stock: 0,
        valor: 0.0
    });

    const {token} = useSelector(state=>state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        addProduct({product: values, token}).then((res)=>{
            if(res.ok){
                handleReset();
            }
        });
    }

    return (
        <div className='admin-pane'>
            <ProdHeaderComponent />
            <h1>Agregar productos</h1>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <label forHTML="nombre">Nombre</label>
                    <input 
                        onChange={handleChange}
                        value={values.nombre}
                        type="text" 
                        name="nombre" 
                        id="nombre"
                        placeholder='Nombre del producto'
                        required={true}
                    />
                    <label forHTML="descripcion">Descripción</label>
                    <textarea
                        onChange={handleChange}
                        value={values.descripcion}
                        name="descripcion"
                        id="descripcion"
                        placeholder='Descripción'
                    />
                    <div className="extra-input">
                        <label forHTML="stock">Stock: </label>
                        <input 
                            onChange={handleChange}
                            value={values.stock}
                            type="number"
                            name="stock"
                            id="stock"
                            placeholder='0'
                            min={0}
                            required={true}
                        />
                        <label forHTML="valor">Precio: </label>
                        <input 
                            onChange={handleChange}
                            value={values.valor}
                            type="number"
                            step={"any"}
                            name="valor"
                            id="valor"
                            placeholder='0'
                            min={0.0}
                            required={true}
                        />
                        
                    </div>
                    <label forHTML="imagen_url">Imágen: </label>
                    <input 
                        type="file"
                        name="imagen_url"
                    />
                    <input type="submit" value="Guardar Producto" />                </form>
            </div>
        </div>
    );
}

export default AdminScreen;