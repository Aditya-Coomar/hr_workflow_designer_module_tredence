// Workflow validation engine

import { WorkflowNode, WorkflowEdge } from "@/lib/types/workflow";
import { getRequiredFields, nodeSchemas } from "@/lib/types/schema";

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  type: "error" | "warning";
  message: string;
  nodeId?: string;
  nodeName?: string;
}

/**
 * Validate entire workflow graph
 */
export const validateWorkflow = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): ValidationResult => {
  const errors: ValidationError[] = [];

  // 1. Check for start node (exactly one)
  const startNodes = nodes.filter((n) => n.type === "start");
  if (startNodes.length === 0) {
    errors.push({
      type: "error",
      message: "Workflow must have exactly one start node",
    });
  } else if (startNodes.length > 1) {
    errors.push({
      type: "error",
      message: `Workflow has ${startNodes.length} start nodes. Only one is allowed.`,
      nodeId: startNodes[1].id,
    });
  }

  // 2. Check for end node (at least one)
  const endNodes = nodes.filter((n) => n.type === "end");
  if (endNodes.length === 0) {
    errors.push({
      type: "error",
      message: "Workflow must have at least one end node",
    });
  }

  // 3. Check for cycles (DFS-based)
  const hasCycle = detectCycle(nodes, edges);
  if (hasCycle) {
    errors.push({
      type: "error",
      message: "Workflow contains a cycle. Cycles are not allowed.",
    });
  }

  // 4. Check connectivity (all nodes reachable from start)
  const startNode = startNodes[0];
  if (startNode) {
    const unreachableNodes = findUnreachableNodes(nodes, edges, startNode.id);
    if (unreachableNodes.length > 0) {
      errors.push({
        type: "warning",
        message: `${unreachableNodes.length} node(s) are disconnected from the start node`,
        nodeId: unreachableNodes[0].id,
        nodeName: (unreachableNodes[0].data as any)?.label,
      });
    }
  }

  // 5. Check required fields in all nodes
  for (const node of nodes) {
    const requiredFields = getRequiredFields(node.type);
    const nodeData = node.data as Record<string, any>;

    for (const field of requiredFields) {
      if (!nodeData[field] || nodeData[field].toString().trim() === "") {
        errors.push({
          type: "error",
          message: `Node "${nodeData.label || node.type}" is missing required field: "${field}"`,
          nodeId: node.id,
          nodeName: nodeData.label || node.type,
        });
      }
    }
  }

  return {
    valid: errors.filter((e) => e.type === "error").length === 0,
    errors,
  };
};

/**
 * Detect cycles in the workflow graph using DFS
 */
function detectCycle(nodes: WorkflowNode[], edges: WorkflowEdge[]): boolean {
  const adjacencyMap = new Map<string, string[]>();

  // Build adjacency list
  for (const node of nodes) {
    adjacencyMap.set(node.id, []);
  }

  for (const edge of edges) {
    const neighbors = adjacencyMap.get(edge.source) || [];
    neighbors.push(edge.target);
    adjacencyMap.set(edge.source, neighbors);
  }

  // DFS to detect cycle
  const WHITE = 0;
  const GRAY = 1;
  const BLACK = 2;

  const colors = new Map<string, number>();
  for (const node of nodes) {
    colors.set(node.id, WHITE);
  }

  function hasCycleDFS(nodeId: string): boolean {
    colors.set(nodeId, GRAY);

    const neighbors = adjacencyMap.get(nodeId) || [];
    for (const neighbor of neighbors) {
      const color = colors.get(neighbor) || WHITE;

      if (color === GRAY) {
        // Back edge found - cycle detected
        return true;
      }

      if (color === WHITE && hasCycleDFS(neighbor)) {
        return true;
      }
    }

    colors.set(nodeId, BLACK);
    return false;
  }

  for (const node of nodes) {
    if ((colors.get(node.id) || WHITE) === WHITE) {
      if (hasCycleDFS(node.id)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Find nodes that are unreachable from the start node
 */
function findUnreachableNodes(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
  startNodeId: string,
): WorkflowNode[] {
  const adjacencyMap = new Map<string, string[]>();

  for (const node of nodes) {
    adjacencyMap.set(node.id, []);
  }

  for (const edge of edges) {
    const neighbors = adjacencyMap.get(edge.source) || [];
    neighbors.push(edge.target);
    adjacencyMap.set(edge.source, neighbors);
  }

  const visited = new Set<string>();
  const queue: string[] = [startNodeId];

  while (queue.length > 0) {
    const nodeId = queue.shift()!;

    if (visited.has(nodeId)) {
      continue;
    }

    visited.add(nodeId);

    const neighbors = adjacencyMap.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return nodes.filter((n) => !visited.has(n.id));
}

/**
 * Get validation errors for a specific node
 */
export const getNodeErrors = (
  node: WorkflowNode,
  validationResult: ValidationResult,
): ValidationError[] => {
  return validationResult.errors.filter((e) => e.nodeId === node.id);
};
