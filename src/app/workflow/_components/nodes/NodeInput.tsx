import { cn } from "@/lib/utils"
import { type TaskParam } from "@/types/task"
import { Handle, Position } from "@xyflow/react"
import NodeParamField from "./NodeParamField"
import { colorForHandle } from "./common"

function NodeInputs({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col divide-y gap-2 !w-full">
      {children}
    </div>
  )
}

export const NodeInput = ({ input, nodeId }: { input: TaskParam, nodeId: string }) => {
  console.log(input.hideHandle)
  return (
    <div className="flex justify-start relative bg-secondary w-full px-3 py-3.5">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && <Handle
        type="target"
        position={Position.Left}
        id={input.name}
        className={cn("!bg-muted-foreground !rounded-full !border-2 !border-background !-left-1 absolute !w-4 !h-4", colorForHandle[input.type])}
      />}
    </div>
  )
}

export default NodeInputs
