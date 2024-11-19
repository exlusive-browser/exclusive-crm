import { Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { Paper } from "@mui/material";
import { PrimaryLinkButton } from "../../../../components/buttons";
import { useParams } from "react-router-dom";
import { TrackingUpdateForm } from "./TrackingUpdateForm";
// import { OpportunityUpdateForm } from "./OpportunityUpdateForm";
import { getOpIdByTrackingId } from "../../repositories/tracking.repository"
import { useQuery } from "@tanstack/react-query";

export function TrackingUpdatePage() {
  const { id } = useParams();
  const idNumber = Number(id);

  const { data: opportunityId, } = useQuery({
    queryKey: ["opportunityId", idNumber],
    queryFn: () => getOpIdByTrackingId(idNumber),
    enabled: !!idNumber,
  });
  console.log(opportunityId)
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
          Tracking Update Page
        </Typography>
        <Typography variant="body1">
          Tracking ID: {idNumber}
        </Typography>

        {opportunityId !== undefined && (
          <TrackingUpdateForm id={idNumber} opportunityId={opportunityId} />
        )}
      </Paper>
    </FullPageBox>
  );
}
