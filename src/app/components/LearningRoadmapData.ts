// Comprehensive course data for all career paths
// This file contains all learning roadmap data organized by career path

export interface Course {
  id: string;
  title: string;
  duration: string;
  skills: string[];
  status: 'completed' | 'in-progress' | 'locked' | 'available';
  progress?: number;
  resources?: {
    videos: number;
    articles: number;
    projects: number;
    quizzes: number;
  };
  instructor?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
}

export type CareerPathCourses = {
  beginner: Course[];
  intermediate: Course[];
  pro: Course[];
};

export type CareerPathMilestones = Milestone[];

export const milestonesData: Record<string, CareerPathMilestones> = {
  'Software Engineer': [
    { id: 'se-m1', title: 'Complete Beginner Track', description: 'Finish all foundational programming courses', completed: true, progress: 100 },
    { id: 'se-m2', title: 'Build First Full-Stack App', description: 'Create a complete web application', completed: false, progress: 45 },
    { id: 'se-m3', title: 'Master Data Structures & Algorithms', description: 'Complete intermediate DSA track', completed: false, progress: 0 },
    { id: 'se-m4', title: 'Get AWS Certified', description: 'Obtain AWS Solutions Architect certification', completed: false, progress: 0 }
  ],
  'Product Manager': [
    { id: 'pm-m1', title: 'Complete Beginner Track', description: 'Finish all product fundamentals courses', completed: true, progress: 100 },
    { id: 'pm-m2', title: 'Launch First Product Feature', description: 'Ship a real product feature end-to-end', completed: false, progress: 30 },
    { id: 'pm-m3', title: 'Master Product Analytics', description: 'Complete advanced analytics track', completed: false, progress: 0 },
    { id: 'pm-m4', title: 'Get PM Certified', description: 'Obtain Product Management Professional certification', completed: false, progress: 0 }
  ],
  'AI/ML Engineer': [
    { id: 'ai-m1', title: 'Complete Python & ML Foundations', description: 'Master programming and ML basics', completed: true, progress: 100 },
    { id: 'ai-m2', title: 'Build ML Model Portfolio', description: 'Create 3 production-ready ML models', completed: false, progress: 40 },
    { id: 'ai-m3', title: 'Master Deep Learning', description: 'Complete neural networks and deep learning track', completed: false, progress: 0 },
    { id: 'ai-m4', title: 'Get TensorFlow Certified', description: 'Obtain TensorFlow Developer certification', completed: false, progress: 0 }
  ],
  'QA Engineer': [
    { id: 'qa-m1', title: 'Complete Testing Fundamentals', description: 'Master manual and automated testing basics', completed: true, progress: 100 },
    { id: 'qa-m2', title: 'Build Test Automation Framework', description: 'Create comprehensive test suite', completed: false, progress: 35 },
    { id: 'qa-m3', title: 'Master CI/CD Testing', description: 'Complete DevOps and automation track', completed: false, progress: 0 },
    { id: 'qa-m4', title: 'Get ISTQB Certified', description: 'Obtain ISTQB Advanced Level certification', completed: false, progress: 0 }
  ],
  'Gemini AI Developer': [
    { id: 'gem-m1', title: 'Complete Gemini Basics', description: 'Master Gemini API fundamentals', completed: true, progress: 100 },
    { id: 'gem-m2', title: 'Build 3 Gemini Applications', description: 'Create production Gemini-powered apps', completed: false, progress: 50 },
    { id: 'gem-m3', title: 'Master Advanced Prompting', description: 'Complete prompt engineering mastery', completed: false, progress: 0 },
    { id: 'gem-m4', title: 'Get Google AI Certified', description: 'Obtain Google Cloud AI certification', completed: false, progress: 0 }
  ],
  'AI-Assisted Developer': [
    { id: 'aiad-m1', title: 'Complete Vibe Coding Basics', description: 'Master AI-assisted development fundamentals', completed: true, progress: 100 },
    { id: 'aiad-m2', title: 'Build Apps with AI Tools', description: 'Create 5 projects using AI coding assistants', completed: false, progress: 55 },
    { id: 'aiad-m3', title: 'Master Production Deployment', description: 'Complete Cloud Run deployment track', completed: false, progress: 0 },
    { id: 'aiad-m4', title: 'Become AI Tools Expert', description: 'Master all major AI development platforms', completed: false, progress: 0 }
  ],
  'Cloud Run & Serverless Developer': [
    { id: 'cloud-m1', title: 'Complete Cloud Fundamentals', description: 'Master cloud architecture basics', completed: true, progress: 100 },
    { id: 'cloud-m2', title: 'Deploy 5 Serverless Apps', description: 'Ship production Cloud Run applications', completed: false, progress: 42 },
    { id: 'cloud-m3', title: 'Master Container Orchestration', description: 'Complete advanced Kubernetes track', completed: false, progress: 0 },
    { id: 'cloud-m4', title: 'Get Google Cloud Certified', description: 'Obtain GCP Professional certification', completed: false, progress: 0 }
  ]
};

export const coursesData: Record<string, CareerPathCourses> = {
  'Software Engineer': {
    beginner: [
      { 
        id: 'se-b1', 
        title: 'Programming Fundamentals with Python', 
        duration: '4 weeks', 
        skills: ['Variables', 'Data Types', 'Control Flow', 'Functions'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 25, articles: 15, projects: 8, quizzes: 12 },
        instructor: 'John Smith, Senior SWE at Meta'
      },
      { 
        id: 'se-b2', 
        title: 'Data Structures & Algorithms', 
        duration: '6 weeks', 
        skills: ['Arrays', 'LinkedLists', 'Trees', 'Sorting', 'Searching'], 
        status: 'in-progress', 
        progress: 45,
        resources: { videos: 30, articles: 20, projects: 10, quizzes: 15 },
        instructor: 'Priya Sharma, Algorithms Expert'
      },
      { 
        id: 'se-b3', 
        title: 'Object-Oriented Programming', 
        duration: '4 weeks', 
        skills: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'], 
        status: 'available',
        resources: { videos: 22, articles: 14, projects: 7, quizzes: 10 },
        instructor: 'Tom Williams, Software Architect'
      },
      { 
        id: 'se-b4', 
        title: 'Version Control with Git', 
        duration: '2 weeks', 
        skills: ['Git Basics', 'Branching', 'Merging', 'GitHub'], 
        status: 'locked',
        resources: { videos: 12, articles: 8, projects: 4, quizzes: 6 },
        instructor: 'Maria Garcia, DevOps Lead'
      },
    ],
    intermediate: [
      { 
        id: 'se-i1', 
        title: 'Full Stack Web Development', 
        duration: '8 weeks', 
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'], 
        status: 'locked',
        resources: { videos: 40, articles: 25, projects: 12, quizzes: 18 },
        instructor: 'Kevin Chen, Full Stack Engineer'
      },
      { 
        id: 'se-i2', 
        title: 'Database Design & SQL', 
        duration: '4 weeks', 
        skills: ['Relational Databases', 'SQL', 'Schema Design', 'Optimization'], 
        status: 'locked',
        resources: { videos: 20, articles: 15, projects: 6, quizzes: 10 },
        instructor: 'Rachel Adams, Database Specialist'
      },
      { 
        id: 'se-i3', 
        title: 'System Design Fundamentals', 
        duration: '5 weeks', 
        skills: ['Scalability', 'Load Balancing', 'Caching', 'Microservices'], 
        status: 'locked',
        resources: { videos: 28, articles: 18, projects: 8, quizzes: 12 },
        instructor: 'Daniel Lee, Systems Architect'
      },
      { 
        id: 'se-i4', 
        title: 'Testing & Quality Assurance', 
        duration: '3 weeks', 
        skills: ['Unit Testing', 'Integration Testing', 'TDD', 'Jest'], 
        status: 'locked',
        resources: { videos: 18, articles: 12, projects: 6, quizzes: 8 },
        instructor: 'Sophie Martin, QA Engineer'
      },
    ],
    pro: [
      { 
        id: 'se-p1', 
        title: 'Advanced System Design', 
        duration: '6 weeks', 
        skills: ['Distributed Systems', 'CAP Theorem', 'Consistency', 'Availability'], 
        status: 'locked',
        resources: { videos: 32, articles: 22, projects: 10, quizzes: 15 },
        instructor: 'Robert Zhang, Principal Engineer'
      },
      { 
        id: 'se-p2', 
        title: 'Cloud Architecture & DevOps', 
        duration: '5 weeks', 
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'], 
        status: 'locked',
        resources: { videos: 30, articles: 20, projects: 9, quizzes: 14 },
        instructor: 'Nina Patel, Cloud Architect'
      },
      { 
        id: 'se-p3', 
        title: 'Performance Optimization', 
        duration: '4 weeks', 
        skills: ['Profiling', 'Memory Management', 'Concurrency', 'Async Programming'], 
        status: 'locked',
        resources: { videos: 24, articles: 16, projects: 7, quizzes: 11 },
        instructor: 'Alex Turner, Performance Engineer'
      },
    ],
  },
  
  'Product Manager': {
    beginner: [
      { 
        id: 'pm-b1', 
        title: 'Introduction to Product Management', 
        duration: '2 weeks', 
        skills: ['Product Basics', 'User Research', 'Product Lifecycle'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 12, articles: 8, projects: 3, quizzes: 5 },
        instructor: 'Sarah Chen, Senior PM at Google'
      },
      { 
        id: 'pm-b2', 
        title: 'Understanding User Needs', 
        duration: '3 weeks', 
        skills: ['User Interviews', 'Surveys', 'Personas', 'Journey Mapping'], 
        status: 'in-progress', 
        progress: 60,
        resources: { videos: 15, articles: 10, projects: 4, quizzes: 7 },
        instructor: 'Mike Rodriguez, UX Research Lead'
      },
      { 
        id: 'pm-b3', 
        title: 'Product Strategy & Roadmapping', 
        duration: '3 weeks', 
        skills: ['Vision', 'Strategy', 'OKRs', 'Roadmap Planning'], 
        status: 'available',
        resources: { videos: 18, articles: 12, projects: 5, quizzes: 8 },
        instructor: 'Jennifer Liu, Product Strategy Director'
      },
      { 
        id: 'pm-b4', 
        title: 'Agile & Scrum for PMs', 
        duration: '2 weeks', 
        skills: ['Scrum Framework', 'Sprint Planning', 'User Stories', 'Backlog'], 
        status: 'locked',
        resources: { videos: 14, articles: 9, projects: 4, quizzes: 6 },
        instructor: 'David Kim, Agile Coach'
      },
    ],
    intermediate: [
      { 
        id: 'pm-i1', 
        title: 'Product Analytics & Metrics', 
        duration: '4 weeks', 
        skills: ['KPIs', 'A/B Testing', 'Funnels', 'Cohort Analysis'], 
        status: 'locked',
        resources: { videos: 20, articles: 14, projects: 6, quizzes: 10 },
        instructor: 'Lisa Wong, Data-Driven PM'
      },
      { 
        id: 'pm-i2', 
        title: 'Stakeholder Management', 
        duration: '3 weeks', 
        skills: ['Communication', 'Influence', 'Negotiation', 'Presentations'], 
        status: 'locked',
        resources: { videos: 16, articles: 11, projects: 5, quizzes: 7 },
        instructor: 'Tom Harrison, VP of Product'
      },
      { 
        id: 'pm-i3', 
        title: 'Go-to-Market Strategy', 
        duration: '4 weeks', 
        skills: ['Launch Planning', 'Positioning', 'Marketing', 'Pricing'], 
        status: 'locked',
        resources: { videos: 19, articles: 13, projects: 6, quizzes: 9 },
        instructor: 'Emma Thompson, GTM Expert'
      },
      { 
        id: 'pm-i4', 
        title: 'Technical Skills for PMs', 
        duration: '5 weeks', 
        skills: ['APIs', 'Databases', 'System Architecture', 'Technical Tradeoffs'], 
        status: 'locked',
        resources: { videos: 22, articles: 15, projects: 7, quizzes: 10 },
        instructor: 'Carlos Martinez, Technical PM'
      },
    ],
    pro: [
      { 
        id: 'pm-p1', 
        title: 'Product Leadership', 
        duration: '5 weeks', 
        skills: ['Team Building', 'Mentoring', 'Vision Setting', 'Portfolio Management'], 
        status: 'locked',
        resources: { videos: 20, articles: 14, projects: 6, quizzes: 9 },
        instructor: 'Rachel Green, CPO at Airbnb'
      },
      { 
        id: 'pm-p2', 
        title: 'Strategic Decision Making', 
        duration: '4 weeks', 
        skills: ['Business Model', 'Growth Strategy', 'P&L Management'], 
        status: 'locked',
        resources: { videos: 18, articles: 13, projects: 5, quizzes: 7 },
        instructor: 'Amanda Foster, CPO at Stripe'
      },
      { 
        id: 'pm-p3', 
        title: 'Scaling Products', 
        duration: '5 weeks', 
        skills: ['Platform Strategy', 'Monetization', 'International Expansion'], 
        status: 'locked',
        resources: { videos: 24, articles: 17, projects: 6, quizzes: 10 },
        instructor: 'Chris Evans, Scale-up Specialist'
      },
    ],
  },

  'QA Engineer': {
    beginner: [
      { 
        id: 'qa-b1', 
        title: 'Introduction to Software Testing', 
        duration: '2 weeks', 
        skills: ['Testing Basics', 'Test Types', 'Bug Reporting', 'QA Process'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 14, articles: 10, projects: 4, quizzes: 6 },
        instructor: 'Anna Martinez, QA Lead at Microsoft'
      },
      { 
        id: 'qa-b2', 
        title: 'Manual Testing Fundamentals', 
        duration: '3 weeks', 
        skills: ['Test Cases', 'Test Plans', 'Exploratory Testing', 'Regression Testing'], 
        status: 'in-progress', 
        progress: 55,
        resources: { videos: 16, articles: 12, projects: 5, quizzes: 8 },
        instructor: 'James Wilson, Senior QA Engineer'
      },
      { 
        id: 'qa-b3', 
        title: 'Web Testing Essentials', 
        duration: '3 weeks', 
        skills: ['Browser Testing', 'Cross-browser', 'Responsive Testing', 'DevTools'], 
        status: 'available',
        resources: { videos: 18, articles: 13, projects: 6, quizzes: 9 },
        instructor: 'Sophie Anderson, Web QA Specialist'
      },
      { 
        id: 'qa-b4', 
        title: 'Introduction to Test Automation', 
        duration: '2 weeks', 
        skills: ['Automation Basics', 'Selenium', 'First Script', 'Best Practices'], 
        status: 'locked',
        resources: { videos: 15, articles: 11, projects: 5, quizzes: 7 },
        instructor: 'Ryan Chen, Automation Expert'
      },
    ],
    intermediate: [
      { 
        id: 'qa-i1', 
        title: 'Advanced Selenium Automation', 
        duration: '5 weeks', 
        skills: ['Page Object Model', 'Frameworks', 'Data-Driven', 'Reports'], 
        status: 'locked',
        resources: { videos: 24, articles: 16, projects: 8, quizzes: 12 },
        instructor: 'Maria Garcia, Test Architect'
      },
      { 
        id: 'qa-i2', 
        title: 'API Testing with Postman', 
        duration: '4 weeks', 
        skills: ['REST APIs', 'Postman', 'Newman', 'API Automation'], 
        status: 'locked',
        resources: { videos: 20, articles: 14, projects: 7, quizzes: 10 },
        instructor: 'Kevin Park, API Testing Lead'
      },
      { 
        id: 'qa-i3', 
        title: 'Performance Testing Fundamentals', 
        duration: '4 weeks', 
        skills: ['JMeter', 'Load Testing', 'Stress Testing', 'Performance Metrics'], 
        status: 'locked',
        resources: { videos: 22, articles: 15, projects: 6, quizzes: 9 },
        instructor: 'David Lee, Performance Engineer'
      },
      { 
        id: 'qa-i4', 
        title: 'Mobile App Testing', 
        duration: '4 weeks', 
        skills: ['iOS Testing', 'Android Testing', 'Appium', 'Mobile Automation'], 
        status: 'locked',
        resources: { videos: 21, articles: 14, projects: 7, quizzes: 10 },
        instructor: 'Lisa Wang, Mobile QA Lead'
      },
    ],
    pro: [
      { 
        id: 'qa-p1', 
        title: 'Test Strategy & Planning', 
        duration: '4 weeks', 
        skills: ['Test Strategy', 'Risk Management', 'Quality Metrics', 'CI/CD Integration'], 
        status: 'locked',
        resources: { videos: 18, articles: 13, projects: 5, quizzes: 8 },
        instructor: 'Robert Brown, QA Manager'
      },
      { 
        id: 'qa-p2', 
        title: 'Advanced CI/CD & DevOps for QA', 
        duration: '5 weeks', 
        skills: ['Jenkins', 'GitHub Actions', 'Docker', 'Test Pipelines'], 
        status: 'locked',
        resources: { videos: 25, articles: 17, projects: 8, quizzes: 11 },
        instructor: 'Nina Patel, DevOps QA Specialist'
      },
      { 
        id: 'qa-p3', 
        title: 'Security & Penetration Testing', 
        duration: '5 weeks', 
        skills: ['OWASP', 'Security Testing', 'Vulnerability Assessment', 'Pen Testing'], 
        status: 'locked',
        resources: { videos: 23, articles: 16, projects: 7, quizzes: 10 },
        instructor: 'Alex Turner, Security QA Expert'
      },
    ],
  },

  'AI/ML Engineer': {
    beginner: [
      { 
        id: 'aiml-b1', 
        title: 'Introduction to Machine Learning', 
        duration: '4 weeks', 
        skills: ['ML Basics', 'Supervised Learning', 'Unsupervised Learning', 'Python'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 28, articles: 18, projects: 9, quizzes: 14 },
        instructor: 'Dr. Sarah Johnson, ML Researcher at Google'
      },
      { 
        id: 'aiml-b2', 
        title: 'Python for Data Science', 
        duration: '3 weeks', 
        skills: ['NumPy', 'Pandas', 'Matplotlib', 'Data Wrangling'], 
        status: 'in-progress', 
        progress: 50,
        resources: { videos: 22, articles: 15, projects: 7, quizzes: 11 },
        instructor: 'Michael Chen, Data Science Lead'
      },
      { 
        id: 'aiml-b3', 
        title: 'Statistics & Probability for ML', 
        duration: '4 weeks', 
        skills: ['Probability', 'Statistics', 'Distributions', 'Hypothesis Testing'], 
        status: 'available',
        resources: { videos: 25, articles: 17, projects: 8, quizzes: 12 },
        instructor: 'Dr. Emily Watson, Statistics Professor'
      },
      { 
        id: 'aiml-b4', 
        title: 'Intro to Neural Networks', 
        duration: '3 weeks', 
        skills: ['Perceptrons', 'Backpropagation', 'Activation Functions', 'TensorFlow Basics'], 
        status: 'locked',
        resources: { videos: 20, articles: 14, projects: 6, quizzes: 10 },
        instructor: 'Kevin Park, Deep Learning Engineer'
      },
    ],
    intermediate: [
      { 
        id: 'aiml-i1', 
        title: 'Deep Learning with TensorFlow', 
        duration: '6 weeks', 
        skills: ['CNNs', 'RNNs', 'Transfer Learning', 'Model Training'], 
        status: 'locked',
        resources: { videos: 35, articles: 22, projects: 11, quizzes: 17 },
        instructor: 'Dr. Priya Sharma, AI Research Scientist'
      },
      { 
        id: 'aiml-i2', 
        title: 'Natural Language Processing', 
        duration: '5 weeks', 
        skills: ['Tokenization', 'Word Embeddings', 'Transformers', 'BERT'], 
        status: 'locked',
        resources: { videos: 30, articles: 20, projects: 10, quizzes: 15 },
        instructor: 'David Lee, NLP Expert'
      },
      { 
        id: 'aiml-i3', 
        title: 'Computer Vision', 
        duration: '5 weeks', 
        skills: ['Image Processing', 'Object Detection', 'YOLO', 'Segmentation'], 
        status: 'locked',
        resources: { videos: 32, articles: 21, projects: 10, quizzes: 16 },
        instructor: 'Rachel Adams, Computer Vision Specialist'
      },
      { 
        id: 'aiml-i4', 
        title: 'ML Model Deployment', 
        duration: '4 weeks', 
        skills: ['Flask APIs', 'Docker', 'Cloud Deployment', 'MLOps'], 
        status: 'locked',
        resources: { videos: 26, articles: 18, projects: 8, quizzes: 13 },
        instructor: 'Tom Williams, MLOps Engineer'
      },
    ],
    pro: [
      { 
        id: 'aiml-p1', 
        title: 'Advanced Deep Learning', 
        duration: '7 weeks', 
        skills: ['GANs', 'Attention Mechanisms', 'Reinforcement Learning', 'Custom Architectures'], 
        status: 'locked',
        resources: { videos: 40, articles: 26, projects: 13, quizzes: 20 },
        instructor: 'Dr. Robert Zhang, AI Research Lead'
      },
      { 
        id: 'aiml-p2', 
        title: 'Large Language Models', 
        duration: '6 weeks', 
        skills: ['GPT', 'LLM Fine-tuning', 'Prompt Engineering', 'RAG Systems'], 
        status: 'locked',
        resources: { videos: 35, articles: 24, projects: 12, quizzes: 18 },
        instructor: 'Dr. Nina Patel, LLM Researcher'
      },
      { 
        id: 'aiml-p3', 
        title: 'AI Ethics & Responsible AI', 
        duration: '4 weeks', 
        skills: ['Bias Detection', 'Fairness', 'Explainability', 'AI Governance'], 
        status: 'locked',
        resources: { videos: 22, articles: 16, projects: 6, quizzes: 10 },
        instructor: 'Dr. Emma Thompson, AI Ethics Expert'
      },
    ],
  },

  'Gemini AI Developer': {
    beginner: [
      { 
        id: 'gem-b1', 
        title: 'Getting Started with Gemini CLI', 
        duration: '2 weeks', 
        skills: ['Gemini CLI Setup', 'Basic Commands', 'API Keys', 'Authentication'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 15, articles: 10, projects: 4, quizzes: 6 },
        instructor: 'Alex Rivera, Google AI Developer Advocate'
      },
      { 
        id: 'gem-b2', 
        title: 'Gemini API Fundamentals', 
        duration: '3 weeks', 
        skills: ['REST API', 'Gemini Models', 'Text Generation', 'API Integration'], 
        status: 'in-progress', 
        progress: 45,
        resources: { videos: 18, articles: 12, projects: 5, quizzes: 8 },
        instructor: 'Dr. Priya Sharma, AI Solutions Architect'
      },
      { 
        id: 'gem-b3', 
        title: 'Prompt Engineering with Gemini', 
        duration: '3 weeks', 
        skills: ['Prompt Design', 'Few-shot Learning', 'Context Management', 'Temperature'], 
        status: 'available',
        resources: { videos: 20, articles: 14, projects: 6, quizzes: 9 },
        instructor: 'Maya Chen, Prompt Engineering Expert'
      },
      { 
        id: 'gem-b4', 
        title: 'Building Your First Gemini App', 
        duration: '2 weeks', 
        skills: ['Python SDK', 'Node.js SDK', 'Error Handling', 'Rate Limits'], 
        status: 'locked',
        resources: { videos: 16, articles: 11, projects: 5, quizzes: 7 },
        instructor: 'Kevin Park, Full Stack AI Developer'
      },
    ],
    intermediate: [
      { 
        id: 'gem-i1', 
        title: 'Advanced Gemini API Features', 
        duration: '4 weeks', 
        skills: ['Multimodal Input', 'Vision with Gemini', 'Function Calling', 'Streaming'], 
        status: 'locked',
        resources: { videos: 24, articles: 16, projects: 8, quizzes: 12 },
        instructor: 'Sarah Johnson, Senior AI Engineer at Google'
      },
      { 
        id: 'gem-i2', 
        title: 'Gemini with Vertex AI', 
        duration: '4 weeks', 
        skills: ['Vertex AI Platform', 'Model Tuning', 'Evaluation', 'Production Deployment'], 
        status: 'locked',
        resources: { videos: 22, articles: 15, projects: 7, quizzes: 11 },
        instructor: 'David Lee, Cloud AI Specialist'
      },
      { 
        id: 'gem-i3', 
        title: 'RAG with Gemini & Vector Databases', 
        duration: '5 weeks', 
        skills: ['Vector Search', 'Embeddings', 'Pinecone', 'ChromaDB', 'Context Retrieval'], 
        status: 'locked',
        resources: { videos: 26, articles: 17, projects: 9, quizzes: 13 },
        instructor: 'Rachel Adams, RAG Systems Expert'
      },
      { 
        id: 'gem-i4', 
        title: 'Building Production Gemini Apps', 
        duration: '4 weeks', 
        skills: ['Scalability', 'Caching', 'Monitoring', 'Cost Optimization'], 
        status: 'locked',
        resources: { videos: 21, articles: 14, projects: 7, quizzes: 10 },
        instructor: 'Tom Williams, Production AI Engineer'
      },
    ],
    pro: [
      { 
        id: 'gem-p1', 
        title: 'Advanced Multimodal AI Applications', 
        duration: '6 weeks', 
        skills: ['Image+Text', 'Video Analysis', 'Audio Processing', 'Complex Workflows'], 
        status: 'locked',
        resources: { videos: 30, articles: 20, projects: 11, quizzes: 16 },
        instructor: 'Dr. Robert Zhang, Multimodal AI Researcher'
      },
      { 
        id: 'gem-p2', 
        title: 'Enterprise Gemini Solutions', 
        duration: '5 weeks', 
        skills: ['Security', 'Compliance', 'Data Privacy', 'Enterprise Integration'], 
        status: 'locked',
        resources: { videos: 25, articles: 18, projects: 8, quizzes: 13 },
        instructor: 'Nina Patel, Enterprise AI Architect'
      },
      { 
        id: 'gem-p3', 
        title: 'Custom AI Agents with Gemini', 
        duration: '6 weeks', 
        skills: ['Agent Design', 'Tool Use', 'Memory Systems', 'Multi-step Reasoning'], 
        status: 'locked',
        resources: { videos: 32, articles: 22, projects: 12, quizzes: 18 },
        instructor: 'Dr. Emma Thompson, AI Agent Specialist'
      },
    ],
  },

  'AI-Assisted Developer': {
    beginner: [
      { 
        id: 'aiad-b1', 
        title: 'Introduction to AI Coding Tools', 
        duration: '2 weeks', 
        skills: ['GitHub Copilot', 'Cursor Basics', 'AI Autocomplete', 'Tool Setup'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 14, articles: 10, projects: 5, quizzes: 7 },
        instructor: 'Jake Morrison, Developer Advocate at GitHub'
      },
      { 
        id: 'aiad-b2', 
        title: 'Effective Prompt Engineering for Coding', 
        duration: '3 weeks', 
        skills: ['Code Prompts', 'Context', 'Iteration', 'Best Practices'], 
        status: 'in-progress', 
        progress: 40,
        resources: { videos: 16, articles: 11, projects: 6, quizzes: 8 },
        instructor: 'Maya Chen, AI Coding Expert'
      },
      { 
        id: 'aiad-b3', 
        title: 'Building UIs with v0 and AI Tools', 
        duration: '3 weeks', 
        skills: ['v0.dev', 'Vibe', 'Component Generation', 'Rapid Prototyping'], 
        status: 'available',
        resources: { videos: 18, articles: 12, projects: 7, quizzes: 9 },
        instructor: 'Sarah Kim, Frontend AI Developer'
      },
      { 
        id: 'aiad-b4', 
        title: 'AI-Assisted Debugging & Testing', 
        duration: '2 weeks', 
        skills: ['AI Debugging', 'Test Generation', 'Code Review', 'Error Fixing'], 
        status: 'locked',
        resources: { videos: 15, articles: 10, projects: 5, quizzes: 7 },
        instructor: 'Tom Rodriguez, QA Engineer'
      },
    ],
    intermediate: [
      { 
        id: 'aiad-i1', 
        title: 'Full Stack Development with AI', 
        duration: '6 weeks', 
        skills: ['Frontend + AI', 'Backend + AI', 'Database Design', 'API Generation'], 
        status: 'locked',
        resources: { videos: 28, articles: 18, projects: 10, quizzes: 14 },
        instructor: 'Kevin Park, Full Stack AI Dev'
      },
      { 
        id: 'aiad-i2', 
        title: 'Advanced Cursor & AI IDEs', 
        duration: '4 weeks', 
        skills: ['Cursor Advanced', 'Custom Rules', 'AI Refactoring', 'Team Workflows'], 
        status: 'locked',
        resources: { videos: 22, articles: 15, projects: 8, quizzes: 11 },
        instructor: 'David Lee, IDE Expert'
      },
      { 
        id: 'aiad-i3', 
        title: 'AI-Powered Code Architecture', 
        duration: '4 weeks', 
        skills: ['System Design with AI', 'Code Organization', 'Scalable Patterns'], 
        status: 'locked',
        resources: { videos: 24, articles: 16, projects: 9, quizzes: 12 },
        instructor: 'Rachel Adams, Software Architect'
      },
      { 
        id: 'aiad-i4', 
        title: 'Shipping Products Fast with AI', 
        duration: '5 weeks', 
        skills: ['Rapid Development', 'MVP Building', 'Deployment', 'Iteration'], 
        status: 'locked',
        resources: { videos: 26, articles: 17, projects: 10, quizzes: 13 },
        instructor: 'Emma Wilson, Product Engineer'
      },
    ],
    pro: [
      { 
        id: 'aiad-p1', 
        title: 'Building AI-Native Applications', 
        duration: '6 weeks', 
        skills: ['AI-First Design', 'LLM Integration', 'Vector Databases', 'AI UX'], 
        status: 'locked',
        resources: { videos: 32, articles: 21, projects: 12, quizzes: 17 },
        instructor: 'Dr. Robert Zhang, AI Application Architect'
      },
      { 
        id: 'aiad-p2', 
        title: 'Custom AI Tooling & Workflows', 
        duration: '5 weeks', 
        skills: ['Custom Tools', 'Automation', 'CLI Tools', 'Team Productivity'], 
        status: 'locked',
        resources: { videos: 28, articles: 19, projects: 10, quizzes: 14 },
        instructor: 'Nina Patel, DevX Engineer'
      },
      { 
        id: 'aiad-p3', 
        title: 'AI-Assisted System Optimization', 
        duration: '5 weeks', 
        skills: ['Performance', 'Security', 'Code Quality', 'Best Practices'], 
        status: 'locked',
        resources: { videos: 26, articles: 18, projects: 9, quizzes: 13 },
        instructor: 'Alex Turner, Senior Engineer'
      },
    ],
  },

  'Cloud Run & Serverless Developer': {
    beginner: [
      { 
        id: 'cr-b1', 
        title: 'Introduction to Cloud Run', 
        duration: '2 weeks', 
        skills: ['Cloud Run Basics', 'Containers', 'GCP Setup', 'First Deployment'], 
        status: 'completed', 
        progress: 100,
        resources: { videos: 16, articles: 11, projects: 5, quizzes: 7 },
        instructor: 'Alex Rivera, Google Cloud Developer Advocate'
      },
      { 
        id: 'cr-b2', 
        title: 'Docker for Serverless', 
        duration: '3 weeks', 
        skills: ['Docker Basics', 'Dockerfiles', 'Container Images', 'Optimization'], 
        status: 'in-progress', 
        progress: 50,
        resources: { videos: 20, articles: 13, projects: 6, quizzes: 9 },
        instructor: 'Maria Garcia, DevOps Engineer'
      },
      { 
        id: 'cr-b3', 
        title: 'Building APIs with Cloud Run', 
        duration: '4 weeks', 
        skills: ['REST APIs', 'FastAPI', 'Node.js', 'API Design'], 
        status: 'available',
        resources: { videos: 22, articles: 15, projects: 8, quizzes: 11 },
        instructor: 'Kevin Park, Backend Developer'
      },
      { 
        id: 'cr-b4', 
        title: 'Cloud Run Configuration & Secrets', 
        duration: '2 weeks', 
        skills: ['Environment Vars', 'Secret Manager', 'Config', 'Security'], 
        status: 'locked',
        resources: { videos: 14, articles: 10, projects: 5, quizzes: 7 },
        instructor: 'Sarah Kim, Cloud Security Specialist'
      },
    ],
    intermediate: [
      { 
        id: 'cr-i1', 
        title: 'Serverless Architecture Patterns', 
        duration: '5 weeks', 
        skills: ['Microservices', 'Event-Driven', 'Service Mesh', 'Architecture'], 
        status: 'locked',
        resources: { videos: 26, articles: 17, projects: 9, quizzes: 13 },
        instructor: 'David Lee, Cloud Architect'
      },
      { 
        id: 'cr-i2', 
        title: 'Cloud Run with Databases', 
        duration: '4 weeks', 
        skills: ['Cloud SQL', 'Firestore', 'Redis', 'Connection Pooling'], 
        status: 'locked',
        resources: { videos: 24, articles: 16, projects: 8, quizzes: 12 },
        instructor: 'Rachel Adams, Database Engineer'
      },
      { 
        id: 'cr-i3', 
        title: 'CI/CD for Cloud Run', 
        duration: '4 weeks', 
        skills: ['Cloud Build', 'GitHub Actions', 'Automated Deploy', 'Testing'], 
        status: 'locked',
        resources: { videos: 22, articles: 15, projects: 7, quizzes: 10 },
        instructor: 'Tom Williams, DevOps Lead'
      },
      { 
        id: 'cr-i4', 
        title: 'Monitoring & Observability', 
        duration: '3 weeks', 
        skills: ['Cloud Logging', 'Cloud Monitoring', 'Traces', 'Alerts'], 
        status: 'locked',
        resources: { videos: 20, articles: 14, projects: 6, quizzes: 9 },
        instructor: 'Emma Thompson, SRE'
      },
    ],
    pro: [
      { 
        id: 'cr-p1', 
        title: 'Advanced Cloud Run Scaling', 
        duration: '5 weeks', 
        skills: ['Auto-scaling', 'Performance', 'Concurrency', 'Optimization'], 
        status: 'locked',
        resources: { videos: 28, articles: 19, projects: 10, quizzes: 14 },
        instructor: 'Dr. Robert Zhang, Performance Engineer'
      },
      { 
        id: 'cr-p2', 
        title: 'Multi-Cloud Serverless', 
        duration: '6 weeks', 
        skills: ['AWS Lambda', 'Azure Functions', 'Multi-cloud', 'Portability'], 
        status: 'locked',
        resources: { videos: 30, articles: 20, projects: 11, quizzes: 16 },
        instructor: 'Nina Patel, Cloud Architect'
      },
      { 
        id: 'cr-p3', 
        title: 'Enterprise Serverless Solutions', 
        duration: '5 weeks', 
        skills: ['VPC', 'Security', 'Compliance', 'Cost Optimization'], 
        status: 'locked',
        resources: { videos: 26, articles: 18, projects: 9, quizzes: 13 },
        instructor: 'Alex Turner, Enterprise Cloud Lead'
      },
    ],
  },
};