import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setCurrentStep } from "../../../redux/reducer/checkout";
import { clearCart } from "../../../redux/reducer/cart";

const OrderSummary: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rawCart = useSelector((state: any) => state.cart);
  const checkoutFormData = useSelector(
    (state: any) => state.checkout?.checkoutFormData || {}
  );
  const currentStep = useSelector(
    (state: any) => state.checkout?.currentStep || 1
  );

  const cartItemsArray: any[] = Array.isArray(rawCart)
    ? rawCart
    : Array.isArray(rawCart?.items)
    ? rawCart.items
    : Array.isArray(rawCart?.cartItems)
    ? rawCart.cartItems
    : [];

  const handlePrevious = () => {
    dispatch(setCurrentStep(Math.max(1, currentStep - 1)));
  };

  // ✅ Fixed subtotal
  const subTotal = cartItemsArray.reduce((acc, item) => {
    const price = parseFloat(item.salePrice || item.price || 0);
    const qty = parseInt(item.qty || 1);
    return acc + price * qty;
  }, 0);

  const shippingCost = checkoutFormData.shippingCost
    ? parseFloat(checkoutFormData.shippingCost)
    : 16; // default $16
  const total = (subTotal + shippingCost).toFixed(2);

  const handleSubmit = async () => {
    if (cartItemsArray.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      dispatch(setCurrentStep(1));
      navigate("/order-confirmation/demo123");
    }, 1400);
  };

  return (
    <div className="my-4 container">
      <Typography variant="h5" gutterBottom sx={{color:"white"}}>
        Order Summary
      </Typography>

      {cartItemsArray.length === 0 ? (
        <Typography variant="body2" sx={{color:"white"}}>
          Your cart is empty.
        </Typography>
      ) : (
        cartItemsArray.map((item: any, i: number) => (
          <Card className="mb-3" key={i}>
            <Grid container>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  image={item.imageUrl || item.image || ""}
                  alt={item.title || item.name || "product"}
                  height="80"
                  style={{ objectFit: "contain", padding: "10px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography variant="subtitle1">
                    {item.title || item.name}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <span className="badge bg-secondary">{item.qty}</span>
                <Typography variant="subtitle1">
                  ${(parseFloat(item.salePrice || item.price) || 0).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))
      )}

      <div className="d-flex justify-content-between py-2 border-bottom">
        <Typography sx={{color:"white"}}>Cart Subtotal</Typography>
        <Typography sx={{color:"white"}}>${subTotal.toFixed(2)}</Typography>
      </div>

      <div className="d-flex justify-content-between py-2 border-bottom">
        <Typography sx={{color:"white"}}>Shipping Cost</Typography>
        <Typography sx={{color:"white"}}>${shippingCost.toFixed(2)}</Typography>
      </div>

      <div className="d-flex justify-content-between py-2 border-bottom">
        <Typography variant="h6" sx={{color:"white"}}>Total</Typography>
        <Typography variant="h6" sx={{color:"white"}}>${total}</Typography>
      </div>

      <div className="mt-4 d-flex justify-content-between">
        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<ChevronLeft />}
          onClick={handlePrevious}
        >
          Previous
        </Button> */}

        {/* <Button
          variant="contained"
          color="success"
          endIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : <ChevronRight />
          }
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </Button> */}
      </div>
    </div>
  );
};

export default OrderSummary;
