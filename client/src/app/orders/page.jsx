"use client"
import Container from '@/components/Container'
import OrderListForCustomer from '@/components/profile/OrderList';
import OrderListForCourier from '@/components/profile/OrderListForCourier';
import OrderListForSeller from '@/components/profile/OrderListForSeller';
import { useShopContext } from '@/context/ShopContext';
import React, { useEffect, useState } from 'react'

const page = () => {
    const { token, Type, api } = useShopContext();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        getUserOrder();
    }, [api, token, Type]);

    const getUserOrder = async () => {
        try {
            const timestamp = new Date().getTime(); // Get current timestamp
            const response = await api.get(`/users/getProfile/${Type}?t=${timestamp}`, { withCredentials: true });
            setUserProfile(response.data.user);
            console.log(response.data.user.orderHistory)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <div className='h-screen'>
                <div className='flex justify-center'>
                    <h2>Your All Order</h2>
                </div>
                        {/* Order List */}
        {Type == "customer" && userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderListForCustomer userProfile={userProfile} type={Type} />
        ) : (
          <></>
        )}
        {Type == "seller" && userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderListForSeller userProfile={userProfile} type={Type} updateOrderStatus={updateOrderStatus} />
        ) : (
          <></>
        )}
        {Type == "courier" && userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderListForCourier userProfile={userProfile} type={Type} updateOrderStatus={updateOrderStatus} />
        ) : (
          <></>
        )}
                <div>
                </div>
            </div>
        </Container>
    )
}

export default page;