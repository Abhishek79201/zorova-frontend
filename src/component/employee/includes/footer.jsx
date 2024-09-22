import React from 'react'
import { Helmet } from 'react-helmet'

export default function EmployeeFooter () {
  return (
    <Helmet>
      {/* 
<!-- *************
************ JavaScript Files *************
************* --> */}
      {/* <!-- Required jQuery first, then Bootstrap Bundle JS --> */}
      <script defer async src='/employee/assets/js/jquery.min.js'></script>
      <script
        defer
        async
        src='/employee/assets/js/bootstrap.bundle.min.js'
      ></script>
      {/* <!-- Custom JS files --> */}
      <script></script>
    </Helmet>
  )
}
