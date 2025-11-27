import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Link as MuiLink,
} from "@mui/material";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../redux/services/auth";
import { useAppDispatch } from "../../redux/hooks";
import {
  setCredential,
  setToken,
  setRefreshToken,
} from "../../redux/reducer/auth";
import { migrateGuestCart } from "../../utils/migrateGuestCart";
import { useAddCartItemMutation } from "../../redux/services/cart";
import { LoginInput, loginSchema } from "../../types/logininput";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const [addCartItem] = useAddCartItemMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log("res:", res);

      if (res && res.success) {
        const token = res.token;
        const role = res.role;

        toast.success("You are now logged in", {
          position: "top-center",
        });

        dispatch(setToken(token));
        dispatch(setRefreshToken(res?.refreshToken));
        dispatch(setCredential(res));

        await migrateGuestCart(addCartItem);

        if (role === "ADMIN") {
          navigate("/dashboard");
        } else if (role === "VENDOR") {
          navigate("/vendor");
        } else {
          navigate("/customer");
        }
      } else {
        toast.error(
          res?.msg || "Login failed. Please check your credentials.",
          {
            position: "top-center",
          }
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-4"
      noValidate
      autoComplete="off"
      sx={{
        "& .MuiInputBase-root": {
          height: 40, 
        },
        "& .MuiOutlinedInput-input": {
          padding: "0 8px",   
          height: "100%",   
          display: "flex",
          alignItems: "center", 
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.8rem",
          top: "-4px"
        },
        display: "flex", flexDirection: "column", gap: 2 
      }}
    >
      <div>
        <TextField
          fullWidth
          type="email"
          label="Enter your email address"
          {...register("email")}
          helperText={errors.email?.message}
          error={!!errors.email}
          variant="outlined"
        />
      </div>

      <div>
        <TextField
          fullWidth
          type="password"
          label="Enter your password"
          {...register("password")}
          helperText={errors.password?.message}
          error={!!errors.password}
          variant="outlined"
        />
      </div>

      {isSubmitting ? (
        <Button
          fullWidth
          variant="contained"
          disabled
          startIcon={<CircularProgress size={20} color="inherit" />}
        >
          Signing you in please wait...
        </Button>
      ) : (
        <Button
          sx={{color:"white"}}
          fullWidth
          variant="contained"
          type="submit"
          className="text-uppercase fw-medium"
          disabled={isSubmitting}
        >
          Login
        </Button>
      )}

      <Box>
        <Typography variant="body2">
          <Link
            to="/forget-password"
            style={{color:"#fc9b04"}}
          >
            Forgot Password?
          </Link>
        </Typography>

        <Typography variant="body2" style={{color:"white"}}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{color:"#fc9b04"}}>
            Register now
          </Link>
        </Typography>
      </Box>
    
    </Box>
  );
};

export default LoginForm;
