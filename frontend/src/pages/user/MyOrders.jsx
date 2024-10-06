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
        products: [
            { productId: "P001", productName: "Product A", totalAmount: "$100" },
            { productId: "P002", productName: "Product B", totalAmount: "$150" },
        ],
        vendorStatus: "Approved",
        orderStatus: "Processing",
        date: "2024-10-01",
        customerAddress: "123 Main St, Cityville",
        customerMobile: "123-456-7890"
    },
    {
        orderId: "O002",
        products: [{ productId: "P003", productName: "Product C", totalAmount: "$200" }],
        vendorStatus: "Approved",
        orderStatus: "Dispatched",
        date: "2024-10-02",
        customerAddress: "456 Oak St, Townsville",
        customerMobile: "098-765-4321"
    },
    {
        orderId: "O003",
        products: [{ productId: "P004", productName: "Product D", totalAmount: "$250" }],
        vendorStatus: "Pending",
        orderStatus: "Processing",
        date: "2024-10-03",
        customerAddress: "789 Pine St, Villagetown",
        customerMobile: "555-123-4567"
    }
];

function MyOrders() {
    const [orders, setOrders] = useState(initialOrders);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

    // Handle update order modal
    const handleUpdateOrder = (index) => {
        const orderToUpdate = orders[index];
        if (orderToUpdate.orderStatus === 'Dispatched') {
            alert('Cannot update billing details for an order that has already been dispatched.');
            return;
        }
        setSelectedOrderIndex(index);
        setNewStatus(orderToUpdate.orderStatus);
        setCustomerAddress(orderToUpdate.customerAddress);
        setCustomerMobile(orderToUpdate.customerMobile);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrderIndex(null);
    };

    const handleUpdateStatus = () => {
        let updatedOrders = [...orders];
        let orderToUpdate = updatedOrders[selectedOrderIndex];
        orderToUpdate.customerAddress = customerAddress; // Update customer address
        orderToUpdate.customerMobile = customerMobile; // Update customer mobile
        orderToUpdate.orderStatus = newStatus; // Update order status

        setOrders(updatedOrders);
        setShowModal(false);
    };

    // Handle delete order modal
    const handleCancelOrder = (index) => {
        setSelectedOrderIndex(index);
        setShowDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        let updatedOrders = [...orders];
        if (updatedOrders[selectedOrderIndex].orderStatus !== 'Dispatched') {
            console.log('Delete Reason:', deleteReason);
            updatedOrders.splice(selectedOrderIndex, 1);
            setOrders(updatedOrders);
        } else {
            alert('Cannot cancel an order that has already been dispatched.');
        }
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
                    <h2>My Orders</h2>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="my-orders" role="tabpanel">
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <table className="table table-striped mt-3">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Product ID</th>
                                                <th>Product Name</th>
                                                <th>Total</th>
                                                <th>Vendor Status</th>
                                                <th>Order Status</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => {
                                                const orderTotal = order.products.reduce((sum, product) => {
                                                    const price = parseFloat(product.totalAmount.replace('$', ''));
                                                    return sum + price;
                                                }, 0);

                                                return (
                                                    <tr key={index}>
                                                        <td>{order.orderId}</td>
                                                        <td>
                                                            {order?.products?.map((product) => (
                                                                <div key={product.productId}>
                                                                    <p>{product.productId}</p>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {order?.products?.map((product) => (
                                                                <div key={product.productId}>
                                                                    <p>{product.productName}</p>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            <p>${orderTotal.toFixed(2)}</p>
                                                        </td>
                                                        <td>{order.vendorStatus}</td>
                                                        <td>{order.orderStatus}</td>
                                                        <td>{order.date}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm me-2"
                                                                onClick={() => handleUpdateOrder(index)}
                                                                disabled={order.orderStatus === 'Dispatched'}
                                                            >
                                                                <i className="fa fa-pencil text-warning"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm"
                                                                onClick={() => handleCancelOrder(index)}
                                                                disabled={order.orderStatus === 'Dispatched'}
                                                            >
                                                                <i className="fa fa-trash text-danger"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Customer Details Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Customer Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={customerMobile}
                            onChange={(e) => setCustomerMobile(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateStatus}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

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

export default MyOrders;
