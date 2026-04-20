"use client";

import { useState, useCallback } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { simulateWorkflow } from "@/lib/api/simulate";
import { serializeWorkflow } from "@/lib/utils/serializer";
import { validateWorkflow } from "@/lib/utils/validation";

export default function SimulationPanel() {
  const { state, dispatch } = useWorkflow();
  const [isRunning, setIsRunning] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleRunSimulation = useCallback(async () => {
    setValidationErrors([]);

    // Validate workflow first
    const validationResult = validateWorkflow(state.nodes, state.edges);

    if (!validationResult.valid) {
      const errorMessages = validationResult.errors
        .filter((e) => e.type === "error")
        .map((e) => e.message);
      setValidationErrors(errorMessages);
      return;
    }

    setIsRunning(true);

    try {
      // Serialize workflow
      const serialized = serializeWorkflow(state.nodes, state.edges);

      // Call simulation API
      const results = await simulateWorkflow(serialized);

      // Update state with results
      dispatch({
        type: "SET_SIMULATION_RESULT",
        payload: results,
      });
    } catch (error) {
      setValidationErrors([
        `Simulation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      ]);
    } finally {
      setIsRunning(false);
    }
  }, [state.nodes, state.edges, dispatch]);

  const handleClearResults = useCallback(() => {
    dispatch({ type: "CLEAR_SIMULATION_RESULT" });
    setValidationErrors([]);
  }, [dispatch]);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Control Section */}
      <div className="flex gap-2 items-center">
        <Button
          onClick={handleRunSimulation}
          disabled={isRunning || state.nodes.length === 0}
          className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold hover:from-green-700 hover:to-teal-700 shadow-md"
        >
          {isRunning ? "⏳ Running Simulation..." : "▶ Run Simulation"}
        </Button>

        {state.simulationResult.length > 0 && (
          <Button
            onClick={handleClearResults}
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Clear
          </Button>
        )}

        <Badge
          variant="outline"
          className="text-xs bg-slate-50 text-slate-700 border-slate-300"
        >
          <span className="font-semibold">{state.nodes.length}</span>{" "}
          <span className="text-slate-500 ml-1">nodes</span>
        </Badge>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <p className="font-semibold text-red-800 mb-2 text-sm flex items-center gap-2">
            <span>⚠️</span> Validation Errors
          </p>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, idx) => (
              <li key={idx} className="text-red-700 text-xs">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Results Section */}
      {state.simulationResult.length > 0 && (
        <div className="flex-1 overflow-y-auto border-2 border-slate-200 rounded-lg bg-gradient-to-br from-white to-slate-50">
          <div className="p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider sticky top-0 bg-white pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              Execution Timeline — {state.simulationResult.length}{" "}
              {state.simulationResult.length === 1 ? "step" : "steps"}
            </h3>

            {state.simulationResult.map((result, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border-l-4 border-b border-slate-100 text-xs transition-all ${
                  result.status === "completed"
                    ? "bg-green-50/80 border-l-green-500 hover:bg-green-50"
                    : result.status === "error"
                      ? "bg-red-50/80 border-l-red-500 hover:bg-red-50"
                      : "bg-amber-50/80 border-l-amber-500 hover:bg-amber-50"
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div className="font-bold text-slate-600 bg-white rounded px-2 py-1 min-w-max text-xs">
                    Step {result.step}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                      {result.nodeName}
                      {result.status === "completed" && (
                        <span className="text-green-600 font-bold">✓</span>
                      )}
                      {result.status === "error" && (
                        <span className="text-red-600 font-bold">✕</span>
                      )}
                      {result.status === "pending" && (
                        <span className="text-amber-600 font-bold">⏳</span>
                      )}
                    </p>

                    {result.message && (
                      <p className="text-slate-600 mt-1 text-xs">
                        {result.message}
                      </p>
                    )}

                    {result.timestamp && (
                      <p className="text-slate-400 text-xs mt-1">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {state.simulationResult.length === 0 && validationErrors.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">▶</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              {state.nodes.length === 0
                ? "🎯 Create nodes to start simulating"
                : "🚀 Click 'Run Simulation' to execute the workflow"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {state.nodes.length > 0 &&
                `${state.nodes.length} node${state.nodes.length !== 1 ? "s" : ""} ready to simulate`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
