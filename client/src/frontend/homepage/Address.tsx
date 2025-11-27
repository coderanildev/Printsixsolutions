import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useGetUserDetailsQuery, useUpdateUserAddressMutation } from "../../redux/services/users";
import { toast } from "react-toastify";

const Address = () => {
  const { data, isLoading, isError, refetch  } = useGetUserDetailsQuery();
  const [updateUserAddress] = useUpdateUserAddressMutation();

  const addresses = data?.user?.addresses || [];

  // Local state for editing
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAddress(null);
  };

  const handleChange = (e) => {
    setSelectedAddress({
      ...selectedAddress,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await updateUserAddress({
        id: selectedAddress._id,
        ...selectedAddress,
      }).unwrap();

      if (res.success) {
        toast.success("Address updated successfully!", {
          style: { backgroundColor: "#fc9b04", color: "#000", fontWeight: "bold" },
          progressStyle: { background: "#1f2937" },
        });
        refetch();
        handleClose();
      } else {
        toast.error(res.msg || "Update failed!", {
          style: { backgroundColor: "#fc9b04", color: "#000" },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating address.", {
        style: { backgroundColor: "#fc9b04", color: "#000" },
      });
    }
  };

  if (isLoading) return <Typography>Loading addresses...</Typography>;
  if (isError) return <Typography color="error">Error loading addresses.</Typography>;

  return (
    <Box sx={{ maxWidth: 1135, mx: "auto", mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "white" }}>
        My Addresses
      </Typography>

      <Grid container spacing={3}>
        {addresses.map((addr) => (
          <Grid item xs={12} md={6} key={addr._id}>
            <Card
              sx={{
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: 3,
                boxShadow: 4,
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#fc9b04", fontWeight: "bold" }}>
                  {addr.fullName}
                </Typography>
                <Typography>{addr.phone}</Typography>
                <Typography>{addr.address1}, {addr.address2}</Typography>
                <Typography>
                  {addr.city}, {addr.state}, {addr.country}
                </Typography>
                <Typography>Pin Code: {addr.postalCode}</Typography>

                <Box sx={{ mt: 1 }}>
                  {addr.isDefaultBillingAddress && (
                    <Typography
                      sx={{
                        display: "inline-block",
                        background: "#fc9b04",
                        color: "#000",
                        fontSize: "0.8rem",
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 1,
                        mr: 1,
                      }}
                    >
                      Default Billing
                    </Typography>
                  )}
                  {addr.isDefaultShippingAddress && (
                    <Typography
                      sx={{
                        display: "inline-block",
                        background: "#00bcd4",
                        color: "#000",
                        fontSize: "0.8rem",
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 1,
                      }}
                    >
                      Default Shipping
                    </Typography>
                  )}
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 2,
                    color: "#fc9b04",
                    borderColor: "#fc9b04",
                    "&:hover": {
                      backgroundColor: "#fc9b04",
                      color: "#000",
                    },
                  }}
                  onClick={() => handleEdit(addr)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Address</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Full Name & Phone */}
          <Grid item xs={12} sm={6} >
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              value={selectedAddress?.fullName || ""}
              onChange={handleChange}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={selectedAddress?.phone || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Address1 & Address2 in one row (full width combined) */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Address 1"
                  name="address1"
                  fullWidth
                  value={selectedAddress?.address1 || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address 2"
                  name="address2"
                  fullWidth
                  value={selectedAddress?.address2 || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* City & State */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              fullWidth
              value={selectedAddress?.city || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              fullWidth
              value={selectedAddress?.state || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Country & Postal Code */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              fullWidth
              value={selectedAddress?.country || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              name="postalCode"
              fullWidth
              value={selectedAddress?.postalCode || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Checkboxes */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedAddress?.isDefaultBillingAddress || false}
                  onChange={handleChange}
                  name="isDefaultBillingAddress"
                />
              }
              label="Default Billing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedAddress?.isDefaultShippingAddress || false}
                  onChange={handleChange}
                  name="isDefaultShippingAddress"
                />
              }
              label="Default Shipping"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: "#fc9b04",
            color: "#000",
            "&:hover": { backgroundColor: "#ffb733" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>

    </Box>
  );
};

export default Address;
