import React from 'react';
import AdminHeader from '../includes/header';
import AdminSidebar from '../includes/sidebar';
import AdminFooter from '../includes/footer';
// import EmployeeFooter from '../includes/footer';
// import EmployeeSidebar from '../includes/sidebar';
function AdminLayout({ children, user }) {
  return (
    <>
      <div class="overlay-mask"></div>
      {/* Main container start */}
      <div className="main-wrapper">
        <AdminSidebar />
        {/* App container starts */}
        <div className="right-area">
          <AdminHeader />
          <main>{children}</main>
        </div>
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminLayout;