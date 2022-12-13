import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

const AddToCart = ({product,hideModal}) => {

    if(!product)
    product = {};
   
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {

        if(product._id) {
            setName(product.name);
            setAmount(product.qty);
            setTotalPrice(product.price);
    
            validateForm();
        }
    }, []);

    function validateForm() {
        if(product.name)
            return true;
        return name.length > 0 && amount.length > 0 && totalPrice.length > 0;
    }

    //Add To Cart Function
    async function handleSubmit(event) {
        event.preventDefault();

            await axios.post('http://localhost:5000/cart/add', {
                name: name,
                amount: amount,
                totalPrice: totalPrice,
            });
            hideModal();
            alert("Item Added to the Cart Successfully");
    };

    return (
        <div className="container">
            <div>
                <form className='mt-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label className="form-label">Item Name</label>
                        <input className="form-control"
                               type="text"
                               value={name}
                               readOnly
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input className="form-control"
                               type="number"
                               value={amount}
                               max={product.qty}
                               min={1}
                               onChange={(e) => setAmount(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Total</label>
                        <input className="form-control" 
                               type="text"
                               value={totalPrice}
                               readOnly
                               onChange={(e) => setTotalPrice(e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={!validateForm()}>
                        {product.name ? 'Add To Cart' : 'Update' }
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default AddToCart;