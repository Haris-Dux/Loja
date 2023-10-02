import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetOrder } from '../../features/orderSlice';
import { clearCart } from '../../features/CartSlice';

const OrderSuccessPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(clearCart());
        dispatch(resetOrder())
    },[dispatch]);
  return (
    <>
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-[#754224]">Order Successfully Placed</p>
       <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"> Order Number#{id}</h1> 
      <p class="mt-6 text-base leading-7 text-gray-600">You can check your order in My Account &gt; My Orders</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <Link to="/" class="rounded-md bg-[#754224] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754224]">Go back home</Link>
        
      </div>
    </div>
  </main>
  </>
  )
}

export default OrderSuccessPage
