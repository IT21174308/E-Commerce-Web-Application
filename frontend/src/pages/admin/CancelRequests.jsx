import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';
import { Modal, Button, Form } from 'react-bootstrap';

// Initial orders data
const initialOrders = [
    {
        orderId: "O001",
        cancelReason: 'no need' // New field for cancellation reason
    },
    {
        orderId: "O002",
        cancelReason: 'mistake' // New field for cancellation reason
    },
    {
        orderId: "O003",
        cancelReason: 'ordered twice' // New field for cancellation reason
    }
];

function CancelRequests() {
    const [orders, setOrders] = useState(initialOrders);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
    const [deleteReason, setDeleteReason] = useState('');

    // Handle delete order modal
    const handleCancelOrder = (index) => {
        setSelectedOrderIndex(index);
        setShowDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        let updatedOrders = [...orders];
        const orderToDelete = updatedOrders[selectedOrderIndex];

        // Store cancellation reason
        orderToDelete.cancelReason = deleteReason; 

        // Remove the order from the list
        updatedOrders.splice(selectedOrderIndex, 1);
        setOrders(updatedOrders);

        setShowDeleteModal(false);
        setDeleteReason('');
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteReason('');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-row flex-grow-1">
                <Sidebar />
                <div className="container mt-5 flex-grow-1">
                    <h2>Cancel Notices</h2>
                    <div className="card mb-4" style={{ minHeight: '350px' }}>
                        <div className="card-body">
                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Cancellation Reason</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.orderId}</td>
                                            <td>{order.cancelReason || '-'}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => handleCancelOrder(index)}
                                                >
                                                    <i className="fa fa-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Order Reason Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Reason for Deleting the Order</Form.Label>
                        <Form.Control
                            type="text"
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            placeholder="Enter the reason"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteOrder}>
                        Delete Order
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
}

export default CancelRequests;
