import { deleteWorkflow } from "@/action/deleteWorkflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type IProps = {
  isOpen: boolean;
  workflowName: string;
  workflowId: string;
  setIsOpen: (prev: boolean) => void
}

export function DeleteWorkflowDialog({ isOpen, setIsOpen, workflowName, workflowId }: IProps) {
  const [confirmText, setConfirmText] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted!", { id: workflowId });
      setConfirmText("");
    },
    onError: () => {
      toast.error("Failed to deleted workflow", { id: workflowId })
      setConfirmText("");
    }
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="leading-8">
            If you delete this workflow, you will not be able to recover it. <br />
            If you are sure, enter <b>{workflowName}</b> to confirm:
            <Input value={confirmText} onChange={value => setConfirmText(value.target.value)} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading(`Deleting worfklow "${workflowName}"...`, { id: workflowId });
              mutate(workflowId);
            }}
            disabled={confirmText !== workflowName || isPending}
            className="bg-destructive text-white dark:text-white hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
