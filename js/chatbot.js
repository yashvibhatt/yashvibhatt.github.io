// ============================================
// PORTFOLIO CHATBOT — chatbot.js
//
// Persona: Yashvi speaking in first person.
// Tone: warm, sharp, natural, conversational.
// No dashes in output. No bot-speak.
//
// Routes:
//   A. Small talk  — handled conversationally
//   B. Portfolio   — answered from PORTFOLIO data
//   C. General KB  — tech/AI definitions and misc
// ============================================

(function () {
  'use strict';

  // ============================================
  // ROUTE A — Small talk
  // Keep it natural. No redirecting to the portfolio.
  // ============================================

  // Expand abbreviations before any routing so "hru", "how r u", "sup", "yo" etc. all match correctly.
  function normalizeQuery(raw) {
    var q = raw.toLowerCase().trim();
    var map = [
      [/\bhru\b/g,        'how are you'],
      [/\bhow r u\b/g,    'how are you'],
      [/\bhow ru\b/g,     'how are you'],
      [/\br u\b/g,        'are you'],
      [/\bu r\b/g,        'you are'],
      [/\bwassup\b/g,     'whats up'],
      [/\bwuzup\b/g,      'whats up'],
      [/\bwats up\b/g,    'whats up'],
      [/\bsup\b/g,        'whats up'],
      [/\byo\b/g,         'hey'],
      [/\bhiya\b/g,       'hi'],
      [/\bthx\b/g,        'thanks'],
      [/\bty\b/g,         'thank you'],
      [/\bcya\b/g,        'bye'],
      [/\bgotta go\b/g,   'bye'],
      [/\blmao\b/g,       'haha'],
      [/\blol\b/g,        'haha'],
    ];
    map.forEach(function (pair) { q = q.replace(pair[0], pair[1]); });
    return q;
  }

  // Test a pattern against query using whole-word matching to prevent "yo" matching "your".
  function patternMatches(q, pat) {
    if (q === pat) return true;
    try {
      var escaped = pat.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
      return new RegExp('(?:^|\\s)' + escaped + '(?:\\s|$)').test(q);
    } catch (e) {
      return false;
    }
  }

  var SMALL_TALK = [
    {
      patterns: ['hi', 'hello', 'hey', 'howdy'],
      reply: "Hey, I'm Yashvi. Nice to meet you. Feel free to ask me anything."
    },
    {
      patterns: ['whats up', "what's up"],
      reply: "Not much, just here. What's on your mind?"
    },
    {
      patterns: ['how are you', "how's it going", 'how is it going', 'how do you do', 'hows it going'],
      reply: "I'm good, how are you?"
    },
    {
      patterns: ['nice to meet you', 'great to meet you', 'good to meet you', 'pleased to meet you'],
      reply: "Nice to meet you too!"
    },
    {
      patterns: ['thanks', 'thank you', 'cheers', 'appreciate it'],
      reply: "Of course :)"
    },
    {
      patterns: ['bye', 'goodbye', 'see ya', 'see you later', 'take care', 'good night', 'goodnight'],
      reply: "Take care! Come back anytime."
    },
    {
      patterns: ['who are you', 'what are you', 'what can i ask', 'what can you help with'],
      reply: "I'm Yashvi. I work in data engineering, analytics, research, and communication. Ask me about my projects, experience, interests, or anything else."
    },
    {
      patterns: ['haha', 'hehe', ':)', ':d'],
      reply: "Ha! What's on your mind?"
    },
    {
      patterns: ['you good', 'you okay', 'you alright'],
      reply: "I'm great, thanks for asking."
    }
  ];

  function checkSmallTalk(q) {
    var wordCount = q.trim().split(/\s+/).length;
    for (var i = 0; i < SMALL_TALK.length; i++) {
      var item = SMALL_TALK[i];
      for (var j = 0; j < item.patterns.length; j++) {
        var pat = item.patterns[j];
        // Use word-boundary matching and only on short queries to avoid false positives
        if (wordCount <= 6 && patternMatches(q, pat)) {
          return item.reply;
        }
      }
    }
    return null;
  }

  // ============================================
  // ROUTE B — Portfolio responses (first person)
  // No dashes. Natural sentences.
  // ============================================

  function answerBio() {
    return "I'm currently a graduate student at UIUC pursuing an MS in Information Management, with a concentration in Finance and Analytics. My work sits at the intersection of AI, data engineering, research, finance, and communication. I build systems that work and explain them clearly to the people who need to act on them.";
  }

  function answerProjects() {
    var p = PORTFOLIO.projects;
    var titles = p.map(function(proj) {
      return proj.title + " (" + proj.stat + ")";
    });
    return "I've shipped six projects across data engineering, automation, analytics, and web development. " +
      titles.slice(0, 3).join(", ") + " are a few highlights. " +
      "The full list: " + titles.join("; ") + ". Want me to go deeper on any of them?";
  }

  function answerProjectDetail(name) {
    var p = PORTFOLIO.projects.find(function(proj) {
      return proj.title.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    if (!p) return null;
    return p.title + " — " + p.stat + ".\n\n" + p.summary;
  }

  function answerSkills() {
    var s = PORTFOLIO.technical_skills;
    return "My core technical skills span a few areas. " +
      "Data and engineering: " + s['Data & Engineering'].join(", ") + ". " +
      "Databases: " + s['Databases'].join(", ") + ". " +
      "Analytics and BI: " + s['Analytics & BI'].join(", ") + ". " +
      "Web and automation: " + s['Web & Automation'].join(", ") + ". " +
      "ML and research: " + s['ML & Research'].join(", ") + ".";
  }

  function answerTools() {
    return "My core tools are " + PORTFOLIO.tools.join(", ") + ".";
  }

  function answerExperience() {
    return "My current roles are all at UIUC. I'm a Graduate Research Assistant at the Health Informatics Center, supporting research documentation and translating technical material into accessible deliverables. " +
      "Before that I was a Teaching Assistant for FIN 221 Corporate Finance, grading assignments and helping students work through financial concepts. " +
      "I also worked as a Digital Accessibility Assistant, remediating institutional documents to meet accessibility standards.";
  }

  function answerEducation() {
    return "I'm finishing my MS in Information Management at the University of Illinois Urbana-Champaign, with a concentration in Finance and Analytics. " +
      "Before that I did my Bachelor's in Computer Engineering at Mukesh Patel School of Technology Management in Mumbai, graduating with a 3.59 GPA.";
  }

  function answerCertifications() {
    return "I'm a CFA Level II Candidate sitting the exam in May 2026, and I passed Level I. I'm also an AWS Certified Cloud Practitioner and hold a NISM Mutual Fund and Alternative Investments certification. I've completed the Financial Markets course on Coursera as well.";
  }

  function answerAvailability() {
    return "I'm available for full-time roles starting mid-2026. I'm open to data engineering and analytics roles, BI and analytics engineering, and technical product or operations work. Open to relocation or fully remote positions too.";
  }

  function answerResearch() {
    var r = PORTFOLIO.work_experience.find(function(e) { return e.type === 'research'; });
    if (!r) return answerExperience();
    return "Right now I'm working as a " + r.title + " at the " + r.org + ". " +
      r.bullets[0] + " " + r.bullets[1] + " It's work that involves a lot of cross-functional communication, which I find genuinely interesting.";
  }

  function answerTeaching() {
    var t = PORTFOLIO.work_experience.find(function(e) { return e.type === 'teaching'; });
    if (!t) return answerExperience();
    return "I was a Teaching Assistant for FIN 221 Corporate Finance at UIUC from August to December 2025. " +
      "I evaluated quantitative assignments, provided structured written feedback, and helped students work through complex financial concepts. " +
      "It was good practice for explaining technical ideas clearly under time pressure.";
  }

  function answerAccessibility() {
    var a = PORTFOLIO.work_experience.find(function(e) { return e.type === 'accessibility'; });
    if (!a) return answerExperience();
    return "Yes, I worked as a Digital Accessibility Assistant at UIUC's Digital Risk Office from October 2025 to January 2026. " +
      "I remediated institutional documents using Equidox and Adobe Acrobat Pro, implementing proper heading hierarchy, tagging structure, reading order, and alt text so documents met accessibility standards.";
  }

  function answerCampus() {
    return "I've had a mix of campus roles. More recently I've worked as a Graduate Research Assistant, a Teaching Assistant for FIN 221, and a Digital Accessibility Assistant. " +
      "Earlier on I worked as a barista in university dining and as a camp counselor at Active Illini Day Camp. " +
      "Good range of experience, honestly.";
  }

  function answerDataEngineering() {
    return "Data engineering is where a lot of my project work lives. " +
      "I built an OCR pipeline that cut railway form processing from 15 days to 2 days. " +
      "I built a Python ETL pipeline pulling from banking APIs into MySQL and connected it to Tableau, which cut manual data prep by 40%. " +
      "And I diagnosed and rewrote key parts of a high-volume Apache NiFi pipeline to get 30% faster processing with no new infrastructure.";
  }

  function answerAnalytics() {
    var tools = PORTFOLIO.technical_skills['Analytics & BI'].join(", ");
    return "For analytics and BI I work with " + tools + ". " +
      "I've built dashboards that went from needing daily manual updates to running near real-time, and optimized the SQL underneath so reports actually load fast enough to be useful. " +
      "I think a lot about the gap between data that technically exists and data that people will actually use.";
  }

  function answerWriting() {
    return "Writing is something I've done seriously for years. I spent three years as a Senior Editor at Mid Day, one of Mumbai's major daily newspapers. " +
      "I've also published cultural essays, science communication for local government, and interview profiles for a UN-affiliated organization. " +
      "For me the writing and the technical work come from the same instinct: find what's unclear, then fix it.";
  }

  function answerAI() {
    var mlSkills = PORTFOLIO.technical_skills['ML & Research'].join(", ");
    return "AI and ML are areas I'm genuinely interested in, not just familiar with. My ML and research skills include " + mlSkills + ". " +
      "I work across AI, GenAI, data engineering, analytics, finance, and research. It's a combination I find useful because a lot of the most interesting problems sit at the intersection of those things.";
  }

  function answerFinance() {
    return "I'm a CFA Level II Candidate, sitting the exam in May 2026. I passed Level I and my MS concentration is Finance and Analytics. " +
      "I also TA'd FIN 221 Corporate Finance and have built financial data pipelines and dashboards for fintech clients. " +
      "Finance is the domain I apply a lot of my data work to.";
  }

  function answerStrengths() {
    return "I think the most useful thing I bring is the combination of technical execution and clear communication. " +
      "I can build the pipeline and explain what it means to a stakeholder who never opens a terminal. " +
      "I've worked across fintech, optics retail, QA, and newsrooms. Different industries, same problem every time: take a messy system, make it work, and make it legible.";
  }

  function answerContact() {
    return "Best way to reach me is email at <a href=\"mailto:ybhatt2@illinois.edu\">ybhatt2@illinois.edu</a>. " +
      "You can also find me on <a href=\"https://linkedin.com/in/yashvi-bhatt\" target=\"_blank\" rel=\"noopener\">LinkedIn</a> or <a href=\"https://github.com/yashvibhatt\" target=\"_blank\" rel=\"noopener\">GitHub</a>. " +
      "I usually respond within a day.";
  }

  function answerInterests() {
    return "I'm most interested in the places where AI, data, research, and communication overlap. " +
      "I like work that has technical depth but also needs to be explained clearly. " +
      "Outside of that I read a lot, I used to edit for a major newspaper in Mumbai, and I'm currently working through the CFA curriculum. " +
      "Data storytelling and research communication are things I care about a lot.";
  }

  // ---- Portfolio intent table ----

  var PORTFOLIO_INTENTS = [
    {
      keywords: [
        'about yourself', 'about you', 'tell me about you', 'introduce yourself',
        'about yashvi', 'your background', 'your story', 'what do you do for work',
        'what is your work', 'what do you do', 'what do you work on',
        'what are you working on', 'what are you currently doing', 'your overview'
      ],
      handler: answerBio
    },
    {
      keywords: [
        'your projects', 'projects you', 'what have you built', 'what did you build',
        'what projects', 'case study', 'case studies', 'portfolio work',
        'what have you worked on', 'show me your work', 'your work',
        'projects you have done', 'your portfolio', 'tell me about your projects',
        'what projects have you done'
      ],
      handler: answerProjects
    },
    {
      keywords: [
        'your skills', 'your technical skills', 'technical stack', 'your stack',
        'your technologies', 'your capabilities', 'what skills do you have',
        'what are your skills', 'skills you have', 'your skill set'
      ],
      handler: answerSkills
    },
    {
      keywords: [
        'your tools', 'what tools', 'tools you use', 'software you use',
        'what do you use', 'programs you use', 'your toolkit',
        'tools you know', 'what tools do you use', 'what software do you use'
      ],
      handler: answerTools
    },
    {
      keywords: [
        'your experience', 'your work history', 'your roles', 'your career',
        'positions you', 'where have you worked', 'your employment',
        'your job', 'your jobs', 'work experience', 'what experience do you have'
      ],
      handler: answerExperience
    },
    {
      keywords: [
        'your education', 'your school', 'your degree', 'uiuc',
        'university of illinois', 'your college', 'where did you study',
        'where do you study', 'your masters', 'your ms', 'your btech',
        'your bachelors', 'what did you study', 'your university'
      ],
      handler: answerEducation
    },
    {
      keywords: [
        'your certifications', 'your certificates', 'are you certified',
        'your credentials', 'nism', 'aws certified', 'cfa exam', 'your cfa',
        'what certifications', 'certifications you have'
      ],
      handler: answerCertifications
    },
    {
      keywords: [
        'are you available', 'open to work', 'looking for a job',
        'open to roles', 'when are you available', 'would you relocate',
        'are you remote', 'job search', 'available for hire',
        'hire you', 'work with you', 'your availability',
        'when do you graduate', 'are you looking', 'looking for work'
      ],
      handler: answerAvailability
    },
    {
      keywords: [
        'your research', 'research work', 'are you a researcher', 'what research',
        'health informatics', 'research assistant', 'your gra role', 'graduate research',
        'tell me about your research', 'what are you researching', 'research experience'
      ],
      handler: answerResearch
    },
    {
      keywords: [
        'your teaching', 'teaching assistant', 'did you teach', 'fin 221',
        'corporate finance class', 'your ta role', 'your grading work',
        'have you taught', 'teaching experience'
      ],
      handler: answerTeaching
    },
    {
      keywords: [
        'accessibility work', 'digital accessibility', 'equidox', 'wcag', 'alt text',
        'document remediation', 'have you worked in accessibility',
        'accessibility experience', 'did you do accessibility'
      ],
      handler: answerAccessibility
    },
    {
      keywords: [
        'campus experience', 'campus jobs', 'campus roles', 'your campus work',
        'barista', 'camp counselor', 'dining hall', 'active illini',
        'what campus jobs', 'campus experiences you have had',
        'what have you done on campus', 'campus work you have done'
      ],
      handler: answerCampus
    },
    {
      keywords: [
        'your data engineering', 'pipeline work', 'your etl', 'your nifi',
        'your airflow', 'your data pipelines', 'data engineering work',
        'have you built a pipeline', 'data engineering experience'
      ],
      handler: answerDataEngineering
    },
    {
      keywords: [
        'your analytics work', 'your bi work', 'your dashboards', 'tableau work',
        'power bi work', 'your visualization', 'your reporting', 'dashboard experience',
        'analytics experience', 'bi experience'
      ],
      handler: answerAnalytics
    },
    {
      keywords: [
        'your writing', 'do you write', 'writing experience', 'editor',
        'journalism', 'mid day', 'newspaper', 'your essays', 'articles you wrote',
        'published writing', 'editorial work', 'have you written'
      ],
      handler: answerWriting
    },
    {
      keywords: [
        'your ai interests', 'your ml work', 'your nlp work', 'ai background',
        'ml experience', 'your data science', 'what you do in ai', 'your genai work',
        'machine learning experience', 'ai experience', 'nlp experience'
      ],
      handler: answerAI
    },
    {
      keywords: [
        'your finance work', 'cfa', 'level ii', 'your fintech work',
        'finance background', 'cfa candidate', 'financial work', 'cfa level',
        'finance experience', 'your finance background'
      ],
      handler: answerFinance
    },
    {
      keywords: [
        'what makes you', 'your strengths', 'why should', 'what sets you',
        'your strongest areas', 'what do you bring', 'unique about you', 'why hire you',
        'what are you good at', 'best at', 'strongest skill'
      ],
      handler: answerStrengths
    },
    {
      keywords: [
        'contact you', 'reach you', 'email you', 'how do i find you',
        'your linkedin', 'your github', 'how do i get in touch',
        'connect with you', 'your email', 'your contact', 'how to contact',
        'how to reach', 'where can i find you', 'your resume',
        'can i contact you', 'contact details', 'your contact info'
      ],
      handler: answerContact
    },
    {
      keywords: [
        'your interests', 'what do you like', 'what are you into', 'hobbies',
        'outside of work', 'passions', 'what interests you', 'what excites you',
        'what do you enjoy', 'things you enjoy'
      ],
      handler: answerInterests
    }
  ];

  function getPortfolioMatch(q) {
    var best = null;
    var bestScore = 0;
    PORTFOLIO_INTENTS.forEach(function (intent) {
      var score = 0;
      intent.keywords.forEach(function (kw) {
        if (q.indexOf(kw) !== -1) {
          score += kw.split(' ').length;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    });
    return bestScore > 0 ? best : null;
  }

  // ============================================
  // ROUTE C — General knowledge
  // Tech and AI definitions. Graceful on live data.
  // Keep first-person tone where possible.
  // ============================================

  var GENERAL_KB = [
    {
      keywords: ['what is nlp', 'what is natural language processing', 'explain nlp', 'define nlp', 'how does nlp work'],
      answer: "NLP stands for Natural Language Processing. It's the branch of AI that enables computers to understand, interpret, and generate human language. Applications include sentiment analysis, chatbots, machine translation, and text summarization. It's an area I work in and am genuinely interested in."
    },
    {
      keywords: ['what is rag', 'what is retrieval augmented generation', 'explain rag', 'define rag', 'how does rag work'],
      answer: "RAG stands for Retrieval-Augmented Generation. The idea is that before an AI model generates a response, it retrieves relevant documents from a knowledge base. This grounds the output in factual content and significantly reduces hallucination. It's one of the most widely adopted techniques in enterprise AI right now."
    },
    {
      keywords: ['what is machine learning', 'explain machine learning', 'what is ml', 'define machine learning'],
      answer: "Machine learning is the branch of AI where systems learn patterns from data rather than following explicit rules. It covers supervised learning (classification, regression), unsupervised learning (clustering), and reinforcement learning. It's behind most of the AI applications you interact with daily."
    },
    {
      keywords: ['what is data engineering', 'explain data engineering', 'what does a data engineer do', 'define data engineering'],
      answer: "Data engineering is the practice of designing and building systems that collect, store, and transform data so it can actually be used for analysis. Data engineers build pipelines, manage databases, and ensure data quality. It's the foundation that makes analytics and ML possible, and it's a core part of my work."
    },
    {
      keywords: ['what is etl', 'explain etl', 'what is extract transform load', 'elt vs etl', 'define etl'],
      answer: "ETL stands for Extract, Transform, Load. Data is extracted from source systems, transformed (cleaned, validated, restructured), then loaded into a destination like a data warehouse. ELT is a modern variant where transformation happens after loading, often in cloud environments. I've built several ETL pipelines."
    },
    {
      keywords: ['what is generative ai', 'what is genai', 'explain generative ai', 'define generative ai'],
      answer: "Generative AI refers to models that can create new content, whether that's text, images, code, or audio, by learning patterns from training data. Large language models like GPT and Claude are the most prominent examples. It's reshaping software, research, and knowledge work across industries."
    },
    {
      keywords: ['what is an llm', 'what is a large language model', 'explain llm', 'define llm', 'how do llms work'],
      answer: "An LLM is a Large Language Model. It's a neural network trained on massive amounts of text to understand and generate language. GPT-4, Claude, and Llama are well-known examples. They're the foundation of tools like ChatGPT and are being applied across code generation, research, and more."
    },
    {
      keywords: ['what is business intelligence', 'what is bi', 'explain business intelligence', 'explain bi', 'define bi'],
      answer: "Business Intelligence is the practice of collecting, integrating, and analyzing business data to support decision-making. BI tools like Tableau, Power BI, and Looker help visualize that data and surface insights. It's a key part of my work and something I think a lot about."
    },
    {
      keywords: ['what is sql', 'explain sql', 'what is structured query language', 'define sql'],
      answer: "SQL is Structured Query Language. It's the standard way to interact with relational databases: retrieving, inserting, updating, and deleting data. It's one of the most fundamental skills in data work and something I use constantly."
    },
    {
      keywords: ['what is python', 'explain python', 'why use python', 'define python'],
      answer: "Python is a general-purpose programming language that's become the standard for data engineering, machine learning, and automation. Its ecosystem (pandas, NumPy, scikit-learn, SQLAlchemy, and many others) makes it uniquely powerful for data work. It's my primary programming language."
    },
    {
      keywords: ['what is a data pipeline', 'explain data pipeline', 'what is apache nifi', 'what is airflow', 'explain airflow', 'explain nifi'],
      answer: "A data pipeline is an automated workflow that moves and transforms data from sources to destinations. Tools like Apache NiFi handle real-time data flow, while Apache Airflow is great for scheduled batch pipelines. I've built and optimized pipelines using both."
    },
    {
      keywords: ['what is digital accessibility', 'explain accessibility', 'what is wcag', 'explain wcag', 'what is web accessibility'],
      answer: "Digital accessibility means designing content so it's usable by people with disabilities. The Web Content Accessibility Guidelines (WCAG) set the international standard, covering things like heading structure, alt text, keyboard navigation, and color contrast. I have direct hands-on experience with this."
    },
    {
      keywords: ['what is docker', 'explain docker', 'define docker', 'what does docker do'],
      answer: "Docker is a platform for packaging and running applications in isolated containers. Containers bundle code and all its dependencies together, so the app runs consistently across different environments. It's widely used in data engineering to ensure pipeline reproducibility. It's in my toolset."
    },
    {
      keywords: ['what is aws', 'explain aws', 'what is amazon web services', 'define aws'],
      answer: "AWS is Amazon Web Services, Amazon's cloud computing platform. It offers services for compute, storage, databases, networking, AI and ML, and much more. It's the largest cloud provider by market share. I'm an AWS Certified Cloud Practitioner."
    },
    {
      keywords: ['latest in ai', 'latest ai news', 'ai trends', 'current ai trends', "what's new in ai", 'whats new in ai', 'recent ai'],
      answer: "As of early 2026, the major AI trends are: multimodal models that work with text, images, and audio together; agentic AI systems that take multi-step actions autonomously; smaller open-source models (Llama, Mistral) that run locally; and widespread RAG adoption for enterprise knowledge management. These are areas I actively follow."
    },
    {
      keywords: ['what is the cfa', 'what is cfa exam', 'explain cfa', 'cfa meaning'],
      answer: "The CFA designation stands for Chartered Financial Analyst. It's one of the most respected credentials in finance and investment management. The three-level exam program covers portfolio management, equity, fixed income, derivatives, and ethics. I've passed Level I and I'm sitting Level II in May 2026."
    },
    {
      keywords: ['what is tableau', 'what is power bi', 'tableau vs power bi', 'explain tableau', 'explain power bi'],
      answer: "Tableau and Power BI are the two dominant BI visualization tools. Tableau is known for flexible, drag-and-drop visual exploration. Power BI integrates tightly with Microsoft's ecosystem and is widely used in enterprise settings. I've built production dashboards in both."
    },
    {
      keywords: ['weather', 'forecast', 'temperature', 'rain today', 'sunny today'],
      answer: "I don't have access to live weather data. For that you'd want to check a weather service. Anything else I can help with?"
    },
    {
      keywords: ['stock price', 'stock market today', 'how is the market', 'what is the market doing'],
      answer: "I can't pull live market data here, but there's a live ticker at the top of this page. For questions about my finance background or projects, happy to help."
    }
  ];

  function lookupGeneral(q) {
    for (var i = 0; i < GENERAL_KB.length; i++) {
      var item = GENERAL_KB[i];
      for (var j = 0; j < item.keywords.length; j++) {
        if (q.indexOf(item.keywords[j]) !== -1) {
          return item.answer;
        }
      }
    }
    return null;
  }

  // ============================================
  // Fallback
  // ============================================

  function fallback() {
    return "I'm not sure about that one. I'm best at questions about my projects, skills, research, and experience. Or try a general tech concept and I'll do my best.";
  }

  // ============================================
  // Main router — A then B then C then fallback
  // ============================================

  function respond(query) {
    // Normalize first: expand abbreviations so "hru", "sup", "yo" etc. route correctly.
    var q = normalizeQuery(query);

    // Route A: Small talk
    var stReply = checkSmallTalk(q);
    if (stReply) return stReply;

    // Route B: Portfolio
    var portfolioMatch = getPortfolioMatch(q);
    if (portfolioMatch) return portfolioMatch.handler();

    // Route C: General knowledge
    var generalReply = lookupGeneral(q);
    if (generalReply) return generalReply;

    return fallback();
  }

  // ============================================
  // UI
  // ============================================

  var PROMPTS = [
    "Tell me about your projects",
    "What kind of work do you do?",
    "What are you researching right now?",
    "What campus experiences have you had?",
    "What tools do you use?",
    "What are you interested in?"
  ];

  function createChat() {
    var container = document.getElementById('portfolioChat');
    if (!container) return;

    container.innerHTML = [
      '<div class="chat-header">',
        '<span class="chat-header-dot"></span>',
        '<span class="chat-header-title">Chat with Yashvi</span>',
      '</div>',
      '<div class="chat-messages" id="chatMessages"></div>',
      '<div class="chat-prompts" id="chatPrompts">',
        PROMPTS.map(function (p) {
          return '<button class="chat-chip" data-prompt="' + p + '">' + p + '</button>';
        }).join(''),
      '</div>',
      '<div class="chat-input-row">',
        '<input class="chat-input" id="chatInput" type="text" placeholder="Ask me anything..." autocomplete="off" />',
        '<button class="chat-send" id="chatSend" aria-label="Send">',
          '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M14 8L2 2l2 6-2 6 12-6z" fill="currentColor"/></svg>',
        '</button>',
      '</div>'
    ].join('');

    var messages      = document.getElementById('chatMessages');
    var promptsEl     = document.getElementById('chatPrompts');
    var input         = document.getElementById('chatInput');
    var sendBtn       = document.getElementById('chatSend');
    var promptsHidden = false;

    addBotMessage(messages, "Hey, I'm Yashvi. Feel free to ask me about my work, projects, experiences, or anything else.");

    promptsEl.querySelectorAll('.chat-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        handleUserMessage(chip.getAttribute('data-prompt'));
      });
    });

    sendBtn.addEventListener('click', function () {
      var text = input.value.trim();
      if (!text) return;
      input.value = '';
      handleUserMessage(text);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var text = input.value.trim();
        if (!text) return;
        input.value = '';
        handleUserMessage(text);
      }
    });

    function handleUserMessage(text) {
      if (!promptsHidden) {
        promptsEl.style.display = 'none';
        promptsHidden = true;
      }
      addUserMessage(messages, text);
      showTyping(messages, function (typingEl) {
        var answer = respond(text);
        typingEl.remove();
        addBotMessage(messages, answer);
      });
    }
  }

  function addUserMessage(container, text) {
    var div = document.createElement('div');
    div.className = 'chat-msg chat-msg-user';
    div.innerHTML = '<div class="chat-bubble chat-bubble-user">' + escHtml(text) + '</div>';
    container.appendChild(div);
    scrollBottom(container);
  }

  function addBotMessage(container, text) {
    var div = document.createElement('div');
    div.className = 'chat-msg chat-msg-bot';
    div.innerHTML = '<div class="chat-bubble chat-bubble-bot">' + fmtText(text) + '</div>';
    container.appendChild(div);
    scrollBottom(container);
  }

  function showTyping(container, callback) {
    var div = document.createElement('div');
    div.className = 'chat-msg chat-msg-bot';
    div.innerHTML = '<div class="chat-bubble chat-bubble-bot chat-typing"><span></span><span></span><span></span></div>';
    container.appendChild(div);
    scrollBottom(container);
    setTimeout(function () { callback(div); }, 580 + Math.random() * 520);
  }

  function scrollBottom(el) { el.scrollTop = el.scrollHeight; }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtText(str) {
    return str.replace(/\n/g, '<br>');
  }

  document.addEventListener('DOMContentLoaded', createChat);

})();
