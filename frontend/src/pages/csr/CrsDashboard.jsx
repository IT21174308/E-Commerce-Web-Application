// CSRDashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CSRDashboard() {
    return (
        <div className="container mt-5">
            <h2>CSR Dashboard</h2>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pending Requests</h5>
                            <p className="card-text">3 Cancellation Requests</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pending Orders</h5>
                            <p className="card-text">7 Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CSRDashboard;
