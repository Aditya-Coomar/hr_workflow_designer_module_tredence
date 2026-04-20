"use client";

import { createContext, useReducer, ReactNode } from "react";
import {
  workflowReducer,
  initialState,
  WorkflowAction,
} from "./WorkflowReducer";
import { WorkflowState } from "@/lib/types/workflow";

export interface WorkflowContextType {
  state: WorkflowState;
  dispatch: (action: WorkflowAction) => void;
}

export const WorkflowContext = createContext<WorkflowContextType | null>(null);

interface WorkflowProviderProps {
  children: ReactNode;
}

export const WorkflowProvider = ({ children }: WorkflowProviderProps) => {
  const [state, dispatch] = useReducer(workflowReducer, initialState);

  return (
    <WorkflowContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkflowContext.Provider>
  );
};
