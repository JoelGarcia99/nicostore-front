import React from 'react';
import Swal from 'sweetalert2';
import useCustomForm from '../../hooks/useCustomForm';
import { addProduct, updateProduct } from '../../redux/actions/products';

const EditForm = ({initS, isEditing=false, token})=>{

    const [values, handleChange, handleReset] = useCustomForm(initS || {
        nombre: "",
        descripcion: "",
        stock: 0,
        valor: 0.0,
    });


    const handleEdit = (e)=>{
        e.preventDefault();

        updateProduct({product: values, token}).then((res)=>{
            if(res.ok){
                handleReset();
                Swal.close();
                window.location.reload(true);
            }
        });
    }

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
            <div className='form'>
            <form onSubmit={isEditing? handleEdit:handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input 
                    onChange={handleChange}
                    value={values.nombre}
                    type="text" 
                    name="nombre" 
                    id="nombre"
                    placeholder='Nombre del producto'
                    required={true}
                />
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    onChange={handleChange}
                    value={values.descripcion}
                    name="descripcion"
                    id="descripcion"
                    placeholder='Descripción'
                />
                <div className="extra-input">
                    <label htmlFor="stock">Stock: </label>
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
                    <label htmlFor="valor">Precio: </label>
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
                {
                    <>
                    <label htmlFor="imagen_url">Imágen: </label>
                    <input 
                        
                        onChange={(e)=>{
                            console.log(e.target)
                            handleChange({target: {
                                name: e.target.name,
                                value: e.target
                            }});
                        }}
                        type="file"
                        name="imagen"
                    />
                    </>
                }
                <input type="submit" value="Guardar Producto" />                </form>
        </div>
        </div>
    );
}

export default EditForm;