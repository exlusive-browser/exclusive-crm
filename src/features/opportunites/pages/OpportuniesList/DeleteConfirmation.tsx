import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseModal, ModalHeader } from "../../../../components/Modal/modals";
import { Box, Button, Typography } from "@mui/material";
import { deleteOpportunityWithTracking } from "../../repositories/opportunites.repository";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  selectedId: number | null;
}

export function DeleteConfirmationDialog({
  open,
  onClose,
  selectedId,
}: DeleteConfirmationDialogProps) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteOpportunityWithTracking(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      onClose();
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

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: "900px", width: "95%" }}
    >
      <ModalHeader title="Confirm Deletion" onClose={onClose} />
      <Typography sx={{ mt: 2 }}>
        Are you sure you want to delete this item?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error">
          Confirm
        </Button>
      </Box>
    </BaseModal>
  );
}
