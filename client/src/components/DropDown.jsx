import React, { useState } from "react";

// icons
import { RxCross1 } from "react-icons/rx";

const DropDown = ({ courier, sellerData }) => {
    const [isModalOpen, setisModalOpen] = useState(false);

    const orderDetails = {
        productId: sellerData?.productId,
        sellerId: sellerData?.sellerId,
        sellerName: sellerData?.sellerName,
        price: sellerData?.price,
        weight: sellerData?.weight,
        location: {
            subDistrict: sellerData?.location.subDistrict,
            district: sellerData?.location.district,
            division: sellerData?.location.division,
        },
        addedAt: sellerData?.addedAt,
        courierId: courier._id,
        quantity: undefined,

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
                                <span className="font-bold text-cyan-900 text-lg mr-1">DeliveryCharge: </span> 
                                <select>

                                </select>
                             <div className="pt-1 ">
                                <span>Inside Dhaka - 8.50 taka per Kg</span> <br />
                                <span>Inside Dhaka - 8.50 taka per Kg</span>
                                </div> 
                                </div>
                            <div className="flex g-2 items-start">
                                <span className="font-bold text-cyan-900 text-lg mr-1">Net Ammount: </span> 
                             <div className="pt-1">
                              
                                </div> 
                                </div>
                            <p></p>
                        </div>
                        <form className="flex flex-col gap-5 p-4">
                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="text-[1rem] font-[500] text-[#464646]"
                                >
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    min="0"
                                    step="1"
                                    placeholder="Enter quantity"
                                    className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="flex items-center justify-center w-full pb-4">
                            <p className="text-[1rem] font-[400] text-[#464646c]">
                                Not have any account?{" "}
                                <a href="#" className="text-[#3B9DF8] underline">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropDown;
