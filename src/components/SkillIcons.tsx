import { motion } from 'framer-motion'
import { FaAws } from 'react-icons/fa6'
import {
  SiAnsible,
  SiClaudecode,
  SiCloudflare,
  SiDocker,
  SiGit,
  SiGithub,
  SiGnubash,
  SiGrafana,
  SiJenkins,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiTerraform,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

type IconDef = { icon: IconType; label: string; color: string; learning?: boolean }

const ICONS: IconDef[] = [
  { icon: SiLinux, label: 'Linux', color: '#fcc624' },
  { icon: FaAws, label: 'AWS', color: '#ff9900' },
  { icon: SiDocker, label: 'Docker', color: '#2496ed' },
  { icon: SiJenkins, label: 'Jenkins', color: '#d24939' },
  { icon: SiGit, label: 'Git', color: '#f05032' },
  { icon: SiGithub, label: 'GitHub', color: '#c9d1cf' },
  { icon: SiGnubash, label: 'Bash', color: '#4eaa25' },
  { icon: SiCloudflare, label: 'Cloudflare', color: '#f38020' },
  { icon: SiNetlify, label: 'Netlify', color: '#00c7b7' },
  { icon: SiClaudecode, label: 'Claude Code', color: '#d97757' },
  { icon: SiKubernetes, label: 'Kubernetes', color: '#326ce5', learning: true },
  { icon: SiTerraform, label: 'Terraform', color: '#844fba', learning: true },
  { icon: SiAnsible, label: 'Ansible', color: '#ee0000', learning: true },
  { icon: SiPrometheus, label: 'Prometheus', color: '#e6522c', learning: true },
  { icon: SiGrafana, label: 'Grafana', color: '#f46800', learning: true },
  { icon: SiPython, label: 'Python', color: '#3776ab', learning: true },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169e1', learning: true },
  { icon: SiMongodb, label: 'MongoDB', color: '#47a248', learning: true },
  { icon: SiMysql, label: 'MySQL', color: '#4479a1', learning: true },
]

export default function SkillIcons() {
  return (
    <div className="flex flex-wrap justify-center gap-5 sm:gap-7">
      {ICONS.map((item, i) => (
        <IconTile key={item.label} {...item} index={i} />
      ))}
    </div>
  )
}

function IconTile({ icon: Icon, label, color, learning, index }: IconDef & { index: number }) {
  return (
    <motion.div
      className="group relative flex flex-col items-center"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 3 + (index % 4) * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: (index % 6) * 0.25,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.25, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-term-border bg-term-bg-alt sm:h-16 sm:w-16"
        style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
          style={{ boxShadow: `0 0 24px 2px ${color}55` }}
          transition={{ duration: 0.2 }}
        />
        <Icon size={26} color={color} className="relative sm:size-8" />
        {learning && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-term-amber ring-2 ring-term-bg" />
        )}
      </motion.div>

      <span className="mt-1.5 block whitespace-nowrap font-mono text-[10px] text-term-dim sm:pointer-events-none sm:absolute sm:-bottom-6 sm:mt-0 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
        {label}
        {learning && <span className="text-term-amber"> · learning</span>}
      </span>
    </motion.div>
  )
}
