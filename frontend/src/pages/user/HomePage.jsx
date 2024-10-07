import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import Header from '../../components/header'; // Adjust the import path as necessary
import Footer from '../../components/footer'; // Adjust the import path as necessary
import Sidebar from '../../components/sidebar'; // Adjust the import path as necessary
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import { FaCartPlus } from 'react-icons/fa'; // Import FontAwesome cart icon
import { FaStar } from 'react-icons/fa'; // FontAwesome star icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import bagImage from '../../assets/bag.webp';
import logoImage from '../../assets/logo.png';

const initialProducts = [
    { productId: "P001", name: "Product 1", brand: "Brand A", quantity: 50, price: 100, image: bagImage },
    { productId: "P002", name: "Product 2", brand: "Brand B", quantity: 30, price: 200, image: logoImage },
    { productId: "P003", name: "Product 3", brand: "Brand C", quantity: 20, price: 300, image: bagImage },
    { productId: "P004", name: "Product 4", brand: "Brand D", quantity: 10, price: 400, image: bagImage },
    { productId: "P005", name: "Product 5", brand: "Brand E", quantity: 40, price: 500, image: bagImage },
];

function HomePage() {
    const [products] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]); // Track cart items
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle 'View Item' click
    const handleViewItem = (productId) => {
        navigate(`/viewItem/${productId}`); // Navigate to viewItem page with productId as a parameter
    };

    // Function to handle adding item to the cart
    const handleAddToCart = (productId) => {
        if (!cartItems.includes(productId)) {
            setCartItems([...cartItems, productId]); // Add product to cart if it's not already there
        }
    };

    // Function to handle removing item from the cart
    const handleRemoveFromCart = (productId) => {
        setCartItems(cartItems.filter(id => id !== productId)); // Remove product from cart
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-row">
                <Sidebar />
                <div className="container mt-5 flex-grow-1">
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-3 mb-4" key={product.productId}>
                                <div className="card h-100" style={{ minHeight: '350px' }}>
                                    <img
                                        src={product.image}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Brand: {product.brand}</p>
                                        <p className="card-text">Price: Rs. {product.price}</p>
                                        <p className="card-text">
                                            {/* Displaying 5 stars */}
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar key={index} className="text-warning" />
                                            ))}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Button
                                                variant="primary"
                                                onClick={() => handleViewItem(product.productId)}
                                            >
                                                View Item
                                            </Button>
                                            {cartItems.includes(product.productId) ? (
                                                <FaCartPlus
                                                    className="text-danger" 
                                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                                    onClick={() => handleRemoveFromCart(product.productId)} // Remove from cart
                                                    title="Remove from Cart" // Tooltip when item is in the cart
                                                />
                                            ) : (
                                                <FaCartPlus
                                                    className="text-success"
                                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                                    onClick={() => handleAddToCart(product.productId)} // Add to cart
                                                    title="Add to Cart" // Tooltip when item is not in the cart
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
