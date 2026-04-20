"use client";

import WorkflowCanvas from "@/components/canvas/WorkflowCanvas";
import NodePalette from "@/components/canvas/NodePalette";
import NodeConfigPanel from "@/components/panels/NodeConfigPanel";
import SimulationPanel from "@/components/panels/SimulationPanel";

export default function WorkflowPage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white px-8 py-5 shadow-sm border-b border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          HR Workflow Designer
        </h1>
        <p className="text-slate-600 text-sm mt-1 font-medium">
          Design and simulate automated HR workflows with visual workflow
          builder
        </p>
      </div>

      {/* Main Layout: Sidebar | Canvas | Config Panel */}
      <div className="flex flex-1 overflow-hidden gap-3 p-3">
        {/* Sidebar - Node Palette */}
        <div className="w-64 bg-white rounded-xl border border-slate-200 p-5 shadow-sm overflow-y-auto hover:shadow-md transition-shadow">
          <h2 className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Node
            Palette
          </h2>
          <NodePalette />
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 font-medium">
              💡 Drag nodes to canvas or click to add
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <WorkflowCanvas />
        </div>

        {/* Config Panel */}
        <div className="w-80 bg-white rounded-xl border border-slate-200 p-5 overflow-y-auto shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-600 rounded-full"></span>{" "}
            Configuration
          </h2>
          <NodeConfigPanel />
        </div>
      </div>

      {/* Simulation Panel */}
      <div className="h-56 bg-white border-t border-slate-200 p-5 overflow-y-auto shadow-sm rounded-t-xl m-3 mt-0">
        <h2 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span> Simulation
          Results
        </h2>
        <SimulationPanel />
      </div>
    </div>
  );
}
