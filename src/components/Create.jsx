import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

const Create = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // for mock API ...............................................................
    const AddProductHandler = async (e) => {
        e.preventDefault();

        if (
            !image ||
            !title ||
            !price ||
            !category ||
            !description ||
            image.trim().length < 5 ||
            title.trim().length < 5 ||
            price.trim().length < 1 ||
            category.trim().length < 5 ||
            description.trim().length < 5
        ) {
            alert('All Fields must be filled with a minimum of 5 characters');
            return;
        }

        const product = {
            id: nanoid(),
            title,
            image,
            price,
            category,
            description,
        };

        try {
            // Use the mock API endpoint to add a product
            await axios.post('https://65be3178dcfcce42a6f203a3.mockapi.io/crudapp3-api/', product);
            setProducts([...products, product]);
            toast.success('Product Added Successfully !!');
            navigate('/');
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <>
            <form onSubmit={AddProductHandler} className='flex flex-col items-center p-[5%] bg-red-100 w-screen h-screen' action="">
                <h1 className='mb-5 w-1/2 text-3xl '>Add New Product</h1>
                <input type="url" placeholder='Image-Link' className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e) => setImage(e.target.value)} value={image} />
                <input type="text" placeholder='title' className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e) => setTitle(e.target.value)} value={title} />
                <div className='flex w-1/2 justify-between'>
                    <input type="number" placeholder='Enter Price' className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e) => setPrice(e.target.value)} value={price} />
                    <input type="text" placeholder='Category' className=' w-[48%] text-2xl bg-zinc-100 rounded p-3  mb-3' onChange={(e) => setCategory(e.target.value)} value={category} />
                </div>
                <textarea rows={10} className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Enter Text here' />
                <div className='w-1/2'>
                    <button type='submit' className='py-2 px-5 border rounded border-green-400 text-green-400 text-4xl'>Add to Change</button>
                </div>
            </form>
        </>
    );
};

export default Create;
