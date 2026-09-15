import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, User, Calendar, Clock, Trophy, Flame, Target, 
  CheckCircle2, BookOpen, Award, TrendingUp, Star, MessageSquare,
  Activity, BarChart3, Play, Lock, ChevronRight, Send, ArrowRight
} from 'lucide-react';
import type { Page, UserProfile } from '../App';

interface EmployeeDashboardProps {
  onNavigate: (page: Page) => void;
  userProfile: UserProfile | null;
  onLogout?: () => void;
}

interface MentorSession {
  id: string;
  mentorName: string;
  mentorExpertise: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
  rating?: number;
  feedback?: string;
  topic: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  level: string;
  track: string;
  nextLesson: string;
}

// Mock data
const upcomingSessions: MentorSession[] = [
  {
    id: '1',
    mentorName: 'Dr. Sarah Johnson',
    mentorExpertise: 'AI/ML Engineering',
    date: 'Nov 25, 2024',
    time: '2:00 PM - 3:00 PM',
    status: 'upcoming',
    topic: 'Deep Learning Fundamentals'
  },
  {
    id: '2',
    mentorName: 'Michael Chen',
    mentorExpertise: 'Product Management',
    date: 'Nov 28, 2024',
    time: '10:00 AM - 11:00 AM',
    status: 'upcoming',
    topic: 'Product Strategy & Roadmapping'
  }
];

const completedSessions: MentorSession[] = [
  {
    id: '3',
    mentorName: 'Emily Rodriguez',
    mentorExpertise: 'Cloud Architecture',
    date: 'Nov 18, 2024',
    time: '3:00 PM - 4:00 PM',
    status: 'completed',
    rating: 5,
    feedback: 'Excellent session! Very insightful.',
    topic: 'AWS Best Practices'
  },
  {
    id: '4',
    mentorName: 'David Kim',
    mentorExpertise: 'Full Stack Development',
    date: 'Nov 15, 2024',
    time: '1:00 PM - 2:00 PM',
    status: 'completed',
    rating: 4,
    feedback: 'Great practical examples.',
    topic: 'React Performance Optimization'
  },
  {
    id: '5',
    mentorName: 'Lisa Wang',
    mentorExpertise: 'UX Design',
    date: 'Nov 10, 2024',
    time: '4:00 PM - 5:00 PM',
    status: 'completed',
    topic: 'Design Systems at Scale'
  }
];

const coursesInProgress: Course[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    progress: 65,
    level: 'Intermediate',
    track: 'AI/ML',
    nextLesson: 'Neural Networks Introduction'
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    progress: 40,
    level: 'Advanced',
    track: 'Development',
    nextLesson: 'Generics and Type Guards'
  },
  {
    id: '3',
    title: 'Product Strategy',
    progress: 80,
    level: 'Pro',
    track: 'Product',
    nextLesson: 'Market Analysis'
  }
];

const achievements = [
  { id: '1', icon: '🎯', title: 'Fast Learner', description: 'Completed 5 courses in a month' },
  { id: '2', icon: '🔥', title: '30-Day Streak', description: 'Learned for 30 consecutive days' },
  { id: '3', icon: '⭐', title: 'Top Performer', description: 'Scored 95%+ on 3 assessments' },
  { id: '4', icon: '🏆', title: 'Mentor Favorite', description: 'Received 5-star ratings from mentors' },
  { id: '5', icon: '💡', title: 'Knowledge Seeker', description: 'Completed 10+ courses' },
  { id: '6', icon: '🎓', title: 'Certified Pro', description: 'Earned 5 course certificates' }
];

export default function EmployeeDashboard({ onNavigate, userProfile, onLogout }: EmployeeDashboardProps) {
  const [selectedSession, setSelectedSession] = useState<MentorSession | null>(null);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleSubmitFeedback = () => {
    if (selectedSession && feedbackRating > 0) {
      alert(`Feedback submitted for session with ${selectedSession.mentorName}\nRating: ${feedbackRating}/5\nFeedback: ${feedbackText}`);
      setShowFeedbackForm(false);
      setSelectedSession(null);
      setFeedbackRating(0);
      setFeedbackText('');
    }
  };

  // Calculate stats
  const totalCoursesCompleted = 12;
  const totalLearningHours = 48;
  const currentStreak = 15;
  const overallProgress = 72;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate('roadmap')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl">My Learning Dashboard</h1>
                <p className="text-sm text-gray-600">Track your progress and upcoming sessions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onNavigate('roadmap')}>
                <BookOpen className="h-4 w-4 mr-2" />
                My Roadmap
              </Button>
              <Button variant="outline" onClick={() => onNavigate('mentor')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Find Mentors
              </Button>
              {onLogout && (
                <Button variant="outline" onClick={onLogout}>
                  <Lock className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="border-0 shadow-lg mb-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl mb-2">Welcome back, {userProfile?.name || 'Learner'}! 👋</h2>
                <p className="text-blue-100 text-lg">Keep up the great work on your learning journey</p>
              </div>
              <div className="text-right">
                <div className="text-4xl mb-2">{overallProgress}%</div>
                <p className="text-blue-100">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <span className="text-3xl">{totalCoursesCompleted}</span>
              </div>
              <p className="text-gray-600">Courses Completed</p>
              <p className="text-sm text-green-600 mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-blue-600" />
                <span className="text-3xl">{totalLearningHours}h</span>
              </div>
              <p className="text-gray-600">Learning Hours</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Flame className="h-8 w-8 text-orange-600" />
                <span className="text-3xl">{currentStreak}</span>
              </div>
              <p className="text-gray-600">Day Streak</p>
              <p className="text-sm text-orange-600 mt-1">🔥 Keep it going!</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-purple-600" />
                <span className="text-3xl">{achievements.length}</span>
              </div>
              <p className="text-gray-600">Achievements</p>
              <p className="text-sm text-purple-600 mt-1">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Courses in Progress */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Courses in Progress
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => onNavigate('roadmap')}>
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {coursesInProgress.map((course) => (
                <Card key={course.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-1">{course.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{course.track}</Badge>
                          <Badge variant="outline" className="text-xs">{course.level}</Badge>
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next: {course.nextLesson}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200 hover:shadow-md transition-shadow cursor-pointer"
                    title={achievement.description}
                  >
                    <span className="text-3xl mb-1">{achievement.icon}</span>
                    <span className="text-xs text-center text-gray-700">{achievement.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mentor Sessions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Upcoming Mentor Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <Card key={session.id} className="border-l-4 border-l-green-500 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="mb-1">{session.mentorName}</h4>
                          <p className="text-sm text-gray-600">{session.mentorExpertise}</p>
                        </div>
                        <Badge className="bg-green-600">Upcoming</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          <span>{session.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Join Session
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No upcoming sessions</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => onNavigate('mentor')}
                  >
                    Book a Mentor Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Previous Sessions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Previous Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedSessions.map((session) => (
                <Card key={session.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="mb-1">{session.mentorName}</h4>
                        <p className="text-sm text-gray-600">{session.mentorExpertise}</p>
                      </div>
                      {session.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < session.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span>{session.topic}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                    </div>
                    {session.feedback && (
                      <div className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded mb-2">
                        "{session.feedback}"
                      </div>
                    )}
                    {!session.rating && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setSelectedSession(session);
                          setShowFeedbackForm(true);
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Give Feedback
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Feedback Form Modal */}
        {showFeedbackForm && selectedSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
              <CardHeader>
                <CardTitle>Rate Your Session</CardTitle>
                <p className="text-sm text-gray-600">
                  Session with {selectedSession.mentorName}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="text-sm mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= feedbackRating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors cursor-pointer`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="text-sm mb-2 block">Feedback (Optional)</label>
                  <Textarea
                    placeholder="Share your thoughts about the session..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowFeedbackForm(false);
                      setSelectedSession(null);
                      setFeedbackRating(0);
                      setFeedbackText('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={handleSubmitFeedback}
                    disabled={feedbackRating === 0}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}