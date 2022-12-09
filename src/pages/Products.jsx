import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [viewProducts, setViewProducts] = useState([]);

    useEffect(() => {
      
        axios.get('http://localhost:5000/product/get').then((res)=>{
                setViewProducts(res.data.data)
                console.log(res.data)
        }).catch((err)=>{
               console.error(err)
        });
         
       
    }, []);

 

    return(
        <>
        <div className='container'>
            <h1>Our Products</h1>
                <table class='table'>
                    <thead>
                        <th scope='col'>Product Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Add To cart</th>
                    </thead>

                    <tbody>
                        {viewProducts.length > 0 ? (
                            viewProducts.map((product,index) => (
                                <tr key={index}>
                                   <td>{product.name}</td> 
                                   <td>{product.description}</td> 
                                   <td>{product.qty}</td> 
                                   <td>{product.price}</td> 
                                   <td>
                                        <a className="btn btn-warning" href='/products'>
                                            <i className="far fa-mark"></i>Add To cart
                                        </a>
                                    </td>
                                </tr>
                            )
                            )
                            ):(
                                <tr>
                                <td colSpan={3} style={{ fontWeight: '300' }}>
                                    No files found. Please add some.
                                </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </div>
        </>
    )
}

export default Products