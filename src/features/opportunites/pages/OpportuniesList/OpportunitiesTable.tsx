import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  getOpportunities,
  RepoOpportunity,
  deleteOpportunityWithTracking
} from "../../repositories/opportunites.repository";
import { formatCurrency } from "../../../../lib/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LinearProgress, Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmation";

type RowOpportunity = Omit<RepoOpportunity, "clientId">;

export function OpportunitiesTable() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const onDelete = (id: number) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };
  
  // Usamos useMutation para manejar la mutación de eliminación
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteOpportunityWithTracking(id),
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setSelectedId(null);
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting opportunity:", error);
    },
  });

  const handleConfirmDelete = async () => {
    if (selectedId === null) return;

    try {
      await mutateAsync(selectedId);
    } catch (error) {
      console.error("Error deleting opportunity:", error);
    }
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

  const { isPending, isError, data, refetch } = useQuery({
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
        <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
