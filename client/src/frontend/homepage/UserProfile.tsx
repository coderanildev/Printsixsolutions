import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useGetUserDetailsQuery, useUpdateUserProfileMutation } from "../../redux/services/users";


const UserProfile = () => {
  const {
    data: userData,
    isLoading: loadingUserData,
    isError,
    error,
  } = useGetUserDetailsQuery();

  const [updateUserProfile] = useUpdateUserProfileMutation();

  // ✅ Local state for form
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  // ✅ When backend data arrives, update the state
  useEffect(() => {
    if (userData?.user) {
      setUser((prev) => ({
        ...prev,
        name: userData.user.name || "",
        email: userData.user.email || "",
        phone: userData.user.phone || "",
      }));
    }
  }, [userData]);

  if (loadingUserData) return <div>Loading…</div>;
  if (isError) return <div>Error: {JSON.stringify(error)}</div>;

  // ✅ Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  

  // ✅ Styling for text fields
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      color: "black",
      height: 43,
      "& fieldset": { borderColor: "#444" },
      "&:hover fieldset": { borderColor: "#fc9b04" },
      "& input": { color: "black" },
    },
    "& .MuiInputLabel-root": {
      color: "#fc9b04",
      fontSize: "0.9rem",
      top: "-4px",
    },
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateUserProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
      }).unwrap();

      if (response.success) {
        toast("Product updated successfully", {
  style: {
    backgroundColor: "#fc9b04",
    color: "white",
    fontWeight: "bold",
  },
  progressStyle: {
    background: "#1f2937", 
  }
});
        
      } else {
        alert(response.msg || "Update failed!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error. Please try again later.");
    }
  };


  return (
    <Box>
      {/* --- Profile Card --- */}
      <Card
        sx={{
          maxWidth: 1135,
          mx: "auto",
          backgroundColor: "#1f2937",
          color: "white",
          borderRadius: 3,
          boxShadow: 5,
          mb: 5,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Avatar
              src={user.avatar}
              sx={{ width: 90, height: 90, border: "2px solid #fc9b04" }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                {user.name || "Guest User"}
              </Typography>
              <Typography variant="body1" sx={{ color: "gray" }}>
                {user.email || "No email found"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#fc9b04" }}>
                Customer Account
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, backgroundColor: "#333" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fc9b04",
                color: "black",
                fontWeight: "bold",
                px: 4,
                "&:hover": { backgroundColor: "#ffb733" },
              }}
              onClick={handleUpdateProfile}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
