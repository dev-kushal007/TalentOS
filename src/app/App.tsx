import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CareerDiscovery from './components/CareerDiscovery';
import CareerChatAssistant from './components/CareerChatAssistant';
import LearningRoadmap from './components/LearningRoadmap';
import MentorPage from './components/MentorPage';
import AdminDashboard from './components/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import EmployeeDashboard from './components/EmployeeDashboard';

export type Page = 'landing' | 'discovery' | 'chat' | 'roadmap' | 'mentor' | 'admin' | 'loading' | 'employee-dashboard';

export interface UserProfile {
  name: string;
  email?: string;
  education: string;
  experience: string;
  interests: string[];
  careerGoal?: string;
  selectedCareerPath?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<string>('Product Manager');
  const [pendingNavigation, setPendingNavigation] = useState<{ page: Page; careerPath?: string } | null>(null);

  const handleNavigate = (page: Page, careerPath?: string, showLoading: boolean = false) => {
    if (careerPath) {
      setSelectedCareerPath(careerPath);
      // Also update the user profile to cache the selected career path
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          selectedCareerPath: careerPath
        });
      }
    }

    // Show loading screen when navigating to roadmap
    if (showLoading && page === 'roadmap') {
      setPendingNavigation({ page, careerPath });
      setCurrentPage('loading');
    } else {
      setCurrentPage(page);
    }
  };

  const handleLoadingComplete = () => {
    if (pendingNavigation) {
      setCurrentPage(pendingNavigation.page);
      setPendingNavigation(null);
    }
  };

  const handleCareerPathSelect = (careerPath: string) => {
    setSelectedCareerPath(careerPath);
    // Update user profile with selected career path
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        selectedCareerPath: careerPath
      });
    }
  };

  const handleLogout = () => {
    setUserProfile(null);
    setSelectedCareerPath('Product Manager');
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} onUserProfile={setUserProfile} />;
      case 'discovery':
        return <CareerDiscovery onNavigate={handleNavigate} userProfile={userProfile} onCareerPathSelect={handleCareerPathSelect} onLogout={handleLogout} />;
      case 'chat':
        return <CareerChatAssistant onNavigate={handleNavigate} userProfile={userProfile} onCareerPathSelect={handleCareerPathSelect} onLogout={handleLogout} />;
      case 'roadmap':
        return <LearningRoadmap onNavigate={handleNavigate} userProfile={userProfile} careerPath={userProfile?.selectedCareerPath || selectedCareerPath} onLogout={handleLogout} />;
      case 'mentor':
        return <MentorPage onNavigate={handleNavigate} userProfile={userProfile} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'loading':
        return <LoadingScreen onComplete={handleLoadingComplete} />;
      case 'employee-dashboard':
        return <EmployeeDashboard onNavigate={handleNavigate} userProfile={userProfile} onLogout={handleLogout} />;
      default:
        return <LandingPage onNavigate={handleNavigate} onUserProfile={setUserProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {renderPage()}
    </div>
  );
}