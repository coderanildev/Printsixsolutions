import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateCheckoutFormData,} from "../../../redux/reducer/checkout";
import NavButtons from "../NavButtons";
import { useAddAddressMutation } from "../../../redux/services/address";
import { Button,Grid,Typography,MenuItem,Select,FormControl,InputLabel,Paper,TextField,} from "@mui/material";
import { useGetUserDetailsQuery } from "../../../redux/services/users";
import { useGetAllCountriesQuery } from "../../../redux/services/countries";
import { useGetStatesByCountryIdQuery } from "../../../redux/services/states";
import { RootState } from "../../../redux/Store";
import { billingAddress } from "../../../types/billingAddress";


const BillingDetailsForm = () => {
  const {
    data: userData,
    isLoading: loadingUserData,
    isError,
    error,
    refetch,
  } = useGetUserDetailsQuery();

  const addresses = userData?.user?.addresses;

  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );
  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );

  console.log('existingFormData',existingFormData);
  const [addAddress] = useAddAddressMutation();

  let defaultBillingAddress = {};
  if (addresses.length > 0) {
    defaultBillingAddress = addresses.find(
      (address) => address.isDefaultBillingAddress
    );
  }

  const [countryId, setCountryId] = useState("");
  const { data: countries = [] } = useGetAllCountriesQuery();
  const { data: states = [] } = useGetStatesByCountryIdQuery(countryId);

  const selectedBillingAddress = existingFormData.billingAddress || {
    billingAddressId: defaultBillingAddress?._id,
    address1: defaultBillingAddress?.address1 || "",
    address2: defaultBillingAddress?.address2 || "",
    city: defaultBillingAddress?.city || "",
    state: defaultBillingAddress?.state || "",
    postalCode: defaultBillingAddress?.postalCode || "",
    country: defaultBillingAddress?.country || "",
  };

  const [isBillingAddingNewAddress, setIsBillingAddingNewAddress] = useState(false);
  const [selectedBillingDataAddress, setSelectedBillingDataAddress] = useState<Partial<billingAddress>>(selectedBillingAddress);



  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: selectedBillingAddress });

  const watchedCountry = watch("country");
  const watchedState = watch("state");

  useEffect(() => {
    if (!isBillingAddingNewAddress) {
      reset(selectedBillingDataAddress);
    }
  }, [selectedBillingDataAddress, reset, isBillingAddingNewAddress]);

  useEffect(() => {
  if (selectedBillingDataAddress?.country) {
    const id = countries.find(c => c.name === selectedBillingDataAddress.country)?._id;
    if (id) setCountryId(id);
  }
}, [countries, selectedBillingDataAddress]);

  const processData = async (data) => {
    let billingFormData = {};

    if (!data.billingAddressId) {
      try {
        const newAddress = {
          userId: existingFormData?.userId,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          isDefaultBillingAddress: false,
          isDefaultShippingAddress: false,
        };

        const response = await addAddress(newAddress).unwrap();
        const newAddressId = response?.id;

        billingFormData = {
          billingAddress: { ...newAddress, billingAddressId: newAddressId },
        };
      } catch (err) {
        console.error("Address creation failed", err);
      }
    } else {
      billingFormData = {
        billingAddress: {
          billingAddressId: selectedBillingDataAddress.billingAddressId,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
      };
    }

    dispatch(updateCheckoutFormData(billingFormData));
    dispatch(setCurrentStep(currentStep + 1));
  };
  

  //  const onSubmit = async (data: billingAddress) => {
  
  //     if (isBillingAddingNewAddress || addresses.length === 0) {
  //       const addressResult = await addAddress({
  //         ...data,
  //         fullName: existingFormData?.name,
  //         phone: existingFormData?.phone,
  //       }).unwrap();
  //     }
  
  //     await refetch();
  
  //     const billingAddress = {
  //       ...data,
  //       fullName: existingFormData?.name,
  //       phone: existingFormData?.phone,
  //     };
  
  //     dispatch(
  //       updateCheckoutFormData({
  //         billingAddress: billingAddress,
  //       })
  //     );
     
  //     dispatch(setCurrentStep(currentStep + 1));
  // };

  const onSubmit = async (data: billingAddress) => {
  let billingAddressToStore;

  if (isBillingAddingNewAddress || addresses.length === 0) {
    try {
      // Save new address
      await addAddress({
        ...data,
        fullName: existingFormData?.name,
        phone: existingFormData?.phone,
      }).unwrap();

      // Refetch the user addresses
      const { data: updatedUserData } = await refetch();

      // Get the last address (assume it’s the newly added one)
      const lastAddress = updatedUserData?.user?.addresses?.slice(-1)[0];

      if (!lastAddress) throw new Error("Address not found after creation");

      billingAddressToStore = {
        ...data,
        billingAddressId: lastAddress._id,
        _id: lastAddress._id,
        isDefaultBillingAddress: lastAddress.isDefaultBillingAddress || false,
        isDefaultShippingAddress: lastAddress.isDefaultShippingAddress || false,
        fullName: existingFormData?.name,
        phone: existingFormData?.phone,
      };
    } catch (err) {
      console.error("Address creation failed", err);
      return;
    }
  } else {
    // Existing address selected
    billingAddressToStore = {
      ...selectedBillingDataAddress,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
    };
  }

  dispatch(updateCheckoutFormData({ billingAddress: billingAddressToStore }));
  dispatch(setCurrentStep(currentStep + 1));
};

  
  return (
    <Paper className="p-4" style={{backgroundColor:"#1f2937"}}>
      <Typography variant="h6" gutterBottom style={{color:"white"}}>
          Billing Address
      </Typography>
       {/* Address Selection */}
            {!isBillingAddingNewAddress  && addresses.length > 0 && (
              <div className="mb-3">
                <TextField
                  fullWidth
                  select
                  label="Select Billing Address"
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
                  value={selectedBillingDataAddress?.billingAddressId || defaultBillingAddress?._id || ""}
                  onChange={(e) => {
                    const selected = addresses.find(
                      (addr) => addr._id === e.target.value
                    );
                    setSelectedBillingDataAddress({
                      ...selected,
                      billingAddressId: selected._id,
                    });

                  }}
                >
                  {addresses.map((addr) => (
                    <MenuItem key={addr._id} value={addr._id}>
                      {addr.address1} {addr.address2}, {addr.city},{" "}
                      {addr.postalCode}, {addr.country},{addr.state}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsBillingAddingNewAddress(true);
                    setSelectedBillingDataAddress({});
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
                    setIsBillingAddingNewAddress(false);
                  }}
                  className="mt-2"
                >
                  Add New Address
                </Button>
              </div>
            )}
      {!isBillingAddingNewAddress && selectedBillingDataAddress.length > 0 && (
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="billing-select-label">
                Select Billing Address
              </InputLabel>
              <Select
                labelId="billing-select-label"
                value={selectedBillingDataAddress?.billingAddressId || ""}
                onChange={(e) => {
                  const addr = selectedBillingDataAddress.find(
                    (a) => a.id === e.target.value
                  );
                  setSelectedBillingDataAddress({
                    billingAddressId: addr.id,
                    streetAddress1: addr.address1,
                    streetAddress2: addr.address2,
                    city: addr.city,
                    state: addr.state,
                    postalCode: addr.postalCode,
                    country: addr.country,
                  });
                }}
              >
                {selectedBillingDataAddress.map((addr) => (
                  <MenuItem key={addr.id} value={addr.id}>
                    {addr.streetAddress1} {addr.streetAddress2}, {addr.city},{" "}
                    {addr.state}, {addr.zipcode}, {addr.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                setIsBillingAddingNewAddress(true);
                reset({
                  billingAddressId: "",
                  streetAddress1: "",
                  streetAddress2: "",
                  city: "",
                  state: "",
                  zipcode: "",
                  country: "",
                });
              }}
            >
              Add New Address
            </Button>
          </Grid>
        </Grid>
      )}

      {isBillingAddingNewAddress && (
        <Button
          variant="outlined"
          fullWidth
          className="mb-3"
          onClick={() => {
            setIsBillingAddingNewAddress(false);
            reset(selectedBillingDataAddress);
          }}
        >
          Select From Saved Addresses
        </Button>
      )}

      <form onSubmit={handleSubmit(onSubmit)} >
        <Typography variant="h6" gutterBottom style={{color:"white"}}>
          Billing Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} sx={{
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
              }}>
            <TextField
              label="Address Line 1"
              fullWidth
              {...register("address1", { required: "Required" })}
              error={!!errors.address1}
              helperText={errors.address1?.message}
              
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{
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
              }}>
            <TextField
              label="Address Line 2"
              fullWidth
              {...register("address2", { required: "Required" })}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{
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
              }}>
            <TextField
              label="City"
              fullWidth
              {...register("city", { required: "Required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{
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
              }}>
            <TextField
              label="Postal Code"
              fullWidth
              {...register("postalCode", { required: "Required" })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{
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
              }}>
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
            >
              {countries.map((c) => (
                <MenuItem key={c._id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} sx={{
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
              }}>
            <TextField
              label="State"
              select
              fullWidth
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
        <NavButtons />
      </form>
    </Paper>
  );
};

export default BillingDetailsForm;
