"use server"
import prisma from "@/lib/prisma";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { workflowSchema, type createWorkflowSchemaType } from "@/schema/workflow";
import { AppNode } from "@/types/appNodes";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/worflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";

export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = workflowSchema.safeParse(form);

  if (!success || !data) {
    throw new Error("invalid form data");
  }

  const { userId } = await auth();

  if (!userId) throw new Error("unauthenticated");

  const initialWorkflow: { nodes: AppNode[], edges: Edge[] } = {
    nodes: [],
    edges: []
  };

  initialWorkflow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      definition: JSON.stringify(initialWorkflow),
      status: WorkflowStatus.DRAFT,
      ...data
    }
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  return { id: result.id };
}
