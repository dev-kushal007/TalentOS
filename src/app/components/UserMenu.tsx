import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import type { Page, UserProfile } from '../App';

interface UserMenuProps {
  userProfile: UserProfile | null;
  onNavigate?: (page: Page) => void;
  onLogout?: () => void;
}

export default function UserMenu({ userProfile, onNavigate, onLogout }: UserMenuProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!userProfile) return null;

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    } else if (onNavigate) {
      onNavigate('landing');
    }
  };

  // Get user initials for avatar
  const initials = userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  
  // Generate email if not provided
  const email = userProfile.email || `${userProfile.name.toLowerCase().replace(/\s+/g, '.')}.rathi@kore.com`;

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">{initials}</span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {showUserMenu && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{userProfile.name}</div>
                  <div className="text-xs text-gray-500 truncate">{email}</div>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="py-1">
              {onNavigate && (
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('employee-dashboard');
                  }}
                >
                  <User className="h-4 w-4" />
                  My Dashboard
                </button>
              )}
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}