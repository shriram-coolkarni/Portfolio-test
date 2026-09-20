import { FiDownload, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TerminalWindow from './TerminalWindow'

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto flex min-h-screen max-w-6xl scroll-mt-20 flex-col justify-center px-6 py-24"
    >
      <SectionHeading index="05" title="contact" />
      <Reveal>
        <TerminalWindow title="./contact.sh">
          <div className="space-y-4 font-mono text-sm sm:text-base">
            <p className="text-term-dim">$ ./contact.sh --reach-out</p>
            <p className="text-term-text">Open to DevOps / SRE / Network Engineering roles. Reach out any time:</p>

            <div className="mt-4 flex flex-col gap-3">
              <Row icon={<FiMail />} href={`mailto:${profile.email}`} label={profile.email} />
              <Row icon={<FiPhone />} href={`tel:${profile.phone}`} label={profile.phone} />
              <Row icon={<FiLinkedin />} href={profile.linkedin} label="linkedin.com/in/shriram-kulkarni" external />
              <Row icon={<FiDownload />} href="/Shriram_Kulkarni_Resume.pdf" label="Download résumé (PDF)" download />
            </div>

            <p className="pt-2 text-term-dim">{profile.location}</p>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}

function Row({
  icon,
  href,
  label,
  external,
  download,
}: {
  icon: React.ReactNode
  href: string
  label: string
  external?: boolean
  download?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={download}
      className="flex items-center gap-3 text-term-cyan transition hover:text-term-green hover:text-glow"
    >
      <span className="text-term-green">{icon}</span>
      {label}
    </a>
  )
}
