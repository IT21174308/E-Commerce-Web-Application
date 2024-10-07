import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import Header from '../../components/header'; // Adjust the import path as necessary
import Footer from '../../components/footer'; // Adjust the import path as necessary
import Sidebar from '../../components/sidebar'; // Adjust the import path as necessary
import { Modal, Button } from 'react-bootstrap'; // Import Modal from react-bootstrap

const initialProducts = [
    { productId: "P001", name: "Product 1", brand: "Brand A", quantity: 50, price: 100, image: require('../../assets/bag.webp').default, reorderLevel: 30, stock: 40, isActive: true },
    { productId: "P002", name: "Product 2", brand: "Brand B", quantity: 30, price: 200, image: require('../../assets/logo.png').default, reorderLevel: 15, stock: 10, isActive: true },
    { productId: "P003", name: "Product 3", brand: "Brand C", quantity: 20, price: 300, image: require('../../assets/bag.webp').default, reorderLevel: 20, stock: 20, isActive: true },
    { productId: "P004", name: "Product 4", brand: "Brand D", quantity: 10, price: 400, image: require('../../assets/bag.webp').default, reorderLevel: 5, stock: 2, isActive: false },
    { productId: "P005", name: "Product 5", brand: "Brand E", quantity: 40, price: 500, image: require('../../assets/bag.webp').default, reorderLevel: 35, stock: 50, isActive: true },
];

function ProductList() {
    const [products, setProducts] = useState(initialProducts);
    const [activeTab, setActiveTab] = useState('view');
    const [newProduct, setNewProduct] = useState({ productId: '', name: '', brand: '', quantity: '', price: '', image: '', reorderLevel: '', stock: '' });
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [currentProduct, setCurrentProduct] = useState(null); // State for current product being edited
    const [showImageModal, setShowImageModal] = useState(false); // State for image zoom modal
    const [selectedImage, setSelectedImage] = useState(''); // State for selected image URL

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProduct({ ...newProduct, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = () => {
        setProducts([...products, newProduct]);
        setNewProduct({ productId: '', name: '', brand: '', quantity: '', price: '', image: '', reorderLevel: '', stock: '' });
        setActiveTab('view');
    };

    const handleEdit = (product) => {
        setCurrentProduct(product); // Set the current product to edit
        setNewProduct(product); // Populate the form with the product details
        setShowModal(true); // Show the modal
    };

    const handleDelete = (productId) => {
        const updatedProducts = products.filter(product => product.productId !== productId);
        setProducts(updatedProducts);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
        setNewProduct({ productId: '', name: '', brand: '', quantity: '', price: '', image: '', reorderLevel: '', stock: '' });
    };

    const handleSaveChanges = () => {
        const updatedProducts = products.map(product =>
            product.productId === currentProduct.productId ? newProduct : product
        );
        setProducts(updatedProducts);
        handleCloseModal();
    };

    const toggleProductStatus = (productId) => {
        const updatedProducts = products.map((product) =>
            product.productId === productId ? { ...product, isActive: !product.isActive } : product
        );
        setProducts(updatedProducts);
    };

    // Function to handle image zoom
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
        setSelectedImage('');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-row">
                <Sidebar />
                <div className="container mt-5 flex-grow-1">
                    <h2>Product Management</h2>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" role="presentation">
                            <a className={`nav-link ${activeTab === 'view' ? 'active' : ''}`} onClick={() => setActiveTab('view')}>
                                All Products
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={`nav-link ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
                                Add Product
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className={`tab-pane fade ${activeTab === 'view' ? 'show active' : ''}`}>
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <table className="table table-striped mt-3">
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Brand</th>
                                                <th>Price</th>
                                                <th>Reorder Level</th>
                                                <th>Stock</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.productId} className={product.reorderLevel > product.stock ? 'table-danger' : ''}>
                                                    <td>{product.productId}</td>
                                                    <td>{product.name}</td>
                                                    <td>
                                                        {product.image && (
                                                            <img 
                                                                src={product.image} 
                                                                alt={product.name} 
                                                                style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }} 
                                                                onClick={() => handleImageClick(product.image)} // Open zoom on click
                                                            />
                                                        )}
                                                    </td>
                                                    <td>{product.brand}</td>
                                                    <td>Rs. {product.price}</td>
                                                    <td>{product.reorderLevel}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <span className={`badge ${product.isActive ? 'bg-success' : 'bg-danger'}`}>
                                                            {product.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                                            <i className="fa fa-pencil" style={{ color: 'green', cursor: 'pointer' }} onClick={() => handleEdit(product)}></i>
                                                        </span>
                                                        <span data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                            <i className="fa fa-trash" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(product.productId)}></i>
                                                        </span>
                                                        <span className="ms-2" data-bs-toggle="tooltip" data-bs-placement="top" title={product.isActive ? "Deactivate" : "Activate"}>
                                                            <i className={`fa ${product.isActive ? 'fa-toggle-on' : 'fa-toggle-off'}`}
                                                                style={{ color: 'orange', cursor: 'pointer' }}
                                                                onClick={() => toggleProductStatus(product.productId)}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'add' ? 'show active' : ''}`}>
                            <div className="card mb-4" style={{ minHeight: '350px' }}>
                                <div className="card-body">
                                    <form>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="productName" className="form-label">Product Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-tag" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="productName" name="name"
                                                        value={newProduct.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Product Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="productBrand" className="form-label">Brand</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-industry" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="text" className="form-control" id="productBrand" name="brand"
                                                        value={newProduct.brand}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Brand Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="productQuantity" className="form-label">Quantity</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-cubes" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="number" className="form-control" id="productQuantity" name="quantity"
                                                        value={newProduct.quantity}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Quantity"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="productPrice" className="form-label">Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-money" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="number" className="form-control" id="productPrice" name="price"
                                                        value={newProduct.price}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Price"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label htmlFor="productImage" className="form-label">Product Image</label>
                                                <input type="file" className="form-control" id="productImage" onChange={handleImageChange} />
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group mb-2">
                            <label>Product ID:</label>
                            <input type="text" className="form-control" name="productId" value={newProduct.productId} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Name:</label>
                            <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Brand:</label>
                            <input type="text" className="form-control" name="brand" value={newProduct.brand} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Quantity:</label>
                            <input type="number" className="form-control" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Price:</label>
                            <input type="number" className="form-control" name="price" value={newProduct.price} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Reorder Level:</label>
                            <input type="number" className="form-control" name="reorderLevel" value={newProduct.reorderLevel} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Stock:</label>
                            <input type="number" className="form-control" name="stock" value={newProduct.stock} onChange={handleInputChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Image:</label>
                            <input type="file" className="form-control-file" onChange={handleImageChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Status:</label>
                            <select className="form-control" name="isActive" value={newProduct.isActive} onChange={handleInputChange}>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Image Zoom Modal */}
            <Modal show={showImageModal} onHide={handleCloseImageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage && (
                        <img src={selectedImage} alt="Zoomed" className="img-fluid" />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseImageModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductList;
