import React, { useEffect } from 'react'
import FrontendRoutes from './component/main/frontend-routing'
import { Routes, Route, Navigate } from 'react-router-dom'
import EmployeeRoutes from './component/employee/employee-routing'
import UserRoutes from './component/user/user-routing'
import {
  isAdminAuthenticated,
  isEmployeeAuthenticated,
  isProviderAuthenticated,
  isUserAuthenticated
} from './component/utils/auth'
import LoginButton from './component/LoginButton'
import 'jquery/dist/jquery.min.js'
import ProviderRouting from './component/serviceprovider/provider-routing'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from './component/features/userSlicer'
import ScrollToTop from './component/utils/scrollToTop'
import { setLoading } from './component/features/SiteLoaderPage'
import Home from './component/Home'
import PaymentSuccess from './component/main/pages/PaymentSuccess'
import AdminRoutes from './component/admin/admin-routing'

function Loader () {
  const isLoading = useSelector(state => state.siteLoaderPage.isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

function App () {
  const user = useSelector(state => state.user.data)
  const isLoading = useSelector(state => state.siteLoaderPage.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    const timeout = setTimeout(() => {
      dispatch(setLoading(false))
    }, 3000)
    return () => clearTimeout(timeout)
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/*' element={<FrontendRoutes />} />
        <Route
          path='/admin/*'
          element={
            isAdminAuthenticated() ? <AdminRoutes /> : <Navigate to='/' />
          }
        />
        <Route
          path='/employee/*'
          element={
            isEmployeeAuthenticated() ? <EmployeeRoutes /> : <Navigate to='/' />
          }
        />
        <Route
          path='/provider/*'
          element={
            isProviderAuthenticated() ? (
              <ProviderRouting />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/user/*'
          element={isUserAuthenticated() ? <UserRoutes /> : <Navigate to='/' />}
        />
        <Route path='/home' element={<Home />} />
        <Route path='/logintesting' element={<LoginButton />} />
      </Routes>
    </>
  )
}

export default App
