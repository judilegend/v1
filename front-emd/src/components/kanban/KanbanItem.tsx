import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Chip from "../ui/Chip";
import AvatarGroup from "../ui/AvatarGroup";
import IconButton from "../ui/IconButton";
import { KanbanItem as ItemType } from "../../types/Kanban";

interface Props {
  item: ItemType;
  index: number;
}

const KanbanItem: React.FC<Props> = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white rounded-md shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="space-x-2">
              {item.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
            <IconButton
              icon="dots-vertical"
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
          <p className="text-gray-700 mb-4">{item.content}</p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-gray-500 text-sm">
              <span className="flex items-center">
                <IconButton icon="paperclip" className="mr-1" /> 4
              </span>
              <span className="flex items-center">
                <IconButton icon="message-2" className="mr-1" /> 12
              </span>
            </div>
            <AvatarGroup
              users={
                [
                  /* Add user data here */
                ]
              }
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanItem;
