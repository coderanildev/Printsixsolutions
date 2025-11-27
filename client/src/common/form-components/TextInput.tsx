import React from "react";
import { TextField, FormControl } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isRequired?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
  width?: string; // optional prop to control width
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "",
  defaultValue = "",
  width = "50%", // default width is 50%
}) => {
  const error = !!errors[name];

  return (
    <FormControl
      className={className}
      sx={{ width, padding: "0px 5px", marginY: 1 }}
    >
      <TextField
        {...register(name, { required: isRequired })}
        label={isRequired ? `* ${label}` : label}
        name={name}
        type={type}
        defaultValue={defaultValue}
        error={error}
        helperText={error ? `${label} is required` : undefined}
        variant="outlined"
        sx={{
          "& .MuiInputBase-root": {
            height: 50, 
            bgcolor: error ? "#fff5f5" : "#f5f5f5", 
          },
          "& .MuiOutlinedInput-input": {
            padding: "0 8px",
            height: "100%",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.9rem",
            top: "-4px",
            color: error ? "#fc9b04" : "#fc9b04", 
          },
          "& .MuiInputLabel-shrink": {
            color: error ? "#fc9b04" : "#fc9b04",
          },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      />
    </FormControl>
  );
};

export default TextInput;
