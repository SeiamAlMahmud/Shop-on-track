import React from "react";

const OrderList = ({ type }) => {
  const orders = [
    { id: 1, item: "Product A", status: "Delivered", date: "2024-12-01" },
    { id: 2, item: "Product B", status: "Pending", date: "2024-12-02" },
  ];

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
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.item}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
