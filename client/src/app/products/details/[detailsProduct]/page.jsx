"use client";

import { decryptData } from "@/utils/crypto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useShopContext } from "@/context/ShopContext";

const SellerDetails = () => {
    const searchParams = useSearchParams();
    const {api} = useShopContext();
    const userType = localStorage.getItem("userType");
    const [sellerData, setSellerData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const encryptedData = searchParams.get("data"); // Get encrypted data from query
        if (!encryptedData) return router("/");
        try {
            const decryptedData = decryptData(decodeURIComponent(encryptedData)); // Decrypt the data
            console.log(decryptedData, "decryptedData")
            setSellerData(decryptedData);
            if (!decryptedData) return router("/");

            getAvailAbleCourier(decryptedData);

        } catch (err) {
            console.error("Error decrypting data:", err);
        }
    }, [searchParams]);

    const getAvailAbleCourier = async (decryptedData) => {
        try {
            if (decryptedData.sellerId) {
                
                const result = await api.post(`/product/getCouriersOnBaseSeller/${decryptedData.sellerId}`, {decryptedData});
                console.log(result.data.couriers, "result")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!sellerData) {
        return <p>Loading seller details...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Seller Details</h1>
            <p><strong>Name:</strong> {sellerData.sellerName}</p>
            <p><strong>Price:</strong> {sellerData.price}</p>
            <p><strong>Weight:</strong> {sellerData.weight} kg</p>
            <p><strong>Location:</strong> {sellerData.location.subDistrict}, {sellerData.location.district}, {sellerData.location.division}</p>
            <p><strong>Added At:</strong> {new Date(sellerData.addedAt).toLocaleDateString()}</p>
        </div>
    );
};

export default SellerDetails;
