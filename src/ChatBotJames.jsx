import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatBotJames() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey, I'm James. How can I be here for you today?" }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const responses = [
    {
      keywords: ['alone', 'lonely'],
      reply: "You're not alone. I'm right here with you. Want to talk about it?"
    },
    {
      keywords: ['affirmation'],
      reply: "You are enough. You're doing your best, and that is more than okay."
    },
    {
      keywords: ['journal', 'prompt'],
      reply: "Try this: What's one thing you're proud of today, no matter how small?"
    },
    {
      keywords: ['breathe', 'anxious', 'panic', 'calm'],
      reply: "Let's take a deep breath together. Inhale for 4... hold... exhale for 6. You got this."
    },
    {
      keywords: ['encourage', 'motivate'],
      reply: "You’ve made it through 100% of your toughest days. That’s not luck — that’s you."
    },
    {
      keywords: ['sad', 'cry', 'upset'],
      reply: "It's okay to feel that way. Sometimes tears are the bravest thing we do."
    },
    {
      keywords: ['happy', 'grateful', 'joy'],
      reply: "That’s beautiful! Let’s hold on to that feeling and celebrate the small wins."
    },
    {
      keywords: ['confused', 'lost'],
      reply: "It’s okay not to have all the answers right now. One step at a time — I’m with you."
    }
  ];

  const defaultReply = "I'm listening. Tell me more, or type 'affirmation', 'journal', or 'breathe' for something specific.";

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');

    const matched = responses.find(r =>
      r.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))
    );

    const botReply = matched ? matched.reply : defaultReply;

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    }, 600);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div
            ref={chatRef}
            className="h-80 overflow-y-auto border rounded-md p-4 bg-white space-y-3"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl px-4 py-2 max-w-xs text-sm ${msg.from === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
