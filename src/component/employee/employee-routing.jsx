import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import EmployeeLayout from './layout/EmployeeLayout'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AssignedOrder from './pages/AssignedOrder'
import NewOrder from './pages/NewOrder'
import Orders from './pages/Orders'
import Invoice from './pages/Invoice'
import 'jquery/dist/jquery.min.js'
import NotFoundPage from '../404'
import Services from './pages/Services'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../features/userSlicer'
import DashboardSkeleton from '../features/loadingSkeleton'
import Membership from './pages/Membership'
import Offers from './pages/Offers'
import AddLocations from './pages/AddLocation'
import SOS from './pages/sos'
import LiveLocation from './pages/liveLocation'
import Settings from './pages/settings'
import Allclients from './pages/allclients'
import AllMembership from './pages/allMembership'
import AllCaptains from './pages/allCaptains'
import AllSupervisiors from './pages/allSupervisiors'
import AllProviders from './pages/allProviders'
import CustomerRating from './pages/customerRating'
import ProviderRating from './pages/providerRating'

function EmployeeRoutes () {
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
            <EmployeeLayout user={user}>
              <EmployeeDashboard />
            </EmployeeLayout>
          )
        }
      />
      <Route
        path='/assigned-orders'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <AssignedOrder />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/new-order'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <NewOrder />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/all-clients'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Allclients />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/all-membership'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <AllMembership />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/orders'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Orders />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/view-invoice/:id'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Invoice />
            </EmployeeLayout>
          )
        }
      />
      <Route
        path='/services'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Services />
            </EmployeeLayout>
          )
        }
      />
      <Route
        path='/membership'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Membership />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/captains'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <AllCaptains />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/supervisiors'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <AllSupervisiors />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/providers'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <AllProviders />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/customer-rating'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <CustomerRating />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/provider-rating'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <ProviderRating />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/offers'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Offers />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/sos'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <SOS />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/add-location'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <AddLocations />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/live-location/:providerId'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <LiveLocation />
            </EmployeeLayout>
          )
        }
      />

      <Route
        path='/settings'
        element={
          loading ? (
            <DashboardSkeleton />
          ) : (
            <EmployeeLayout user={user}>
              <Settings user={user} />
            </EmployeeLayout>
          )
        }
      />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default EmployeeRoutes
