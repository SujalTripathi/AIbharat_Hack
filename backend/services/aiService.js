const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

class AIService {
  async generateCompletion(prompt, systemPrompt = '') {
    try {
      console.log('🤖 Calling Groq API...');
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        model: 'llama-3.3-70b-versatile', // Updated to available model
        temperature: 0.7,
        max_tokens: 2048,
      });

      const response = chatCompletion.choices[0]?.message?.content || '';
      console.log('✅ Groq API response received');
      return response;
    } catch (error) {
      console.error('❌ Groq API Error:', error.message);
      console.error('Error details:', error.response?.data || error);
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }

  async analyzeResume(resumeText) {
    const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyzer. 
    Analyze resumes for keyword optimization, formatting, and content quality.
    Provide scores and actionable feedback.`;

    const prompt = `Analyze this resume and provide:
1. ATS Score (0-100)
2. Key strengths (3-5 points)
3. Missing important keywords
4. Formatting issues
5. Content improvements
6. Rewritten sections for better impact

Resume:
${resumeText}

Return the response as a JSON object with the following structure:
{
  "atsScore": number,
  "strengths": [string],
  "weaknesses": [string],
  "missingKeywords": [string],
  "formattingIssues": [string],
  "suggestions": [string],
  "improvedSections": {
    "summary": "improved text",
    "experience": "improved bullet points"
  }
}`;

    const response = await this.generateCompletion(prompt, systemPrompt);
    
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Return a fallback structure
      return {
        atsScore: 65,
        strengths: ['Resume uploaded successfully'],
        weaknesses: ['Analysis in progress'],
        missingKeywords: [],
        formattingIssues: [],
        suggestions: ['Please try again'],
        improvedSections: {}
      };
    }
  }

  async generateInterviewQuestions(jobRole, experienceLevel = 'entry', count = 5) {
    const systemPrompt = `You are an expert technical interviewer. 
    Generate realistic, role-specific interview questions.`;

    const prompt = `Generate ${count} interview questions for a ${experienceLevel} level ${jobRole} position.
    
Include a mix of:
- Technical questions
- Behavioral questions
- Situational questions

Return as JSON array:
[
  {
    "question": "question text",
    "type": "technical|behavioral|situational",
    "difficulty": "easy|medium|hard"
  }
]`;

    const response = await this.generateCompletion(prompt, systemPrompt);
    
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('Error parsing interview questions:', error);
      return [
        {
          question: `Tell me about your experience with ${jobRole}.`,
          type: 'behavioral',
          difficulty: 'easy'
        },
        {
          question: `What interests you about this ${jobRole} position?`,
          type: 'behavioral',
          difficulty: 'easy'
        },
        {
          question: `Describe a challenging project you've worked on.`,
          type: 'situational',
          difficulty: 'medium'
        }
      ];
    }
  }

  async evaluateAnswer(question, answer, jobRole) {
    const systemPrompt = `You are an expert interview evaluator. 
    Provide constructive feedback and scores for interview answers.`;

    const prompt = `Evaluate this interview answer for a ${jobRole} position:

Question: ${question}
Answer: ${answer}

Provide:
1. Score (0-10)
2. Strengths of the answer
3. Areas for improvement
4. Suggested improved answer

Return as JSON:
{
  "score": number,
  "strengths": [string],
  "improvements": [string],
  "feedback": "detailed feedback",
  "suggestedAnswer": "improved version"
}`;

    const response = await this.generateCompletion(prompt, systemPrompt);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('Error parsing evaluation:', error);
      return {
        score: 7,
        strengths: ['Good attempt'],
        improvements: ['Could provide more specific examples'],
        feedback: 'Your answer shows understanding of the topic.',
        suggestedAnswer: ''
      };
    }
  }

  async analyzeSkillGap(currentSkills, jobDescription) {
    const systemPrompt = `You are a career development expert. 
    Analyze skill gaps and provide learning recommendations.`;

    const prompt = `Compare these current skills with job requirements:

Current Skills: ${currentSkills.join(', ')}

Job Description: ${jobDescription}

Provide:
1. Missing skills
2. Match percentage
3. Learning recommendations with resources
4. Priority levels

Return as JSON:
{
  "missingSkills": [string],
  "matchPercentage": number,
  "recommendations": [
    {
      "skill": "skill name",
      "resources": ["resource 1", "resource 2"],
      "estimatedTime": "time to learn",
      "priority": "High|Medium|Low"
    }
  ]
}`;

    const response = await this.generateCompletion(prompt, systemPrompt);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('Error parsing skill gap:', error);
      return {
        missingSkills: [],
        matchPercentage: 70,
        recommendations: []
      };
    }
  }

  async generateJobMatch(resumeText, jobDescription, jobTitle) {
    const systemPrompt = `You are a job matching expert. 
    Analyze how well a resume matches a job description.`;

    const prompt = `Analyze the match between this resume and job posting:

Job Title: ${jobTitle}
Job Description: ${jobDescription}

Resume: ${resumeText}

Provide:
1. Match percentage (0-100)
2. Why it's a good match (3-5 points)
3. Potential concerns
4. Interview preparation tips

Return as JSON:
{
  "matchPercentage": number,
  "reasons": [string],
  "concerns": [string],
  "interviewTips": [string]
}`;

    const response = await this.generateCompletion(prompt, systemPrompt);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('Error parsing job match:', error);
      return {
        matchPercentage: 65,
        reasons: ['Skills align with requirements'],
        concerns: [],
        interviewTips: []
      };
    }
  }
}

module.exports = new AIService();
