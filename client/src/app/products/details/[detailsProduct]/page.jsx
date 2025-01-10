'use client';

import { decryptData, encryptData } from '@/utils/crypto';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useShopContext } from '@/context/ShopContext';
import Container from '@/components/Container';
import DropDown from '@/components/DropDown';

const SellerDetails = () => {
  const searchParams = useSearchParams();
  const { api } = useShopContext();
  const userType = localStorage.getItem('userType');
  const [sellerData, setSellerData] = useState(null);
  const [couriersList, setCourierList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const encryptedData = searchParams.get('data'); // Get encrypted data from query
    if (!encryptedData) return router('/');
    try {
      const decryptedData = decryptData(decodeURIComponent(encryptedData)); // Decrypt the data
      console.log(decryptedData, 'decryptedData');
      setSellerData(decryptedData);
      if (!decryptedData) return router('/');

      getAvailAbleCourier(decryptedData);
    } catch (err) {
      console.error('Error decrypting data:', err);
    }
  }, [searchParams]);

  const getAvailAbleCourier = async (decryptedData) => {
    try {
      if (decryptedData.sellerId) {
        const result = await api.post(
          `/product/getCouriersOnBaseSeller/${decryptedData.sellerId}`,
          { decryptedData }
        );
        console.log(result.data.couriers, 'result');
        setCourierList(result.data.couriers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!sellerData) {
    return <p>Loading seller details...</p>;
  }

  return (
    <Container>
      <div className="p-4">
        <div className="flex flex-col-reverse sm:flex-row gap-6">
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-xl font-bold">Seller Details</h1>
            <div>
              <p>
                <strong>Name:</strong> {sellerData.sellerName}
              </p>
              <p>
                <strong>Price:</strong> {sellerData.price}
              </p>
              <p>
                <strong>Weight:</strong> {sellerData.weight} kg
              </p>
              <p>
                <strong>Location:</strong> {sellerData.location.subDistrict},{' '}
                {sellerData.location.district}, {sellerData.location.division}
              </p>
              <p>
                <strong>Added At:</strong>{' '}
                {new Date(sellerData.addedAt).toLocaleDateString()}
              </p>
              <p>
                <strong className="font-extrabold text-lg">
                  {' '}
                  Contact for more Details:{' '}
                </strong>
                <a
                  href={`tel:${sellerData?.phoneNumber}`}
                  className="text-blue-600 underline"
                >
                  {sellerData?.phoneNumber}
                </a>
              </p>
            </div>
          </div>
          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${sellerData.image}`}
              alt=""
            />
          </div>
        </div>
        <div className="mt-6">
          <h2 className=" text-sm sm:text-xl md:text-3xl font-extrabold my-7  flex justify-center gap-2 items-center">
            Available <span className="text-green-500 font-bold">Couriers</span>{' '}
            for This Item
          </h2>
          {couriersList.length > 0 ? (
            <TableContainer component={Paper} className="shadow-black">
              <Table style={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow className="bg-gray-300">
                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                      business Name
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2 whitespace-nowrap">
                      vehicle Type
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                      Capacity(Kg)
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                      Location
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                      Status
                    </TableCell>
                    {userType == 'customer' && (
                      <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                        Order
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {couriersList.map((courier, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs sm:text-sm p-1 sm:p-2 cursor-pointer">
                        {courier.businessName}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                        {courier.vehicleType}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                        {courier.deliveryCapacity}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                        {courier.subDistrict} , <br /> {courier.district},{' '}
                        <br /> {courier.division}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            courier.vehicleStatus === 'available'
                              ? 'green'
                              : courier.vehicleStatus === 'busy'
                                ? 'red'
                                : courier.vehicleStatus === 'maintenance'
                                  ? 'yellow'
                                  : 'inherit',
                        }}
                      >
                        {courier.vehicleStatus}
                      </TableCell>

                      {userType == 'customer' && (
                        <TableCell className="text-xs sm:text-sm p-1 sm:p-2">
                          {/* <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => {
                                                            const sellerData = {
                                                                // productId: itemData.product._id,
                                                                // sellerId: seller.sellerId,
                                                                // sellerName: seller.fullName,
                                                                // price: seller.price,
                                                                // weight: seller.weight,
                                                                // location: {
                                                                //     subDistrict: seller.address.subDistrict,
                                                                //     district: seller.address.district,
                                                                //     division: seller.address.division,
                                                                // },
                                                                // addedAt: seller.addedAt,
                                                            };
                                                            const encryptedSellerData = encryptData(sellerData); // Encrypt the seller data
                                                            router.push(`/products/details/${seller._id}?data=${encodeURIComponent(encryptedSellerData)}`);
                                                        }}
                                                    >
                                                        {courier.vehicleStatus == "busy" ? "Booking" : "Order"}
                                                    </Button> */}
                          <DropDown courier={courier} sellerData={sellerData} />
                        </TableCell>
                      )}
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
    </Container>
  );
};

export default SellerDetails;
