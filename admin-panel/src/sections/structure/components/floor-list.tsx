import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  List,
  Menu,
  Tooltip,
  ListItem,
  MenuItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
  CircularProgress,
} from '@mui/material';

import type { Floor } from '../types';

interface FloorListProps {
  floors: Floor[];
  selectedFloor: Floor | null;
  onFloorSelect: (floor: Floor) => void;
  onAddFloor: () => void;
  onEditFloor: () => void;
  onDeleteFloor: () => void;
  menuAnchor: HTMLElement | null;
  onMenuClose: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, floor: Floor) => void;
  loading: boolean;
}

export function FloorList({
  floors,
  selectedFloor,
  onFloorSelect,
  onAddFloor,
  onEditFloor,
  onDeleteFloor,
  menuAnchor,
  onMenuClose,
  onMenuOpen,
  loading,
}: FloorListProps) {
  return (
    <Box
      sx={{
        width: 250,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <>
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Floors</Typography>
          <Tooltip title="Add Floor">
            <IconButton onClick={onAddFloor}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {floors.map((floor) => (
              <ListItem
                key={floor.id}
                disablePadding
                secondaryAction={
                  <IconButton edge="end" onClick={(e) => onMenuOpen(e, floor)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={selectedFloor?.id === floor.id}
                  onClick={() => onFloorSelect(floor)}
                >
                  <ListItemText primary={floor.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={onMenuClose}>
          <MenuItem
            onClick={() => {
              onEditFloor();
              onMenuClose();
            }}
          >
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDeleteFloor();
              onMenuClose();
            }}
          >
            <DeleteIcon sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </>
    </Box>
  );
}
