export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0A0A0A]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
        <p className="text-sm text-white/60">Loading Vantage...</p>
      </div>
    </div>
  )
}
