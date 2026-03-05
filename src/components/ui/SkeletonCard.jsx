export default function SkeletonCard() {
    return (
      <div className="card overflow-hidden animate-pulse">
        <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-700" />
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }