"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { taskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/task"
import React, { useCallback } from "react"

export default function TaskMenu() {


  return (
    <aside className="w-[360px] px-3 py-2 border-r-2 border-separate h-full overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent>
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {

  const task = taskRegistry[taskType];

  const dragStart = useCallback((ev: React.DragEvent) => {
    ev.dataTransfer.setData("application/reactflow", taskType)
    ev.dataTransfer.dropEffect = "move";
  }, [])

  return <Button
    variant={"secondary"}
    className="w-full flex justify-start items-center"
    draggable
    onDragStart={dragStart}
  >
    <task.icon size={20} />
    <p>{task.label}</p>
  </Button>
}
