"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

const NodeCard = (props: { children: React.ReactNode, nodeId: string, isSelected: boolean }) => {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div className={cn("bg-background border  rounded-md cursor-pointer border-separate flex flex-col gap-1 text-xs", props.isSelected && "border-primary")}
      onDoubleClick={() => {
        const node = getNode(props.nodeId);
        if (!node) return;
        const measured = node.measured;
        const position = node.position;
        if (!measured?.width || !measured.height || !position.x || !position.y) return;

        const centerPosition = {
          x: position.x + measured.width / 2,
          y: position.y + measured.height / 2
        };

        setCenter(centerPosition.x, centerPosition.y, { duration: 500, zoom: 1 });
      }}
    >
      {props.children}
    </div>
  )
}

export default NodeCard;
