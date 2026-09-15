import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Sparkles, Send, ArrowLeft, Lightbulb } from 'lucide-react';
import type { Page, UserProfile } from '../App';
import UserMenu from './UserMenu';

interface CareerChatAssistantProps {
  onNavigate: (page: Page, careerPath?: string, showLoading?: boolean) => void;
  userProfile: UserProfile | null;
  onCareerPathSelect: (careerPath: string) => void;
  onLogout?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  careerOptions?: CareerOption[];
}

interface CareerOption {
  title: string;
  description: string;
  track: string;
}

export default function CareerChatAssistant({ onNavigate, userProfile, onCareerPathSelect, onLogout }: CareerChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: userProfile 
        ? `Hi ${userProfile.name}! 👋 I'm your AI Career Mentor. I see you're interested in ${userProfile.interests.join(', ')}. I'm here to help you discover the perfect career path. What aspects of work are you most passionate about?`
        : "Hi! 👋 I'm your AI Career Mentor. I'm here to help you discover the perfect career path based on your interests and goals. Tell me about yourself - what are you passionate about?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRoadmapButton, setShowRoadmapButton] = useState(false);
  const [detectedCareerPath, setDetectedCareerPath] = useState<string>('Product Manager');
  const [selectedCareerOption, setSelectedCareerOption] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "I'm interested in building software and coding",
    "I want to manage products and work with tech teams",
    "I enjoy testing and ensuring quality",
    "I'm passionate about AI and machine learning",
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      generateAIResponse(content);
    }, 1500);
  };

  const handleCareerOptionSelect = (option: CareerOption) => {
    // Send user's selection as a message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: `I want to become a ${option.title}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setSelectedCareerOption(option.title);
    setDetectedCareerPath(option.track);
    setIsTyping(true);

    // Generate confirmation response
    setTimeout(() => {
      const confirmationResponse = `Excellent choice! 🎉 ${option.title} is a fantastic path. ${option.description}.\n\nI'll create a personalized learning roadmap tailored to help you become a ${option.title}. Your roadmap will include:\n\n✅ Beginner courses to build foundational skills\n✅ Intermediate courses to deepen your expertise\n✅ Pro-level courses for advanced mastery\n✅ Hands-on projects and real-world resources\n\nReady to start your journey? Click "Generate My Roadmap" below!`;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: confirmationResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setShowRoadmapButton(true);
    }, 1200);
  };

  const generateAIResponse = (content: string) => {
    const responses = [
      {
        trigger: ['vibe', 'vibe coding', 'v0', 'ai coding', 'cursor', 'copilot'],
        careerPath: 'AI-Assisted Developer',
        response: "Exciting! AI-powered coding tools like Vibe are revolutionizing development:\n\n🤖 **AI-Assisted Developer** - Use AI tools to build faster\n⚡ **Full Stack with AI** - Leverage Cursor, GitHub Copilot, and v0\n🎨 **Frontend with AI Tools** - Build UIs rapidly with Vibe-style tools\n💡 **Product Engineer** - Ship products quickly using AI assistance\n\nAI coding tools are transforming how we build software. You'll learn traditional coding fundamentals while mastering these cutting-edge tools. Ready for your personalized learning path?",
        careerOptions: [
          { title: 'AI-Assisted Developer', description: 'Use AI tools to build faster', track: 'AI-Assisted Developer' },
          { title: 'Full Stack with AI', description: 'Leverage Cursor, GitHub Copilot, and v0', track: 'AI-Assisted Developer' },
          { title: 'Frontend with AI Tools', description: 'Build UIs rapidly with Vibe-style tools', track: 'AI-Assisted Developer' },
          { title: 'Product Engineer', description: 'Ship products quickly using AI assistance', track: 'AI-Assisted Developer' },
        ],
      },
      {
        trigger: ['cloud run', 'cloudrun', 'serverless', 'google cloud', 'gcp'],
        careerPath: 'Cloud Run & Serverless Developer',
        response: "Great choice! Cloud Run and serverless are the future of deployment:\n\n☁️ **Cloud Engineer** - Master GCP services like Cloud Run\n🚀 **DevOps Engineer** - Deploy and scale serverless applications\n⚙️ **Backend Developer** - Build APIs with Cloud Run and serverless\n🏗️ **Solutions Architect** - Design cloud-native architectures\n\nCloud Run expertise is highly valuable for building scalable, cost-effective applications. You'll learn containerization, cloud deployment, and modern DevOps practices. Shall I create your cloud learning roadmap?",
        careerOptions: [
          { title: 'Cloud Engineer', description: 'Master GCP services like Cloud Run', track: 'Cloud Run & Serverless Developer' },
          { title: 'DevOps Engineer', description: 'Deploy and scale serverless applications', track: 'Cloud Run & Serverless Developer' },
          { title: 'Backend Developer', description: 'Build APIs with Cloud Run and serverless', track: 'Cloud Run & Serverless Developer' },
          { title: 'Solutions Architect', description: 'Design cloud-native architectures', track: 'Cloud Run & Serverless Developer' },
        ],
      },
      {
        trigger: ['gemini', 'gemini cli', 'gemini api', 'google ai', 'vertex ai'],
        careerPath: 'Gemini AI Developer',
        response: "Fantastic! Gemini and Google AI are at the cutting edge:\n\n🤖 **AI Application Developer** - Build apps with Gemini API\n💬 **LLM Engineer** - Integrate large language models\n🔧 **AI Solutions Engineer** - Create AI-powered products\n📊 **ML Engineer** - Work with Vertex AI and Gemini\n\nGemini expertise positions you perfectly for the AI revolution. You'll learn prompt engineering, API integration, and building intelligent applications. Want to see your AI development roadmap?",
        careerOptions: [
          { title: 'AI Application Developer', description: 'Build apps with Gemini API', track: 'Gemini AI Developer' },
          { title: 'LLM Engineer', description: 'Integrate large language models', track: 'Gemini AI Developer' },
          { title: 'AI Solutions Engineer', description: 'Create AI-powered products', track: 'Gemini AI Developer' },
          { title: 'ML Engineer', description: 'Work with Vertex AI and Gemini', track: 'AI/ML Engineer' },
        ],
      },
      {
        trigger: ['supabase', 'firebase', 'backend as a service', 'baas'],
        careerPath: 'Software Engineer',
        response: "Smart choice! Backend-as-a-Service platforms are game-changers:\n\n⚡ **Full Stack Developer** - Build complete apps with Supabase/Firebase\n🔐 **Backend Developer** - Master authentication and databases\n📱 **Mobile Developer** - Create apps with cloud backends\n🚀 **Indie Developer** - Ship products rapidly without managing servers\n\nSupabase/Firebase let you focus on building features instead of infrastructure. You'll learn database design, authentication, real-time features, and rapid development. Ready for your roadmap?",
        careerOptions: [
          { title: 'Full Stack Developer', description: 'Build complete apps with Supabase/Firebase', track: 'Software Engineer' },
          { title: 'Backend Developer', description: 'Master authentication and databases', track: 'Software Engineer' },
          { title: 'Mobile Developer', description: 'Create apps with cloud backends', track: 'Software Engineer' },
          { title: 'Indie Developer', description: 'Ship products rapidly without managing servers', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['nextjs', 'next.js', 'react', 'vercel', 'remix'],
        careerPath: 'Software Engineer',
        response: "Excellent! Modern React frameworks are in huge demand:\n\n⚛️ **React Developer** - Master Next.js and modern React patterns\n🎨 **Frontend Engineer** - Build performant web applications\n🔄 **Full Stack Developer** - Use Next.js API routes and server components\n🚀 **Web Developer** - Deploy to Vercel and Edge networks\n\nNext.js is used by top companies worldwide. You'll learn server-side rendering, static generation, API routes, and modern web development. Interested in your learning path?",
        careerOptions: [
          { title: 'React Developer', description: 'Master Next.js and modern React patterns', track: 'Software Engineer' },
          { title: 'Frontend Engineer', description: 'Build performant web applications', track: 'Software Engineer' },
          { title: 'Full Stack Developer', description: 'Use Next.js API routes and server components', track: 'Software Engineer' },
          { title: 'Web Developer', description: 'Deploy to Vercel and Edge networks', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['typescript', 'ts', 'javascript', 'js'],
        careerPath: 'Software Engineer',
        response: "Perfect foundation! TypeScript/JavaScript powers the modern web:\n\n💻 **Frontend Developer** - Build UIs with TypeScript and React\n🔧 **Full Stack Developer** - Use TypeScript across the stack\n📱 **Mobile Developer** - Create React Native apps with TypeScript\n⚙️ **Backend Developer** - Build Node.js APIs with TypeScript\n\nTypeScript is essential for professional development. You'll learn type safety, modern JavaScript, and industry-standard practices. Want your personalized roadmap?",
        careerOptions: [
          { title: 'Frontend Developer', description: 'Build UIs with TypeScript and React', track: 'Software Engineer' },
          { title: 'Full Stack Developer', description: 'Use TypeScript across the stack', track: 'Software Engineer' },
          { title: 'Mobile Developer', description: 'Create React Native apps with TypeScript', track: 'Software Engineer' },
          { title: 'Backend Developer', description: 'Build Node.js APIs with TypeScript', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['docker', 'kubernetes', 'k8s', 'containers', 'containerization'],
        careerPath: 'Software Engineer',
        response: "Awesome! Container orchestration is critical for modern infrastructure:\n\n🐳 **DevOps Engineer** - Deploy and manage containerized apps\n☁️ **Cloud Native Engineer** - Build Kubernetes-based systems\n🏗️ **Platform Engineer** - Create developer platforms with K8s\n🔧 **Site Reliability Engineer** - Ensure system reliability at scale\n\nDocker and Kubernetes are industry standards for deployment. You'll learn containerization, orchestration, and cloud-native architecture. Ready for your roadmap?",
        careerOptions: [
          { title: 'DevOps Engineer', description: 'Deploy and manage containerized apps', track: 'Software Engineer' },
          { title: 'Cloud Native Engineer', description: 'Build Kubernetes-based systems', track: 'Software Engineer' },
          { title: 'Platform Engineer', description: 'Create developer platforms with K8s', track: 'Software Engineer' },
          { title: 'Site Reliability Engineer', description: 'Ensure system reliability at scale', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['tailwind', 'css', 'styling', 'design system', 'shadcn'],
        careerPath: 'Software Engineer',
        response: "Great eye for design! Modern CSS frameworks are essential:\n\n🎨 **Frontend Developer** - Master Tailwind and component libraries\n✨ **UI Engineer** - Build design systems with Tailwind\n🎯 **Product Designer** - Implement designs with modern CSS\n⚡ **Full Stack Developer** - Style complete applications efficiently\n\nTailwind CSS is the go-to for rapid, maintainable styling. You'll learn utility-first CSS, responsive design, and component architecture. Interested in your learning path?",
        careerOptions: [
          { title: 'Frontend Developer', description: 'Master Tailwind and component libraries', track: 'Software Engineer' },
          { title: 'UI Engineer', description: 'Build design systems with Tailwind', track: 'Software Engineer' },
          { title: 'Product Designer', description: 'Implement designs with modern CSS', track: 'Product Manager' },
          { title: 'Full Stack Developer', description: 'Style complete applications efficiently', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['fastapi', 'python api', 'flask', 'django', 'python backend'],
        careerPath: 'Software Engineer',
        response: "Excellent choice! Python backends are powerful and popular:\n\n🐍 **Backend Developer** - Build APIs with FastAPI/Django\n🤖 **ML Engineer** - Create ML-powered APIs\n📊 **Data Engineer** - Build data pipelines and APIs\n⚡ **API Developer** - Design RESTful and GraphQL APIs\n\nPython backends combine simplicity with power. You'll learn API design, database integration, authentication, and deployment. Shall I create your roadmap?",
        careerOptions: [
          { title: 'Backend Developer', description: 'Build APIs with FastAPI/Django', track: 'Software Engineer' },
          { title: 'ML Engineer', description: 'Create ML-powered APIs', track: 'AI/ML Engineer' },
          { title: 'Data Engineer', description: 'Build data pipelines and APIs', track: 'Software Engineer' },
          { title: 'API Developer', description: 'Design RESTful and GraphQL APIs', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['postgres', 'postgresql', 'database', 'sql', 'mysql', 'mongodb'],
        careerPath: 'Software Engineer',
        response: "Smart focus! Database expertise is always in demand:\n\n🗄️ **Database Engineer** - Design and optimize databases\n📊 **Backend Developer** - Build data-driven applications\n🔍 **Data Engineer** - Create data infrastructure\n⚙️ **Full Stack Developer** - Master the complete stack\n\nDatabase skills are fundamental to most applications. You'll learn schema design, queries, optimization, and scaling. Want your personalized roadmap?",
        careerOptions: [
          { title: 'Database Engineer', description: 'Design and optimize databases', track: 'Software Engineer' },
          { title: 'Backend Developer', description: 'Build data-driven applications', track: 'Software Engineer' },
          { title: 'Data Engineer', description: 'Create data infrastructure', track: 'Software Engineer' },
          { title: 'Full Stack Developer', description: 'Master the complete stack', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['graphql', 'rest api', 'api design', 'api development'],
        careerPath: 'Software Engineer',
        response: "Perfect! API design is a critical skill:\n\n🔌 **API Developer** - Design robust APIs with GraphQL/REST\n⚙️ **Backend Engineer** - Build scalable API services\n🌐 **Integration Engineer** - Connect systems and services\n💼 **Platform Engineer** - Create developer-friendly APIs\n\nAPI expertise enables you to build the backbone of modern applications. You'll learn API design patterns, authentication, versioning, and documentation. Ready for your roadmap?",
        careerOptions: [
          { title: 'API Developer', description: 'Design robust APIs with GraphQL/REST', track: 'Software Engineer' },
          { title: 'Backend Engineer', description: 'Build scalable API services', track: 'Software Engineer' },
          { title: 'Integration Engineer', description: 'Connect systems and services', track: 'Software Engineer' },
          { title: 'Platform Engineer', description: 'Create developer-friendly APIs', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['terraform', 'infrastructure as code', 'iac', 'ansible', 'pulumi'],
        careerPath: 'Software Engineer',
        response: "Excellent! Infrastructure as Code is essential for modern ops:\n\n🏗️ **Infrastructure Engineer** - Automate infrastructure with Terraform\n☁️ **Cloud Engineer** - Manage multi-cloud environments\n🔧 **DevOps Engineer** - Build reproducible infrastructure\n🛡️ **Platform Engineer** - Create self-service platforms\n\nIaC skills let you manage infrastructure like code. You'll learn Terraform, cloud platforms, automation, and best practices. Interested in your learning path?",
        careerOptions: [
          { title: 'Infrastructure Engineer', description: 'Automate infrastructure with Terraform', track: 'Software Engineer' },
          { title: 'Cloud Engineer', description: 'Manage multi-cloud environments', track: 'Software Engineer' },
          { title: 'DevOps Engineer', description: 'Build reproducible infrastructure', track: 'Software Engineer' },
          { title: 'Platform Engineer', description: 'Create self-service platforms', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['github actions', 'ci/cd', 'jenkins', 'gitlab', 'continuous integration'],
        careerPath: 'Software Engineer',
        response: "Great focus! CI/CD is crucial for modern development:\n\n🔄 **DevOps Engineer** - Build automated pipelines\n⚡ **Release Engineer** - Manage deployment workflows\n🛠️ **Platform Engineer** - Create developer tooling\n🚀 **Full Stack Developer** - Ship code continuously\n\nCI/CD automation speeds up development and reduces errors. You'll learn pipeline design, automated testing, and deployment strategies. Want your personalized roadmap?",
        careerOptions: [
          { title: 'DevOps Engineer', description: 'Build automated pipelines', track: 'Software Engineer' },
          { title: 'Release Engineer', description: 'Manage deployment workflows', track: 'Software Engineer' },
          { title: 'Platform Engineer', description: 'Create developer tooling', track: 'Software Engineer' },
          { title: 'Full Stack Developer', description: 'Ship code continuously', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['software', 'code', 'coding', 'developer', 'programming', 'build', 'app', 'engineer', 'frontend', 'backend', 'fullstack', 'web development'],
        careerPath: 'Software Engineer',
        response: "Excellent choice! Software development is an incredibly rewarding field:\n\n💻 **Software Engineer** - Build scalable applications and systems\n🎨 **Frontend Developer** - Create beautiful user interfaces with React, Vue, or Angular\n⚙️ **Backend Developer** - Design robust APIs and server architecture\n🔄 **Full Stack Developer** - Master both frontend and backend technologies\n\nBased on your interest in coding, Software Engineering is a great path! You'll solve complex problems and build impactful products. Would you like me to create your personalized learning roadmap?",
        careerOptions: [
          { title: 'Software Engineer', description: 'Build scalable applications and systems', track: 'Software Engineer' },
          { title: 'Frontend Developer', description: 'Create beautiful user interfaces', track: 'Software Engineer' },
          { title: 'Backend Developer', description: 'Design robust APIs and server architecture', track: 'Software Engineer' },
          { title: 'Full Stack Developer', description: 'Master both frontend and backend technologies', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['product manager', 'product management', 'pm role', 'manage products', 'product strategy', 'roadmap', 'feature', 'stakeholder'],
        careerPath: 'Product Manager',
        response: "Great! Product Management is perfect for strategic thinkers:\n\n📊 **Product Manager** - Define product vision and strategy\n🚀 **Technical Product Manager** - Bridge technical and business needs\n📈 **Growth Product Manager** - Drive user acquisition and engagement\n🎯 **Platform Product Manager** - Build scalable product platforms\n\nAs a Product Manager, you'll work cross-functionally with engineering, design, and business teams to bring products from idea to launch. Ready to see your custom learning path?",
        careerOptions: [
          { title: 'Product Manager', description: 'Define product vision and strategy', track: 'Product Manager' },
          { title: 'Technical Product Manager', description: 'Bridge technical and business needs', track: 'Product Manager' },
          { title: 'Growth Product Manager', description: 'Drive user acquisition and engagement', track: 'Product Manager' },
          { title: 'Platform Product Manager', description: 'Build scalable product platforms', track: 'Product Manager' },
        ],
      },
      {
        trigger: ['qa', 'quality', 'testing', 'test', 'automation', 'manual testing', 'bug', 'quality assurance', 'sdet'],
        careerPath: 'QA Engineer',
        response: "Perfect! Quality Assurance is critical for great products:\n\n🔍 **QA Engineer** - Ensure product quality through systematic testing\n🤖 **Automation Engineer** - Build automated test frameworks\n🛠️ **SDET** - Software Development Engineer in Test\n📱 **Mobile QA Engineer** - Specialize in mobile app testing\n\nQA Engineers are essential team members who ensure excellent user experiences by catching issues before users do. Interested in your personalized roadmap?",
        careerOptions: [
          { title: 'QA Engineer', description: 'Ensure product quality through systematic testing', track: 'QA Engineer' },
          { title: 'Automation Engineer', description: 'Build automated test frameworks', track: 'QA Engineer' },
          { title: 'SDET', description: 'Software Development Engineer in Test', track: 'QA Engineer' },
          { title: 'Mobile QA Engineer', description: 'Specialize in mobile app testing', track: 'QA Engineer' },
        ],
      },
      {
        trigger: ['ai', 'machine learning', 'ml', 'artificial intelligence', 'deep learning', 'neural network', 'data science', 'nlp', 'computer vision', 'llm'],
        careerPath: 'AI/ML Engineer',
        response: "Fantastic! AI/ML is one of the most exciting fields right now:\n\n🤖 **AI/ML Engineer** - Build and deploy machine learning models\n🧠 **Deep Learning Engineer** - Work with neural networks and advanced architectures\n💬 **NLP Engineer** - Develop language understanding systems\n👁️ **Computer Vision Engineer** - Create image and video analysis systems\n\nAI Engineers are in extremely high demand and work on cutting-edge technology. Shall I generate your AI learning roadmap?",
        careerOptions: [
          { title: 'AI/ML Engineer', description: 'Build and deploy machine learning models', track: 'AI/ML Engineer' },
          { title: 'Deep Learning Engineer', description: 'Work with neural networks and advanced architectures', track: 'AI/ML Engineer' },
          { title: 'NLP Engineer', description: 'Develop language understanding systems', track: 'AI/ML Engineer' },
          { title: 'Computer Vision Engineer', description: 'Create image and video analysis systems', track: 'AI/ML Engineer' },
        ],
      },
      {
        trigger: ['data', 'analytics', 'analyst', 'business intelligence', 'bi', 'statistics', 'insights', 'metrics'],
        careerPath: 'Software Engineer',
        response: "Excellent choice! Data roles are crucial for decision-making:\n\n📊 **Data Analyst** - Transform data into actionable insights\n📈 **Business Analyst** - Bridge business needs with data solutions\n🔮 **Data Scientist** - Build predictive models and ML solutions\n🏗️ **Data Engineer** - Design and maintain data infrastructure\n\nData professionals help organizations make informed decisions using analytics and insights. Want to see your personalized learning path?",
        careerOptions: [
          { title: 'Data Analyst', description: 'Transform data into actionable insights', track: 'Software Engineer' },
          { title: 'Business Analyst', description: 'Bridge business needs with data solutions', track: 'Software Engineer' },
          { title: 'Data Scientist', description: 'Build predictive models and ML solutions', track: 'AI/ML Engineer' },
          { title: 'Data Engineer', description: 'Design and maintain data infrastructure', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['design', 'ui', 'ux', 'user experience', 'designer', 'product design', 'visual', 'figma', 'interface', 'creative'],
        careerPath: 'Product Manager',
        response: "Wonderful! Design is perfect for creative problem-solvers:\n\n🎨 **Product Designer** - Create end-to-end user experiences\n✨ **UI Designer** - Craft beautiful visual interfaces\n🔍 **UX Researcher** - Understand user needs through research\n🎯 **Interaction Designer** - Design engaging user interactions\n\nDesigners combine creativity with empathy to build delightful products that users love. Ready for your custom design learning roadmap?",
        careerOptions: [
          { title: 'Product Designer', description: 'Create end-to-end user experiences', track: 'Product Manager' },
          { title: 'UI Designer', description: 'Craft beautiful visual interfaces', track: 'Product Manager' },
          { title: 'UX Researcher', description: 'Understand user needs through research', track: 'Product Manager' },
          { title: 'Interaction Designer', description: 'Design engaging user interactions', track: 'Product Manager' },
        ],
      },
      {
        trigger: ['devops', 'cloud', 'infrastructure', 'aws', 'azure', 'deployment', 'sre', 'site reliability'],
        careerPath: 'Software Engineer',
        response: "Great choice! DevOps/Cloud is essential for modern software:\n\n☁️ **Cloud Engineer** - Build and manage cloud infrastructure\n🔧 **DevOps Engineer** - Automate deployment and operations\n🛡️ **Site Reliability Engineer** - Ensure system reliability and performance\n🏗️ **Infrastructure Engineer** - Design scalable infrastructure\n\nDevOps professionals enable fast, reliable software delivery. Interested in your learning path?",
        careerOptions: [
          { title: 'Cloud Engineer', description: 'Build and manage cloud infrastructure', track: 'Software Engineer' },
          { title: 'DevOps Engineer', description: 'Automate deployment and operations', track: 'Software Engineer' },
          { title: 'Site Reliability Engineer', description: 'Ensure system reliability and performance', track: 'Software Engineer' },
          { title: 'Infrastructure Engineer', description: 'Design scalable infrastructure', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['security', 'cybersecurity', 'infosec', 'penetration', 'ethical hacking', 'security engineer', 'appsec'],
        careerPath: 'Software Engineer',
        response: "Excellent! Cybersecurity is critical in today's digital world:\n\n🔒 **Security Engineer** - Protect systems and applications\n🕵️ **Penetration Tester** - Find vulnerabilities through ethical hacking\n🛡️ **Application Security Engineer** - Secure software development lifecycle\n🚨 **Security Analyst** - Monitor and respond to security threats\n\nSecurity professionals are highly valued for protecting organizations from cyber threats. Want your personalized roadmap?",
        careerOptions: [
          { title: 'Security Engineer', description: 'Protect systems and applications', track: 'Software Engineer' },
          { title: 'Penetration Tester', description: 'Find vulnerabilities through ethical hacking', track: 'Software Engineer' },
          { title: 'Application Security Engineer', description: 'Secure software development lifecycle', track: 'Software Engineer' },
          { title: 'Security Analyst', description: 'Monitor and respond to security threats', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['mobile', 'ios', 'android', 'react native', 'flutter', 'app development', 'mobile development'],
        careerPath: 'Software Engineer',
        response: "Perfect! Mobile development is incredibly dynamic:\n\n📱 **iOS Developer** - Build native iPhone/iPad apps with Swift\n🤖 **Android Developer** - Create Android apps with Kotlin\n🔄 **React Native Developer** - Cross-platform development with JavaScript\n🎯 **Flutter Developer** - Build beautiful cross-platform apps\n\nMobile developers create apps used by billions worldwide. Ready to see your learning path?",
        careerOptions: [
          { title: 'iOS Developer', description: 'Build native iPhone/iPad apps with Swift', track: 'Software Engineer' },
          { title: 'Android Developer', description: 'Create Android apps with Kotlin', track: 'Software Engineer' },
          { title: 'React Native Developer', description: 'Cross-platform development with JavaScript', track: 'Software Engineer' },
          { title: 'Flutter Developer', description: 'Build beautiful cross-platform apps', track: 'Software Engineer' },
        ],
      },
      {
        trigger: ['blockchain', 'web3', 'crypto', 'smart contract', 'solidity', 'ethereum', 'defi'],
        careerPath: 'Software Engineer',
        response: "Exciting choice! Web3/Blockchain is the future of internet:\n\n⛓️ **Blockchain Developer** - Build decentralized applications\n📝 **Smart Contract Developer** - Write secure blockchain contracts\n💰 **DeFi Engineer** - Create decentralized finance solutions\n🌐 **Web3 Engineer** - Build next-generation internet applications\n\nWeb3 developers work on cutting-edge decentralized technology. Interested in your roadmap?",
        careerOptions: [
          { title: 'Blockchain Developer', description: 'Build decentralized applications', track: 'Software Engineer' },
          { title: 'Smart Contract Developer', description: 'Write secure blockchain contracts', track: 'Software Engineer' },
          { title: 'DeFi Engineer', description: 'Create decentralized finance solutions', track: 'Software Engineer' },
          { title: 'Web3 Engineer', description: 'Build next-generation internet applications', track: 'Software Engineer' },
        ],
      },
    ];

    let aiResponse = "That's interesting! Based on what you've shared, I can help you explore several career paths that align with your interests:\n\n💼 Software Engineer - Build scalable applications\n🎨 Product Designer - Create user experiences\n📊 Product Manager - Define product strategy\n🤖 AI/ML Engineer - Work with cutting-edge AI\n\nWould you like me to generate a personalized learning roadmap for any of these paths?";
    let matchedCareerPath = 'Software Engineer';
    let extractedOptions: CareerOption[] | undefined;

    const contentLower = content.toLowerCase();
    
    // First, check for exact keyword matches
    let matched = false;
    for (const option of responses) {
      if (option.trigger.some(keyword => contentLower.includes(keyword))) {
        aiResponse = option.response;
        matchedCareerPath = option.careerPath;
        extractedOptions = option.careerOptions;
        matched = true;
        setShowRoadmapButton(true);
        setDetectedCareerPath(matchedCareerPath);
        break;
      }
    }
    
    // If no exact match, provide default career options as buttons
    if (!matched) {
      extractedOptions = [
        { title: 'Software Engineer', description: 'Build scalable applications', track: 'Software Engineer' },
        { title: 'Product Designer', description: 'Create user experiences', track: 'Product Manager' },
        { title: 'Product Manager', description: 'Define product strategy', track: 'Product Manager' },
        { title: 'AI/ML Engineer', description: 'Work with cutting-edge AI', track: 'AI/ML Engineer' },
      ];
      setShowRoadmapButton(true);
      setDetectedCareerPath('Software Engineer');
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      careerOptions: extractedOptions,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm">AI Career Mentor</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Online
                </div>
              </div>
            </div>
          </div>
          {userProfile && (
            <UserMenu userProfile={userProfile} onNavigate={onNavigate} onLogout={onLogout} />
          )}
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-6 mb-6 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className={message.sender === 'assistant' ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-blue-600 to-cyan-600'}>
                <AvatarFallback className="text-white">
                  {message.sender === 'assistant' ? (
                    <Sparkles className="h-5 w-5" />
                  ) : (
                    userProfile?.name.charAt(0) || 'U'
                  )}
                </AvatarFallback>
              </Avatar>

              <div className={`flex-1 max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <Card className={message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white'}>
                  <CardContent className="p-4">
                    <div className="whitespace-pre-line">{message.content}</div>
                  </CardContent>
                </Card>
                
                {/* Career Option Buttons */}
                {message.careerOptions && message.careerOptions.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-600 px-1">Choose your career path:</div>
                    {message.careerOptions.map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className={`w-full justify-start text-left h-auto py-3 px-4 ${selectedCareerOption === option.title ? 'border-purple-600 bg-purple-50' : ''}`}
                        onClick={() => handleCareerOptionSelect(option)}
                      >
                        <div>
                          <div className="font-medium">{option.title}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="bg-gradient-to-br from-purple-600 to-pink-600">
                <AvatarFallback className="text-white">
                  <Sparkles className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <Lightbulb className="h-4 w-4" />
              <span>Suggested responses:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 text-left whitespace-normal"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Generate Roadmap Button */}
        {showRoadmapButton && (
          <div className="mb-4">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
              size="lg"
              onClick={() => {
                onNavigate('roadmap', detectedCareerPath, true);
                onCareerPathSelect(detectedCareerPath);
              }}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate My Learning Roadmap
            </Button>
          </div>
        )}

        {/* Input */}
        <div className="bg-white rounded-lg border shadow-lg p-4">
          <div className="flex gap-3">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}