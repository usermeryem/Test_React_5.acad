import axios from 'axios';
import React, {useState} from 'react'
function AddProduct (){
  let [product, setProduct]=useState({P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null}) 
  let [validation, setValidation]=useState({P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null})
  const handleChange=(e)=>{
    const {name, value}= e.target;
    setProduct({...product, [name]: value})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    let errors={P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null};
    let formValid=true;
    if (product.P_Name===''){
      errors.P_Name='Field Required (*)';
      formValid=false;
    }
    if (product.P_Descrip===''){
      errors.P_Descrip='Field Required (*)';
      formValid=false;
    }
    if (product.P_Price===null){
      errors.P_Price='Field Required (*)';
      formValid=false;
    }
    if (product.P_Quant===null){
      errors.P_Quant='Field Required (*)';
      formValid=false;
    }
    setValidation(errors);
    if (formValid){
      await axios.post(' http://localhost:3000/products', product);
      setProduct({P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null});
      window.location.href='/listProduct'
    }
  }
  return(
    <div className='container'>
      <div className='row'>
        <h2 className='col-8 offset-3 text-success'>Add A New Product</h2>
      </div>
      <div className='row'>
        <form className="col-8 offset-3" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="a" className="form-label">Product Name</label>
          <input type='text' name='P_Name' onChange={handleChange} id='a'placeholder="Mop" className="form-control"/>
          <p className="text-danger">{validation.P_Name}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="b" className="form-label">Product Description</label>
          <input type='text' name='P_Descrip' onChange={handleChange} id='b'placeholder="Easy to Use" className="form-control"/>
          <p className="text-danger">{validation.P_Descrip}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="c" className="form-label">Price</label>
          <input type='number' onChange={handleChange} id='c' name='P_Price' className="form-control"/>
          <p className="text-danger">{validation.P_Price}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="d" className="form-label">Quantity</label>
          <input type='number' onChange={handleChange}  name='P_Quant' id='d' className="form-control"/>
          <p className="text-danger">{validation.P_Quant}</p>
        </div>
        <div className="d-flex justify-content-center">
         <button type="submit" className="btn btn-success ">Register</button>
        </div>
        </form>
      </div>
    </div>
  )
}
export default AddProduct