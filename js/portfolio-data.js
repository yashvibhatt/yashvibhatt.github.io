// ============================================
// PORTFOLIO KNOWLEDGE BASE — portfolio-data.js
// Single source of truth for the chatbot.
// ============================================

var PORTFOLIO = {

  bio: {
    name: 'Yashvi Bhatt',
    tagline: 'Data Engineer & Analyst, MS student at UIUC',
    summary: 'Yashvi is a graduate student at the University of Illinois Urbana-Champaign pursuing an MS in Information Management with a Finance & Analytics track. Her work sits at the intersection of AI, data engineering, research, finance, and communication. She builds systems that work — pipelines, dashboards, automation suites — and explains them clearly to people who need to act on them.',
    location: 'Champaign, IL',
    available: 'Available for full-time roles starting mid-2026',
    open_to: [
      'Data engineering & analytics roles',
      'BI / analytics engineering',
      'Technical product & operations',
      'Open to relocation or remote'
    ]
  },

  education: [
    {
      school: 'University of Illinois Urbana-Champaign',
      degree: 'MS Information Management',
      track: 'Finance & Analytics',
      years: '2024 – 2026',
      highlights: [
        'Finance & Analytics concentration',
        'Graduate Teaching Assistant — FIN 221 Corporate Finance',
        'Graduate Research Assistant — Health Informatics Center'
      ]
    },
    {
      school: 'Mukesh Patel School of Technology Management & Engineering',
      degree: 'B.Tech Computer Engineering',
      years: '2019 – 2023',
      highlights: ['GPA 3.59', 'Mumbai, India']
    }
  ],

  certifications: [
    'CFA Level I — Level II Candidate, May 2026',
    'AWS Certified Cloud Practitioner',
    'NISM Mutual Fund & Alternative Investments',
    'Financial Markets (Coursera)'
  ],

  work_experience: [
    {
      title: 'Graduate Research Assistant',
      org: 'Health Informatics Center, University of Illinois',
      duration: 'Aug 2025 – Present',
      type: 'research',
      bullets: [
        'Supports research documentation and structured summaries for interdisciplinary stakeholders',
        'Translates technical material into accessible written deliverables',
        'Organizes research outputs and reports across the team'
      ]
    },
    {
      title: 'Graduate Teaching Assistant',
      org: 'FIN 221 Corporate Finance, University of Illinois',
      duration: 'Aug 2025 – Dec 2025',
      type: 'teaching',
      bullets: [
        'Evaluated quantitative assignments and provided structured written feedback',
        'Helped clarify complex financial concepts for students',
        'Maintained consistent grading standards across large volumes of submissions'
      ]
    },
    {
      title: 'Digital Accessibility Assistant',
      org: 'Digital Risk Office, University of Illinois',
      duration: 'Oct 2025 – Jan 2026',
      type: 'accessibility',
      bullets: [
        'Remediated institutional documents using Equidox and Adobe Acrobat Pro',
        'Implemented heading hierarchy, tagging structure, reading order, and alt text',
        'Ensured documents met digital accessibility standards'
      ]
    }
  ],

  campus_experience: [
    {
      title: 'Barista',
      org: 'University Dining Services, UIUC',
      duration: 'One semester',
      bullets: [
        'Worked in a fast-paced campus café serving students and staff',
        'Managed orders and customer interactions during peak hours',
        'Maintained organization and cleanliness of the service area'
      ]
    },
    {
      title: 'Camp Counselor',
      org: 'Active Illini Day Camp, UIUC',
      duration: 'One semester',
      bullets: [
        'Supervised and engaged children in structured recreational activities',
        'Ensured safety and positive participation in group activities',
        'Supported daily camp operations and coordination'
      ]
    }
  ],

  projects: [
    {
      title: 'E-Concessionaire OCR System',
      tags: ['Data Engineering', 'Automation', 'Python'],
      stat: '87% faster processing',
      summary: 'Replaced a fully manual railway concession form system with an automated OCR pipeline. Processing time dropped from 15 days to 2 days. Included encryption, hashing, database-linked authentication, and a full audit trail.'
    },
    {
      title: 'Automated Financial Data Pipeline',
      tags: ['ETL', 'Analytics', 'Tableau', 'MySQL'],
      stat: '40% less manual effort',
      summary: 'Built a Python ETL pipeline pulling from banking APIs into MySQL on an automated schedule, connected directly to Tableau. Cut manual data prep by 40% and brought dashboards from next-day to near real-time.'
    },
    {
      title: 'Data Pipeline Optimization (Apache NiFi)',
      tags: ['Data Engineering', 'Apache NiFi', 'SQL'],
      stat: '30% faster processing',
      summary: 'Diagnosed bottlenecks in a high-volume NiFi pipeline and rewrote key SQL queries. Achieved 30% speed improvement with no new infrastructure. Documented the flow so the next engineer could understand it.'
    },
    {
      title: 'Sapient Wealth Advisors: Internal Tools Overhaul',
      tags: ['Web Development', 'Power BI', 'AI Chatbot', 'SQL'],
      stat: '35% faster client response',
      summary: 'Rebuilt a client portal, integrated an AI chatbot for tier-1 client queries, and restructured Power BI dashboards with automated refresh and optimized SQL. Improved onboarding satisfaction by 20%.'
    },
    {
      title: 'ARCON QA Automation',
      tags: ['QA Automation', 'Python', 'Selenium', 'TestNG'],
      stat: '95% defect detection',
      summary: 'Built 100+ automated test scripts using Selenium, Python, and TestNG. Achieved 95% defect detection and reduced manual QA workload by 50%. Framework was built for ongoing team use, not just the initial author.'
    },
    {
      title: 'GALA Optics: E-Commerce Platform',
      tags: ['Web Development', 'E-Commerce', 'MySQL', 'API'],
      stat: '30% faster SQL queries',
      summary: 'Built a full e-commerce platform from scratch — catalog, cart, checkout, inventory management, and API-based transactions. SQL optimized for 30% faster queries. Business now runs online sales without manual overhead.'
    }
  ],

  technical_skills: {
    'Data & Engineering': ['Python', 'SQL', 'Apache NiFi', 'ETL', 'Hadoop', 'Airflow', 'AWS', 'Docker'],
    'Databases': ['MySQL', 'PostgreSQL', 'OracleSQL', 'MongoDB', 'SQLite'],
    'Analytics & BI': ['Power BI', 'Tableau', 'Looker', 'Excel', 'R'],
    'Web & Automation': ['HTML/CSS/JS', 'Selenium', 'TestNG', 'Java', 'Git', 'JIRA'],
    'Accessibility': ['Equidox', 'Adobe Acrobat Pro'],
    'ML & Research': ['Machine Learning', 'NLP', 'Data Visualization', 'Research Communication', 'Structured Analysis']
  },

  tools: [
    'Python', 'SQL', 'Apache NiFi', 'Airflow', 'Docker', 'AWS',
    'Power BI', 'Tableau', 'Looker', 'Selenium', 'TestNG',
    'Equidox', 'Adobe Acrobat Pro',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'JIRA', 'Excel', 'R', 'Java'
  ],

  domains: [
    'AI', 'GenAI', 'Data Engineering', 'Analytics', 'Finance',
    'Research', 'Communication', 'Accessibility', 'Data Storytelling',
    'Machine Learning', 'NLP', 'Business Intelligence'
  ]

};
