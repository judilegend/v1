import React, { useState } from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { FiClock, FiTag, FiEdit, FiTrash2 } from "react-icons/fi";
import { ProjectModal } from "./ProjectModal";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: "ongoing" | "completed" | "pending";
  ticketCount: number;
  clientName: string;
  progress: number;
  onEdit: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  deadline,
  status,
  ticketCount,
  clientName,
  progress,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "delete">("edit");

  const handleEdit = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalMode("delete");
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FiClock className="text-gray-400" />
            <span className="text-sm text-gray-500">{deadline}</span>
          </div>
          <Badge
            variant={
              status === "ongoing"
                ? "primary"
                : status === "completed"
                ? "success"
                : "warning"
            }
          >
            {status}
          </Badge>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{clientName}</span>
          <div className="flex items-center">
            <FiTag className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">{ticketCount} tickets</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">{progress}% complete</span>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            <FiEdit />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          >
            <FiTrash2 />
          </button>
        </div>
      </Card>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        project={{
          id,
          title,
          description,
          deadline,
          status,
          clientName,
          progress,
        }}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
