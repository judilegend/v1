import { DropResult } from "react-beautiful-dnd";
import { KanbanData } from "../types/Kanban";

export const handleDragEnd = (
  result: DropResult,
  data: KanbanData
): KanbanData => {
  const { destination, source, draggableId, type } = result;

  if (!destination) {
    return data;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return data;
  }

  if (type === "COLUMN") {
    const newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);

    return {
      ...data,
      columnOrder: newColumnOrder,
    };
  }

  const start = data.columns[source.droppableId];
  const finish = data.columns[destination.droppableId];

  if (start === finish) {
    const newItemIds = Array.from(start.itemIds);
    newItemIds.splice(source.index, 1);
    newItemIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      itemIds: newItemIds,
    };

    return {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };
  }

  const startItemIds = Array.from(start.itemIds);
  startItemIds.splice(source.index, 1);
  const newStart = {
    ...start,
    itemIds: startItemIds,
  };

  const finishItemIds = Array.from(finish.itemIds);
  finishItemIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finish,
    itemIds: finishItemIds,
  };

  return {
    ...data,
    columns: {
      ...data.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };
};
