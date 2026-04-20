import {
  WorkflowNode,
  WorkflowEdge,
  SimulationResult,
  WorkflowState,
} from "@/lib/types/workflow";

export const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  simulationResult: [],
};

export type WorkflowAction =
  | { type: "SET_NODES"; payload: WorkflowNode[] }
  | { type: "SET_EDGES"; payload: WorkflowEdge[] }
  | { type: "SELECT_NODE"; payload: string | null }
  | { type: "UPDATE_NODE"; payload: { id: string; data: Record<string, any> } }
  | { type: "DELETE_NODE"; payload: string }
  | { type: "DELETE_EDGE"; payload: { source: string; target: string } }
  | { type: "SET_SIMULATION_RESULT"; payload: SimulationResult[] }
  | { type: "CLEAR_SIMULATION_RESULT" };

export const workflowReducer = (
  state: WorkflowState,
  action: WorkflowAction,
): WorkflowState => {
  switch (action.type) {
    case "SET_NODES":
      return { ...state, nodes: action.payload };

    case "SET_EDGES":
      return { ...state, edges: action.payload };

    case "SELECT_NODE":
      return { ...state, selectedNodeId: action.payload };

    case "UPDATE_NODE":
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.payload.id
            ? { ...n, data: { ...n.data, ...action.payload.data } }
            : n,
        ),
      };

    case "DELETE_NODE":
      return {
        ...state,
        nodes: state.nodes.filter((n) => n.id !== action.payload),
        selectedNodeId:
          state.selectedNodeId === action.payload ? null : state.selectedNodeId,
      };

    case "DELETE_EDGE":
      return {
        ...state,
        edges: state.edges.filter(
          (e) =>
            !(
              e.source === action.payload.source &&
              e.target === action.payload.target
            ),
        ),
      };

    case "SET_SIMULATION_RESULT":
      return { ...state, simulationResult: action.payload };

    case "CLEAR_SIMULATION_RESULT":
      return { ...state, simulationResult: [] };

    default:
      return state;
  }
};
