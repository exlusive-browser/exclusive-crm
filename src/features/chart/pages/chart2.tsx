import { Paper, Typography, Box } from "@mui/material";
import { model } from "../logics/models";
import { Tooltip, Legend, Cell, Pie, PieChart } from "recharts";

export function Chart2() {
  const { opportunitiesByStatus } = model();

  if (!opportunitiesByStatus.length) {
    return <div>Loading...</div>;
  }

  const chartWidth = Math.max(1200, opportunitiesByStatus.length * 100);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
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
        Charts Opportunities
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <PieChart width={chartWidth} height={400}>
          <Pie
            data={opportunitiesByStatus}
            cx="50%"
            cy="50%"
            label={(entry) => `${entry.name} (${entry.value})`}
            outerRadius={150}
            dataKey="value"
          >
            {opportunitiesByStatus.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </Paper>
  );
}
