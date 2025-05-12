import { useState, useEffect } from 'react';

import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, code: string) => void;
  title: string;
  initialValue?: string;
  initialCode?: string;
}

export function EditDialog({
  open,
  onClose,
  onSubmit,
  title,
  initialValue = '',
  initialCode = '',
}: EditDialogProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  // Reset form when dialog opens/closes or initial values change
  useEffect(() => {
    if (open) {
      setName(initialValue);
      setCode(initialCode);
    } else {
      setName('');
      setCode('');
    }
  }, [open, initialValue, initialCode]);

  const handleClose = () => {
    setName('');
    setCode('');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(name, code);
    setName('');
    setCode('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
