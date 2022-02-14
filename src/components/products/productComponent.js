import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetching } from '../../redux/actions/products';
import ProductCard from './ProductCard';

const ProductList = ({customProd})=>{
    
    const {products, isLoading} = useSelector(state=>state.prod);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( startFetching() );
    }, []);


    if(isLoading && !customProd) {
        return <h1>Loading...</h1>;
    }

    if(!customProd && products?.length === 0) {
        return <center><h2>No hay productos</h2></center>
    }

    return (
        <div className="product-list">
            {
                (customProd || products).map((product, index)=>{
                    return <div
                        key={product["__id"]}
                    >
                        <ProductCard 
                            prod={product} 
                            key={index + product['__id']}
                        />
                    </div>
                })
            }
        </div>
    );
}

export default ProductList;