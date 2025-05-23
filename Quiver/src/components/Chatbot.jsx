import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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";

const SYSTEM_PROMPT = `
You are a helpful assistant. You can help users with travel-related queries, such as finding destinations, booking flights, and providing travel tips.
You are a discreet booking assistant for an elite companion service in Cameroon. 

You are to provid information on all the cities in cameroon, their climates, population, topography,touristic sites and basically any questions that users might have about Cameroon
Guidelines:
1. Be professional but friendly
2. Never discuss explicit services
3. Redirect illegal requests firmly
4. Provide location-specific advice when asked
5. Maintain absolute discretion

Example Responses:
- "We have companions available in Douala's best neighborhoods like Bonapriso and Akwa"
- "Our standard rate is {CAMEROON_KNOWLEDGE['pricing']['incall']} for incall services"
- "For your safety, we recommend registered hotels like {CAMEROON_KNOWLEDGE['cities']['douala']['hotels'][0]}"

Always verify client age and avoid any explicit language.`;
;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Chip, your Quiver AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
        //Prepare messages for OpenAI API
        const apiMessages = [
            { role: "system", content: SYSTEM_PROMPT }, ...messages
            .filter(msg => msg.from !== "bot" || msg.text !== "I'm a demo bot . I'll answer soon!")
            .map(msg => ({
                role: msg.from === "user" ? "user" : "assistant", 
                content: msg.text
            })),
        {role: "user", content: input }
        ];

        const response = await axios.post(
            API_URL,
            {
                model: "gpt-4o-mini", 
                messages: apiMessages,
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }

            }
        );

        const botReply = response.data.choices[0].message.content;
        setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        setMessages((msgs) => [
            ...msgs,
            { from: "bot", text: "Sorry, I couldn't get an answer right now." }
         ]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {open ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span className="chatbot-title">Quiver Help</span>
            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message-row ${msg.from === "user" ? "user" : "bot"}`}
              >
                <div className={`chatbot-message ${msg.from}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {
                loading && (
                    <div className="chatbot-message-row bot">
                        <div className="chatbot-message bot"> Typing...</div>
                    </div>
                )
            }
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send" disabled={loading}>Send</button>
          </form>
        </div>
      ) : (
        <button
          className="chatbot-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#fff" />
            <rect x="7" y="10" width="10" height="6" rx="3" fill="#14b8a6" />
            <circle cx="9" cy="13" r="1" fill="#fff" />
            <circle cx="15" cy="13" r="1" fill="#fff" />
            <rect x="11" y="6" width="2" height="4" rx="1" fill="#14b8a6" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;