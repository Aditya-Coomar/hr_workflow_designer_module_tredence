"use client";

import WorkflowCanvas from "@/components/canvas/WorkflowCanvas";

export default function WorkflowPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Main Layout: Sidebar | Canvas | Config Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Node Palette (Placeholder for Phase 3) */}
        <div className="w-48 border-r border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Node Palette</h2>
          <p className="text-xs text-gray-500">Populated in Phase 3</p>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white">
          <WorkflowCanvas />
        </div>

        {/* Config Panel (Placeholder for Phase 4) */}
        <div className="w-64 border-l border-gray-200 bg-gray-50 p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Node Configuration</h2>
          <p className="text-xs text-gray-500">Select a node to configure</p>
        </div>
      </div>

      {/* Simulation Panel (Placeholder for Phase 6) */}
      <div className="h-48 border-t border-gray-200 bg-gray-50 p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Simulation Results</h2>
        <p className="text-xs text-gray-500">Run simulation to see results</p>
      </div>
    </div>
  );
}
