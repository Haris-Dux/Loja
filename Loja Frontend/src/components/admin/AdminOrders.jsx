
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersAsync } from '../../features/orderSlice';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state)=>state.order.allOrders)
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const handleEdit = (order) => {
        setEditableOrderId(order.id);
      };
    useEffect(()=>{
        dispatch(getAllOrdersAsync())
    },[dispatch]);
    const chooseColor = (status) => {
        switch (status) {
          case "pending":
            return "bg-purple-200 text-purple-800";
          case "cancelled":
            return "bg-red-300 text-red-800";
          case "dispatched":
            return "bg-yellow-200 text-yellow-800";
          case "delivered":
            return "bg-green-300 text-green-800";
            default:
              return "bg-purple-200 text-purple-800";
        }
      };
  return (
    <>
       <div className="overflow-x-auto">
      <div className="bg-gray-100 font-sans">
        <div className="max-w-screen-xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order Id#</th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-left">Amount</th>
                      <th className="py-3 px-6 text-center">Shipping Details</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.image.secure_url}
                                  alt={item.name}
                                />
                              </div>
                              <span>
                                {item.name} - #{item.quantity}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            RS {order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="">
                            <div>
                             Name : {order.name}
                            </div>
                            <div>{order.address}</div>
                              <div>Phone : {order.phone}</div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={(e) => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                              <BiPencil
                                className="w-8 h-8"
                                onClick={(e) => handleEdit(order)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminOrders
