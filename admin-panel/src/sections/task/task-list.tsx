import type { GridColDef } from '@mui/x-data-grid';
import type { ITaskItem, TaskStatus, ITaskTableFilters } from 'src/types/task';

import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { useGetTasks } from 'src/actions/task';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { taskService } from 'src/sections/task/services/task';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
];

const HIDE_COLUMNS = { description: false };

const HIDE_COLUMNS_TOGGLABLE = ['description', 'actions'];

// ----------------------------------------------------------------------

export function TaskList() {
  const confirmRows = useBoolean();
  const openNewTask = useBoolean();
  const openEditTask = useBoolean();

  const { tasks: initialTasks, tasksLoading, error } = useGetTasks();
  const [tableData, setTableData] = useState<ITaskItem[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [editingTask, setEditingTask] = useState<ITaskItem | null>(null);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
  });

  const filters = useSetState<ITaskTableFilters>({ status: [] });

  useEffect(() => {
    if (initialTasks.length) {
      console.log('Initial tasks:', initialTasks);
      setTableData(initialTasks);
    }
  }, [initialTasks]);

  const handleDeleteRow = useCallback(
    async (id: number) => {
      try {
        await taskService.deleteTask(id);
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        toast.success('Delete success!');
      } catch (err) {
        toast.error('Failed to delete task');
      }
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      await Promise.all(selectedRowIds.map((id) => taskService.deleteTask(Number(id))));
      const deleteRows = tableData.filter((row) => !selectedRowIds.includes(Number(row.id)));
      setTableData(deleteRows);
      toast.success('Delete success!');
    } catch (err) {
      toast.error('Failed to delete tasks');
    }
  }, [selectedRowIds, tableData]);

  const handleCreateTask = async () => {
    if (!newTask.name.trim()) {
      toast.error('Task name is required');
      return;
    }

    try {
      const createdTask = await taskService.createTask(newTask);
      setTableData((prev) => [...prev, createdTask]);
      setNewTask({ name: '', description: '' });
      openNewTask.onFalse();
      toast.success('Task created successfully!');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      const updatedTask = await taskService.updateTask(editingTask.id, {
        name: editingTask.name,
        description: editingTask.description,
        status: editingTask.status,
      });

      setTableData((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      setEditingTask(null);
      openEditTask.onFalse();
      toast.success('Task updated successfully!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleEditRow = (task: ITaskItem) => {
    setEditingTask(task);
    openEditTask.onTrue();
  };

  const handleStatusChange = async (id: number, newStatus: TaskStatus) => {
    try {
      const task = tableData.find((t) => t.id === id);
      if (!task) return;

      const updatedTask = await taskService.updateTask(id, {
        name: task.name,
        description: task.description,
        status: newStatus,
      });

      setTableData((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      toast.success('Status updated successfully!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Task Name',
      flex: 1,
      minWidth: 360,
      hideable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 360,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS.map((option) => option.value),
      renderCell: (params) => (
        <MenuItem
          value={params.value}
          onClick={() => handleStatusChange(params.row.id, params.value as TaskStatus)}
        >
          {STATUS_OPTIONS.find((option) => option.value === params.value)?.label}
        </MenuItem>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 160,
      renderCell: (params) => {
        if (!params.value) return '';
        try {
          const date = new Date(params.value);
          return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch (err) {
          console.error('CreatedAt formatting error:', err);
          return params.value;
        }
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 160,
      renderCell: (params) => {
        if (!params.value) return '';
        try {
          const date = new Date(params.value);
          return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch (err) {
          console.error('UpdatedAt formatting error:', err);
          return params.value;
        }
      },
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  if (error) {
    return <EmptyContent title={error} />;
  }

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Tasks"
          links={[{ name: 'Dashboard', href: paths.root }, { name: 'Tasks' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openNewTask.onTrue}
            >
              New Task
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={tableData}
            columns={columns}
            loading={tasksLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) =>
              setSelectedRowIds(newSelectionModel as number[])
            }
            slots={{
              toolbar: () => (
                <GridToolbarContainer>
                  <Stack
                    spacing={1}
                    flexGrow={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    {!!selectedRowIds.length && (
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                        onClick={confirmRows.onTrue}
                      >
                        Delete ({selectedRowIds.length})
                      </Button>
                    )}

                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarExport />
                  </Stack>
                </GridToolbarContainer>
              ),
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>

      <Dialog open={openNewTask.value} onClose={openNewTask.onFalse}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask((prev) => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newTask.description}
              onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={openNewTask.onFalse}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTask}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditTask.value} onClose={openEditTask.onFalse}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Task Name"
              value={editingTask?.name || ''}
              onChange={(e) =>
                setEditingTask((prev) => (prev ? { ...prev, name: e.target.value } : null))
              }
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={editingTask?.description || ''}
              onChange={(e) =>
                setEditingTask((prev) => (prev ? { ...prev, description: e.target.value } : null))
              }
            />
            <TextField
              fullWidth
              select
              label="Status"
              value={editingTask?.status || ''}
              onChange={(e) =>
                setEditingTask((prev) =>
                  prev ? { ...prev, status: e.target.value as TaskStatus } : null
                )
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={openEditTask.onFalse}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateTask}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
