import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pt-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
        <p className="font-mono">
          built with React, Tailwind, Three.js &amp; a lot of <span className="text-accent">grep</span>
        </p>
      </div>
      <p
        aria-hidden
        className="pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[18vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
        style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)' }}
      >
        {profile.handle}
      </p>
    </footer>
  )
}
