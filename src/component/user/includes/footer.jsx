import React from 'react'
import { Helmet } from 'react-helmet'

export default function UserFooter () {
  return (
    <Helmet>
      <script defer async src='/user/assets/js/jquery.min.js'></script>
      <script
        defer
        async
        src='/user/assets/js/bootstrap.bundle.min.js'
      ></script>
      <script defer async src='/user/assets/js/custom.js'></script>
    </Helmet>
  )
}
