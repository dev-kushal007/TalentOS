import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Sparkles, ArrowLeft, Users, TrendingUp, Award, BookOpen,
  Search, Target, CheckCircle2, Clock, MessageSquare, Send,
  AlertCircle, Flame, Trophy, BarChart3, UserCheck, Eye
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import type { Page } from '../App';
import EmployeeDetail from './EmployeeDetail';

interface ManagerDashboardProps {
  onNavigate: (page: Page) => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  coursesCompleted: number;
  coursesInProgress: number;
  skillLevel: string;
  progress: number;
  streak: number;
  badges: number;
  lastActive: string;
  learningHours: number;
  enrollmentDate: string;
  performanceScore: number;
}

// Mock data for manager's team
const myTeam: TeamMember[] = [
  { 
    id: '1', 
    name: 'Alex Rivera', 
    role: 'Software Engineer', 
    coursesCompleted: 8, 
    coursesInProgress: 2, 
    skillLevel: 'Pro', 
    progress: 75, 
    streak: 12, 
    badges: 6, 
    lastActive: '2 hours ago', 
    learningHours: 42,
    enrollmentDate: '2024-01-15',
    performanceScore: 92
  },
  { 
    id: '2', 
    name: 'Jordan Lee', 
    role: 'Junior Developer', 
    coursesCompleted: 5, 
    coursesInProgress: 3, 
    skillLevel: 'Intermediate', 
    progress: 60, 
    streak: 8, 
    badges: 4, 
    lastActive: '5 hours ago', 
    learningHours: 28,
    enrollmentDate: '2024-02-10',
    performanceScore: 85
  },
  { 
    id: '3', 
    name: 'Morgan Chen', 
    role: 'Software Engineer', 
    coursesCompleted: 12, 
    coursesInProgress: 1, 
    skillLevel: 'Pro', 
    progress: 88, 
    streak: 20, 
    badges: 9, 
    lastActive: '1 hour ago', 
    learningHours: 56,
    enrollmentDate: '2023-11-05',
    performanceScore: 95
  },
  { 
    id: '4', 
    name: 'Taylor Kim', 
    role: 'QA Engineer', 
    coursesCompleted: 4, 
    coursesInProgress: 2, 
    skillLevel: 'Intermediate', 
    progress: 45, 
    streak: 5, 
    badges: 3, 
    lastActive: '1 day ago', 
    learningHours: 22,
    enrollmentDate: '2024-03-01',
    performanceScore: 78
  },
  { 
    id: '5', 
    name: 'Casey Park', 
    role: 'Software Engineer', 
    coursesCompleted: 3, 
    coursesInProgress: 1, 
    skillLevel: 'Beginner', 
    progress: 30, 
    streak: 2, 
    badges: 2, 
    lastActive: '3 days ago', 
    learningHours: 15,
    enrollmentDate: '2024-04-20',
    performanceScore: 68
  },
];

const progressTrendData = [
  { week: 'Week 1', teamAvg: 55, targetAvg: 60 },
  { week: 'Week 2', teamAvg: 58, targetAvg: 62 },
  { week: 'Week 3', teamAvg: 62, targetAvg: 65 },
  { week: 'Week 4', teamAvg: 66, targetAvg: 68 },
  { week: 'Week 5', teamAvg: 72, targetAvg: 70 },
];

const skillDistributionData = [
  { name: 'Beginner', value: 1 },
  { name: 'Intermediate', value: 2 },
  { name: 'Pro', value: 2 },
];

const recommendedCourses = [
  { id: 'C1', title: 'Advanced TypeScript Patterns', category: 'Development', duration: '8 weeks', level: 'Advanced' },
  { id: 'C2', title: 'System Design Fundamentals', category: 'Architecture', duration: '6 weeks', level: 'Intermediate' },
  { id: 'C3', title: 'Test Automation with Playwright', category: 'Testing', duration: '4 weeks', level: 'Intermediate' },
  { id: 'C4', title: 'Microservices Architecture', category: 'Backend', duration: '10 weeks', level: 'Advanced' },
  { id: 'C5', title: 'AWS Cloud Practitioner', category: 'Cloud', duration: '5 weeks', level: 'Beginner' },
];

export default function ManagerDashboard({ onNavigate }: ManagerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
  const [showCourseSuggestion, setShowCourseSuggestion] = useState(false);
  const [selectedMemberForCourse, setSelectedMemberForCourse] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [suggestionNote, setSuggestionNote] = useState('');

  // Filter team members based on search
  const filteredTeam = myTeam.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate team metrics
  const teamMetrics = {
    totalMembers: myTeam.length,
    avgProgress: Math.round(myTeam.reduce((sum, m) => sum + m.progress, 0) / myTeam.length),
    totalCoursesCompleted: myTeam.reduce((sum, m) => sum + m.coursesCompleted, 0),
    avgPerformanceScore: Math.round(myTeam.reduce((sum, m) => sum + m.performanceScore, 0) / myTeam.length),
    activeMembers: myTeam.filter(m => !m.lastActive.includes('day')).length,
    atRiskMembers: myTeam.filter(m => m.progress < 50 || m.performanceScore < 75).length,
  };

  const handleSendCourseSuggestion = () => {
    if (selectedMemberForCourse && selectedCourse) {
      const member = myTeam.find(m => m.id === selectedMemberForCourse);
      const course = recommendedCourses.find(c => c.id === selectedCourse);
      alert(`Course suggestion sent to ${member?.name}!\n\nCourse: ${course?.title}\nNote: ${suggestionNote || 'No additional notes'}`);
      setShowCourseSuggestion(false);
      setSelectedMemberForCourse(null);
      setSelectedCourse('');
      setSuggestionNote('');
    }
  };

  // If viewing employee detail
  if (selectedEmployee) {
    return (
      <EmployeeDetail 
        employee={selectedEmployee as any}
        onBack={() => setSelectedEmployee(null)}
        viewerRole="manager"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <UserCheck className="h-3 w-3 mr-1" />
              Team Manager
            </Badge>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">M</span>
              </div>
              <span className="text-sm">Manager</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">My Team Dashboard</h1>
          <p className="text-gray-600">Monitor and guide your team's learning progress</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-3xl">{teamMetrics.totalMembers}</span>
              </div>
              <p className="text-gray-600">Team Members</p>
              <p className="text-sm text-green-600 mt-1">{teamMetrics.activeMembers} active today</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-purple-600" />
                <span className="text-3xl">{teamMetrics.avgProgress}%</span>
              </div>
              <p className="text-gray-600">Avg Progress</p>
              <p className="text-sm text-gray-500 mt-1">Team learning completion</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-yellow-600" />
                <span className="text-3xl">{teamMetrics.totalCoursesCompleted}</span>
              </div>
              <p className="text-gray-600">Courses Completed</p>
              <p className="text-sm text-green-600 mt-1">+5 this month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <span className="text-3xl">{teamMetrics.avgPerformanceScore}</span>
              </div>
              <p className="text-gray-600">Avg Performance</p>
              {teamMetrics.atRiskMembers > 0 && (
                <p className="text-sm text-orange-600 mt-1">
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  {teamMetrics.atRiskMembers} need attention
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="team" className="space-y-6">
          <TabsList>
            <TabsTrigger value="team">Team Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="suggest">Suggest Courses</TabsTrigger>
          </TabsList>

          {/* Team Overview Tab */}
          <TabsContent value="team" className="space-y-6">
            {/* Search Bar */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members Table */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Team Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Skill Level</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeam.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {member.lastActive}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              member.skillLevel === 'Pro'
                                ? 'bg-purple-100 text-purple-700'
                                : member.skillLevel === 'Intermediate'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }
                          >
                            {member.skillLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Progress value={member.progress} className="w-20" />
                              <span className="text-sm">{member.progress}%</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-green-600">{member.coursesCompleted} completed</div>
                            <div className="text-orange-600">{member.coursesInProgress} in progress</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={
                              member.performanceScore >= 90 ? 'text-green-600' :
                              member.performanceScore >= 75 ? 'text-blue-600' :
                              'text-orange-600'
                            }>
                              {member.performanceScore}
                            </span>
                            {member.performanceScore >= 90 ? (
                              <Trophy className="h-4 w-4 text-yellow-500" />
                            ) : member.performanceScore < 75 ? (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">{member.streak} days</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedEmployee(member)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMemberForCourse(member.id);
                                setShowCourseSuggestion(true);
                              }}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Suggest
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Progress Trend */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Team Progress Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="teamAvg" stroke="#8b5cf6" strokeWidth={2} name="Team Average" />
                      <Line type="monotone" dataKey="targetAvg" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skill Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Team Skill Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={skillDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8b5cf6" name="Members" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers & Need Attention */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myTeam
                    .sort((a, b) => b.performanceScore - a.performanceScore)
                    .slice(0, 3)
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-medium">{member.performanceScore}</div>
                          <div className="text-sm text-gray-500">{member.coursesCompleted} courses</div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Members Needing Attention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myTeam
                    .filter(m => m.performanceScore < 80 || m.progress < 50)
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-orange-600 font-medium">{member.performanceScore}</div>
                          <div className="text-sm text-gray-500">{member.progress}% progress</div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Suggest Courses Tab */}
          <TabsContent value="suggest" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recommend Courses to Team Members</CardTitle>
                <p className="text-sm text-gray-600">Select a team member and course to send a personalized learning recommendation</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Team Member Selection */}
                  <div>
                    <label className="text-sm mb-2 block">Select Team Member</label>
                    <Select value={selectedMemberForCourse || ''} onValueChange={setSelectedMemberForCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a team member..." />
                      </SelectTrigger>
                      <SelectContent>
                        {myTeam.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} - {member.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label className="text-sm mb-2 block">Select Course</label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course..." />
                      </SelectTrigger>
                      <SelectContent>
                        {recommendedCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Note/Message */}
                <div>
                  <label className="text-sm mb-2 block">Add a Personal Note (Optional)</label>
                  <Textarea
                    placeholder="E.g., I think this course would be great for your current project..."
                    value={suggestionNote}
                    onChange={(e) => setSuggestionNote(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={!selectedMemberForCourse || !selectedCourse}
                  onClick={handleSendCourseSuggestion}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Course Recommendation
                </Button>
              </CardContent>
            </Card>

            {/* Available Courses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Available Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id} className="border">
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h4 className="mb-2">{course.title}</h4>
                          <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>{course.level}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}