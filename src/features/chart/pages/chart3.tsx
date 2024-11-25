import { Paper, Typography, Box } from "@mui/material";
import { model } from "../logics/models";
import { Tooltip, Legend, Cell, Pie, PieChart } from "recharts";
export function Chart3() {
  const { opportunitiesByBusinessType } = model();

  if (!opportunitiesByBusinessType.length) {
    return <div>Loading...</div>;
  }

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
        Opportunities by Business Type (Percentage)
      </Typography>

      <Box
        sx={{
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            minWidth: 420,
            display: "inline-block",
          }}
        >
          <PieChart width={400} height={600}>
            <Pie
              data={opportunitiesByBusinessType}
              cx="50%"
              cy="50%"
              label={(entry) => ` ${entry.value}%`}
              outerRadius={150}
              dataKey="value"
            >
              {opportunitiesByBusinessType.map((_, index) => (
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
      </Box>
    </Paper>
  );
}
