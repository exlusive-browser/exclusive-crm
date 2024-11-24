import { Paper, Typography, Box } from "@mui/material";
import { FullPageBox } from "../../../components/Layout/FullPageBox";
import { model } from "../logics/models";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Height } from "@mui/icons-material";

export function Chart1() {
  const { clientsWithOpportunities } = model();

  if (!clientsWithOpportunities.length) {
    return <div>Loading...</div>;
  }

  const chartWidth = Math.max(1000, clientsWithOpportunities.length * 100);

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 1,
        borderRadius: 2,
        px: 5,
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
        Charts Users
      </Typography>

      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            minWidth: "100%",
          }}
        >
          <BarChart
            width={chartWidth}
            height={300}
            data={clientsWithOpportunities}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="opportunitiesCount"
              fill="#8884d8"
              name="Total Opportunities"
            />
            <Bar
              dataKey="closedOpportunitiesCount"
              fill="#82ca9d"
              name="Closed Opportunities"
            />
          </BarChart>
        </Box>
      </Box>
    </Paper>
  );
}
