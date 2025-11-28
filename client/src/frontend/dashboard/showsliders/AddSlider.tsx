import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import { useAddSliderMutation } from "../../../redux/services/slider";

type SliderFormValues = {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  isActive: boolean;
};

const AddSlider = () => {
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);
  const [addSlider] = useAddSliderMutation();
  const navigate = useNavigate();

  const methods = useForm<SliderFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      imageUrl: "",
      isActive: false,
    },
  });

  const { handleSubmit, watch, setValue, reset } = methods;

  // Auto-generate slug on title change
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugify(value.title || "", { lower: true }));
      }
    });
    return () => sub.unsubscribe();
  }, [watch, setValue]);

  // ------------------------------
  // Image Upload Handler
  // ------------------------------
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const fileObj = await res.json();

      if (fileObj.error) throw new Error(fileObj.error.message);

      // Save URL into react-hook-form
      setImagePath(fileObj.secure_url);
      setValue("imageUrl", fileObj.secure_url, { shouldValidate: true });
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // ------------------------------
  // Submit Form
  // ------------------------------
  const onSubmitHandler = async (value: SliderFormValues) => {
    try {
      const res = await addSlider(value);

      if ("data" in res) {
        toast.success("Slider added successfully");
        reset();
        setImagePath("");
        navigate("/dashboard/add-slider");
      } else {
        toast.error("Failed to add slider");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <Card className="max-w-2xl mx-auto p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add New Slider</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>

              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="* Title"
                  fullWidth
                  {...methods.register("title", { required: "Title is required" })}
                  error={!!methods.formState.errors.title}
                  helperText={methods.formState.errors.title?.message}
                />
              </Grid>

              {/* Slug */}
              <Grid item xs={12}>
                <TextField
                  label="Slug"
                  fullWidth
                  {...methods.register("slug")}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  {...methods.register("description")}
                />
              </Grid>

              {/* Short Description */}
              <Grid item xs={12}>
                <TextField
                  label="Short Description"
                  fullWidth
                  {...methods.register("shortDescription")}
                />
              </Grid>

              {/* Active */}
              <Grid item xs={12}>
                <Controller
                  name="isActive"
                  control={methods.control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Is Active"
                    />
                  )}
                />
              </Grid>

              {/* Image upload */}
              <Grid item xs={12}>
                <Controller
                  name="imageUrl"
                  control={methods.control}
                  rules={{ required: "Image is required" }}
                  render={({ fieldState }) => (
                    <>
                      <label className="form-label">Slider Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className={`form-control ${
                          fieldState.error ? "is-invalid" : ""
                        }`}
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />

                      {fieldState.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}

                      {imagePath && (
                        <img
                          src={imagePath}
                          alt="Preview"
                          className="mt-3 rounded shadow"
                          style={{ width: "30%", height:"30%", objectFit: "cover" }}
                        />
                      )}
                    </>
                  )}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12} className="text-end">
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Grid>

            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AddSlider;
