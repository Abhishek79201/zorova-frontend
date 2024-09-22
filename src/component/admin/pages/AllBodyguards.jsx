import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { REACT_APP_BASE_URL } from '../../../config';
import Swal from 'sweetalert2';
import { deleteEmployee, getStaffData } from '../../features/adminSlicer';
import loadingGif from '../../../loading1.gif';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTables from 'datatables.net';
const base_url = REACT_APP_BASE_URL;

const AllBodyguards = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.admin.loading);
    const usersStateData = useSelector(state => state.admin.Users);
    const [bodyguards, setBodyguards] = useState(usersStateData ? usersStateData.filter(user => user.role.toLowerCase() === "bodyguard") : []);
    const [trigger, setTrigger] = useState(false);


    useEffect(() => {
        dispatch(getStaffData()).then((result) => {
            if (!result.error) {
                setBodyguards(result.payload.filter(user => user.role.toLowerCase() === "bodyguard"));
            }
        });
        setTrigger(false);
    }, [trigger]);

    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to Delete?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        });

        if (swalResult.isConfirmed) {
            dispatch(deleteEmployee(id)).then((result) => {
                setTrigger(true);
            });
        } else {
            return;
        }
    }

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">All Employees</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover w-100" id="data-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Profile Picture</th>
                                            <th>Full Name</th>
                                            <th>Employee Code</th>
                                            <th>Joining Date</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {bodyguards.map((employee, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="avatar bg-primary">
                                                            <img src={`${base_url}/images/${employee.avatar}`} className="avatar-img rounded-circle" alt="Avatar" />
                                                        </div>
                                                    </td>
                                                    <td>{employee.fullName}</td>
                                                    <td># {employee._id.slice(-5).toUpperCase()}</td>
                                                    <td>{moment(employee.timestamp).format("YYYY-MM-DD")}</td>
                                                    <td>{employee.phone}</td>
                                                    <td>{employee.email}</td>
                                                    <td>{employee.password}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary">Edit</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
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
    );
};

export default AllBodyguards;
