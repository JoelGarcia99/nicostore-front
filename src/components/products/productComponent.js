import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetching } from '../../redux/actions/products';
import ProductCard from './ProductCard';

const ProductList = ()=>{
    
    const {products, isLoading} = useSelector(state=>state.prod);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( startFetching() );
    }, []);


    if(isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="product-list">
            {
                products.map((product, index)=>{
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