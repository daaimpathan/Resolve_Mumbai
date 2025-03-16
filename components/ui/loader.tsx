import * as React from "react"
import { cn } from "@/lib/utils"

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className,
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
})
Loader.displayName = "Loader"

export { Loader }

