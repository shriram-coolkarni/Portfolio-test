import NetworkScene from './NetworkScene'

// Layered backdrop: drifting aurora blobs, the WebGL network graph, a dotted
// grid, and film grain. Everything is fixed and non-interactive.
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute -left-[15%] -top-[25%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle,#16a34a55,transparent_60%)] blur-3xl" />
      <div
        className="absolute -right-[20%] top-[10%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle,#0d948844,transparent_60%)] blur-3xl"
        style={{ animationDelay: '-6s', animationDuration: '22s' }}
      />
      <div
        className="absolute -bottom-[30%] left-[20%] h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle,#65a30d33,transparent_60%)] blur-3xl"
        style={{ animationDelay: '-12s', animationDuration: '26s' }}
      />
      <NetworkScene />
      <div className="bg-grid absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      <div className="grain absolute inset-0" />
    </div>
  )
}
