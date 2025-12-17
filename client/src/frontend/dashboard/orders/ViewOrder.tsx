import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../../redux/services/order";

const ViewOrder = () => {
  const { id } = useParams(); 

  const { data, isLoading, isError } = useGetOrderDetailsQuery(id);

  if (isLoading) return <p>Loading order details...</p>;
  if (isError) return <p>Error loading order details.</p>;

  const order = data?.order;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
      <hr />

      {/* Order Basic Info */}
      <h3>Order Information</h3>
      <p><strong>Order ID:</strong> {order?._id}</p>
      <p><strong>Status:</strong> {order?.orderStatus}</p>
      <p><strong>Payment:</strong> {order?.paymentStatus}</p>
      <p><strong>Total Amount:</strong> ₹{order?.totalAmount}</p>
      <p><strong>Date:</strong> {new Date(order?.createdAt).toLocaleString()}</p>

      <hr />

      {/* Customer Info */}
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {order?.userId?.name}</p>
      <p><strong>Email:</strong> {order?.userId?.email}</p>

      <hr />

      {/* Shipping Address */}
      <h3>Shipping Address</h3>
      <p>{order?.shippingAddress?.fullName}</p>
      <p>{order?.shippingAddress?.address1}, {order?.shippingAddress?.address2}</p>
      <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state}</p>
      <p>{order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}</p>
      <p><strong>Phone:</strong> {order?.shippingAddress?.phone}</p>

      <hr />

      {/* Items */}
      <h3>Items</h3>
      {order?.items?.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            style={{ width: "80px", borderRadius: "5px" }} 
          />
          <p><strong>{item.name}</strong></p>
          <p>Price: ₹{item.price}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}

    </div>
  );
};

export default ViewOrder;
