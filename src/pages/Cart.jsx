import React from 'react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import UpdateCartItem from './UpdateCartItem';
import { Modal } from "react-bootstrap";

const Cart = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cartItems, setCartItems] = useState([]);
    const [cartItem, setCartItem] = useState({});

    const [total, setTotal] = useState(0);
    const [netTax, setNetTax] = useState(0);
    const [delivery, setDelivery] = useState(500);
    const [cusName, setCusName] = useState();
    const [address, setAddress] = useState();
    const [mobile, setMobile] = useState();

    //Place Order Function
    function addOrder(e){
        e.preventDefault();

        const newOrder = {
            total:total,
            netTax:netTax,
            delivery:delivery,
            value:total+netTax+delivery,
            cusName:cusName,
            address:address,
            mobile:mobile
        }

        console.log("data : ", newOrder)
        axios.post('http://localhost:5000/order/add',newOrder).then(()=>{
            alert("Order Placed Successfully");
            setTotal("");
            setNetTax("");
            setDelivery("");
            setCusName("");
            setAddress("");
            setMobile("");
        }).catch((err)=>{
            alert(err)
        })
    }

    useImperativeHandle(ref, () => ({
        callpresentationList() {
            getCart().then()
        }
    }));

    useEffect(() => {
        getCart();
    }, []);

    //Retrieve the Cart Function
    const getCart = async () => {
        await axios.get("http://localhost:5000/cart/get")
          .then((res) => {
            console.log(res.data.data);
            setCartItems(res.data.data);

            let tot=0;
            res.data.data.forEach(element=>{
                tot += (parseFloat(element.totalPrice)*parseInt(element.amount))
            });
            setTotal(tot);
            console.log({tot});

            let tax=0;
            res.data.data.forEach(element=>{
                tax += (parseFloat(element.totalPrice)*parseInt(element.amount)*(1.23/100))
            });
            setNetTax(tax);
            console.log({tax});

          }).catch((err) => {
            console.log(err);
          });
      }

    //Delete Items in the Cart by id Function
    const deleteCartItem = async (id) => {
        await axios.delete("http://localhost:5000/cart/delete/" + id)
          .then((res) => {
            alert("Item Deleted Successfully");
            console.log(res.data);
            getCart();
          }).catch((err) => {
            console.log(err);
            alert("Item Not Deleted");
          });
      }

      //Delete all the Items in the cart
      const deleteAll = async () => {
        await axios.delete("http://localhost:5000/cart/delete")
          .then((res) => {
            alert("Cart Deleted Successfully");
            console.log(res.data);
            getCart();
          }).catch((err) => {
            console.log(err);
            alert("Cart Not Deleted");
          });
      }

      async function showModal(event, cartItems) {
        event.preventDefault();
        setCartItem(cartItems);
        handleShow();
    }

      async function hideModal() {
        handleClose();
        setCartItem({});
        getCart().then();
    }
      
    return(
        <>
        <div className='container'>
            <h1>Shopping Cart</h1>
                <table class='table'>
                    <thead>
                        <th scope='col'>Item Name</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Item Price</th>
                    </thead>

                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((cart,index) => (
                                <tr key={index}>
                                   <td>{cart.name}</td> 
                                   <td>{cart.amount}</td> 
                                   <td>{cart.totalPrice}</td> 
                                   <td>
                                        <button className="btn btn-warning" onClick={(e) => showModal(e, cart)}>
                                                <i className="las la-edit" />Edit
                                        </button>
                                        <button className='btn btn-danger' onClick={() => { deleteCartItem(cart._id) }}>Delete</button>
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
                <button className='btn btn-danger' onClick={deleteAll}>Delete All the Items</button>
        </div>

        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateCartItem cartItem={cartItem} hideModal={hideModal}/>
                </Modal.Body>
            </Modal>
        </div> 

        <div>
        <h1>Cart Summery</h1>   
        <div>
        <form onSubmit={addOrder}>
        <div className="form-outline mb-4">
            <label for='total'>Price</label><br/>
            <input type="text" className="form-control" id="total" value={total} readOnly
            onChange={(e)=>{
              setTotal(e.target.value);
            }}/>
        </div>
        
        <div className="form-outline mb-4">
            <label for='netTax'>Tax</label><br/>
            <input type="text" className="form-control" id="netTax" value={netTax} readOnly
            />
        </div>

        <div className="form-outline mb-4">
            <label for='delivery'>Delivery Charges</label><br/>
            <input type="text" className="form-control" id="delivery" value={delivery} readOnly
            />
            
        </div>
  
        <div className="form-outline mb-4">
            <label for='value'>Total Price</label><br/>
            <input type="text" className="form-control" id="value" value={total+netTax+delivery} readOnly
             />
        </div>

        <div className="form-outline mb-4">
            <label for='cusName'>Name</label><br/>
            <input type="text" className="form-control" id="cusName" 
            onChange={(e)=>{
              setCusName(e.target.value);
            }} />
        </div>

        <div className="form-outline mb-4">
            <label for='address'>Address</label><br/>
            <input type="text" className="form-control" id="address" 
            onChange={(e)=>{
              setAddress(e.target.value);
            }} />
        </div>

        <div className="form-outline mb-4">
            <label for='mobile'>Mobile Number</label><br/>
            <input type="number" className="form-control" id="mobile" 
            onChange={(e)=>{
              setMobile(e.target.value);
            }} />
        </div>
  
        <div>
        <button type="submit" class="btn btn-primary">Order Now</button>
        </div>
        </form>
        </div>
        </div>
        </>
    )
});

export default Cart