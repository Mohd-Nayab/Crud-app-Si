import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom'
const Nav = () => {
    const [products] = useContext(ProductContext)
    // let distinct_category = products && products.reduce((acc, cv) => [...acc, cv.category], [])
    // distinct_category = [...new Set(distinct_category)]
    const [distinct_category, setDistinctCategory] = useState([]);

    const color = () => {
        return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.7
        )`
    }

    useEffect(() => {
        // Update distinct_category when products change
        let categories = products.reduce((acc, cv) => [...acc, cv.category], []);
        categories = [...new Set(categories)];
        setDistinctCategory(categories);
    }, [products]);

    return (
        <nav className='w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5 	overflow-y-hidden '>
            <a className='py-2 px-5 border rounded text-2xl hover:text-zinc-50 hover:bg-blue-400 border-blue-400 text-blue-400' href="/create"> Add New Product</a>
            <hr className=' my-3 w-[80%]' />
            <h1 className='text-3xl w-[80%] mb-4 '>Category Filter</h1>
            <div className=' w-[80%]'>

                {distinct_category.map((c, i) => (
                    <Link key={c} to={`/?category = ${c}`} className='mb-4 flex hover:scale-125 hover:bg-red-300 hover:text-zinc-50  text-xl items-center'>
                        <span style={{ backgroundColor: color() }} className='block w-[15px] ml-2 h-[15px] mr-2 bg-blue-300 rounded-full'></span>
                        {c}
                    </Link>
                ))}
            </div>
        </nav >
    )
}

export default Nav