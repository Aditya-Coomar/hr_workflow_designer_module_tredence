# HR Workflow Designer (Prototype)

A visual, node-based workflow builder that allows HR teams to design, configure, and simulate internal workflows such as onboarding, approvals, and automated processes.

This project is built as part of the Tredence AI Agentic Engineering case study, focusing on architectural clarity, scalability, and functional completeness over UI polish.

---

# Features

## Workflow Canvas

* Drag-and-drop node creation
* Connect nodes using edges
* Interactive graph using React Flow
* Node selection and deletion
* Zoom, pan, and controls

## Node Types

* Start Node – Entry point
* Task Node – Human task (e.g., collect documents)
* Approval Node – Approval step
* Automated Node – System-triggered actions
* End Node – Workflow completion

## Dynamic Node Configuration

* Schema-driven forms (not hardcoded)
* Context-aware inputs based on node type
* Controlled form updates with global state sync
* Dynamic fields for automated actions

## Mock API Integration

* Fetch automation actions
* Simulate workflow execution

## Workflow Simulation

* Serialize workflow graph
* Validate structure
* Execute simulation
* Display step-by-step logs

## Validation Engine

* Single Start node
* At least one End node
* No cycles
* Valid connections

---

# Architecture Overview

This project is designed with a strong emphasis on modularity, scalability, and separation of concerns.

## Core Principles

* Separation of UI, state, and business logic
* Schema-driven rendering
* Centralized state management
* Extensibility-first design

---

# System Design Diagrams

## 1. High-Level Architecture (HLD)

```id="hld-diagram"
                    ┌──────────────────────────┐
                    │        Next.js App       │
                    │  (App Router + Pages)   │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼────────────────────────┐
         │                       │                        │
┌────────▼────────┐   ┌─────────▼─────────┐   ┌──────────▼─────────┐
│   UI Layer       │   │   State Layer     │   │   Data/API Layer   │
│ (Components)     │   │ (Context + Reducer)│ │ (Mock APIs)        │
└────────┬────────┘   └─────────┬─────────┘   └──────────┬─────────┘
         │                      │                        │
         │                      │                        │
 ┌───────▼────────┐     ┌───────▼────────┐      ┌────────▼────────┐
 │ Workflow Canvas │     │ Workflow State │      │ Automations API │
 │ (React Flow)    │     │ Nodes, Edges   │      │ Simulation API  │
 └────────────────┘     └────────────────┘      └─────────────────┘
```

---

## 2. Component Interaction Flow

```id="component-flow"
User Action
   │
   ▼
Sidebar (Node Palette)
   │
   ▼
Workflow Canvas (React Flow)
   │
   ├── Node Created
   ├── Edge Connected
   ▼
Context Reducer Updates State
   │
   ▼
Node Selected
   │
   ▼
Node Config Panel
   │
   ▼
State Updated (Node Data)
```

---

## 3. State Management Flow

```id="state-flow"
User Interaction
   │
   ▼
Dispatch Action
   │
   ▼
Workflow Reducer
   │
   ├── Update Nodes
   ├── Update Edges
   ├── Update Selection
   ▼
Global State Updated
   │
   ▼
UI Re-render (Canvas + Panels)
```

---

## 4. Workflow Simulation Flow

```id="simulation-flow"
User clicks "Run Simulation"
   │
   ▼
Validation Engine
   │
   ├── Check Start Node
   ├── Check End Node
   ├── Detect Cycles
   ▼
Serialize Workflow Graph
   │
   ▼
POST /simulate API
   │
   ▼
Receive Execution Steps
   │
   ▼
Render Simulation Panel (Logs/Timeline)
```

---

## 5. Node Configuration System

```id="node-config-flow"
Node Selected
   │
   ▼
Identify Node Type
   │
   ▼
Fetch Schema (Node Registry)
   │
   ▼
Render Dynamic Form
   │
   ▼
User Edits Fields
   │
   ▼
Dispatch UPDATE_NODE
   │
   ▼
State Updated → Canvas Reflects Changes
```

---

## 6. Validation Engine (Graph Logic)

```id="validation-flow"
Input: Nodes + Edges
   │
   ▼
Check Start Node Count
   │
   ▼
Check End Node Presence
   │
   ▼
Graph Traversal (DFS)
   │
   ├── Detect Cycles
   ├── Detect Disconnected Nodes
   ▼
Return Validation Result
```

---

# Project Structure

```id="project-structure"
app/
 ├── workflow/
 │    └── page.tsx

components/
 ├── canvas/
 ├── nodes/
 ├── panels/
 ├── ui/

context/
 ├── WorkflowContext.tsx
 └── WorkflowReducer.ts

hooks/
 ├── useWorkflow.ts
 └── useNodeConfig.ts

lib/
 ├── api/
 ├── types/
 └── utils/
```

---

# State Management

## Approach

React Context + useReducer

## Managed State

* Nodes
* Edges
* Selected node
* Simulation results

## Rationale

Graph-heavy applications require predictable and structured state updates, which are best handled using reducer patterns.

---

# Node System Design

## Node Registry Pattern

Each node type defines:

* UI component
* Configuration schema
* Default data

## Benefits

* Easily extensible
* Decoupled logic
* No core refactoring required for new nodes

---

# Dynamic Form System

## Approach

Schema-driven form rendering

## Benefits

* Avoids hardcoding forms
* Supports dynamic fields
* Enables scalability

---

# API Layer

## Mock Endpoints

### GET /automations

Returns:

* Available automated actions
* Parameter definitions

### POST /simulate

Input:

* Workflow graph

Output:

* Step-by-step execution log

---

# Validation Logic

Validation is implemented using graph traversal and structural checks:

* Single Start node
* At least one End node
* No cycles (DFS)
* Connected graph

---

# UI Layout

```id="layout"
-------------------------------------------------
| Sidebar | Canvas             | Config Panel   |
-------------------------------------------------
|              Simulation Panel               |
-------------------------------------------------
```

---

# Tech Stack

* Next.js (App Router)
* TypeScript
* React Flow (@xyflow/react)
* TailwindCSS
* shadcn/ui
* React Context API

---

# Key Design Decisions

## Context + Reducer

Provides structured and predictable state management.

## Schema-Driven Forms

Ensures extensibility and reduces duplication.

## Node Registry Pattern

Supports scalable addition of node types.

## API Abstraction

Decouples UI from backend logic.

---

# Assumptions

* No backend persistence
* Single-user usage
* Focus on functionality over UI polish

---

# Out of Scope

* Authentication
* Database integration
* Real-time collaboration
* Workflow versioning

---

# How to Run

```bash id="run"
npm install
npm run dev
```

Open:
http://localhost:3000/workflow

---

# Development Priorities

* Core workflow creation
* Dynamic node configuration
* Simulation pipeline
* Clean architecture

---

# Future Improvements

## High Priority

* Undo/Redo
* Auto-layout
* Visual validation errors
* Node templates

## Advanced

* Backend persistence
* Multi-user collaboration
* Version history
* Role-based workflows

---

# Evaluation Alignment

| Area          | Implementation      |
| ------------- | ------------------- |
| React Flow    | Custom nodes, edges |
| Architecture  | Modular + Context   |
| Forms         | Schema-driven       |
| API           | Mock abstraction    |
| Scalability   | Node registry       |
| Communication | Structured README   |

---

# Conclusion

This project demonstrates the ability to design and build a scalable, extensible frontend system under constraints. The focus is on strong architecture, clean abstractions, and rapid delivery of functional features.
