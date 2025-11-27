import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface CartSubTotalCardProps {
  subTotal: number;
}

const CartSubTotalCard: React.FC<CartSubTotalCardProps> = ({ subTotal }) => {

  const shipping = 10;
  const tax = 0;
  const totalPrice = (Number(subTotal) + shipping + tax).toFixed(2);

  return (
    <Box sx={{ p: 2, borderRadius: 2 }} className="shadow-sm">
      <Typography variant="h5" gutterBottom sx={{color:"white"}}>
        Cart Total
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography sx={{color:"white"}}>Subtotal</Typography>
        <Typography sx={{color:"white"}}>${subTotal.toFixed(2)}</Typography>
      </Box>
      <Divider />

      <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
        <Typography sx={{color:"white"}}>Tax</Typography>
        <Typography sx={{color:"white"}}>${tax.toFixed(2)}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography sx={{color:"white"}}>Shipping</Typography>
        <Typography sx={{color:"white"}}>${shipping.toFixed(2)}</Typography>
      </Box>

      <Typography variant="body2" color="textSecondary" sx={{color:"white", borderBottom: 1, borderColor: 'grey.300', pb: 2 }}>
        We only charge for shipping
      </Typography>

      <Box display="flex" justifyContent="space-between" py={2}>
        <Typography fontWeight="bold" sx={{color:"white"}}>Total</Typography>
        <Typography fontWeight="bold" sx={{color:"white"}}>${totalPrice}</Typography>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={RouterLink}
          to="/checkout"
          className="rounded"
          sx={{color:"white"}}
        >
          Continue to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartSubTotalCard;
