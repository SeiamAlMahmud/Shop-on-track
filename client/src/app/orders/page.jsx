"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import OrderListForCustomer from "@/components/profile/OrderList";
import OrderListForSeller from "@/components/profile/OrderListForSeller";
import OrderListForCourier from "@/components/profile/OrderListForCourier";
import { useShopContext } from "@/context/ShopContext";
import SeparateOrderCustomer from "@/components/SeparateOrder/SeparateOrderCustomer";

const Page = () => {
    const { token, Type, api } = useShopContext();
    const [orderHistory, setOrderHistory] = useState([]);
    const [timestamp, setTimestamp] = useState(Date.now());
    const [page, setPage] = useState(1); // Track current page
    const [totalOrders, setTotalOrders] = useState(0); // Track total orders
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [limit] = useState(10); // Orders per page (can be dynamic)

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                // Fetch data from the API with pagination
                const response = await api.post(
                    `/users/getOrder/${Type}?t=${timestamp}&page=${page}&limit=${limit}`,
                    { withCredentials: true }
                );

                const { orderHistory, meta } = response.data;
                console.log(orderHistory.orderHistory)
                // Update states with the fetched data
                setOrderHistory(orderHistory.orderHistory);
                setTotalOrders(meta.totalItems); // Total number of orders
                setTotalPages(meta.totalPages); // Total number of pages
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, [Type, timestamp, page, limit]); // Re-fetch when page or type changes

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage); // Update page state
        }
    };



    const renderOrderList = () => {
        switch (Type) {
            case "customer":
                return (
                    <SeparateOrderCustomer
                        handlePageChange={handlePageChange}
                        orderHistory={orderHistory}
                        page={page}
                        totalPages={totalPages}
                    />
                );
            case "seller":
                return (
                    <OrderListForSeller
                        orderHistory={orderHistory}
                        type={Type}
                        updateOrderStatus={updateOrderStatus}
                    />
                );
            case "courier":
                return (
                    <OrderListForCourier
                        orderHistory={orderHistory}
                        type={Type}
                        updateOrderStatus={updateOrderStatus}
                    />
                );
            default:
                return <p>No orders found for this category.</p>;
        }
    };

    return (
        <Container>
            <div className="h-screen">
                <div className="flex justify-center">
                    <h2>Your All Orders</h2>
                </div>
                {orderHistory && orderHistory.length > 0 ? (
                    renderOrderList()
                ) : (
                    <p className="text-center mt-4">No orders available.</p>
                )}
            </div>
        </Container>
    );
};

export default Page;
