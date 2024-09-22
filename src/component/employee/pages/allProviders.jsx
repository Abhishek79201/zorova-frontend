import React,{ useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import "./Datatables.css"
import { useDispatch, useSelector } from 'react-redux';
import { getProviders } from '../../features/employeeSlicer';
import moment from "moment";


export default function AllProviders() {

    const dispatch=useDispatch();
    const loading = useSelector((state) => state.employee.loading);


    const [assignedOrders,setAssignedOrder]=useState([]);
    const getStateProviders = useSelector((state) => state.employee.providers);
    const [providers, setProviders]=useState(getStateProviders || []);

    useEffect(()=>{
      dispatch(getProviders()).then((result)=>{
        if(!result.error){
          setProviders(result.payload);
        }
      });
    },[]);

    const columns = [
      { name: 'Sr #', selector: (row, index) => <div className="tableSrCell">{(index + 1).toString()}</div>, sortable: true },
      { name: 'Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true,  style: { padding: 0, margin: 0 }},
      { name: 'Name', selector: row => row.fullName, sortable: true, style: { padding: 0, margin: 0 } },
      { name: 'Email', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
      { name: 'Joining Date', selector: row => moment(row.timestamp).format("YYYY/MM/DD"), sortable: true, style: { padding: 0, margin: 0 } },
      { name: 'Contact', selector: row => row.phone, sortable: true, style: { padding: 0, margin: 0 } },
      { name: 'Gender', selector: row => row.gender.charAt(0).toUpperCase()+row.gender.slice(1) , sortable: true, style: { padding: 0, margin: 0 } },
      // { name: 'Total Revenue', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
      // { name: 'Credited', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
      // { name: 'Pending', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
      // { name: 'Year of Experience', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
      // { name: 'Order Accepted', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
      { name: 'Order Rejected', selector: row => row.rejectedOrders, sortable: true, style: { padding: 0, margin: 0 } }, 
      ];
    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
      setSearchText(e.target.value.toLowerCase());
  
    };
  
    const handleResetSearch = () => {
      setSearchText('');
    };
  
    const filteredData = providers?.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return (
        <div className="container-fluid">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-header">
                <h4 className="card-title">All Providers</h4>
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
                      {loading ? "loading...":
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
