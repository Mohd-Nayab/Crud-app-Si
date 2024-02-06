import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import axios from '../utils/axios'
import Loading from './Loading'

const Details = () => {

    const navigate = useNavigate();
    const [products, setproducts] = useContext(ProductContext)
    const [product, setproduct] = useState(null)
    const { id } = useParams()
    console.log(id)

    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`/products/${id}`);
            setproduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };


    // commented out -- using local storage .....
    const getsingleProduct = async () => {
        try {
            const { data } = await axios.get(`/products/${id}`)
            setproduct(data)
        } catch (error) {
            console.log(error)
        }
    }
    const ProductDeleteHandler = (id) => {
        const FilteredProducts = products.filter(p => p.id !== id);
        setproducts(FilteredProducts);  // Update to set the state with filtered products
        localStorage.setItem("products", JSON.stringify(FilteredProducts));
        navigate("/");
    }

    useEffect(() => {
        if (!product) {
            getProductDetails();
        }
    }, [product, id]);


    return (product ?
        <div className='w-[70%] h-full m-auto py-[8%] px-[5%]  flex  '>
            <img className='mr-5 object-contain h-[80%] w-[40%]' src={product.image} alt="" />
            <div className='content w-[50%]'>
                <h1 className='text-3xl' >{product.title}</h1>
                <h2 className='text-red-300 my-5' >{product.price}</h2>
                <h2 className='text-zinc-600 mb-3' > {product.category} </h2>
                <p className='mb-5'> {product.description}</p>
                <Link to={`/edit/${product.id}`} className='mr-5 py-2 px-5 border rounded border-green-700 text-green-400'>Edit</Link>
                <button onClick={() => ProductDeleteHandler(product.id)} className='py-2 px-5 border rounded border-red-700 text-red-400' >Delete</button>
            </div>
        </div> : <Loading />
    )
}

export default Details


