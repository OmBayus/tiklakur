import { useState, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { FloorList } from './components/floor-list';
import { SpaceList } from './components/space-list';
import { EditDialog } from './components/edit-dialog';
import { BuildingList } from './components/building-list';
import { structureService } from './services/structure.service';

import type { Floor, Space, Building } from './types';

export function StructureTree() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [loadingBuilding, setLoadingBuilding] = useState(false);
  const [loadingFloor, setLoadingFloor] = useState(false);
  const [loadingSpace, setLoadingSpace] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [addBuildingDialog, setAddBuildingDialog] = useState(false);
  const [editBuildingDialog, setEditBuildingDialog] = useState(false);
  const [addFloorDialog, setAddFloorDialog] = useState(false);
  const [editFloorDialog, setEditFloorDialog] = useState(false);
  const [addSpaceDialog, setAddSpaceDialog] = useState(false);
  const [editSpaceDialog, setEditSpaceDialog] = useState(false);

  // Menu states
  const [buildingMenuAnchor, setBuildingMenuAnchor] = useState<null | HTMLElement>(null);
  const [floorMenuAnchor, setFloorMenuAnchor] = useState<null | HTMLElement>(null);
  const [spaceMenuAnchor, setSpaceMenuAnchor] = useState<null | HTMLElement>(null);

  // Confirm dialog states
  const confirmDeleteBuilding = useBoolean();
  const confirmDeleteFloor = useBoolean();
  const confirmDeleteSpace = useBoolean();

  useEffect(() => {
    loadBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetState = ({
    resetBuilding = true,
    resetFloor = true,
    resetSpace = true,
  }: { resetBuilding?: boolean; resetFloor?: boolean; resetSpace?: boolean } = {}) => {
    if (resetBuilding) {
      setSelectedBuilding(null);
    }
    if (resetFloor) {
      setSelectedFloor(null);
    }
    if (resetSpace) {
      setSelectedSpace(null);
    }
  };

  const loadBuildings = async () => {
    try {
      resetState();
      setLoadingBuilding(true);
      const data = await structureService.getBuildings();
      setBuildings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load buildings');
      toast.error('Failed to load buildings');
      console.error(err);
    } finally {
      setLoadingBuilding(false);
    }
  };

  const loadFloors = async (id: number) => {
    try {
      resetState({ resetBuilding: false });
      setLoadingFloor(true);
      const data = await structureService.getStructure(id);
      if (selectedBuilding) {
        setBuildings((prev) => {
          const building = prev.find((b) => b.id === selectedBuilding.id);
          if (building) {
            building.childStructures = data.childStructures as Floor[];
          }
          return prev;
        });
      }
      setError(null);
    } catch (err) {
      setError('Failed to load floor');
      toast.error('Failed to load floor');
      console.error(err);
    } finally {
      setLoadingFloor(false);
    }
  };

  const loadSpaces = async (id: number) => {
    try {
      setLoadingSpace(true);
      const data = await structureService.getStructure(id);
      setBuildings((prev) => {
        const building = prev.find((b) => b.id === selectedBuilding?.id);
        const floor = building?.childStructures.find((f) => f.id === selectedFloor?.id);
        if (floor) {
          floor.childStructures = data.childStructures as Space[];
        }
        return prev;
      });
      setSelectedFloor(data as Floor);
      setError(null);
    } catch (err) {
      setError('Failed to load space');
      toast.error('Failed to load space');
      console.error(err);
    } finally {
      setLoadingSpace(false);
    }
  };

  // Building actions
  const handleAddBuilding = async (name: string, code: string) => {
    try {
      setLoadingBuilding(true);
      await structureService.createStructure({
        name,
        type: 'BUILDING',
        code: code || name,
      });
      await loadBuildings();
      toast.success('Building added successfully');
      setAddBuildingDialog(false);
    } catch (err) {
      toast.error('Failed to add building');
      console.error(err);
    } finally {
      setLoadingBuilding(false);
    }
  };

  const handleEditBuilding = async (name: string, code: string) => {
    if (!selectedBuilding) return;
    try {
      setLoadingBuilding(true);
      await structureService.updateStructure(selectedBuilding.id, {
        name,
        code: code || name,
      });
      await loadBuildings();
      toast.success('Building updated successfully');
      setEditBuildingDialog(false);
    } catch (err) {
      toast.error('Failed to update building');
      console.error(err);
    } finally {
      setLoadingBuilding(false);
    }
  };

  const handleDeleteBuilding = async () => {
    if (!selectedBuilding) return;
    try {
      setLoadingBuilding(true);
      await structureService.deleteStructure(selectedBuilding.id);
      await loadBuildings();
      toast.success('Building deleted successfully');
      confirmDeleteBuilding.onFalse();
    } catch (err) {
      toast.error('Failed to delete building');
      console.error(err);
    } finally {
      setLoadingBuilding(false);
    }
  };

  // Floor actions
  const handleAddFloor = async (name: string, code: string) => {
    if (!selectedBuilding) return;
    try {
      setLoadingFloor(true);
      await structureService.createStructure({
        name,
        type: 'FLOOR',
        code: code || name,
        parentStructureId: selectedBuilding.id,
      });
      await loadFloors(selectedBuilding.id);
      toast.success('Floor added successfully');
      setAddFloorDialog(false);
    } catch (err) {
      toast.error('Failed to add floor');
      console.error(err);
    } finally {
      setLoadingFloor(false);
    }
  };

  const handleEditFloor = async (name: string, code: string) => {
    if (!selectedBuilding || !selectedFloor) return;
    try {
      setLoadingFloor(true);
      await structureService.updateStructure(selectedFloor.id, {
        name,
        code: code || name,
      });
      await loadFloors(selectedBuilding.id);
      toast.success('Floor updated successfully');
      setEditFloorDialog(false);
    } catch (err) {
      toast.error('Failed to update floor');
      console.error(err);
    } finally {
      setLoadingFloor(false);
    }
  };

  const handleDeleteFloor = async () => {
    if (!selectedBuilding || !selectedFloor) return;
    try {
      setLoadingFloor(true);
      await structureService.deleteStructure(selectedFloor.id);
      await loadFloors(selectedBuilding.id);
      toast.success('Floor deleted successfully');
      confirmDeleteFloor.onFalse();
    } catch (err) {
      toast.error('Failed to delete floor');
      console.error(err);
    } finally {
      setLoadingFloor(false);
    }
  };

  // Space actions
  const handleAddSpace = async (name: string, code: string) => {
    if (!selectedBuilding || !selectedFloor) return;
    try {
      await structureService.createStructure({
        name,
        code: code || name,
        type: 'SPACE',
        parentStructureId: selectedFloor.id,
      });
      await loadSpaces(selectedFloor.id);
      toast.success('Space added successfully');
      setAddSpaceDialog(false);
    } catch (err) {
      toast.error('Failed to add space');
      console.error(err);
    }
  };

  const handleEditSpace = async (name: string, code: string) => {
    if (!selectedBuilding || !selectedFloor || !selectedSpace) return;
    try {
      setLoadingSpace(true);
      await structureService.updateStructure(selectedSpace.id, {
        name,
        code: code || name,
      });
      await loadSpaces(selectedFloor.id);
      toast.success('Space updated successfully');
      setEditSpaceDialog(false);
    } catch (err) {
      toast.error('Failed to update space');
      console.error(err);
    } finally {
      setLoadingSpace(false);
    }
  };

  const handleDeleteSpace = async () => {
    if (!selectedBuilding || !selectedFloor || !selectedSpace) return;
    try {
      setLoadingSpace(true);
      await structureService.deleteStructure(selectedSpace.id);
      await loadSpaces(selectedFloor.id);
      toast.success('Space deleted successfully');
      confirmDeleteSpace.onFalse();
    } catch (err) {
      toast.error('Failed to delete space');
      console.error(err);
    } finally {
      setLoadingSpace(false);
    }
  };

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          bgcolor: 'background.default',
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: 'error.main' }}>
          Error Loading Data
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 480 }}>
          {error}
        </Typography>

        <Button
          variant="contained"
          onClick={loadBuildings}
          startIcon={<Iconify icon="mdi:refresh" />}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        bgcolor: 'background.default',
      }}
    >
      <BuildingList
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        onBuildingSelect={(building) => {
          setSelectedBuilding(building);
          setSelectedFloor(null);
          setSelectedSpace(null);
        }}
        onAddBuilding={() => setAddBuildingDialog(true)}
        onEditBuilding={() => setEditBuildingDialog(true)}
        onDeleteBuilding={() => confirmDeleteBuilding.onTrue()}
        menuAnchor={buildingMenuAnchor}
        onMenuClose={() => setBuildingMenuAnchor(null)}
        onMenuOpen={(e, building) => {
          setSelectedBuilding(building);
          setBuildingMenuAnchor(e.currentTarget);
        }}
        loading={loadingBuilding}
      />

      {selectedBuilding && (
        <FloorList
          floors={selectedBuilding.childStructures}
          selectedFloor={selectedFloor}
          onFloorSelect={async (floor) => {
            await loadSpaces(floor.id);
          }}
          onAddFloor={() => setAddFloorDialog(true)}
          onEditFloor={() => setEditFloorDialog(true)}
          onDeleteFloor={() => confirmDeleteFloor.onTrue()}
          menuAnchor={floorMenuAnchor}
          onMenuClose={() => setFloorMenuAnchor(null)}
          onMenuOpen={(e, floor) => {
            setSelectedFloor(floor);
            setFloorMenuAnchor(e.currentTarget);
          }}
          loading={loadingFloor}
        />
      )}

      {selectedFloor && (
        <SpaceList
          spaces={selectedFloor.childStructures || []}
          selectedSpace={selectedSpace}
          onSpaceSelect={setSelectedSpace}
          onAddSpace={() => setAddSpaceDialog(true)}
          onEditSpace={() => setEditSpaceDialog(true)}
          onDeleteSpace={() => confirmDeleteSpace.onTrue()}
          menuAnchor={spaceMenuAnchor}
          onMenuClose={() => setSpaceMenuAnchor(null)}
          onMenuOpen={(e, space) => {
            setSelectedSpace(space);
            setSpaceMenuAnchor(e.currentTarget);
          }}
          loading={loadingSpace}
        />
      )}

      {/* Dialogs */}
      <EditDialog
        open={addBuildingDialog}
        onClose={() => setAddBuildingDialog(false)}
        onSubmit={handleAddBuilding}
        title="Add New Building"
      />

      <EditDialog
        open={editBuildingDialog}
        onClose={() => setEditBuildingDialog(false)}
        onSubmit={handleEditBuilding}
        title="Edit Building"
        initialValue={selectedBuilding?.name}
        initialCode={selectedBuilding?.code}
      />

      <EditDialog
        open={addFloorDialog}
        onClose={() => setAddFloorDialog(false)}
        onSubmit={handleAddFloor}
        title="Add New Floor"
      />

      <EditDialog
        open={editFloorDialog}
        onClose={() => setEditFloorDialog(false)}
        onSubmit={handleEditFloor}
        title="Edit Floor"
        initialValue={selectedFloor?.name}
        initialCode={selectedFloor?.code}
      />

      <EditDialog
        open={addSpaceDialog}
        onClose={() => setAddSpaceDialog(false)}
        onSubmit={handleAddSpace}
        title="Add New Space"
      />

      <EditDialog
        open={editSpaceDialog}
        onClose={() => setEditSpaceDialog(false)}
        onSubmit={handleEditSpace}
        title="Edit Space"
        initialValue={selectedSpace?.name}
        initialCode={selectedSpace?.code}
      />

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={confirmDeleteBuilding.value}
        onClose={confirmDeleteBuilding.onFalse}
        title="Delete Building"
        content={
          <>
            Are you sure want to delete <strong>{selectedBuilding?.name}</strong>?
            <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
              <strong> NOTE: </strong> All floors and spaces in this building will also be deleted.
            </Box>
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleDeleteBuilding}>
            Delete
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmDeleteFloor.value}
        onClose={confirmDeleteFloor.onFalse}
        title="Delete Floor"
        content={
          <>
            Are you sure want to delete <strong>{selectedFloor?.name}</strong>?
            <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
              <strong> NOTE: </strong> All spaces in this floor will also be deleted.
            </Box>
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleDeleteFloor}>
            Delete
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmDeleteSpace.value}
        onClose={confirmDeleteSpace.onFalse}
        title="Delete Space"
        content={
          <>
            Are you sure want to delete <strong>{selectedSpace?.name}</strong>?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleDeleteSpace}>
            Delete
          </Button>
        }
      />
    </Box>
  );
}
