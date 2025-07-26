"use client"
import NodeComponenet from "@/app/workflow/_components/nodes/NodeComponent";
import { Workflow } from "@/generated/prisma";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { AppNode } from "@/types/appNodes";
import { TaskType } from "@/types/task";
import { Background, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow, type ColorMode } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

const nodeTypes = {
  Node: NodeComponenet
}

const snapGrid: [number, number] = [40, 40];
const fitViewOptions = { padding: 1 };

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {

  const { theme } = useTheme();
  const [nodes, setNodes, onNodeChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);


    } catch (error) {
      console.log("error in FlowEditor in parsing workflow definition", error)
    }
  }, [workflow.definition]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow")

    if (typeof taskType == undefined || !taskType) return;

    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
    const newNode = createFlowNode(taskType as TaskType, position);
    console.log(event)
    setNodes(nodes => nodes.concat(newNode))
  }, [])

  return (<main className="w-full h-full">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodeChange}
      onEdgesChange={onEdgeChange}
      colorMode={theme as ColorMode}
      nodeTypes={nodeTypes}
      snapToGrid
      snapGrid={snapGrid}
      fitView
      fitViewOptions={fitViewOptions}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Controls position="bottom-left" fitViewOptions={fitViewOptions} />
      <Background />
    </ReactFlow>
  </main>
  )
}

export { FlowEditor };
