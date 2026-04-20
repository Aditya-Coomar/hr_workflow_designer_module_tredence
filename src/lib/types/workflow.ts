export type NodeType = "start" | "task" | "approval" | "automated" | "end";

// Base interface for all node data
export interface BaseNodeData {
  label: string;
}

// Start Node
export interface StartNodeData extends BaseNodeData {
  metadata?: Record<string, string>;
}

// Task Node
export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

// Approval Node
export interface ApprovalNodeData extends BaseNodeData {
  approverRole: string;
  threshold?: number;
}

// Automated Node
export interface AutomatedNodeData extends BaseNodeData {
  actionId: string;
  params: Record<string, string>;
}

// End Node
export interface EndNodeData extends BaseNodeData {
  endMessage?: string;
  includeSummary?: boolean;
}

// Union type for all node data
export type NodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

// Workflow node structure (React Flow compatible)
export interface WorkflowNode {
  id: string;
  type: NodeType;
  data: NodeData;
  position?: { x: number; y: number };
  selected?: boolean;
}

// Workflow edge structure (React Flow compatible)
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

// Simulation result step
export interface SimulationResult {
  step: number;
  nodeId: string;
  nodeName: string;
  status: "pending" | "executing" | "completed" | "error";
  message?: string;
  timestamp?: string;
}

// API request/response types
export interface SerializedWorkflow {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface SimulationRequest {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

// Workflow state
export interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  simulationResult: SimulationResult[];
}
