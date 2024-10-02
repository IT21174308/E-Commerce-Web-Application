// UserManagement.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const users = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Vendor', status: 'Inactive' },
    { id: 3, name: 'Tom Brown', role: 'CSR', status: 'Active' },
];

function UserManagement() {
    return (
        <div className="container mt-5">
            <h2>User Management</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <button className="btn btn-warning">Edit</button>
                                <button className="btn btn-danger ml-2">Deactivate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
