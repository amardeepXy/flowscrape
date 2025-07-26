"use client";

import { TooltipWrapper } from "@/components/TooltipWrapper";
import SaveBtn from "./SaveBtn";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type props = {
  workflowName: string;
  workflowDesc?: string;
  workflowId: string;
}

function Topbar({ workflowName, workflowDesc, workflowId }: props) {
  const router = useRouter();
  return (
    <div
      className="w-full flex items-center justify-between px-4 py-1 border-b">
      <div className="flex gap-x-6 w-3/5">
        <TooltipWrapper content={<p>back</p>} delayDuration={900}>
          <TooltipTrigger className="cursor-pointer" onClick={() => router.back()}>
            <ArrowLeftIcon size={16} />
          </TooltipTrigger>

        </TooltipWrapper>

        <div className="flex flex-col w-full">
          <h1 className="font-bold text-md">{workflowName}</h1>
          {workflowDesc && <p className="text-muted-foreground truncate">{workflowDesc}</p>}
        </div>
      </div>

      <SaveBtn workflowId={workflowId} />
    </div>
  )
}

export default Topbar
