export default function ChatBotJames() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (starter) => {
    const userMessage = starter || input;
    const lower = userMessage.toLowerCase();

    const botReply =
      lower.includes("alone")
        ? responses.alone
        : lower.includes("affirmation")
        ? responses.affirmation
        : lower.includes("journal")
        ? responses.journal
        : lower.includes("calm")
        ? responses.breathe
        : lower.includes("encourage")
        ? responses.encouragement
        : "I'm here. Keep talking to me.";

    setMessages([...messages, { from: "user", text: userMessage }, { from: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>James - Your Chat Companion</h1>
      <div style={{ marginBottom: "1rem" }}>
        {conversationStarters.map((text, index) => (
          <Button key={index} onClick={() => handleSend(text)} style={{ margin: "0.25rem" }}>
            {text}
          </Button>
        ))}
      </div>
      <div style={{ margin: "1rem 0", minHeight: "200px", background: "#f3f3f3", padding: "1rem", borderRadius: "8px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "0.5rem", textAlign: msg.from === "user" ? "right" : "left" }}>
            <strong>{msg.from === "user" ? "You" : "James"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type here..." />
        <Button onClick={() => handleSend()}>Send</Button>
      </div>
    </div>
  );
}
