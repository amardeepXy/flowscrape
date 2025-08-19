import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { PropsWithChildren } from "react";
import { colorForHandle } from "./common";

function NodeOutputs({ children }: PropsWithChildren) {

  return <div className="flex flex-col divide-y gap-1">
    {children}
  </div>
}

function NodeOutput({ output }: { output: TaskParam }) {

  return <div className="flex justify-end bg-secondary py-2 px-r relative">
    <p className="text-sm text-muted-foreground">{output.name}</p>
    <Handle position={Position.Right}
      className={cn(
        "!-right-2 !w-4 !h-4 -!border-2 !border-background !bg-muted-foreground"
        , colorForHandle[output.type])} id={output.name} type="source" />
  </div>
}

export { NodeOutput, NodeOutputs }
