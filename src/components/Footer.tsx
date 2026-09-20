export default function Footer() {
  return (
    <footer className="border-t border-term-border px-6 py-8 text-center font-mono text-xs text-term-dim">
      <p>
        $ echo "built with React, Tailwind, Framer Motion &amp; a lot of{' '}
        <span className="text-term-green">grep</span>"
      </p>
      <p className="mt-1">© {new Date().getFullYear()} Shriram Kulkarni</p>
    </footer>
  )
}
