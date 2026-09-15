import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Sparkles, ArrowLeft, Trophy, Award, Target, Flame, 
  BookOpen, Calendar, Lock, CheckCircle2, Circle, Play,
  Clock, Video, FileText, Code, Brain
} from 'lucide-react';
import type { Page, UserProfile } from '../App';
import { coursesData, milestonesData, type Course } from './LearningRoadmapData';
import UserMenu from './UserMenu';

interface LearningRoadmapProps {
  onNavigate: (page: Page, careerPath?: string) => void;
  userProfile: UserProfile | null;
  careerPath?: string;
  onLogout?: () => void;
}

export default function LearningRoadmap({ onNavigate, userProfile, careerPath = 'Product Manager', onLogout }: LearningRoadmapProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const [activeTab, setActiveTab] = useState<'roadmap' | 'explore'>('roadmap');
  const userName = userProfile?.name || 'Kushal';

  // Get courses for the selected career path, fallback to Product Manager if not found
  const courses = coursesData[careerPath] || coursesData['Product Manager'];
  
  // Get milestones for the selected career path, fallback to Product Manager if not found
  const milestones = milestonesData[careerPath] || milestonesData['Product Manager'];
  
  // Get other available career paths for exploration
  const otherCareerPaths = Object.keys(coursesData).filter(path => path !== careerPath);

  const totalCourses = Object.values(courses).flat().length;
  const completedCourses = Object.values(courses).flat().filter(c => c.status === 'completed').length;
  const inProgressCourses = Object.values(courses).flat().filter(c => c.status === 'in-progress').length;
  const overallProgress = Math.round((completedCourses / totalCourses) * 100);

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-600" />;
      case 'available':
        return <Circle className="h-5 w-5 text-gray-400" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-300" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('discovery')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl">TalentOS</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => onNavigate('mentor')}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Mentor
            </Button>
            <UserMenu userProfile={userProfile} onNavigate={onNavigate} onLogout={onLogout} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">{userName}'s Roadmap to Becoming a {careerPath}</h1>
          <p className="text-gray-600">Your personalized learning journey based on your goals and current skills</p>
          
          {/* Explore Other Courses button */}
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('discovery')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Explore Other Career Paths
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-1">{overallProgress}%</div>
                  <div className="text-sm opacity-90">Overall Progress</div>
                </div>
                <Target className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-1">{completedCourses}</div>
                  <div className="text-sm opacity-90">Courses Completed</div>
                </div>
                <Trophy className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-1">{inProgressCourses}</div>
                  <div className="text-sm opacity-90">In Progress</div>
                </div>
                <BookOpen className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-1">5</div>
                  <div className="text-sm opacity-90">Day Streak 🔥</div>
                </div>
                <Flame className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Roadmap */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Path</CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">{careerPath} Track</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedLevel} onValueChange={setSelectedLevel}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="beginner">
                      <Award className="mr-2 h-4 w-4" />
                      Beginner
                    </TabsTrigger>
                    <TabsTrigger value="intermediate">
                      <Award className="mr-2 h-4 w-4" />
                      Intermediate
                    </TabsTrigger>
                    <TabsTrigger value="pro">
                      <Award className="mr-2 h-4 w-4" />
                      Pro
                    </TabsTrigger>
                  </TabsList>

                  {(['beginner', 'intermediate', 'pro'] as const).map((level) => (
                    <TabsContent key={level} value={level} className="space-y-4 mt-6">
                      {courses[level].map((course, idx) => (
                        <Card 
                          key={course.id} 
                          className={`border ${
                            course.status === 'locked' ? 'opacity-60' : 'hover:shadow-md transition-shadow'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 mt-1">
                                {getStatusIcon(course.status)}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="mb-1">{course.title}</h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {course.duration}
                                      </span>
                                      <span>•</span>
                                      <span>{course.skills.length} skills</span>
                                    </div>
                                  </div>
                                  {course.status === 'in-progress' && (
                                    <Button size="sm">Continue</Button>
                                  )}
                                  {course.status === 'available' && (
                                    <Button size="sm" variant="outline">Start</Button>
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {course.skills.map((skill, skillIdx) => (
                                    <Badge key={skillIdx} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>

                                {course.resources && course.status !== 'locked' && (
                                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <Video className="h-3 w-3" />
                                      {course.resources.videos} videos
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <FileText className="h-3 w-3" />
                                      {course.resources.articles} articles
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Code className="h-3 w-3" />
                                      {course.resources.projects} projects
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Brain className="h-3 w-3" />
                                      {course.resources.quizzes} quizzes
                                    </span>
                                  </div>
                                )}

                                {course.instructor && course.status !== 'locked' && (
                                  <div className="text-xs text-gray-500 mb-3">
                                    👨‍🏫 {course.instructor}
                                  </div>
                                )}

                                {course.status === 'in-progress' && course.progress !== undefined && (
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>Progress</span>
                                      <span>{course.progress}%</span>
                                    </div>
                                    <Progress value={course.progress} className="h-2" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Milestones & Achievements */}
          <div className="space-y-6">
            {/* Milestones */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {milestones.map((milestone, idx) => (
                    <div key={milestone.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm mb-1 ${
                          milestone.completed ? '' : 'text-gray-500'
                        }`}>{milestone.title}</div>
                        <Progress value={milestone.progress} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs">First Course</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-1">📚</div>
                    <div className="text-xs">Fast Learner</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs">5 Day Streak</div>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded-lg opacity-50">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs">Level Up</div>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded-lg opacity-50">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-xs">All Star</div>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded-lg opacity-50">
                    <div className="text-2xl mb-1">💎</div>
                    <div className="text-xs">Master</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Session CTA */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <CardContent className="p-6 text-center space-y-3">
                <div className="text-3xl">👨‍🏫</div>
                <h3>Need help?</h3>
                <p className="text-sm opacity-90">Book a session with an expert mentor</p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => onNavigate('mentor')}
                >
                  Book Mentor Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}