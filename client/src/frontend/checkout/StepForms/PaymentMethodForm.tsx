import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../../../redux/reducer/checkout";

import NavButtons from "../NavButtons";
import { RootState } from "../../../redux/Store";

import { useCreateOrderMutation } from "../../../redux/services/order";
import { toast } from "react-toastify";

import { useCartItems } from "../../../hooks/useCartItems";

export default function PaymentMethodForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🟢 NOW VALID — Hooks inside component
  const currentStep = useSelector(
    (store: RootState) => store.checkout.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData
  );

  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.userId;

  // 🟢 cartItems now works without throwing useContext error
  const { cartItems } = useCartItems(isAuthenticated);
  console.log("cartItems payment mode page", cartItems);

  const [createOrder] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...existingFormData },
  });

  const initialPaymentMethod = existingFormData.paymentMethod || "";
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  const processData = async (data: any) => {
    data.paymentMethod = paymentMethod;
    dispatch(updateCheckoutFormData(data));

    // Calculate totals
  const subTotal = cartItems.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0
  );

  const totalAmount = subTotal + existingFormData.shippingCost;

  // FINAL ORDER PAYLOAD (NO ERROR)
  const orderPayload = {
    userId: user?.userId,
    billingAddress: existingFormData.billingAddress,
    shippingAddress: existingFormData.shippingAddress,

    items: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.salePrice,
      imageUrl: item.imageUrl,
    })),

    subTotal,
    shippingCost: existingFormData.shippingCost,
    totalAmount,

    paymentMethod: paymentMethod,
  };

  console.log("FINAL ORDER PAYLOAD", orderPayload);

    try {
      const res = await createOrder(orderPayload).unwrap();
      toast.success("Order placed successfully!");
      navigate("/customer/orders");

      dispatch(setCurrentStep(currentStep + 1));
    } catch (error: any) {
      toast.error("Failed to place order");
      console.error("Order error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <Typography sx={{ color: "white" }} variant="h5" gutterBottom>
        Payment Method
      </Typography>

      <FormControl component="fieldset" fullWidth className="mb-4">
        <FormLabel component="legend" sx={{ color: "white" }}>
          Which payment method do you prefer?
        </FormLabel>

        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Grid container spacing={2}>
            {/* COD option */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1px 8px",
                  border:
                    paymentMethod === "Cash On Delivery"
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  backgroundColor:
                    paymentMethod === "Cash On Delivery" ? "#e3f2fd" : "#fff",
                }}
              >
                <FormControlLabel
                  value="Cash On Delivery"
                  control={
                    <Radio {...register("paymentMethod", { required: true })} />
                  }
                  label={
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <FavoriteIcon color="action" />
                      <Typography>Cash On Delivery</Typography>
                    </div>
                  }
                />
                <CircleOutlinedIcon />
              </Paper>
            </Grid>

            {/* Credit Card option */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1px 8px",
                  border:
                    paymentMethod === "Credit Card"
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  backgroundColor:
                    paymentMethod === "Credit Card" ? "#e3f2fd" : "#fff",
                }}
              >
                <FormControlLabel
                  value="Credit Card"
                  control={
                    <Radio {...register("paymentMethod", { required: true })} />
                  }
                  label={
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <CreditCardIcon color="action" />
                      <Typography>Credit Card</Typography>
                    </div>
                  }
                />
                <CircleOutlinedIcon />
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>

        {errors.paymentMethod && (
          <Typography color="error" variant="body2">
            Please select a payment method.
          </Typography>
        )}
      </FormControl>

      <NavButtons />
    </form>
  );
}
