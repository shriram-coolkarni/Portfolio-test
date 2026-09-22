export const profile = {
  name: 'Shriram Kulkarni',
  handle: 'shriram',
  host: 'portfolio',
  title: 'System Engineer (NOC) — building toward DevOps / SRE',
  location: 'Pune, Maharashtra, India',
  email: 'shriram.kulkarni.official@gmail.com',
  phone: '+91 7507906230',
  linkedin: 'https://www.linkedin.com/in/shriram-kulkarni-702019191',
  summary:
    "DevOps-focused System Engineer with hands-on production experience in network troubleshooting, infrastructure monitoring, incident response, and root cause analysis, gained on Zensar's NOC team supporting the Airbus account. Complements this with self-driven projects in CI/CD automation, Docker containerization, and AWS cloud deployment.",
}

export const skills = {
  'cloud-&-infra': ['AWS (EC2)', 'Netlify'],
  containers: ['Docker'],
  'ci/cd-&-automation': [
    'Jenkins',
    'CI/CD Pipeline Design',
    'Git',
    'GitHub',
  ],
  'scripting': ['Bash / Shell Scripting', 'Linux / Unix Administration'],
  networking: [
    'Network Troubleshooting',
    'TCP/IP',
    'DNS & Domain Config',
    'Cloudflare Tunnel',
  ],
  'reliability-&-ops': [
    'Incident Management',
    'Root Cause Analysis (RCA)',
    'SLA Adherence',
    'High-Availability Monitoring',
  ],
  'ai-assisted-dev': ['Claude Code'],
}

// Explicitly separate from `skills` — foundational exposure only, not yet
// backed by production/project experience. Never merge into the list above.
export const currentlyLearning = [
  'Kubernetes & Helm',
  'Terraform & Ansible',
  'Azure, AWS (S3/IAM/VPC/RDS/CloudWatch)',
  'GitHub Actions, GitLab CI/CD',
  'Prometheus, Grafana, ELK Stack',
  'Python',
  'PostgreSQL, MongoDB, DynamoDB',
]

export type Project = {
  id: string
  title: string
  period: string
  status: 'deployed' | 'in-progress'
  stack: string[]
  description: string
  achievements?: string[]
  link?: string
}

export const projects: Project[] = [
  {
    id: 'portfolio-cicd',
    title: 'Portfolio Deployment — End-to-End CI/CD Pipeline',
    period: 'Jun 2025 – Aug 2025',
    status: 'deployed',
    stack: ['Jenkins', 'Docker', 'AWS EC2', 'GitHub', 'Linux', 'Bash'],
    description:
      'Designed a CI/CD pipeline with Jenkins + GitHub webhooks for automated build and deploy. Containerized the app with Docker, deployed to AWS EC2 (Free Tier) with optimized swap/resource config, and automated image cleanup to prevent disk pressure.',
    achievements: [
      'Reduced deployment time by 60%',
      'Cut manual deployment effort by 80%',
      'Eliminated disk-space failures via automated image cleanup',
    ],
    link: 'https://shriramkulkarni.in',
  },
  {
    id: 'saas-platform',
    title: 'Full-Stack SaaS Platform (Team Project)',
    period: 'Jun 2025 – Present',
    status: 'in-progress',
    stack: ['Git', 'AWS', 'Docker', 'Cloudflare Tunnel', 'Figma-to-code tooling'],
    description:
      'Two-person team building a SaaS web app (name & internal architecture kept confidential). Used AI coding agents to turn Figma designs into a working frontend wired to an existing backend. Self-hosted via Cloudflare Tunnel on a custom domain while designing the production AWS/Docker deployment plan.',
  },
  {
    id: 'fitness-site',
    title: 'Fitness Professional Portfolio Website',
    period: 'Jun 2025 – Jul 2025',
    status: 'deployed',
    stack: ['Figma', 'Netlify', 'Netlify Forms', 'AI Coding Agent (Claude)'],
    description:
      'Converted a static Figma design into a working frontend with an AI coding agent — no backend required. Deployed on Netlify with Netlify Forms wired directly to the client\'s inbox for lead capture.',
  },
  {
    id: 'safety-device',
    title: 'Safety Device for Women (College Project)',
    period: 'Dec 2020 – Apr 2021',
    status: 'deployed',
    stack: ['GSM Module', 'Microcontroller', 'GPS'],
    description:
      'A GSM + microcontroller + GPS device letting someone in danger press one button to send live coordinates and an emergency alert to predefined contacts.',
  },
]

export type ExperienceEntry = {
  role: string
  org: string
  orgUrl?: string
  period: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'System Engineer — NOC Team (Airbus Account)',
    org: 'Zensar Technologies, Pune',
    orgUrl: 'https://www.zensar.com',
    period: 'Jun 2023 – Present',
    bullets: [
      'Monitor enterprise network infrastructure via Cisco Prime & SolarWinds to maintain high availability.',
      'Troubleshoot IP-based network components, diagnosing and resolving connectivity/config issues in production.',
      'Handle incidents and tickets through ServiceNow/Jira, resolving within SLA timelines.',
      'Perform Root Cause Analysis (RCA) on recurring issues and implement long-term fixes.',
    ],
  },
  {
    role: 'System Engineer — Onboarding Role',
    org: 'Zensar Technologies, Pune',
    orgUrl: 'https://www.zensar.com',
    period: 'Jun 2022 – Jun 2023',
    bullets: [
      'Started at Zensar supporting data-center networking activities, including resolving/escalating server outages in the European zone, before moving into the Airbus NOC account.',
    ],
  },
]
