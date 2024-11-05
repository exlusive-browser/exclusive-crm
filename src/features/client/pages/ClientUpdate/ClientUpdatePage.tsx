import { Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { Paper } from "@mui/material";
import { ClientUpdateForm } from "./ClientUpdateForm";
import { PrimaryLinkButton } from "../../../../components/buttons";
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
        <PrimaryLinkButton
          size="small"
          sx={{ px: 2, width: "fit-content", alignSelf: "flex-end" }}
          startIcon={<ChevronLeftIcon />}
          navigateTo="/clients"
        >
          Go back
        </PrimaryLinkButton>
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
