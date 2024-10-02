// src/pages/CSR/OrderManagement.js
import React from 'react';

const dummyOrders = [
  { id: 'O001', customer: 'John Doe', status: 'Processing', total: 250 },
  { id: 'O002', customer: 'Jane Smith', status: 'Cancelled', total: 100 },
  { id: 'O003', customer: 'Mike Johnson', status: 'Delivered', total: 300 }
];

function OrderManagement() {
  return (
    <div className="container mt-5">
      <h2>Order Management</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
              <td>
                <button className="btn btn-info mr-2">View</button>
                <button className="btn btn-danger">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
