
import React, { useState } from 'react';
import Layout from './components/Layout';
import SkillChart from './components/SkillChart';
import { ResumeProfile, JobMatchResult, InterviewQ, CareerRoadmapStep } from './types';
import { analyzeResume, matchJob, generateInterviewQuestions, getCareerRoadmap } from './services/geminiService';
import { 
  Search, CheckCircle2, AlertCircle, Sparkles, ChevronRight, 
  Briefcase, GraduationCap, Award, FileText, Users, Target, 
  Zap, ArrowRight, ShieldCheck, Globe, Cpu, BarChart3, X, Play,
  TrendingUp, Lightbulb, Rocket, Shield, Lock, Info
} from 'lucide-react';

const PolicyModal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X size={24} className="text-slate-500" />
        </button>
      </div>
      <div className="p-8 overflow-y-auto text-slate-600 leading-relaxed space-y-4">
        {children}
      </div>
      <div className="p-8 border-t border-slate-100 shrink-0 text-center">
        <button 
          onClick={onClose}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
        >
          I Understand
        </button>
      </div>
    </div>
  </div>
);

const LandingPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Zap className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Jobify<span className="text-indigo-600">AI</span></h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <button onClick={() => scrollToSection('features')} className="hover:text-indigo-600 transition-colors">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-indigo-600 transition-colors">How it Works</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-indigo-600 transition-colors">Pricing</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setAuthType('login'); setShowAuthModal(true); }}
            className="text-slate-900 font-semibold px-4 py-2 hover:bg-slate-50 rounded-xl transition-all"
          >
            Log in
          </button>
          <button 
            onClick={() => { setAuthType('register'); setShowAuthModal(true); }}
            className="bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-sm font-bold">
            <Sparkles size={16} />
            <span>Next-Generation Career Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Elevate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI-Powered</span> Logic.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From deep resume analysis to strategic career roadmaps, Jobify AI uses advanced intelligence to help you land your dream role.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => { setAuthType('register'); setShowAuthModal(true); }}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 text-lg"
            >
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Play size={20} className="fill-slate-900" /> Watch Demo
            </button>
          </div>
          <div className="pt-12 flex items-center justify-center gap-8 grayscale opacity-50">
            <ShieldCheck size={32} />
            <Globe size={32} />
            <Cpu size={32} />
            <BarChart3 size={32} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-24 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">Comprehensive Career Tools</h3>
            <p className="text-slate-500 max-w-xl mx-auto">Everything you need to navigate the modern job market with confidence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <FileText size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3">Resume Analyzer</h4>
              <p className="text-slate-600">Deep extraction of skills and experiences to build a powerful digital profile.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3">Job Matching</h4>
              <p className="text-slate-600">Instantly see how well you fit a role and get tips on bridging the skill gap.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3">Interview Coach</h4>
              <p className="text-slate-600">Personalized questions and AI-driven strategies based on your unique profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">How Jobify AI Works</h3>
            <p className="text-slate-500">Your journey from candidate to hire in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">1</div>
              <h4 className="text-xl font-bold">Upload Your Resume</h4>
              <p className="text-slate-500">Paste your resume text. Our Gemini-powered engine extracts your unique career DNA instantly.</p>
            </div>
            <div className="relative text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">2</div>
              <h4 className="text-xl font-bold">Match Jobs & Skills</h4>
              <p className="text-slate-500">Paste any job description to see your match score and identify critical missing skills for that role.</p>
            </div>
            <div className="relative text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">3</div>
              <h4 className="text-xl font-bold">Get Coached</h4>
              <p className="text-slate-500">Generate tailored interview prep and a 3-step career roadmap to land your next position.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">Simple, Transparent Pricing</h3>
            <p className="text-slate-500">Choose the plan that's right for your career stage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Free</h4>
              <div className="text-3xl font-bold mb-6">$0 <span className="text-slate-400 text-sm font-normal">/ month</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-emerald-500" /> 3 Resume Analyses</li>
                <li className="flex items-center gap-2 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-emerald-500" /> Basic Job Matching</li>
                <li className="flex items-center gap-2 text-slate-400 text-sm italic">Limited Interview Prep</li>
              </ul>
              <button onClick={() => setShowAuthModal(true)} className="w-full py-3 border border-slate-200 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-all">Start Free</button>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl text-white relative flex flex-col transform md:scale-105 shadow-2xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</div>
              <h4 className="text-lg font-bold mb-2">Pro</h4>
              <div className="text-3xl font-bold mb-6">$19 <span className="text-slate-400 text-sm font-normal">/ month</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-indigo-400" /> Unlimited Analyses</li>
                <li className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-indigo-400" /> Advanced Skill DNA Map</li>
                <li className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-indigo-400" /> Custom Career Roadmaps</li>
                <li className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-indigo-400" /> AI Interview Coaching</li>
              </ul>
              <button onClick={() => setShowAuthModal(true)} className="w-full py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">Upgrade Now</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Enterprise</h4>
              <div className="text-3xl font-bold mb-6">Custom</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-emerald-500" /> Team Collaboration</li>
                <li className="flex items-center gap-2 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-emerald-500" /> API Access</li>
                <li className="flex items-center gap-2 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-emerald-500" /> Dedicated Support</li>
              </ul>
              <button onClick={() => setShowAuthModal(true)} className="w-full py-3 border border-slate-200 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-all">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Modals */}
      {showPrivacyModal && (
        <PolicyModal title="Privacy Policy" onClose={() => setShowPrivacyModal(false)}>
          <div className="flex items-center gap-3 mb-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Shield className="text-indigo-600" />
            <p className="text-sm font-bold text-indigo-900 uppercase tracking-widest">Secure Career Data Management</p>
          </div>
          <p className="font-bold">Last Updated: October 2024</p>
          <p>At Jobify AI, your privacy is our primary concern. When you use our platform to analyze your resume, we process your data to provide deep insights using the Google Gemini API.</p>
          <h4 className="text-lg font-bold mt-6 text-slate-900">Data We Collect</h4>
          <p>We collect information provided directly by you, including your name, email address, phone number, and any text uploaded as part of your resume or job descriptions.</p>
          <h4 className="text-lg font-bold mt-6 text-slate-900">How We Use Your Data</h4>
          <p>Your data is used exclusively to provide career recommendations, skill analysis, and interview prep. We do not sell your personal data to third-party recruiters or advertisers.</p>
          <h4 className="text-lg font-bold mt-6 text-slate-900">AI Processing</h4>
          <p>Jobify AI utilizes the Gemini Pro model to process resume text. This processing is performed in accordance with our secure API integration guidelines to ensure that your data is analyzed only for your personal career growth.</p>
        </PolicyModal>
      )}

      {showTermsModal && (
        <PolicyModal title="Terms of Service" onClose={() => setShowTermsModal(false)}>
          <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <Lock className="text-slate-600" />
            <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Platform Usage Agreement</p>
          </div>
          <p>By accessing or using Jobify AI, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.</p>
          <h4 className="text-lg font-bold mt-6 text-slate-900">Service Usage</h4>
          <p>Jobify AI provides AI-driven career tools. While we strive for extreme accuracy, our recommendations are based on AI reasoning and should be used as one of many factors in your professional journey.</p>
          <h4 className="text-lg font-bold mt-6 text-slate-900">User Accounts</h4>
          <p>You are responsible for safeguarding the password that you use to access the service. You agree not to disclose your password to any third party.</p>
          <h4 className="text-lg font-bold mt-6 text-slate-900">Intellectual Property</h4>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Jobify AI and its licensors.</p>
        </PolicyModal>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowDemoModal(false)} />
          <div className="relative bg-black rounded-[2rem] w-full max-w-4xl shadow-2xl overflow-hidden aspect-video group animate-in zoom-in fade-in duration-300">
            <button 
              onClick={() => setShowDemoModal(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-10 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-12">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/40 group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={32} className="text-white fill-white ml-1" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-2xl font-bold text-white">Experience Jobify AI</h4>
                <p className="text-slate-400 max-w-sm">Watch how our Gemini engine transforms a simple resume into a strategic career advantage.</p>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-bold text-white/40 tracking-widest uppercase">
              <span>Resume Analysis</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>Job Matching</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>Coaching</span>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{authType === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
              <p className="text-slate-500">Enter your details to access Jobify AI</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-4"
              >
                {authType === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                {authType === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                  onClick={() => setAuthType(authType === 'login' ? 'register' : 'login')}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  {authType === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Zap className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Jobify<span className="text-indigo-600">AI</span></h1>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">The AI-first platform for modern career management and intelligent job seeking.</p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-indigo-600">Features</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-indigo-600">Pricing</button></li>
              <li><a href="#" className="hover:text-indigo-600">API</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">About</a></li>
              <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button onClick={() => setShowPrivacyModal(true)} className="hover:text-indigo-600">Privacy Policy</button></li>
              <li><button onClick={() => setShowTermsModal(true)} className="hover:text-indigo-600">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-50 text-center text-slate-400 text-xs">
          <p>&copy; 2025 Jobify AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState<ResumeProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  
  // Matching States
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  
  // Interview States
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQ[]>([]);
  const [targetRole, setTargetRole] = useState('');
  
  // Roadmap
  const [roadmap, setRoadmap] = useState<CareerRoadmapStep[]>([]);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeResume(resumeText);
      setProfile(result);
      setActiveTab('dashboard');
    } catch (error) {
      console.error(error);
      alert('Error analyzing resume. Please check your API key and input.');
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async () => {
    if (!profile || !jobDescription.trim()) return;
    setLoading(true);
    try {
      const result = await matchJob(profile, jobDescription);
      setMatchResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrep = async () => {
    if (!profile || !targetRole.trim()) return;
    setLoading(true);
    try {
      const [qs, roadmapResult] = await Promise.all([
        generateInterviewQuestions(profile, targetRole),
        getCareerRoadmap(profile, targetRole)
      ]);
      setInterviewQuestions(qs);
      setRoadmap(roadmapResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfile(null);
    setResumeText('');
    setMatchResult(null);
    setInterviewQuestions([]);
    setRoadmap([]);
    setActiveTab('dashboard');
  };

  const handleUpdateProfile = (updatedProfile: ResumeProfile) => {
    setProfile(updatedProfile);
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userProfile={profile} 
      onLogout={handleLogout}
      onUpdateProfile={handleUpdateProfile}
    >
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-medium text-slate-700 animate-pulse">Gemini is processing your career data...</p>
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {!profile ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <FileText className="text-indigo-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Welcome to Jobify AI</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8">
                Upload or paste your resume to get started with deep career analysis, matching, and roadmap generation.
              </p>
              <button 
                onClick={() => setActiveTab('resume')}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
              >
                Get Started <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-900">Professional Summary</h3>
                      <Sparkles className="text-amber-400" size={20} />
                    </div>
                    <p className="text-slate-600 leading-relaxed">{profile.summary}</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Experience History</h3>
                    <div className="space-y-8">
                      {profile.experience.map((exp, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                              <Briefcase className="text-indigo-600 w-5 h-5" />
                            </div>
                            {idx !== profile.experience.length - 1 && <div className="w-px flex-1 bg-slate-200 my-2" />}
                          </div>
                          <div className="pb-4">
                            <h4 className="font-bold text-slate-900">{exp.title}</h4>
                            <p className="text-sm font-medium text-slate-500 mb-2">{exp.company} • {exp.duration}</p>
                            <p className="text-sm text-slate-600">{exp.summary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Skill DNA</h3>
                    <SkillChart skills={profile.skills} />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.skills.map((s, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-xs font-medium text-slate-600">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Education</h3>
                    <div className="space-y-4">
                      {profile.education.map((edu, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <GraduationCap className="text-indigo-500 mt-1" size={20} />
                          <p className="text-sm text-slate-700">{edu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'resume' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Resume Analyzer</h3>
            <p className="text-slate-500 mb-8">Paste the text of your resume below. Our AI will extract skills, experience, and build your digital career profile.</p>
            
            <div className="space-y-4">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full h-64 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none font-mono text-sm text-slate-900 placeholder:text-slate-400 bg-white"
              />
              <button
                onClick={handleAnalyze}
                disabled={!resumeText.trim()}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Analyze Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
              <div className="bg-amber-100 p-3 rounded-2xl h-fit"><Sparkles className="text-amber-600" /></div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">ATS Optimization</h4>
                <p className="text-sm text-amber-800/80">Our AI uses the same patterns as enterprise Applicant Tracking Systems to evaluate your profile.</p>
              </div>
            </div>
            <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex gap-4">
              <div className="bg-indigo-100 p-3 rounded-2xl h-fit"><Users className="text-indigo-600" /></div>
              <div>
                <h4 className="font-bold text-indigo-900 mb-1">Peer Comparison</h4>
                <p className="text-sm text-indigo-800/80">Get insights on how your skills stack up against industry benchmarks.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matching' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Job Matching Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Target Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description you're interested in..."
                  className="w-full h-48 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
                />
                <button
                  onClick={handleMatch}
                  disabled={!profile || !jobDescription}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Target size={20} />
                  Compare with Profile
                </button>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-200">
                {matchResult ? (
                  <div className="w-full space-y-6">
                    <div className="flex items-center justify-center relative">
                      <div className="w-32 h-32 rounded-full border-8 border-indigo-100 flex items-center justify-center">
                        <span className="text-3xl font-bold text-indigo-600">{matchResult.matchPercentage}%</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className={`w-32 h-32 rounded-full border-8 border-t-indigo-600 border-l-transparent border-r-transparent border-b-transparent animate-spin`} style={{ animationDuration: '3s' }} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 text-center">Compatibility Analysis</h4>
                      <p className="text-sm text-slate-600 italic text-center">"{matchResult.roleFit}"</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                          <h5 className="text-xs font-bold text-emerald-800 uppercase mb-2">Matching</h5>
                          <div className="flex flex-wrap gap-1">
                            {matchResult.matchingSkills.slice(0, 5).map((s, i) => (
                              <span key={i} className="text-[10px] bg-emerald-100 px-1 rounded text-emerald-700 font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                          <h5 className="text-xs font-bold text-rose-800 uppercase mb-2">Gaps</h5>
                          <div className="flex flex-wrap gap-1">
                            {matchResult.missingSkills.slice(0, 5).map((s, i) => (
                              <span key={i} className="text-[10px] bg-rose-100 px-1 rounded text-rose-700 font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <Target size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Enter job details to see match results</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {matchResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  Top Strengths
                </h4>
                <ul className="space-y-3">
                  {matchResult.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="text-indigo-500" size={20} />
                  How to Improve
                </h4>
                <ul className="space-y-3">
                  {matchResult.improvementTips.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'interview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Interview Coaching & Career Roadmap</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Target Job Title (e.g. Senior Software Engineer)"
                className="flex-1 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400 bg-white"
              />
              <button
                onClick={handlePrep}
                disabled={!profile || !targetRole}
                className="px-8 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                Generate Coach
                <Sparkles size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-lg px-2">Tailored Interview Questions</h4>
              {interviewQuestions.length > 0 ? (
                interviewQuestions.map((q, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                        Q{idx+1}
                      </span>
                      <p className="font-bold text-slate-800">{q.question}</p>
                    </div>
                    <div className="pl-12 space-y-3">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">The Rationale</p>
                      <p className="text-sm text-slate-600 italic">{q.rationale}</p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1">Answer Strategy</p>
                        <p className="text-sm text-slate-700">{q.suggestedAnswerTip}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-100">
                  Enter a target role to generate custom questions
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-lg px-2">Strategic Career Roadmap</h4>
              {roadmap.length > 0 ? (
                <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white space-y-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
                  {roadmap.map((step, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-indigo-500/50">
                          {idx + 1}
                        </div>
                        {idx !== roadmap.length - 1 && (
                          <div className="w-1 h-full bg-slate-800 my-2 rounded-full" />
                        )}
                      </div>
                      <div className="pb-4">
                        <h5 className="text-lg font-bold text-white mb-1">{step.step}</h5>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Search size={12} /> {step.timeframe}
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Destination</p>
                      <p className="text-sm font-bold">{targetRole}</p>
                    </div>
                    <Award className="text-indigo-400" size={32} />
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-100">
                  Unlock your future roadmap by providing a target role
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
