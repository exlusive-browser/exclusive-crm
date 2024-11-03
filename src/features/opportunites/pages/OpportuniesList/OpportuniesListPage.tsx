import AddIcon from "@mui/icons-material/Add";
import { Container, Stack, Typography } from "@mui/material";
import { FullPageBox } from "../../../../components/Layout/FullPageBox";
import { PrimaryLinkButton } from "../../../../components/buttons";
import { OpportunitiesTable } from "./OpportunitiesTable";

export function OpportuniesListPage() {
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
            Opportunities
          </Typography>
          <PrimaryLinkButton
            size="small"
            sx={{ px: 2 }}
            startIcon={<AddIcon />}
            navigateTo="/opportunities/create"
          >
            Create new
          </PrimaryLinkButton>
        </Stack>
        <OpportunitiesTable />
      </Container>
    </FullPageBox>
  );
}
