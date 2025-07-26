import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { taskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/task"
import { CoinsIcon, GripVerticalIcon } from "lucide-react"

function NodeHeader({ taskType }: { taskType: TaskType }) {
  const task = taskRegistry[taskType]
  return (
    <div className="flex gap-2 items-center p-2 px-3">
      <task.icon size={16} />
      <div className="flex items-center w-full gap-5 justify-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-2 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab">
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NodeHeader
