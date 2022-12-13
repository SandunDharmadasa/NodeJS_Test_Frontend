import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

const UpdateCartItem = ({cartItem,hideModal}) => {

    if(!cartItem)
    cartItem = {};
   
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {

        if(cartItem._id) {
            setName(cartItem.name);
            setAmount(cartItem.amount);
            setTotalPrice(cartItem.totalPrice);
    
            validateForm();
        }

    }, []);

    function validateForm() {
        if(cartItem.name)
            return true;
        return name.length > 0 && amount.length > 0 && totalPrice.length > 0;
    }

    //Update Items in the Cart function
    async function handleSubmit(event) {
        event.preventDefault();

            await axios.put(`http://localhost:5000/cart/update/${cartItem?._id}`, {
                name: name,
                amount: amount,
                totalPrice: totalPrice,
               
            });
            hideModal({});
            alert("Updated the Item Successfully");
    };

    return (
        <div className="container">
            <div>
                <form className='mt-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control"
                               type="text"
                               value={name}
                               readOnly
                               />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input className="form-control"
                               type="number"
                               value={amount}
                               onChange={(e) => setAmount(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Total</label>
                        <input className="form-control" 
                               type="text"
                               value={totalPrice}
                               readOnly
                               />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={!validateForm()}>
                        {cartItem.name ? 'Update' : 'Update' }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCartItem;