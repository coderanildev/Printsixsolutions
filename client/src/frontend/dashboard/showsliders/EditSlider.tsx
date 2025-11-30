import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSliderByIdQuery,
  useUpdateSliderMutation,
} from "../../../redux/services/slider";

type SliderFormValues = {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  isActive: boolean;
};

const EditSlider = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  const [updateSlider] = useUpdateSliderMutation();
  const { data: sliderData, isLoading } = useGetSliderByIdQuery(id!);

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

  const {
    reset,
    handleSubmit,
    setValue,
    register,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  // Fill form when data loads
  useEffect(() => {
    if (sliderData?.slider) {
      const { title, slug, description, shortDescription, imageUrl, isActive } =
        sliderData.slider;

      reset({
        title,
        slug,
        description,
        shortDescription,
        imageUrl,
        isActive,
      });

      setImagePath(imageUrl);
    }
  }, [sliderData, reset]);

  // Auto-generate slug
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "title") {
        const slug = slugify(value.title || "", { lower: true });
        setValue("slug", slug);
      }
    });
    return () => sub.unsubscribe();
  }, [watch, setValue]);

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );

      const uploaded = await res.json();
      if (uploaded.error) throw new Error(uploaded.error.message);

      setImagePath(uploaded.secure_url);
      setValue("imageUrl", uploaded.secure_url);
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Submit Edit Slider
  const onSubmitHandler = async (value: SliderFormValues) => {
    const updatedData = {
      ...value,
      imageUrl: imagePath || getValues("imageUrl"),
    };

    try {
      const res = await updateSlider({ id, updatedData });

      if ("data" in res) {
        toast.success("Slider updated successfully");
        navigate("/dashboard/showSliders");
      } else {
        toast.error("Failed to update slider");
      }
    } catch (error) {
      console.error("Update slider error:", error);
    }
  };

  if (isLoading) return <div className="text-center p-5">Loading...</div>;

  return (
    <Card className="max-w-2xl mx-auto p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Edit Slider</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="* Title"
                  fullWidth
                  {...register("title", { required: true })}
                  error={!!errors.title}
                  helperText={errors.title && "Title is required"}
                />
              </Grid>

              {/* Slug */}
              <Grid item xs={12}>
                <TextField
                  label="Slug"
                  fullWidth
                  {...register("slug", { required: true })}
                />
              </Grid>

              {/* Short Description */}
              <Grid item xs={12}>
                <TextField
                  label="Short Description"
                  fullWidth
                  {...register("shortDescription")}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  {...register("description")}
                />
              </Grid>

              {/* Is Active */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox {...register("isActive")} />}
                  label="Is Active"
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <label>Slider Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
                {imagePath && (
                  <img
                    src={imagePath}
                    alt="Preview"
                    className="mt-3 rounded"
                    style={{ width: "50%", objectFit: "cover" }}
                  />
                )}
              </Grid>

              {/* Submit */}
              <Grid item xs={12} className="text-end">
                <Button variant="contained" type="submit" disabled={uploading}>
                  {uploading ? "Uploading..." : "Update"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default EditSlider;
