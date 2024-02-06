import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/axios'

const Home = () => {
    const [products, setProducts] = useContext(ProductContext);
    const { search } = useLocation()
    const category = decodeURIComponent(search.split("=")[1]);
    const category_item = category.trim();
    const [filteredProducts, setFilteredProducts] = useState(null);


    // local storage code ..................
    const getProductsCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category_item}`)
            setFilteredProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!filteredProducts || category_item == "undefined") setFilteredProducts(products);
        if (category_item !== "undefined") {
            getProductsCategory();
            // setFilteredProducts(products.filter((p) => p.category_item == category_item))
        }
    }, [category_item, products]);


    return (products ?
        // <>
        //     <Nav />
        //     <div className='w-[85%] p-10 pt-[5%]  flex flex-wrap overflow-x-hidden overflow-y-auto '>
        //         {filteredProducts && filteredProducts.map((p, i) =>
        //         (<Link key={p.id} to={`/details/${p.id}`} className=' mr-3 mb-3 hover:bg-blue-300 card p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center'>
        //             <div className='w-full  hover:scale-110 h-[80%] bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${p.image})` }}>
        //             </div>
        //             <h1 className='text-xl pt-3 hover:text-xl'>`{p.title}`</h1>
        //         </Link>)
        //         )}
        //     </div>
        // </>
        <>
            <Nav />
            <div className='w-full p-5 sm:p-10 lg:w-[85%] lg:m-auto lg:pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'>
                {filteredProducts && filteredProducts.map((p, i) => (
                    <Link key={p.id} to={`/details/${p.id}`} className='mb-3 sm:mb-0 sm:mr-3 hover:bg-blue-300 card p-3 border shadow rounded w-full sm:w-[48%] md:w-[32%] lg:w-[18%] h-[30vh] flex flex-col justify-center items-center'>
                        <div className='w-full h-[80%] bg-contain bg-no-repeat bg-center overflow-hidden' style={{ backgroundImage: `url(${p.image})` }}></div>
                        <h1 className='text-xl sm:text-1xl lg:text-xl xl:text-1xl pt-3 hover:text-xl overflow-hidden max-w-[100%] whitespace-nowrap overflow-ellipsis'>{p.title}</h1>
                    </Link>
                ))}
            </div>
        </>
        : <Loading />
    )
}

export default Home