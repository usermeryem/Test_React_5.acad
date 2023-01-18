import React from 'react'
import {Link, NavLink} from 'react-router-dom'
function Navbar (){
  return(
    <nav className='navbar navbar-expand-lg bg-light'> 
    <div className='container-fluid'>
      <Link className='navbar-brand' to='/'>Online Shop</Link>
      <ul className='navbar-nav'>
        <li className='nav-item'>
         <Link className='nav-link' to='/listProduct'>Products List</Link>
        </li>
        <li className='nav-item'>
         <NavLink className='nav-link' to='/addProduct'>Add a new Product</NavLink>
        </li>
        <li className='nav-item dropdown'>
          <button className='btn dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>Login/Register</button>
          <ul className='dropdown-menu'>
            <li><Link className='dropdown-item' to='/login'>Login</Link></li>
            <li><Link className='dropdown-item' to='/register'>Register</Link></li>
          </ul>
        </li>
      </ul>
    </div>
    </nav>
  )
}
export default Navbar