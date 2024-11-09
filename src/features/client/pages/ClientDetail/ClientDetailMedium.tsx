import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  getOpportunitiesByClientId,
  RepoOpportunity
} from "../../repositories/clients.repository";
import { useQuery } from '@tanstack/react-query';
import { LinearProgress, Box, Typography, Stack, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "../../../../lib/helpers";


type RowOpportunity = Omit<RepoOpportunity, "clientId">;


export function ClientDetailMedium() {
  const { id } = useParams();
  const clientId = id ? Number(id) : undefined;


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
      getActions: () => {
        return [
          <Button
            component={Link}
            to={`#`}
            variant="contained"
            color="primary"
          >
            Seguimiento
          </Button>,
        ];
      },
    },
  ];

  const { isPending, isError, data } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => (clientId !== undefined ? getOpportunitiesByClientId(clientId) : Promise.reject("Invalid client ID")),
  });

  const rows = data ? data : [];

  return (
    <>
      <Box sx={{ height: 400, width: "100%", background: "white" }}>
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
