"use client"
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { createWorkflowSchemaType, workflowSchema } from "@/schema/workflow";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/action/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      description: "",
      name: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: (data) => {
      router.push(`/workflow/editor/${data.id}`);
      toast.success("Workflow created", { id: "create-workflow" });
    },
    onError: (err) => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
    }
  });

  const onSubmit = useCallback((values: createWorkflowSchemaType) => {
    toast.loading("Creating workflow...", { id: "create-workflow" });
    mutate(values)
  }, [mutate]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        form.reset();
        setIsOpen(open);
      }}>
      <DialogTrigger asChild>
        <Button className="bg-primary">
          {triggerText ?? "Create Workflow"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <CustomDialogHeader
          Icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start creating your workflow" />

        <div>
          <Form {...form}>
            <form className="flex flex-col gap-7" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name<p className="text-xs text-primary">(required)</p> </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description<p className="text-xs text-muted-foreground">(optional)</p> </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription >
                      Provide a breif description of what your workflow does. <br />
                      This is optional but can help you remember the workflow's purpose
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="bg-primary w-full">
                {!isPending && "proceed"}
                {isPending && <Loader2Icon className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog
