"use client";

import { useContext } from "react";
import {
  WorkflowContext,
  WorkflowContextType,
} from "@/context/WorkflowContext";

export const useWorkflow = (): WorkflowContextType => {
  const context = useContext(WorkflowContext);

  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }

  return context;
};
