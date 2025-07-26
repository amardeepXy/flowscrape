import type { Node } from "@xyflow/react";
import type { TaskParam, TaskType } from "./task";

interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>
  [key: string]: any;
}

interface AppNode extends Node {
  data: AppNodeData
}

interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}

export type { AppNode, AppNodeData, ParamProps };
