import React, { useState, useEffect } from 'react'
import Sidebar from '../components/ui-components/Sidebar'
import Navbar from '../components/ui-components/Navbar'
import { useParams } from 'react-router-dom'
import GetAllProducts from '../components/functional-components/GetAllProducts'
import ProductListing from '../components/ui-components/ProductListing'

function Products() {

    const params = useParams();
    const [products, setProducts] = useState([]);
    const authId = params.authId;
    const subCategory = "null";
    const category = "null";

    const token = localStorage.getItem(authId);

    useEffect(() => {
        const fetchProducts = async function() {
        let response = await GetAllProducts(authId, category, subCategory);
        setProducts(response)
        };
        fetchProducts();
    }, [authId, category, subCategory]);

  return (
    <div>
      <div className="flex font-serif">
            <div className="flex-none max-md:hidden"> <Sidebar authId = {params.authId} /> </div>
            <div className="grow">
               <Navbar authId = {params.authId} />
               <div className='bg-slate-200 space-y-5 p-5'>
                <div className='flex justify-end'>
                <button className='border border-slate-400 rounded-2xl px-3 py-2 bg-blue-100 cursor-pointer hover:bg-slate-500 hover:text-white'>+ add Product</button>
                </div>
                <div className='border border-slate-400 rounded-2xl p-5 space-y-5 bg-white'>
                    <div className=''>
                        <h1 className='text-xl'>All Products</h1>
                        <ProductListing productsList = {products} />
                    </div>
                </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Products
