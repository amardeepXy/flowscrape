import { Input } from "@/components/ui/input"
import { ParamProps } from "@/types/appNodes"
import { useId, useState } from "react"

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm">
        {param.name}
        {param.required && <span className="text-red-500">*</span>}
      </label>
      <Input
        id={id}
        value={internalValue}
        onChange={ev => setInternalValue(ev.target.value)}
        onBlur={ev => updateNodeParamValue(ev.target.value)} />
      {param.helperText && <p className="text-muted-foreground text-sm">{param.helperText}</p>}
    </div>
  )
}

export default StringParam
