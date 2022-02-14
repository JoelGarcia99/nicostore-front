import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faCartPlus,
  faPen
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { addItemCarrito } from '../../redux/actions/carrito';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditForm from '../admin/editForm';

const ProductCard = ({ prod, showCart=true })=>{

    const dispatch = useDispatch();
    const {user, token} = useSelector(state=>state.auth);

    
    // Add JSX support for SweetAlert2
    const MySwal = withReactContent(Swal);

    const handleClick = ()=>{
        dispatch( addItemCarrito(prod) );
    }

    const handleEdit = ()=>{
        MySwal.fire({
            title: 'Editar producto',
            html: <EditForm 
                initS={
                    {...prod}
                }
                isEditing={true}
                token={token}
            />,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: false
        });
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
                A tan solo <b>{`\$${Number(prod['valor'])?.toFixed(2) || '0.00'}`}</b>
            </span>
            {/* <small className="stock">
                {`${prod['stock'] || '0'}`} en stock
            </small> */}
            <div className='btns'>
                <button
                    onClick={()=>{
                        Swal.fire({
                            title: prod.nombre,
                            text: prod.descripcion,
                            onClose: ()=>Swal.close()
                          });
                    }}
                >Ver detalles</button>
                {
                    showCart && JSON.parse(user).es_admin === 1 &&
                    <a
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </a>
                }
                {
                    showCart &&
                    <>
                    <a
                        onClick={handleClick}            
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                    </a>
                    </>
                }
            </div>
        </div>
    );

}

export default ProductCard;