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
import { GenIcon, type IconType } from 'react-icons'

// react-icons ships no ServiceNow / SolarWinds marks, so these are simplified
// hand-drawn versions in the same 24x24 format.
const ServiceNowIcon: IconType = GenIcon({
  tag: 'svg',
  attr: { viewBox: '0 0 24 24' },
  child: [
    {
      tag: 'path',
      attr: {
        fillRule: 'evenodd',
        d: 'M12 1.5a10.5 10.5 0 0 0-6.9 18.4 1.6 1.6 0 0 0 2 .1 8.6 8.6 0 0 1 9.8 0 1.6 1.6 0 0 0 2-.1A10.5 10.5 0 0 0 12 1.5Zm0 16.1a5.2 5.2 0 1 1 0-10.4 5.2 5.2 0 0 1 0 10.4Z',
      },
      child: [],
    },
  ],
})

const SolarWindsIcon: IconType = GenIcon({
  tag: 'svg',
  attr: { viewBox: '0 0 24 24' },
  child: [
    { tag: 'circle', attr: { cx: '16', cy: '9', r: '5' }, child: [] },
    {
      tag: 'path',
      attr: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        d: 'M2 12.5c5 0 8 1.5 12 1.5s6-1 8-2M2 17c5 0 8 1.5 12 1.5s6-1 8-2M5 21.5c3 0 5 .5 8 .5',
      },
      child: [],
    },
  ],
})

type IconDef = { icon: IconType; label: string; color: string; learning?: boolean }

const ICONS: IconDef[] = [
  { icon: SiLinux, label: 'Linux', color: '#fcc624' },
  { icon: FaAws, label: 'AWS', color: '#ff9900' },
  { icon: SiDocker, label: 'Docker', color: '#2496ed' },
  { icon: SiJenkins, label: 'Jenkins', color: '#d24939' },
  { icon: SiGit, label: 'Git', color: '#f05032' },
  { icon: SiGithub, label: 'GitHub', color: '#ededed' },
  { icon: SiGnubash, label: 'Bash', color: '#4eaa25' },
  { icon: SiCloudflare, label: 'Cloudflare', color: '#f38020' },
  { icon: SiNetlify, label: 'Netlify', color: '#00c7b7' },
  { icon: ServiceNowIcon, label: 'ServiceNow', color: '#62d84e' },
  { icon: SolarWindsIcon, label: 'SolarWinds', color: '#f99d1c' },
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
  const half = Math.ceil(ICONS.length / 2)
  return (
    <div className="mask-x space-y-4 overflow-hidden">
      <MarqueeRow items={ICONS.slice(0, half)} />
      <MarqueeRow items={ICONS.slice(half)} reverse />
    </div>
  )
}

function MarqueeRow({ items, reverse }: { items: IconDef[]; reverse?: boolean }) {
  // Content is duplicated so translating by -50% loops seamlessly.
  const loop = [...items, ...items]
  return (
    <div className="group flex w-max">
      <div
        className="flex animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? 'reverse' : 'normal', ['--marquee-duration' as string]: '45s' }}
      >
        {loop.map((item, i) => (
          <IconChip key={`${item.label}-${i}`} {...item} />
        ))}
      </div>
    </div>
  )
}

function IconChip({ icon: Icon, label, color, learning }: IconDef) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface/70 py-3 pl-3 pr-5 backdrop-blur-md transition-colors duration-300 hover:border-line-strong"
      style={{ ['--c' as string]: color }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
        <Icon size={22} color={color} />
      </span>
      <span className="text-sm font-medium text-fg">{label}</span>
      {learning && (
        <span className="rounded-full border border-warn/30 bg-warn/10 px-2 py-0.5 font-mono text-[10px] text-warn">
          learning
        </span>
      )}
    </div>
  )
}
