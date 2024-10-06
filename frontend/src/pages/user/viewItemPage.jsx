import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';
import { FaCartPlus, FaStar, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import bagImage from '../../assets/bag.webp';
import logoImage from '../../assets/logo.png';
import { Button, Form, Modal } from 'react-bootstrap';

const initialProducts = [
    { productId: "P001", name: "Product 1", brand: "Brand A", quantity: 50, price: 100, image: bagImage },
    { productId: "P002", name: "Product 2", brand: "Brand B", quantity: 30, price: 200, image: logoImage },
    { productId: "P003", name: "Product 3", brand: "Brand C", quantity: 20, price: 300, image: bagImage },
    { productId: "P004", name: "Product 4", brand: "Brand D", quantity: 10, price: 400, image: bagImage },
    { productId: "P005", name: "Product 5", brand: "Brand E", quantity: 40, price: 500, image: bagImage },
];

const sampleReviews = [
    { text: "Amazing product!", rating: 5 },
    { text: "Good value for money.", rating: 4 },
    { text: "Quality could be better.", rating: 3 }
];

function ViewItemPage() {
    const { productId } = useParams();
    const [products] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState(sampleReviews);
    const [userReview, setUserReview] = useState({ text: '', rating: 0 });
    const [hasRated, setHasRated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false); // New state for payment modal
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [paymentDetails, setPaymentDetails] = useState({ name: '', shippingAddress: '', mobileNumber: '' });
    const navigate = useNavigate();

    const product = products.find(p => p.productId === productId);

    const handleAddToCart = () => {
        if (product && !cartItems.includes(product.productId)) {
            setCartItems([...cartItems, product.productId]);
        }
    };

    const handleRemoveFromCart = () => {
        setCartItems(cartItems.filter(id => id !== product.productId));
    };

    const handleAddReview = () => {
        if (userReview.text.trim() && userReview.rating > 0) {
            setReviews([...reviews, userReview]);
            setHasRated(true);
            setIsEditing(false);
        }
    };

    const handleEditReviewText = () => {
        setIsEditing(true);
    };

    const handleSaveReviewText = () => {
        const updatedReviews = reviews.map((review, index) => {
            if (index === reviews.length - 1) {
                return { ...review, text: userReview.text };
            }
            return review;
        });
        setReviews(updatedReviews);
        setIsEditing(false);
    };

    const handleBuyNow = () => {
        setShowModal(true);
    };

    const handleQuantitySubmit = () => {
        if (product && buyQuantity > 0 && buyQuantity <= product.quantity) {
            const cartItem = {
                productId: product.productId,
                quantity: buyQuantity
            };
            setCartItems([...cartItems, cartItem]);
            setShowModal(false);
            setBuyQuantity(1);
            // Open payment modal after quantity confirmation
            setShowPaymentModal(true);
        } else {
            alert("Please enter a valid quantity.");
        }
    };

    const handlePaymentSubmit = () => {
        if (paymentDetails.name && paymentDetails.shippingAddress && paymentDetails.mobileNumber) {
            alert(`Payment Confirmed! Name: ${paymentDetails.name}, Mobile: ${paymentDetails.mobileNumber}`);
            setShowPaymentModal(false);
            navigate('/home');
        } else {
            alert("Please fill in all payment details.");
        }
    };

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-row">
                <Sidebar />
                <div className="container mt-5 flex-grow-1">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card h-100">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <img
                                            src={product.image}
                                            className="img-fluid rounded-start"
                                            alt={product.name}
                                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Brand: {product.brand}</p>
                                            <p className="card-text">Price: Rs. {product.price}</p>
                                            <p className="card-text">Quantity Available: {product.quantity}</p>
                                            <p>
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar key={index} className="text-warning" />
                                                ))}
                                            </p>

                                            <div className="d-flex justify-content-start mb-3">
                                                <Button variant="primary" className="me-2" onClick={handleBuyNow}>
                                                    Buy Now
                                                </Button>

                                                <Button
                                                    variant={cartItems.includes(product.productId) ? "danger" : "success"}
                                                    className="me-2"
                                                    onClick={cartItems.includes(product.productId) ? handleRemoveFromCart : handleAddToCart}
                                                >
                                                    {cartItems.includes(product.productId) ? (
                                                        <span>
                                                            <FaTrash /> Remove from Cart
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <FaCartPlus /> Add to Cart
                                                        </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal for Buy Quantity */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Buy Now</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="buyQuantity">
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max={product.quantity} 
                                    value={buyQuantity}
                                    onChange={(e) => setBuyQuantity(e.target.value)}
                                />
                            </Form.Group>
                            <p>Total: Rs. {product.price * buyQuantity}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleQuantitySubmit}>
                                Confirm Purchase
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal for Payment Details */}
                    <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Payment Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>Total: Rs. {product.price * buyQuantity}</p>

                            <Form.Group controlId="paymentName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={paymentDetails.name}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="paymentAddress" className="mt-3">
                                <Form.Label>Shipping Address:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter shipping address"
                                    value={paymentDetails.shippingAddress}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, shippingAddress: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="paymentMobile" className="mt-3">
                                <Form.Label>Mobile Number:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number"
                                    value={paymentDetails.mobileNumber}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, mobileNumber: e.target.value })}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handlePaymentSubmit}>
                                Confirm Payment
                            </Button>
                        </Modal.Footer>
                    </Modal>

                            {/* Reviews Section */}
                  <div className="row mt-5">
                      <div className="col-md-8">
                          <h5>Reviews</h5>

                          {/* Add or Edit Review Section */}
                          {hasRated ? (
                              <div>
                                  {isEditing ? (
                                      <>
                                          {/* Show input fields for editing the review */}
                                          <Form.Group controlId="reviewText">
                                              <Form.Control
                                                  type="text"
                                                  placeholder="Edit your review..."
                                                  value={userReview.text}
                                                  onChange={(e) => setUserReview({ ...userReview, text: e.target.value })}
                                                  style={{ width: '200px' }} // Set a custom width

                                              />
                                          </Form.Group>
                                          <Button variant="primary" onClick={handleSaveReviewText} className="mt-2">
                                              Save
                                          </Button>
                                      </>
                                  ) : (
                                      <>
                                          {/* Show review as read-only */}
                                          <p>{userReview.text}</p>
                                          <Button variant="secondary" onClick={handleEditReviewText}>
                                              <FaEdit /> Edit
                                          </Button>
                                      </>
                                  )}
                              </div>
                          ) : (
                              <Form className="mb-4">
                                  <Form.Group controlId="starRating" className="mt-3">
                                      <Form.Label>Rate this product:</Form.Label>
                                      <div>
                                          {[...Array(5)].map((_, index) => (
                                              <FaStar
                                                  key={index}
                                                  className={index < userReview.rating ? 'text-warning' : 'text-muted'}
                                                  onClick={() => setUserReview({ ...userReview, rating: index + 1 })}
                                                  style={{ cursor: 'pointer' }}
                                              />
                                          ))}
                                      </div>
                                  </Form.Group>

                                  <Form.Group controlId="reviewText">
                                      <Form.Control
                                          type="text"
                                          placeholder="Write your review here..."
                                          value={userReview.text}
                                          onChange={(e) => setUserReview({ ...userReview, text: e.target.value })}
                                          style={{ width: '200px' }} // Set a custom width

                                      />
                                  </Form.Group>

                                  <Button
                                      variant="primary"
                                      className="mt-3"
                                      onClick={handleAddReview}
                                  >
                                      <FaPlus /> Add Review
                                  </Button>
                              </Form>
                          )}

                          {/* Existing Reviews */}
                          <ul className="list-group">
    {reviews.map((review, index) => (
        <li key={index} className="list-group-item" style={{ marginBottom: '1rem' }}> {/* Inline style for margin */}
            <p>{review.text}</p>
            <div>
                {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning" />
                ))}
            </div>
        </li>
    ))}
</ul>

                      </div>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewItemPage;
