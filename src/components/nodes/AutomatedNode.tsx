"use client";

import { Handle, Position } from "@xyflow/react";
import { AutomatedNodeData } from "@/lib/types/workflow";

interface AutomatedNodeProps {
  data: AutomatedNodeData;
  selected?: boolean;
}

export default function AutomatedNode({ data, selected }: AutomatedNodeProps) {
  return (
    <div
      className={`px-5 py-4 rounded-xl transition-all duration-200 w-56 ${
        selected
          ? "bg-gradient-to-br from-amber-50 to-orange-50 ring-2 ring-offset-2 ring-amber-500 shadow-lg border-2 border-amber-500 scale-105"
          : "bg-gradient-to-br from-amber-50 to-amber-50 border-2 border-amber-300 shadow-md hover:shadow-lg hover:border-amber-400"
      }`}
    >
      {/* Input indicator */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-600">
        INPUT
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold">
          ⚙️
        </div>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Automation
        </span>
      </div>

      <div className="text-sm font-bold text-slate-800 mb-2">
        {data.label || "Automated Action"}
      </div>

      {data.actionId && (
        <div className="text-xs text-slate-700 mt-2 p-2 bg-amber-100/50 rounded border border-amber-200">
          <span className="font-medium">{data.actionId}</span>
        </div>
      )}

      {/* Output indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-600">
        OUTPUT
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-500 !border-2 !border-white !w-4 !h-4 !top-[-8px]"
        style={{ background: "#f59e0b" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-amber-500 !border-2 !border-white !w-4 !h-4 !bottom-[-8px]"
        style={{ background: "#f59e0b" }}
      />
    </div>
  );
}
