import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Sparkles, ArrowLeft, Users, TrendingUp, Award, BookOpen,
  Search, Download, Filter, Trophy, Flame, Target, CheckCircle2,
  Calendar, Clock, MessageSquare, Brain, BarChart3, Shield, UserCheck, LogIn, Eye, EyeOff
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import type { Page } from '../App';
import EmployeeDetail from './EmployeeDetail';
import ManagerDashboard from './ManagerDashboard';

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  team: string;
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
}

interface TeamData {
  name: string;
  members: number;
  avgProgress: number;
  coursesCompleted: number;
  engagementRate: number;
}

interface MentorData {
  id: string;
  name: string;
  expertise: string;
  sessions: number;
  rating: number;
  availability: 'Available' | 'Busy' | 'Offline';
}

const employees: Employee[] = [
  { id: '1', name: 'Alex Rivera', department: 'Engineering', team: 'Backend', role: 'Software Engineer', coursesCompleted: 8, coursesInProgress: 2, skillLevel: 'Advanced', progress: 75, streak: 12, badges: 5, lastActive: '2 hours ago', learningHours: 45, enrollmentDate: '2024-01-15' },
  { id: '2', name: 'Samantha Kim', department: 'Product', team: 'Core Product', role: 'Product Manager', coursesCompleted: 12, coursesInProgress: 1, skillLevel: 'Pro', progress: 90, streak: 20, badges: 8, lastActive: '1 hour ago', learningHours: 68, enrollmentDate: '2024-01-10' },
  { id: '3', name: 'Jordan Chen', department: 'Design', team: 'UX Research', role: 'UX Designer', coursesCompleted: 6, coursesInProgress: 3, skillLevel: 'Intermediate', progress: 60, streak: 7, badges: 4, lastActive: '5 hours ago', learningHours: 32, enrollmentDate: '2024-02-01' },
  { id: '4', name: 'Taylor Brown', department: 'Engineering', team: 'DevOps', role: 'DevOps Engineer', coursesCompleted: 5, coursesInProgress: 2, skillLevel: 'Intermediate', progress: 55, streak: 5, badges: 3, lastActive: '3 hours ago', learningHours: 28, enrollmentDate: '2024-02-15' },
  { id: '5', name: 'Morgan Lee', department: 'Product', team: 'Growth', role: 'Product Designer', coursesCompleted: 10, coursesInProgress: 1, skillLevel: 'Advanced', progress: 85, streak: 15, badges: 6, lastActive: '30 min ago', learningHours: 52, enrollmentDate: '2024-01-20' },
  { id: '6', name: 'Casey Martinez', department: 'Engineering', team: 'Frontend', role: 'Frontend Developer', coursesCompleted: 7, coursesInProgress: 2, skillLevel: 'Advanced', progress: 70, streak: 9, badges: 4, lastActive: '4 hours ago', learningHours: 38, enrollmentDate: '2024-02-05' },
  { id: '7', name: 'Riley Thompson', department: 'Engineering', team: 'QA', role: 'QA Engineer', coursesCompleted: 4, coursesInProgress: 1, skillLevel: 'Beginner', progress: 40, streak: 3, badges: 2, lastActive: '1 day ago', learningHours: 18, enrollmentDate: '2024-03-01' },
  { id: '8', name: 'Drew Wilson', department: 'Product', team: 'Analytics', role: 'Data Analyst', coursesCompleted: 9, coursesInProgress: 2, skillLevel: 'Advanced', progress: 80, streak: 14, badges: 5, lastActive: '2 hours ago', learningHours: 48, enrollmentDate: '2024-01-25' },
];

const teams: TeamData[] = [
  { name: 'Backend Team', members: 8, avgProgress: 72, coursesCompleted: 45, engagementRate: 88 },
  { name: 'Frontend Team', members: 6, avgProgress: 68, coursesCompleted: 38, engagementRate: 85 },
  { name: 'Core Product', members: 5, avgProgress: 85, coursesCompleted: 52, engagementRate: 95 },
  { name: 'DevOps', members: 4, avgProgress: 58, coursesCompleted: 28, engagementRate: 75 },
  { name: 'UX Research', members: 7, avgProgress: 65, coursesCompleted: 35, engagementRate: 82 },
];

const mentors: MentorData[] = [
  { id: '1', name: 'Dr. Sarah Johnson', expertise: 'AI/ML Engineering', sessions: 24, rating: 4.9, availability: 'Available' },
  { id: '2', name: 'Michael Chen', expertise: 'Product Management', sessions: 31, rating: 4.8, availability: 'Busy' },
  { id: '3', name: 'Emily Rodriguez', expertise: 'Cloud Architecture', sessions: 18, rating: 4.7, availability: 'Available' },
  { id: '4', name: 'David Kim', expertise: 'Full Stack Development', sessions: 27, rating: 4.9, availability: 'Available' },
  { id: '5', name: 'Lisa Wang', expertise: 'UX Design', sessions: 22, rating: 4.6, availability: 'Offline' },
];

const monthlyActivityData = [
  { month: 'Jan', activeUsers: 125, newEnrollments: 35, completionRate: 78 },
  { month: 'Feb', activeUsers: 148, newEnrollments: 42, completionRate: 82 },
  { month: 'Mar', activeUsers: 172, newEnrollments: 38, completionRate: 85 },
  { month: 'Apr', activeUsers: 195, newEnrollments: 45, completionRate: 87 },
  { month: 'May', activeUsers: 218, newEnrollments: 52, completionRate: 89 },
  { month: 'Jun', activeUsers: 245, newEnrollments: 48, completionRate: 91 },
];

const departmentPerformance = [
  { name: 'Engineering', progress: 72, engagement: 85 },
  { name: 'Product', progress: 85, engagement: 92 },
  { name: 'Design', progress: 68, engagement: 80 },
  { name: 'Data', progress: 78, engagement: 88 },
];

const skillDistribution = [
  { name: 'Product Management', value: 35 },
  { name: 'Engineering', value: 28 },
  { name: 'Design', value: 20 },
  { name: 'Data Science', value: 12 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'manager' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    
    // Simulate authentication delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        setTimeout(() => {
          setIsAuthenticated(true);
          setUserRole('admin');
          setIsLoggingIn(false);
        }, 800);
      } else if (username === 'manager' && password === 'manager') {
        setTimeout(() => {
          setIsAuthenticated(true);
          setUserRole('manager');
          setIsLoggingIn(false);
        }, 800);
      } else {
        setLoginError('Invalid credentials. Please use admin/admin or manager/manager');
        setIsLoggingIn(false);
      }
    }, 1200);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Enterprise Admin</CardTitle>
            <p className="text-gray-600 mt-2">TalentOS Learning Management System</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Username</label>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {loginError}
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
                <p><strong>Demo Credentials:</strong></p>
                <p>HR Admin: <code className="bg-white px-2 py-1 rounded">admin</code> / <code className="bg-white px-2 py-1 rounded">admin</code></p>
                <p>Manager: <code className="bg-white px-2 py-1 rounded">manager</code> / <code className="bg-white px-2 py-1 rounded">manager</code></p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                size="lg"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full mr-2" />
                ) : (
                  <LogIn className="mr-2 h-5 w-5" />
                )}
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('landing')}
                className="text-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Dashboard (after authentication)
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const totalEmployees = employees.length;
  const avgProgress = Math.round(employees.reduce((sum, emp) => sum + emp.progress, 0) / totalEmployees);
  const totalCoursesCompleted = employees.reduce((sum, emp) => sum + emp.coursesCompleted, 0);
  
  // Active users in last month
  const activeUsersLastMonth = employees.filter(emp => {
    const lastActiveHours = emp.lastActive.includes('hour') ? 1 : emp.lastActive.includes('min') ? 1 : 30;
    return lastActiveHours < 720; // 30 days
  }).length;

  // Active mentors
  const activeMentors = mentors.filter(m => m.availability !== 'Offline').length;

  // Show employee detail if selected
  if (selectedEmployee) {
    return <EmployeeDetail employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} viewerRole="admin" />;
  }

  // Show Manager Dashboard if logged in as manager
  if (userRole === 'manager') {
    return <ManagerDashboard onNavigate={onNavigate} />;
  }

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
              <span className="text-xl">TalentOS - Enterprise</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white">A</span>
              </div>
              <div className="text-sm">
                <div>Admin</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => setIsAuthenticated(false)}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Enterprise Learning Dashboard</h1>
          <p className="text-gray-600">Track team progress, skill development, and engagement across your organization</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +{activeUsersLastMonth} active
                </Badge>
              </div>
              <div className="text-3xl mb-1">{activeUsersLastMonth}</div>
              <div className="text-gray-700">Active Users (30 days)</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {activeMentors}/{mentors.length} online
                </Badge>
              </div>
              <div className="text-3xl mb-1">{activeMentors}</div>
              <div className="text-gray-700">Active Mentors</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +12% this month
                </Badge>
              </div>
              <div className="text-3xl mb-1">{avgProgress}%</div>
              <div className="text-gray-700">Avg User Progress</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Backend Team
                </Badge>
              </div>
              <div className="text-3xl mb-1">{teams[0].name.split(' ')[0]}</div>
              <div className="text-gray-700">Top Performing Team</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Activity Trend */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Monthly User Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activeUsers" fill="#3b82f6" name="Active Users" />
                  <Bar dataKey="newEnrollments" fill="#8b5cf6" name="New Enrollments" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" fill="#3b82f6" name="Avg Progress %" />
                  <Bar dataKey="engagement" fill="#10b981" name="Engagement %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Teams Performance Overview */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Top Performing Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams.sort((a, b) => b.avgProgress - a.avgProgress).map((team, idx) => (
                <div key={team.name} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-300' : idx === 2 ? 'bg-orange-300' : 'bg-gray-200'
                  }`}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4>{team.name}</h4>
                        <p className="text-sm text-gray-600">{team.members} members • {team.coursesCompleted} courses completed</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {team.engagementRate}% engagement
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={team.avgProgress} className="h-2 flex-1" />
                      <span className="text-sm">{team.avgProgress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Different Views */}
        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="employees">Employee Progress</TabsTrigger>
            <TabsTrigger value="mentors">Mentor Management</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
            <TabsTrigger value="insights">HR Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Employee Learning Progress</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <select 
                      className="px-3 py-2 border rounded-lg text-sm"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Skill Level</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Learning Hours</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Streak</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((emp) => (
                      <TableRow 
                        key={emp.id} 
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        <TableCell>
                          <div>
                            <div>{emp.name}</div>
                            <div className="text-sm text-gray-500">{emp.role}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{emp.team}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              emp.skillLevel === 'Pro' ? 'default' : 
                              emp.skillLevel === 'Advanced' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {emp.skillLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="w-32">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>{emp.progress}%</span>
                            </div>
                            <Progress value={emp.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>{emp.coursesCompleted}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>{emp.learningHours}h</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{emp.lastActive}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span>{emp.streak} days</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentors">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Mentor Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentors.map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white">{mentor.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4>{mentor.name}</h4>
                          <p className="text-sm text-gray-600">{mentor.expertise}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Sessions</div>
                          <div>{mentor.sessions}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Rating</div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-yellow-600" />
                            <span>{mentor.rating}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={mentor.availability === 'Available' ? 'default' : 'secondary'}
                          className={
                            mentor.availability === 'Available' ? 'bg-green-600' :
                            mentor.availability === 'Busy' ? 'bg-yellow-600' :
                            'bg-gray-400'
                          }
                        >
                          {mentor.availability}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Skill Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={skillDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Completion Rate Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="completionRate" stroke="#10b981" strokeWidth={3} name="Completion Rate %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    HR Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>High Engagement Departments</span>
                    </div>
                    <p className="text-gray-700 text-sm">Product team shows 92% engagement rate. Consider them for mentorship programs.</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-yellow-600" />
                      <span>Skill Gap Analysis</span>
                    </div>
                    <p className="text-gray-700 text-sm">QA team has lower completion rates. Recommend onboarding support or mentorship pairing.</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>Retention Focus</span>
                    </div>
                    <p className="text-gray-700 text-sm">85% of employees active in last 30 days. Focus on re-engaging inactive 15% through targeted campaigns.</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-purple-600" />
                      <span>Recognition Opportunity</span>
                    </div>
                    <p className="text-gray-700 text-sm">8 employees achieved Pro level this month. Consider public recognition or rewards.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    LMS Usage Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Platform Adoption Rate</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Course Completion Rate</span>
                      <span className="text-sm">73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Mentor Utilization</span>
                      <span className="text-sm">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Mobile App Usage</span>
                      <span className="text-sm">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="mb-3">Key Metrics Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Learning Hours:</span>
                        <span>1,240 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Session Duration:</span>
                        <span>28 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Peak Learning Time:</span>
                        <span>2-4 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Course Satisfaction:</span>
                        <span>4.7/5.0 ⭐</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}