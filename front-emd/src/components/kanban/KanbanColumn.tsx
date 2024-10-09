import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { KanbanItem } from "./KanbanItem";

interface KanbanColumnProps {
  title: string;
  items: any[];
  type: "project" | "workPackage" | "activity" | "task";
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  items,
  type,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg min-w-[300px]">
      <h2 className="font-semibold mb-4">{title}</h2>
      <Droppable
        droppableId={title.toLowerCase().replace(" ", "-")}
        type={type}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {items.map((item, index) => (
              <KanbanItem key={item.id} item={item} index={index} type={type} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
