import React, { useEffect } from 'react';
import Header from '../includes/header';
import Footer from '../includes/footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../features/userSlicer';



function MainLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch])
  return (
    <div>
      <Header userRole={user?.role} userFullName={user?.fullName} loading={loading}/>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;