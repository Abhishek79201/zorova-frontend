import React,{ useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import "./Datatables.css"

export default function ProviderRating() {

    const [assignedOrders,setAssignedOrder]=useState([])

    const columns = [
      { name: 'Sr #', selector: (row, index) => <div className="tableSrCell">{(index + 1).toString()}</div>, sortable: true },
      { name: 'Provider Name', selector: row => row.fullName, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Client Name', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Comment', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Service Type', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Phone', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Rating', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        
      ];
    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
      setSearchText(e.target.value.toLowerCase());
  
    };
  
    const handleResetSearch = () => {
      setSearchText('');
    };
  
    const filteredData = assignedOrders?.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return (
        <div className="container-fluid">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-header">
                <h4 className="card-title">Provider Feedback</h4>
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
    
                      <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        paginationTotalRows={filteredData?.length}
    
    
                      />
                    </div>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
