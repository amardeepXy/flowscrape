"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/worflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type IParam = {
  id: string;
  definition: string;
}

export async function UpdateWorkflow({
  id, definition }: IParam) {

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthenticated");

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId
    }
  });

  if (!workflow) throw new Error("workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT) throw new Error("Workflow is not a draft");

  await prisma.workflow.update({
    where: {
      id,
      userId
    },
    data: {
      definition
    },
  })
  revalidatePath("/workflows")
}
