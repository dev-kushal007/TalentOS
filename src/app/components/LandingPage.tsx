import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sparkles, Target, TrendingUp, Users, MessageCircle, Zap, Award, BookOpen, ArrowLeft } from 'lucide-react';
import type { Page, UserProfile } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page, careerPath?: string, showLoading?: boolean) => void;
  onUserProfile: (profile: UserProfile) => void;
}

export default function LandingPage({ onNavigate, onUserProfile }: LandingPageProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    experience: '',
    interests: '',
  });

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name: formData.name,
      education: formData.education,
      experience: formData.experience,
      interests: formData.interests.split(',').map(i => i.trim()),
    };
    
    // Detect career path based on interests
    const interestsLower = formData.interests.toLowerCase();
    let detectedCareerPath = 'Software Engineer';
    
    if (interestsLower.includes('gemini') || interestsLower.includes('llm') || 
        interestsLower.includes('vertex') || interestsLower.includes('google ai')) {
      detectedCareerPath = 'Gemini AI Developer';
    } else if (interestsLower.includes('vibe') || interestsLower.includes('cursor') || 
               interestsLower.includes('copilot') || interestsLower.includes('ai coding') ||
               interestsLower.includes('ai-assisted')) {
      detectedCareerPath = 'AI-Assisted Developer';
    } else if (interestsLower.includes('cloud') || interestsLower.includes('serverless') || 
               interestsLower.includes('devops') || interestsLower.includes('cloud run')) {
      detectedCareerPath = 'Cloud Run & Serverless Developer';
    } else if (interestsLower.includes('code') || interestsLower.includes('coding') || 
               interestsLower.includes('programming') || interestsLower.includes('software') ||
               interestsLower.includes('development') || interestsLower.includes('engineer')) {
      detectedCareerPath = 'Software Engineer';
    } else if (interestsLower.includes('design') || interestsLower.includes('ui') || 
               interestsLower.includes('ux') || interestsLower.includes('figma')) {
      detectedCareerPath = 'Product Manager';
    } else if (interestsLower.includes('product') || interestsLower.includes('management') || 
               interestsLower.includes('strategy')) {
      detectedCareerPath = 'Product Manager';
    } else if (interestsLower.includes('data') || interestsLower.includes('analytics') || 
               interestsLower.includes('machine learning') || interestsLower.includes('ml') ||
               interestsLower.includes('ai') || interestsLower.includes('artificial intelligence')) {
      detectedCareerPath = 'AI/ML Engineer';
    } else if (interestsLower.includes('test') || interestsLower.includes('qa') || 
               interestsLower.includes('quality') || interestsLower.includes('testing')) {
      detectedCareerPath = 'QA Engineer';
    }
    
    profile.selectedCareerPath = detectedCareerPath;
    onUserProfile(profile);
    // Navigate directly to roadmap with detected career path
    onNavigate('roadmap', detectedCareerPath, true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">TalentOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('admin')}>For Companies</Button>
            <Button variant="outline">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showOnboarding ? (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-4">
              <span className="text-purple-700">AI-Powered Career Development</span>
            </div>
            
            <h1 className="text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Personalized career upskilling for everyone
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, fresher, or professional — discover your perfect career path, 
              assess your skills, and follow a personalized learning roadmap powered by AI.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={handleGetStarted}>
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started Here
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('chat')}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to Career Assistant
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3>Discover Careers</h3>
                  <p className="text-gray-600">Explore career paths tailored to your interests and goals</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3>Personalized Roadmap</h3>
                  <p className="text-gray-600">Get a custom learning path based on your current skill level</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3>Expert Mentors</h3>
                  <p className="text-gray-600">Connect with industry mentors for personalized guidance</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 p-8 bg-white/60 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-gray-600 mt-1">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">200+</div>
                <div className="text-gray-600 mt-1">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
                <div className="text-gray-600 mt-1">Expert Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">95%</div>
                <div className="text-gray-600 mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Onboarding Form */
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => setShowOnboarding(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Let's get to know you</CardTitle>
                <p className="text-center text-gray-600">Tell us about yourself so we can personalize your experience</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Status</Label>
                    <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School Student</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student (No Experience)</SelectItem>
                        <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                        <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <Input
                      id="interests"
                      placeholder="e.g., Technology, Design, Business, Data"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      required
                    />
                    <p className="text-sm text-gray-500">Separate multiple interests with commas</p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                      Continue to Career Discovery
                    </Button>
                    <Button type="button" variant="outline" onClick={() => onNavigate('chat')}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}