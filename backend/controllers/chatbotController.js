const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Process chatbot message via Gemini
// @route   POST /api/chatbot/ask
// @access  Public / Private
exports.askChatbot = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing from .env");
    }

    // 1. Initialize the Google Gen AI SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 2. Setup the Model (✅ FIXED: Using the latest active Gemini 2.5 model)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: `You are AirSense AI, an expert environmental and health advisory assistant. 
        Keep your answers concise, helpful, and formatted with markdown (bolding key terms). 
        If the user asks about AQI, PM2.5, or health precautions, provide scientific but easy-to-understand advice. 
        Do NOT write long essays. Maximum 3-4 short sentences per response.`
    });

    // 3. Format the conversation history for Gemini
    const formattedHistory = (history || [])
      .filter(msg => !msg.content.includes("Hi! I'm AirSense AI")) // Skip the hardcoded intro
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    // 4. Start the chat session with history
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.7,
      },
    });

    // 5. Send the new message and wait for the AI's reply
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    res.status(200).json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error('Chatbot API Error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to AI model. Please try again later.' 
    });
  }
};