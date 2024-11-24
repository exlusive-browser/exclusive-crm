import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Container, Stack, Typography } from "@mui/material";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { PrimaryLinkButton } from "../../../../components/buttons";
import { TrackingCreateCard } from "./CreateTrackingCard";
import { useParams } from "react-router-dom";
export function TrackingCreatePage() {
  const { id } = useParams();
  const opportunityId = id ? Number(id) : undefined;
  return (
    <FullPageBox sx={{ mx: { xs: "auto", md: "auto", xl: "100px" } }}>
      <Container
        maxWidth="xl"

        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Stack
          justifyContent="space-between"
          my={4}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "titleFontFamily",
              fontWeight: "medium",
              fontSize: { xs: 28, lg: 36 },
              textAlign: { xs: "center", md: "left" },
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            Create new tracking
          </Typography>
          <PrimaryLinkButton
            size="small"
            sx={{ px: 2 }}
            startIcon={<ChevronLeftIcon />}
            navigateTo={`/opportunities/${opportunityId}`}
          >
            Go back
          </PrimaryLinkButton>
        </Stack>
        <TrackingCreateCard />
      </Container>
    </FullPageBox>
  );
}
