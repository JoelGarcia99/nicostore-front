import React from 'react';

const ProductCard = ({prod})=>{

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
            <small className="stock">
                {`${prod['stock'] || '0'}`} en stock
            </small>
            <div className='btns'>
                <button>Ver detalles</button>
                <button>++</button>
            </div>
        </div>
    );

}

export default ProductCard;