import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../../../redux/reducer/checkout";
import { useAddAddressMutation } from "../../../redux/services/address";
import NavButtons from "../NavButtons";
import { useGetAllCountriesQuery } from "../../../redux/services/countries";
import { useGetStatesByCountryIdQuery } from "../../../redux/services/states";
import { RootState } from "../../../redux/Store";
import { ShippingAddress } from "../../../types/shippingaddress";
import { useGetUserDetailsQuery } from "../../../redux/services/users";
import { Address } from "../../../types/address";

export default function ShippingDetailsForm() {
  const {
    data: userData,
    isLoading: loadingUserData,
    isError,
    error,
    refetch,
  } = useGetUserDetailsQuery();

  const addresses = userData?.user?.addresses;

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Partial<ShippingAddress>>({});

  const [shippingCostError, setShippingCostError] = useState(false);

  const [countryId, setCountryId] = useState("");
  const { data: countries = [] } = useGetAllCountriesQuery();
  const { data: states = [] } = useGetStatesByCountryIdQuery(countryId);

  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );
  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );

  const [shippingCost, setShippingCost] = useState(
    existingFormData?.shippingCost || 0
  );

  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();

  // useEffect(() => {
  //   if (existingFormData?.shippingAddress) {
  //     setSelectedAddress(existingFormData.shippingAddress);
  //   } else {
  //     const defaultAddr = addresses.find((a) => a.isDefaultShippingAddress);
  //     setSelectedAddress(defaultAddr || {});
  //   }
  // }, [addresses, existingFormData]);
  useEffect(() => {
  if (!addresses || addresses.length === 0) return;
  if (existingFormData?.shippingAddress?._id) {
    const savedAddress = addresses.find(
      (a) => a._id === existingFormData.shippingAddress._id
    );
    setSelectedAddress(savedAddress || {});
  } else {
    const defaultAddr = addresses.find((a) => a.isDefaultShippingAddress);
    setSelectedAddress(defaultAddr || {});
  }
}, [addresses, existingFormData]);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const watchedCountry = watch("country");
  const watchedState = watch("state");

  useEffect(() => {
    if (selectedAddress) {
      reset(selectedAddress);
      if (selectedAddress.country) {
        setValue("country", selectedAddress.country);
      }
      if (selectedAddress.state) {
        setValue("state", selectedAddress.state);
      }
    }
  }, [selectedAddress, reset, setValue]);

  useEffect(() => {
    const selected = countries.find((c) => c.name === watchedCountry);
    if (selected) {
      setCountryId(selected._id);
    }
  }, [watchedCountry, countries]);

  useEffect(() => {
    if (!isAddingNewAddress && selectedAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, isAddingNewAddress, reset]);

  useEffect(() => {
    if (selectedAddress?.country && countries.length > 0) {
      const country = countries.find((c) => c.name === selectedAddress.country);
      if (country) setCountryId(country._id);
    }
  }, [selectedAddress, countries]);


  // const onSubmit = async (data: ShippingAddress) => {

  //   if (shippingCost === 0) {
  //     setShippingCostError(true);
  //     return;
  //   }
  //   setShippingCostError(false);
  //   let savedShippingAddress;

  //   if (isAddingNewAddress || addresses.length === 0) {
  //     const addressResult = await addAddress({
  //       ...data,
  //       fullName: existingFormData?.name,
  //       phone: existingFormData?.phone,
  //     }).unwrap();
  //     savedShippingAddress = addressResult?.data || addressResult; 

  //   } else {
  //   savedShippingAddress = selectedAddress;
  //   }

  //   await refetch();

  //   const shippingAddress = {
  //     ...savedShippingAddress,
  //     fullName: existingFormData?.name,
  //     phone: existingFormData?.phone,
  //     shippingAddressId: savedShippingAddress?._id || null,
  //     _id: savedShippingAddress?._id || null,
  //     isDefaultShippingAddress: savedShippingAddress?.isDefaultShippingAddress || false,
  //     isDefaultBillingAddress: savedShippingAddress?.isDefaultBillingAddress || false,
  //   };

  //   dispatch(
  //     updateCheckoutFormData({
  //       shippingAddress: shippingAddress,
  //       shippingCost,
  //     })
  //   );
  //   await refetch();

  //   dispatch(setCurrentStep(currentStep + 1));
  // };

const onSubmit = async (data: ShippingAddress) => {
  if (shippingCost === 0) {
    setShippingCostError(true);
    return;
  }
  setShippingCostError(false);

  let savedShippingAddress;

  if (isAddingNewAddress || addresses.length === 0) {
    const response = await addAddress({
      ...data,
      fullName: existingFormData?.name,
      phone: existingFormData?.phone,
    }).unwrap();

    const refetched = await refetch();

    const updatedAddresses =
      refetched?.data?.user?.addresses ||
      response?.data?.user?.addresses ||
      [];

    const lastAddress = updatedAddresses[updatedAddresses.length - 1];

    if (!lastAddress) {
      console.error("⚠️ No address found after refetch!");
      return;
    }

    savedShippingAddress = lastAddress;
    setSelectedAddress(lastAddress);
    reset(lastAddress);
    setIsAddingNewAddress(false);
  } else {
    savedShippingAddress = selectedAddress;
  }

  const shippingAddress = {
    ...savedShippingAddress,
    fullName: existingFormData?.name,
    phone: existingFormData?.phone,
    shippingAddressId: savedShippingAddress?._id || null,
    _id: savedShippingAddress?._id || null,
    isDefaultShippingAddress:
      savedShippingAddress?.isDefaultShippingAddress || false,
    isDefaultBillingAddress:
      savedShippingAddress?.isDefaultBillingAddress || false,
  };

  dispatch(
    updateCheckoutFormData({
      shippingAddress,
      shippingCost,
    })
  );

  dispatch(setCurrentStep(currentStep + 1));
};


  return (
    <Paper className="p-4" style={{backgroundColor:"#1f2937"}}>
      <Typography variant="h6" gutterBottom style={{color:"white"}}>
        Shipping Details
      </Typography>

      {/* Address Selection */}
      {!isAddingNewAddress && addresses.length > 0 && (
        <div className="mb-3">
          <TextField
            fullWidth
            select
            label="Select Shipping Address"
            sx={{
                "& .MuiInputLabel-root": {
            fontSize: "0.9rem",
            top: "-4px",
            color: error ? "#fc9b04" : "#fc9b04", 
              },
              "& .MuiInputLabel-shrink": {
                color: error ? "#fc9b04" : "#fc9b04",
              },
            }}
            value={selectedAddress?._id || ""}
            onChange={(e) => {
              const selected = addresses.find(
                (addr) => addr._id === e.target.value
              );
              setSelectedAddress({
                ...selected,
                shippingAddressId: selected._id,
              });
            }}
          >
            {addresses.map((addr) => (
              <MenuItem key={addr._id} value={addr._id}>
                {addr.address1} {addr.address2}, {addr.city},{addr.state},{" "}
                {addr.postalCode}, {addr.country}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            onClick={() => {
              setIsAddingNewAddress(true);
              setSelectedAddress({});
              reset({
                address1: "",
                address2: "",
                country: "",
                state: "",
                city: "",
                postalCode: "",
              });
              setCountryId("");
              setShippingCost(0);
              setShippingCostError(false);
            }}
            className="mt-2"
          >
            Add New Address
          </Button>
        </div>
      )}

      {isAddingNewAddress && (
        <Button
          variant="outlined"
          onClick={() => {
            setIsAddingNewAddress(false);
            reset(selectedAddress);
          }}
          className="mb-3"
        >
          Use Existing Address
        </Button>
      )}

      {/* Address Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} style={{padding:"20px 20px"}}>
            <TextField
              label="Address Line 1"
              fullWidth
              {...register("address1", { required: "Required" })}
              error={!!errors.address1}
              helperText={errors.address1?.message}
              sx={{
                "& .MuiInputBase-root": {
                  height: 43, 
                },
                "& .MuiOutlinedInput-input": {
                  padding: "0 8px",   
                  height: "100%",   
                  display: "flex",
                  alignItems: "center", 
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                  top: "-4px",
                  color: "#fc9b04",
                },
           
                display: "flex", flexDirection: "column", gap: 2
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{padding:"20px 20px"}}>
            <TextField
              label="Address Line 2"
              fullWidth
              {...register("address2", { required: "Required" })}
              error={!!errors.address2}
              helperText={errors.address2?.message}
              sx={{
                "& .MuiInputBase-root": {
                  height: 43, 
                },
                "& .MuiOutlinedInput-input": {
                  padding: "0 8px",   
                  height: "100%",   
                  display: "flex",
                  alignItems: "center", 
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                  top: "-4px",
                  color: "#fc9b04",
                },
                display: "flex", flexDirection: "column", gap: 2 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{padding:"20px 20px"}}>
            <TextField
              label="City"
              fullWidth
              {...register("city", { required: "Required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
              sx={{
                "& .MuiInputBase-root": {
                  height: 43, 
                },
                "& .MuiOutlinedInput-input": {
                  padding: "0 8px",   
                  height: "100%",   
                  display: "flex",
                  alignItems: "center", 
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                  top: "-4px",
                  color: "#fc9b04",
                },
                display: "flex", flexDirection: "column", gap: 2 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{padding:"20px 20px"}}>
            <TextField
              label="Postal Code"
              fullWidth
              {...register("postalCode", { required: "Required" })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
              sx={{
                "& .MuiInputBase-root": {
                  height: 43, 
                },
                "& .MuiOutlinedInput-input": {
                  padding: "0 8px",   
                  height: "100%",   
                  display: "flex",
                  alignItems: "center", 
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                  top: "-4px",
                  color: "#fc9b04",
                },
                display: "flex", flexDirection: "column", gap: 2 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{padding:"20px 20px"}}>
            <TextField
              label="Country"
              select
              fullWidth
              {...register("country", { required: "Required" })}
              value={watchedCountry || ""}
              onChange={(e) => {
                const name = e.target.value;
                setValue("country", name);
                const id = countries.find((c) => c.name === name)?._id;
                if (id) setCountryId(id);
              }}
              error={!!errors.country}
              helperText={errors.country?.message}
              sx={{
                "& .MuiInputBase-root": {
                  height: 43, 
                },
                "& .MuiOutlinedInput-input": {
                  padding: "0 8px",
                  height: "100%",   
                  display: "flex",
                  alignItems: "center", 
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                  top: "-4px",
                  color: "#fc9b04",
                },
                display: "flex", flexDirection: "column", gap: 2 
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c._id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} style={{padding:"20px 20px"}}>
            <TextField
              label="State"
              select
              sx={{
                "& .MuiInputBase-root": {
                  height: 43, 
                },
                "& .MuiOutlinedInput-input": {
                  padding: "0 8px",   
                  height: "100%",   
                  display: "flex",
                  alignItems: "center", 
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.8rem",
                  top: "-4px",
                  color: "#fc9b04",
                },
                display: "flex", flexDirection: "column", gap: 2 
              }}
              {...register("state", { required: "Required" })}
              value={watchedState || ""}
              onChange={(e) => setValue("state", e.target.value)}
              error={!!errors.state}
              helperText={errors.state?.message}
            >
              {states.map((s) => (
                <MenuItem key={s._id} value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Shipping Cost */}
        <FormControl component="fieldset" className="mt-4">
          <FormLabel component="legend" style={{color:"white"}}>Shipping Cost</FormLabel>
          <RadioGroup
            row
            name="shippingCost"
            value={shippingCost}
            onChange={(e) => setShippingCost(Number(e.target.value))}
          >
            <FormControlLabel
            style={{color:"white"}}
              value="8"
              control={<Radio  style={{color:"white"}} />}
              label={
                <span>
                  <LocalShippingIcon /> UPS - $8
                </span>
              }
            />
            <FormControlLabel
            style={{color:"white"}}
              value="16"
              control={<Radio style={{color:"white"}} />}
              label={
                <span>
                  <LocalShippingIcon style={{color:"white"}} /> UPS - $16
                </span>
              }
            />
          </RadioGroup>
          {shippingCostError && (
            <Typography color="error">Please select a shipping cost</Typography>
          )}
        </FormControl>

        <div className="mt-4">
          <NavButtons loading={isAdding} />
        </div>
      </form>
    </Paper>
  );
}
