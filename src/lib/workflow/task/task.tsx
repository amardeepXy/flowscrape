import { TaskParamType, TaskType } from "@/types/task"
import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react"

const launchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  iconStyle: "stroke-pink-400",
  icon: (props: LucideProps) => <GlobeIcon className={`${launchBrowserTask.iconStyle}`} {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true
    }
  ],
  outputs: [
    {
      type: TaskParamType.BROWSER_INSTANCE,
      name: "Web page"
    }
  ]
}

const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: false
    }
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE
    }
  ]
}

export { launchBrowserTask, PageToHtmlTask };
