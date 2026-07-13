const COLUMNS = 8

/** Dev-only visual overlay. Layout code does not need to match this. */
export default function GridGuide() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999 flex gap-x-3 px-6"
      aria-hidden
    >
      {Array.from({ length: COLUMNS }, (_, index) => (
        <div key={index} className="h-full flex-1 bg-black/10" />
      ))}
    </div>
  )
}
