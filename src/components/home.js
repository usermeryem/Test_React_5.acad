import React from 'react'
import shop from '../shop.jpg'
function Home(){
  return(
    <div className='container-fluid'>
      <div className='row'>
      <img className='col' src={shop} alt='Shop'></img>
      </div>
    </div>
  )
}
export default Home