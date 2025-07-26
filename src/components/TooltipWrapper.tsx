"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

interface IProps {
  children: React.ReactNode,
  content: React.ReactNode,
  side?: "top" | "bottom" | "left" | "right",
  delayDuration?: number,
}

export function TooltipWrapper(props: IProps) {


  return <TooltipProvider delayDuration={props.delayDuration || 0} >
    <Tooltip>
      <TooltipTrigger asChild>
        {props.children}
      </TooltipTrigger>
      <TooltipContent  >
        {props.content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
}
