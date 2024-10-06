import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import Header from '../components/header'; // Adjust the import path as necessary
import Footer from '../components/footer'; // Adjust the import path as necessary
import Sidebar from '../components/sidebar'; // Adjust the import path as necessary
import { Modal, Button } from 'react-bootstrap'; // Import necessary Bootstrap components

// Dummy order data
const initialOrders = [
    { orderId: "O001", customerName: "John Doe", status: "Processing", totalAmount: "$100", comments: "Fast delivery", date: "2024-10-01" },
    { orderId: "O002", customerName: "Jane Smith", status: "Dispatched", totalAmount: "$150", comments: "Gift wrap", date: "2024-10-02" },
    { orderId: "O003", customerName: "Alice Brown", status: "Processing", totalAmount: "$200", comments: "Urgent", date: "2024-10-03" }
];

function OrderManagement() {
    const [orders, setOrders] = useState(initialOrders);
    const [activeTab, setActiveTab] = useState('view'); // Default active tab
    const [newOrder, setNewOrder] = useState({
        orderId: '',
        customerName: '',
        status: 'Processing', // Default status
        totalAmount: '',
        comments: '',
        date: new Date().toISOString().slice(0, 10) // Default to current date
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const handleOrderInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleAddOrder = () => {
        setOrders([...orders, newOrder]);
        setNewOrder({ orderId: '', customerName: '', status: 'Processing', totalAmount: '', comments: '', date: new Date().toISOString().slice(0, 10) }); // Reset form
        setActiveTab('view'); // Switch back to view tab
    };

    const handleUpdateOrder = (index) => {
        let orderToUpdate = orders[index];
        setSelectedOrder(orderToUpdate);
        setNewStatus(orderToUpdate.status);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const handleUpdateStatus = () => {
        let updatedOrders = [...orders];
        let orderIndex = updatedOrders.findIndex(order => order.orderId === selectedOrder.orderId);
        updatedOrders[orderIndex].status = newStatus;
        setOrders(updatedOrders);
        setShowModal(false);
    };

    const handleCancelOrder = (index) => {
        let updatedOrders = [...orders];
        if (updatedOrders[index].status !== 'Dispatched') {
            updatedOrders.splice(index, 1);
            setOrders(updatedOrders);
        } else {
            alert('Cannot cancel an order that has already been dispatched.');
        }
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
                    <h2>Order Management</h2>

                    {/* Bootstrap Tabs for Orders */}
                    <ul className="nav nav-tabs">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
                                onClick={() => setActiveTab('view')}
                                aria-controls="view-orders"
                                aria-expanded={activeTab === 'view'}
                            >
                                All Orders
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
                                onClick={() => setActiveTab('add')}
                                aria-controls="add-order"
                                aria-expanded={activeTab === 'add'}
                            >
                                Add Order
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        {/* View Orders Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === 'view' ? 'show active' : ''}`}
                            id="view-orders"
                            role="tabpanel"
                        >
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <table className="table table-striped mt-3">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Status</th>
                                                <th>Total Amount</th>
                                                <th>Comments</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.customerName}</td>
                                                    <td>{order.status}</td>
                                                    <td>{order.totalAmount}</td>
                                                    <td>{order.comments}</td>
                                                    <td>{order.date}</td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdateOrder(index)}>
                                                            Update Status
                                                        </button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleCancelOrder(index)}>
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Add Order Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === 'add' ? 'show active' : ''}`}
                            id="add-order"
                            role="tabpanel"
                        >
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <form>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="orderId" className="form-label">Order ID</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-id-badge" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="orderId" name="orderId" 
                                                        value={newOrder.orderId} 
                                                        onChange={handleOrderInputChange} 
                                                        placeholder="Enter Order ID"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="customerName" className="form-label">Customer Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-user" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="customerName" name="customerName" 
                                                        value={newOrder.customerName} 
                                                        onChange={handleOrderInputChange} 
                                                        placeholder="Enter Customer Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-money" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="totalAmount" name="totalAmount" 
                                                        value={newOrder.totalAmount} 
                                                        onChange={handleOrderInputChange} 
                                                        placeholder="Enter Total Amount"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="comments" className="form-label">Comments</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-comments" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="comments" name="comments" 
                                                        value={newOrder.comments} 
                                                        onChange={handleOrderInputChange} 
                                                        placeholder="Enter Comments"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <button type="button" className="btn btn-primary" onClick={handleAddOrder}>Add Order</button>
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

            {/* Update Status Modal */}
            {selectedOrder && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Order Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Order Status</label>
                                <select
                                    id="status"
                                    className="form-control"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdateStatus}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default OrderManagement;
