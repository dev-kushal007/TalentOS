import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Code, Palette, TrendingUp, Database, Users, Briefcase, 
  Sparkles, Search, MessageCircle, ArrowLeft, ArrowRight, Target
} from 'lucide-react';
import type { Page, UserProfile } from '../App';
import UserMenu from './UserMenu';

interface CareerDiscoveryProps {
  onNavigate: (page: Page, careerPath?: string, showLoading?: boolean) => void;
  userProfile: UserProfile | null;
  onCareerPathSelect?: (careerPath: string) => void;
  onLogout?: () => void;
}

const careerPaths = [
  {
    id: 'product',
    title: 'Product Management',
    icon: Briefcase,
    description: 'Lead product strategy, define roadmaps, and drive product success',
    skills: ['Strategy', 'User Research', 'Analytics', 'Communication'],
    timeToLearn: '6-9 months',
    difficulty: 'Intermediate',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'engineering',
    title: 'Software Engineer',
    icon: Code,
    description: 'Build scalable applications and systems with modern technologies',
    skills: ['Programming', 'System Design', 'Algorithms', 'DevOps'],
    timeToLearn: '8-12 months',
    difficulty: 'Advanced',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'design',
    title: 'Product Design',
    icon: Palette,
    description: 'Create beautiful, user-centered experiences and interfaces',
    skills: ['UI/UX', 'Prototyping', 'User Research', 'Design Systems'],
    timeToLearn: '6-8 months',
    difficulty: 'Intermediate',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: Database,
    description: 'Analyze data, build ML models, and drive data-driven decisions',
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
    timeToLearn: '10-14 months',
    difficulty: 'Advanced',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'consulting',
    title: 'Strategy Consulting',
    icon: TrendingUp,
    description: 'Solve complex business problems and drive organizational growth',
    skills: ['Problem Solving', 'Business Strategy', 'Analysis', 'Communication'],
    timeToLearn: '6-9 months',
    difficulty: 'Intermediate',
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'hr',
    title: 'Human Resources',
    icon: Users,
    description: 'Build great teams, culture, and employee experiences',
    skills: ['People Management', 'Recruiting', 'Culture Building', 'Analytics'],
    timeToLearn: '5-7 months',
    difficulty: 'Beginner',
    color: 'from-indigo-500 to-blue-500'
  },
];

export default function CareerDiscovery({ onNavigate, userProfile, onCareerPathSelect, onLogout }: CareerDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = ['all', 'beginner', 'intermediate', 'advanced'];

  // Prioritize careers based on user interests
  const getPrioritizedCareers = () => {
    if (!userProfile || !userProfile.interests) return careerPaths;
    
    const interestsLower = userProfile.interests.map(i => i.toLowerCase()).join(' ');
    
    return careerPaths.map(career => {
      let relevanceScore = 0;
      
      if (career.id === 'engineering' && 
          (interestsLower.includes('code') || interestsLower.includes('coding') || 
           interestsLower.includes('programming') || interestsLower.includes('software') ||
           interestsLower.includes('development') || interestsLower.includes('engineer'))) {
        relevanceScore = 10;
      }
      
      if (career.id === 'design' && 
          (interestsLower.includes('design') || interestsLower.includes('ui') || 
           interestsLower.includes('ux') || interestsLower.includes('figma'))) {
        relevanceScore = 10;
      }
      
      if (career.id === 'product' && 
          (interestsLower.includes('product') || interestsLower.includes('management') || 
           interestsLower.includes('strategy'))) {
        relevanceScore = 10;
      }
      
      if (career.id === 'data' && 
          (interestsLower.includes('data') || interestsLower.includes('analytics') || 
           interestsLower.includes('ml') || interestsLower.includes('machine learning'))) {
        relevanceScore = 10;
      }
      
      return { ...career, relevanceScore };
    }).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  };
  
  const prioritizedCareers = getPrioritizedCareers();

  const filteredCareers = prioritizedCareers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         career.difficulty.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleExplorePath = (careerId: string) => {
    // Map career IDs to actual career path names in coursesData
    const careerIdToPath: { [key: string]: string } = {
      'product': 'Product Manager',
      'engineering': 'Software Engineer',
      'design': 'Product Manager', // Using Product Manager data for design paths
      'data': 'AI/ML Engineer',
      'consulting': 'Product Manager',
      'hr': 'Product Manager'
    };
    
    const careerPathName = careerIdToPath[careerId] || 'Product Manager';
    onNavigate('roadmap', careerPathName, true);
    if (onCareerPathSelect) {
      onCareerPathSelect(careerPathName);
    }
  };

  // Get the user's assigned career path details
  const getUserCareerPath = () => {
    if (!userProfile || !userProfile.selectedCareerPath) return null;
    
    // Map the career paths from userProfile to careerPaths data
    const careerMapping: { [key: string]: string } = {
      'Software Engineer': 'engineering',
      'Product Manager': 'product',
      'Product Design': 'design',
      'QA Engineer': 'engineering',
      'AI/ML Engineer': 'data',
      'Gemini AI Developer': 'data',
      'AI-Assisted Developer': 'engineering',
      'Cloud Run & Serverless Developer': 'engineering'
    };
    
    const careerPathId = careerMapping[userProfile.selectedCareerPath];
    if (!careerPathId) {
      // If specialized path, create custom object
      const specializedPaths: { [key: string]: any } = {
        'QA Engineer': { title: 'QA Engineer', icon: Code, color: 'from-blue-500 to-cyan-500', description: 'Master software testing and quality assurance' },
        'Gemini AI Developer': { title: 'Gemini AI Developer', icon: Sparkles, color: 'from-purple-500 to-pink-500', description: 'Build apps with Gemini AI and Google AI Studio' },
        'AI-Assisted Developer': { title: 'AI-Assisted Developer', icon: Code, color: 'from-green-500 to-emerald-500', description: 'Code faster with AI pair programming tools' },
        'Cloud Run & Serverless Developer': { title: 'Cloud Run & Serverless Developer', icon: Database, color: 'from-orange-500 to-amber-500', description: 'Deploy scalable serverless applications' }
      };
      return specializedPaths[userProfile.selectedCareerPath];
    }
    
    return careerPaths.find(cp => cp.id === careerPathId);
  };

  const userCareerPath = getUserCareerPath();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl">TalentOS</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserMenu userProfile={userProfile} onNavigate={onNavigate} onLogout={onLogout} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Discover Your Perfect Career Path</h1>
          <p className="text-xl text-gray-600">Explore careers tailored to your interests and skill level</p>
        </div>

        {/* AI Recommendation Card */}
        <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="mb-1">Not sure which path to choose?</h3>
                <p className="text-gray-600">Talk to our AI Career Mentor for personalized recommendations</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => onNavigate('chat')}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Talk to AI Mentor
            </Button>
          </CardContent>
        </Card>

        {/* Continue Your Career Path Card - Shows if user has selected a path */}
        {userProfile && userProfile.selectedCareerPath && userCareerPath && (
          <Card className="mb-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${userCareerPath.color} rounded-xl flex items-center justify-center`}>
                  {React.createElement(userCareerPath.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-green-600" />
                    <h3>Continue Your Career Path</h3>
                  </div>
                  <p className="text-gray-600">
                    You're on track to becoming a <span className="font-semibold text-gray-900">{userProfile.selectedCareerPath}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{userCareerPath.description}</p>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
                onClick={() => onNavigate('roadmap')}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search career paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Career Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const Icon = career.icon;
            return (
              <Card key={career.id} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-14 h-14 bg-gradient-to-br ${career.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="mb-2">{career.title}</CardTitle>
                  <p className="text-gray-600">{career.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {career.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))}
                    {career.skills.length > 3 && (
                      <Badge variant="outline">+{career.skills.length - 3}</Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>⏱️ {career.timeToLearn}</span>
                    <Badge variant={career.difficulty === 'Beginner' ? 'default' : career.difficulty === 'Intermediate' ? 'secondary' : 'outline'}>
                      {career.difficulty}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleExplorePath(career.id)}
                  >
                    Explore Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}