import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffData, updateEmployee } from '../../features/adminSlicer';
import { useNavigate, useParams } from 'react-router-dom';
import { REACT_APP_BASE_URL } from '../../../config';
const base_url = REACT_APP_BASE_URL;

const UpdateEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [avatar,setAvatar]=useState("Choose File");

    const loading = useSelector(state => state.admin.loading);
    const usersStateData = useSelector(state => state.user.Users.find(user => user._id == id));
    const [employees, setEmployees] = useState(usersStateData ? usersStateData : {});
    // const [employees, setEmployees]=useState(usersStateData ? usersStateData.filter(user => user.role.toLowerCase() === "employee") : []);


    useEffect(() => {
        if (id) {
            dispatch(getStaffData()).then((result) => {
                if (!result.error) {
                    setEmployees(result.payload.find(user => user._id == id));
                }
            });
        } else {
            navigate('/admin/employees');
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployees(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setAvatar( event.target.files[0].name)   
     };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        dispatch(updateEmployee(formData)).then((result) => {
            if (!result.error) {
                navigate("/admin/employees");
            }
        });
    };

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Update Staff</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            Employee Detail
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" value={id} name='id'  />
                                <div className="mb-3">
                                    <label>Employee Name</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white">
                                                <i className="material-icons f-16">person</i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control border-left-0" name="fullName" value={employees?.fullName} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Designation</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white">
                                                <i className="material-icons f-16">credit_card</i>
                                            </span>
                                        </div>
                                        <select className="form-control" name="role" value={employees?.role} onChange={handleInputChange}>
                                            <option>Choose Designation</option>
                                            <option value="employee">Employee</option>
                                            <option value="bodyguard">Bodyguard</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Contact</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white">
                                                <i className="material-icons f-16">call</i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control border-left-0" value={employees?.phone} name="phone" onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white">
                                                <i className="material-icons f-16">email</i>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control border-left-0" name="email" value={employees?.email} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white">
                                                <i className="material-icons f-16">lock</i>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control border-left-0" name="password" placeholder='Enter new password' onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Profile Photo</label>
                                    <br />
                                    <div className='d-flex gap-3'>
                                        <div className="avatar avatar-sm ">
                                            <img src={`${base_url}/images/${employees?.avatar}`} className="avatar-img align-top rounded-circle" alt="No Avatar" />
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" name='avatar' className="custom-file-input" id="inputGroupFile02" onChange={handleFileChange} />
                                            <label className="custom-file-label" htmlFor="inputGroupFile02">{avatar}</label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;
