import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSosRequest, getSosRequest } from '../../features/sosSlicer';
import moment from 'moment';
import Swal from 'sweetalert2';

export default function SOS() {

    const dispatch=useDispatch();
    const sosStateRequests=useSelector((state)=>state.sos.sosRequests);
    const [SosRequests, SetSosRequest]=useState(sosStateRequests || []);
    const loading=useSelector((state)=>state.sos.loading);
    const [trigger, setTrigger]=useState(false);
    // const [SOSData, setSOSData] = useState(SosRequests);
    useEffect(()=>{
        dispatch(getSosRequest()).then((result)=>{
            if(!result.error){
                SetSosRequest(result.payload);
            }
        });
        setTrigger(false);
    },[trigger])

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
                SetSosRequest(result.payload.sosRequests);
                setTrigger(true);
            });
        } else {
            return;
        }

    }

    const columns = [
        { name: 'id #', selector: row => "SOS-" + row._id.slice(-5).toUpperCase(), sortable: true, },
        { name: 'Full Name', selector: row => row.userData[0]?.fullName, sortable: true, },
        { name: 'Contact', selector: row => row.userData[0]?.phone, sortable: true, },
        { name: 'Email', selector: row => row.userData[0]?.email, sortable: true, },
        { name: 'Email', selector: row => row.userData[0]?.gender, sortable: true, },
        { name: 'Date', selector: row => moment(row.timestamp).format("DD/MM/YYY - HH:mm:ss"), sortable: true, },
        { name: 'Delete', selector: row =>  <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(row._id) }}>Delete</button>, sortable: true, }      
    ];


   
    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
        setSearchText(e.target.value.toLowerCase());

    };

    const handleResetSearch = () => {
        setSearchText('');
    };

    const filteredData = SosRequests?.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className="container-fluid">
            <div className="main-content container">
                <div className="page-header">
                    <div>
                        <span className="h2">SOS Emergency Detail</span>

                    </div>
                </div>
                <div className="row">
                
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="table-responsive">

                                    <div className="input-group mb-3 w-25" style={{float:'right'}}>
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
                                 {loading ? "Loading...":
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

        </div>
    )
}
