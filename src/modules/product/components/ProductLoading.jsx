import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function ProductLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
