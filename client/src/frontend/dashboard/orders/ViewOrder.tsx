import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { useGetOrderDetailsQuery } from "../../../redux/services/order";

const ViewOrder = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderDetailsQuery(id);

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography align="center">Loading order details...</Typography>
      </Container>
    );
  }

  if (isError || !data?.order) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography align="center" color="error">
          Failed to load order details
        </Typography>
      </Container>
    );
  }

  const order = data.order;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* ================= ORDER ITEMS ================= */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Order Items
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><b>Product</b></TableCell>
                  <TableCell align="center"><b>Qty</b></TableCell>
                  <TableCell align="right"><b>Price</b></TableCell>
                  <TableCell align="right"><b>Total</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          width={60}
                          style={{ borderRadius: 6 }}
                        />
                        {item.name}
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">₹{item.price}</TableCell>
                    <TableCell align="right">
                      ₹{item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ================= ORDER + CUSTOMER INFO ================= */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Order Info */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Order Information
              </Typography>

              <Typography><b>Order ID:</b> {order._id}</Typography>
              <Typography><b>Order Status:</b> {order.orderStatus}</Typography>
              <Typography>
                <b>Payment Status:</b>{" "}
                <span style={{ color: order.paymentStatus === "Paid" ? "green" : "orange" }}>
                  {order.paymentStatus}
                </span>
              </Typography>
              <Typography><b>Payment Method:</b> {order.paymentMethod || "N/A"}</Typography>
              <Typography><b>Total Amount:</b> ₹{order.totalAmount}</Typography>
              <Typography>
                <b>Order Date:</b>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Info */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Customer Information
              </Typography>

              <Typography><b>Name:</b> {order.userId?.name}</Typography>
              <Typography><b>Email:</b> {order.userId?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= SHIPPING + BILLING ================= */}
      <Grid container spacing={3}>
        {/* Shipping */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Shipping Address
              </Typography>

              <Typography>{order.shippingAddress?.fullName}</Typography>
              <Typography>
                {order.shippingAddress?.address1},{" "}
                {order.shippingAddress?.address2}
              </Typography>
              <Typography>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </Typography>
              <Typography>{order.shippingAddress?.country}</Typography>
              <Typography><b>Phone:</b> {order.shippingAddress?.phone}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Billing */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Billing Address
              </Typography>

              <Typography>
                {order.billingAddress?.fullName || order.shippingAddress?.fullName}
              </Typography>
              <Typography>
                {order.billingAddress?.address1 || order.shippingAddress?.address1}
              </Typography>
              <Typography>
                {order.billingAddress?.city || order.shippingAddress?.city},{" "}
                {order.billingAddress?.state || order.shippingAddress?.state}{" "}
                {order.billingAddress?.postalCode ||
                  order.shippingAddress?.postalCode}
              </Typography>
              <Typography>
                {order.billingAddress?.country || order.shippingAddress?.country}
              </Typography>
              <Typography>
                <b>Phone:</b>{" "}
                {order.billingAddress?.phone || order.shippingAddress?.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewOrder;
