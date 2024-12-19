'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useShopContext } from "@/context/ShopContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Page = () => {
    const { api } = useShopContext();
    const { item } = useParams(); // Get the dynamic parameter
    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        if (item) {
            const fetchItemData = async () => {
                try {
                    const result = await api.get(`/product/get-single-product/${item}`);
                    setItemData(result.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch item data.");
                    router.push("/");
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            fetchItemData();
        }
    }, [item, api]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!itemData || !itemData.product) {
        return <p>No product data available.</p>;
    }

    return (
        <div className="my-6 mx-4 sm:mx-6 md:mx-10">
            <div className="mb-4 sm:mb-6">
                <h1 className="font-bold text-xl sm:text-2xl">{itemData.product.title}</h1>
                <h3 className="text-sm sm:text-lg mt-3">
                    Product Id: <span className="text-slate-400">{itemData.product._id}</span>
                </h3>
            </div>
            <hr />
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-start sm:gap-4">
                <div>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${itemData.product.image}`}
                        alt={itemData.product.title}
                        className="w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto object-contain shadow-md my-5 flex mx-auto sm:mx-4"
                    />
                </div>
                <div className="sm:ml-6">
                    <p className={itemData.product.sellers.length !== 0 ? "text-green-500 text-sm sm:text-lg font-bold" : ""}>
                        In stock
                    </p>
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base">Only {itemData.product.sellers.length} left</p>
                    <p className="text-sm sm:text-base">
                        <span className="font-bold">Category: </span> {itemData.product.category}
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-bold">Description: </span> {itemData.product.description}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="grid place-items-center text-sm sm:text-xl md:text-3xl font-extrabold my-7">Available Sellers for This Item</h2>
                {itemData.product.sellers.length > 0 ? (
                    <TableContainer component={Paper} className="shadow-black">
                        <Table style={{ tableLayout: "auto" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">Seller Name</TableCell>
                                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">Price</TableCell>
                                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">Location</TableCell>
                                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">Added At</TableCell>
                                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">Order</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemData.product.sellers.map((seller, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-xs sm:text-sm p-1 sm:p-2">{seller.fullName}</TableCell>
                                        <TableCell className="text-xs sm:text-sm p-1 sm:p-2">{seller.price}</TableCell>
                                        <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                                            {seller.address.subDistrict} , {seller.address.district}, {seller.address.division}
                                        </TableCell>
                                        <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                                            {new Date(seller.addedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                                            <Button variant="contained" color="primary" size="small">
                                                Order
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>No sellers available</p>
                )}
            </div>
        </div>
    );
};

export default Page;
