import React from 'react';
import EmployeeHeader from '../includes/header';
import EmployeeFooter from '../includes/footer';
import EmployeeSidebar from '../includes/sidebar';


function EmployeeLayout({ children, user }) {
  return (
    <>
      <div className="page-wrapper">
        {/* Main container start */}
        <div className="main-container">
          <EmployeeSidebar />
          {/* App container starts */}
          <div className="app-container">
            <EmployeeHeader user={user} />
            {/* App body starts */}
            <div className="app-body">
              <main>{children}</main>
            </div>
            {/* App body ends */}
            {/* App footer start */}
            <div className="app-footer">
              <span>© Flexiva 2023</span>
            </div>
            {/* App footer end */}
          </div>
          {/* App container ends */}
        </div>
        {/* Main container end */}

      </div>
      <EmployeeFooter />
    </>
  );
}

export default EmployeeLayout;