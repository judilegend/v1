import React from "react";
import { Tache } from "../types/types";
import TacheCard from "./TacheCard";
import { DroppableProvided } from "react-beautiful-dnd";

interface Props {
  title: string;
  taches: Tache[];
  provided: DroppableProvided;
}

const TacheColumn: React.FC<Props> = ({ title, taches, provided }) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {taches.map((tache, index) => (
          <TacheCard key={tache.id} tache={tache} />
        ))}
      </div>
      {provided.placeholder}
    </div>
  );
};

export default TacheColumn;
