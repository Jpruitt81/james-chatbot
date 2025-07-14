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
  const context = prevMessages.map(m => m.text.toLowerCase()).join(" ");
  const recentUserMsg = prevMessages.filter(m => m.sender === "user").slice(-1)[0]?.text.toLowerCase() || "";

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (lower.includes("affirmation")) {
    return rand([
      "You are enough. You’re doing better than you think.",
      "You’ve survived 100% of your worst days — and that’s strength.",
      "You matter. Even on the days you feel invisible."
    ]);
  }

  if (lower.includes("journal")) {
    return rand([
      "Try this: What’s one thing you learned about yourself today?",
      "Write down one moment that made you feel something — good or bad.",
      "What’s something small that you’re grateful for right now?"
    ]);
  }

  if (lower.includes("breathe") || lower.includes("anxious")) {
    return rand([
      "Let’s slow down. Inhale… hold… exhale. Do it again with me.",
      "You're safe here. Let’s take a breath and be in this moment.",
      "Ground yourself: look around and name 5 things you can see."
    ]);
  }

  if (lower.includes("alone") || lower.includes("lonely")) {
    return rand([
      "I’m here with you. You’re not as alone as your thoughts tell you.",
      "Loneliness hurts, I know. But I’m here — want to talk through it?",
      "You can share anything with me. No judgment, just space to feel."
    ]);
  }

  if (lower.includes("sad") || lower.includes("cry") || lower.includes("tired")) {
    return rand([
      "That sounds really heavy. I’m glad you’re letting it out here.",
      "If you feel like crying, it’s okay. I’ll sit with you through it.",
      "Exhaustion can come from carrying too much. Let’s unpack it if you want."
    ]);
  }

  if (lower.includes("bored")) {
    return rand([
      "Sometimes boredom masks burnout or sadness. What’s under the surface?",
      "What’s something creative or silly you wish you had time to do?",
      "Want me to give you a random journal prompt or affirmation?"
    ]);
  }

  if (lower.includes("stuck") || lower.includes("lost") || lower.includes("direction") || lower.includes("don't know")) {
    return rand([
      "Feeling stuck is valid — want to talk about what’s keeping you there?",
      "Let’s slow it down. What’s one thing you *do* know you want?",
      "You don’t have to solve it all right now. Just take the next honest step."
    ]);
  }

  if (lower.includes("help") || lower.includes("support") || lower.includes("advice")) {
    return rand([
      "I'm right here. What’s something you wish someone would just *tell* you?",
      "Let’s figure this out together. What’s one area you feel lost in?",
      "Sometimes you don’t need answers — just someone to talk it through with. That’s me."
    ]);
  }

  if (context.includes("life") || context.includes("choices") || recentUserMsg.includes("job")) {
    return rand([
      "Life choices are rarely clear-cut. What's your gut telling you — even a whisper?",
      "Do you feel fear about change… or guilt about staying where you are?",
      "You don’t have to decide everything now — just explore your truth."
    ]);
  }

  if (lower.includes("people") || lower.includes("draining") || lower.includes("bother")) {
    return rand([
      "It’s okay to admit people feel heavy sometimes. You don’t have to carry them.",
      "You’re allowed to protect your peace — even from people you care about.",
      "Let’s set a boundary together, even just in words. What do you wish you could say?"
    ]);
  }

  if (lower.includes("motivate") || lower.includes("encourage")) {
    return rand([
      "You’re further than you were yesterday — and that’s progress.",
      "Growth isn’t loud. It’s quiet, daily effort. Keep going.",
      "Even when it’s hard, you’re still showing up. That’s your power."
    ]);
  }

  return rand([
    "I'm listening. What do you feel you need most right now?",
    "Talk to me. There’s space here for everything you’re carrying.",
    "I'm here with you. You can be raw, honest, or confused — I won’t turn away.",
    "What’s one thing you wish someone would ask you about today?"
  ]);
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
