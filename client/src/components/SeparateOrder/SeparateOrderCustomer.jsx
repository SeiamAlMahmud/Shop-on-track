import React from 'react'

const SeparateOrderCustomer = ({ orderHistory, handlePageChange, page, totalPages }) => {
    return (
        <div>
            <div className="order-list">
                <h2>Customer Order List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product Title</th>
                            <th>Seller</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map((order, idx) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.productId.title}</td>
                                <td>{order.sellerId.fullName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td>{new Date(order.deliveryDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default SeparateOrderCustomer