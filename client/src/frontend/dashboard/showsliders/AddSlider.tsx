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
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";




const AddSlider = () => {
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  type SliderFormValues = {
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    isActive: boolean;
  };
  
  const methods = useForm<SliderFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      imageUrl: "",
      description: "",
      shortDescription: "",
      isActive: false,
    },
  });


  const {
    reset,
    setValue,
    handleSubmit,
    watch
  } = methods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const slug = slugify(value.title || "", { lower: true });
        setValue("slug", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);


const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
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

      setImagePath(fileObj.url);
      setValue("imageUrl", fileObj.url);
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmitHandler = async (value: SliderFormValues) => {
      try {
        const res = await AddSlider(value);
        console.log(res);
        
        if ("data" in res) {
          toast.success("Category added successfully");
          reset();
          setImagePath("");
          setValue("slug", "");
          navigate("/dashboard/categories");
        } else if ("error" in res) {
          toast.error("Failed to add category");
        }
      } catch (error) {
        console.error("Add category error:", error);
      }
  };

  return (
    <Card className="max-w-2xl mx-auto p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add New Slider</h2>

  
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="* Title"
                  fullWidth
                  {...methods.register("title", { required: "Title is required" })}
                  error={!!methods.formState.errors.title}
                  helperText={methods.formState.errors.title?.message as string}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Slug"
                  fullWidth
                  {...methods.register("slug")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  {...methods.register("description")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Short Description"
                  fullWidth
                  {...methods.register("shortDescription")}
                />
              </Grid>


              <Grid item xs={12}>
                <Controller
                  name="isActive"
                  control={methods.control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Is Active"
                    />
                  )}
                />
              </Grid>


               {/* Image Upload */}
              <Grid item xs={12}>
                <label className="form-label">Slider Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  disabled={uploading}
                />
                {imagePath && (
                  <img
                    src={imagePath}
                    alt="Preview"
                    className="mt-3 rounded shadow-sm"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                )}
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
