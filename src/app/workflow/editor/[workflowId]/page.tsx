import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { Editor } from "../../_components/Editor";

async function page({
  params
}: { params: Promise<{ workflowId: string }> }) {

  const workflowId = (await params).workflowId
  const auths = await auth();

  if (!auths.userId) {
    const currentPath = "/workflow/" + workflowId;
    return auths.redirectToSignIn({ returnBackUrl: currentPath });
  }

  const result = await prisma.workflow.findUnique({
    where: {
      userId: auths.userId,
      id: workflowId
    }
  });

  if (!result) {
    return (
      <div>Workflow not found</div>
    )
  }

  return (
    <Editor workflow={result} />
  )
}

export default page
