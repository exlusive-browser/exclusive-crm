import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  getClients,
  RepoClient,
  updateClientStatus
} from "../../repositories/clients.repository";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearProgress, Box, Typography, Stack } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { Link } from "react-router-dom";


export function ClientsTable() {

  const columns: GridColDef<RepoClient>[] = [
    { field: "id", headerName: "ID", width: 90, renderCell: (params) => (
      <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
        {params.value}
      </Typography>
    ), },
    {
      field: "nit",
      headerName: "NIT",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <Link to={`/clients/${params.row.id}`} style={{ color: params.row.active ? 'inherit' : 'red', textDecoration: 'none' }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "corporateEmail",
      headerName: "Corporate Email",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <Typography  variant="body2" style={{ color: params.row.active ? 'inherit' : 'red', lineHeight: "unset"  }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "active",
      headerName: "Active",
      width: 120,
      editable: false,
      renderCell: (params) => (
        <Typography style={{ color: params.value ? "inherit" : "red", lineHeight: "unset" }}>
          {params.value ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="See More"
            className="textPrimary"
            component={Link}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            to={`/clients/${id}`}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            component={Link}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            to={`/clients/update/${id}`}
            color="inherit"
            disabled={!row.active}
          />,
          <GridActionsCellItem
            icon={row.active ? <ToggleOnIcon /> : <ToggleOffIcon />}
            label={row.active ? "Inactivate" : "Activate"}
            onClick={() => handleToggleStatus(row)}
            className="textPrimary"
            color="inherit"
          />
        ];
      },
    },
  ];

  const queryClient = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ["client"],
    queryFn: getClients,
  });
  console.log(data);
  const rows = data ? data : [];


  const updateStatusMutation = useMutation<RepoClient, Error, { id: number; isActive: boolean }>({
    mutationFn: updateClientStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
    onError: (error: Error) => {
      console.error("Error updating client:", error);
    }
  });

  const handleToggleStatus = (client: RepoClient) => {
    updateStatusMutation.mutate({ id: client.id, isActive: !client.active });
  };


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