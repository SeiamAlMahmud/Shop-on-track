import React from 'react';
import { format } from 'date-fns';
import Container from '../Container';

const SeparateOrderSeller = ({
  orderHistory,
  handlePageChange,
  page,
  totalPages,
  Type,
  updateOrderStatus,
}) => {
  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <Container>
      <div className="p-4 bg-white rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold mb-4">{Type} Orders</h2>
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
            {orderHistory &&
              orderHistory.map((order, idx) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2 text-center">{idx + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {order.title}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <select
                      className="p-1 rounded-md"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e)}
                    >
                      <option value="pending" disabled>
                        pending
                      </option>
                      <option
                        value="shipped"
                        disabled={
                          order.status === 'delivered' ||
                          order.status === 'cancelled'
                        }
                      >
                        shipped
                      </option>
                      <option value="delivered" disabled>
                        delivered
                      </option>
                      <option
                        value="cancelled"
                        disabled={order.status === 'delivered'}
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
        <div className="pagination-controls flex justify-center mx-auto mt-6 gap-5 items-center">
          {/* From Uiverse.io by Ariful2634  */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`text-xl w-24 h-8 rounded ${page === 1 ? 'bg-emerald-300' : 'bg-emerald-500'} text-white relative overflow-hidden group z-10 hover:text-white duration-1000`}
          >
            <span className="absolute bg-teal-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-teal-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`text-xl w-24 h-8 rounded ${page === totalPages ? 'bg-emerald-300' : 'bg-emerald-500'} text-white relative overflow-hidden group z-10 hover:text-white duration-1000`}
          >
            <span className="absolute bg-teal-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-teal-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SeparateOrderSeller;
