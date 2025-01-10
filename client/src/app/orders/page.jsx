"use client"
import Container from '@/components/Container'
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
                {/* Render user profile or orders here */}
                {userProfile && (
                    <div>
                        <h1>{userProfile.fullName}'s Orders</h1>
                        {/* Render order details */}
                    </div>
                )}



                <div>
                    
                </div>
            </div>
        </Container>
    )
}

export default page;