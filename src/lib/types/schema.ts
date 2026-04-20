import { NodeType } from "./workflow";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldSchema {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "checkbox" | "date";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  helperText?: string;
}

export const nodeSchemas: Record<NodeType, FieldSchema[]> = {
  start: [
    {
      name: "label",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "e.g., Workflow Start",
      helperText: "A descriptive name for the starting point",
    },
    {
      name: "metadata",
      label: "Metadata (optional)",
      type: "text",
      placeholder: "Add key-value metadata",
    },
  ],

  task: [
    {
      name: "label",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "e.g., Review Application",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe the task in detail",
    },
    {
      name: "assignee",
      label: "Assignee",
      type: "text",
      placeholder: "e.g., john.doe@company.com",
    },
    {
      name: "dueDate",
      label: "Due Date",
      type: "date",
    },
    {
      name: "customFields",
      label: "Custom Fields",
      type: "text",
      placeholder: "Add custom key-value pairs",
    },
  ],

  approval: [
    {
      name: "label",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "e.g., Manager Approval",
    },
    {
      name: "approverRole",
      label: "Approver Role",
      type: "text",
      required: true,
      placeholder: "e.g., Manager, Director, Senior Manager",
      helperText: "The role responsible for approval",
    },
    {
      name: "threshold",
      label: "Auto-Approve Threshold (%)",
      type: "number",
      placeholder: "0-100",
      helperText: "Optional: auto-approve below this threshold",
    },
  ],

  automated: [
    {
      name: "label",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "e.g., Send Onboarding Email",
    },
    {
      name: "actionId",
      label: "Action",
      type: "select",
      required: true,
      options: [],
      helperText: "Select an automation action from available options",
    },
    {
      name: "params",
      label: "Action Parameters",
      type: "text",
      placeholder: "Parameters will appear based on selected action",
    },
  ],

  end: [
    {
      name: "label",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "e.g., Workflow Complete",
    },
    {
      name: "endMessage",
      label: "End Message",
      type: "textarea",
      placeholder: "Display message when workflow completes",
    },
    {
      name: "includeSummary",
      label: "Include Summary",
      type: "checkbox",
      helperText: "Show execution summary when workflow ends",
    },
  ],
};

/**
 * Helper function to get required fields for a node type
 */
export const getRequiredFields = (nodeType: NodeType): string[] => {
  return nodeSchemas[nodeType]
    .filter((field) => field.required)
    .map((field) => field.name);
};

/**
 * Helper function to get schema for a specific field in a node type
 */
export const getFieldSchema = (
  nodeType: NodeType,
  fieldName: string,
): FieldSchema | undefined => {
  return nodeSchemas[nodeType].find((f) => f.name === fieldName);
};
