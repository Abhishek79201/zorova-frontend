import React, { useEffect, useState } from "react";
import UserSidebar from "../includes/sidebar";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getAppointments } from "../../features/customerSlicer";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

const events = [
  {
    title: "Massage",
    start: "2023-09-29T13:00:00",
    color: "#067e73"
    // color: "#bedefa",
  },
  {
    groupId: 999,
    title: "Stretch",
    start: "2023-09-10T16:00:00",
    color: "#e4052e",
  },
  {
    groupId: 999,
    title: "Flexiva Conference",
    start: "2023-09-16T16:00:00",
    color: "#bedefa",
  },
  {
    title: "Conference",
    start: "2023-09-11",
    end: "2023-09-13",
    color: "#f6bc02",
  },
  {
    title: "Massage",
    start: "2023-09-07T10:30:00",
    end: "2023-09-07T12:30:00",
  },
  {
    title: "Lunch",
    start: "2023-09-16T12:00:00",
    color: "#d63384",
  },
  {
    title: "Meeting",
    start: "2023-09-18T14:30:00",
    color: "#fd7e14",
  },
  {
    title: "Launch of New Franchise",
    start: "2023-09-21T17:30:00",
    color: "#6f42c1",
  },
  {
    title: "Stretch",
    start: "2023-09-01T20:00:00",
    color: "#bedefa",
  },
  {
    title: "Birthday",
    start: "2023-09-13T07:00:00",
    color: "#1a73e8",
  },
  {
    title: "Click for Discount",
    url: "http://google.com/",
    start: "2023-09-28",
    color: "#fda901",
  },
  {
    title: "Launch of New Franchise",
    start: "2023-09-20",
    color: "#e4052e",
  },
  {
    title: "Product Launch",
    start: "2023-09-29",
    color: "#dd5500",
  },

]

// function getDate(dayString) {
//   const today = new Date();
//   const year = today.getFullYear().toString();
//   let month = (today.getMonth() + 1).toString();

//   if (month.length === 1) {
//     month = "0" + month;
//   }

//   return dayString.replace("YEAR", year).replace("MONTH", month);
// }

export default function UserDashboard({ user }) {

  const dispatch = useDispatch();
  const appoinments = useSelector((state) => state.customer.Customers);
  const startedOrders = appoinments.filter(item => item.status === 'Started' ||  item.status === "Assigned");
  const loading = useSelector((state) => state.user.loading);

  const [triggerFetch, setTriggerFetch] = useState(false);


  // Fetch records when the component mounts
  useEffect(() => {
    dispatch(getAppointments());
    setTriggerFetch(false);
  }, [dispatch, triggerFetch]);

  return (
    <div className="main-container">
      <UserSidebar user={user} />

      <div className="app-container">
        <div className="app-hero-header mb-4"></div>
        <div className="app-body">
          <div className="row gx-3">
            <div className="col-xl-7 col-sm-12 col-12">
              <div
                className="card mb-3"
                style={{ height: "211px!important", border: "0px solid black" }}
              >
                <div className="card-body">
                  <div className="row align-items-end">
                    <div className="col-sm-10">

                      <h3 className="mb-4">Welcome {user?.fullName ? user?.fullName : "null"}! 🎉</h3>
                      {/* <p>
                        Coming up Appointment with{" "}
                        <span className="fw-bold">Mr. Raj </span> at
                        <span className="text-success fw-bold">
                          Thursday 21-09-2023 - 01:00 PM
                        </span>
                      </p> */}
                      {loading? "loading...":startedOrders && startedOrders?.map((item, index) => (
                        <>
                          <p className="mt-2">Coming up appointment with <b>{item.providerData[0].fullName} </b> at <b className="text-success">{ moment(item.serviceData[0]?.date).format("YYYY-MM-DD") } | {item.serviceData[0]?.start_time}</b></p>
                          <Link className="card-title" to={`/user/order-status/${item._id}`}>
                            Track Status
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row gx-3">
            <div className="col-xxl-12">
              {/* Card start */}
              <div className="card">
                <div className="card-body">
                  <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                      left: "prevYear,prev,next,nextYear today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay",
                    }}
                    initialDate="2023-09-20"
                    navLinks="true"
                    editable="false"
                    dayMaxEvents="true"
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin]}
                    events={events}
                  />
                </div>
              </div>
              {/* Card end */}
            </div>
          </div>
          {/* Row end */}
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
  );
}
