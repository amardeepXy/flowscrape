import { launchBrowserTask, PageToHtmlTask } from "./task";

const taskRegistry = {
  LAUNCH_BROWSER: launchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask
};

export { taskRegistry };
