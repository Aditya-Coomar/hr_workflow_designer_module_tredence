# Plan: HR Workflow Designer Complete MVP

## TL;DR
Build a visual workflow designer with React Flow where HR admins drag nodes, connect them, configure via schema-driven forms, and simulate execution. Architecture: Context API + Reducer for state, Node Registry for extensibility, schema-driven forms, graph validation with cycle detection, mock API layer. Delivered in 7 sequential phases with validation at each step.

---

## Steps

### **Phase 1: Foundation Setup (State + Context)**
1. Create `context/WorkflowContext.tsx` and `context/WorkflowReducer.ts` following PRD code samples
2. Define core types in `lib/types/workflow.ts`:
   - `NodeType`, `BaseNodeData`, `TaskNodeData`, `ApprovalNodeData`, `AutomatedNodeData`
   - `WorkflowNode`, `WorkflowEdge`, `WorkflowState`
3. Create `hooks/useWorkflow.ts` custom hook
4. Create `lib/types/schema.ts` with node schema definitions (required for Phase 4)
5. Wrap root layout with `WorkflowProvider` in `app/layout.tsx`

**Verification:** TypeScript compiles, Context exports correctly, `useWorkflow()` works in any component

---

### **Phase 2: Canvas Core (React Flow Integration)**
1. Create `components/canvas/WorkflowCanvas.tsx`:
   - Initialize `<ReactFlow>` with state from context
   - Wire `onNodesChange` → dispatch `SET_NODES`
   - Wire `onEdgesChange` → dispatch `SET_EDGES`
   - Add `onConnect` handler with `addEdge` utility
   - Wire `onNodeClick` → dispatch `SELECT_NODE`
   - Include `<Background />` and `<Controls />`
2. Create `components/nodes/nodeTypes.ts` registry (empty for now, populate in Phase 3)
3. Create `app/workflow/page.tsx` layout with canvas + sidebar + panels
4. Style with Tailwind grid layout: `| Sidebar | Canvas | Config Panel |` + bottom simulation panel

**Verification:** 
- Canvas renders without errors
- Pan/zoom works
- Click selects nodes (console.log to verify dispatch)
- No nodes visible yet (expected)

---

### **Phase 3: Node System (Registry + Components)**
1. Create node component files:
   - `components/nodes/StartNode.tsx`
   - `components/nodes/TaskNode.tsx`
   - `components/nodes/ApprovalNode.tsx`
   - `components/nodes/AutomatedNode.tsx`
   - `components/nodes/EndNode.tsx`
   
   Each component:
   - Use `Handle` from `@xyflow/react` for connections
   - Accept `data` prop from React Flow
   - Display `data.label` in UI
   - Use simple card styling

2. Update `components/nodes/nodeTypes.ts`:
   ```
   export const nodeTypes = {
     start: StartNode,
     task: TaskNode,
     ...
   };
   ```

3. Create `components/canvas/NodePalette.tsx` sidebar:
   - Drag-source buttons for each node type (using `onDragStart`)
   - Pass `handleAddNode` prop that calls `useCallback` dispatcher → `SET_NODES`
   - Wire into canvas `onDrop` to position new nodes

**Verification:**
- Each node type renders on canvas
- Can drag from palette and drop onto canvas
- Nodes have unique IDs
- Nodes appear in Redux state

---

### **Phase 4: Node Configuration Panel (CRITICAL – Schema-Driven)**
1. Create `lib/types/schema.ts` with `FieldSchema` interface:
   ```typescript
   export interface FieldSchema {
     name: string;            // form field key
     label: string;           // display label
     type: "text" | "select" | "number" | "checkbox";
     required?: boolean;
     options?: Array<{value: string; label: string}>;
   }
   
   export const nodeSchemas: Record<NodeType, FieldSchema[]> = {
     start: [{name: "label", label: "Title", type: "text", required: true}, ...],
     task: [{name: "label", label: "Title", type: "text", required: true}, ...],
     // ... all 5 node types with fields from PRD
   };
   ```

2. Create `components/panels/NodeConfigPanel.tsx`:
   - Get `selectedNodeId` from state
   - Look up node schema: `nodeSchemas[node.type]`
   - **Render form dynamically** iterating schema:
     - Text fields → `<Input />`
     - Select fields → `<Select />`
     - Checkboxes → checkbox UI
   - `onChange` → dispatch `UPDATE_NODE` with field value
   - Sections for custom fields (key-value pairs) with add/remove

3. Populate full schema based on PRD Section 6.2:
   - **Start Node:** title, metadata (key-value)
   - **Task Node:** title (required), description, assignee, due date, custom fields
   - **Approval Node:** title, approver role, auto-approve threshold
   - **Automated Node:** title, action (select from API), dynamic params
   - **End Node:** end message, summary flag (boolean)

**Verification:**
- Select different node types → form fields change
- Edit field → state updates immediately
- Type safety: TypeScript knows which fields per node type
- Custom fields can be added/removed

---

### **Phase 5: API Layer (Mock Endpoints)**
1. Create `lib/api/automations.ts`:
   - Export `fetchAutomations()` → returns action definitions with param schemas
   - Mock data structure:
     ```typescript
     {
       id: "send_email",
       label: "Send Email",
       paramSchema: [
         { name: "to", type: "text", required: true },
         { name: "subject", type: "text", required: true }
       ]
     }
     ```

2. Create `lib/api/simulate.ts`:
   - Export `simulateWorkflow(graph)` → POST mock, returns step-by-step execution
   - Mock response: execution steps with node ID, status, timestamp
   - Add 300ms artificial delay to simulate network

3. Create `lib/api/index.ts` barrel export

**Verification:**
- Imports work without errors
- Mock functions return expected shapes
- Automations API loads in Automated Node config panel dropdown

---

### **Phase 6: Simulation Engine (Serialize → API Call → Display)**
1. Create `lib/utils/serializer.ts`:
   - Export `serializeWorkflow(nodes, edges)` → converts graph to API format
   - Output includes: node list with metadata, edge connections, execution order

2. Create `components/panels/SimulationPanel.tsx`:
   - Button "Run Simulation"
   - On click:
     - Call `validateWorkflow()` (Phase 7) → show error if invalid
     - Serialize graph
     - Call `simulateWorkflow(payload)` from API
     - Dispatch `SET_SIMULATION_RESULT`
   - Display results as timeline/log:
     - Map result steps → show step, status, node ID
     - Add loading state during API call
     - Show errors prominently

**Verification:**
- Click "Run Simulation" with valid workflow → see results
- Invalid workflows show validation error before API call
- Results display step-by-step

---

### **Phase 7: Validation Engine (Graph Analysis + Error Handling)**
1. Create `lib/utils/validation.ts`:
   - Export `validateWorkflow(nodes, edges)` → returns `{valid: boolean, errors: string[]}`
   - Implement checks:
     - **Start Node:** exactly one
     - **End Node:** at least one
     - **Connectivity:** all nodes connected (DFS from start)
     - **Cycles:** DFS-based cycle detection
     - **Required Fields:** iterate schema, check all `required: true` fields filled
   - Return detailed error messages

2. Wire validation into:
   - NodeConfigPanel: show field validation errors as user types
   - SimulationPanel: show workflow errors before running simulation
   - Optional: Visual red border on invalid nodes in canvas

3. Create `lib/utils/validation.test.ts` (TypeScript – no Jest required yet):
   - Unit test: one start node requirement
   - Unit test: cycle detection
   - Unit test: connectivity check
   - Can run via TypeScript compiler in CI/CD if needed

**Verification:**
- Add 2 start nodes → validation error
- Create cycle (A→B→A) → validation error
- Missing required field → panel error + simulation blocked
- Valid workflow → simulation runs

---

## Relevant Files

**Core Infrastructure:**
- `context/WorkflowContext.tsx` — Context setup and provider
- `context/WorkflowReducer.ts` — State machine with all action handlers
- `hooks/useWorkflow.ts` — Custom hook for context access
- `lib/types/workflow.ts` — `NodeType`, `WorkflowNode`, `WorkflowState` interfaces
- `lib/types/schema.ts` — `FieldSchema` and `nodeSchemas` record

**Canvas & Nodes:**
- `components/canvas/WorkflowCanvas.tsx` — React Flow initialization + state binding
- `components/canvas/NodePalette.tsx` — Drag-source sidebar
- `components/nodes/nodeTypes.ts` — Node component registry
- `components/nodes/{StartNode,TaskNode,ApprovalNode,AutomatedNode,EndNode}.tsx` — Custom node components using `Handle`

**UI Panels:**
- `components/panels/NodeConfigPanel.tsx` — Schema-driven form renderer
- `components/panels/SimulationPanel.tsx` — Serialize, validate, simulate, display results

**API & Logic:**
- `lib/api/automations.ts` — `fetchAutomations()` mock
- `lib/api/simulate.ts` — `simulateWorkflow()` mock
- `lib/api/index.ts` — Barrel export
- `lib/utils/serializer.ts` — `serializeWorkflow(nodes, edges)`
- `lib/utils/validation.ts` — `validateWorkflow(nodes, edges)` with DFS/BFS

**Pages:**
- `app/workflow/page.tsx` — Main workflow builder UI (grid: sidebar | canvas | config | simulation)

---

## Verification

### Per-Phase Verification
1. **Phase 1:** TypeScript compiles, `useWorkflow()` hook usable in any component, context exports
2. **Phase 2:** Canvas renders, pan/zoom work, node selection logs selection state
3. **Phase 3:** Can drag nodes from palette, nodes appear on canvas, IDs are unique
4. **Phase 4:** Select different node types → form fields change dynamically, edits update state
5. **Phase 5:** Mock APIs return data with correct shape, dropdown in Automated Node populates
6. **Phase 6:** Click "Run Simulation" → serialized graph logged, API called (with 3sec delay), results render
7. **Phase 7:** Invalid workflows blocked before simulation, validation errors show clearly

### Full Workflow Test (Integration)
1. **Happy Path:**
   - Drag Start → Task → Approval → End onto canvas
   - Connect all edges (Start→Task, Task→Approval, Approval→End)
   - Select Task, fill in title, assignee, due date
   - Select Approval, fill in approver role
   - Click "Run Simulation" → see execution steps

2. **Edge Cases:**
   - Add 2 Start nodes → validation error
   - Create cycle (Task→Task) → validation error
   - Leave required field empty → field error + simulation blocked
   - Drag Automated Node, load actions from API, select one, see dynamic params

---

## Decisions

1. **State Management:** Context API + Reducer (simpler than Redux, cleaner than scattered useState)
2. **Nodes:** Registry pattern (extensibility over inline switch statements)
3. **Forms:** Schema-driven (zero hardcoded field definitions; easy to add node types)
4. **Validation:** Graph-based DFS/BFS (correct; detects actual workflow issues)
5. **API Layer:** Separate module (decoupled from UI; easy to swap mock for real)
6. **Serialization:** Explicit `serializeWorkflow()` function (testable, reusable)
7. **Cycle Detection:** DFS-based (O(V+E); standard algorithm referenced in PRD)

---

## Scope Boundaries

**Included:**
- All 5 node types with fields per PRD Section 6.2
- Full graph validation (start, end, connectivity, cycles, required fields)
- Dynamic form rendering from schema
- Mock API with automations + simulation
- Drag-and-drop canvas with React Flow
- Step-by-step simulation execution display

**Excluded (Out of Scope per PRD Section 10):**
- Authentication / user accounts
- Backend persistence (remains mock)
- Multi-user workflows / collaboration
- Production UI polish (functional is acceptable)
- Undo/Redo (optional enhancement)
- Export/Import JSON (optional enhancement)
- Mini-map (optional enhancement)

---

## Architecture Highlights (Evaluation Criteria)

**React Flow Usage:**
- `<ReactFlow nodeTypes={nodeTypes} onNodesChange onEdgesChange onConnect />`
- Custom node components with `Handle` for connections
- Proper integration with state management

**Form Handling:**
- Schema-driven rendering (zero hardcoded per-node form)
- Dynamic fields based on selected node type
- State updates via reducer pattern

**API Abstraction:**
- `lib/api/` folder isolates all network/data logic
- UI components never directly call APIs; use hooks
- Mock layer fully isolated; easy to replace with real backend

**Scalability of Design:**
- Node Registry: add new node type = register component + add schema entry (no core logic changes)
- Schema-driven forms: add field = add field to schema (no component rewrites)
- Reducer pattern: new actions = add case, no scattered state updates
- Strong TS typing throughout (interfaces for Node, State, Schema, API responses)

---

## Further Considerations

1. **Automated Node Dynamic Params:** When user selects an action from API, dynamically render parameter input fields from the action's `paramSchema`. This requires:
   - Fetch automations in Automated Node config panel render
   - Store selected `actionId` in node data
   - Render parameter fields based on selected action's paramSchema
   - Test with 2+ automations in mock

2. **Custom Fields (Task Node):** Task node supports key-value custom fields. In config panel:
   - Show "Add Custom Field" button
   - Allow add/remove custom fields
   - Store in `customFields: Record<string, string>`
   - Serialization includes custom fields in simulation

3. **Deployment & Testing Strategy:**
   - Components tested visually in workflow page (can mock with hardcoded nodes)
   - Validation utility can be unit-tested independently
   - No E2E tests required for MVP (fully manual verification)
   - If time permits, add React Testing Library tests for:
     - Schema-driven form rendering (field types match schema)
     - Validation logic (start/end/cycles/connectivity)
     - Reducer action handlers (UPDATE_NODE, SELECT_NODE, etc.)
