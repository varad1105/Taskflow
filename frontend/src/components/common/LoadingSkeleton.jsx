const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <div className="card p-6 animate-pulse">
          <div className="h-8 w-3/5 rounded-full bg-gray-200 dark:bg-gray-700 mb-6" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-24 rounded-3xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-24 rounded-3xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="card p-6 animate-pulse">
          <div className="h-8 w-2/3 rounded-full bg-gray-200 dark:bg-gray-700 mb-6" />
          <div className="grid gap-4">
            <div className="h-16 rounded-3xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-16 rounded-3xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card p-6 animate-pulse">
          <div className="h-20 rounded-3xl bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="card p-6 animate-pulse">
          <div className="h-20 rounded-3xl bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="card p-6 animate-pulse">
          <div className="h-20 rounded-3xl bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
