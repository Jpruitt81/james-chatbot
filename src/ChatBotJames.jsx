// ChatBotJames.jsx
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const conversationStarters = [
  "I'm feeling alone",
  "Give me a daily affirmation",
  "Do you have a journal prompt?",
  "I need help calming down",
  "Say something encouraging"
];

const responses = {
  alone: "I'm here with you. You are not alone, even if it feels that way right now. It's okay to feel what you're feeling.",
  affirmation: "You are enough. You are worthy of love and peace. Breathe and remind yourself of your strength.",
  journal: "Write about a moment today that made you feel something deeply. Why did it move you?",
  breathe: "Let's take a deep breath together. Inhale slowly through your nose for 4 counts... hold... and exhale through your mouth for 6 counts.",
  encouragement: "You're doing better than you think. Keep going, one step at a time. You matter."
};

export default function ChatBotJames() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleUserMessage = (text) => {
    const trimmed = text.trim().toLowerCase();
    const match = Object.keys(responses).find(key => trimmed.includes(key)) || "encouragement";
    const reply = responses[match];

    setMessages(prev => [...prev, { from: "user", text }, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">James Chatbot 🤖</h1>
      
      <Card className="mb-4 h-80 overflow-y-auto">
        <CardContent className="space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md ${msg.from === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}
            >
              {msg.text}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Input
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserMessage(input)}
        />
        <Button onClick={() => handleUserMessage(input)}>Send</Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {conversationStarters.map((starter, idx) => (
          <Button key={idx} variant="outline" onClick={() => handleUserMessage(starter)}>
            {starter}
          </Button>
        ))}
      </div>
    </div>
  );
}
