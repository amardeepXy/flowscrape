import { getWorkflowForUser } from "@/action/getWorkflowForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertOctagonIcon, InboxIcon } from "lucide-react";
import { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import { WorkflowCard } from "./_components/WorkflowCard";

function workflows() {
  return (
    <div className="flex-1 gap-2 flex flex-col h-full px-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Manage your workflows
          </p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-[80vh] scroll-smooth overflow-y-scroll py-2">
        <Suspense fallback={WorkflowsSkeleton()}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}

function WorkflowsSkeleton() {

  return <div className="w-full flex flex-col gap-3">
    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-full h-32" />)}
  </div>
};

async function UserWorkflows() {
  try {
    const workflows = await getWorkflowForUser();

    if (workflows.length === 0) {
      return <div className="w-full flex py-3 items-center flex-col h-full justify-center gap-4">
        <div className="flex items-center p-4 rounded-full bg-accent ">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="w-full flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-muted-foreground text-sm">Click the button below to create your first workflow</p>
        </div>

        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    }

    return <div className="flex flex-col space-y-2">
      {workflows.map(val => <div key={val.id}>

        <WorkflowCard workflow={val} />
      </div>)}
    </div>


  } catch (error) {
    return <Alert variant={"destructive"}>
      <AlertOctagonIcon className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Unable to fetch your workflows.
      </AlertDescription>
    </Alert>
  }
}

export default workflows
