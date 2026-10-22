// Udyam Sethu - Comprehensive Mock Seed Data & Schema

export const initialInstitutions = [
  {
    id: "inst-001",
    name: "HKES Poojya Doddappa Appa College of Engineering",
    code: "PDA-KLB-01",
    region: "Kalaburagi (Kalyana Karnataka)",
    email: "dean@hkespda.edu.in",
    contactPerson: "Dr. B. S. Kulkarni",
    phone: "+91 94481 23456",
    status: "approved", // approved or pending
    registeredAt: "2026-08-10",
    totalStudents: 1240,
    activeStudents: 1115,
    inactiveStudents: 125,
    avgAttendance: 86.4,
    avgScore: 78.2,
    assessmentsCompleted: 3420,
    studentsAtRisk: 42,
    activityParticipation: "91%",
    placementCellHead: "Prof. Rajeshwari Patil",
    accreditation: "NAAC A+ / NBA Tier-1",
  },
  {
    id: "inst-002",
    name: "BLDEA V.P. Dr. P.G. Halakatti College of Engineering",
    code: "BLDE-VJP-02",
    region: "Vijayapura",
    email: "principal@bldeacet.ac.in",
    contactPerson: "Dr. Anand Rao",
    phone: "+91 98450 78901",
    status: "approved",
    registeredAt: "2026-08-14",
    totalStudents: 980,
    activeStudents: 890,
    inactiveStudents: 90,
    avgAttendance: 84.1,
    avgScore: 75.9,
    assessmentsCompleted: 2510,
    studentsAtRisk: 31,
    activityParticipation: "87%",
    placementCellHead: "Dr. Sunil Bagewadi",
    accreditation: "NAAC A",
  },
  {
    id: "inst-003",
    name: "Ballari Institute of Technology and Management (BITM)",
    code: "BITM-BLY-03",
    region: "Ballari",
    email: "admin@bitmballari.edu.in",
    contactPerson: "Dr. Raghavendra Swamy",
    phone: "+91 94808 11223",
    status: "pending", // Pending Approval for demo
    registeredAt: "2026-10-18",
    totalStudents: 850,
    activeStudents: 0,
    inactiveStudents: 850,
    avgAttendance: 0,
    avgScore: 0,
    assessmentsCompleted: 0,
    studentsAtRisk: 0,
    activityParticipation: "0%",
    placementCellHead: "Prof. Vani Shastry",
    accreditation: "NAAC A",
  }
];

export const initialEmployers = [
  {
    id: "emp-001",
    name: "Tata Elxsi Industrial Automation Hub",
    industry: "Automotive, Embedded & AI",
    contactPerson: "Siddharth Verma",
    email: "careers@tataelxsi.com",
    phone: "+91 80 2297 9100",
    location: "Hubballi / Bengaluru",
    status: "approved",
    registeredAt: "2026-07-21",
    openPositions: 14,
    totalApplicants: 184,
    branding: {
      tagline: "Engineering Next-Gen Smart Mobility and IoT Systems",
      logoColor: "#0284c7",
      website: "https://www.tataelxsi.com"
    }
  },
  {
    id: "emp-002",
    name: "Bosch Global Software Technologies (BGSW)",
    industry: "Software & Digital Enterprise",
    contactPerson: "Kavya Murthy",
    email: "campus.hiring@bosch.in",
    phone: "+91 80 6657 5757",
    location: "Bengaluru & Kalaburagi Outreach",
    status: "approved",
    registeredAt: "2026-08-01",
    openPositions: 22,
    totalApplicants: 310,
    branding: {
      tagline: "Invented for Life - Empowering Tier-2/3 Tech Prodigies",
      logoColor: "#e11d48",
      website: "https://www.bosch-softwaretechnologies.com"
    }
  },
  {
    id: "emp-003",
    name: "Kalyana Cloud & AI Systems Pvt Ltd",
    industry: "Agritech, Cloud & Vernacular NLP",
    contactPerson: "Manoj Rathod",
    email: "manoj@kalyanacloud.ai",
    phone: "+91 97312 44556",
    location: "Kalaburagi Tech Park",
    status: "pending", // Pending Approval for demo!
    registeredAt: "2026-10-19",
    openPositions: 5,
    totalApplicants: 0,
    branding: {
      tagline: "Democratizing Artificial Intelligence for Rural Karnataka",
      logoColor: "#16a34a",
      website: "https://kalyanacloud.ai"
    }
  }
];

export const initialStudents = [
  {
    id: "std-001",
    institutionId: "inst-001",
    institutionName: "HKES Poojya Doddappa Appa College of Engineering",
    name: "Rahul Kulkarni",
    email: "rahul.kulkarni@hkespda.edu.in", // Verified college mail
    usn: "3PD23CS089",
    phone: "+91 91104 33221",
    branch: "Computer Science & Engineering",
    semester: 6,
    hasWrittenExams: true, // Has written IA & Sem Exams -> CGPA is visible
    cgpa: 8.84,
    attendance: 92.5,
    status: "Active",
    atRisk: false,
    employabilityScore: 88,
    employabilityTrend: "+6% this quarter",
    employabilityTrendDirection: "up", // "up" | "down"
    verifiedIdentity: {
      verifiedId: "UDS-KA-2026-CS8891",
      qrToken: "VERIFIED-WORKFORCE-UDS-8891-HKES",
      academicVerified: true,
      skillsVerified: true,
      internshipVerified: true,
      projectsVerified: true,
      issuedOn: "2026-09-15"
    },
    skills: [
      { name: "React.js", level: "Advanced", score: 92, verified: true },
      { name: "Python / Data Science", level: "Proficient", score: 85, verified: true },
      { name: "Node.js & Express", level: "Proficient", score: 80, verified: true },
      { name: "Database & SQL", level: "Intermediate", score: 78, verified: true },
      { name: "Cloud Basics (AWS)", level: "Needs Upskilling", score: 58, verified: false }
    ],
    skillGaps: [
      "Distributed Caching (Redis)",
      "Docker & Container Orchestration",
      "Production CI/CD Pipelines"
    ],
    recommendedCourses: [
      "Microservices Architecture with Docker",
      "Vernacular AI Models on HuggingFace",
      "System Design for High Scalability"
    ],
    academicRecords: {
      semesters: [
        { sem: "Sem 1", gpa: 8.4 },
        { sem: "Sem 2", gpa: 8.6 },
        { sem: "Sem 3", gpa: 8.7 },
        { sem: "Sem 4", gpa: 8.9 },
        { sem: "Sem 5", gpa: 9.1 }
      ],
      upcomingIA: "Internal Assessment 2 - Distributed Systems (Oct 28, 2026)",
      upcomingExams: "VTU 6th Semester End Exams (Nov 24, 2026)"
    },
    assessments: [
      { name: "DSA & Problem Solving", score: "88/100", status: "Completed", date: "2026-09-10" },
      { name: "Vernacular Communication & Aptitude", score: "94/100", status: "Completed", date: "2026-09-22" },
      { name: "Full Stack Coding Evaluation", score: "86/100", status: "Completed", date: "2026-10-05" }
    ],
    certificates: [
      { title: "Full Stack Web Engineering", issuer: "VTU Skills Hub", date: "July 2026", id: "VSH-26-8871" },
      { title: "AI & Machine Learning Foundations", issuer: "NPTEL / IIT Madras", date: "April 2026", id: "NPTEL-AI-2026" }
    ],
    resumeDetails: {
      bio: "Aspiring software engineer passionate about scalable cloud systems and vernacular AI tools for regional growth.",
      projects: [
        { title: "Kalyana Krishi - Smart Soil & Weather AI", tech: "Python, FastAPI, IoT, Kannada UI", desc: "Built multilingual advisory tool for 350+ farmers in Gulbarga." },
        { title: "Udyam Sethu Student Portal", tech: "React, Tailwind, Local Storage API", desc: "Designed responsive high-accessibility UI for regional job seekers." }
      ]
    }
  },
  {
    id: "std-002",
    institutionId: "inst-001",
    institutionName: "HKES Poojya Doddappa Appa College of Engineering",
    name: "Sneha Patil",
    email: "sneha.patil@hkespda.edu.in",
    usn: "3PD26CS012",
    phone: "+91 99801 55443",
    branch: "Computer Science & Engineering",
    semester: 1, // 1st Semester Student!
    hasWrittenExams: false, // Has NOT written IA or Sem Exams yet!
    cgpa: null, // As requested: CGPA should NOT be shown!
    attendance: 94.0,
    status: "Active",
    atRisk: false,
    employabilityScore: 72,
    employabilityTrend: "First Sem Baseline",
    employabilityTrendDirection: "up",
    verifiedIdentity: {
      verifiedId: "UDS-KA-2026-CS0012",
      qrToken: "VERIFIED-WORKFORCE-UDS-0012-HKES",
      academicVerified: true,
      skillsVerified: false,
      internshipVerified: false,
      projectsVerified: false,
      issuedOn: "2026-10-01"
    },
    skills: [
      { name: "C Programming", level: "Proficient", score: 82, verified: true },
      { name: "HTML & CSS", level: "Intermediate", score: 74, verified: true },
      { name: "Problem Solving", level: "Intermediate", score: 70, verified: false }
    ],
    skillGaps: ["Data Structures in C++", "Object Oriented Java", "Git & GitHub"],
    recommendedCourses: ["Algorithms from Scratch", "Version Control with Git", "Kannada Tech Glossary Bootcamp"],
    academicRecords: {
      semesters: [],
      upcomingIA: "IA 1 - Engineering Mathematics & C-Programming (Nov 04, 2026)",
      upcomingExams: "First Semester VTU End Exams (Jan 15, 2027)"
    },
    assessments: [
      { name: "Basics of Computational Thinking", score: "78/100", status: "Completed", date: "2026-10-12" }
    ],
    certificates: [],
    resumeDetails: {
      bio: "1st-year enthusiast eager to explore core computing and open source technologies.",
      projects: []
    }
  },
  {
    id: "std-003",
    institutionId: "inst-001",
    institutionName: "HKES Poojya Doddappa Appa College of Engineering",
    name: "Basavaraj Biradar",
    email: "basavaraj.b@hkespda.edu.in",
    usn: "3PD23EC044",
    phone: "+91 97400 66778",
    branch: "Electronics & Communication",
    semester: 6,
    hasWrittenExams: true,
    cgpa: 6.72,
    attendance: 64.2, // Below 75% -> At Risk!
    status: "At Risk",
    atRisk: true,
    employabilityScore: 54,
    employabilityTrend: "-4% this month",
    employabilityTrendDirection: "down",
    verifiedIdentity: {
      verifiedId: "UDS-KA-2026-EC0044",
      qrToken: "VERIFIED-WORKFORCE-UDS-0044-HKES",
      academicVerified: true,
      skillsVerified: false,
      internshipVerified: false,
      projectsVerified: true,
      issuedOn: "2026-08-20"
    },
    skills: [
      { name: "Embedded C", level: "Intermediate", score: 68, verified: true },
      { name: "Circuit Design", level: "Intermediate", score: 65, verified: true },
      { name: "Python Basics", level: "Needs Upskilling", score: 45, verified: false }
    ],
    skillGaps: ["Python Programming", "Microcontrollers & IoT", "Aptitude & Communication"],
    recommendedCourses: ["Intensive Remedial Aptitude Workshop", "IoT Systems with ESP32", "Spoken English & Professional Presence"],
    academicRecords: {
      semesters: [
        { sem: "Sem 1", gpa: 6.9 },
        { sem: "Sem 2", gpa: 6.8 },
        { sem: "Sem 3", gpa: 6.5 },
        { sem: "Sem 4", gpa: 6.4 },
        { sem: "Sem 5", gpa: 6.6 }
      ],
      upcomingIA: "IA 2 - Microcontrollers & ARM (Oct 29, 2026)",
      upcomingExams: "VTU 6th Semester End Exams (Nov 25, 2026)"
    },
    assessments: [
      { name: "Digital Signal Processing Quiz", score: "52/100", status: "Completed", date: "2026-09-18" }
    ],
    certificates: [],
    resumeDetails: {
      bio: "ECE undergraduate working on hardware prototyping and embedded microcontroller interfaces.",
      projects: [
        { title: "Smart Irrigation Water Sensor", tech: "Arduino, GSM Module", desc: "Automated valve control system for borewell water conservation." }
      ]
    }
  },
  {
    id: "std-004",
    institutionId: "inst-002",
    institutionName: "BLDEA V.P. Dr. P.G. Halakatti College of Engineering",
    name: "Ananya Deshmukh",
    email: "ananya.d@bldeacet.ac.in",
    usn: "2BL23IS033",
    phone: "+91 94812 77889",
    branch: "Information Science & Engineering",
    semester: 6,
    hasWrittenExams: true,
    cgpa: 9.35,
    attendance: 96.0,
    status: "Active",
    atRisk: false,
    employabilityScore: 94,
    employabilityTrend: "+8% this quarter",
    employabilityTrendDirection: "up",
    verifiedIdentity: {
      verifiedId: "UDS-KA-2026-IS9332",
      qrToken: "VERIFIED-WORKFORCE-UDS-9332-BLDE",
      academicVerified: true,
      skillsVerified: true,
      internshipVerified: true,
      projectsVerified: true,
      issuedOn: "2026-09-10"
    },
    skills: [
      { name: "Full Stack (MERN)", level: "Advanced", score: 95, verified: true },
      { name: "Cloud Architecture", level: "Proficient", score: 88, verified: true },
      { name: "Algorithms & LeetCode", level: "Advanced", score: 92, verified: true }
    ],
    skillGaps: ["Kubernetes", "GraphQL Federation"],
    recommendedCourses: ["Advanced Microservices", "AI Agent Design"],
    academicRecords: {
      semesters: [
        { sem: "Sem 1", gpa: 9.1 },
        { sem: "Sem 2", gpa: 9.2 },
        { sem: "Sem 3", gpa: 9.4 },
        { sem: "Sem 4", gpa: 9.5 },
        { sem: "Sem 5", gpa: 9.6 }
      ],
      upcomingIA: "IA 2 - Machine Learning (Nov 02, 2026)",
      upcomingExams: "VTU 6th Semester End Exams (Nov 26, 2026)"
    },
    assessments: [
      { name: "Comprehensive Fullstack Exam", score: "96/100", status: "Completed", date: "2026-10-02" }
    ],
    certificates: [
      { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Aug 2026", id: "AWS-CCP-9921" }
    ],
    resumeDetails: {
      bio: "High-performing engineer passionate about large-scale distributed applications and fintech.",
      projects: []
    }
  }
];

export const initialJobs = [
  {
    id: "job-001",
    employerId: "emp-001",
    employerName: "Tata Elxsi Industrial Automation Hub",
    title: "Associate Embedded Software Engineer",
    type: "Full-Time",
    roleCategory: "Embedded & Edge AI",
    location: "Hubballi / Bengaluru",
    stipendOrSalary: "₹ 7.5 - 9.0 LPA",
    eligibility: "BE / B.Tech (CSE, ISE, ECE, EEE)",
    minCgpa: 7.0,
    requiredSkills: ["Embedded C", "C++", "Linux Systems", "Problem Solving"],
    description: "Work on automotive smart gateway controllers, connected car telematics, and real-time edge processing.",
    postedDate: "2026-10-10",
    deadline: "2026-11-15",
    applicants: [
      {
        studentId: "std-001",
        appliedDate: "2026-10-12",
        status: "Shortlisted",
        fitScore: 89,
        fitReason: "Strong foundational C++ and systems knowledge, high employability score (88/100)."
      }
    ]
  },
  {
    id: "job-002",
    employerId: "emp-002",
    employerName: "Bosch Global Software Technologies (BGSW)",
    title: "Graduate Cloud Developer & AI Intern",
    type: "Internship (6 Months + PPO)",
    roleCategory: "Cloud & Digital",
    location: "Bengaluru / Kalaburagi Hybrid",
    stipendOrSalary: "₹ 35,000 / month stipend (PPO: ₹ 8.5 LPA)",
    eligibility: "6th or 8th Sem (All Tech Branches)",
    minCgpa: 7.5,
    requiredSkills: ["React.js", "Python / Data Science", "Cloud Basics (AWS)", "Node.js"],
    description: "Join Bosch Enterprise Digital team building vernacular industrial analytics dashboards for global manufacturing plants.",
    postedDate: "2026-10-15",
    deadline: "2026-11-20",
    applicants: [
      {
        studentId: "std-001",
        appliedDate: "2026-10-16",
        status: "Under Review",
        fitScore: 94,
        fitReason: "Direct match on React.js, Python, and strong verifiable projects in regional agriculture AI."
      },
      {
        studentId: "std-004",
        appliedDate: "2026-10-17",
        status: "Interview Scheduled",
        fitScore: 97,
        fitReason: "Outstanding CGPA (9.35), AWS certified, and full-stack proficiency."
      }
    ]
  }
];

export const initialCampusDrives = [
  {
    id: "drive-001",
    institutionId: "inst-001",
    companyName: "Tata Elxsi Campus Recruitment 2026",
    packageInfo: "₹ 8.2 LPA",
    driveDate: "Nov 12, 2026",
    venue: "PDA College Central Auditorium, Kalaburagi",
    eligibleBranches: "CSE, ISE, ECE",
    minAttendance: 75,
    minCgpa: 7.0,
    status: "Upcoming",
    broadcastToStudents: true
  },
  {
    id: "drive-002",
    institutionId: "inst-001",
    companyName: "Infosys Kalyana Karnataka Digital Drive",
    packageInfo: "₹ 6.5 LPA",
    driveDate: "Dec 05, 2026",
    venue: "Online Assessment + PDA Campus Interview",
    eligibleBranches: "All Engineering Branches",
    minAttendance: 70,
    minCgpa: 6.5,
    status: "Announced",
    broadcastToStudents: true
  }
];

export const initialNotifications = [
  {
    id: "notif-001",
    institutionId: "inst-001",
    targetStudentId: "std-001", // specific student
    title: "Special Technical Training on Microservices",
    message: "You have been nominated for the Advanced System Design and Docker workshop scheduled for this Saturday at Lab 3.",
    sentAt: "2026-10-18T10:30:00",
    isReversed: false,
    category: "Training"
  },
  {
    id: "notif-002",
    institutionId: "inst-001",
    targetStudentId: "all", // broadcast to all
    title: "Campus Drive Notification: Tata Elxsi & Infosys Registration Open",
    message: "Eligible 6th and 8th semester students are requested to complete the mock assessment before Nov 02 to qualify for the on-campus pool.",
    sentAt: "2026-10-17T14:15:00",
    isReversed: false,
    category: "Placement"
  },
  {
    id: "notif-003",
    institutionId: "inst-001",
    targetStudentId: "std-003",
    title: "Academic Attendance Alert: Remedial Counseling Session",
    message: "Your attendance is currently 64.2%. Please meet your academic mentor Prof. Joshi on Wednesday afternoon to discuss remediation.",
    sentAt: "2026-10-19T09:00:00",
    isReversed: false,
    category: "Academic"
  }
];

export const initialAlumniNetwork = [
  {
    id: "alm-001",
    name: "Dr. Srinivas Patil",
    gradYear: 2018,
    college: "HKES PDA College of Engg",
    currentRole: "Lead Cloud Architect at Google Cloud",
    location: "Bengaluru",
    verifiedAlumni: true,
    offering: ["1-on-1 Mentorship", "Job Referral (GCP & AI)", "Tech Talks"],
    contact: "srinivas.patil@alumni.hkes.in",
    successStory: "From Kalaburagi classrooms to architecting planetary-scale distributed cloud infrastructure."
  },
  {
    id: "alm-002",
    name: "Priyanka Biradar",
    gradYear: 2021,
    college: "BLDEA CET Vijayapura",
    currentRole: "Senior AI Engineer at Microsoft Research",
    location: "Hyderabad",
    verifiedAlumni: true,
    offering: ["Resume Review", "Mock AI Interview", "Internship Opportunities"],
    contact: "priyanka.b@alumni.bldea.in",
    successStory: "Published 3 NLP research papers and spearheaded Indic language models for public services."
  }
];

// Vernacular AI Dictionary for UI & Voice Interaction
export const vernacularData = {
  en: {
    title: "Udyam Sethu",
    tagline: "Bridging Students, Institutions & Industry across Karnataka",
    heroDesc: "A next-generation Employability Operating System with AI score tracking, verified digital workforce credentials, and vernacular career intelligence.",
    studentPortal: "Student Portal",
    institutionPortal: "Institution Portal",
    employerPortal: "Employer Portal",
    adminPortal: "Admin Portal",
    studentLoginHelp: "Sign in with your official college email provided by your institution.",
    scoreExplainQ: "Why is my Employability Score 88/100?",
    scoreExplainA: "Your score is strong in Fullstack Web Development (92%) and Data Structures (88%). To reach the top 5% bracket, complete practical projects in Docker Containerization and AWS Cloud Deployments.",
    voiceBtn: "Voice AI Career Guidance",
    listening: "Listening in English...",
    lowBandwidth: "Low-Bandwidth Mode",
    activeMode: "Standard High-Speed Mode"
  },
  kn: {
    title: "ಉದ್ಯಮ ಸೇತು",
    tagline: "ಕರ್ನಾಟಕದ ವಿದ್ಯಾರ್ಥಿಗಳು, ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಉದ್ಯೋಗದಾತರನ್ನು ಬೆಸೆಯುವ ಮಹಾಸೇತು",
    heroDesc: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಆಧಾರಿತ ಉದ್ಯೋಗಾರ್ಹತೆ ಸ್ಕೋರ್, ಡಿಜಿಟಲ್ ದೃಢೀಕೃತ ಗುರುತು ಮತ್ತು ಕನ್ನಡದಲ್ಲಿಯೇ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ವಿನೂತನ ವೇದಿಕೆ.",
    studentPortal: "ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್",
    institutionPortal: "ಸಂಸ್ಥೆಗಳ ಪೋರ್ಟಲ್",
    employerPortal: "ಉದ್ಯೋಗದಾತರ ಪೋರ್ಟಲ್",
    adminPortal: "ಆಡಳಿತಾಧಿಕಾರಿ ಪೋರ್ಟಲ್",
    studentLoginHelp: "ನಿಮ್ಮ ಕಾಲೇಜು ಸಂಸ್ಥೆಯು ನೀಡಿದ ಅಧಿಕೃತ ಇಮೇಲ್ ಬಳಸಿ ಲಾಗಿನ್ ಆಗಿ.",
    scoreExplainQ: "ನನ್ನ Employability Score ಯಾಕೆ ಕಡಿಮೆ ಇದೆ / ವಿವರಣೆ ನೀಡಿ?",
    scoreExplainA: "ನಿಮ್ಮ React.js (92%) ಮತ್ತು ಅಲ್ಗಾರಿದಮ್‌ಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಕೌಶಲ್ಯವಿದೆ. ಆದರೆ ಕ್ಲೌಡ್ ತಂತ್ರಜ್ಞಾನ (AWS) ಮತ್ತು ಡಾಕರ್ (Docker) ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು ಕಡಿಮೆ ಇರುವುದರಿಂದ ನಿಮ್ಮ ಅಂಕ 88 ಆಗಿದೆ. ಈ ಶಿಫಾರಸು ಮಾಡಿದ ಉಚಿತ ಕೋರ್ಸ್‌ಗಳನ್ನು ಮುಗಿಸಿ, ನಿಮ್ಮ ಅಂಕವು 95+ ತಲುಪುತ್ತದೆ.",
    voiceBtn: "ಕನ್ನಡ ವಾಯ್ಸ್ AI ವೃತ್ತಿ ಸಹಾಯಕ",
    listening: "ಕನ್ನಡದಲ್ಲಿ ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
    lowBandwidth: "ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಮೋಡ್ (Low-Bandwidth)",
    activeMode: "ಸಾಮಾನ್ಯ ಮೋಡ್"
  },
  hi: {
    title: "उद्यम सेतु",
    tagline: "कर्नाटक के छात्रों, शैक्षणिक संस्थानों और नियोक्ताओं को जोड़ने वाला सेतु",
    heroDesc: "एआई रोजगार क्षमता स्कोर, सत्यापित डिजिटल पहचान और बहुभाषी करियर मार्गदर्शन प्रदान करने वाला प्लेटफॉर्म।",
    studentPortal: "छात्र पोर्टल",
    institutionPortal: "संस्थान पोर्टल",
    employerPortal: "नियोक्ता पोर्टल",
    adminPortal: "एडमिन पोर्टल",
    studentLoginHelp: "संस्थान द्वारा प्रदान किए गए अपने आधिकारिक कॉलेज ईमेल से लॉगिन करें।",
    scoreExplainQ: "मेरा Employability Score 88/100 क्यों है?",
    scoreExplainA: "आपकी प्रोग्रामिंग और फुल-स्टैक कौशल मजबूत हैं (92%)। क्लाउड और कंटेनर पर एक अतिरिक्त प्रोजेक्ट पूरा करने से आपका स्कोर शीर्ष 5% में पहुंच जाएगा।",
    voiceBtn: "वॉइस एआई करियर गाइड",
    listening: "हिंदी में सुन रहा है...",
    lowBandwidth: "कम बैंडविड्थ मोड",
    activeMode: "हाई-स्पीड मोड"
  }
};
