import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ProviderSidebar () {
  const location = useLocation()

  return (
    <nav id='sidebar' className='sidebar-wrapper'>
      <div className='app-brand px-3 py-2 d-flex align-items-center'>
        <Link to='/provider/dashboard' className='text-center'>
          {/* <img src="/favicon.png" className="logo" alt="Flexiva" title="Flexiva" /> */}
          <span className='h4'>Flexiva</span>
        </Link>
      </div>
      {/* App brand ends */}
      {/* Sidebar menu starts */}
      <div className='sidebarMenuScroll'>
        <ul className='sidebar-menu'>
          <li
            className={
              location.pathname === '/provider/dashboard'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/dashboard'>
              <i className='bi bi-bar-chart-line'></i>
              <span className='menu-text'>Dashboard</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === '/provider/assigned-orders'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/assigned-orders'>
              <i className='bi bi-basket'></i>
              <span className='menu-text'>Assigned Orders</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === '/provider/total-orders'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/total-orders'>
              <i className='bi bi-basket'></i>
              <span className='menu-text'>Total Orders</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === '/provider/earnings'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/earnings'>
              <i className='bi bi-currency-rupee'></i>
              <span className='menu-text'>Earning</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === '/provider/rating'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/rating'>
              <i className='bi bi-star'></i>
              <span className='menu-text'>Reviews</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === '/provider/transaction'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/transaction'>
              <i className='bi bi-arrow-left-right'></i>
              <span className='menu-text'>Transactions</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === '/provider/settings'
                ? 'active current-page'
                : ''
            }
          >
            <Link to='/provider/settings'>
              <i className='bi bi-gear'></i>
              <span className='menu-text'>Profile Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* Sidebar menu ends */}
    </nav>
  )
}
