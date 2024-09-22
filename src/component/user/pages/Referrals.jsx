import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";
import { getReferralData, getUserReferralData, requestReferralPayment } from "../../features/referralSlicer";
import UserSidebar from "../includes/sidebar";

const base_url = process.env.REACT_APP_FRONT_BASE_URL;

export default function Referrals({ user }) {

    const dispatch = useDispatch();
    const [referralData, setReferralData]= useState(user || {});
    const referralsStateData = useSelector((state) => state.referral.referrals);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const loading = useSelector((state) => state.referral.loading);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${base_url}?referralCode=${user?.referralCode}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const handleRequestPayment = async () => {
        const swalResult = await Swal.fire({
            title: 'Status Confirmation',
            text: `Are you sure you want to Request Payment?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, Request`
        });

        if (swalResult.isConfirmed) {
            dispatch(requestReferralPayment({ ids: appointment_ids, amount: user?.pendingEarning })).then((result) => {
                if (!result.error) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Request Sent Successfully!'
                    });
                    setTriggerFetch(true);
                };
            });
        } else {
            return null;
        }
    }



    // Fetch records when the component mounts
    useEffect(() => {
        dispatch(getUserReferralData());
        dispatch(getReferralData()).then((result)=>{
            if(!result.error){
                setReferralData(result.payload);
            }
        });
        setTriggerFetch(false);
    }, [triggerFetch]);


    const columns = [
        { name: 'Appintment Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true, },
        { name: 'Customer Id', selector: row => "FLX-" + row.userData[0]?._id.slice(-5).toUpperCase(), sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Name', selector: row => row.userData[0]?.fullName, sortable: true, },
        { name: 'Email', selector: row => row.userData[0]?.email, sortable: true, },
        { name: 'Phone', selector: row => row.userData[0]?.phone, sortable: true, },
        { name: 'Service Type', selector: row => row.service, sortable: true, },
        { name: 'Cost', selector: row => row.cost, sortable: true, },
        { name: 'Appointment', selector: row => row.status == "Pending" ? "No Appointment" : row.status, sortable: true, },
        {
            name: 'Payment', selector: row => row.paymentToProviderStatus, sortable: true,
        }

    ];

    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
        setSearchText(e.target.value.toLowerCase());

    };

    const handleResetSearch = () => {
        setSearchText('');
    };

    const appointment_ids = referralsStateData?.filter(item => item._id && item.paymentToReferralStatus === "Pending").map(item => item._id);

    const filteredData = referralsStateData?.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className="main-container">
            <UserSidebar user={user} />
            {/* App container starts */}
            <div className="app-container">
                {/* App hero header starts */}
                <div className="app-hero-header mb-4"></div>
                {/* App Hero header ends */}
                {/* App body starts */}
                <div className="app-body">
                    {/* Row start */}
                    <div className="row gx-3">
                        <div className="col-12">
                            {/* Row start */}
                            <div className="row">
                                <div className="col-xl-3 col-lg-6 col-12">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <div>
                                                    <h5 className="mb-4 fw-normal">Total Earning</h5>
                                                    <h1 className="fw-bold m-0 display-6">
                                                        <i className="bi bi-currency-rupee" />
                                                        {referralData?.requestedEarning + referralData?.pendingEarning}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <div>
                                                    <h5 className="mb-4 fw-normal">Withdrawn</h5>
                                                    <h1 className="fw-bold m-0 display-6">
                                                        <i className="bi bi-currency-rupee" />
                                                        {0}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <div>
                                                    <h5 className="mb-4 fw-normal">In Process (Pending)</h5>
                                                    <h1 className="fw-bold m-0 display-6">
                                                        <i className="bi bi-currency-rupee" />
                                                        {referralData?.pendingEarning}
                                                    </h1>
                                                    {referralData?.pendingEarning > 0 ?
                                                        < div className="d-flex justify-content-between flex-column" onClick={handleRequestPayment} >
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="text-primary text-decoration-none d-flex align-items-center mt-0"
                                                            >
                                                                Request to withdraw Now <i className="bi bi-caret-right-fill fs-4" />
                                                            </a>
                                                        </div>
                                                        : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <div>
                                                    <h5 className="mb-4 fw-normal">Requested to Withdraw</h5>
                                                    <h1 className="fw-bold m-0 display-6">
                                                        <i className="bi bi-currency-rupee" />
                                                         {referralData?.requestedEarning}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Row end */}
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h4 className="card-title">Referral Code: {user.referralCode} <i onClick={copyToClipboard} className={`${copied ? `bi bi-check-circle-fill text-primary` : `bi bi-link text-primary`}`} style={{ fontSize: "20px" }}></i></h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className="border-dark rounded-3">
                                            <div className="input-group mb-3 w-25" style={{ float: 'right' }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="searchButton"
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                />
                                                <button className="btn btn-danger" type="button" id="searchButton" onClick={handleResetSearch}>X</button>
                                            </div>

                                            {loading ? "loading..." :
                                                <DataTable
                                                    columns={columns}
                                                    data={filteredData}
                                                    pagination
                                                    paginationTotalRows={filteredData?.length}


                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div >

    )
}
