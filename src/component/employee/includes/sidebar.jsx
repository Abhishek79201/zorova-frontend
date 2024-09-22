import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function EmployeeSidebar () {
  const location = useLocation()
  const isActive = pathname => location.pathname === pathname
  return (
    <nav id='sidebar' className='sidebar-wrapper'>
      <div className='app-brand px-3 py-2 d-flex align-items-center'>
        <Link to='/employee/dashboard' className='text-center'>
          {/* <img src="/favicon.png" className="logo" alt="Flexiva" title="Flexiva" /> */}
          <span className='h4'>Flexiva</span>
        </Link>
      </div>
      {/* App brand ends */}
      {/* Sidebar menu starts */}
      <div className='sidebar-menu-scroll'>
        <div className='sidebar-menu-wrapper'>
          <ul className='sidebar-menu'>
            <li
              className={
                location.pathname === '/employee/dashboard'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/dashboard'>
                <i className='bi bi-bar-chart-line' />
                <span className='menu-text'>Dashboard</span>
                {/* {'{'}{'{'}-- <span className="badge border border-danger text-danger rounded-5 ms-2">New</span> --{'}'}{'}'} */}
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/all-clients'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/all-clients'>
                <i className='bi bi-person' />
                <span className='menu-text'>All Clients</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/all-membership'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/all-membership'>
                <i className='bi bi-ticket' />
                <span className='menu-text'>All Membership</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/captains'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/captains'>
                <i className='bi bi-person' />
                <span className='menu-text'>All Captains</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/providers'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/providers'>
                <i className='bi bi-person' />
                <span className='menu-text'>All Providers</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/supervisiors'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/supervisiors'>
                <i className='bi bi-person' />
                <span className='menu-text'>All Supervisiors</span>
              </Link>
            </li>

            <li
              className={
                location.pathname === '/employee/new-order'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/new-order'>
                <i className='bi bi-star' />
                <span className='menu-text'>New Order</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/assigned-orders'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/assigned-orders'>
                <i className='bi bi-basket' />
                <span className='menu-text'>Assigned Orders</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/orders'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/orders'>
                <i className='bi bi-basket' />
                <span className='menu-text'>Total Orders</span>
              </Link>
            </li>

            <li
              className={
                location.pathname === '/employee/sos'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/sos'>
                <i className='bi bi-question' />
                <span className='menu-text'>SOS Emergency</span>
              </Link>
            </li>

            <li
              className={
                location.pathname === '/employee/customer-rating'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/customer-rating'>
                <i className='bi bi-star' />
                <span className='menu-text'>Customer Feedback</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/provider-rating'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/provider-rating'>
                <i className='bi bi-star' />
                <span className='menu-text'>Provider Feedback</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === '/employee/settings'
                  ? 'active current-page'
                  : ''
              }
            >
              <Link to='/employee/settings'>
                <i className='bi bi-gear' />
                <span className='menu-text'>Profile Setting</span>
              </Link>
            </li>

            <li className='separator'>
              <span>Site Settings</span>
            </li>

            {/* <li className={isActive('/employee/services') ? 'active current-page' : ''}>
        <Link to="/employee/services" >
          <i className="bi bi-stars" />
          <span className="menu-text">Service Pricing</span>
        </Link>
      </li> */}

            {/* <li className={isActive('/employee/membership') ? 'active current-page' : ''}>
        <Link to="/employee/membership" >
          <i className="bi bi-person-badge" />
          <span className="menu-text">Member Package</span>
        </Link>
      </li> */}

            <li
              className={
                isActive('/employee/offers') ? 'active current-page' : ''
              }
            >
              <Link to='/employee/offers'>
                <i className='bi bi-tag' />
                <span className='menu-text'>Offers</span>
              </Link>
            </li>

            <li
              className={
                isActive('/employee/add-location') ? 'active current-page' : ''
              }
            >
              <Link to='/employee/add-location'>
                <i className='bi bi-geo-alt' />
                <span className='menu-text'>Location</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar menu ends */}
    </nav>
  )
}
