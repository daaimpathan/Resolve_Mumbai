import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-px w-full my-6" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-px w-full my-6" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="grid grid-cols-5 gap-4 mb-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>

          <Skeleton className="h-px w-full my-6" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

