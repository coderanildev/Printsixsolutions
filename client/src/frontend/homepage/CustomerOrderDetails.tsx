import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../redux/services/order";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Grid
} from "@mui/material";

const CustomerOrderDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOrderDetailsQuery(id);

  if (isLoading) return <Typography>Loading order...</Typography>;
  if (isError) return <Typography color="error">Unable to load order.</Typography>;

  const order = data?.order;

  if (!order) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        ❌ No order found with this ID
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Card sx={{ background: "#1f2937", color: "white", borderRadius: 3 }}>
        <CardContent>
          {/* HEADER */}
          <Typography variant="h5" sx={{ mb: 1, color: "#fc9b04" }}>
            Order Details
          </Typography>

          <Typography>Order ID: {order._id}</Typography>
          <Typography>Date: {new Date(order.createdAt).toLocaleString()}</Typography>
          <Typography>Status: {order.orderStatus}</Typography>
          <Typography>Payment: {order.paymentStatus}</Typography>
          <Typography>Payment Method: {order.paymentMethod}</Typography>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          {/* ORDER TOTALS */}
          <Box sx={{ mb: 2 }}>
            <Typography>Subtotal: ₹{order.subTotal}</Typography>
            <Typography>Shipping Cost: ₹{order.shippingCost}</Typography>

            <Typography variant="h6" sx={{ color: "#fc9b04", mt: 1 }}>
              Total Amount: ₹{order.totalAmount}
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          {/* ITEMS LIST */}
          <Typography variant="h6" sx={{ color: "#fc9b04" }}>
            Items
          </Typography>

          {order.items?.map((item, index) => (
            <Grid
              container
              key={index}
              spacing={2}
              sx={{
                mt: 2,
                p: 1,
                borderBottom: "1px solid #333",
                alignItems: "center"
              }}
            >
              <Grid item xs={2}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "100%",
                    borderRadius: 8
                  }}
                />
              </Grid>

              <Grid item xs={10}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography>Price: ₹{item.price}</Typography>
                <Typography>Qty: {item.quantity}</Typography>
              </Grid>
            </Grid>
          ))}

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          {/* BILLING ADDRESS */}
          <Typography variant="h6" sx={{ color: "#fc9b04" }}>
            Billing Address
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Typography>{order.billingAddress.fullName}</Typography>
            <Typography>{order.billingAddress.address1}</Typography>
            {order.billingAddress.address2 && (
              <Typography>{order.billingAddress.address2}</Typography>
            )}
            <Typography>
              {order.billingAddress.city}, {order.billingAddress.state} -{" "}
              {order.billingAddress.postalCode}
            </Typography>
            <Typography>{order.billingAddress.country}</Typography>
            <Typography>Phone: {order.billingAddress.phone}</Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          {/* SHIPPING ADDRESS */}
          <Typography variant="h6" sx={{ color: "#fc9b04" }}>
            Shipping Address
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Typography>{order.shippingAddress.fullName}</Typography>
            <Typography>{order.shippingAddress.address1}</Typography>
            {order.shippingAddress.address2 && (
              <Typography>{order.shippingAddress.address2}</Typography>
            )}
            <Typography>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.postalCode}
            </Typography>
            <Typography>{order.shippingAddress.country}</Typography>
            <Typography>Phone: {order.shippingAddress.phone}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerOrderDetails;
