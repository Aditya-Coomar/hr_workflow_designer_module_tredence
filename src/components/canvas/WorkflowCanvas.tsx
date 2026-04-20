"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useWorkflow } from "@/hooks/useWorkflow";
import { nodeTypes } from "@/components/nodes/nodeTypes";
import { WorkflowNode as WorkflowNodeType } from "@/lib/types/workflow";

export default function WorkflowCanvas() {
  const { state, dispatch } = useWorkflow();

  // Convert WorkflowNode to React Flow Node
  const rfNodes = state.nodes.map((node: WorkflowNodeType) => ({
    id: node.id,
    type: node.type,
    data: node.data as unknown as Record<string, unknown>,
    position: node.position || { x: 0, y: 0 },
    selected: node.id === state.selectedNodeId,
    draggable: true,
    connectable: true,
  })) as Node[];

  // Convert WorkflowEdge to React Flow Edge
  const rfEdges: Edge[] = state.edges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
  }));

  const handleNodesChange = useCallback(
    (changes: any) => {
      let updatedNodes = [...state.nodes];
      let hasPositionChange = false;

      changes.forEach((change: any) => {
        if (change.type === "position" && change.position) {
          updatedNodes = updatedNodes.map((n) =>
            n.id === change.nodeId ? { ...n, position: change.position } : n,
          );
          hasPositionChange = true;
        }
        if (change.type === "select") {
          dispatch({
            type: "SELECT_NODE",
            payload: change.selected ? change.nodeId : null,
          });
        }
      });

      if (hasPositionChange) {
        dispatch({ type: "SET_NODES", payload: updatedNodes });
      }
    },
    [state.nodes, dispatch],
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      const updatedEdges = state.edges.filter((edge) => {
        const change = changes.find(
          (c: any) =>
            c.type === "remove" && c.id === `${edge.source}-${edge.target}`,
        );
        return !change;
      });

      if (updatedEdges !== state.edges) {
        dispatch({ type: "SET_EDGES", payload: updatedEdges });
      }
    },
    [state.edges, dispatch],
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        const newEdge = {
          id: `${connection.source}-${connection.target}`,
          source: connection.source,
          target: connection.target,
        };
        dispatch({
          type: "SET_EDGES",
          payload: [...state.edges, newEdge],
        });
      }
    },
    [state.edges, dispatch],
  );

  const handleNodeClick = useCallback(
    (_event: any, node: Node) => {
      dispatch({ type: "SELECT_NODE", payload: node.id });
    },
    [dispatch],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background
          color="#e2e8f0"
          gap={20}
          size={0.5}
          style={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
