import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';
import bagImage from '../../assets/bag.webp';

// Dummy cart data
const initialCartItems = [
    { productId: "P001", productName: "Product 1", price: 100, quantity: 2, image: bagImage, selected: false },
    { productId: "P002", productName: "Product 2", price: 150, quantity: 1, image: bagImage, selected: false },
    { productId: "P003", productName: "Product 3", price: 200, quantity: 3, image: bagImage, selected: false }
];

function MyCart() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        shippingAddress: '',
        mobileNumber: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });
    const [paymentError, setPaymentError] = useState({
        name: false,
        shippingAddress: false,
        mobileNumber: false,
        cardNumber: false,
        expirationDate: false,
        cvv: false
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return item.selected ? total + item.price * item.quantity : total;
        }, 0);
    };

    const handleRemoveItem = (index) => {
        let updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const handleQuantityChange = (index, newQuantity) => {
        let updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
    };

    const handleConfirmPurchase = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length > 0) {
            setShowPaymentModal(true);
        } else {
            alert('Please select items to purchase.');
        }
    };

    const handleCheckboxChange = (index) => {
        let updatedCart = [...cartItems];
        updatedCart[index].selected = !updatedCart[index].selected;
        setCartItems(updatedCart);
    };

    const handlePaymentSubmit = () => {
        const { name, shippingAddress, mobileNumber, cardNumber, expirationDate, cvv } = paymentDetails;

        // Validate form fields
        let error = {
            name: !name.trim(),
            shippingAddress: !shippingAddress.trim(),
            mobileNumber: !mobileNumber.trim(),
            cardNumber: !/^\d{16}$/.test(cardNumber), // Check for 16 digits
            expirationDate: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate), // Check for MM/YY format
            cvv: !/^\d{3}$/.test(cvv) // Check for 3 digits
        };
        setPaymentError(error);

        // If no errors, proceed with the payment
        if (!error.name && !error.shippingAddress && !error.mobileNumber && !error.cardNumber && !error.expirationDate && !error.cvv) {
            setPaymentSuccess(true);
            setShowPaymentModal(false);
            setCartItems(cartItems.filter(item => !item.selected));
        }
    };

    const isCartEmpty = cartItems.every(item => !item.selected) || cartItems.length === 0;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <div className="d-flex flex-row flex-grow-1">
                <Sidebar />

                <div className="container mt-5 flex-grow-1">
                    <h2>My Cart</h2>

                    {paymentSuccess && (
                        <Alert variant="success" onClose={() => setPaymentSuccess(false)} dismissible>
                            Payment confirmed! Thank you for your order.
                        </Alert>
                    )}

                    <div className="card mb-4" style={{ minHeight: '350px' }}>
                        <div className="card-body">
                            {cartItems.length > 0 ? (
                                <table className="table table-striped mt-3">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Item Image</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.selected}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                </td>
                                                <td><img src={item.image} alt={item.productName} width="60" /></td>
                                                <td>{item.productName}</td>
                                                <td>${item.price}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="form-control"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                        style={{ width: '100px' }}
                                                    />
                                                </td>
                                                <td>
                                                    <button className="btn btn-link" onClick={() => handleRemoveItem(index)}>
                                                        <i className="fa fa-trash fa-lg text-danger" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Your cart is empty.</p>
                            )}

                            {cartItems.length > 0 && !isCartEmpty && (
                                <div className="d-flex justify-content-end align-items-center">
                                    <h4 className="me-3">Total: ${calculateTotalPrice()}</h4>
                                    <button className="btn btn-primary" onClick={handleConfirmPurchase}>
                                        Confirm Purchase
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Payment Details */}
            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Total: Rs. {calculateTotalPrice()}</p>

                    <Form.Group controlId="paymentName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={paymentDetails.name}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                            isInvalid={paymentError.name}
                        />
                        <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="paymentAddress" className="mt-3">
                        <Form.Label>Shipping Address:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter shipping address"
                            value={paymentDetails.shippingAddress}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, shippingAddress: e.target.value })}
                            isInvalid={paymentError.shippingAddress}
                        />
                        <Form.Control.Feedback type="invalid">Shipping address is required.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="paymentMobile" className="mt-3">
                        <Form.Label>Mobile Number:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mobile number"
                            value={paymentDetails.mobileNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, mobileNumber: e.target.value })}
                            isInvalid={paymentError.mobileNumber}
                        />
                        <Form.Control.Feedback type="invalid">Mobile number is required.</Form.Control.Feedback>
                    </Form.Group>

                    {/* Card Number Field */}
                    <Form.Group controlId="cardNumber" className="mt-3">
                        <Form.Label>Card Number:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your card number"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                            isInvalid={paymentError.cardNumber}
                        />
                        <Form.Control.Feedback type="invalid">Card number is required and must be 16 digits.</Form.Control.Feedback>
                    </Form.Group>

                    {/* Expiration Date Field */}
                    <Form.Group controlId="expirationDate" className="mt-3">
                        <Form.Label>Expiration Date (MM/YY):</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={paymentDetails.expirationDate}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, expirationDate: e.target.value })}
                            isInvalid={paymentError.expirationDate}
                        />
                        <Form.Control.Feedback type="invalid">Expiration date is required and must be in MM/YY format.</Form.Control.Feedback>
                    </Form.Group>

                    {/* CVV Field */}
                    <Form.Group controlId="cvv" className="mt-3">
                        <Form.Label>CVV:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your CVV"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                            isInvalid={paymentError.cvv}
                        />
                        <Form.Control.Feedback type="invalid">CVV is required and must be 3 digits.</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handlePaymentSubmit}>
                        Confirm Payment
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
}

export default MyCart;
