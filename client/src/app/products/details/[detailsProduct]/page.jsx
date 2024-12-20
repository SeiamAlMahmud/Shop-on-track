"use client";

import { decryptData } from "@/utils/crypto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SellerDetails = () => {
    const searchParams = useSearchParams();
    const [sellerData, setSellerData] = useState(null);

    useEffect(() => {
        const encryptedData = searchParams.get("data"); // Get encrypted data from query
        if (encryptedData) {
            try {
                const decryptedData = decryptData(decodeURIComponent(encryptedData)); // Decrypt the data
                console.log(decryptedData)
                setSellerData(decryptedData);
            } catch (err) {
                console.error("Error decrypting data:", err);
            }
        }
    }, [searchParams]);

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
