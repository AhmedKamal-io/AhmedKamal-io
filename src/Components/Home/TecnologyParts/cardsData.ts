import {
  FaCode,
  FaComputer,
  FaServer,
  FaDatabase,
  FaBookAtlas,
  FaClock,
} from "react-icons/fa6";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiRedis,
  SiFramer,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiThreedotjs,
} from "react-icons/si";

export const cardsData = [
  {
    title: "Programming Languages",
    icon: FaCode,
    items: [
      { name: "HTML", icon: SiHtml5, color: "#F06529" },
      { name: "CSS", icon: SiCss3, color: "#264de4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F0DB4F" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Front-End Technologies",
    icon: FaComputer,
    items: [
      { name: "React", icon: SiReact, color: "#0081A3" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
    ],
  },
  {
    title: "Back-End Technologies",
    icon: FaServer,
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#3c873a" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
    ],
  },
  {
    title: "Database & Caching",
    icon: FaDatabase,
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
      { name: "Mongoose ODM", icon: SiMongoose, color: "#ffffff" },
      { name: "Redis Caching", icon: SiRedis, color: "#7A0C00" },
    ],
  },
  {
    title: "JavaScript Libraries",
    icon: FaBookAtlas,
    items: [
      { name: "GSAP Animations", image: "/svg/GSAP.svg", color: "#87c602" },
      { name: "Framer Motion", icon: SiFramer, color: "#e809a8" },
    ],
  },
  {
    title: "Coming Soon ...",
    icon: FaClock,
    items: [
      { name: "PostgreSQL Database", icon: SiPostgresql, color: "#2d5b82" },
      { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
      { name: "Nest.js", icon: SiNestjs, color: "#da204b" },
      { name: "Prisma ORM", icon: SiPrisma, color: "#01344b" },
    ],
  },
];
