export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="space-y-8 text-center">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Loading Portfolio
          </h1>
          <p className="text-muted-foreground">Please wait while we fetch the data...</p>
        </div>

        {/* Loading skeleton for content */}
        <div className="w-full max-w-md mx-auto space-y-4">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-5/6 mx-auto"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-4/6 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
