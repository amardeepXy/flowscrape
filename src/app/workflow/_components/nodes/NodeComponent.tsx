import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import NodeCard from "./NodeCard";
import { AppNodeData } from "@/types/appNodes";
import NodeHeader from "./NodeHeader";
import NodeInputs, { NodeInput } from "./NodeInput";
import { taskRegistry } from "@/lib/workflow/task/registry";

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
  </NodeCard>
});

export default NodeComponenet;
NodeComponenet.displayName = "NodeComponenet";
