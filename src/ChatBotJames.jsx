// Firebase setup
import { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getReply(userMessage, prevMessages) {
  const lower = userMessage.toLowerCase();
  const recentContext = prevMessages.slice(-3).map(m => m.text.toLowerCase()).join(" ");

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

  if (recentContext.includes("long day") || lower.includes("long day")) {
    return "That’s rough. What made it feel long today?";
  }

  if (lower.includes("people") || lower.includes("bother")) {
    return "I get it — sometimes people can really drain your peace. Want to unpack that a bit?";
  }

  if (lower.includes("motivate") || lower.includes("encourage")) {
    return "You’ve made it through every hard day so far — that’s proof of your strength.";
  }

  return "I’m really listening. What happened that’s on your mind right now?";
}

export default function ChatBotJames() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hey, I'm James. How can I be here for you today?" }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, newMessage];
    const botReply = { sender: "bot", text: getReply(input, updatedMessages) };
    setMessages([...updatedMessages, botReply]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card className="h-[500px] overflow-y-auto p-4">
        <CardContent>
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'}`}>
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
          placeholder="Type here..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
