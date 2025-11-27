import React from "react";
import { useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { Box, Typography, Badge, IconButton } from "@mui/material";

export default function Steps({ steps }) {
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const cartItems = useSelector((store) => store.cart);

  return (
    <nav className="d-flex mb-4" >
      <ol className="d-flex flex-wrap align-items-center gap-2 list-unstyled m-0 p-0" >
        {/* Cart Step */}
        <li>
          <Link to="/cart" className="text-decoration-none  d-flex align-items-center" >
            <Typography variant="body1" fontWeight="medium" className="me-2" style={{color:"white"}}>
              Cart
            </Typography>
            <Badge badgeContent={cartItems.length} style={{color:"white"}} />
          </Link>
        </li>

        {/* Dynamic Steps */}
        {steps.map((step, i) => (
          <li key={i} className="d-flex align-items-center">
            <ChevronRightIcon fontSize="small" className="text-muted" />
            <Typography
              variant="body2"
              className={`ms-2 ${step.number === currentStep ? "text-warning  fw-bold" : "text-white"}`}
            >
              {step.title}
            </Typography>
          </li>
        ))}
      </ol>
    </nav>
  );
}
