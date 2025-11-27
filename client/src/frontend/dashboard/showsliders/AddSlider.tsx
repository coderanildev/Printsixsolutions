import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Controller, FormProvider,useForm } from "react-hook-form";



const AddSlider = () => {

  const methods = useForm<CategoryFormValues>({
      defaultValues: {
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        isActive: false,
        parentId: null,
      },
    });

  return (
     <Card className="max-w-2xl mx-auto p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <FormProvider>
          <form >
            <Grid container spacing={2}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="* Title"
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/* Slug (hidden or editable) */}
              <Grid item xs={12}>
                <TextField
                  label="Slug"
                  fullWidth
                  variant="outlined"
             
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>

              {/* Parent Category */}
              <Grid item xs={12}>
              <Controller
                name="parentId"
                defaultValue={null}
                render={({ field }) => (
                  <TextField
                    select
                    label="Parent Category"
                    fullWidth
                    variant="outlined"
                    {...field}
                  >
                  </TextField>
                )}
              />
              </Grid>

              {/* Is Active */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Is Active"
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <label className="form-label">Category Image</label>
                <input
                  type="file"
                  accept="image/*"
                 
                  className="form-control"
                 
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} className="text-end">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary" 
                >
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default AddSlider
