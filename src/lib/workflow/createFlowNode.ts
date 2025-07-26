import { AppNode } from "@/types/appNodes";
import { TaskType } from "@/types/task";

export function createFlowNode(
  nodeType: TaskType,
  position = { x: 10, y: 10 }
): AppNode {

  return {
    id: crypto.randomUUID(),
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position,
    type: "Node"
  }
}
