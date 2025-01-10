import React from 'react'
import { format } from 'date-fns';
import Container from '../Container';

const SeparateOrderCustomer = ({ orderHistory, handlePageChange, page, totalPages, Type }) => {
    return (
        <Container>
            <div className="order-list">
                <h2 className="text-xl font-semibold mb-4 text-[teal]">{Type} Orders</h2>

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
                        {orderHistory.map((order, idx) => (
                            <tr key={order._id}>
                                <td className="border px-4 py-2 text-center">{idx + 1}</td>
                                <td className="border px-4 py-2 text-center">{order.title}</td>
                                <td className="border px-4 py-2 text-center">{order.status}</td>
                                <td className="border px-4 py-2 text-center">{format(new Date(order.orderDate), 'MM-do-yy HH:mm:ss')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-controls flex justify-center mx-auto mt-6 gap-5 items-center">
                    {/* From Uiverse.io by Ariful2634  */}
                    <button
                        onClick={() => handlePageChange(page - 1)} disabled={page === 1}
                        class={`text-xl w-24 h-8 rounded ${page === 1 ? "bg-emerald-300" :"bg-emerald-500"} text-white relative overflow-hidden group z-10 hover:text-white duration-1000`}
                    >
                        <span
                            class="absolute bg-teal-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"
                        ></span>
                        <span
                            class="absolute bg-teal-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"
                        ></span>
                        Previous
                    </button>

                    <span>Page {page} of {totalPages}</span>
                    
                    <button
                        onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}
                        class={`text-xl w-24 h-8 rounded ${page === totalPages ? "bg-emerald-300" :"bg-emerald-500"} text-white relative overflow-hidden group z-10 hover:text-white duration-1000`}
                    >
                        <span
                            class="absolute bg-teal-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"
                        ></span>
                        <span
                            class="absolute bg-teal-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"
                        ></span>
                        Next
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default SeparateOrderCustomer