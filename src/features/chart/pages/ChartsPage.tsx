import { Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Paper } from "@mui/material";
import { FullPageBox } from "../../../components/Layout/FullPageBox";
import { PrimaryLinkButton } from "../../../components/buttons";
import { Chart1 } from "./chart1";
import { Chart2 } from "./chart2";

export function ChartsPage() {
  return (
    <FullPageBox>
      <Paper
        elevation={3}
        sx={{
          margin: 2,
          borderRadius: 2,
          px: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PrimaryLinkButton
          size="small"
          sx={{ px: 2, width: "fit-content", alignSelf: "flex-end" }}
          startIcon={<ChevronLeftIcon />}
          navigateTo="/"
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
          Charts Page
        </Typography>
        <Chart1 />
        <Chart2 />
      </Paper>
    </FullPageBox>
  );
}
