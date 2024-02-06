import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios';

const Edit = () => {
    const [products, setproducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setproduct] = useState({
        title: "",
        image: "",
        description: "",
        category: "",
        price: "",
    });

    const changeHandler = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const productToEdit = products.find((p) => p.id === id);
        setproduct(productToEdit || {
            title: "",
            image: "",
            description: "",
            category: "",
            price: "",
        });
    }, [id, products]);

    const isFormValid = () => {
        return (
            product.image.trim().length >= 5 &&
            product.title.trim().length >= 5 &&
            product.price.trim().length >= 1 &&
            product.category.trim().length >= 5 &&
            product.description.trim().length >= 5
        );
    };

    const editProductHandler = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert("All Fields must be filled with a minimum of 5 characters");
            return;
        }

        try {
            await axios.put(`https://65be3178dcfcce42a6f203a3.mockapi.io/crudapp3-api
            /${id}`, product);
            const updatedProducts = products.map((p) => (p.id === id ? product : p));
            setproducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            navigate("/");
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    return (
        <form onSubmit={editProductHandler} className='flex flex-col items-center p-[5%] bg-zinc-200 w-screen h-screen' action="">
            <h1 className='mb-5 w-1/2 text-3xl '>Edit Product</h1>
            <input
                type="url"
                placeholder='Image-Link'
                className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={changeHandler}
                name='image'
                value={product.image}
            />
            <input
                type="text"
                placeholder='title'
                className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={changeHandler}
                name='title'
                value={product.title}
            />
            <div className='flex w-1/2 justify-between'>
                <input
                    type="number"
                    placeholder='Enter Price'
                    className='text-2xl w-[48%] bg-zinc-100 rounded p-3  mb-3'
                    onChange={changeHandler}
                    name='price'
                    value={product.price}
                />
                <input
                    type="text"
                    placeholder='Category'
                    className=' w-[48%] text-2xl bg-zinc-100 rounded p-3  mb-3'
                    onChange={changeHandler}
                    name='category'
                    value={product.category}
                />
            </div>
            <textarea
                rows={10}
                className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={changeHandler}
                name='description'
                value={product.description}
                placeholder='Enter Product Details here'
            />
            <div className='w-1/2'>
                <button className='py-2 px-5 border rounded border-green-400 hover:scale-110 text-green-400 text-4xl'>Click to Edit</button>
            </div>
        </form>
    );
};

export default Edit;
