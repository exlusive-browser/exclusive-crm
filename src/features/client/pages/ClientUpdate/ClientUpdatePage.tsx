import { Typography } from "@mui/material";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { Paper } from "@mui/material";
import { ClientUpdateForm } from "./ClientUpdateForm";
import { useParams } from "react-router-dom";

export function ClientUpdatePage() {
  const { id } = useParams();
  const idNumber = Number(id);
  return (
    <FullPageBox>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          margin: 2,
          borderRadius: 2,
          px: 10,
          py: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontFamily: "titleFontFamily",
            fontWeight: "medium",
            fontSize: { xs: 28, lg: 36 },
          }}
        >
          Client Update Page
        </Typography>

        <ClientUpdateForm id={idNumber} />
      </Paper>
    </FullPageBox>
  );
}
