export const questions = [
    // ENGINEERING (Logic, Problem Solving, Tech Exposure)
    { text: "Have you ever fixed a broken machine, gadget, or debugged a computer error yourself?", field: "engineering" },
    { text: "Can you solve a complex math or logic problem without giving up for at least 30 minutes?", field: "engineering" },

    // MEDICAL (Discipline, Memory, Hard work)
    { text: "Can you memorize large amounts of detailed information and recall it accurately under pressure?", field: "medical" },
    { text: "Are you willing to study for 10+ hours a day consistently for several years?", field: "medical" },

    // COMMERCE (Management, Data, Money Logic)
    { text: "Do you instinctively calculate the best value for money when shopping or planning a budget?", field: "commerce" },
    { text: "Have you ever successfully organized a team event or managed a group's finances?", field: "commerce" },

    // ARTS (Creativity Execution, Portfolio)
    { text: "Do you frequently produce original work (art, music, writing, design) without anyone asking you to?", field: "arts" },
    { text: "Can you spend hours perfecting a creative detail that others might not even notice?", field: "arts" },

    // GOVERNMENT (Consistency, Exam Readiness)
    { text: "Can you revise the same textbook chapters 5+ times without getting bored or distracted?", field: "government" },
    { text: "Do you prefer a stable, structured career path over high-risk, high-reward ventures?", field: "government" },

    // SKILLS (Execution Mindset, Freelance)
    { text: "Have you ever taught yourself a new software or tool just by watching tutorials?", field: "skills" },
    { text: "Do you prefer learning by doing real projects rather than reading theory books?", field: "skills" }
];

export const careerNames = {
    engineering: "Engineering / Tech",
    medical: "Medical",
    commerce: "Business / Finance",
    arts: "Creative Arts / Design",
    government: "Government Services",
    skills: "Skill-Based / Freelancing"
};

export const roadmaps = {
    engineering: {
        beginner: ["Learn Python / C++ Basics", "Solve 50+ Logic Problems", "Build a Calculator App"],
        intermediate: ["Data Structures & Algorithms", "Build a Web/App Project", "Git & GitHub Basics"],
        expert: ["Fullstack Development", "Competitive Programming", "Apply for Internships"]
    },
    medical: {
        beginner: ["Master Biology NCERT", "Basic Chemistry Concepts", "Daily 6hr Study Routine"],
        intermediate: ["Join Test Series", "Solve Previous Year Papers", "Focus on Weak Areas"],
        expert: ["High Score in Mocks", "Time Management Strategy", "Final Revision Cycles"]
    },
    commerce: {
        beginner: ["Understand Basic Accounting", "Economics Principles", "Excel Basics"],
        intermediate: ["Financial Modeling", "Internships", "Stock Market Basics"],
        expert: ["CA / MBA Prep", "Advanced Finance Certifications", "Networking"]
    },
    arts: {
        beginner: ["Daily Sketching/Writing", "Learn Tools (Photoshop/Figma)", "Follow Masters"],
        intermediate: ["Build a Portfolio", "Freelance Gigs", "Collab with others"],
        expert: ["Brand Deals", "Solo Exhibition/Launch", "Professional Agency Work"]
    },
    government: {
        beginner: ["Read Newspaper Daily", "NCERT 6th-12th", "Understand Syllabus"],
        intermediate: ["Subject-wise Notes", "Mock Tests Weekly", "Revision Strategy"],
        expert: ["Daily Answer Writing", "Interview Prep", "Full Length Mocks"]
    },
    skills: {
        beginner: ["Pick One High-Paid Skill", "Watch 5 Tutorials", "Replicate a Project"],
        intermediate: ["Find First Client (Free work)", "Build Portfolio Site", "Cold Emailing"],
        expert: ["Paid Client Work", "Scale to Agency", "Create Content/Course"]
    }
};
