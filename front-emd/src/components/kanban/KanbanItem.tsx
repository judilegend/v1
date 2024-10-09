import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "../ui/Card";

interface KanbanItemProps {
  item: any;
  index: number;
  type: "project" | "workPackage" | "activity" | "task";
}

export const KanbanItem: React.FC<KanbanItemProps> = ({
  item,
  index,
  type,
}) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="p-3 mb-2">
            <h3 className="font-semibold">{item.name || item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <span className="text-xs text-gray-400">{type}</span>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
