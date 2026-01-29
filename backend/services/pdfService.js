const pdf = require('pdf-parse');
const fs = require('fs').promises;

class PDFService {
  async extractText(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      
      if (!data.text || data.text.trim().length === 0) {
        console.warn('PDF parsed but contains no text');
        return ''; // Return empty string instead of throwing
      }
      
      return data.text;
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      console.error('File path:', filePath);
      
      // Return empty string instead of throwing to allow upload to proceed
      console.warn('Returning empty text, PDF upload will proceed without text extraction');
      return '';
    }
  }

  async extractSkills(text) {
    // Common skills to look for
    const skillKeywords = [
      // Programming Languages
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
      'TypeScript', 'Go', 'Rust', 'Scala', 'R', 'MATLAB',
      
      // Web Technologies
      'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
      'HTML', 'CSS', 'Sass', 'Less', 'Tailwind', 'Bootstrap',
      
      // Databases
      'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Cassandra', 'Oracle',
      'SQL', 'NoSQL', 'Firebase', 'DynamoDB',
      
      // DevOps & Cloud
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD',
      'Git', 'GitHub', 'GitLab', 'Terraform', 'Ansible',
      
      // AI/ML
      'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
      'NLP', 'Computer Vision', 'Data Science', 'Pandas', 'NumPy',
      
      // Other
      'Agile', 'Scrum', 'REST API', 'GraphQL', 'Microservices', 'Testing',
      'Unit Testing', 'Integration Testing', 'Jest', 'Mocha', 'Pytest'
    ];

    const foundSkills = [];
    const lowerText = text.toLowerCase();

    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });

    return [...new Set(foundSkills)]; // Remove duplicates
  }

  async parseResume(filePath) {
    const text = await this.extractText(filePath);
    const skills = await this.extractSkills(text);

    // Extract email using regex
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const emails = text.match(emailRegex) || [];

    // Extract phone numbers
    const phoneRegex = /[\d\s\-\+\(\)]{10,}/g;
    const phones = text.match(phoneRegex) || [];

    return {
      text,
      skills,
      email: emails[0] || null,
      phone: phones[0] || null
    };
  }
}

module.exports = new PDFService();
