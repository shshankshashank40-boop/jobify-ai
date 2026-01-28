
export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'tool';
  proficiency: number; // 1-100
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  summary: string;
}

export interface ResumeProfile {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: Skill[];
  experience: WorkExperience[];
  education: string[];
}

export interface JobMatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  roleFit: string;
  strengths: string[];
  improvementTips: string[];
}

export interface InterviewQ {
  question: string;
  rationale: string;
  suggestedAnswerTip: string;
}

export interface CareerRoadmapStep {
  step: string;
  description: string;
  timeframe: string;
}
