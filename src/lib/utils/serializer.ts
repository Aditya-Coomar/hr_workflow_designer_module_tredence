// Workflow serialization utility

import {
  WorkflowNode,
  WorkflowEdge,
  SimulationRequest,
} from "@/lib/types/workflow";

/**
 * Convert workflow graph to API request format
 */
export const serializeWorkflow = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): SimulationRequest => {
  return {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
      position: node.position || { x: 0, y: 0 },
    })),
    edges: edges.map((edge) => ({
      id: edge.id || `${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
    })),
  };
};

/**
 * Get execution order by traversing the graph from start node
 */
export const getExecutionOrder = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): string[] => {
  const startNode = nodes.find((n) => n.type === "start");
  if (!startNode) {
    return [];
  }

  const adjacencyMap = new Map<string, string[]>();
  for (const node of nodes) {
    adjacencyMap.set(node.id, []);
  }

  for (const edge of edges) {
    const neighbors = adjacencyMap.get(edge.source) || [];
    neighbors.push(edge.target);
    adjacencyMap.set(edge.source, neighbors);
  }

  // DFS to get execution order
  const order: string[] = [];
  const visited = new Set<string>();

  function dfs(nodeId: string) {
    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);
    order.push(nodeId);

    const neighbors = adjacencyMap.get(nodeId) || [];
    for (const neighbor of neighbors) {
      dfs(neighbor);
    }
  }

  dfs(startNode.id);
  return order;
};

/**
 * Create a summary of the workflow
 */
export const getWorkflowSummary = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
) => {
  return {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodeTypes: Array.from(new Set(nodes.map((n) => n.type))).sort(),
    startNode: nodes.find((n) => n.type === "start")?.id,
    endNodes: nodes.filter((n) => n.type === "end").map((n) => n.id),
  };
};
