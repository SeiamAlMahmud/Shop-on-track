import { useShopContext } from "@/context/ShopContext";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// icons
import { RxCross1 } from "react-icons/rx";

const DropDown = ({ courier, sellerData }) => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(8.50);
    const [netAmount, setNetAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const { api } = useShopContext();

    useEffect(() => {
        const qty = quantity || 0;
        const price = sellerData?.price || 0;
        const calculatedNetAmount = (price * qty) + (deliveryCharge * qty);
        setNetAmount(calculatedNetAmount);
    }, [quantity, deliveryCharge, sellerData?.price]);

    const orderDetails = {
        productId: sellerData?.productId,
        sellerId: sellerData?.sellerId,
        sellerName: sellerData?.sellerName,
        price: sellerData?.price,
        netAmount: netAmount,
        weight: sellerData?.weight,
        location: {
            subDistrict: sellerData?.location.subDistrict,
            district: sellerData?.location.district,
            division: sellerData?.location.division,
        },
        addedAt: sellerData?.addedAt,
        courierId: courier._id,
        quantity: quantity,
    };


    const orderHandle = async (e) => {
        e.preventDefault();
        if (netAmount === 0) return toast.error("Net amount cannot be zero. Please enter a valid quantity.");
        setLoading(true);
        
        try {
            const response = await api.post("/", orderDetails);
            console.log(response.data);
            toast.success("Order Create Successfully.")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                <div className="w-full flex items-center justify-center">
                    <button
                        className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded text-xs sm:text-sm p-1 sm:p-2"
                        onClick={() => setisModalOpen(true)}
                    >
                        {courier.vehicleStatus == "busy" ? "Booking" : "Order"}
                    </button>
                </div>
                <div
                    className={`${isModalOpen ? " visible" : " invisible"
                        } w-full h-screen fixed top-0 left-0 z-50 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
                    onClick={() => setisModalOpen(false)}
                >
                    <div
                        className={`${isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                            } w-[90%] md:w-[80%] lg:w-[35%] backdrop-blur-xl border-gray-400 border-[0.3px] rounded-lg transition-all duration-300 mx-auto mt-8 bg-gradient-to-br from-[#2da6a214] to-[#3a1e0970]`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full flex items-end p-4 justify-between border-b border-[#0000002f]">
                            <h1 className="text-[1.8rem] font-bold">
                                Checkout
                            </h1>
                            <RxCross1
                                className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                                onClick={() => setisModalOpen(false)}
                            />
                        </div>
                        <div className="px-5 pt-2">
                            <div className="flex flex-col g-2 items-start">
                                <span className="font-bold text-cyan-900 text-xl mr-1">DeliveryCharge:
                                    <select
                                        className="p-1 bg-gray-400 bg-opacity-80 rounded-sm ml-2"
                                        onChange={e => setDeliveryCharge(parseFloat(e.target.value))}
                                    >
                                        <option value={8.50}>Inside Dhaka</option>
                                        <option value={10.00}>Outside Dhaka</option>
                                    </select>
                                </span>

                                <div className="pt-1 ">
                                    <span>Inside Dhaka - 8.50 taka per Kg</span> <br />
                                    <span>Outside Dhaka - 10.00 taka per Kg</span>
                                </div>
                            </div>
                            <div className="flex flex-col g-2 items-start">
                                <div>
                                    <span className="font-bold text-cyan-900 text-lg mr-1">Net Amount: </span>
                                    <span className="mt-[2px] text-lg">{netAmount.toFixed(2)}</span>
                                </div>
                                <div className="pt-1">
                                    <ul className="text-sm text-gray-600 list-disc list-inside">
                                        <li>Price per Kg: {sellerData?.price || 0}</li>
                                        <li>Quantity: {quantity || 0}</li>
                                        <li>Delivery Charge per Kg: {deliveryCharge}</li>
                                        <li>Total Price: {sellerData?.price * quantity || 0}</li>
                                        <li>Total Delivery Charge: {deliveryCharge * quantity || 0}</li>
                                    </ul>
                                </div>
                            </div>
                            <p></p>
                        </div>
                        <form
                        onSubmit={orderHandle}
                        className="flex flex-col gap-5 p-4">
                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="text-[1rem] font-[500] text-[#464646]"
                                >
                                    Quantity(Kg)
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    min="0"
                                    step="1"
                                    value={quantity}
                                    placeholder="Enter quantity"
                                    onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                                    className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                                />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="py-2 px-4 w-full bg-[#31b1c5] text-[#fff] rounded-md font-semibold"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropDown;
