import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import UserLayout from './layout/UserLayout';
import UserDashboard from './pages/UserDashboard';
import UserOrders from './pages/UserOrders';
import Invoice from './pages/Invoice';
import UserSettings from './pages/settings';
import OrderStatus from './pages/orderStatus';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../features/userSlicer';
import DashboardSkeleton from '../features/loadingSkeleton';
import NotFoundPage from '../404';
import Referrals from './pages/Referrals';

function UserRoutes() {
  const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch])
  return (
    <Routes>
      <Route path='/dashboard' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <UserLayout user={user}>
            <UserDashboard user={user} />
          </UserLayout>
        )
      }
      />

      <Route path='/referrals' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <UserLayout user={user}>
            <Referrals user={user} />
          </UserLayout>
        )} />
        
      <Route path='/orders' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <UserLayout user={user}>
            <UserOrders user={user} />
          </UserLayout>
        )
      }
      />
      <Route path='/order-status/:appointmentId' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <UserLayout user={user}>
            <OrderStatus user={user} />
          </UserLayout>)} />

      <Route path='/view-invoice' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <UserLayout user={user}>
            <Invoice user={user} />
          </UserLayout>
        )} />
      <Route path='/settings' element={
        <UserLayout user={user}>
          <UserSettings user={user} />
        </UserLayout>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
export default UserRoutes
