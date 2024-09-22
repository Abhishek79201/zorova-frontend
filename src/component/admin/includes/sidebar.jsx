import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom' // Make sure to import NavLink from react-router-dom
import { getMembers, getPartners } from '../../features/adminSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReferrals } from '../../features/referralSlicer'

const AdminSidebar = () => {
  const dispatch = useDispatch()
  const partnersRejected = useSelector(state =>
    state.admin.partners.filter(item => item.status == 'Reject')
  )
  const partnersAccepted = useSelector(state =>
    state.admin.partners.filter(item => item.status == 'Approve')
  )
  const partnersPending = useSelector(state =>
    state.admin.partners.filter(item => item.status == 'Pending')
  )

  const referralsRequestsRejected = useSelector(state =>
    state.referral.allreferrals.filter(item => item.status == 'Rejected')
  )
  const referralsRequestsAccepted = useSelector(state =>
    state.referral.allreferrals.filter(item => item.status == 'Approved')
  )
  const referralsRequestsPending = useSelector(state =>
    state.referral.allreferrals.filter(item => item.status == 'Pending')
  )

  const membershipRejected = useSelector(state =>
    state.admin.members.filter(item => item.status == 'Reject')
  )
  const membershipAccepted = useSelector(state =>
    state.admin.members.filter(item => item.status == 'Approve')
  )
  const membershipPending = useSelector(state =>
    state.admin.members.filter(item => item.status == 'Pending')
  )
  useEffect(() => {
    dispatch(getPartners())
    dispatch(getAllReferrals())
    dispatch(getMembers())
  }, [])

  const isActive = path => {
    // This function should be replaced with your actual logic to determine if the path is active
    return window.location.pathname === path
  }

  return (
    <aside className='sidebar'>
      <nav className='navbar'>
        <NavLink className='navbar-brand brand-title' to='#'>
          {/* <img src="/favicon.png" alt="logo" className="logo" /> */}
          <span className='pl-5'></span>
          Zorova
        </NavLink>
      </nav>
      <nav className='navigation shadow-sm'>
        <div className='navigation-arrow'>
          <i className='material-icons'>chevron_left</i>
        </div>
        <ul className='further'>
          <li>
            <NavLink
              to='/admin/dashboard'
              className={isActive('/admin/dashboard') ? 'active' : ''}
            >
              <span className='icon material-icons'>assessment</span>
              <span className='text'>Dashboard</span>
            </NavLink>
          </li>
          {/* Franchise Menu */}
          <li>
            <a
              href='#collapseSubmenu1'
              className=''
              data-toggle='collapse'
              aria-expanded='true'
            >
              <span className='caret material-icons'>arrow_right</span>
              <span className='icon material-icons'>card_travel</span>
              <span className='text'>Franchise</span>
            </a>
            <ul
              className={
                isActive('/admin/franchise-request')
                  ? 'collapse show'
                  : 'collapse'
              }
              id='collapseSubmenu1'
            >
              <li>
                <NavLink
                  to='/admin/franchise-request'
                  className={
                    isActive('/admin/franchise-request') ? 'active' : ''
                  }
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Franchise Request</span>
                  <span className='badge badge-transparent-danger'>
                    {partnersPending?.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/franchise-rejected'
                  className={
                    isActive('/admin/franchise-rejected') ? 'active' : ''
                  }
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Rejected Franchise</span>
                  <span className='badge badge-transparent-danger'>
                    {partnersRejected?.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/franchises'
                  className={isActive('/admin/franchises') ? 'active' : ''}
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Our Franchise</span>
                  <span className='badge badge-transparent-success'>
                    {partnersAccepted?.length}
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Referrals Menu */}
          <li>
            <a
              href='#collapseSubmenu3'
              className=''
              data-toggle='collapse'
              aria-expanded='true'
            >
              <span className='caret material-icons'>arrow_right</span>
              <span className='icon material-icons'>card_travel</span>
              <span className='text'>Referrals</span>
            </a>
            <ul
              className={
                isActive('/admin/franchise-request')
                  ? 'collapse show'
                  : 'collapse'
              }
              id='collapseSubmenu3'
            >
              <li>
                <NavLink
                  to='/admin/referral-payment-request'
                  className={
                    isActive('/admin/franchise-request') ? 'active' : ''
                  }
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Payment Request</span>
                  <span className='badge badge-transparent-danger'>
                    {referralsRequestsPending?.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/referral-payment-rejected'
                  className={
                    isActive('/admin/franchise-rejected') ? 'active' : ''
                  }
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Payment Rejected</span>
                  <span className='badge badge-transparent-danger'>
                    {referralsRequestsRejected?.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/referral-payment-approved'
                  className={isActive('/admin/franchises') ? 'active' : ''}
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Payment Approved</span>
                  <span className='badge badge-transparent-success'>
                    {referralsRequestsAccepted?.length}
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Membership Menu */}
          <li>
            <a
              href='#collapseSubmenu2'
              className=''
              data-toggle='collapse'
              aria-expanded='true'
            >
              <span className='caret material-icons'>arrow_right</span>
              <span className='icon material-icons'>card_membership</span>
              <span className='text'>Membership</span>
            </a>
            <ul
              className={
                isActive('/admin/membership-request')
                  ? 'collapse show'
                  : 'collapse'
              }
              id='collapseSubmenu2'
            >
              <li>
                <NavLink
                  to='/admin/membership-request'
                  className={
                    isActive('/admin/membership-request') ? 'active' : ''
                  }
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Membership Request</span>
                  <span className='badge badge-transparent-danger'>
                    {membershipPending?.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/membership-rejected'
                  className={
                    isActive('/admin/membership-rejected') ? 'active' : ''
                  }
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Membership Rejected</span>
                  <span className='badge badge-transparent-danger'>
                    {membershipRejected?.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/members'
                  className={isActive('/admin/members') ? 'active' : ''}
                >
                  <span className='icon material-icons'>remove</span>
                  <span className='text'>Our Members</span>
                  <span className='badge badge-transparent-success'>
                    {membershipAccepted?.length}
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* SOS */}
          <li>
            <NavLink
              to='/admin/sos'
              className={isActive('/admin/sos') ? 'active' : ''}
            >
              <span className='icon material-icons'>lightbulb_outline</span>
              <span className='text'>SOS</span>
            </NavLink>
          </li>
          {/* Clients */}
          <li className='separator'>
            <span>Clients</span>
          </li>
          <li>
            <NavLink
              to='/admin/users'
              className={isActive('/admin/users') ? 'active' : ''}
            >
              <span className='icon material-icons'>group</span>
              <span className='text'>All Clients</span>
            </NavLink>
          </li>
          {/* Service Providers */}
          <li className='separator'>
            <span>Service Providers</span>
          </li>
          <li>
            <NavLink
              to='/admin/approved-provider'
              className={isActive('/admin/approved-provider') ? 'active' : ''}
            >
              <span className='icon'>
                <i className='bi bi-person-check'></i>
              </span>
              <span className='text'>Our Service Providers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/rejected-provider'
              className={isActive('/admin/rejected-provider') ? 'active' : ''}
            >
              <span className='icon material-icons'>remove</span>
              <span className='text'>Rejected Service Providers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/pending-provider'
              className={isActive('/admin/pending-provider') ? 'active' : ''}
            >
              <span className='icon material-icons'>fingerprint</span>
              <span className='text'>Pending Service Providers</span>
            </NavLink>
          </li>
          {/* Employees */}
          <li className='separator'>
            <span>Employee</span>
          </li>
          <li>
            <NavLink
              to='/admin/add-employee'
              className={isActive('/admin/add-employee') ? 'active' : ''}
            >
              <span className='icon'>
                <i className='bi bi-person-add'></i>
              </span>
              <span className='text'>Add Employee</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/employees'
              className={isActive('/admin/employees') ? 'active' : ''}
            >
              <span className='icon'>
                <i className='bi bi-file-person'></i>
              </span>
              <span className='text'>All Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/bodyguards'
              className={isActive('/admin/bodyguards') ? 'active' : ''}
            >
              <span className='icon'>
                <i className='bi bi-shield-fill-check'></i>
              </span>
              <span className='text'>All bodyguards</span>
            </NavLink>
          </li>
          {/* Orders */}
          <li className='separator'>
            <span>Orders</span>
          </li>
          <li>
            <NavLink
              to='/admin/orders'
              className={isActive('/admin/orders') ? 'active' : ''}
            >
              <span className='icon material-icons'>monetization_on</span>
              <span className='text'>All Orders</span>
            </NavLink>
          </li>
          {/* Ratings */}
          <li className='separator'>
            <span>Ratings</span>
          </li>
          <li>
            <NavLink
              to='/admin/customer-rating'
              className={isActive('/admin/customer-rating') ? 'active' : ''}
            >
              <span className='icon material-icons'>star</span>
              <span className='text'>Customer Feedback</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/provider-rating'
              className={isActive('/admin/provider-rating') ? 'active' : ''}
            >
              <span className='icon material-icons'>star</span>
              <span className='text'>Provider Feedback</span>
            </NavLink>
          </li>
          {/* Site Settings */}
          <li className='separator'>
            <span>Site Settings</span>
          </li>
          <li>
            <NavLink
              to='/admin/email'
              className={isActive('/admin/email') ? 'active' : ''}
            >
              <span className='icon material-icons'>email</span>
              <span className='text'>Email</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/services'
              className={isActive('/admin/services') ? 'active' : ''}
            >
              <span className='icon material-icons'>remove</span>
              <span className='text'>Service Pricing</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/membership'
              className={isActive('/admin/membership') ? 'active' : ''}
            >
              <span className='icon material-icons'>remove</span>
              <span className='text'>Membership Package</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/offers'
              className={isActive('/admin/offers') ? 'active' : ''}
            >
              <span className='icon material-icons'>remove</span>
              <span className='text'>Offers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/add-location'
              className={isActive('/admin/add-location') ? 'active' : ''}
            >
              <span className='icon material-icons'>remove</span>
              <span className='text'>Locations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/terms'
              className={isActive('/admin/terms') ? 'active' : ''}
            >
              <span className='icon material-icons'>remove</span>
              <span className='text'>Terms & Privacy</span>
            </NavLink>
          </li>
        </ul>
        <div className='navigation-arrow right'>
          <i className='material-icons'>chevron_right</i>
        </div>
      </nav>
    </aside>
  )
}

export default AdminSidebar
