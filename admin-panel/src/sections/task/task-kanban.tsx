import type { Frame, Message } from '@stomp/stompjs';
import type { ITaskItem, TaskStatus } from 'src/types/task';
import type { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState, useEffect } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  useSensor,
  DndContext,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
  closestCorners,
  KeyboardSensor,
} from '@dnd-kit/core';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetTasks } from 'src/actions/task';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

const SOCKET_URL = 'http://localhost:4003/ws';
const STATUS_COLUMNS = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

const cssVars = {
  '--item-gap': '16px',
  '--item-radius': '12px',
  '--column-gap': '24px',
  '--column-width': '336px',
  '--column-radius': '16px',
  '--column-padding': '20px 16px 16px 16px',
};

function DroppableColumn({ status, children }: { status: TaskStatus; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Stack
      ref={setNodeRef}
      sx={{
        width: 'var(--column-width)',
        flexShrink: 0,
        borderRadius: 'var(--column-radius)',
        bgcolor: 'background.neutral',
        p: 'var(--column-padding)',
        minHeight: 200,
      }}
    >
      {children}
    </Stack>
  );
}

export function TaskKanban() {
  const { tasks: initialTasks, tasksLoading } = useGetTasks();
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTask, setActiveTask] = useState<ITaskItem | null>(null);
  const [previewTasks, setPreviewTasks] = useState(initialTasks);
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    if (initialTasks.length) {
      setTasks(initialTasks);
      setPreviewTasks(initialTasks);
    }
  }, [initialTasks]);

  // WebSocket bağlantısını kurma
  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket');

      // Task status değişikliklerini dinle
      client.subscribe('/topic/changeTaskStatus', (message: Message) => {
        const updatedTask = JSON.parse(message.body) as ITaskItem;
        console.log('Received task update from WebSocket:', updatedTask);

        // Her iki state'i de güncelle
        setTasks((prevTasks) => {
          const newTasks = prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );
          console.log('Updated tasks state:', newTasks);
          return newTasks;
        });

        setPreviewTasks((prevTasks) => {
          const newPreviewTasks = prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );
          console.log('Updated previewTasks state:', newPreviewTasks);
          return newPreviewTasks;
        });

        toast.success('Task status updated successfully!');
      });
    };

    client.onStompError = (frame: Frame) => {
      console.error('STOMP error:', frame);
      toast.error('WebSocket connection error');
    };

    client.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
      toast.error('WebSocket connection error');
    };

    client.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
    };

    client.activate();
    stompClient.current = client;

    return () => {
      if (client.connected) {
        console.log('Deactivating WebSocket connection');
        client.deactivate();
      }
    };
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id: UniqueIdentifier) => {
    // Check if the id is a column id
    const column = STATUS_COLUMNS.find((col) => col.id === id);
    if (column) return column.id;

    // Check if the id belongs to a task
    const task = previewTasks.find((t) => t.id === id);
    return task ? task.status : null;
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    const task = previewTasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const draggedId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(draggedId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    const draggedTask = previewTasks.find((t) => t.id === draggedId);
    if (!draggedTask) return;

    // Sadece önizleme state'ini güncelle
    setPreviewTasks((prev) => {
      const newItems = prev.filter((t) => t.id !== draggedId);
      const updatedTask = { ...draggedTask, status: overContainer as TaskStatus };
      return [...newItems, updatedTask];
    });
  };

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    setActiveTask(null);

    if (!over) {
      setActiveId(null);
      setPreviewTasks(tasks); // Önizleme state'ini sıfırla
      return;
    }

    // Orijinal task'ı tasks state'inden al
    const originalTask = tasks.find((task) => task.id === active.id);
    const overContainer = findContainer(over.id);

    if (
      !originalTask ||
      !overContainer ||
      !STATUS_COLUMNS.some((col) => col.id === overContainer)
    ) {
      setActiveId(null);
      setPreviewTasks(tasks); // Önizleme state'ini sıfırla
      return;
    }

    const overStatus = overContainer as TaskStatus;

    // Orijinal status ile karşılaştır
    if (originalTask.status === overStatus) {
      setActiveId(null);
      setPreviewTasks(tasks); // Önizleme state'ini sıfırla
      return;
    }

    try {
      console.log('Updating task:', {
        taskId: originalTask.id,
        currentStatus: originalTask.status,
        newStatus: overStatus,
      });

      // WebSocket üzerinden status değişikliğini gönder
      if (stompClient.current?.connected) {
        console.log('Publishing task status update:', {
          taskId: originalTask.id,
          status: overStatus,
        });
        stompClient.current.publish({
          destination: '/app/changeTaskStatus',
          body: JSON.stringify({
            taskId: originalTask.id,
            status: overStatus,
          }),
        });
      }
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task status');
      // Revert the drag if the API call fails
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === originalTask.id ? { ...task, status: originalTask.status } : task
        )
      );
    }

    setActiveId(null);
    setPreviewTasks(tasks); // Önizleme state'ini sıfırla
  };

  const renderColumn = (status: TaskStatus) => {
    // Önizleme state'ini kullan
    const columnTasks = previewTasks.filter((task) => task.status === status);
    const column = STATUS_COLUMNS.find((col) => col.id === status);

    return (
      <DroppableColumn key={status} status={status}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {column?.title} ({columnTasks.length})
        </Typography>

        <Stack
          spacing="var(--item-gap)"
          sx={{
            minHeight: 100,
            height: '100%',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
            borderRadius: 1,
            p: 1,
          }}
        >
          <SortableContext
            items={columnTasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {columnTasks.map((task) => (
              <TaskCard key={task.id} task={task} disabled={!!activeId} />
            ))}
          </SortableContext>
        </Stack>
      </DroppableColumn>
    );
  };

  if (tasksLoading) {
    return <EmptyContent title="Loading..." />;
  }

  return (
    <DashboardContent
      maxWidth={false}
      sx={{
        ...cssVars,
        pb: 0,
        pl: { sm: 3 },
        pr: { sm: 0 },
        flex: '1 1 0',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Task Kanban
      </Typography>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <Stack
          direction="row"
          sx={{
            gap: 'var(--column-gap)',
            overflowX: 'auto',
            pb: 3,
          }}
        >
          {STATUS_COLUMNS.map((column) => renderColumn(column.id as TaskStatus))}
        </Stack>

        <DragOverlay>
          {activeTask ? (
            <Stack
              sx={{
                p: 2,
                width: 'var(--column-width)',
                borderRadius: 'var(--item-radius)',
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z24,
              }}
            >
              <Typography variant="subtitle2" noWrap>
                {activeTask.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {activeTask.description || ''}
              </Typography>
            </Stack>
          ) : null}
        </DragOverlay>
      </DndContext>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface TaskCardProps {
  task: ITaskItem;
  disabled?: boolean;
}

function TaskCard({ task, disabled }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Stack
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 2,
        borderRadius: 'var(--item-radius)',
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.z1,
        cursor: disabled ? 'default' : 'grab',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z8,
        },
      }}
    >
      <Typography variant="subtitle2" noWrap>
        {task.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {task.description || ''}
      </Typography>
    </Stack>
  );
}
