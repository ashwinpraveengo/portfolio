// ────────────────────────────────────────────────────────────────────────────
// Portfolio Configuration
// ────────────────────────────────────────────────────────────────────────────
// This is the single source of truth for all portfolio content and settings.
// Edit this file to customize your portfolio without touching component code.
// ────────────────────────────────────────────────────────────────────────────

export const portfolioConfig = {
  // ── Content ──────────────────────────────────────────────────────────────
  personal: {
    name: 'G O Ashwin Praveen',
    title: 'Full Stack & Mobile Developer',
    subtitle: 'B.Tech CSE · Amrita Vishwa Vidyapeetham · 2027',
    location: 'Kannur, Kerala',
    email: 'ashwinpraveengo@gmail.com',
    phone: '6238170626',
    cgpa: '9.5',
    summary: 'Aspiring CS undergraduate building scalable web and mobile applications and real-time platforms. Proven in leading projects and delivering production-ready solutions. Passionate about creating technology that improves everyday life through thoughtful, user-focused engineering.',
    profilePhoto: '/photo.jpg',
    // Hero name, one entry per line (second line renders outlined)
    displayName: ['G O ASHWIN', 'PRAVEEN'],
    availability: 'Open to opportunities · 2027 Grad',
    // Cycled with a scramble effect in the hero: "I build ___"
    roles: [
      'scalable web apps',
      'cross-platform mobile apps',
      'real-time platforms',
      'AI-powered tools',
    ],
    timezone: 'Asia/Kolkata',
    timezoneLabel: 'IST',
  },

  // ── About ───────────────────────────────────────────────────────────────
  about: {
    // Words from personal.summary that get the accent color as you scroll
    highlights: ['scalable', 'real-time', 'production-ready', 'improves', 'everyday', 'life'],
    facts: [
      { label: 'Based in', value: 'Kannur, Kerala' },
      { label: 'Studying', value: 'B.Tech CSE · Amrita' },
      { label: 'Focus', value: 'Web · Mobile · Real-time' },
      { label: 'Status', value: 'Open to internships' },
    ],
    badge: 'OPEN TO WORK • FULL STACK • MOBILE • ',
  },

  // ── Section headings (*word* renders in the accent serif) ─────────────────
  headings: {
    about: 'Engineering ideas into *experiences*',
    skills: 'The *toolkit*',
    experience: 'Where I have *shipped*',
    projects: 'Selected *work*',
    achievements: 'Wins & *community*',
    education: 'Academic *foundation*',
  },

  ledes: {
    projects: 'From platforms in production to award-winning hackathon builds — designed, engineered and shipped end to end.',
  },

  // ── Marquee bands between sections ──────────────────────────────────────
  marquee: ['Full Stack', 'Mobile', 'Real-time', 'Open Source', 'UI / UX', 'Hackathons', 'APIs'],

  links: {
    linkedin: 'https://www.linkedin.com/in/ashwinpraveengo/',
    github: 'https://github.com/ashwinpraveengo',
    gitlab: 'https://gitlab.com/ashwinpraveengo',
  },

  // ── Skills ──────────────────────────────────────────────────────────────
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'Java', 'Dart', 'JavaScript', 'SQL'],
    },
    {
      category: 'Frameworks',
      items: ['Flutter', 'React.js', 'Next.js', 'Django'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Firebase', 'GraphQL', 'Figma'],
    },
  ],

  // ── Experience ──────────────────────────────────────────────────────────
  experience: [
    {
      company: 'Pupilfirst Private Limited',
      role: 'Junior Full Stack Engineer Intern',
      period: 'Feb 2025 – Aug 2025',
      type: 'Remote',
      color: '#00e5a0',
      points: [
        'Contributed to frontend development of Digital Public Good (DPG) healthcare projects',
        'Built responsive and accessible UI components using modern frontend practices',
      ],
    },
    {
      company: 'Traboda CyberLabs',
      role: 'Software Developer Intern',
      period: 'Feb 2024 – May 2025',
      type: 'Kollam, Kerala',
      color: '#00b8ff',
      points: [
        'Developed intuitive UI/UX for Priyamvada, a cross-platform Sanskrit audiobook app with 1k+ downloads',
        'Implemented core features ensuring smooth performance across Android and iOS',
      ],
    },
  ],

  // ── Projects ─────────────────────────────────────────────────────────────
  projects: [
    {
      name: 'Skill Development Platform',
      period: 'Apr 2025 – Present',
      tag: 'Academic Management',
      desc: 'Skill tracking platform for Amrita\'s CIR Department. Led development of Django + GraphQL APIs and platform architecture.',
      tech: ['Django', 'GraphQL', 'Python'],
      role: 'Team Lead',
      accent: '#00e5a0',
      link: 'https://cirtracker.amritaskills.com/',
    },
    {
      name: 'Colaba AI',
      period: 'Feb 2025 – Mar 2025',
      tag: 'AI / EdTech',
      desc: 'AI-powered collaborative learning platform for OLabs. Chrome Extension + Web App with real-time chat, quizzes, and AI summaries.',
      tech: ['Next.js', 'Vite', 'Firebase'],
      role: 'Runner-Up · OLabs Hackathon',
      accent: '#00b8ff',
      link: 'https://devfolio.co/projects/colaba-ai-5397',
    },
    {
      name: 'VitaCare',
      period: 'Oct 2024',
      tag: 'HealthTech',
      desc: 'Mobile app for elderly care — medication reminders, health tracking, and social connection. Built with Flutter for Android & iOS.',
      tech: ['Flutter', 'Dart', 'Firebase'],
      role: 'Finalist · Evolumin Hackathon',
      accent: '#a78bfa',
      link: 'https://github.com/navaneeth0041/vitacare',
    },
    {
      name: 'CampusNotes+',
      period: 'Nov 2025',
      tag: 'EdTech',
      desc: 'Student-centric cross-platform app for uploading, organizing and accessing subject-wise notes and study materials across campus.',
      tech: ['Flutter', 'Firebase'],
      role: 'College Project',
      accent: '#fb923c',
      link: 'https://github.com/Campus-Notes/campus_notes_app',
    },
  ],

  // ── Achievements & Organizations ─────────────────────────────────────────
  achievements: [
    {
      title: 'Runner-Up',
      event: 'OLabs Hackathon 2025',
      project: 'Colaba AI',
      icon: 'trophy',
    },
    {
      title: 'Finalist',
      event: 'Evolumin Hackathon 2024',
      project: 'VitaCare',
      icon: 'medal',
    },
    {
      title: 'Participant',
      event: 'Indic Wikimedia Hackathon, Kochi 2025',
      project: 'Open-source collaboration',
      icon: 'globe',
    },
  ],

  organizations: [
    {
      name: 'amFOSS',
      role: 'Member & Mentor',
      desc: 'Active contributor and mentor in Amrita\'s FOSS community. Guided juniors in software development, open-source contributions, and technical best practices.',
    },
  ],

  // ── Education ──────────────────────────────────────────────────────────
  education: [
    {
      inst: 'Amrita Vishwa Vidyapeetham',
      degree: 'B.Tech · Computer Science & Engineering',
      year: '2027',
      score: 'CGPA 9.5 / 10',
      loc: 'Amritapuri, Kollam',
    },
    {
      inst: 'Bharatiya Vidya Bhavan',
      degree: 'Class XII · CBSE · MPC',
      year: '2023',
      score: '95.6%',
      loc: 'Kannur, Kerala',
    },
    {
      inst: 'Bharatiya Vidya Bhavan',
      degree: 'Class X · CBSE',
      year: '2021',
      score: '97.2%',
      loc: 'Kannur, Kerala',
    },
  ],

  // ── Hero Section Stats ─────────────────────────────────────────────────
  stats: [
    { num: '9.5', label: 'CGPA / 10' },
    { num: '4+', label: 'Projects Shipped' },
    { num: '2', label: 'Internships' },
    { num: '2', label: 'Hackathon Awards' },
  ],

  // ── Contact Section ────────────────────────────────────────────────────
  contact: {
    heading: 'HAVE A PROJECT',
    headingHighlight: 'IN MIND?',
    message: 'I\'m currently open to internship opportunities and freelance projects. Let\'s build something great.',
  },


  // ── Section Visibility ────────────────────────────────────────────────
  // Set to false to hide sections from the portfolio without deleting code
  sections: {
    preloader: true,
    navbar: true,
    hero: true,
    about: true,
    marquee: true,
    skills: true,
    experience: true,
    projects: true,
    achievements: true,
    education: true,
    contact: true,
    footer: true,
  },
}

// ── Navigation Items (Auto-generated from sections) ────────────────────────
export const navItems = [
  'About',
  'Skills',
  'Experience',
  'Projects',
  'Achievements',
  'Contact',
]
