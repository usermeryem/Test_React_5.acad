import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import AddProduct from './components/addProduct';
import ListProduct from './components/listProduct';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/addproduct' element={<AddProduct/>}></Route>
      <Route path='/listproduct' element={<ListProduct/>}></Route>
    </Routes>    
    </BrowserRouter>
  );
}

export default App;
