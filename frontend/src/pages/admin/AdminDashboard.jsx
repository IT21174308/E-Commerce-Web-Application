import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import Header from '../../components/header'; // Adjust the import path as necessary
import Footer from '../../components/footer'; // Adjust the import path as necessary
import Sidebar from '../../components/sidebar'; // Adjust the import path as necessary

// Dummy vendor data
const initialVendors = [
    { name: "Vendor 1", email: "vendor1@example.com", mobile: "123-456-7890", userId: "V001", comments: "First vendor comments", location: "Location 1" },
    { name: "Vendor 2", email: "vendor2@example.com", mobile: "234-567-8901", userId: "V002", comments: "Second vendor comments", location: "Location 2" },
    { name: "Vendor 3", email: "vendor3@example.com", mobile: "345-678-9012", userId: "V003", comments: "Third vendor comments", location: "Location 3" },
    { name: "Vendor 4", email: "vendor4@example.com", mobile: "456-789-0123", userId: "V004", comments: "Fourth vendor comments", location: "Location 4" },
    { name: "Vendor 5", email: "vendor5@example.com", mobile: "567-890-1234", userId: "V005", comments: "Fifth vendor comments", location: "Location 5" },
];

function AdminDashboard() {
    const [vendors, setVendors] = useState(initialVendors);
    const [activeTab, setActiveTab] = useState('view'); // Default active tab
    const [newVendor, setNewVendor] = useState({
        name: '',
        email: '',
        mobile: '',
        userId: '',
        password: '', // Added password field
        comments: '',
        location: '' // Added location field
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVendor({ ...newVendor, [name]: value });
    };

    const handleAddVendor = () => {
        setVendors([...vendors, newVendor]);
        setNewVendor({ name: '', email: '', mobile: '', userId: '', password: '', comments: '', location: '' }); // Reset form
        setActiveTab('view'); // Switch back to view tab
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header Section */}
            <Header />

            <div className="d-flex flex-row">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="container mt-5 flex-grow-1">
                    <h2>Vendor Management</h2>

                    {/* Bootstrap Tabs for Vendors */}
                    <ul className="nav nav-tabs">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
                                onClick={() => setActiveTab('view')}
                                aria-controls="view-vendors"
                                aria-expanded={activeTab === 'view'}
                            >
                                All Vendors
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
                                onClick={() => setActiveTab('add')}
                                aria-controls="add-vendor"
                                aria-expanded={activeTab === 'add'}
                            >
                                Add Vendor
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        {/* View Vendors Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === 'view' ? 'show active' : ''}`}
                            id="view-vendors"
                            role="tabpanel"
                        >
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <table className="table table-striped mt-3">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Mobile</th>
                                                <th>Email</th>
                                                <th>Comments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendors.map((vendor, index) => (
                                                <tr key={index}>
                                                    <td>{vendor.userId}</td>
                                                    <td>{vendor.name}</td>
                                                    <td>{vendor.location}</td>
                                                    <td>{vendor.mobile}</td>
                                                    <td>{vendor.email}</td>
                                                    <td>{vendor.comments}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Add Vendor Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === 'add' ? 'show active' : ''}`}
                            id="add-vendor"
                            role="tabpanel"
                        >
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <form>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="vendorUserId" className="form-label">User ID</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-user" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="vendorUserId" name="userId" 
                                                        value={newVendor.userId} 
                                                        onChange={handleInputChange} 
                                                        placeholder="Enter User ID" // Added placeholder
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="vendorName" className="form-label">Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-id-card" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="vendorName" name="name" 
                                                        value={newVendor.name} 
                                                        onChange={handleInputChange} 
                                                        placeholder="Enter Vendor Name" // Added placeholder
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="vendorEmail" className="form-label">Email</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="email" className="form-control" id="vendorEmail" name="email" 
                                                        value={newVendor.email} 
                                                        onChange={handleInputChange} 
                                                        placeholder="Enter Email" // Added placeholder
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="vendorPassword" className="form-label">Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="password" className="form-control" id="vendorPassword" name="password" 
                                                        value={newVendor.password} 
                                                        onChange={handleInputChange} 
                                                        placeholder="Enter Password" // Added placeholder
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="vendorMobile" className="form-label">Mobile</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="vendorMobile" name="mobile" 
                                                        value={newVendor.mobile} 
                                                        onChange={handleInputChange} 
                                                        placeholder="Enter Mobile Number" // Added placeholder
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="vendorLocation" className="form-label">Location</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="vendorLocation" name="location" 
                                                        value={newVendor.location} 
                                                        onChange={handleInputChange} 
                                                        placeholder="Enter Location" // Added placeholder
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <button type="button" className="btn btn-primary" onClick={handleAddVendor}>Add Vendor</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default AdminDashboard;
