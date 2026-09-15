import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Target, Brain, Rocket } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: 'Analyzing your interests...', duration: 800 },
    { icon: Target, text: 'Identifying career paths...', duration: 900 },
    { icon: Zap, text: 'Curating personalized courses...', duration: 850 },
    { icon: Rocket, text: 'Crafting your roadmap...', duration: 950 },
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);

    // Step transitions
    let stepTimeouts: NodeJS.Timeout[] = [];
    let cumulativeTime = 0;

    steps.forEach((step, index) => {
      cumulativeTime += step.duration;
      const timeout = setTimeout(() => {
        setCurrentStep(index);
      }, cumulativeTime);
      stepTimeouts.push(timeout);
    });

    // Complete loading after all steps
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      stepTimeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-md w-full px-8">
        {/* Main Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Animated ring */}
            <div className="absolute inset-0 animate-spin">
              <div className="h-32 w-32 rounded-full border-4 border-transparent border-t-purple-600 border-r-pink-600"></div>
            </div>
            
            {/* Inner circle */}
            <div className="relative h-32 w-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-center mb-2">Crafting Your Custom Career Path</h2>
        <p className="text-gray-600 text-center mb-8">Hang tight! We're building something amazing for you...</p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">{progress}%</div>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <CurrentIcon className="h-6 w-6 text-purple-600 animate-pulse" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 animate-pulse">{steps[currentStep].text}</p>
            </div>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentStep 
                  ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'w-2 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        {/* Fun facts */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 italic">
            💡 Did you know? Personalized learning paths can increase skill mastery by up to 60%!
          </p>
        </div>
      </div>
    </div>
  );
}