// Firebase setup
import { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const firebaseConfig = {
  apiKey: "AIzaSyDrIe9iLDu5YF9uwRKktIVfrZ3LxetBqgU",
  authDomain: "project-james-e07c9.firebaseapp.com",
  projectId: "project-james-e07c9",
  storageBucket: "project-james-e07c9.appspot.com",
  messagingSenderId: "149150094527",
  appId: "1:149150094527:web:0872e6a611e3228919620a",
  measurementId: "G-7H9F1CY0TV"
};

initializeApp(firebaseConfig);
getAuth();
getFirestore();

function getReply(userMessage, prevMessages) {
  const lower = userMessage.toLowerCase();
  const context = prevMessages.slice(-3).map(m => m.text.toLowerCase()).join(" ");

  if (lower.includes("affirmation")) {
    return "You are enough. You're doing your best, and that is more than okay.";
  }

  if (lower.includes("journal")) {
    return "Try this: What's one thing you're proud of today, no matter how small?";
  }

  if (lower.includes("breathe") || lower.includes("anxious")) {
    return "Let’s take a deep breath. Inhale... hold... exhale. You’re safe here.";
  }

  if (lower.includes("alone") || lower.includes("lonely")) {
    return "I'm here with you. Want to talk about what’s weighing on you?";
  }

  if (lower.includes("sad") || lower.includes("cry") || lower.includes("tired")) {
    return "That sounds really heavy. It’s okay to let it out here — I’m with you.";
  }

  if (context.includes("long day") || lower.includes("long day")) {
    return "That’s rough. What made it feel long today?";
  }

  if (lower.includes("people") || lower.includes("bother") || lower.includes("drain")) {
    return "I get it — sometimes people can really drain your peace. Want to unpack that a bit?";
  }

  if (lower.includes("motivate") || lower.includes("encourage")) {
    return "You’ve made it through every hard day so far — that’s proof of your strength.";
  }

  if (lower.includes("bored")) {
    return "Sometimes boredom hides deeper feelings. Want to explore what might really be going on?";
  }

  if (lower.includes("stuck") || lower.includes("lost") || lower.includes("direction") || lower.includes("don't know")) {
    return "It’s okay to feel stuck. Tell me what’s been on your mind — we’ll walk through it together.";
  }

  if (lower.includes("help") || lower.includes("advice") || lower.includes("support")) {
    return "I'm right here. What are you hoping to work through or understand better?";
  }

  return "I'm listening. Tell me more about what you're going through.";
}

export default function ChatBotJames() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hey, I'm James. How can I be here for you today?" }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const updated = [...messages, userMsg];
    const botMsg = { sender: "bot", text: getReply(input, updated) };
    setMessages([...updated, botMsg]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card className="h-[500px] overflow-y-auto p-4">
        <CardContent>
          {messages.map((msg, i) => (
            <div key={i} className={`my-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block px-4 py-2 rounded-xl max-w-xs ${msg.sender === 'bot' ? 'bg-gray-100 text-black' : 'bg-blue-600 text-white'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </CardContent>
      </Card>
      <div className="flex items-center mt-4 space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type something..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
