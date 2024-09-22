import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton.css"
const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      {/* Header Skeleton */}
      {/* Header Right Skeleton */}
      <div className="header-right-skeleton">
        {/* <Skeleton circle height={30} width={30}  style={{ marginRight: '20px' }}/> */}
        <Skeleton circle height={55} width={55} style={{ marginRight: '20px' }} />

      </div>
      <div className="header-skeleton">

        {/* Sidebar Skeleton */}
        <div className="sidebar-skeleton">
          <div className="user-info-skeleton">
            <Skeleton circle height={60} width={60} />
            <br />
            <div>
              <Skeleton height={20} width={80} style={{ marginBottom: '5px' }} />
              <Skeleton height={12} width={60} />
            </div>
          </div>
          <div className="menu-skeleton">
            <Skeleton height={20} width={120} style={{ marginBottom: '10px' }} />
            <Skeleton height={20} width={120} style={{ marginBottom: '10px' }} />
            <Skeleton height={20} width={120} />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="main-content-skeleton">
          {/* Table Loading Skeleton */}
          <div className="table-skeleton">
            <Skeleton count={5} height={60} style={{ marginBottom: '10px' }} />
          </div>
        </div>
      </div>


    </div>
  );
};

export default DashboardSkeleton;
