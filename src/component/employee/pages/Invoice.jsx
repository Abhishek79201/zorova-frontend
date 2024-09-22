import React, { useEffect } from 'react'
import UserSidebar from '../includes/sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../features/customerSlicer';
import moment from 'moment';
import AmountInWords from './amountInWords';
import { getAssignedOrders } from '../../features/employeeSlicer';

export default function Invoice({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.employee.loading);
  const { id } = useParams();
  useEffect(() => {

    if (!id) {
      // Navigate to the login page if either token or email is missing
      navigate('/user/orders');  // Update '/login' with your actual login route
    }

    // ... rest of your useEffect code
  }, [navigate]);


  useEffect(() => {
    dispatch(getAssignedOrders());
  }, [dispatch])

  const assignedOrders = useSelector((state) => state.employee.assignedOrders);
  const record = assignedOrders.find(item => item._id === id);

  return (
    <div className="container-fluid">
      {/* Row start */}
      <div className="row gx-3">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                <div
                  className="logo float-right text-right"
                  style={{ textAlign: "right!important" }}
                >
                  <svg
                    width={238}
                    height={50}
                    viewBox="0 0 258 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.7298 12.3476L27.9411 6.96283C27.3253 6.08725 27.0452 5.02561 27.1533 3.97393C27.2625 2.91328 27.7609 1.93025 28.557 1.2079C29.4148 0.428834 30.5414 0 31.7298 0C32.9182 0 34.0448 0.428834 34.9026 1.2079C35.6986 1.93025 36.197 2.91229 36.3062 3.97393C36.4143 5.02561 36.1352 6.08725 35.5184 6.96283L31.7298 12.3476ZM31.7298 0.981044C30.8009 0.981044 29.9214 1.31536 29.2521 1.92328C27.9895 3.06949 27.7867 4.99974 28.7804 6.41261L31.7298 10.6044L34.6791 6.41261C35.6729 4.99974 35.47 3.07049 34.2075 1.92328C33.5381 1.31536 32.6586 0.981044 31.7298 0.981044Z"
                      fill="#231F20"
                    />
                    <path
                      d="M31.7212 34.7893L21.2451 26.3817L21.2224 26.3588C19.5922 24.6624 18.6623 23.3301 18.2071 22.0417C17.7108 20.6358 17.7479 19.1841 18.3266 17.4727C18.6222 16.5982 19.0753 15.7962 19.6725 15.0888C20.2997 14.3465 21.069 13.7316 21.9577 13.262C23.6908 12.3446 25.6886 12.1009 27.5845 12.5745C29.2528 12.9924 30.7007 13.9396 31.7294 15.2729C32.7582 13.9396 34.2051 12.9924 35.8744 12.5745C37.7702 12.1009 39.7691 12.3446 41.5022 13.262C42.3899 13.7316 43.1592 14.3455 43.7873 15.0888C44.3846 15.7962 44.8367 16.5982 45.1322 17.4727C45.7388 19.2677 45.7913 20.8895 45.2929 22.4327C44.7595 24.0823 43.6092 25.6066 41.7751 27.0921L41.7648 27.1011L31.7212 34.7893ZM21.9443 25.6683L31.7366 33.5276L41.1284 26.336C44.3486 23.7261 45.2857 21.0855 44.1673 17.7772C43.9109 17.018 43.5186 16.3225 43.0006 15.7096C42.4558 15.0649 41.7875 14.5316 41.0151 14.1227C39.5095 13.3257 37.7743 13.1138 36.1287 13.5247C34.4677 13.9406 33.0599 14.9634 32.165 16.4061L31.7305 17.1066L31.2948 16.4061C30.3989 14.9634 28.9902 13.9406 27.3301 13.5247C25.6855 13.1138 23.9503 13.3257 22.4448 14.1227C21.6704 14.5316 21.003 15.0659 20.4583 15.7096C19.9403 16.3225 19.5479 17.018 19.2915 17.7772C18.3235 20.6427 18.9671 22.563 21.9443 25.6683Z"
                      fill="#231F20"
                    />
                    <path
                      d="M52.2763 53.5116C49.5515 53.5116 46.9574 52.6898 45.0935 51.9993C42.1452 50.9068 39.2988 49.4959 36.5462 48.1328C34.3404 47.0403 32.0604 45.911 29.7536 44.9578C29.5724 44.8832 29.3911 44.8096 29.2109 44.7379L26.2626 46.4612C23.4791 48.088 20.5998 49.7705 17.4496 50.8441C13.8824 52.059 10.4398 52.2749 7.49249 51.467C5.82112 51.0093 4.27025 50.1795 3.00875 49.0681C1.67207 47.891 0.731862 46.4513 0.291109 44.9061C-0.261893 42.9679 -0.021949 40.7929 0.967687 38.781C1.90892 36.8667 3.45259 35.22 5.31343 34.1425C8.66852 32.2013 13.0946 31.7356 17.7791 32.8331C21.8592 33.7893 25.6138 35.7384 29.2449 37.6239L29.3067 37.6557C31.0244 38.5472 32.8585 39.5004 34.776 40.3402L41.0588 36.6677C42.9742 35.5484 44.8587 34.4778 46.8575 33.6908C49.1715 32.7784 51.2692 32.4072 53.2701 32.5555C55.7807 32.7415 58.209 33.8708 60.1069 35.7374C62.0048 37.604 63.1314 39.969 63.2797 42.3978C63.428 44.8265 62.596 47.303 60.938 49.3715C59.28 51.4401 57.0062 52.838 54.5357 53.3067C53.7799 53.4499 53.0229 53.5116 52.2763 53.5116ZM30.284 44.1101C32.5784 45.0643 34.8305 46.1797 37.0106 47.2592C39.7396 48.6114 42.5612 50.0083 45.458 51.0829C47.7154 51.9197 51.091 52.9604 54.339 52.3445C58.9886 51.462 62.5445 47.0244 62.2654 42.4545C61.9863 37.8846 57.9165 33.8818 53.1918 33.5325C49.2436 33.241 45.5991 35.1593 41.584 37.5065L35.9149 40.8197C37.439 41.4366 39.0095 41.964 40.6129 42.3202C45.0472 43.3042 49.19 42.8077 52.2784 40.9202L52.8211 41.749C51.0849 42.8097 49.052 43.4654 46.7793 43.6962C44.7588 43.9012 42.5489 43.7559 40.3863 43.2763C38.477 42.8525 36.6244 42.1998 34.847 41.4446L30.284 44.1101ZM12.9267 33.2311C10.2719 33.2311 7.84056 33.8221 5.83451 34.9832C2.25184 37.0567 0.28802 41.2108 1.26839 44.6454C2.03868 47.3458 4.59052 49.6521 7.76847 50.5237C11.2358 51.4739 14.7629 50.7197 17.1118 49.9198C20.1642 48.88 22.9971 47.2244 25.7374 45.6225L28.0246 44.2862C22.5584 42.2933 17.7019 41.8197 13.5704 42.8803L13.3098 41.9331C15.9173 41.2635 18.7997 41.166 21.8767 41.6416C24.1454 41.9928 26.5777 42.6654 29.1213 43.6455L33.7266 40.9541C32.0109 40.175 30.3715 39.3243 28.8248 38.5213L28.763 38.4895C25.1885 36.6339 21.4916 34.7146 17.5392 33.7883C15.9554 33.4141 14.4066 33.2311 12.9267 33.2311Z"
                      fill="#231F20"
                    />
                    <path
                      d="M31.2211 16.14L31.1367 19.9799L32.1509 20.0008L32.2352 16.161L31.2211 16.14Z"
                      fill="#231F20"
                    />
                    <path
                      d="M83.2328 46.6444V44.5689C84.6457 44.0823 86.2233 43.7838 87.9657 43.6714V12.87C86.3006 12.7576 84.7239 12.4491 83.2328 11.9447V9.86914H111.511C111.84 11.2342 112.004 12.5436 112.004 13.7963C112.004 15.8718 111.84 17.7792 111.511 19.5184H108.898L107.534 12.6461H93.6852V26.8683H101.524C101.795 25.2226 102.191 23.8485 102.715 22.7451H105.212C105.463 24.6525 105.59 26.5698 105.59 28.496C105.59 30.5905 105.464 32.7316 105.212 34.9196H102.715C102.211 33.5545 101.814 31.7964 101.524 29.6462H93.6852V43.6714C96.3565 43.7838 98.3399 44.0833 99.6375 44.5689V46.6444H83.2328Z"
                      fill="black"
                    />
                    <path
                      d="M115.053 46.6444V44.7927C116.292 44.3062 117.725 44.0077 119.351 43.8953V10.3457L115.315 9.42042V7.56877C117.734 6.80264 120.821 6.41858 124.577 6.41858V43.8953C126.183 44.0077 127.605 44.3072 128.844 44.7927V46.6444H115.053Z"
                      fill="black"
                    />
                    <path
                      d="M131.922 33.3197C131.922 29.0373 133.164 25.6296 135.652 23.0954C138.139 20.5612 141.25 19.2946 144.987 19.2946C148.334 19.2946 150.919 20.1413 152.739 21.8337C154.558 23.5262 155.468 25.9718 155.468 29.1697C155.468 30.3477 155.391 31.3487 155.235 32.1715H137.379V32.6202C137.379 36.1922 138.192 38.8856 139.818 40.6994C141.444 42.5133 143.651 43.4207 146.438 43.4207C149.263 43.4207 151.721 42.2705 153.812 39.9701L155.002 40.8954C153.995 42.8774 152.627 44.4067 150.895 45.4823C149.162 46.5578 147.115 47.0951 144.754 47.0951C140.94 47.0951 137.853 45.9549 135.492 43.6724C133.112 41.371 131.922 37.9205 131.922 33.3197ZM144.755 21.8188C142.838 21.8188 141.246 22.4785 139.979 23.7968C138.711 25.1152 137.903 27.0653 137.554 29.6453H150.243V28.7199C150.243 26.4196 149.773 24.6943 148.835 23.5441C147.895 22.3939 146.535 21.8188 144.755 21.8188Z"
                      fill="black"
                    />
                    <path
                      d="M157.355 46.6444V44.7927C158.381 44.3818 159.329 44.0634 160.201 43.8386L169.027 33.263L160.027 22.4635C159.679 22.4078 158.788 22.1173 157.355 21.5939V19.7701H170.218V21.5939C168.552 22.1173 167.256 22.4078 166.327 22.4635L172.57 30.683L178.463 22.7441C177.127 22.4635 175.724 22.0805 174.253 21.5939V19.7701H185.431V21.5939C184.83 21.8934 183.853 22.2576 182.498 22.6884L174.31 32.7307L183.398 43.951C183.882 44.0256 184.791 44.3062 186.127 44.7927V46.6444H173.295V44.7927C174.494 44.4753 175.724 44.1948 176.982 43.951L170.682 35.3395L164.73 43.6704C166.084 43.951 167.353 44.3251 168.533 44.7927V46.6444H157.355Z"
                      fill="black"
                    />
                    <path
                      d="M188.276 46.6443V44.7927C189.515 44.3062 190.937 44.0077 192.543 43.8952V23.1928L188.508 22.2953V20.4437C190.927 19.6776 194.014 19.2935 197.77 19.2935V43.8952C199.396 44.0077 200.828 44.3071 202.067 44.7927V46.6443H188.276ZM193.008 13.7963C192.698 12.5058 192.543 11.1974 192.543 9.86912C192.543 9.00946 192.621 8.24233 192.776 7.56874C193.473 7.41949 194.343 7.34387 195.389 7.34387C196.434 7.34387 197.305 7.4185 198.001 7.56874C198.175 8.33586 198.263 9.10199 198.263 9.86912C198.263 11.1218 198.098 12.4312 197.77 13.7963C197.169 13.9465 196.376 14.0211 195.389 14.0211C194.402 14.0201 193.608 13.9455 193.008 13.7963Z"
                      fill="#5E17EB"
                    />
                    <path
                      d="M214.87 46.6444L204.999 22.4078C204.534 22.3332 203.702 22.0616 202.501 21.5939V19.7701H214.638V21.5939C213.322 22.0984 211.938 22.4078 210.485 22.5193L217.367 40.2756L224.451 22.5193C223.115 22.37 221.828 22.0616 220.589 21.5939V19.7701H230.809V21.5939C229.763 22.0248 228.912 22.2954 228.254 22.4078L217.976 46.6444H214.87Z"
                      fill="#5E17EB"
                    />
                    <path
                      d="M232.958 40.2208C232.958 36.2379 235.329 33.7037 240.071 32.6192C242.278 32.1148 245.132 31.7496 248.636 31.5248V26.8683C248.636 25.1848 248.186 23.961 247.286 23.1938C246.386 22.4277 245.016 22.0436 243.178 22.0436C242.075 22.0436 240.787 22.165 239.316 22.4088L238.3 28.0195H235.223C234.816 26.7479 234.613 25.3738 234.613 23.8963C234.613 23.1113 234.671 22.4934 234.787 22.0446C237.322 20.2119 240.835 19.2955 245.326 19.2955C251.035 19.2955 253.891 21.5213 253.891 25.9718L253.774 32.5635C253.755 33.8351 253.735 35.2708 253.717 36.8698C253.697 38.4687 253.678 39.797 253.659 40.8526C253.64 41.9093 253.63 42.7839 253.63 43.4754L257.695 44.345V45.9439C255.275 46.71 252.256 47.0941 248.637 47.0941V42.5212C247.824 43.943 246.725 45.0604 245.341 45.8733C243.957 46.6872 242.443 47.0931 240.798 47.0931C238.32 47.0931 236.395 46.4951 235.021 45.2982C233.645 44.1012 232.958 42.4088 232.958 40.2208ZM242.946 43.8953C244.029 43.8953 245.089 43.6246 246.125 43.0814C247.16 42.5391 247.997 41.8466 248.637 41.0059V33.5446C244.843 33.7694 242.152 34.3067 240.565 35.1574C238.978 36.0081 238.184 37.3871 238.184 39.2955C238.184 40.8099 238.591 41.9561 239.404 42.7321C240.217 43.5072 241.397 43.8953 242.946 43.8953Z"
                      fill="#5E17EB"
                    />
                  </svg>
                </div>
              </h5>
            </div>
            <div className="card-body">
              {/* Row start */}
              <div className="row gx-3">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <strong className="h2">
                    <u>Tax Invoice</u>
                  </strong>
                </div>

                {/* <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-12">
              <p className="text-end m-0">
                Invoice - #VEN009985 Flexiva LLC, 0000 St. <br />
                Muzafarpur Bihar
                <br />
                India 0000
              </p>
            </div> */}
              </div>
              {/* Row end */}
              {/* Row start */}
              <div className="col-sm-12 col-12">
                <div className="row mt-3">
                  <div className="col-md-8 col-sm-8 text-left">
                    <ul className="list-unstyled">
                      <li>
                        <strong>Invoice #:</strong> FLX{record?._id.slice(-5).toUpperCase()}
                      </li>
                      <li>
                        <strong>Order #:</strong> #00346
                      </li>
                      <li>
                        <strong>Nature of Transaction:</strong> {record?.status}
                      </li>
                      <li>
                        <strong>Place of Service:</strong> {record?.serviceData[0]?.city}, {record?.serviceData[0]?.state} - {record?.serviceData[0]?.country}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <ul className="list-unstyled ">
                      <li>
                        <strong>Order Date:</strong> {moment(record?.serviceData[0]?.date).format('YYYY-MM-DD / HH:mm')}
                      </li>
                      <li>
                        <strong>Invoice Date:</strong> {moment(record?.timestamp).format('YYYY-MM-DD / HH:mm')}
                      </li>
                      <li>
                        <strong>Nature of Service:</strong> {record?.service}
                      </li>
                      <li>
                        <strong>State Zip Code #:</strong> {record?.serviceData[0]?.zipCode}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              {/* Row end */}
              <div className="col-sm-12 col-12">
                <div className="row mt-3">
                  <div className="col-md-8 col-sm-8 text-left">
                    <ul className="list-unstyled">
                      <li>
                        <strong>Service To :</strong> {record?.service == "Massage" || record?.service == "Stretch" ? record?.serviceData[0]?.fullName : record?.fitnessData[0]?.fullName}
                      </li>
                      <li>
                        <strong>Address:</strong> {record?.service == "Massage" ? (record?.serviceData[0]?.addressLine1 + ', ' + record?.serviceData[0]?.addressLine2) : record?.fitnessData[0]?.addressLine1}
                      </li>
                      <li>
                        <strong>GST #:</strong> ST200166544429156
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <ul className="list-unstyled ">
                      <li>
                        <strong>Payment To:</strong> Flexiva
                      </li>
                      <li>
                        <strong>Address:</strong> {record?.service === "Massage"
                          ? `${record?.serviceData[0]?.city}, ${record?.serviceData[0]?.state}`
                          : `${record?.fitnessData[0]?.city}, ${record?.fitnessData[0]?.state}`
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Row start */}
              <div className="row gx-3">
                <div className="col-12">
                  <div className="table-responsive">

                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Gross Amount</th>
                          <th>Promotional Discount</th>
                          <th>Transportation</th>
                          <th>Other Charges</th>
                          <th>Net Amount</th>
                          <th>GST {(record?.serviceData[0]?.GST *100)/record?.serviceData[0]?.netAmount}%</th>
                          <th>Other Total</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h6>{record?.service}</h6>
                            <p>
                              Complete Service for Muscle and Body Relaxing
                            </p>
                            <p>
                              Provider Assigned: <b> {record?.providerData[0] && record?.providerData[0].fullName ? record?.providerData[0].fullName : "Not Assigned"}</b>
                            </p>
                            <p>
                              BodyGuard Assigned: <b>{record?.bodyguardData && record?.bodyguardData[0]?.fullName ? record?.bodyguardData[0]?.fullName : "Not Assigned"}</b>
                            </p>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.cost}</h6>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.discount}.00</h6>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.transportation}.00</h6>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.otherExpense}.00</h6>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.netAmount}</h6>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.GST}</h6>
                          </td>
                          <td>
                            <h6>0.00</h6>
                          </td>
                          <td>
                            <h6>{record?.serviceData[0]?.totalAmount}</h6>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={6}>Total</td>

                          <td>
                            <h5 className="text-blue">{record?.serviceData[0]?.GST}</h5>
                          </td>
                          <td>
                            <h5 className="text-blue">0.00</h5>
                          </td>
                          <td>
                            <h5 className="text-blue">{record?.serviceData[0]?.totalAmount} </h5>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={10}>
                            <h6 className="text-red">Amount in Words</h6>
                            <small>
                              {/* {record?.cost + 100 + 80 + 80 + 336+ record?.cost * 17 /100 } */}
                              {record ? <AmountInWords amount={record?.serviceData[0]?.totalAmount} /> : "loading..."}
                              {/* Twenty Three Thousand and Sixty Rupees Only. */}
                            </small>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={6} style={{ border: "none" }} />
                          <td colSpan={3} style={{ border: "none" }}>
                            <h3 className="mt-5">Authorized Signature</h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Row end */}
              {/* Row start */}
              <div className="row gx-3">
                <div className="col-sm-12 col-12">
                  <div className="text-end">
                    <button className="btn btn-outline-success">Download</button>
                    <button className="btn btn-outline-success ms-1">Print</button>
                    {/* {"{"}
                {"{"}--{" "}
                <button className="btn btn-success ms-1">Pay Now</button> --
                {"}"}
                {"}"} */}
                  </div>
                </div>
              </div>
              {/* Row end */}
            </div>
          </div>
        </div>
      </div>
      {/* Row end */}
    </div>


  )
}
