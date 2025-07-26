"use client";

import { UpdateWorkflow } from "@/action/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Workflow saved!", { id: "save-workflow" });
    },
    onError: (err) => {
      toast.error(err.message || "something went wrong", { id: "save-workflow" });
    }
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-1.5"
      disabled={isPending}
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("saving workflow...", { id: "save-workflow" });
        mutate({
          definition: workflowDefinition,
          id: workflowId
        })
      }}
    >
      <CheckIcon size={16} className="stroke-primary" />
      Save
    </Button>
  )
}

export default SaveBtn
