import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NewOrder from './pages/newOrder'
import 'jquery/dist/jquery.min.js'
import NotFoundPage from '../404'
import ProviderLayout from './layout/ProviderLayout'
import ProviderDashboard from './pages/ProviderDashboard'
import Order from './pages/Order'
import Review from './pages/Review'
import Transactions from './pages/transactions'
import { useDispatch, useSelector } from 'react-redux'

import DashboardSkeleton from '../features/loadingSkeleton'
import { getUserData } from '../features/userSlicer'
import Settings from './pages/settings'
import AssignedOrders from './pages/AssignedOrders'
import Invoice from './pages/Invoice'
import TotalOrders from './pages/totalOrders'

export default function ProviderRouting () {
  const user = useSelector(state => state.user.data)
  const loading = useSelector(state => state.user.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  return (
    <Routes>
      <Route
        path='/dashboard'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <ProviderDashboard user={user} />
            </ProviderLayout>
          )
        }
      />
      <Route
        path='/new-order/:appointmentId'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <NewOrder />
            </ProviderLayout>
          )
        }
      />
      <Route
        path='/earnings'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <Order user={user} />
            </ProviderLayout>
          )
        }
      />

      <Route
        path='/assigned-orders'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <AssignedOrders />
            </ProviderLayout>
          )
        }
      />

      <Route
        path='/total-orders'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <TotalOrders />
            </ProviderLayout>
          )
        }
      />

      <Route
        path='/rating'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <Review />
            </ProviderLayout>
          )
        }
      />
      <Route
        path='/transaction'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <Transactions />
            </ProviderLayout>
          )
        }
      />
      <Route
        path='/view-invoice'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <Invoice />
            </ProviderLayout>
          )
        }
      />

      <Route
        path='/settings'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <ProviderLayout user={user}>
              <Settings user={user} />
            </ProviderLayout>
          )
        }
      />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
