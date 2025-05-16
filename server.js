import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Firebase Admin SDK initialization
try {
  // Load the service account key JSON file
  const serviceAccountPath = path.join(__dirname, 'firebase-key.json');
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  
  // Initialize the app with proper credentials
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  // Get Firestore instance
  const db = admin.firestore();
  
  // Configure Firestore settings
  db.settings({
    projectId: serviceAccount.project_id,
    databaseId: '(default)'
  });
  
  console.log("Firebase Admin SDK initialized with proper credentials and '(default)' database ID");
} catch (error) {
  console.error("Failed to initialize Firebase Admin SDK:", error);
  console.error("Error details:", error.message);
}
const app = express();

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

// Test endpoint to verify Firestore connectivity - with valid collection name
// Test endpoint to verify Firestore connectivity - with valid collection name
app.get('/test-firestore', async (req, res) => {
  try {
    console.log("Testing Firestore connectivity with explicit collection name...");
    
    const db = admin.firestore();
    
    // Create a test document with a timestamp
    const testData = {
      message: "Test connection successful",
      testRunAt: new Date().toISOString()
    };
    
    // Use a simple, definitely valid collection name
    const docRef = await db.collection('testCollection').add(testData);
    
    console.log("Test document written successfully with ID:", docRef.id);
    
    // Return success response
    res.json({
      success: true,
      message: "Firestore connection test successful",
      documentId: docRef.id
    });
  } catch (error) {
    console.error("Firestore test failed with error:", error);
    console.error("Error details:", error.message);
    
    // Return detailed error
    res.status(500).json({
      success: false,
      error: error.message,
      details: "Check server logs for more information"
    });
  }
});

const PORT = process.env.PORT || 5000;

// Contact form submission endpoint with Firestore integration
app.post('/api/contact-form', async (req, res) => {
  try {
    console.log("Received contact form submission:", req.body);
    
    // Validate required fields
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ error: 'Name and email are required fields' });
    }
    
    // Add to Firestore
    try {
      const db = admin.firestore();
      
      // Log the collection we're trying to access
      console.log("Attempting to write to collection: contactSubmissions");
      
      // Create data object with clean fields and timestamps
      const formData = {
        ...req.body,
        serverTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        submittedAt: new Date().toISOString()
      };
      
      console.log("Prepared data for Firestore:", formData);
      
      // Add document to collection
      const docRef = await db.collection('contactSubmissions').add(formData);
      
      console.log("Document successfully written to Firestore with ID:", docRef.id);
      
      res.json({
        success: true,
        id: docRef.id,
        message: "Contact form submission saved to Firestore"
      });
    } catch (firestoreError) {
      // Enhanced error logging
      console.error("Firestore error code:", firestoreError.code);
      console.error("Firestore error message:", firestoreError.message);
      console.error("Firestore error stack:", firestoreError.stack);
      
      // Still return success to the user, but log the error
      const submissionId = 'temp_' + Date.now();
      res.json({
        success: true,
        id: submissionId,
        message: "Contact form submission received, but not saved to database"
      });
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    console.error("Error details:", error.message, error.stack);
    res.status(500).json({ error: 'Server error processing your request' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
