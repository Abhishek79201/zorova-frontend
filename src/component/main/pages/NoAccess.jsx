import React from 'react'



function NoAccess({message}) {
  return (
    <div>

      <div className='container d-flex justify-content-center align-items-center py-3'>
      <img className='m-auto' height={300} src="../assets/image/icons/error.png"  alt='No Access'/>
      
      </div>
      <div className='container d-flex justify-content-center align-items-center'>
      {message?<p className='m-auto h4 text-danger'>{message}</p>:<p className='m-auto h4 text-danger'>You don't have access to this section or Sign In</p>}
      </div>
    </div>
  )
}

export default NoAccess
