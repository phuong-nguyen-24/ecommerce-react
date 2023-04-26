import { Avatar, Box, CardMedia, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../../config/supbase";
import ProductLoading from "../../product/components/ProductLoading";

export default function UserListing() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => supabase.from("user").select("*, role (name)"),
    select: (res) => {
      return res.data.map((item) => ({
        ...item,
        role: item.role.name,
      }));
    },
  });

  if (isLoading) return <ProductLoading />;

  console.log(users);

  const gridData = {
    columns: [
      {
        field: "id",
        headerName: "ID",
      },
      {
        field: "full_name",
        headerName: "Full Name",
        renderCell: (params) => {
          const fullName = params.value || "Anonymous";
          const avatar = params.row.avatar;
          return (
            <Stack direction="row" alignItems="center" gap={2}>
              <Avatar alt={fullName} src={avatar} />
              <Box>{fullName}</Box>
            </Stack>
          );
        },
        width: 200,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "role",
        headerName: "Role",
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 300,
      },
    ],

    rows: users,
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        {...gridData}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
