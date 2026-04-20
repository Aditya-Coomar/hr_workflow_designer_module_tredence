// Mock API: Fetch available automation actions with their parameter schemas

export interface AutomationParam {
  name: string;
  type: "text" | "number" | "boolean";
  required?: boolean;
}

export interface Automation {
  id: string;
  label: string;
  description: string;
  paramSchema: AutomationParam[];
}

// Mock list of available automations
const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: "send_email",
    label: "Send Email",
    description: "Send an email notification",
    paramSchema: [
      { name: "to", type: "text", required: true },
      { name: "subject", type: "text", required: true },
      { name: "body", type: "text", required: false },
    ],
  },
  {
    id: "slack_notification",
    label: "Slack Notification",
    description: "Send a message to Slack",
    paramSchema: [
      { name: "channel", type: "text", required: true },
      { name: "message", type: "text", required: true },
    ],
  },
  {
    id: "create_task",
    label: "Create Task",
    description: "Create a new task in task management system",
    paramSchema: [
      { name: "title", type: "text", required: true },
      { name: "assignee", type: "text", required: false },
      { name: "priority", type: "text", required: false },
    ],
  },
  {
    id: "database_update",
    label: "Database Update",
    description: "Update records in the database",
    paramSchema: [
      { name: "table", type: "text", required: true },
      { name: "data", type: "text", required: true },
    ],
  },
];

/**
 * Fetch all available automations
 * Mock API call with 300ms delay
 */
export const fetchAutomations = async (): Promise<Automation[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return MOCK_AUTOMATIONS;
};

/**
 * Get a specific automation by ID
 */
export const getAutomationById = async (
  id: string,
): Promise<Automation | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_AUTOMATIONS.find((a) => a.id === id) || null;
};
