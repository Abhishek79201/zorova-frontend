import React,{ useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import "./Datatables.css"
import { useDispatch, useSelector } from 'react-redux';
import { getBodyguards } from '../../features/employeeSlicer';
import moment from "moment";

export default function AllCaptains() {

  const dispatch=useDispatch();

  const [assignedOrders,setAssignedOrder]=useState([]);
  const loading = useSelector((state) => state.employee.loading);
  const getStateBodyguards = useSelector((state) => state.employee.bodyguards);
  const [bodyguards, setBodyguards]=useState(getStateBodyguards || []);

  useEffect(()=>{
    dispatch(getBodyguards()).then((result)=>{
      if(!result.error){
        setBodyguards(result.payload);
      }
    });
  },[]);

    const columns = [
      { name: 'Sr #', selector: (row, index) => <div className="tableSrCell">{(index + 1).toString()}</div>, sortable: true },
      { name: 'Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true,  style: { padding: 0, margin: 0 }},
      // { name: 'Profile Photo', selector: row => row.fullName, sortable: true, style: { padding: 0, margin: 0 } },  
      { name: 'Name', selector: row => row.fullName, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Email', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Joining Date', selector: row => moment(row.timestamp).format("YYYY/MM/DD"), sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Contact', selector: row => row.phone, sortable: true, style: { padding: 0, margin: 0 } },
        
      ];
    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
      setSearchText(e.target.value.toLowerCase());
  
    };
  
    const handleResetSearch = () => {
      setSearchText('');
    };
  
    const filteredData = bodyguards?.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return (
        <div className="container-fluid">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-header">
                <h4 className="card-title">All Captains</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div className="border-dark rounded-3 ">
                    <div className="table-responsive">
    
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
      );
}
