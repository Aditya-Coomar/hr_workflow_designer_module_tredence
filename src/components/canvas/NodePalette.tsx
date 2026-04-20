"use client";

import { useCallback } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { Button } from "@/components/ui/button";
import { NodeType, WorkflowNode } from "@/lib/types/workflow";

const NODE_TYPES: { type: NodeType; label: string; icon: string }[] = [
  { type: "start", label: "Start", icon: "▶️" },
  { type: "task", label: "Task", icon: "📋" },
  { type: "approval", label: "Approval", icon: "✅" },
  { type: "automated", label: "Automation", icon: "⚙️" },
  { type: "end", label: "End", icon: "🏁" },
];

export default function NodePalette() {
  const { state, dispatch } = useWorkflow();

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: NodeType,
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/nodeType", nodeType);
  };

  const handleAddNode = useCallback(
    (nodeType: NodeType) => {
      const newNode: WorkflowNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        data: {
          label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}`,
        },
        position: { x: Math.random() * 300, y: Math.random() * 300 },
      };

      dispatch({
        type: "SET_NODES",
        payload: [...state.nodes, newNode],
      });
    },
    [state.nodes, dispatch],
  );

  return (
    <div className="flex flex-col gap-2">
      {NODE_TYPES.map(({ type, label, icon }) => (
        <Button
          key={type}
          draggable
          onDragStart={(e) => handleDragStart(e, type)}
          onClick={() => handleAddNode(type)}
          className="w-full justify-start gap-3 text-left bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 text-slate-700 border border-slate-200 shadow-sm rounded-lg px-4 py-3 font-medium transition-all duration-200 hover:shadow-md hover:border-slate-300"
        >
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-semibold">{label}</span>
        </Button>
      ))}
    </div>
  );
}
