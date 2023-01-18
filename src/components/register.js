import React, { useState }  from "react";
import axios from 'axios'
function Register (){
  let [user, setUser]=useState({F_name:'', L_name:'', Email:'', Pass:'', VPass:''})
  let [validation, setValidation]=useState({F_name:'', L_name:'', Email:'', Pass:'', VPass:''})
  function handleChange(e){
    const {name, value}=e.target;
    setUser({...user, [name]:value})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault()
    let formValid=true;
    let errors={F_name:'', L_name:'', Email:'', Pass:'', VPass:''};
    if (user.F_name===''){
      errors.F_name='This field is required';
      formValid=false;
    }
    if (user.L_name===''){
      errors.L_name='This field is required';
      formValid=false;
    }
    if (user.Email===''){
      errors.Email='This field is required';
      formValid=false;
    }else if(!user.Email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/)){
      errors.Email='Please ingress a valid email address!';
      formValid=false;
    }
    if (user.Pass===''){
      errors.Pass='This field is required';
      formValid=false;
    }else if(user.Pass.length<8){
      errors.Pass='Password must be longer than 8 characters';
      formValid=false;
    }
    if (user.VPass===''){
      errors.VPass='This field is required';
      formValid=false;
    }else if(user.VPass!==user.Pass){
      errors.VPass='Does not match Password';
      formValid=false;
    }
    setValidation(errors);
    if(formValid){
      await axios.post('http://localhost:3000/users', user);
      setUser({F_name:'', L_name:'', Email:'', Pass:'', VPass:''});
      window.location.href='/login'
    }
  }
  return(
    <div className="container">
      <div className="row">
        <h2 className="col-8 offset-3 text-success">Register</h2>
      </div>
      <div className="row">
       <form className="col-8 offset-3" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="a" className="form-label">First Name</label>
          <input onChange={handleChange} type='text' name='F_name' id='a'placeholder="Your First Name" className="form-control"></input>
          <p className="text-danger">{validation.F_name}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="b" className="form-label">Last Name</label>
          <input onChange={handleChange} type="text" name='L_name' id='b' placeholder="Your Last Name" className="form-control"></input>
          <p className="text-danger">{validation.L_name}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="c" className="form-label">Email</label>
          <input onChange={handleChange} type='email' name='Email' id='c' placeholder="Your Email" className="form-control"></input>
          <p className="text-danger">{validation.Email}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="d" className="form-label">Type A Password</label>
          <input onChange={handleChange} type='password' name='Pass' id='d' placeholder="********" className="form-control"></input>
          <p className="text-danger">{validation.Pass}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="e" className="form-label">Retype Password</label>
          <input onChange={handleChange} type='password' name='VPass' id='e' placeholder="********"  className="form-control"></input>
          <p className="text-danger">{validation.VPass}</p>
        </div>
        <div className="d-flex justify-content-center">
         <button type="submit" className="btn btn-success ">Register</button>
        </div>
        </form> 
      </div>
    </div>
  )
}
export default Register