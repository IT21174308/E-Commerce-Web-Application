import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';
import { Modal, Button, Form } from 'react-bootstrap';

// Initial products data
const initialProducts = [
    {
        productId: "P001",
        productName: "Product A",
        stock: 10, // Initial stock quantity
    },
    {
        productId: "P002",
        productName: "Product B",
        stock: 15, // Initial stock quantity
    },
    {
        productId: "P003",
        productName: "Product C",
        stock: 5, // Initial stock quantity
    },
    {
        productId: "P004",
        productName: "Product D",
        stock: 20, // Initial stock quantity
    }
];

function StockList() {
    const [products, setProducts] = useState(initialProducts);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [newStock, setNewStock] = useState('');

    // Handle update stock modal
    const handleEditStock = (index) => {
        const productToEdit = products[index];
        setSelectedProductIndex(index);
        setNewStock(productToEdit.stock);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProductIndex(null);
    };

    const handleUpdateStock = () => {
        let updatedProducts = [...products];
        updatedProducts[selectedProductIndex].stock = newStock; // Update stock quantity

        setProducts(updatedProducts);
        setShowModal(false);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-row flex-grow-1">
                <Sidebar />
                <div className="container mt-5 flex-grow-1">
                    <h2>Stock Management</h2>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="my-orders" role="tabpanel">
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <table className="table table-striped mt-3">
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Product Name</th>
                                                <th>Stock</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, index) => (
                                                <tr key={index}>
                                                    <td>{product.productId}</td>
                                                    <td>{product.productName}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm me-2"
                                                            onClick={() => handleEditStock(index)}
                                                        >
                                                            <i className="fa fa-pencil text-warning"></i> 
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
                </div>
            </div>

            {/* Update Stock Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Stock Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            placeholder="Enter new stock quantity"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateStock}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
}

export default StockList;
