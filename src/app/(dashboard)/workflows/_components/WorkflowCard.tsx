"use client"
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Workflow } from "@/generated/prisma"
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/worflow";
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteWorkflowDialog } from "./DeleteWorkflowDialog";

function WorkflowCard({ workflow }: { workflow: Workflow }) {

  const statusColor = {
    [WorkflowStatus.PUBLISHED]: "bg-primary",
    [WorkflowStatus.DRAFT]: "bg-yellow-500 text-yellow-600"
  };

  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/10">
      <CardContent className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("size-9 rounded-full flex items-center justify-center", statusColor[workflow.status as WorkflowStatus])}>
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (<PlayIcon className="size-5 text-white" />)}
          </div>
          <Link href={`/workflow/editor/${workflow.id}`} className="flex flex-col items-start overflow-ellipsis justify-self-start">
            <h3 className="text-muted-foreground text-base font-bold">{workflow.name}</h3>
            <p className="text-muted-foreground/90 hidden md:block md:max-w-10 truncate">{workflow.description?.trim().length ? workflow.description : <span className="text-muted-foreground/60">No description</span>}</p>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href={"/workflow/editor/" + workflow.id}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm"
              })
            )}
          >

            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions workflowname={workflow.name} workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  )
}

function WorkflowActions({ workflowname, workflowId }: { workflowname: string, workflowId: string }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteWorkflowDialog workflowName={workflowname} setIsOpen={setShowDeleteDialog} workflowId={workflowId} isOpen={showDeleteDialog} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper side="top" content="More actions">
              <div className="w-full">

                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setShowDeleteDialog(prev => !prev);
            }}
            className="flex text-red-500 items-center gap-2">
            <TrashIcon className="stroke-red-500" size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
    </>
  )
}

export { WorkflowCard }
