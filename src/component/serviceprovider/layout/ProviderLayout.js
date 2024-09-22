import React from 'react';
import ProviderHeader from '../includes/header';
import ProviderFooter from '../includes/footer';
import ProviderSidebar from '../includes/sidebar';

function ProviderLayout({ children, user }) {
  return (
    <>
      <div className="page-wrapper">
        {/* Main container start */}
        <div className="main-container">
          <ProviderSidebar />
          {/* App container starts */}
          <div className="app-container">
            <ProviderHeader user={user} />
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
      <ProviderFooter />
    </>
  );
}

export default ProviderLayout;