// VendorDashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function VendorDashboard() {
    return (
        <div className="container mt-5">
            <h2>Vendor Dashboard</h2>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Products</h5>
                            <p className="card-text">15 Products</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pending Orders</h5>
                            <p className="card-text">5 Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorDashboard;
