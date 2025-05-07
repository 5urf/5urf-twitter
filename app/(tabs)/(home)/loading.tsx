export default function LoadingHome() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-10 pt-10">
      <h1 className="mb-10 text-2xl text-blue-600">HOME</h1>
      <div className="retro-container mb-6">
        <div className="min-h-20 w-full border-2 border-gray-300 bg-gray-100 p-3" />
        <div className="mt-3 flex justify-end">
          <div className="h-10 w-20 animate-pulse bg-gray-200" />
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="retro-container p-4">
            <div className="mb-2 h-5 w-32 animate-pulse bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse bg-gray-200" />
              <div className="h-4 w-full animate-pulse bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse bg-gray-200" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse bg-gray-200" />
              <div className="h-4 w-10 animate-pulse bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
