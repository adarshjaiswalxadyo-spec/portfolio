const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Messages file path
const messagesFile = path.join(__dirname, 'messages.json');

// Helper function to read messages
const readMessages = () => {
  try {
    const data = fs.readFileSync(messagesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write messages
const writeMessages = (messages) => {
  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing messages:', error);
    return false;
  }
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Create message object
  const newMessage = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  // Read existing messages
  const messages = readMessages();

  // Add new message
  messages.push(newMessage);

  // Save messages
  if (writeMessages(messages)) {
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save message' 
    });
  }
});

// Get all messages (admin route - could be protected)
app.get('/api/messages', (req, res) => {
  const messages = readMessages();
  res.json({ success: true, messages });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend served at: http://localhost:${PORT}`);
});
