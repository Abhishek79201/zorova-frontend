import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import ServicesPricing from './pages/ServicePricing'
import ProviderFeedback from './pages/ProviderFeedback'
import CustomerFeedback from './pages/CustFeedback'
import EmailToContacts from './pages/Email'
import SOS from './pages/Sos'
import TermsAndPrivacy from './pages/TermsAndPrivacy'
import AddLocation from './pages/AddLocation'
import Offers from './pages/Offers'
import AllOrders from './pages/AllOrders'
import AllEmployees from './pages/AllEmployees'
import AllBodyguards from './pages/AllBodyguards'
import AddEmployee from './pages/AddEmployee'
import ApprovedProviders from './pages/ApprovedProviders'
import RejectedProviders from './pages/RejectedProviders'
import AllClients from './pages/AllClients'
import PendingProviders from './pages/PendingProviders'
import Members from './pages/Members'
import RejectedMembers from './pages/RejectedMembers'
import RequestedMembers from './pages/RequestedMembers'
import MembershipPackage from './pages/memberprice'
import Franchise from './pages/Franchise'
import RequestedFranchise from './pages/RequestedFrenchise'
import RejectedFranchise from './pages/RejectedFranchise'
import UpdateEmployee from './pages/UpdateEmployee'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../features/userSlicer'
import DashboardSkeleton from '../features/loadingSkeleton'
import Invoice from './pages/Invoice'
import RequestReferralPayment from './pages/RequestReferralPayment'
import RejectedReferralPayments from './pages/RejectedReferralPayments'
import ApprovedReferralPayments from './pages/ApprovedReferralPayment'

function AdminRoutes() {
  // const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [])
  return (
    <Routes>
      <Route path='/dashboard' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <Dashboard /> </AdminLayout>
        )
      } />

      <Route path='/services' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <ServicesPricing /> </AdminLayout>
        )} />

      <Route path='/provider-rating' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <ProviderFeedback /> </AdminLayout>
        )} />

      <Route path='/customer-rating' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <CustomerFeedback /> </AdminLayout>
        )} />

      <Route path='/email' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <EmailToContacts /> </AdminLayout>
        )} />

      <Route path='/membership' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <MembershipPackage /> </AdminLayout>
        )} />

      <Route path='/sos' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <SOS /> </AdminLayout>
        )} />

      <Route path='/terms' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <TermsAndPrivacy /> </AdminLayout>
        )} />

      <Route path='/add-location' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <AddLocation /> </AdminLayout>
        )} />

      <Route path='/offers' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <Offers /> </AdminLayout>
        )} />

      <Route path='/orders' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <AllOrders /> </AdminLayout>
        )} />

      <Route path='/bodyguards' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <AllBodyguards /> </AdminLayout>
        )} />

      <Route path='/employees' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <AllEmployees /> </AdminLayout>
        )} />

      <Route path='/add-employee' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <AddEmployee /> </AdminLayout>
        )} />

      <Route path='/update-employee/:id' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <UpdateEmployee /> </AdminLayout>
        )} />

      <Route path='/rejected-provider' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RejectedProviders /> </AdminLayout>
        )} />

      <Route path='/approved-provider' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <ApprovedProviders /> </AdminLayout>
        )} />

      <Route path='/pending-provider' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <PendingProviders /> </AdminLayout>
        )} />

      <Route path='/users' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <AllClients /> </AdminLayout>
        )} />

      <Route path='/members' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <Members /> </AdminLayout>
        )} />

      <Route path='/membership-rejected' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RejectedMembers /> </AdminLayout>
        )} />

      <Route path='/membership-request' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RequestedMembers /> </AdminLayout>
        )} />

      <Route path='/franchises' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <Franchise /> </AdminLayout>
        )} />

      <Route path='/franchise-rejected' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RejectedFranchise /> </AdminLayout>
        )} />

      <Route path='/franchise-request' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RequestedFranchise /> </AdminLayout>
        )} />

      <Route path='/view-invoice/:id' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout ><Invoice /></AdminLayout>
        )
      } />

      <Route path='/referral-payment-request' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RequestReferralPayment /> </AdminLayout>
        )} />

      <Route path='/referral-payment-rejected' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <RejectedReferralPayments /> </AdminLayout>
        )} />
 <Route path='/referral-payment-approved' element={
        loading ? (
          <DashboardSkeleton />
        ) : (
          <AdminLayout > <ApprovedReferralPayments /> </AdminLayout>
        )} />


    </Routes>



  )
}

export default AdminRoutes
