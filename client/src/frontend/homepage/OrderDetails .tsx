import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../redux/services/order";
import { Typography, Box, Card, CardContent } from "@mui/material";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);

  if (isLoading) return <Typography>Loading order...</Typography>;

  const order = data?.order;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Card sx={{ background: "#1f2937", color: "white", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, color: "#fc9b04" }}>
            Order Details
          </Typography>

          <Typography>Order ID: {order._id}</Typography>
          <Typography>Date: {new Date(order.createdAt).toLocaleString()}</Typography>
          <Typography>Status: {order.orderStatus}</Typography>
          <Typography>Total Amount: ₹{order.totalAmount}</Typography>

          <Typography variant="h6" sx={{ mt: 3, color: "#fc9b04" }}>
            Items
          </Typography>

          {order.items?.map((item) => (
            <Box key={item.productId} sx={{ mt: 1 }}>
              <Typography>Product: {item.productName}</Typography>
              <Typography>Qty: {item.quantity}</Typography>
              <Typography>Price: ₹{item.price}</Typography>
            </Box>
          ))}

          <Typography variant="h6" sx={{ mt: 3, color: "#fc9b04" }}>
            Shipping Address
          </Typography>

          <Typography>{order.shippingAddress?.name}</Typography>
          <Typography>{order.shippingAddress?.address}</Typography>
          <Typography>{order.shippingAddress?.city}</Typography>
          <Typography>{order.shippingAddress?.pincode}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
