import React, { useEffect, useState } from 'react';
import { fetchMessages, addMessage } from './apiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };

    loadMessages();
  }, []);

  const handleAddMessage = async () => {
    if (newMessage.trim() === '') return;
    const addedMessage = await addMessage(newMessage);
    setMessages((prev) => [...prev, addedMessage]);
    setNewMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Frontend</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleAddMessage}>Add Message</button>
    </div>
  );
};

export default App;
