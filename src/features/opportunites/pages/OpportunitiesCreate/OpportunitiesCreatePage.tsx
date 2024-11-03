import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Container, Stack, Typography } from "@mui/material";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { PrimaryLinkButton } from "../../../../components/buttons";
import { OpportunityCreateCard } from "./OpportunityCreateCard";

export function OpportunitiesCreatePage() {
  return (
    <FullPageBox>
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
            Create new opportunity
          </Typography>
          <PrimaryLinkButton
            size="small"
            sx={{ px: 2 }}
            startIcon={<ChevronLeftIcon />}
            navigateTo="/opportunities"
          >
            Go back
          </PrimaryLinkButton>
        </Stack>
        <OpportunityCreateCard />
      </Container>
    </FullPageBox>
  );
}
