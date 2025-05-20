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

import type { Building } from '../types';

interface BuildingListProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onBuildingSelect: (building: Building) => void;
  onAddBuilding: () => void;
  onEditBuilding: () => void;
  onDeleteBuilding: () => void;
  menuAnchor: HTMLElement | null;
  onMenuClose: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, building: Building) => void;
  loading: boolean;
}

export function BuildingList({
  buildings,
  selectedBuilding,
  onBuildingSelect,
  onAddBuilding,
  onEditBuilding,
  onDeleteBuilding,
  menuAnchor,
  onMenuClose,
  onMenuOpen,
  loading,
}: BuildingListProps) {
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
          <Typography variant="h6">Buildings</Typography>
          <Tooltip title="Add Building">
            <IconButton onClick={onAddBuilding}>
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
            {buildings.map((building) => (
              <ListItem
                key={building.id}
                disablePadding
                secondaryAction={
                  <IconButton edge="end" onClick={(e) => onMenuOpen(e, building)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={selectedBuilding?.id === building.id}
                  onClick={() => onBuildingSelect(building)}
                >
                  <ListItemText primary={building.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={onMenuClose}>
          <MenuItem
            onClick={() => {
              onEditBuilding();
              onMenuClose();
            }}
          >
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDeleteBuilding();
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
