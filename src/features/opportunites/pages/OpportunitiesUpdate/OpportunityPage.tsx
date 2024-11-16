import { Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { Paper } from "@mui/material";
import { PrimaryLinkButton } from "../../../../components/buttons";
import { useParams } from "react-router-dom";
import { OpportunityUpdateForm } from "./OpportunityUpdateForm";

export function OpportunityUpdatePage() {
  const { id } = useParams();
  const idNumber = Number(id);
  return (
    <FullPageBox>
      <Paper
        elevation={3}
        sx={{
          margin: 2,
          borderRadius: 2,
          px: 5,
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
          navigateTo="/opportunities"
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
          Opportunity Update Page
        </Typography>
        <OpportunityUpdateForm id={idNumber} />
      </Paper>
    </FullPageBox>
  );
}
