import { useQuery } from "@tanstack/react-query";
import supabase from "../../../config/supbase";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CardMedia, Chip, IconButton, Rating, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ProductListingToolbar from "../components/ProductListingToolbar";
import ProductLoading from "../components/ProductLoading";
import ProductAction from "../components/ProductAction";

export default function ProductListing() {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      supabase
        .from("product")
        .select(
          `id, title, thumbnail, price, stock, rating, category (name), brand (name)`
        ),
    select: (res) => {
      return res.data.map((item) => ({
        ...item,
        category: item.category.name,
        brand: item.brand.name,
      }));
    },
  });

  if (isLoading) return <ProductLoading />;

  const gridData = {
    columns: [
      {
        field: "id",
        headerName: "ID",
      },
      {
        field: "title",
        headerName: "Title",
        width: 280,
        renderCell: (param) => {
          const thumbnail = param.row.thumbnail;
          const title = param.value;
          return (
            <Stack direction="row" alignItems="center" gap={2}>
              <Box width={70} height={50}>
                <CardMedia
                  component="img"
                  height={50}
                  width={50}
                  image={thumbnail}
                  alt={title}
                  sx={{
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box>{title}</Box>
            </Stack>
          );
        },
      },
      {
        field: "stock",
        headerName: "Stock",
      },
      {
        field: "price",
        headerName: "Price($)",
      },
      {
        field: "category",
        headerName: "Category",
        renderCell: (param) => {
          const categoryColors = {
            laptops: "primary",
            smartphones: "success",
            pc: "secondary",
            tablets: "error",
          };

          return (
            <Chip
              variant="outlined"
              color={categoryColors[param.value]}
              size="small"
              label={param.value}
            />
          );
        },
      },
      {
        field: "brand",
        headerName: "Brand",
        renderCell: (param) => {
          const brandColors = {
            apple: "primary",
            samsung: "success",
            lg: "secondary",
            nokia: "error",
          };

          return (
            <Chip
              variant="contained"
              color={brandColors[param.value]}
              size="small"
              label={param.value}
            />
          );
        },
      },
      {
        field: "rating",
        headerName: "Rating",
        renderCell: (param) => {
          return (
            <Rating
              name={param.field}
              value={param.value}
              readOnly
              precision={0.5}
            />
          );
        },
        width: 200,
      },
      {
        field: "action",
        headerName: "Action",
        renderCell: (param) => {
          return (
            <Stack direction="row" alignItems="center">
              <Tooltip title="View Detail" placement="top">
                <IconButton
                  aria-label="View Detail"
                  to={`/products/${param.id}`}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" placement="top">
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <ProductAction id={param.id} />
            </Stack>
          );
        },
        width: 150,
      },
    ],
    rows: product,
  };

  console.log(product);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        {...gridData}
        slots={{
          toolbar: ProductListingToolbar,
        }}
      />
    </Box>
  );
}
