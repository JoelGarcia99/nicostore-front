import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faCartPlus
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { addItemCarrito } from '../../redux/actions/carrito';
import Swal from 'sweetalert2';

const ProductCard = ({prod, showCart=true})=>{

    const dispatch = useDispatch();

    const handleClick = ()=>{
        dispatch( addItemCarrito(prod) );
    }

    return (
        <div className="product">
            <span className="name">
                {prod['nombre']}
            </span>
            <div className="image">
               <img
                src={
                    prod['imagen_url'] || 
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimage.net%2Fwp-content%2Fuploads%2F2018%2F06%2Fno-image-png-2.png&f=1&nofb=1'
                }
               />
            </div>
            <span className="price">
                A tan solo <b>{`\$${prod['valor'] || '0.00'}`}</b>
            </span>
            {/* <small className="stock">
                {`${prod['stock'] || '0'}`} en stock
            </small> */}
            <div className='btns'>
                <button
                    onClick={()=>{
                        Swal.fire({
                            title: "Detalles del producto "+prod.nombre,
                            text: prod.descripcion,
                            onClose: ()=>Swal.close()
                          });
                    }}
                >Ver detalles</button>
                {
                    showCart &&
                    <a
                        onClick={handleClick}            
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                    </a>
                }
            </div>
        </div>
    );

}

export default ProductCard;