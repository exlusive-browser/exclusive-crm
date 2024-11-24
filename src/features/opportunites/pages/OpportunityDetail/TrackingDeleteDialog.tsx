import { BaseModal, ModalHeader } from "../../../../components/Modal/modals";
import { Box, Button, Typography } from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function TrackingDeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) {
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
        <Button onClick={onConfirm} color="error">
          Confirm
        </Button>
      </Box>
    </BaseModal>
  );
}
