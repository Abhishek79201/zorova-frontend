import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteMember, getMembers } from '../../features/adminSlicer';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import loadingGif from '../../../loading1.gif';

const Members = () => {

    const dispatch = useDispatch();
    const [modelData, setModalData] = useState();
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [reason, setReason] = useState('');
    const memberStateData = useSelector((state) => state.admin.members.filter((item) => item.status == "Approve"));
    const loading=useSelector((state)=>state.admin.loading);


    useEffect(() => {
        dispatch(getMembers());
        setTriggerFetch(false);
    }, [triggerFetch]);

    useEffect(() => {
        // if (stateClients.length > 0) {
            new DataTable('#data-table', {
                // config options...
            });
    }, []);
    
    const handleModalData = (data) => {
        if (data.familyMembers && data.familyMembers.length > 0) {
            // Initialize an empty object to hold combined properties
            const combinedObject = {};

            // Iterate through the array and combine properties into the combined object
            // Iterate through the array and merge each object into the combined object
            data.familyMembers.forEach((member, index) => {
                combinedObject[`${index + 1} person name`] = member[`name${index + 1}`];
                combinedObject[`${index + 1} person DOB`] = member[`dob${index + 1}`];
                combinedObject[`${index + 1} person gender`] = member[`gender${index + 1}`];
            });



            const otherDataObject = {
                'Full Name': `${data.fullName}`,
                'Date of Birth': `${data.dob}`,
                'Gender': `${data.gender}`,
                'Email': `${data.email}`,
                'Contact': `${data.phone}`,
                'Alternate Contact': `${data.phone}`,
                'Address Line 1': `${data.addressLine1}`,
                'Address Line 2': `${data.addressLine2}`,
                'City': `${data.fullName}`,
                'State/Province/Region': `${data.state}`,
                'Zip/Postal Code': `${data.zipCode}`,
                'Membership Type': `${data.membershipType}`,
                'Cost': `${data.cost}`
            }
            console.log(combinedObject);
            setModalData({ ...otherDataObject, ...combinedObject });
        } else {
            setModalData({
                'Full Name': `${data.fullName}`,
                'Date of Birth': `${data.dob}`,
                'Gender': `${data.gender}`,
                'Email': `${data.email}`,
                'Contact': `${data.phone}`,
                'Alternate Contact': `${data.phone}`,
                'Address Line 1': `${data.addressLine1}`,
                'Address Line 2': `${data.addressLine2}`,
                'City': `${data.fullName}`,
                'State/Province/Region': `${data.state}`,
                'Zip/Postal Code': `${data.zipCode}`,
                'Membership Type': `${data.membershipType}`,
                'Cost': `${data.cost}`,
            })
        }

    }

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: `Are you sure you want to delete member?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, Delete`
        });

        if (swalResult.isConfirmed) {
            dispatch(deleteMember({ id })).then((result) => {
                if (!result.error) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Partner Deleted Successfully!'
                    });
                    setTriggerFetch(true);
                };
            });
        } else {
            return null;
        }
    }

    // Sample data as an object
    const franchiseDetails = {
        'Full Name': 'Alex Nixon',
        'Date of Birth': '01-01-1985',
        'Gender': 'Male',
        'Email': 'izaid@gmail.com',
        'Contact': '+913-148-60985',
        'Alternate Contact': '+913-148-60985',
        'Address Line 1': 'Cras ma, dapibus ac ',
        'Address Line 2': 'dapibus. Morbi ',
        'City': 'dapibus. Morbi ',
        'State/Province/Region': 'dap Morbi ',
        'Zip/Postal Code': '10051',
        'Membership Type': 'Individual (Monthly)',
        'Cost': 5000,
        'Prefered Location': "Morbuis Democareted",
        '1st Person Name': "-",
        '1st Person Date of Birth': "-",
        '1st Person Gender': "-",
        '2nd Person Name': "-",
        '2nd Person Date of Birth': "-",
        '2nd Person Gender': "-",
    };

    const franchiseData = [
        {
            fullname: 'John Doe',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            Gender: 'Male',
            membership: 'Monthly (Individual)',
            cost: 5000,
            status: 'Paid',
            address: '61-B/d, St 2, Muzaffarpur Bihar.',
        },
        {
            fullname: 'Alex Nxon',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            Gender: 'Male',
            membership: 'Monthly (Individual)',
            cost: 500,
            status: 'Paid',
            address: '61-B/d, St 2, Muzaffarpur Bihar.',
        },
        {
            fullname: 'Amy Virk',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            Gender: 'Male',
            membership: 'Monthly (Individual)',
            cost: 5000,
            status: 'Paid',
            address: '61-B/d, St 2, Muzaffarpur Bihar.',
        }
    ];

    let serialNumber = 1;

    return (
        <>
            <div className="main-content container">
                <div className="page-header">
                    <div>
                        <span className="h2">Our Members</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">
                        <div className="card shadow">
                            <div className="card-body ">
                                <div className="table-responsive">
                                    <table id="data-table" className="table table-hover w-100">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Sr #</th>
                                                <th>Full Name</th>
                                                <th>Contact</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Membership Type</th>
                                                <th>Cost</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {memberStateData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.fullName}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.gender}</td>
                                                    <td>{data.membershipType}</td>
                                                    <td>{data.cost}</td>
                                                    <td><span className="badge badge-success">{data.payStatus}</span></td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={() => { handleModalData(data) }} >View</button>
                                                        <button className="btn btn-sm btn-danger" data-toggle="modal" data-target="#scrollingModalDemo3" onClick={() => { handleDelete(data._id) }}  >Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="scrollingModalDemo2" data-keyboard="false" tabIndex="-1" aria-labelledby="scrollingModalDemo2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="scrollingModalDemo2Label">Membership Request</h4>
                            <button type="button" className="btn btn-light btn-circle dismiss" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="material-icons">close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="table-responsive">
                                    <table className="table table-striped ">
                                        <tbody>
                                            {modelData ?  Object.entries(modelData).map(([label, value]) => (
                                                <tr key={label}>
                                                    <td className="h6">{label}</td>
                                                    <td style={{ width: '240px !important' }}>{value}</td>
                                                </tr>
                                            )):null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Members;
