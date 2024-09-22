import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../features/userSlicer'
const AdminHeader = () => {
  const dispatch = useDispatch()
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        )
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(
            `Error attempting to exit full-screen mode: ${err.message}`
          )
        })
      }
    }
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <>
      <Helmet>
        <meta charSet='UTF-8' />
        <title>Admin - Dashboard</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link rel='stylesheet' href='/admin/assets/scss/style.css' />
        <link
          rel='shortcut icon'
          href='/admin/assets/admin/images/logo-square.png'
          type='image/png'
        />
        <link rel='icon' href='/favicon.png' type='image/png' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.23.1/apexcharts.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css'
        />
      </Helmet>

      <header>
        <div>
          <ul className='navbar-nav'>
            <li className='nav-item icon'>
              <button className='hamburger' id='hamburger-btn'>
                <span className='material-icons text-white'>menu</span>
              </button>
            </li>

            <li className='nav-item d-sm-none d-none d-md-block'>
              <a href='add-employee' className='nav-link'>
                <i className='material-icons align-middle text-white'>add</i>{' '}
                Employee
              </a>
            </li>
            <li className='nav-item d-sm-none d-none d-md-block'>
              <a href='add-location' className='nav-link'>
                <i className='material-icons align-middle text-white'>add</i>{' '}
                Location
              </a>
            </li>
            {/* Quick Link commented out */}
            <li className='flex-fill'></li>
            {/* Search Bar commented out */}
            {/* Search Button commented out */}
            <li className='nav-item icon'>
              <button
                className='nav-link'
                // id="fullscreen-btn"
                onClick={toggleFullScreen}
              >
                <span className='material-icons text-white'>fullscreen</span>
              </button>
            </li>

            {/* Notifications Dropdown commented out */}

            {/* Messages Dropdown Menu */}
            {/* <li className="nav-item dropdown with-caret">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <div className="avatar avatar-sm avatar-dnd bg-primary">
                                <img src="/admin/assets/images/avatar/team-4.jpg" className="avatar-img align-top rounded-circle" alt="" />
                            </div>
                        </a>
                        <div className="dropdown-menu p-1 dropdown-menu-right" >
                            <span className="dropdown-item">
                                Welcome Pro Nauman
                            </span>
                            <a href="" className="dropdown-item">
                                Logout
                            </a>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item-text">
                                Build Version: v1.0.1
                            </span>
                        </div>
                    </li> */}
            <li className='nav-item dropdown with-caret'>
              <Dropdown>
                <Dropdown.Toggle
                  variant='transparent'
                  id='dropdown-basic'
                  className='text-light'
                >
                  <div className='avatar avatar-sm avatar-dnd bg-primary'>
                    <img
                      src='/admin/assets/images/avatar/team-4.jpg'
                      className='avatar-img align-top rounded-circle'
                      alt=''
                    />
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                  <Dropdown.ItemText>Welcome Pro Nauman</Dropdown.ItemText>
                  <Dropdown.Item
                    href='#'
                    onClick={() => dispatch(userLogout())}
                  >
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.ItemText>Build Version: v1.0.1</Dropdown.ItemText>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default AdminHeader
