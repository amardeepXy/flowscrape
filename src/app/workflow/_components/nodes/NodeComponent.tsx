import { taskRegistry } from "@/lib/workflow/task/registry";
import { AppNodeData } from "@/types/appNodes";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import NodeInputs, { NodeInput } from "./NodeInput";
import { NodeOutputs, NodeOutput } from "./NodeOutputs";

const NodeComponenet = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = taskRegistry[nodeData.type]
  return <NodeCard nodeId={props.id} isSelected={props.selected}>
    <NodeHeader taskType={nodeData.type} />
    <NodeInputs>
      {task.inputs.map((val) => (
        <NodeInput key={val.name} input={val} nodeId={props.id} />)
      )}
    </NodeInputs>
    <NodeOutputs>
      {task.outputs.map(val => (
        <NodeOutput key={val.name} output={val} />
      ))}
    </NodeOutputs>
  </NodeCard>
});

export default NodeComponenet;
NodeComponenet.displayName = "NodeComponenet";
