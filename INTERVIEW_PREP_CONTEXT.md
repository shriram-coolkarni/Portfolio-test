# Interview Prep Context: Shriram Kulkarni

> **Instructions for ChatGPT**
>
> You are a senior DevOps/SRE interviewer and mentor. Below is the full context of my profile, my real work experience, my projects (including the actual code and config from my portfolio repository), my current skills and the skills I am still learning.
>
> Please generate a **detailed interview question and answer bank for revision**. Requirements:
>
> 1. **Organise by topic** using the sections in Part C of this file ("Question Areas").
> 2. For each topic, give questions at **three levels**: Basic → Intermediate → Advanced/Scenario.
> 3. Each answer should be **interview-ready**: a short direct answer first, then a deeper explanation, then (where relevant) a command, config snippet or example.
> 4. Include **project deep-dive questions** that an interviewer would ask about *my specific projects* (Part B). Answer them using the real config shown here, in first person ("In my pipeline, I…").
> 5. Include **"what would you improve?" questions** and use the known gaps listed in Part B.6. Interviewers love these.
> 6. Include **behavioural/HR questions** based on my NOC experience (incident handling, SLA pressure, RCA, escalation) and use the **STAR format** in answers.
> 7. For **"Currently Learning"** skills (Part A.3), mark them clearly as *learning-level*. Give fundamentals and common beginner/intermediate interview questions, and add a suggested answer for "How much hands-on experience do you have with X?" that is **honest** and still shows initiative.
> 8. End with: a **rapid-fire revision sheet** (one-liners), a **top 25 most likely questions** list for my profile, and a **Linux/Docker/Git command cheat-sheet**.
> 9. Keep answers accurate. Do not invent experience I don't have.

---

## Part A: Profile

### A.1 Summary

- **Name:** Shriram Kulkarni
- **Location:** Pune, Maharashtra, India
- **Current title:** System Engineer (NOC), building toward DevOps / SRE
- **Target roles:** DevOps Engineer, SRE, Cloud/Infra Engineer, Network Engineer
- **Total experience:** ~3+ years at Zensar Technologies (since Jun 2022)
- **Summary:** DevOps-focused System Engineer with hands-on production experience in network troubleshooting, infrastructure monitoring, incident response and root cause analysis. I gained this on Zensar's NOC team supporting the Airbus account. I add to this with self-driven projects in CI/CD automation, Docker containerization and AWS cloud deployment.

### A.2 Skills I actually use (project/work backed)

| Category | Skills |
|---|---|
| Cloud & Infra | AWS (EC2), Netlify |
| Containers | Docker (multi-stage builds, volumes, restart policies, port mapping, image cleanup) |
| CI/CD & Automation | Jenkins (declarative pipelines), CI/CD pipeline design, Git, GitHub (webhooks) |
| Scripting / OS | Bash / Shell scripting, Linux / Unix administration |
| Networking | Network troubleshooting, TCP/IP, DNS & domain configuration, Cloudflare Tunnel |
| Web server / TLS | Nginx (reverse proxy/static hosting, HTTP→HTTPS redirect, SPA routing), Let's Encrypt / Certbot |
| Reliability & Ops | Incident management, Root Cause Analysis (RCA), SLA adherence, high-availability monitoring |
| Monitoring tools (work) | Cisco Prime, SolarWinds |
| ITSM tools (work) | ServiceNow, Jira |
| Frontend (portfolio build) | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP, Three.js / React Three Fiber |
| AI-assisted dev | Claude Code, AI coding agents (Figma-to-code) |

### A.3 Currently learning (foundational exposure only, not yet used in production or projects)

- Kubernetes & Helm
- Terraform & Ansible
- Azure; AWS beyond EC2 (S3, IAM, VPC, RDS, CloudWatch)
- GitHub Actions, GitLab CI/CD
- Prometheus, Grafana, ELK Stack
- Python
- PostgreSQL, MongoDB, DynamoDB

---

## Part B: Experience and Projects

### B.1 Work experience

**System Engineer, NOC Team (Airbus Account), Zensar Technologies, Pune (Jun 2023 – Present)**
- Monitor enterprise network infrastructure with Cisco Prime and SolarWinds to keep availability high.
- Troubleshoot IP-based network components and resolve connectivity and configuration issues in production.
- Handle incidents and tickets in ServiceNow/Jira and resolve them within SLA timelines.
- Perform Root Cause Analysis (RCA) on recurring issues and implement long-term fixes.

**System Engineer, Onboarding Role, Zensar Technologies, Pune (Jun 2022 – Jun 2023)**
- Supported data-center networking activities, including resolving or escalating server outages in the European zone, before moving to the Airbus NOC account.

### B.2 Project 1: Portfolio Deployment, End-to-End CI/CD Pipeline (Jun 2025 – Aug 2025, live at shriramkulkarni.in)

**Stack:** Jenkins, Docker, AWS EC2 (Free Tier), GitHub, Linux, Bash, Nginx, Let's Encrypt

**What it does:** A push to GitHub triggers a Jenkins job through a webhook. Jenkins clones the repo, builds a Docker image tagged with the build number, replaces the running container on EC2 and cleans up old images.

**Claimed results:** Deployment time reduced by 60%. Manual deployment effort cut by 80%. Disk-space failures eliminated through automated image cleanup. On the EC2 Free Tier instance, I also configured swap and tuned resources so the build does not run out of memory.

**Architecture flow:**
```
Developer → git push → GitHub → (webhook) → Jenkins on EC2
   → Clone → docker build (multi-stage: node build → nginx runtime)
   → docker rm -f old container → docker run new container (80/443, certs mounted read-only)
   → cleanup old images (keep latest 2)
User → DNS (shriramkulkarni.in) → EC2 → Nginx container → HTTP 301 → HTTPS (TLS 1.2/1.3) → static React SPA
```

#### Jenkinsfile (declarative pipeline)
```groovy
pipeline {
    agent any
    environment {
        IMAGE_NAME = "portfolio-app"
        CONTAINER_NAME = "portfolio-container"
        REPO_URL = "https://github.com/shriram-coolkarni/Portfolio-test.git"
        BRANCH = "main"
    }
    stages {
        stage('Clone') {
            steps { git branch: "${BRANCH}", url: "${REPO_URL}" }
        }
        stage('Build Image') {
            steps { sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ." }
        }
        stage('Deploy') {
            steps {
                sh """
                docker rm -f ${CONTAINER_NAME} || true
                docker run -d -p 80:80 -p 443:443 \
                  -v /etc/letsencrypt:/etc/letsencrypt:ro \
                  --restart unless-stopped \
                  --name ${CONTAINER_NAME} ${IMAGE_NAME}:${BUILD_NUMBER}
                """
            }
        }
        stage('Cleanup Old Images') {
            steps {
                sh """
                docker images ${IMAGE_NAME} --format "{{.Tag}}" | \
                sort -nr | tail -n +3 | \
                xargs -r -I {} docker rmi ${IMAGE_NAME}:{}
                """
            }
        }
    }
}
```
Key concepts to be ready on: `BUILD_NUMBER` as an immutable image tag, `|| true` for idempotency, `--restart unless-stopped`, mounting certs read-only (`:ro`), `sort -nr | tail -n +3` keeps the newest 2 tags, `xargs -r` skips the command on empty input.

#### Dockerfile (multi-stage build)
```dockerfile
# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build          # tsc -b && vite build → /app/dist

# ---------- RUNTIME STAGE ----------
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```
Key concepts: multi-stage builds give a small final image with no Node or node_modules. Copying `package*.json` before the source makes better use of the layer cache. Alpine base images are small. `daemon off;` keeps nginx in the foreground as PID 1 so the container stays alive.

#### nginx.conf
```nginx
server {
    listen 80;
    server_name shriramkulkarni.in www.shriramkulkarni.in;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }   # Let's Encrypt HTTP-01
    location / { return 301 https://$host$request_uri; }                # force HTTPS
}
server {
    listen 443 ssl;
    http2 on;
    server_name shriramkulkarni.in www.shriramkulkarni.in;
    ssl_certificate     /etc/letsencrypt/live/shriramkulkarni.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shriramkulkarni.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;
    root /usr/share/nginx/html;
    index index.html;
    autoindex off;
    location / { try_files $uri $uri/ /index.html =404; }               # SPA fallback
    location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }  # hashed Vite assets
}
```
Key concepts: 301 vs 302, the HTTP-01 ACME challenge, fullchain vs privkey, TLS versions, HTTP/2, SSL session cache, `try_files` for client-side routing, long-lived caching that is safe because Vite adds a content hash to asset filenames, and `autoindex off` for security.

### B.3 The portfolio application itself (frontend in the same repo)

- **Build tooling:** Vite 8, TypeScript 6 (`tsc -b` project references: `tsconfig.app.json` and `tsconfig.node.json`), Tailwind CSS v4 through the `@tailwindcss/vite` plugin with `@theme` design tokens, and the Oxlint linter (the `react/rules-of-hooks` rule is set to error).
- **UI:** React 19 in `StrictMode`. It uses a terminal/CLI theme: a boot screen that "types out" systemd-style log lines, a skills section styled like `neofetch`, and a contact section styled like `./contact.sh`.
- **Data-driven content:** all text lives in one file, `src/data/content.ts`, with TypeScript types such as `Project` and `ExperienceEntry`, and components render from it. Skills and "currently learning" are kept separate on purpose so the site stays honest.
- **Animations:** Framer Motion (`whileInView` reveal and a scroll progress bar using `useScroll` + `useSpring`). GSAP ScrollTrigger is synced with Lenis smooth scrolling through a `requestAnimationFrame` loop, and the effect cleans up on unmount.
- **3D background:** React Three Fiber and Three.js draw 70 random nodes connected when they are within a distance threshold, which looks like a network topology. `useMemo` caches the geometry, `useFrame` handles rotation and mouse parallax, and `dpr={[1, 1.5]}` limits the pixel ratio for performance.
- **Custom hooks:** `useTypewriter` is async/await typing with timer cleanup and a cancellation flag. `useScramble` is a text-scramble reveal using `setInterval` and a `useRef` guard so it runs only once.
- **Git history:** ~32 commits, with small iterative commits on `main`.

### B.4 Project 2: Full-Stack SaaS Platform, team project (Jun 2025 – Present, in progress)

**Stack:** Git, AWS, Docker, Cloudflare Tunnel, Figma-to-code tooling
- A two-person team building a SaaS web app. The name and internal architecture are confidential.
- We used AI coding agents to turn Figma designs into a working frontend connected to an existing backend.
- The app is self-hosted through **Cloudflare Tunnel** on a custom domain, so no inbound ports are opened and the origin IP stays hidden. I am also designing the production AWS/Docker deployment plan.

### B.5 Project 3: Fitness Professional Portfolio Website (Jun 2025 – Jul 2025, deployed)

**Stack:** Figma, Netlify, Netlify Forms, AI coding agent (Claude)
- Converted a static Figma design into a frontend using an AI coding agent. No backend was needed.
- Deployed on Netlify, with Netlify Forms sending leads straight to the client's inbox.

### B.6 Known gaps and improvement ideas (for "what would you improve?" questions)

- The Jenkinsfile lives in `jenkins.txt` rather than a `Jenkinsfile` at the repo root, so it is not yet "pipeline as code" loaded by Jenkins from SCM.
- There are no test, lint or security-scan stages yet. Candidates: `npm run lint`, Trivy image scan, SonarQube.
- The deploy uses stop-then-start (`docker rm -f` then `docker run`), which causes a few seconds of **downtime**. Improvements: blue-green deployment, or a health check before switching.
- There is no rollback stage, although the previous image tag is kept, so rollback is possible manually.
- The Dockerfile uses `npm install` instead of `npm ci` (reproducible builds), there is no `.dockerignore`, and there is no `HEALTHCHECK`.
- Images are built on the same EC2 instance that serves traffic. They are not pushed to a registry such as Docker Hub or ECR.
- Certificate renewal depends on Certbot on the host, and the container needs a restart or reload to pick up renewed certs.
- There is no monitoring or alerting on the site yet. Candidates: CloudWatch, uptime checks, Prometheus/Grafana (on my learning list).
- Infrastructure is created by hand, not with IaC (Terraform/Ansible are on my learning list).
- The contact section links a résumé PDF, but only a `.docx` is in `public/`.
- Future path: GitHub Actions, Kubernetes with Helm, and Terraform for EC2/VPC/security groups.

### B.7 Earlier project: Safety Device for Women (College, Dec 2020 – Apr 2021)

- A GSM module, microcontroller and GPS in one device. A single button press sends live coordinates and an emergency alert to predefined contacts.

---

## Part C: Question Areas to Cover

1. **Linux / Unix administration:** file permissions, processes, systemd, logs (`journalctl`, `/var/log`), disk (`df`, `du`), memory and swap, networking commands (`ip`, `ss`, `netstat`, `dig`, `curl`, `traceroute`), cron, users and groups, package management.
2. **Bash / shell scripting:** variables, conditionals, loops, exit codes, pipes, `xargs`, `awk`/`sed`/`grep`, `set -euo pipefail`, and scripts for log rotation, disk alerts and health checks.
3. **Networking:** OSI and TCP/IP models, TCP vs UDP, the three-way handshake, subnetting/CIDR, the DNS resolution flow, record types (A, AAAA, CNAME, MX, TXT, NS), DHCP, NAT, routing basics, VLANs, and troubleshooting "site not reachable" end to end.
4. **Network monitoring and NOC operations:** SNMP, SolarWinds and Cisco Prime basics, alert thresholds, high availability, ICMP/ping and interface flaps.
5. **Incident management / ITIL / SRE:** incident vs problem vs change, severity/priority levels, SLA vs SLO vs SLI, error budgets, MTTR/MTTD, escalation matrix, RCA methods (5 Whys, fishbone), blameless postmortems, on-call.
6. **Git and GitHub:** branching strategies, merge vs rebase, conflicts, `reset` vs `revert`, `stash`, tags, webhooks, PR workflow.
7. **CI/CD and Jenkins:** CI vs continuous delivery vs continuous deployment, declarative vs scripted pipelines, agents/nodes, environment variables, credentials management, webhooks vs polling, pipeline stages, artifacts, rollback strategies, blue-green and canary deployments.
8. **Docker:** image vs container, layers and caching, multi-stage builds, CMD vs ENTRYPOINT, COPY vs ADD, volumes vs bind mounts, networking modes, restart policies, reducing image size, `docker system prune`, debugging a crashing container, Docker Compose.
9. **Nginx and web / TLS:** reverse proxy vs web server, `server` and `location` blocks, `try_files`, redirects, caching headers, how the TLS handshake works, Let's Encrypt/ACME, HTTP/2.
10. **AWS (EC2-focused, plus the learning-level services):** EC2 instance types, AMI, security groups vs NACLs, key pairs, Elastic IP, EBS, Free Tier limits, plus S3, IAM, VPC, RDS and CloudWatch fundamentals.
11. **Cloudflare Tunnel and DNS hosting:** how a tunnel works (outbound-only connection), compared with port-forwarding or a public IP.
12. **Frontend and build basics (portfolio):** what Vite does, why use TypeScript, a SPA vs server rendering, why SPA routing needs `try_files`, and the React hooks used (`useEffect` cleanup, `useMemo`, `useRef`).
13. **Currently learning (learning-level depth):** Kubernetes (pods, deployments, services, ingress, ConfigMaps/Secrets), Helm charts, Terraform (state, plan/apply, modules), Ansible (playbooks, inventory, idempotency), GitHub Actions and GitLab CI, Prometheus/Grafana/ELK, Python for automation, SQL vs NoSQL (PostgreSQL, MongoDB, DynamoDB), Azure basics.
14. **AI-assisted development:** how I use Claude Code and AI agents responsibly (reviewing generated code, security, understanding what gets deployed).
15. **Behavioural / HR:** why move from NOC to DevOps, handling a P1 incident, working under SLA pressure, a time I did an RCA, handling an escalation, learning new tech on my own, teamwork on the SaaS project, strengths and weaknesses, where I see myself in 3 years.

---

## Part D: Output format wanted

```
## <Topic>
### Basic
**Q1. ...**
**A:** <short answer>
<explanation / example / command>

### Intermediate
...
### Advanced / Scenario
...
### Project-linked questions (if applicable)
...
```
Then add: the rapid-fire revision sheet, the top 25 most likely questions, and the command cheat-sheet.
