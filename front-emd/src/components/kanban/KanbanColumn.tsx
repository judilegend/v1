import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import KanbanItem from "./KanbanItem";
import IconButton from "../ui/IconButton";
import {
  KanbanColumn as ColumnType,
  KanbanItem as ItemType,
} from "../../types/Kanban";

interface Props {
  column: ColumnType;
  items: ItemType[];
  index: number;
}

const KanbanColumn: React.FC<Props> = ({ column, items, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-white rounded-lg shadow-md w-80 flex-shrink-0"
        >
          <div
            className="p-4 bg-gray-50 rounded-t-lg border-b border-gray-200 flex justify-between items-center"
            {...provided.dragHandleProps}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {column.title}
            </h2>
            <IconButton
              icon="dots-vertical"
              className="text-gray-500 hover:text-gray-700"
            />
          </div>
          <Droppable droppableId={column.id} type="ITEM">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4 space-y-4 min-h-[200px]"
              >
                {items.map((item, index) => (
                  <KanbanItem key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
              <IconButton icon="plus" className="mr-2" />
              <span>Add New Item</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
