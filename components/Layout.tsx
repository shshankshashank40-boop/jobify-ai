
import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, FileText, Target, Users, Settings, Zap, X, User, Shield, CreditCard, Bell, LogOut, Save } from 'lucide-react';
import { ResumeProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile?: ResumeProfile | null;
  onLogout: () => void;
  onUpdateProfile: (updatedProfile: ResumeProfile) => void;
}

// Define the navigation items used in the sidebar and mobile nav
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'resume', label: 'Resume Analyzer', icon: FileText },
  { id: 'matching', label: 'Job Matching', icon: Target },
  { id: 'interview', label: 'Career Prep', icon: Users },
];

// CRITICAL: Define Modal OUTSIDE of the parent component to prevent focus loss issues
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X size={20} className="text-slate-500" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[80vh]">
        {children}
      </div>
    </div>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userProfile, onLogout, onUpdateProfile }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Local state for profile editing
  const [editProfile, setEditProfile] = useState<Partial<ResumeProfile>>({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: [],
    experience: [],
    education: []
  });

  // Sync local state when userProfile prop changes and modal is closed
  useEffect(() => {
    if (userProfile && !showProfile) {
      setEditProfile(userProfile);
    }
  }, [userProfile, showProfile]);

  // Ensure modal starts with fresh data whenever it's toggled ON
  const toggleProfileModal = useCallback(() => {
    if (!showProfile && userProfile) {
      setEditProfile(userProfile);
    }
    setShowProfile(!showProfile);
  }, [showProfile, userProfile]);

  const handleInputChange = (field: keyof ResumeProfile, value: string) => {
    setEditProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    const baseProfile: ResumeProfile = userProfile || {
      fullName: '',
      email: '',
      phone: '',
      summary: 'Professional profile managed via Jobify AI.',
      skills: [],
      experience: [],
      education: []
    };

    const updated: ResumeProfile = {
      ...baseProfile,
      fullName: editProfile.fullName ?? baseProfile.fullName,
      email: editProfile.email ?? baseProfile.email,
      phone: editProfile.phone ?? baseProfile.phone,
    };

    onUpdateProfile(updated);
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col gap-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Zap className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Jobify<span className="text-indigo-600">AI</span></h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-slate-900 rounded-2xl p-4 text-white">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">Pro Account</p>
          <p className="text-sm font-medium">Unlimited Analysis</p>
          <button className="mt-3 w-full py-2 bg-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-colors">
            Manage Subscription
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden glass-effect sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Zap className="text-indigo-600 w-6 h-6" />
          <h1 className="text-lg font-bold">Jobify AI</h1>
        </div>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              <item.icon size={20} />
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
          <h2 className="text-lg font-medium text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={toggleProfileModal}
              className="group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs group-hover:ring-2 group-hover:ring-indigo-200 transition-all">
                {userProfile?.fullName ? userProfile.fullName.charAt(0) : 'JD'}
              </div>
            </button>
          </div>
        </header>
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <Modal title="Settings" onClose={() => setShowSettings(false)}>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">General</h4>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors text-slate-700">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-slate-400" />
                  <span>Notifications</span>
                </div>
                <div className="w-10 h-5 bg-indigo-600 rounded-full flex items-center px-1">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors text-slate-700">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-slate-400" />
                  <span>Privacy & Security</span>
                </div>
              </button>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">AI Engine</h4>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm text-slate-600 mb-3">Active Model: <span className="font-bold text-indigo-600">Gemini 3 Pro</span></p>
                <p className="text-xs text-slate-400">High-performance reasoning and career path generation enabled.</p>
              </div>
            </div>

            <button 
              onClick={() => { setShowSettings(false); onLogout(); }}
              className="w-full py-4 bg-rose-50 text-rose-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </Modal>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <Modal title="Edit Profile" onClose={() => setShowProfile(false)}>
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 mb-2 border-4 border-white shadow-md">
                {editProfile.fullName?.charAt(0) || 'J'}
              </div>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-tighter">Profile Details</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Enter your full name"
                  value={editProfile.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="your@email.com"
                  value={editProfile.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={editProfile.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={handleSaveProfile}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
              <button 
                onClick={() => { setShowProfile(false); setActiveTab('resume'); }}
                className="w-full py-2 text-slate-500 text-sm font-semibold hover:text-slate-800 transition-colors"
              >
                Update via Resume Text
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Layout;
