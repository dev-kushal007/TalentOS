import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Sparkles, ArrowLeft, Star, MapPin, Briefcase, 
  Clock, CheckCircle2, MessageSquare, Video, X
} from 'lucide-react';
import type { Page, UserProfile } from '../App';
import UserMenu from './UserMenu';

interface MentorPageProps {
  onNavigate: (page: Page) => void;
  userProfile: UserProfile | null;
  onLogout?: () => void;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  availability: string;
  image: string;
  location: string;
  type: 'internal' | 'external';
  platform?: string; // For external mentors (e.g., "YouTube", "LinkedIn Learning")
}

const internalMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Product Manager',
    company: 'Google',
    expertise: ['Product Strategy', 'User Research', 'Analytics'],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 150,
    availability: 'Next available: Tomorrow',
    image: 'https://images.unsplash.com/photo-1746513534315-caa52d3f462c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTkzMTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Mountain View, CA',
    type: 'internal'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'Engineering Director',
    company: 'Google',
    expertise: ['Technical Leadership', 'System Design', 'Cloud Architecture'],
    rating: 5.0,
    reviews: 89,
    hourlyRate: 200,
    availability: 'Next available: This week',
    image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxOTIyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Sunnyvale, CA',
    type: 'internal'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    title: 'Lead UX Designer',
    company: 'Google',
    expertise: ['UX Research', 'Design Systems', 'Prototyping'],
    rating: 4.8,
    reviews: 156,
    hourlyRate: 120,
    availability: 'Next available: Today',
    image: 'https://images.unsplash.com/photo-1746513534315-caa52d3f462c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTkzMTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'San Francisco, CA',
    type: 'internal'
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Staff ML Engineer',
    company: 'Google',
    expertise: ['Machine Learning', 'AI/ML', 'Deep Learning'],
    rating: 4.9,
    reviews: 94,
    hourlyRate: 180,
    availability: 'Next available: Next week',
    image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxOTIyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Palo Alto, CA',
    type: 'internal'
  }
];

const externalMentors: Mentor[] = [
  {
    id: '5',
    name: 'Ali Abdaal',
    title: 'YouTuber & Productivity Expert',
    company: 'YouTube Creator',
    expertise: ['Productivity', 'Content Creation', 'Personal Development'],
    rating: 4.9,
    reviews: 2340,
    hourlyRate: 300,
    availability: 'Limited slots available',
    image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxOTIyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'London, UK',
    type: 'external',
    platform: 'YouTube'
  },
  {
    id: '6',
    name: 'Clement Mihailescu',
    title: 'Ex-Google & Ex-Facebook Engineer',
    company: 'AlgoExpert',
    expertise: ['Algorithms', 'System Design', 'Interview Prep'],
    rating: 5.0,
    reviews: 1890,
    hourlyRate: 250,
    availability: 'Next available: This month',
    image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxOTIyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'San Francisco, CA',
    type: 'external',
    platform: 'YouTube'
  },
  {
    id: '7',
    name: 'Emma Bostian',
    title: 'Software Engineer & Educator',
    company: 'Spotify',
    expertise: ['Frontend Development', 'Career Growth', 'Tech Leadership'],
    rating: 4.8,
    reviews: 567,
    hourlyRate: 200,
    availability: 'Next available: Tomorrow',
    image: 'https://images.unsplash.com/photo-1746513534315-caa52d3f462c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTkzMTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Berlin, Germany',
    type: 'external',
    platform: 'LinkedIn Learning'
  },
  {
    id: '8',
    name: 'Traversy Media',
    title: 'Full Stack Developer & Instructor',
    company: 'YouTube Creator',
    expertise: ['Web Development', 'JavaScript', 'Full Stack'],
    rating: 4.9,
    reviews: 3450,
    hourlyRate: 180,
    availability: 'Next available: This week',
    image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxOTIyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Boston, MA',
    type: 'external',
    platform: 'YouTube'
  }
];

const feedbackHistory = [
  {
    id: '1',
    mentorName: 'Sarah Chen',
    date: '2024-10-15',
    topic: 'Product Strategy Review',
    notes: 'Kushal showed great understanding of user research fundamentals. Recommended focusing on quantitative analysis next.',
    rating: 5
  },
  {
    id: '2',
    mentorName: 'Sarah Chen',
    date: '2024-09-28',
    topic: 'Career Path Discussion',
    notes: 'Discussed transition into product management. Kushal has strong analytical skills that will serve well in PM role.',
    rating: 5
  },
];

export default function MentorPage({ onNavigate, userProfile, onLogout }: MentorPageProps) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookedSession, setBookedSession] = useState<{mentor: string; date: string; time: string} | null>(null);

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const handleBookSession = () => {
    if (selectedMentor && selectedDate && selectedTime) {
      setBookedSession({
        mentor: selectedMentor.name,
        date: selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: selectedTime
      });
      setShowSuccessModal(true);
      
      // Auto-close modal and reset form after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        setSelectedMentor(null);
        setSelectedDate(undefined);
        setSelectedTime(null);
        setSessionNotes('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Success Modal */}
      {showSuccessModal && bookedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl mb-2">Session Requested!</h3>
              <p className="text-gray-600 mb-6">
                Your session request with <span className="font-semibold">{bookedSession.mentor}</span> has been sent.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{bookedSession.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{bookedSession.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                You'll receive a confirmation email once {bookedSession.mentor} accepts your request.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={() => setShowSuccessModal(false)}
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('roadmap')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl">TalentOS</span>
            </div>
          </div>
          {userProfile && (
            <UserMenu userProfile={userProfile} onNavigate={onNavigate} onLogout={onLogout} />
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Connect with Expert Mentors</h1>
          <p className="text-gray-600">Get personalized guidance from industry professionals</p>
        </div>

        <Tabs defaultValue="mentors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="feedback">My Sessions & Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Mentor List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Internal Mentors Section */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-2xl mb-1">Find Mentors from my Company</h2>
                    <p className="text-gray-600">Connect with experts at Google</p>
                  </div>
                  <div className="space-y-4">
                    {internalMentors.map((mentor) => (
                      <Card 
                        key={mentor.id} 
                        className={`border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                          selectedMentor?.id === mentor.id ? 'ring-2 ring-purple-600' : ''
                        }`}
                        onClick={() => setSelectedMentor(mentor)}
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <ImageWithFallback
                              src={mentor.image}
                              alt={mentor.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3>{mentor.name}</h3>
                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Google</Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{mentor.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{mentor.location}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{mentor.rating}</span>
                                    <span className="text-gray-500 text-sm">({mentor.reviews})</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {mentor.expertise.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary">{skill}</Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>{mentor.availability}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMentor(mentor);
                                  }}
                                >
                                  Request Session
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* External Mentors Section */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-2xl mb-1">Find External Mentors</h2>
                    <p className="text-gray-600">Learn from industry experts on YouTube, LinkedIn Learning, and more</p>
                  </div>
                  <div className="space-y-4">
                    {externalMentors.map((mentor) => (
                      <Card 
                        key={mentor.id} 
                        className={`border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                          selectedMentor?.id === mentor.id ? 'ring-2 ring-purple-600' : ''
                        }`}
                        onClick={() => setSelectedMentor(mentor)}
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <ImageWithFallback
                              src={mentor.image}
                              alt={mentor.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3>{mentor.name}</h3>
                                    {mentor.platform && (
                                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">{mentor.platform}</Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{mentor.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{mentor.location}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{mentor.rating}</span>
                                    <span className="text-gray-500 text-sm">({mentor.reviews})</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {mentor.expertise.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary">{skill}</Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>{mentor.availability}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMentor(mentor);
                                  }}
                                >
                                  Request Session
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Panel */}
              <div>
                {selectedMentor ? (
                  <Card className="border-0 shadow-lg sticky top-24">
                    <CardHeader>
                      <CardTitle>Book with {selectedMentor.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="text-sm mb-2 block">Select Date</label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                          disabled={(date) => date < new Date()}
                        />
                      </div>

                      <div>
                        <label className="text-sm mb-2 block">Select Time</label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm mb-2 block">Session Type</label>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <Video className="mr-2 h-4 w-4" />
                            Video Call (1 hour)
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat Session (30 min)
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm mb-2 block">What would you like to discuss?</label>
                        <Textarea
                          placeholder="E.g., I'd like to review my product strategy approach..."
                          value={sessionNotes}
                          onChange={(e) => setSessionNotes(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="border-t pt-4">
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                          disabled={!selectedDate || !selectedTime}
                          onClick={handleBookSession}
                        >
                          Request Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a mentor to book a session</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="max-w-4xl space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Session History & Mentor Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {feedbackHistory.map((feedback) => (
                    <Card key={feedback.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="mb-1">{feedback.topic}</h4>
                            <div className="text-sm text-gray-600">
                              with {feedback.mentorName} • {new Date(feedback.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-gray-600 mt-1" />
                            <span className="text-sm">Mentor's Notes:</span>
                          </div>
                          <p className="text-gray-700">{feedback.notes}</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Progress Summary */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <h3 className="mb-4">Your Progress Summary</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">2</div>
                      <div className="text-gray-600">Total Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">5.0</div>
                      <div className="text-gray-600">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">3</div>
                      <div className="text-gray-600">Skills Improved</div>
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