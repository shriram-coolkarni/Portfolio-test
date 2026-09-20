const LINKS = [
  { id: 'about', label: 'about/' },
  { id: 'skills', label: 'skills/' },
  { id: 'projects', label: 'projects/' },
  { id: 'experience', label: 'experience/' },
  { id: 'contact', label: 'contact/' },
]

export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-term-border bg-term-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 text-sm">
        <span className="text-term-green">shriram@portfolio</span>
        <span className="text-term-dim">:~$ ls</span>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-term-cyan transition hover:text-term-green hover:text-glow"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
