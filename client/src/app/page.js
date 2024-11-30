"use client";
import CardSection from '@/components/CardSection';
import HeroSection from '@/components/HeroSection';
import { useShopContext } from '@/context/ShopContext';
import Image from 'next/image';

export default function Home() {
  const { authState, setAuthState } = useShopContext(); // Use the custom hook here
  console.log(authState);


  return (

    <>
      <HeroSection />
      <CardSection />
    </>
  );
}
