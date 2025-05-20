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

import type { Space } from '../types';

interface SpaceListProps {
  spaces: Space[];
  selectedSpace: Space | null;
  onSpaceSelect: (space: Space) => void;
  onAddSpace: () => void;
  onEditSpace: () => void;
  onDeleteSpace: () => void;
  menuAnchor: HTMLElement | null;
  onMenuClose: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, space: Space) => void;
  loading: boolean;
}

export function SpaceList({
  spaces = [],
  selectedSpace,
  onSpaceSelect,
  onAddSpace,
  onEditSpace,
  onDeleteSpace,
  menuAnchor,
  onMenuClose,
  onMenuOpen,
  loading,
}: SpaceListProps) {
  return (
    <Box
      sx={{
        flex: 1,
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
          <Typography variant="h6">Spaces</Typography>
          <Tooltip title="Add Space">
            <IconButton onClick={onAddSpace}>
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
            {spaces.map((space) => (
              <ListItem
                key={space.id}
                disablePadding
                secondaryAction={
                  <IconButton edge="end" onClick={(e) => onMenuOpen(e, space)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={selectedSpace?.id === space.id}
                  onClick={() => onSpaceSelect(space)}
                >
                  <ListItemText primary={space.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={onMenuClose}>
          <MenuItem
            onClick={() => {
              onEditSpace();
              onMenuClose();
            }}
          >
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDeleteSpace();
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
