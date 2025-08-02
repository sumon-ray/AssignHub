import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[calc(100vh-160px)]">
      <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
