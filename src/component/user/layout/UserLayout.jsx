import React, { useEffect } from 'react'
import UserHeader from '../includes/header'
import UserFooter from '../includes/footer'

function UserLayout ({ children, user }) {
  return (
    <>
      <UserHeader user={user} />
      <div class='page-wrapper'>
        <main>{children}</main>
      </div>
      <UserFooter />
    </>
  )
}

export default UserLayout
