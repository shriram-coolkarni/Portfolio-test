import office from "../assets/projects/office.png";
import FullStack from "../assets/projects/FullStack.png";
import ATM from "../assets/projects/ATM.png";
import NumberGuessing from "../assets/projects/NumberGuessing.jpg";

export const HERO_CONTENT = `I am a dedicated NOC Engineer with hands-on experience in 24×7 infrastructure monitoring, incident management, and network troubleshooting for enterprise environments. I have worked closely with Linux systems, monitoring tools, and ticketing platforms, ensuring high availability, SLA compliance, and quick incident resolution. Alongside NOC operations, I am building strong DevOps skills in areas such as Docker, Kubernetes, CI/CD, and cloud fundamentals, with the goal of transitioning into a DevOps-focused role and contributing to reliable, scalable systems.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With professional experience, I have worked with a variety of technologies, including Java, SpringBoot, React and MySQL. My journey in full-stack development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2022 (May)- Present",
    role: "System Engineer",
    company: "Zensar Technologies, India",
    description: `NOC Engineer at Zensar — Responsible for 24×7 monitoring of production systems, identifying and resolving incidents using monitoring tools to ensure high availability and SLA adherence.
Collaborated with L2/L3 teams, performed root cause analysis, and maintained detailed incident documentation while supporting enterprise clients in a fast-paced operations environment..`,
    technologies: ["Java","Springboot", "React.js", "Vite.js","Tailwind", "MySQL"],
  },
  
];

export const PROJECTS = [
  {
    title: "Mini-Zomato(Placing a order) using Docker and Kubernates",
    image: office,
    description:
      "Designed and deployed a containerized food-ordering application using Docker, KIND, and Kubernetes with separate frontend and backend services. Built custom Docker images, managed image versioning, and deployed workloads using Kubernetes Deployments, Services, and Namespaces. Gained hands-on experience in local Kubernetes clusters, service exposure via NodePort, inter-pod communication, and production-style debugging using kubectl logs and exec.",
    technologies: ["Docker, Kubernetes (KIND), kubectl, NGINX, Node.js, Linux, Networking (NodePort, Services"]
  },
];

export const CONTACT = {
  address: "Baner, Pune-411045 ",
  phoneNo: "+91 7507906230 ",
  email: "shriram.kulkarni.official@gmail.com",
};
