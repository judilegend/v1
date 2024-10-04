import React from "react";
import { Tache } from "../types/type";
import TacheCard from "./TacheCard";

interface Props {
  title: string;
  taches: Tache[];
}

const TacheColumn: React.FC<Props> = ({ title, taches }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {taches.map((tache) => (
          <TacheCard key={tache.id} tache={tache} />
        ))}
      </div>
    </div>
  );
};

export default TacheColumn;
