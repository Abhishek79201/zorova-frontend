import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSosRequest, getSosRequest } from '../../features/sosSlicer';
import moment from 'moment';
import Swal from 'sweetalert2';
import loadingGif from '../../../loading1.gif';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTables from 'datatables.net';


const SOS = () => {

    const dispatch = useDispatch();
    const sosStateRequests = useSelector((state) => state.sos.sosRequests);
    const loading = useSelector((state) => state.sos.loading);
    const [trigger, setTrigger] = useState(false);
    // const [SOSData, setSOSData] = useState(SosRequests);
    useEffect(() => {
        dispatch(getSosRequest());
        setTrigger(false);
    }, [trigger]);

    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to Delete this SOS Request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        });

        if (swalResult.isConfirmed) {
            dispatch(deleteSosRequest(id)).then((result) => {
                setTrigger(true);
            });
        } else {
            return;
        }

    }

    const [data, setData] = useState([
        { fullname: 'John Doe', contact: '+91231943621', email: 'anyexample@ex.com', gender: 'Male', membership: 'Monthly (Individual)', cost: 5000, status: 'Paid', address: '61-B/d, St 2, Muzaffarpur Bihar.' },
        { fullname: 'John Doe', contact: '+91231943621', email: 'anyexample@ex.com', gender: 'Male', membership: 'Monthly (Individual)', cost: 5000, status: 'Paid', address: '61-B/d, St 2, Muzaffarpur Bihar.' },
        { fullname: 'John Doe', contact: '+91231943621', email: 'anyexample@ex.com', gender: 'Male', membership: 'Monthly (Individual)', cost: 5000, status: 'Paid', address: '61-B/d, St 2, Muzaffarpur Bihar.' },
        { fullname: 'John Doe', contact: '+91231943621', email: 'anyexample@ex.com', gender: 'Male', membership: 'Monthly (Individual)', cost: 5000, status: 'Paid', address: '61-B/d, St 2, Muzaffarpur Bihar.' },
        { fullname: 'Alex Nxon', contact: '+91231943621', email: 'anyexample@ex.com', gender: 'Male', membership: 'Monthly (Individual)', cost: 500, status: 'Paid', address: '61-B/d, St 2, Muzaffarpur Bihar.' },
        { fullname: 'Amy Virk', contact: '+91231943621', email: 'anyexample@ex.com', gender: 'Male', membership: 'Monthly (Individual)', cost: 5000, status: 'Paid', address: '61-B/d, St 2, Muzaffarpur Bihar.' },
    ]);

    return (

        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">SOS</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
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
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {sosStateRequests.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.userData[0]?.fullName}</td>
                                                    <td>{item.userData[0]?.phone}</td>
                                                    <td>{item.userData[0]?.email}</td>
                                                    <td>{item.userData[0]?.gender}</td>
                                                    <td>{"Monthly (Individual)"}</td>
                                                    <td><button className="btn btn-sm btn-danger" onClick={() => { handleDelete(item._id) }}>Delete</button></td>
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

    );
};

export default SOS;
