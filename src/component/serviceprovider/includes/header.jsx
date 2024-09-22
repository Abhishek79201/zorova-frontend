import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../features/userSlicer'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { statusUpdate } from '../../features/providerSlicer'
import avatar from './avatar.png'
import { REACT_APP_BASE_URL } from '../../../config'
const backend_url = REACT_APP_BASE_URL

export default function ProviderHeader ({ user }) {
  const dispatch = useDispatch()

  //   useEffect(() => {
  //    // Check if the user has closed the tab
  //    const handleUnload = () => {
  //      dispatch(statusUpdate('UnAvailable'));
  //    };

  //    window.addEventListener('beforeunload', handleUnload);

  //    return () => {
  //      window.removeEventListener('beforeunload', handleUnload);
  //    };
  //  }, []);

  const logout = async () => {
    try {
      const swalResult = await Swal.fire({
        title: 'Logout Confirmation',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout'
      })

      if (swalResult.isConfirmed) {
        const response = await fetch(`${backend_url}/users/logout`, {
          method: 'POST'
        }).then(result => {
          if (!result.error) {
            dispatch(statusUpdate('UnAvailable')).then(result => {
              if (!result.error) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'User Logout Successfully!'
                })

                localStorage.clear()
                localStorage.clear()
                window.location.href = '/'
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: `Error! in Logging out!`
                })
              }
            })
          }
        })
      } else {
        // User clicked Cancel or closed the dialog
        return null
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error! in Logging out!`
      })
    }
  }

  return (
    <>
      <Helmet>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Provider Dashboard - Flexiva</title>
        <meta name='description' content='Flexiva' />
        <meta name='author' content='ProNauman' />
        <link rel='canonical' href='' />
        <meta property='og:url' content='' />
        <meta property='og:title' content='Flexiva' />
        <meta property='og:description' content='' />
        <meta property='og:type' content='Website' />
        <meta property='og:site_name' content='Flexiva' />
        <link rel='shortcut icon' href='favicon.png' />

        {/* <!-- *************
         ************ CSS Files *************
         ************* --> */}
        <link
          rel='stylesheet'
          href='/employee/assets/fonts/bootstrap/bootstrap-icons.css'
        />
        <link rel='stylesheet' href='/employee/assets/css/main.min.css' />

        {/* <!-- *************
         ************ Vendor Css Files *************
         ************ --> */}

        {/* <!-- Scrollbar CSS --> */}
        <link
          rel='stylesheet'
          href='/employee/assets/vendor/overlay-scroll/OverlayScrollbars.min.css'
        />
        <link
          href='https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.min.css'
          rel='stylesheet'
        />
        {/* <!-- Toastify CSS --> */}
        <link
          rel='stylesheet'
          href='/employee/assets/vendor/toastify/toastify.css'
        />
      </Helmet>

      <>
        <>
          {/* App header starts */}
          <div className='app-header d-flex align-items-center'>
            {/* Toggle buttons start */}
            <div className='d-flex'>
              <button
                className='btn btn-outline-primary me-2 toggle-sidebar'
                id='toggle-sidebar'
              >
                <i className='bi bi-text-indent-left fs-5' />
              </button>
              <button
                className='btn btn-outline-primary me-2 pin-sidebar'
                id='pin-sidebar'
              >
                <i className='bi bi-text-indent-left fs-5' />
              </button>
            </div>
            {/* Toggle buttons end */}
            {/* App brand sm start */}
            <div className='app-brand-sm d-md-none d-sm-block'>
              <a href='/employee/dashboars'>
                <img src='/favicon.png' className='logo' alt='Flexiva Logo' />
              </a>
            </div>
            {/* App brand sm end */}
            {/* App header actions start */}
            <div className='header-actions'>
              <div className='dropdown ms-2'>
                <a
                  id='userSettings'
                  className='dropdown-toggle d-flex py-2 align-items-center text-decoration-none'
                  href='#!'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <img
                    src={
                      user?.avatar
                        ? `${backend_url}/images/${user?.avatar}`
                        : avatar
                    }
                    className='rounded-2 img-3x'
                    alt='No Img!'
                  />
                </a>
                <div className='dropdown-menu dropdown-menu-end shadow-sm'>
                  <div className='pt-3 px-2 border-bottom mb-2'>
                    <h6 className='mb-1'>{user?.fullName}</h6>
                    <p>{'FLX-' + user?._id?.slice(-5).toUpperCase()}</p>
                    {/* <p className="m-0 small opacity-50" /> */}
                  </div>

                  <Link
                    className='dropdown-item d-flex align-items-center'
                    to='/provider/settings'
                  >
                    <i className='bi bi-gear fs-4 me-2' />
                    Settings
                  </Link>
                  <div className='d-grid p-3 py-2'>
                    <Link
                      onClick={() => dispatch(logout)}
                      className='btn btn-primary btn-sm'
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* App header actions end */}
          </div>
          {/* App header ends */}
        </>
      </>
    </>
  )
}
