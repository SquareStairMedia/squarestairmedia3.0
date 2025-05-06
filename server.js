import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve survey.html, styles.css, etc.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const assistantId = process.env.OPENAI_ASSISTANT_ID;

app.post('/api/survey', async (req, res) => {
  try {
    const { responses } = req.body;

    if (!Array.isArray(responses) || responses.length < 1) {
      return res.status(400).json({ error: 'Invalid survey input.' });
    }

    const userInput = responses
      .map((q, i) => `Q${i + 1}: ${q.trim()}`)
      .join('\n\n');

    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userInput
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    });

    let runStatus = run.status;
    while (runStatus === 'queued' || runStatus === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      runStatus = updatedRun.status;
    }

    if (runStatus !== 'completed') {
      return res.status(500).json({ error: 'Assistant failed to generate report.' });
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.find(msg => msg.role === 'assistant');

    if (!lastMessage || !lastMessage.content[0]?.text?.value) {
      return res.status(500).json({ error: 'No response from assistant.' });
    }

    const report = lastMessage.content[0].text.value;
    res.json({ report });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Server error while processing survey.' });
  }
});

app.post('/api/survey2', async (req, res) => {
    try {
      const { message, threadId } = req.body;
      const assistantId = process.env.OPENAI_ASSISTANT_DEEP_ID;
  
      if (!message) {
        return res.status(400).json({ error: 'No message provided.' });
      }
  
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
      // Use existing thread or create a new one
      const thread = threadId
        ? { id: threadId }
        : await openai.beta.threads.create();
  
      // Add user message
      await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: message
      });
  
      // Run assistant
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId
      });
  
      // Wait until complete
      let runStatus = run.status;
      while (runStatus === 'queued' || runStatus === 'in_progress') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const updatedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        runStatus = updatedRun.status;
      }
  
      if (runStatus !== 'completed') {
        return res.status(500).json({ error: 'Assistant failed to respond.' });
      }
  
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data.find(msg => msg.role === 'assistant');
  
      if (!lastMessage || !lastMessage.content[0]?.text?.value) {
        return res.status(500).json({ error: 'No assistant reply received.' });
      }
  
      const reply = lastMessage.content[0].text.value;
      res.json({ reply, threadId: thread.id });
  
    } catch (error) {
      console.error('Survey2 API Error:', error);
      res.status(500).json({ error: 'Error during assistant interaction.' });
    }
  });  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
