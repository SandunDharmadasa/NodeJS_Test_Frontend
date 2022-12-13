import React from 'react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { Modal } from "react-bootstrap";
import AddToCart from './AddToCart';

const Products = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});


    useImperativeHandle(ref, () => ({
        callpresentationList() {
            getProduct().then()
        }
    }));

    useEffect(() => {
        getProduct().then();
    }, []);

    //Get all the Products function
    const getProduct = async () => {
        await axios.get("http://localhost:5000/product/get")
          .then((res) => {
            console.log(res.data.data);
            setProducts(res.data.data);
          }).catch((err) => {
            console.log(err);
          });
      }

      async function showModal(event, products) {
        event.preventDefault();
        setProduct(products);
        handleShow();
    }

      async function hideModal() {
        handleClose();
        setProduct({});
        getProduct().then();
        
    }

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
                        
                        {products.length > 0 ? (
                            products.map((product,index) => (
                                <tr key={index}>
                                   <td>{product.name}</td> 
                                   <td>{product.description}</td> 
                                   <td>{product.qty}</td> 
                                   <td>{product.price}</td> 
                                   <td>
                                   <button className="btn btn-warning" onClick={(e) => showModal(e, product)}>
                                                <i className="las la-edit" />Add To Cart
                                            </button>
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
        <div>
                <a className="button" href='/cart'>
                <i className="far fa-mark"></i>View Cart
                </a>
                </div>
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add To Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddToCart product={product} hideModal={hideModal}/>
                </Modal.Body>
            </Modal>
        </div> 
        
        </>
    )
});

export default Products