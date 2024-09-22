import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients } from '../../features/adminSlicer';
import moment from 'moment';
import loadingGif from '../../../loading1.gif';




const AllClients = () => {


    const dispatch = useDispatch();
    const loading = useSelector((state) => state.admin.loading);
    const [users, setUsers] = useState([
        {
            fullname: 'John Doe',
            joining: 'Oct 20, 2023',
            contact: '+1234567890',
            email: 'johndoe@example.com',
            gender: 'Male',
            city: 'New York',
            membership: 'Gold',
            totalOrders: 25
        },
        {
            fullname: 'Jane Smith',
            joining: 'Oct 20, 2023',
            contact: '+9876543210',
            email: 'janesmith@example.com',
            gender: 'Female',
            city: 'Los Angeles',
            membership: 'Silver',
            totalOrders: 12
        },
        {
            fullname: 'Robert Johnson',
            joining: 'Oct 20, 2023',
            contact: '+4567890123',
            email: 'robertjohnson@example.com',
            gender: 'Male',
            city: 'Chicago',
            membership: 'Platinum',
            totalOrders: 35
        }
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const handleViewDetails = (data) => {
        setSelectedUser(
            {
                'Full Name': `${data.fullName}`,
                'Date of Birth': `${data.dob}`,
                'Gender': `${data.gender}`,
                'Email': `${data.email}`,
                'Contact': `${data.phone}`,
                'Address Line 1': `${data.addressLine1}`,
                'Address Line 2': `${data.addressLine2}`,
                'City': `${data.city}`,
                'State / Province / Region': `${data.state}`,
                'Zip Code': `${data.zipcode}`,
                'Membership Type': `${data.membership}`
            }
        );
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    const stateClients = useSelector((state) => state.admin.clients);
    useEffect(() => {
        dispatch(getAllClients());
    }, []);

    useEffect(() => {
        // if (stateClients.length > 0) {
            new DataTable('#data-table', {
                // config options...
            });
    }, []);

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Users</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id='data-table' className="table table-hover w-100">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Full Name</th>
                                            <th>Joining Date</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>City</th>
                                            <th>Membership Type</th>
                                            <th>Total Orders</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {stateClients.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.timestamp ? moment(user.timestamp).format("YYYY-MM-DD") : "old record"}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.gender}</td>
                                                    <td>{user.city}</td>
                                                    <td>{user.membership ? user.membership : "N/A"}</td>
                                                    <td>{user.appointmentsCount}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={() => handleViewDetails(user)}>View</button>
                                                        <button className="btn btn-sm btn-warning">Edit</button>
                                                        <button className="btn btn-sm btn-danger">Delete</button>
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
            {/* <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Membership Request</h4>
                                <button type="button" className="btn btn-light btn-circle" onClick={handleModalClose}>
                                    <span className="material-icons">close</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr><td>Full Name</td><td>{selectedUser.fullname}</td></tr>
                                                <tr><td>Contact</td><td>{selectedUser.contact}</td></tr>
                                                <tr><td>Email</td><td>{selectedUser.email}</td></tr>
                                                <tr><td>Gender</td><td>{selectedUser.gender}</td></tr>
                                                <tr><td>City</td><td>{selectedUser.city}</td></tr>
                                                <tr><td>Membership Type</td><td>{selectedUser.membership}</td></tr>
                                                <tr><td>Total Orders</td><td>{selectedUser.totalOrders}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div> */}

            <div className="modal fade" id="scrollingModalDemo2" data-keyboard="false" tabIndex="-1" aria-labelledby="scrollingModalDemo2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="scrollingModalDemo2Label">Service Provider</h4>
                            <button type="button" className="btn btn-light btn-circle dismiss" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="material-icons">close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="table-responsive">
                                    <table className="table table-striped ">
                                        <tbody>
                                            {selectedUser ? Object.entries(selectedUser).map(([label, value]) => (
                                                <tr key={label}>
                                                    <td className="h6">{label}</td>
                                                    <td style={{ width: '240px !important' }}>{label == "Certificate or License" || label == "Aadhar Card" || label == "Profile Photo" ? <img src={value} alt="no image" height={100} width={200} /> : value}</td>
                                                </tr>
                                            )) : null}
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
        </div>
    );
};

export default AllClients;
