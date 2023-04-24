import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import NumericFormatCustom from "../components/NumericFormatCustom";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import supabase from "../../../config/supbase";
import { useForm } from "react-hook-form";
import { convertPrice } from "../helpers/price";
import RHFSelect from "../../common/components/RHFSelect";
import ProductLoading from "./ProductLoading";

export default function ProductAdd() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category_id: "",
      brand_id: "",
    },
  });

  const queryClient = useQueryClient();

  const [categoryQuery, brandQuery] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => supabase.from("category").select(),
        select: (res) => res.data,
      },
      {
        queryKey: ["brands"],
        queryFn: () => supabase.from("brand").select(),
        select: (res) => res.data,
      },
    ],
  });

  const addProductMutation = useMutation({
    mutationFn: (newProduct) => supabase.from("product").insert(newProduct),
  });

  const uploadFileMutation = useMutation({
    mutationFn: ({ category, file }) =>
      supabase.storage
        .from("ecommerce")
        .upload(`${category}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        }),
    select: (res) => {},
  });

  const isLoading = [categoryQuery, brandQuery].some(
    (query) => query.isLoading
  );

  async function handleAddProduct(data) {
    const categories = queryClient.getQueryData({
      queryKey: ["categories"],
    }).data;

    const category = categories.find((c) => c.id === data.category_id);

    const { data: file } = await uploadFileMutation.mutateAsync({
      category: category.name,
      file: data.imageFile[0],
    });

    const { data: thumbnail } = supabase.storage
      .from("ecommerce")
      .getPublicUrl(file.path);

    const { imageFile, ...product } = data;

    addProductMutation.mutate({
      ...product,
      price: convertPrice(data.price),
      thumbnail: thumbnail.publicUrl,
    });
  }

  if (isLoading) return <ProductLoading />;

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleAddProduct)}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          mb={4}
          fontWeight={500}
        >
          Add new product
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              {...register("title")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="outlined"
              fullWidth
              {...register("price")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={6}
              fullWidth
              {...register("description")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name="category_id" label="Category" control={control}>
              {categoryQuery.data.map((category) => (
                <MenuItem key={category.name} value={category.id}>
                  {category.description}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name="brand_id" label="Brand" control={control}>
              {brandQuery.data.map((brand) => (
                <MenuItem key={brand.name} value={brand.id}>
                  {brand.description}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              component="label"
              fullWidth
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                {...register("imageFile")}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// title, price, thumbnail, description, category, brand
