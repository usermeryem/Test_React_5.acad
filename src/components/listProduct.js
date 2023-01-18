import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import Modal from 'react-modal'
function ListProduct (){
  let [products, setProducts]=useState();
  function getProducts (){
    axios.get('http://localhost:3000/products')
    .then((response)=>{setProducts(response.data)})
  }
  useEffect(getProducts, [])
  let handleDelete= async(p)=>{
    await axios.delete(`http://localhost:3000/products/${p}`);
    getProducts();
  }
  let [productUpdate, setProductUpdate]=useState({P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null});
  let [validation, setValidation]=useState({P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null})
  const [modalIsOpen, setIsOpen] =useState(false)
  Modal.setAppElement('*')
  function openModal(i) {setIsOpen(true);
    axios.get(`http://localhost:3000/products/${i}`)
    .then((response)=>{setProductUpdate(response.data)});}
  const customStyles = {content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-100%',  transform: 'translate(-50%, -50%)'}}; 
 
  function closeModal() {setIsOpen(false);}  
  const handleChange=(e)=>{
    const {name, value}= e.target;
    setProductUpdate({...productUpdate, [name]: value})
  }
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    let errors={P_Name:'', P_Descrip:'', P_Price:null, P_Quant:null};
    let formValid=true;
    if (productUpdate.P_Name===''){
      errors.P_Name='Field Required (*)';
      formValid=false;
    }
    if (productUpdate.P_Descrip===''){
      errors.P_Descrip='Field Required (*)';
      formValid=false;
    }
    if (productUpdate.P_Price===null){
      errors.P_Price='Field Required (*)';
      formValid=false;
    }
    if (productUpdate.P_Quant===null){
      errors.P_Quant='Field Required (*)';
      formValid=false;
    }
    setValidation(errors);
    if (formValid){
      await axios.put(`http://localhost:3000/products/${productUpdate.id}`, productUpdate);
      closeModal();
      getProducts();    
    }
  }
 
  return(
    <Fragment>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">      
      <div className='container'>        
       <div className='row'>        
        <button className='btn btn-danger col-3 text-light' onClick={closeModal}>Close</button>
       </div>
      <div className='row'>
        <form className="col-8 offset-3" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="a" className="form-label text-success">Product Name</label>
          <input type='text' name='P_Name' onChange={handleChange} value={productUpdate.P_Name} id='a'placeholder="Mop" className="form-control"/>
          <p className="text-danger">{validation.P_Name}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="b" className="form-label text-success">Product Description</label>
          <input type='text' name='P_Descrip' onChange={handleChange} value={productUpdate.P_Descrip} id='b'placeholder="Easy to Use" className="form-control"/>
          <p className="text-danger">{validation.P_Descrip}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="c" className="form-label text-success">Price</label>
          <input type='number'  id='c' name='P_Price' onChange={handleChange} value={productUpdate.P_Price}className="form-control"/>
          <p className="text-danger">{validation.P_Price}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="d" className="form-label text-success">Quantity</label>
          <input type='number' onChange={handleChange}  value={productUpdate.P_Quant}  name='P_Quant' id='d' className="form-control"/>
          <p className="text-danger">{validation.P_Quant}</p>
        </div>
        <div className="d-flex justify-content-center">
         <button type="submit" className="btn btn-success ">Update</button>
        </div>
        </form>
      </div>
      </div>
      </Modal>
      <div>
      <table className='table table-light table-bordered table-hover m-md-5'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Description</th>
              <th scope='col'>Price</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length>0?
            (products.map((product)=>{
              return(
                <tr key={product.id}>
                  <td>{product.P_Name}</td>
                  <td>{product.P_Descrip}</td>
                  <td>{product.P_Price}</td>
                  <td>{product.P_Quant}</td>                 
                  <td> 
                   <button onClick={()=>{openModal(product.id)}} className='btn btn-success btn-sm me-2' >Modify</button>
                   <button onClick={()=>{handleDelete(product.id)}} className='btn btn-danger btn-sm ms-2' >Delete</button>
                  </td>
                </tr>)}))
                :(<tr className='text-center text-danger'><td colSpan='5'>There are No products!</td></tr>)}
          </tbody>
        </table>
        <button className='btn btn-success d-flex ms-5' onClick={()=>window.location.href='/addProduct'}>Add A new Product</button>
      </div>
    </Fragment>
  )
}
export default ListProduct