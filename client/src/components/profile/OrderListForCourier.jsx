import React from 'react';
import { format } from 'date-fns';

const OrderListForCourier = ({ type, userProfile, updateOrderStatus }) => {
  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">{type} Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {userProfile &&
            userProfile?.orderHistory.map((order, idx) => (
              <tr key={order._id}>
                <td className="border px-4 py-2 text-center">{idx + 1}</td>
                <td className="border px-4 py-2 text-center">{order.title}</td>
                <td className="border px-4 py-2 text-center">
                  <select
                    className="p-1 rounded-md"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e)}
                  >
                    <option value="pending" disabled>
                      pending
                    </option>
                    <option value="shipped" disabled>
                      shipped
                    </option>
                    <option
                      value="delivered"
                      disabled={
                        order.status === 'cancelled' ||
                        order.status === 'pending'
                      }
                    >
                      delivered
                    </option>
                    <option
                      value="cancelled"
                      disabled={order.status === 'pending'}
                    >
                      cancelled
                    </option>
                  </select>
                </td>
                <td className="border px-4 py-2 text-center">
                  {format(new Date(order.orderDate), 'MM-do-yy HH:mm:ss')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListForCourier;
