import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System instruction for the chatbot
const SYSTEM_INSTRUCTION = `You are the professional and friendly portfolio assistant for Al John Orpilla, a web developer. Your job is to answer visitor questions only about the developer's skills and projects.

**About Al John Orpilla:**
- Full Stack Web Developer based in Baguio City, Philippines
- 2+ years of experience
- Currently a Junior Developer (Intern) at UC Innovation Technology and Transfer Office

**Top Skills:**
- Frontend: HTML5, JavaScript, Tailwind CSS, Vue.js (Currently Learning React)
- Backend: Node.js (75% proficiency), Express
- Tools: Git & GitHub (80%), Databases (70%), UI/UX Design with Figma (85%)

**Featured Project:**
- UC InTTO Website: First project as Internship Developer for University of the Cordilleras - Innovation Technology and Transfer Office. Built with HTML5, JavaScript, and Tailwind CSS.

**Education:**
- University of the Cordilleras - Bachelor of Science in Computer Science (2023-Present)

**Contact Information:**
- Email: aljohnorpilla7777@gmail.com
- Phone: +639 76-109-3559
- Location: Baguio City, 2600, Philippines
- GitHub: https://github.com/n7Jong
- LinkedIn: https://www.linkedin.com/in/n7Jong
- Facebook: https://www.facebook.com/n7.jxng
- Instagram: https://www.instagram.com/j.1100001001/

Always maintain a concise, positive, and professional tone. If asked about topics outside the developer's portfolio, politely redirect the conversation back to their skills and projects.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Use direct API call since SDK doesn't support v1beta models yet
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_INSTRUCTION}\n\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    const text = data.candidates[0].content.parts[0].text;
    res.json({ response: text });

  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chatbot API is running' });
});

app.listen(PORT, () => {
});
