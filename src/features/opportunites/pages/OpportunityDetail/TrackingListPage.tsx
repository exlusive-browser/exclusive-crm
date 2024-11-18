import AddIcon from "@mui/icons-material/Add";
import { Container, Stack, Typography } from "@mui/material";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { PrimaryLinkButton } from "../../../../components/buttons";
import { TrackingTable } from "./TrackingTable";

interface TrackingTableProps {
  opportunityId: number;
}

export function TrackingListPage({ opportunityId }: TrackingTableProps) {
  return (
    <FullPageBox>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Stack direction="row" justifyContent="space-between" my={4}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "titleFontFamily",
              fontWeight: "medium",
              fontSize: { xs: 28, lg: 36 },
            }}
          >
            Tracking
          </Typography>
          <PrimaryLinkButton
            size="small"
            sx={{ px: 2 }}
            startIcon={<AddIcon />}
            navigateTo={`/tracking/create/${opportunityId}`}
          >
            Create new tracking
          </PrimaryLinkButton>
        </Stack>
        <TrackingTable opportunityId={Number(opportunityId)} />
      </Container>
    </FullPageBox>
  );
}
