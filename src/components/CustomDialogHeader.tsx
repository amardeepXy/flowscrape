"use client"
import { type LucideIcon } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils";

interface IProps {
  title?: string;
  subTitle?: string;
  Icon?: LucideIcon;

  titleClassName?: string;
  subTitleClassName?: string;
  iconClassName?: string;
}

function CustomDialogHeader({ title, subTitle, Icon, iconClassName, titleClassName, subTitleClassName }: IProps) {
  return (
    <DialogHeader>
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && <Icon size={30} className={cn("stroke-primary", iconClassName)} />}
          <div>
            {title && <p className="text-xl text-primary">{title}</p>}
            {subTitle && <p className="text-sm text-muted-foreground">{subTitle}</p>}
          </div>
        </div>
      </DialogTitle>
    </DialogHeader>
  )
}

export default CustomDialogHeader
