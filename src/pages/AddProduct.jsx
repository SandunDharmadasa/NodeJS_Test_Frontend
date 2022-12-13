import React, {useState} from 'react'
import axios from 'axios';

function AddProduct() {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [qty,setQty] = useState("");
    const [price,setPrice] = useState("");

    //Insert Products Function
    function addProduct(e){
        e.preventDefault();

        const newProduct = {
            name:name,
            description:description,
            qty:qty,
            price:price
        }

        axios.post('http://localhost:5000/product/add',newProduct).then(()=>{
            alert("Product Added Successfully");
            setName("");
            setDescription("");
            setQty("");
            setPrice("");
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <>
        <div className='container'>
          <div>
            <h1>Add Product</h1>
        </div>
        <form onSubmit={addProduct}>
        <div className="form-outline mb-4">
            <label for='name'>Product Name</label><br/>
            <input type="text" className="form-control" id="name" 
            onChange={(e)=>{
              setName(e.target.value);
            }}/>
        </div>
        
        <div className="form-outline mb-4">
            <label for='description'>Description</label><br/>
            <input type="text" className="form-control" id="description"
            onChange={(e)=>{
              setDescription(e.target.value);
            }}/>
        </div>

        <div className="form-outline mb-4">
            <label for='qty'>Quantity</label><br/>
            <input type="number" className="form-control" id="qty" min={1}
            onChange={(e)=>{
              setQty(e.target.value);
            }} />   
        </div>
  
        <div className="form-outline mb-4">
            <label for='price'>Price</label><br/>
            <input type="number" className="form-control" id="price"
            onChange={(e)=>{
              setPrice(e.target.value);
            }} /> 
        </div>
  
        <div>
        <button type="submit" class="btn btn-primary">Add Product</button>
        </div>

        <div>
        <a className="button" href='/products'>
        <i className="far fa-mark"></i>View Products
        </a>
        </div>
        
    

        </form>
      </div>
        </>
    )
}

export default AddProduct