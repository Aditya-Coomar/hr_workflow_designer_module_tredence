"use client";

import { Handle, Position } from "@xyflow/react";
import { ApprovalNodeData } from "@/lib/types/workflow";

interface ApprovalNodeProps {
  data: ApprovalNodeData;
  selected?: boolean;
}

export default function ApprovalNode({ data, selected }: ApprovalNodeProps) {
  return (
    <div
      className={`px-5 py-4 rounded-xl transition-all duration-200 w-56 ${
        selected
          ? "bg-gradient-to-br from-purple-50 to-pink-50 ring-2 ring-offset-2 ring-purple-500 shadow-lg border-2 border-purple-500 scale-105"
          : "bg-gradient-to-br from-purple-50 to-purple-50 border-2 border-purple-300 shadow-md hover:shadow-lg hover:border-purple-400"
      }`}
    >
      {/* Input indicator */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-600">
        INPUT
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
          ✓
        </div>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Approval
        </span>
      </div>

      <div className="text-sm font-bold text-slate-800 mb-2">
        {data.label || "Approval Gate"}
      </div>

      {data.approverRole && (
        <div className="text-xs text-slate-700 mt-2 flex items-center gap-1 p-2 bg-purple-100/50 rounded border border-purple-200">
          👥 <span className="font-medium">{data.approverRole}</span>
        </div>
      )}
      {data.threshold && (
        <div className="text-xs text-slate-700 mt-1 flex items-center gap-1 p-2 bg-purple-100/50 rounded border border-purple-200">
          ⚖️ <span className="font-medium">Threshold: {data.threshold}</span>
        </div>
      )}

      {/* Output indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-600">
        OUTPUT
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !border-2 !border-white !w-4 !h-4 !top-[-8px]"
        style={{ background: "#a855f7" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !border-2 !border-white !w-4 !h-4 !bottom-[-8px]"
        style={{ background: "#a855f7" }}
      />
      <div className="absolute bottom-0 right-2 text-xs text-purple-100 font-semibold">
        OUTPUT ↓
      </div>
    </div>
  );
}
