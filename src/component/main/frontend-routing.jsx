import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import "./assets/css/style.css";
import "./assets/css/media.css";
import "./assets/css/animation.css";
import Business from './pages/Business.jsx'
import Membership from './pages/Membership.jsx'
import BecomeProvider from './pages/Become-a-Provider.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Massage from './pages/Massage.jsx'
import Stretch from './pages/Stretch.jsx'
import Fitness from './pages/Fitness.jsx'
import Signin from './pages/signin.jsx'
import Joinprogram from './pages/Joinprogram.jsx'
import Paymentmethod from './pages/Payment-method.jsx'
import ThankU from './pages/ThankU.jsx'
import Becomemember from './pages/Become-a-member.jsx'
import Booking from './pages/Booking.jsx'
import AppoimentForm from './pages/Appoiment-Form.jsx'
import Becomeapartner from './pages/Becomeapartner.jsx'
import MainLayout from './layout/layout.jsx';
import Providerform from './pages/providerForm.jsx';
import ResetPassword from './pages/resetPassword.jsx';
import ResetForm from './pages/reset-form.jsx';
import VerifyEmail from './pages/verifyEmail.jsx';
import NotFoundPage from '../404.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../features/userSlicer';
import NoAccess from './pages/NoAccess.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import TestMember from './pages/testmember.jsx';


function FrontendRoutes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch])

  return (
    <div>
 
    <Routes>
    
        <Route path='/business' element={<MainLayout><Business/></MainLayout>}/>
        <Route path='/membership' element={<MainLayout><Membership/></MainLayout>}/>
        <Route path='/become-a-provider' element={<MainLayout><BecomeProvider/></MainLayout>}/>
        <Route path='/onboarding' element={user?.role === "employee"?<MainLayout><NoAccess/></MainLayout>:<MainLayout><Providerform userId={user?._id}/></MainLayout>}/>
        <Route path='/contact' element={<MainLayout><Contact/></MainLayout>}/>
        <Route path='/' element={<MainLayout><Home/></MainLayout>}/>
        <Route path='/massage' element={<MainLayout><Massage/></MainLayout>}/>
        <Route path='/stretch' element={<MainLayout><Stretch/></MainLayout>}/>
        <Route path='/fitness' element={<MainLayout><Fitness/></MainLayout>}/>
        <Route path='/signin' element={<MainLayout><Signin/></MainLayout>}/>
        <Route path='/join-program' element={<MainLayout><Joinprogram/></MainLayout>}/>
        <Route path='/paymentmethod' element={<MainLayout><Paymentmethod/></MainLayout>}/>
        <Route path='/thankU' element={<MainLayout><ThankU/></MainLayout>}/>
        {/* <Route path='/become-a-member' element={<MainLayout><Becomemember/></MainLayout>}/> */}
        <Route path='/booking' element={ user?.role=="user" ? <MainLayout><Booking/></MainLayout> : <NotFoundPage />}/>
        <Route path='/booking/:type' element={ user?.role=="user" ? <MainLayout><AppoimentForm/></MainLayout> : <NotFoundPage />}/>
        <Route path='/become-a-partner' element={user?.role === "employee"?<MainLayout><NoAccess/></MainLayout>:<MainLayout><Becomeapartner/></MainLayout>}/>
        <Route path='/password-forget' element={<MainLayout><ResetPassword/></MainLayout>}/>
        <Route path='/reset-password/token' element={<MainLayout><ResetForm/></MainLayout>}/>
        <Route path='/verify-email' element={<MainLayout><VerifyEmail/> </MainLayout>}/>
        <Route path="/paymentsuccess/:id" element={<MainLayout><PaymentSuccess /></MainLayout>} />
        <Route path="/become-a-member" element={<MainLayout><TestMember /></MainLayout>} />

<Route path="/NoAccess" element={<MainLayout><NoAccess/></MainLayout>}/> 
        <Route path="*" element={<NotFoundPage /> } />

    </Routes>

    </div>
  )
}

export default FrontendRoutes
