import type { Project, ExperienceItem } from "../types/portfolio";

export const PROJECTS: readonly Project[] = [
  {
    id: "notchat",
    name: "notchat",
    tag: "security / distributed systems",
    desc: "An end-to-end encrypted chat application built on Cloudflare's edge infrastructure. Uses ephemeral X25519 key exchange, AES-256-GCM encryption, WebSockets, and Durable Objects for real-time messaging, with D1-backed persistence and 24-hour message expiry.",
    metrics: [
      "• encryption: X25519 + AES-256-GCM via Web Crypto",
      "• transport: real-time messaging over WebSockets",
      "• retention: ephemeral messages with 24-hour expiry",
    ],
    stack: "react native · expo · cloudflare workers",
    link: "https://github.com/kichu12348/not_chat",
  },
  {
    id: "bruno",
    name: "bruno",
    tag: "systems / http routing",
    desc: "An ahead-of-time HTTP router written in TypeScript. Compiles route definitions into optimized if/else chains to reduce runtime routing overhead, with a focus on predictable route matching and request throughput.",
    metrics: [
      "• reported throughput: 300k+ req/s",
      "• routing: ahead-of-time route compilation",
      "• optimization: generated conditional chains",
    ],
    stack: "typescript · radix tree · code generation",
    link: "https://github.com/kichu12348/bruno",
  },
  {
    id: "nanodb",
    name: "nanodb",
    tag: "database / storage engines",
    desc: "An embedded document-oriented database built from scratch in Go, using fixed-size pages, slotted-page storage, MessagePack serialization, and an in-memory hash index. Includes B+ tree indexing and native vector-search exploration.",
    metrics: [
      "• storage: fixed 4 KB pages with slotted-page layout",
      "• indexing: in-memory hash index + B+ tree",
      "• serialization: MessagePack",
    ],
    stack: "go · storage engines · b+ trees · messagepack",
    link: "https://github.com/kichu12348/NanoDB",
  },
  {
    id: "bunkmate",
    name: "bunkmate",
    tag: "mobile / student productivity",
    desc: "A student-focused attendance and timetable tracker built for university life. Helps students monitor attendance, plan around class schedules, and manage their attendance goals through a mobile-first experience with backend synchronization.",
    metrics: [
      "• adoption: 180+ users",
      "• platform: cross-platform mobile application",
      "• architecture: local-first data with backend synchronization",
    ],
    stack: "react native · expo · typescript",
    link: "https://github.com/kichu12348/BunkMate",
  },
  {
    id: "snapbook",
    name: "snapbook",
    tag: "realtime / collaboration",
    desc: "A real-time collaborative application built around multi-user interaction and WebSocket communication. Uses a JavaScript full-stack architecture to synchronize activity between connected clients.",
    metrics: [
      "• communication: WebSockets",
      "• architecture: client-server real-time synchronization",
      "• stack: MERN-style application with Express and Node.js",
    ],
    stack: "mongodb · express · react native · node.js",
    link: "https://github.com/kichu12348/snapbook",
  },
];

export const PREVIOUS_EXPERIENCE: readonly ExperienceItem[] = [
  {
    company: "zenturio",
    roleAndPeriod: "summer '25",
    desc: "summer '25. put ml models inside a kids drawing app.",
  },
];

export const PROFILE_INFO = {
  name: "mahadevan reji",
  bio: "writing code. trying to keep my sanity intact.",
  status: "bored!!!",
  tagline: "made between bugs, probably.",
  location: "Chengannur",
  email: "rmahadevan574@gmail.com",
  githubUrl: "https://github.com/kichu12348",
  linkedinUrl: "https://www.linkedin.com/in/mahadevanreji",
  resume: "/mahadevan_resume.pdf",
} as const;
