"use client";

import { Handle, Position } from "@xyflow/react";
import { StartNodeData } from "@/lib/types/workflow";

interface StartNodeProps {
  data: StartNodeData;
  selected?: boolean;
}

export default function StartNode({ data, selected }: StartNodeProps) {
  return (
    <div
      className={`px-5 py-4 rounded-xl transition-all duration-200 w-56 ${
        selected
          ? "bg-gradient-to-br from-green-50 to-teal-50 ring-2 ring-offset-2 ring-green-500 shadow-lg border-2 border-green-500 scale-105"
          : "bg-gradient-to-br from-green-50 to-green-50 border-2 border-green-300 shadow-md hover:shadow-lg hover:border-green-400"
      }`}
    >
      {/* Input indicator (hidden for start) */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-600 hidden">
        INPUT
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
          ▶
        </div>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Start
        </span>
      </div>

      <div className="text-sm font-bold text-slate-800 mb-2">
        {data.label || "Start Workflow"}
      </div>

      {data.metadata && (
        <div className="text-xs text-slate-600 mt-2 p-2 bg-green-100/50 rounded border border-green-200">
          {typeof data.metadata === "string"
            ? data.metadata
            : Object.values(data.metadata).join(", ")}
        </div>
      )}

      {/* Output indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-600">
        OUTPUT
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !border-2 !border-white !w-4 !h-4 !bottom-[-8px]"
        style={{ background: "#22c55e" }}
      />
    </div>
  );
}
