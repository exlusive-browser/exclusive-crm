import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  getOpportunities,
  RepoOpportunity,
} from "../../repositories/opportunites.repository";
import { formatCurrency } from "../../../../lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { LinearProgress, Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

type RowOpportunity = Omit<RepoOpportunity, "clientId">;

export function OpportunitiesTable() {
  const onDelete = (id: number) => {
    console.log(`Delete opportunity ${id}`);
  };

  const columns: GridColDef<RowOpportunity>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "businessName",
      headerName: "Business Name",
      width: 250,
      editable: false,
    },
    {
      field: "businessType",
      headerName: "Business Type",
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      editable: false,
    },
    {
      field: "estimatedStartDate",
      headerName: "Estimated Start Date",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
    },
    {
      field: "estimatedValue",
      headerName: "Estimated Value",
      type: "number",
      width: 200,
      editable: false,
      valueFormatter: (value) => formatCurrency(value as number),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="See More"
            className="textPrimary"
            component={Link}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            to={`/opportunities/${id}`}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            component={Link}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            to={`/opportunities/update/${id}`}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDelete(id as number)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const { isPending, isError, data } = useQuery({
    queryKey: ["opportunities"],
    queryFn: getOpportunities,
  });

  const rows = data ? data : [];

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
      {isPending && (
        <Stack sx={{ width: "100%", mt: 4 }}>
          <LinearProgress />
          <Typography variant="body1" textAlign="center" p={2}>
            Loading data...
          </Typography>
        </Stack>
      )}
      {isError && (
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ p: 2, color: "error.main" }}
        >
          Oops, something went wrong. We couldn't load the data.
        </Typography>
      )}
    </>
  );
}