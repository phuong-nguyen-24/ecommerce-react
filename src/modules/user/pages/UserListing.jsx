import { Avatar, Box, CardMedia, MenuItem, Select, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import supabase from "../../../config/supbase";
import RHFSelect from "../../common/components/RHFSelect";
import ProductLoading from "../../product/components/ProductLoading";

export default function UserListing() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      role_id: "",
    },
  });

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

  const {
    isLoading: IsRoleLoading,
    data: Roles,
    error: ErrorRole,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => supabase.from("role").select(),
    select: (res) => res.data,
  });

  if (isLoading) return <ProductLoading />;

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
        availableAggregationFunctions(Roles) {
          return (
            <RHFSelect name="role_id" label="" control={control}>
              {Roles.map((role) => (
                <MenuItem value={role.id}>{role.name}</MenuItem>
              ))}
            </RHFSelect>
          );
        },
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 300,
      },
    ],

    rows: users,
    Roles,
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
