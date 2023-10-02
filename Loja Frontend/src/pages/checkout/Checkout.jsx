import React, { useState, useEffect } from "react";
import { Link , Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../../features/CartSlice";
import axios from "axios";
import { setUser, updateUser } from "../../features/authSlice";
import { toast } from "react-toastify";
import { createOrderAsync, selectCurrentOrder } from "../../features/orderSlice";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
 
  const dispatch = useDispatch();
  const { data, totalItems, totalAmount } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const currentOrder = useSelector(selectCurrentOrder)
  useEffect(() => {
    dispatch(getCartTotal());
  }, [useSelector((state) => state.cart)]);


  const [formData, setFormData] = useState({
    phone:  "",
  street:  "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an Axios request to update user information
      const addressString = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.pinCode}`;
      const response = await axios.post(
        "/api/updateUser",
        {
          id: user.id,
          phone: formData.phone,
          address: addressString,
        }
      );
      console.log("User information updated:", response.data);
      dispatch(updateUser({ ...user, phone: formData.phone, address: addressString }));
      setFormData({
        street: "",
        city: "",
        state: "",
        pinCode: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value)
  };

  const handleOrder = () => {
    if(user.address && paymentMethod) {
      const order = {
        items: data,
        name:user.name,
        userID: user.id,
        address: user.address ,
        phone: user.phone,
        paymentMethod: paymentMethod,
        totalAmount : totalAmount
      };
      dispatch(createOrderAsync(order))
    } else {
      toast.warning("Enter Address and Payment method");
    }
  }


  return (

   <>
      {currentOrder  &&(
      <Navigate
        to={`/order-success/${currentOrder.orderData.id}`}
        replace={true}
      ></Navigate>
    )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* This form is for address */}
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754224] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754224] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754224] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754224] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754224] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-[#754224] px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754224]"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12">
           
        <div>
          <h2 className="mb-6 text-base font-semibold leading-7 text-gray-900">
            Address Details
          </h2>
          <ul>
            <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
              {user.address ? (<div className="flex items-center gap-x-4">
                <>
                  <div className="min-w-0 flex-auto">
                    <p className="mt-1  font-semibold text-sm leading-6 text-gray-900">
                     Address : {user.address}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Phone : {user.phone}
                    </p>
                  </div>
                  <div className=" sm:flex sm:flex-col sm:items-end">
                    
                  </div>
                </>
              </div>) : (
                <p className="text-sm leading-6 text-gray-900">
                 Kindly add a new address and contact phone number.
              </p>
              )}
            </li>
          </ul>
        </div>
              <div className="mt-7 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        onChange={handlePayment}
                        value="cash"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-gray-300 text-[#754224] focus:ring-[#754224]"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        onChange={handlePayment}
                        name="payments"
                        checked={paymentMethod === "card"}
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-[#754224] focus:ring-[#754224]"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
              <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {data.map((data) => (
                      <li key={data.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={data.image.secure_url}
                            alt={data.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={data.id}>{data.name}</a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>RS {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p> {totalItems} </p>
                </div>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-[#754224] px-6 py-3 text-base font-medium text-white shadow-sm "
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-[#754224]"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
};

export default Checkout;
