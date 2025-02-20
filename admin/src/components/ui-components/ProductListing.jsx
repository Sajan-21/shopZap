import React, { useState, useEffect } from 'react';
import { backendURL } from '../common-things/CommonThings';

function ProductListing({ productsList }) {
    console.log(productsList);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsList);
    }, [productsList]);

    console.log(products);

    return (
        <div className='grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 py-3'>
            {products.map((product, index) => (
                <div key={index} className='border rounded-lg'>
                    <div>
                        <img src={`${backendURL}/${product.images[0]}`} alt="" className='aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8' />
                    </div>
                    <div className='p-3'>
                        <h1>{product.name}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductListing;
