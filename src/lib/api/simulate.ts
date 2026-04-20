// Mock API: Simulate workflow execution

import {
  SimulationRequest,
  SimulationResult,
  WorkflowNode,
} from "@/lib/types/workflow";

/**
 * Simulate workflow execution
 * Returns step-by-step execution log
 */
export const simulateWorkflow = async (
  request: SimulationRequest,
): Promise<SimulationResult[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const { nodes, edges } = request;

  if (nodes.length === 0) {
    return [
      {
        step: 1,
        nodeId: "error",
        nodeName: "Error",
        status: "error",
        message: "Workflow has no nodes",
      },
    ];
  }

  // Build adjacency list for execution order
  const adjacencyMap = new Map<string, string[]>();
  for (const node of nodes) {
    adjacencyMap.set(node.id, []);
  }

  for (const edge of edges) {
    const neighbors = adjacencyMap.get(edge.source) || [];
    neighbors.push(edge.target);
    adjacencyMap.set(edge.source, neighbors);
  }

  // Find start node
  const startNode = nodes.find((n) => n.type === "start");
  if (!startNode) {
    return [
      {
        step: 1,
        nodeId: "error",
        nodeName: "Error",
        status: "error",
        message: "No start node found",
      },
    ];
  }

  // Simulate execution path using BFS
  const results: SimulationResult[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startNode.id];
  let stepCounter = 0;

  while (queue.length > 0 && stepCounter < 100) {
    // Safety check to prevent infinite loops
    const nodeId = queue.shift()!;

    if (visited.has(nodeId)) {
      continue;
    }

    visited.add(nodeId);
    stepCounter++;

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) continue;

    // Add execution step
    results.push({
      step: stepCounter,
      nodeId: node.id,
      nodeName: (node.data as Record<string, any>)?.label || node.type,
      status: "completed",
      message: `${node.type.charAt(0).toUpperCase() + node.type.slice(1)} executed successfully`,
      timestamp: new Date().toISOString(),
    });

    // Queue next nodes
    const nextNodes = adjacencyMap.get(nodeId) || [];
    for (const nextId of nextNodes) {
      if (!visited.has(nextId)) {
        queue.push(nextId);
      }
    }
  }

  if (results.length === 0) {
    return [
      {
        step: 1,
        nodeId: "error",
        nodeName: "Error",
        status: "error",
        message: "No execution path found",
      },
    ];
  }

  return results;
};

/**
 * Validate workflow integrity
 * Returns true if workflow is valid, false otherwise
 */
export const validateWorkflowStructure = (
  nodes: WorkflowNode[],
  edges: any[],
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (nodes.length === 0) {
    errors.push("Workflow must have at least one node");
    return { valid: false, errors };
  }

  const startNodes = nodes.filter((n) => n.type === "start");
  const endNodes = nodes.filter((n) => n.type === "end");

  if (startNodes.length !== 1) {
    errors.push(
      `Workflow must have exactly one start node (found ${startNodes.length})`,
    );
  }

  if (endNodes.length === 0) {
    errors.push("Workflow must have at least one end node");
  }

  return { valid: errors.length === 0, errors };
};
