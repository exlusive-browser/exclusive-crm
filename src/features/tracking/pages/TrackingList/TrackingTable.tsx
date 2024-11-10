import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  getTracking,
  RepoTracking,
  deleteTracking
} from "../../repositories/tracking.repository";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LinearProgress, Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../../../opportunites/pages/OpportuniesList/DeleteConfirmation";

type RowTracking = Omit<RepoTracking, "opportunityId">;

export function TrackingTable() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onDelete = (id: number) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  // Usamos useMutation para manejar la mutación de eliminación
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteTracking(id),
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setSelectedId(null);
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting tracking:", error);
    },
  });

  const handleConfirmDelete = async () => {
    if (selectedId === null) return;

    try {
      await mutateAsync(selectedId);
    } catch (error) {
      console.error("Error deleting tracking:", error);
    }
  };

  const columns: GridColDef<RowTracking>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "description",
      headerName: "Description",
      width: 450,
      editable: false,
    },
    {
      field: "contactType",
      headerName: "Contact Type",
      width: 150,
      editable: false,
    },
    {
      field: "contactDate",
      headerName: "Contact Date",
      width: 150,
      editable: false,
    },
    {
      field: "clientContactId",
      headerName: "Client Contact ID",
      width: 150,
      editable: false,
    },
    {
      field: "salesExecutive",
      headerName: "Sales Executive",
      width: 150,
      editable: false,
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            component={Link}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            to={`/monitoring/update/${id}`}
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
    queryKey: ["monitoring"],
    queryFn: getTracking,
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
