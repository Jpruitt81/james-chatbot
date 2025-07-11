import React, { useState } from 'react';

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
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSend = () => {
    const input = userInput.toLowerCase();
    let reply = "I'm listening... tell me more.";

    if (input.includes("alone")) reply = responses.alone;
    else if (input.includes("affirmation")) reply = responses.affirmation;
    else if (input.includes("journal")) reply = responses.journal;
    else if (input.includes("calm") || input.includes("breathe")) reply = responses.breathe;
    else if (input.includes("encouragement")) reply = responses.encouragement;

    setChatLog([...chatLog, { from: 'you', text: userInput }, { from: 'James', text: reply }]);
    setUserInput('');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>Hello, I'm James 👋</h1>

      <div style={{ border: '1px solid #ddd', padding: '1rem', height: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
        {chatLog.map((msg, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Say something..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={handleSend} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Send
      </button>

      <div style={{ marginTop: '1rem' }}>
        <p>Try asking:</p>
        <ul>
          {conversationStarters.map((starter, i) => (
            <li key={i}>{starter}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
