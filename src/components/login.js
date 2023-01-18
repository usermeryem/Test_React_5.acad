import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Login(){
  let [user, setUser]=useState({Email:'', Pass:''})
  let [validation, setValidation]=useState({Email:'', Pass:''})
  let [users, setUsers]=useState()
  useEffect(()=>{
    axios.get(' http://localhost:3000/users')
    .then((response)=>{setUsers(response.data)})
  }, [])  
  function handleChange(e){
    const {name, value}=e.target;
    setUser({...user, [name]:value})
  }
  const handleSubmit= (e)=>{
    e.preventDefault();
    let errors={Email:'', Pass:''};
    let formValid=true;
    if(user.Email===''){
      errors.Email='This field is required';
      formValid=false;
    } else if (users.map(t=>t.Email).indexOf(user.Email)===-1){
      errors.Email='User Does not Exist';
      formValid=false;
    } else if(!user.Email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/)){
      errors.Email='Please ingress a valid email address!';
      formValid=false;}
    if (user.Pass===""){
      errors.Pass='This field is required';
      formValid=false;
    } else if (users.map(t=>t.Email).indexOf(user.Email)!==users.map(t=>t.Pass).indexOf(user.Pass)){
      errors.Pass='Wrong Password';
      formValid=false;
    }
    setValidation(errors);
    if (formValid){
      window.location.href='/listProduct'
    }
  }
  return(
    <div className='container'>
      <div className="row">
        <h2 className="col-8 offset-3 text-success">Login</h2>
      </div>
      <div className="row">
       <form className="col-8 offset-3" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="a" className="form-label">Email</label>
          <input onChange={handleChange} type='email' name='Email' id='a' placeholder="Email@gmail.com" className="form-control"/>
          <p className="text-danger">{validation.Email}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="b" className="form-label">Password</label>
          <input onChange={handleChange} type='password' name='Pass' id='b' placeholder="********" className="form-control"/>
          <p className="text-danger">{validation.Pass}</p>
        </div>
        <div className="d-flex justify-content-center">
         <button type="submit" className="btn btn-success ">Login</button>
        </div>
        </form>
        </div>
    </div>
  )
}
export default Login