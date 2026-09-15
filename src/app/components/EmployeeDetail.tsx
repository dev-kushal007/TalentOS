import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  ArrowLeft, User, Briefcase, Users, Calendar, Clock, Trophy, 
  Flame, Target, CheckCircle2, BookOpen, Award, TrendingUp,
  Brain, Code, Play, Lock, ChevronRight, Star, MessageSquare,
  Activity, BarChart3
} from 'lucide-react';

interface EmployeeDetailProps {
  employee: {
    id: string;
    name: string;
    department: string;
    team: string;
    role: string;
    manager?: string;
    coursesCompleted: number;
    coursesInProgress: number;
    skillLevel: string;
    progress: number;
    streak: number;
    badges: number;
    lastActive: string;
    learningHours: number;
    enrollmentDate: string;
    email?: string;
    careerPath?: string;
  };
  onBack: () => void;
  viewerRole?: 'admin' | 'manager' | 'mentor' | 'employee';
}

interface CompletedCourse {
  id: string;
  title: string;
  track: string;
  level: string;
  completedDate: string;
  duration: string;
  score: number;
  certificate: boolean;
}

interface InProgressCourse {
  id: string;
  title: string;
  track: string;
  level: string;
  progress: number;
  startedDate: string;
  estimatedCompletion: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  icon: string;
}

interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'course' | 'achievement' | 'milestone' | 'session';
}

interface MentorSession {
  id: string;
  mentorName: string;
  mentorExpertise: string;
  sessionDate: string;
  duration: string;
  topic: string;
  status: 'Completed' | 'Scheduled' | 'Cancelled';
  rating?: number; // 1-5 stars, only for completed sessions
  mentorId: string;
}

interface MentorStats {
  totalSessions: number;
  completedSessions: number;
  scheduledSessions: number;
  uniqueMentors: number;
  averageRating: number;
  totalHours: number;
}

export default function EmployeeDetail({ employee, onBack, viewerRole }: EmployeeDetailProps) {
  // Mock completed courses data
  const completedCourses: CompletedCourse[] = [
    { id: '1', title: 'Introduction to React', track: 'Software Engineer', level: 'Beginner', completedDate: '2024-02-15', duration: '8h', score: 95, certificate: true },
    { id: '2', title: 'Advanced TypeScript', track: 'Software Engineer', level: 'Intermediate', completedDate: '2024-02-28', duration: '12h', score: 88, certificate: true },
    { id: '3', title: 'Node.js Backend Development', track: 'Software Engineer', level: 'Intermediate', completedDate: '2024-03-10', duration: '15h', score: 92, certificate: true },
    { id: '4', title: 'System Design Fundamentals', track: 'Software Engineer', level: 'Advanced', completedDate: '2024-03-25', duration: '10h', score: 90, certificate: true },
    { id: '5', title: 'Docker & Containerization', track: 'DevOps', level: 'Intermediate', completedDate: '2024-04-05', duration: '8h', score: 87, certificate: true },
    { id: '6', title: 'Kubernetes Basics', track: 'DevOps', level: 'Advanced', completedDate: '2024-04-20', duration: '12h', score: 85, certificate: true },
    { id: '7', title: 'CI/CD Pipeline Design', track: 'DevOps', level: 'Advanced', completedDate: '2024-05-10', duration: '10h', score: 93, certificate: true },
    { id: '8', title: 'Cloud Architecture on AWS', track: 'Cloud Engineer', level: 'Pro', completedDate: '2024-05-28', duration: '18h', score: 91, certificate: true },
  ];

  const inProgressCourses: InProgressCourse[] = [
    { id: '1', title: 'Microservices Architecture', track: 'Software Engineer', level: 'Pro', progress: 65, startedDate: '2024-06-01', estimatedCompletion: '2024-07-15' },
    { id: '2', title: 'Advanced System Design', track: 'Software Engineer', level: 'Pro', progress: 40, startedDate: '2024-06-10', estimatedCompletion: '2024-07-30' },
  ];

  const achievements: Achievement[] = [
    { id: '1', title: 'Fast Learner', description: 'Completed 5 courses in a month', earnedDate: '2024-03-15', icon: '🚀' },
    { id: '2', title: 'Perfect Score', description: 'Achieved 100% in a course', earnedDate: '2024-02-20', icon: '💯' },
    { id: '3', title: 'Streak Master', description: 'Maintained 10-day learning streak', earnedDate: '2024-04-01', icon: '🔥' },
    { id: '4', title: 'Tech Explorer', description: 'Completed courses in 3 different tracks', earnedDate: '2024-05-05', icon: '🎯' },
    { id: '5', title: 'Certification Champion', description: 'Earned 5 certificates', earnedDate: '2024-05-25', icon: '🏆' },
  ];

  const activityLog: ActivityLog[] = [
    { id: '1', action: 'Completed Course', details: 'Cloud Architecture on AWS', timestamp: '2 hours ago', type: 'course' },
    { id: '2', action: 'Earned Achievement', details: 'Certification Champion', timestamp: '1 day ago', type: 'achievement' },
    { id: '3', action: 'Started Course', details: 'Advanced System Design', timestamp: '3 days ago', type: 'course' },
    { id: '4', action: 'Milestone Reached', details: '75% overall progress', timestamp: '5 days ago', type: 'milestone' },
    { id: '5', action: 'Mentor Session', details: 'Session with Dr. Sarah Johnson', timestamp: '1 week ago', type: 'session' },
    { id: '6', action: 'Completed Course', details: 'CI/CD Pipeline Design', timestamp: '2 weeks ago', type: 'course' },
  ];

  // Mock mentor sessions data
  const mentorSessions: MentorSession[] = [
    { id: '10', mentorId: 'M4', mentorName: 'David Kim', mentorExpertise: 'Full Stack Development', sessionDate: '2024-06-20', duration: '1h', topic: 'Backend Architecture Review', status: 'Scheduled', rating: undefined },
    { id: '11', mentorId: 'M1', mentorName: 'Dr. Sarah Johnson', mentorExpertise: 'AI/ML Engineering', sessionDate: '2024-06-25', duration: '1h', topic: 'LLM Applications', status: 'Scheduled', rating: undefined },
    { id: '1', mentorId: 'M1', mentorName: 'Dr. Sarah Johnson', mentorExpertise: 'AI/ML Engineering', sessionDate: '2024-06-01', duration: '1h', topic: 'Machine Learning Best Practices', status: 'Completed', rating: 5 },
    { id: '2', mentorId: 'M2', mentorName: 'Michael Chen', mentorExpertise: 'Product Management', sessionDate: '2024-05-28', duration: '45m', topic: 'Career Transition Advice', status: 'Completed', rating: 4 },
    { id: '3', mentorId: 'M1', mentorName: 'Dr. Sarah Johnson', mentorExpertise: 'AI/ML Engineering', sessionDate: '2024-05-20', duration: '1h', topic: 'Neural Networks Deep Dive', status: 'Completed', rating: 5 },
    { id: '8', mentorId: 'M5', mentorName: 'Lisa Wang', mentorExpertise: 'UX Design', sessionDate: '2024-05-12', duration: '1h', topic: 'Design System Principles', status: 'Completed', rating: 2 },
    { id: '4', mentorId: 'M3', mentorName: 'Emily Rodriguez', mentorExpertise: 'Cloud Architecture', sessionDate: '2024-05-08', duration: '1h', topic: 'AWS Infrastructure Design', status: 'Completed', rating: 4 },
    { id: '5', mentorId: 'M4', mentorName: 'David Kim', mentorExpertise: 'Full Stack Development', sessionDate: '2024-04-25', duration: '1h 30m', topic: 'React Advanced Patterns', status: 'Completed', rating: 5 },
    { id: '6', mentorId: 'M2', mentorName: 'Michael Chen', mentorExpertise: 'Product Management', sessionDate: '2024-04-18', duration: '45m', topic: 'Technical Leadership', status: 'Completed', rating: 3 },
    { id: '7', mentorId: 'M1', mentorName: 'Dr. Sarah Johnson', mentorExpertise: 'AI/ML Engineering', sessionDate: '2024-04-10', duration: '1h', topic: 'AI Ethics & Bias', status: 'Completed', rating: 5 },
    { id: '9', mentorId: 'M3', mentorName: 'Emily Rodriguez', mentorExpertise: 'Cloud Architecture', sessionDate: '2024-03-28', duration: '1h', topic: 'Kubernetes Troubleshooting', status: 'Completed', rating: 4 },
  ];

  // Calculate mentor stats
  const mentorStats: MentorStats = {
    totalSessions: mentorSessions.length,
    completedSessions: mentorSessions.filter(s => s.status === 'Completed').length,
    scheduledSessions: mentorSessions.filter(s => s.status === 'Scheduled').length,
    uniqueMentors: new Set(mentorSessions.map(s => s.mentorId)).size,
    averageRating: mentorSessions
      .filter(s => s.rating)
      .reduce((sum, s) => sum + (s.rating || 0), 0) / mentorSessions.filter(s => s.rating).length,
    totalHours: mentorSessions
      .filter(s => s.status === 'Completed')
      .reduce((sum, s) => {
        const duration = s.duration;
        const hours = duration.includes('h') ? parseFloat(duration) : 0;
        const mins = duration.includes('m') ? parseFloat(duration.split('h')[1] || duration) / 60 : 0;
        return sum + hours + mins;
      }, 0)
  };

  // Group sessions by mentor for analysis
  const mentorRatings = mentorSessions
    .filter(s => s.rating)
    .reduce((acc, session) => {
      if (!acc[session.mentorId]) {
        acc[session.mentorId] = {
          mentorName: session.mentorName,
          ratings: [],
          avgRating: 0,
          sessionCount: 0
        };
      }
      acc[session.mentorId].ratings.push(session.rating!);
      acc[session.mentorId].sessionCount++;
      return acc;
    }, {} as Record<string, { mentorName: string; ratings: number[]; avgRating: number; sessionCount: number }>);

  // Calculate average ratings per mentor
  Object.keys(mentorRatings).forEach(mentorId => {
    const ratings = mentorRatings[mentorId].ratings;
    mentorRatings[mentorId].avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  });

  // Identify low-rated mentors (potential behavior issues)
  const lowRatedMentors = Object.values(mentorRatings).filter(m => m.avgRating < 3.5);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Pro':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
      case 'Advanced':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white';
      case 'Intermediate':
        return 'bg-gradient-to-r from-green-600 to-teal-600 text-white';
      case 'Beginner':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'milestone':
        return <Target className="h-4 w-4 text-green-600" />;
      case 'session':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
    }
  };

  const joinedDate = new Date(employee.enrollmentDate);
  const daysSinceJoined = Math.floor((new Date().getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24));
  const avgHoursPerWeek = (employee.learningHours / (daysSinceJoined / 7)).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl">Employee Details</h1>
                <p className="text-sm text-gray-500">Comprehensive learning profile and analytics</p>
              </div>
            </div>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Employee Overview Card */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* Employee Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl mb-2">{employee.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {employee.role}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {employee.team} Team
                      </Badge>
                      <Badge variant="outline">
                        {employee.department}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getLevelBadgeColor(employee.skillLevel)}>
                    {employee.skillLevel}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Manager</div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{employee.manager || 'Sarah Johnson'}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Joined Date</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{new Date(employee.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Days on Platform</div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{daysSinceJoined} days</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="text-sm">{employee.email || `${employee.name.toLowerCase().replace(' ', '.')}@company.com`}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 opacity-80" />
              </div>
              <div className="text-3xl mb-1">{employee.learningHours}h</div>
              <div className="text-sm opacity-90">Total Time Spent</div>
              <div className="text-xs opacity-75 mt-1">~{avgHoursPerWeek}h per week</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="h-8 w-8 opacity-80" />
              </div>
              <div className="text-3xl mb-1">{employee.coursesCompleted}</div>
              <div className="text-sm opacity-90">Courses Completed</div>
              <div className="text-xs opacity-75 mt-1">{employee.coursesInProgress} in progress</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 opacity-80" />
              </div>
              <div className="text-3xl mb-1">{employee.progress}%</div>
              <div className="text-sm opacity-90">Overall Progress</div>
              <div className="text-xs opacity-75 mt-1">Career Track: {employee.careerPath || 'Software Engineer'}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Flame className="h-8 w-8 opacity-80" />
              </div>
              <div className="text-3xl mb-1">{employee.streak}</div>
              <div className="text-sm opacity-90">Day Streak 🔥</div>
              <div className="text-xs opacity-75 mt-1">Last active: {employee.lastActive}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Completed Courses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Completed Courses ({completedCourses.length})
                  </CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedCourses.slice(0, 5).map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{course.title}</h4>
                            {course.certificate && (
                              <Badge variant="outline" className="text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Certified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {course.track}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </span>
                            <span>Completed {new Date(course.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getLevelBadgeColor(course.level)}>
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{course.score}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Courses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  Currently Learning ({inProgressCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{course.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {course.track}
                            </span>
                            <span>Started {new Date(course.startedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="text-xs text-gray-500">
                              Est. completion: {new Date(course.estimatedCompletion).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <Badge className={getLevelBadgeColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                      <div className="mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.details}</div>
                        <div className="text-xs text-gray-400 mt-1">{activity.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mentor Sessions & Bookings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Mentor Sessions ({mentorStats.totalSessions})
                  </CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mentor Stats Overview */}
                <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl mb-1">{mentorStats.completedSessions}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">{mentorStats.scheduledSessions}</div>
                    <div className="text-xs text-gray-600">Scheduled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">{mentorStats.uniqueMentors}</div>
                    <div className="text-xs text-gray-600">Mentors</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl">{mentorStats.averageRating.toFixed(1)}</span>
                    </div>
                    <div className="text-xs text-gray-600">Avg Rating</div>
                  </div>
                </div>

                {/* HR Alert for Low-Rated Mentors */}
                {viewerRole === 'admin' && lowRatedMentors.length > 0 && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Award className="h-5 w-5 text-red-600 mt-0.5" />
                      </div>
                      <div>
                        <div className="font-medium text-red-900 mb-1">⚠️ HR Alert: Low Mentor Ratings Detected</div>
                        <div className="text-sm text-red-800 mb-2">
                          The following mentor(s) received below-threshold ratings from this employee:
                        </div>
                        <div className="space-y-1">
                          {lowRatedMentors.map((mentor) => (
                            <div key={mentor.mentorName} className="text-sm text-red-800 flex items-center gap-2">
                              <span className="font-medium">{mentor.mentorName}</span>
                              <span className="text-xs">
                                (Avg: {mentor.avgRating.toFixed(1)}/5.0 from {mentor.sessionCount} session{mentor.sessionCount > 1 ? 's' : ''})
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-red-700 mt-2">
                          Recommended Action: Review mentor performance and consider follow-up investigation
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session History */}
                <div className="space-y-3">
                  <h4 className="text-sm mb-3">Session History</h4>
                  {mentorSessions
                    .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime())
                    .slice(0, 8)
                    .map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{session.mentorName}</h4>
                              <Badge 
                                variant="outline" 
                                className={
                                  session.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                  session.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  'bg-gray-50 text-gray-700 border-gray-200'
                                }
                              >
                                {session.status}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600 mb-2">{session.mentorExpertise}</div>
                            <div className="text-sm text-gray-700 mb-2">{session.topic}</div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(session.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {session.rating ? (
                              <div className="flex flex-col items-end">
                                {renderStars(session.rating)}
                                <span className="text-xs text-gray-500 mt-1">{session.rating}/5</span>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Not rated yet
                              </Badge>
                            )}
                          </div>
                        </div>
                        {session.rating && session.rating <= 2 && (
                          <div className="mt-2 pt-2 border-t border-red-200 bg-red-50 -m-4 p-3 rounded-b-lg">
                            <div className="flex items-center gap-2 text-xs text-red-700">
                              <Award className="h-3 w-3" />
                              <span>⚠️ Low rating flagged for HR review</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* Mentor Performance Breakdown */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm mb-3">Performance by Mentor</h4>
                  <div className="space-y-3">
                    {Object.entries(mentorRatings)
                      .sort((a, b) => b[1].avgRating - a[1].avgRating)
                      .map(([mentorId, data]) => (
                        <div key={mentorId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{data.mentorName}</div>
                            <div className="text-xs text-gray-600">{data.sessionCount} session{data.sessionCount > 1 ? 's' : ''}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            {renderStars(Math.round(data.avgRating))}
                            <span className="text-sm font-medium w-12 text-right">
                              {data.avgRating.toFixed(1)}
                            </span>
                            {data.avgRating < 3.5 && (
                              <Badge variant="destructive" className="text-xs">
                                ⚠️ Review
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Achievements & Stats */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Achievements ({employee.badges})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-gray-600 mb-1">{achievement.description}</div>
                          <div className="text-xs text-gray-400">
                            Earned {new Date(achievement.earnedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Current Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-3">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-medium mb-1">{employee.careerPath || 'Software Engineer'}</h3>
                    <p className="text-sm text-gray-600">Primary Track</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-t">
                      <span className="text-sm text-gray-600">Beginner</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                      <span className="text-sm text-gray-600">Intermediate</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                      <span className="text-sm text-gray-600">Advanced</span>
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                      <span className="text-sm text-gray-600">Pro</span>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-medium">
                        {Math.round((employee.coursesCompleted / (employee.coursesCompleted + employee.coursesInProgress)) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((employee.coursesCompleted / (employee.coursesCompleted + employee.coursesInProgress)) * 100)} 
                      className="h-2" 
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rank in Team</span>
                      <span className="font-medium">#2 of 8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rank in Department</span>
                      <span className="font-medium">#5 of 24</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}