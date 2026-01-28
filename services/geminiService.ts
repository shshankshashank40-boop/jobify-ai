
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeProfile, JobMatchResult, InterviewQ, CareerRoadmapStep } from "../types";

// Always use direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResume = async (resumeText: string): Promise<ResumeProfile> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this resume and extract the details in the specified JSON format:\n\n${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fullName: { type: Type.STRING },
          email: { type: Type.STRING },
          phone: { type: Type.STRING },
          summary: { type: Type.STRING },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING, description: "technical, soft, or tool" },
                proficiency: { type: Type.NUMBER }
              },
              required: ["name", "category", "proficiency"]
            }
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                duration: { type: Type.STRING },
                summary: { type: Type.STRING }
              }
            }
          },
          education: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["fullName", "skills", "experience"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const matchJob = async (resume: ResumeProfile, jobDescription: string): Promise<JobMatchResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare this candidate profile with the following job description and provide a match analysis.\n\nProfile: ${JSON.stringify(resume)}\n\nJob Description: ${jobDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchPercentage: { type: Type.NUMBER },
          matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          roleFit: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvementTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["matchPercentage", "matchingSkills", "missingSkills", "roleFit"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateInterviewQuestions = async (resume: ResumeProfile, jobTitle: string): Promise<InterviewQ[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 relevant interview questions for a ${jobTitle} role based on this resume: ${JSON.stringify(resume)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            rationale: { type: Type.STRING },
            suggestedAnswerTip: { type: Type.STRING }
          },
          required: ["question", "rationale", "suggestedAnswerTip"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const getCareerRoadmap = async (resume: ResumeProfile, targetRole: string): Promise<CareerRoadmapStep[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Based on this profile: ${JSON.stringify(resume)}, generate a 3-step career roadmap to reach the role of ${targetRole}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            step: { type: Type.STRING },
            description: { type: Type.STRING },
            timeframe: { type: Type.STRING }
          },
          required: ["step", "description", "timeframe"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};
