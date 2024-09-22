import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../features/adminSlicer';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [avatar,setAvatar]=useState("Choose File");

    const [employeeDetails, setEmployeeDetails] = useState({
        fullName: '',
        role: '',
        phone: '',
        email: '',
        password: '',
        avatar: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployeeDetails(prevDetails => ({
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
        dispatch(createEmployee(formData)).then((result)=>{
            if(!result.error){
                navigate("/admin/employees");
            }
        });
        // Here you would typically handle the form submission to a backend server
    };

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Add Staff</span>
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
                                <div className="mb-3">
                                    <label>Employee Name</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white">
                                                <i className="material-icons f-16">person</i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control border-left-0" name="fullName" required onChange={handleInputChange} />
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
                                        <select className="form-control" name="role" onChange={handleInputChange}>
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
                                        <input type="text" className="form-control border-left-0" name="phone" required onChange={handleInputChange} />
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
                                        <input type="email" className="form-control border-left-0" name="email" required onChange={handleInputChange} />
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
                                        <input type="password" className="form-control border-left-0" name="password" required onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Profile Photo</label>
                                    <div className="custom-file">
                                        <input type="file" name='avatar' className="custom-file-input" id="inputGroupFile02" onChange={handleFileChange} />
                                        <label className="custom-file-label" htmlFor="inputGroupFile02">{avatar}</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
