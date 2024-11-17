import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  getOpportunitiesByClientId,
  RepoOpportunity
} from "../../repositories/clients.repository";
import { useQuery } from '@tanstack/react-query';
import { LinearProgress, Box, Typography, Stack, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "../../../../lib/helpers";
import { TrackingListPage } from "../../../opportunites/pages/OpportunityDetail/TrackingListPage";
import { useRef, useState } from "react";


type RowOpportunity = Omit<RepoOpportunity, "clientId">;


export function ClientDetailMedium() {
  const { id } = useParams();
  const clientId = id ? Number(id) : undefined;
  const trackingRef = useRef<HTMLDivElement | null>(null);

  const [selectedOpportunity, setSelectedOpportunity] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleTrackingClick = (opportunity: RowOpportunity) => {
    setSelectedOpportunity((prev) =>
      prev?.id === opportunity.id ? null : { id: opportunity.id, name: opportunity.businessName }
    );

    // Hacer scroll solo si seleccionamos una oportunidad
    if (!selectedOpportunity || selectedOpportunity.id !== opportunity.id) {
      setTimeout(() => {
        trackingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // Un pequeño retraso para asegurar que el estado ha sido actualizado
    }
  };
  
  const columns: GridColDef<RowOpportunity>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "businessName",
      headerName: "Business Name",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <Link to={`/opportunities/${params.row.id}`} style={{ color: "inherit", textDecoration: "None" }}>
          {params.value}
        </Link>
      )
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
      getActions: (params) => {
        const opportunity = params.row; // Asegúrate de que `params.row` contiene `id` y `name`.

        return [
          <Button
            variant="contained"
            size="small"
            sx={{ px: 2 }}
            onClick={() => handleTrackingClick(opportunity)}
          >
            Tracking
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
        {selectedOpportunity && (
          <Box
          ref={trackingRef}
          sx={{
            backgroundColor: "white", // Fondo blanco
            padding: 2, // Espaciado interno opcional
            borderRadius: 2, // Bordes redondeados opcionales
            boxShadow: 2, // Sombra opcional para resaltar el Box
          }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 3, color: "primary.dark", paddingLeft: 3}} gutterBottom>
              {selectedOpportunity.name}
            </Typography>
            <TrackingListPage opportunityId={selectedOpportunity.id} />
          </Box>
        )}
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
