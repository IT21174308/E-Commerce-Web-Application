// ProductList.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
    { id: 1, name: 'Product A', category: 'Category 1', stock: 20, status: 'Active' },
    { id: 2, name: 'Product B', category: 'Category 2', stock: 5, status: 'Inactive' },
];

function ProductList() {
    return (
        <div className="container mt-5">
            <h2>Product Management</h2>
            <button className="btn btn-primary mb-3">Add Product</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>{product.status}</td>
                            <td>
                                <button className="btn btn-warning">Edit</button>
                                <button className="btn btn-danger ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
