import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const EmptyCart: React.FC = () => {
  return (
    <Container
      sx={{
        minHeight: '35vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box textAlign="center">
        <Typography variant="h5" component="p" sx={{color:"white"}}>
          <ShoppingCartOutlinedIcon style={{color:"#fc9b04", fontSize:"100px"}} />
          Your Cart is Empty{' '}
          <Link  style={{color:"#fc9b04"}} to="/shop" >
            Start Shopping
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default EmptyCart;
