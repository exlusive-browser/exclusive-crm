import { FullPageBox } from "../../components/Layout/FullPageBox";
import { Container, Typography } from "@mui/material";
import { PrimaryButton } from "../../components/buttons";

export function HomePage() {
  return (
    <FullPageBox justifyContent="center" alignItems="center">
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="h1"
          component="h1"
          textAlign="center"
          sx={{
            fontFamily: "titleFontFamily",
            fontWeight: "medium",
            fontSize: { xs: 36, lg: 48 },
            mb: 4,
          }}
        >
          Home Page
        </Typography>
        <PrimaryButton size="small" sx={{ px: 6 }}>
          My Button
        </PrimaryButton>
      </Container>
    </FullPageBox>
  );
}
