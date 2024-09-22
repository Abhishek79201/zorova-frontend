import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import avatar from './avatar.png'

const backend_url = process.env.REACT_APP_BASE_URL

export default function UserSidebar ({ user }) {
  const location = useLocation()
  return (
    <>
      {/* Sidebar wrapper start */}
      <nav id='sidebar' className='sidebar-wrapper'>
        {/* Sidebar profile starts */}
        <div className='sidebar-profile'>
          <img
            src={user.avatar ? `${backend_url}/images/${user.avatar}` : avatar}
            className='profile-user mb-3'
            alt='Admin Dashboard'
          />
          <div className='text-center'>
            <h6 className='profile-name m-0 text-nowrap text-truncate'>
              {user?.fullName ? user?.fullName : 'null'}
            </h6>
          </div>
          <div className='d-flex align-items-center mt-lg-3 gap-2'>
            <Link
              to='/user/dashboard'
              className='icon-box md grd-success-light rounded-2'
            >
              <i className='bi bi-calendar2-check fs-5 text-success' />
            </Link>
            {/* <a href="events.html" class="icon-box md grd-info-light rounded-2">
          <i class="bi bi-stickies fs-5 text-info"></i>
      </a> */}

            {/* <a
          href="settings.html"
          className="icon-box md grd-danger-light rounded-2"
        >
          <i className="bi bi-gear fs-5 text-danger" />
        </a> */}
          </div>
        </div>
        {/* Sidebar profile ends */}
        <div className='sidebarMenuScroll'>
          {/* Sidebar menu starts */}
          <ul className='sidebar-menu'>
            <li
              className={
                location.pathname === '/user/dashboard'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/user/dashboard'>
                <i className='bi bi-pie-chart' />
                <span className='menu-text'>Dashboard</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/user/orders'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/user/orders'>
                <i className='bi bi-bar-chart-line' />
                <span className='menu-text'>My Orders</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/user/referrals'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/user/referrals'>
                <i className='bi bi-link' />
                <span className='menu-text'>Refferals</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/user/settings'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/user/settings'>
                <i className='bi bi-gear' />
                <span className='menu-text'>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Sidebar menu ends */}
      </nav>
      {/* Sidebar wrapper end */}
    </>
  )
}
