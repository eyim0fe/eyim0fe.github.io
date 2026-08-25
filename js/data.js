// Centralized Data for Eyimofe Pinnick's Portfolio
window.PORTFOLIO_DATA = {
  profile: {
    name: "Eyimofe A. Pinnick",
    title: "Product Manager who codes for fun",
    location: "Lagos & Remote",
    // shortBio:
    //   "I am a product manager who enjoys building software. I sit at the intersection of product strategy, user discovery, and software engineering. I lead products from 0 to 1 and build frontend & full-stack apps on weekends.",
    // extendedBio:
    //   "With over 4+ years bridging product management and software engineering, I specialize in taking ambiguous problems and shipping crisp, high-impact products. When I'm not writing PRDs, analyzing conversion funnels, or running user discovery calls, you'll find me writing TypeScript, crafting design systems, and building AI-assisted developer utilities.",
    status: "Open to new opportunities",
    avatar: "assets/images/profile.jpeg",
    socials: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/eyimofe-p",
        icon: "linkedin",
      },
      {
        name: "GitHub",
        url: "https://github.com/itsekiri-tatashe",
        icon: "github",
      },
      { name: "Email", url: "mailto:eyimofepinnick@gmail.com", icon: "email" },
      {
        name: "Resume",
        url: "assets/resume.pdf",
        icon: "file-text",
        isResume: true,
      },
    ],
    experience: [
      {
        role: "Senior Product Manager",
        company: "FinTech Scaleup",
        period: "2023 — Present",
        highlight:
          "Led checkout optimization & developer API suite growing volume by +38%.",
      },
      {
        role: "Product Manager & Engineer",
        company: "Studio Labs",
        period: "2021 — 2023",
        highlight:
          "Shipped 4 internal SaaS tools and managed cross-functional teams of 12 engineers.",
      },
      {
        role: "Frontend / Associate PM",
        company: "TechCorp",
        period: "2019 — 2021",
        highlight:
          "Built React micro-frontends and coordinated sprint backlogs.",
      },
    ],
    skills: {
      product: [
        "Product Strategy",
        "User Discovery",
        "Roadmapping",
        "PRDs & Specs",
        "Data Analytics (Mixpanel/SQL)",
        "A/B Testing",
        "Agile/Scrum",
      ],
      engineering: [
        "JavaScript / TypeScript",
        "React / Next.js",
        "Node.js & FastAPI",
        "Tailwind CSS",
        "PostgreSQL",
        "Git & CI/CD",
        "REST & WebSockets",
      ],
      design: [
        "Figma",
        "Design Systems",
        "Wireframing",
        "Interaction Design",
        "User Testing",
      ],
    },
  },

  projects: [
    {
      id: "tsems",
      title: "Tsems",
      tagline:
        "Mobile meal planner and recipe organizer for fitness goals and weekly planning.",
      roleType: "both",
      roleLabel: "PM & Engineer",
      isMobile: true, // Optimizes thumbnail and gallery for portrait/mobile screens
      roleDescription: "Product Manager & Engineer",
      stack: ["React", "TypeScript", "Express", "Drizzle", "PostgreSQL"],
      hasCaseStudy: true,
      hasLiveDemo: false,
      liveUrl: null,
      githubUrl: null,
      image: "assets/images/tsems-1.png",
      images: [
        {
          src: "assets/images/tsems-1.png",
          caption: "Screen 1: Meal Activity & Saved Meal Library",
          isMobile: true,
        },
        {
          src: "assets/images/tsems-2.png",
          caption: "Screen 2: Recipe Detail, Ingredients & Cooking Notes",
          isMobile: true,
        },
      ],
      caseStudy: {
        problem:
          "People, especially those with fitness goals, often struggle with deciding what to eat. Even when they already know meals they enjoy, it can be hard to keep track of them and plan what to eat throughout the week.",
        solution:
          "Built Tsems to help users save and organize their meals, find what they want to eat quickly, and create weekly meal plans. The product can later use AI to recommend meals based on a user's goals and available ingredients.",
        myImpact: [
          "Defined the problem, MVP, and main features for Tsems",
          "Designed the user flow and planned how meals, ingredients, and meal plans would work together",
          "Created a roadmap from a simple meal library to weekly meal planning and future AI features",
        ],
      },
    },
    {
      id: "tnbc",
      title: "TNBC",
      tagline:
        "A church management platform for managing members, attendance, giving, and church activities in one place.",

      roleType: "both",
      roleLabel: "PM & Engineer",
      roleDescription:
        "Led product thinking and contributed to the design and development of a church management platform, translating church operations into practical digital workflows.",

      stack: [
        "React",
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "Tailwind CSS",
      ],

      hasCaseStudy: true,
      hasLiveDemo: false,
      liveUrl: "",
      githubUrl: "",

      image: "assets/images/tnbc-1.png",

      images: [
        {
          src: "assets/images/tnbc-1.png",
          caption: "Screen 1: Authentication",
        },
        {
          src: "assets/images/tnbc-2.png",
          caption: "Screen 2: Dashboard",
        },
        {
          src: "assets/images/tnbc-3.png",
          caption: "Screen 3: Members Overview",
        },
        {
          src: "assets/images/tnbc-4.png",
          caption: "Screen 4: Prayer Requests",
        },
        {
          src: "assets/images/tnbc-5.png",
          caption: "Screen 5: Member Profile",
        },
      ],

      caseStudy: {
        problem:
          "Church operations were spread across manual processes, making it difficult to manage member information, track attendance, record giving, and keep important church activities organized.",

        solution:
          "Built a centralized church management platform that brings member management, attendance tracking, giving, prayer requests, and other church operations into one system.",

        myImpact: [
          "Translated church workflows and operational needs into product requirements and user flows",
          "Designed and developed backend APIs for core church management features",
          "Built a member attendance system to record, track, and manage church attendance",
          "Implemented authentication, member management, giving, and relational data models",
          "Designed database relationships for entities such as members, attendance, giving, and foreign currency giving",
        ],
      },
    },
  ],
};
