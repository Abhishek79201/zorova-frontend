import React from 'react'

export default function Transactions() {
  return (
    <div className="container-fluid">
    <div className="col-12">
      <div className="card mb-3">
        <div className="card-header">
          <h4 className="card-title">Transaction</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="border border-dark rounded-3">
              <table className="table align-middle table-striped table-hover m-0">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#00001</td>
                    <td className="h6">06/10/2023</td>
                    <td>5500</td>
                    <td>
                      <button className="btn btn-info btn-lg badge badge-info">
                        Processing
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#00002</td>
                    <td className="h6">27/08/2023</td>
                    <td>10500</td>
                    <td>
                      <button className="btn btn-success btn-lg badge badge-success">
                        Completed
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#00003</td>
                    <td className="h6">25/08/2023</td>
                    <td>8800</td>
                    <td>
                      <button className="btn btn-success btn-lg badge badge-success">
                        Completed
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#00004</td>
                    <td className="h6">27/06/2023</td>
                    <td>15500</td>
                    <td>
                      <button className="btn btn-success btn-lg badge badge-success">
                        Completed
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}
