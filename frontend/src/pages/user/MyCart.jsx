import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';


function MyOrders() {
   
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-row">
                <Sidebar />
                
            </div>


            <Footer />
        </div>
    );
}

export default MyOrders;
