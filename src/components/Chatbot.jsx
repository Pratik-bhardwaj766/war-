import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { conflicts } from '../data/conflicts.js';

function generateExplanation(message, conflictHintId) {
  const text = message.toLowerCase();

  const byId = conflictHintId
    ? conflicts.find((c) => c.id === conflictHintId)
    : undefined;

  const byKeyword =
    byId ||
    conflicts.find((c) => {
      return (
        text.includes(c.name.toLowerCase()) ||
        c.countries.some((country) => text.includes(country.toLowerCase())) ||
        text.includes(c.region.toLowerCase())
      );
    });

  if (byKeyword) {
    return (
      'Here is a simple explanation of the ' +
      byKeyword.name +
      ':\n\n' +
      byKeyword.summary +
      '\n\nIn short, it started because:\n- ' +
      byKeyword.causes.join('\n- ') +
      '\n\nThis has led to:\n- ' +
      byKeyword.impact.join('\n- ') +
      '\n\nRemember: real people are living through this, so it is important to read news from multiple trusted sources and support humanitarian organizations when possible.'
    );
  }

  if (text.includes('why') || text.includes('cause')) {
    return (
      'Many wars start because of a mix of political power struggles, control over land or resources, and long histories of mistrust between groups. ' +
      'In simple terms, when leaders and communities cannot agree peacefully, and basic needs or rights are not respected, tensions can turn into open conflict.'
    );
  }

  if (text.includes('children') || text.includes('kids')) {
    return (
      'Wars are especially hard on children. They may have to leave their homes, stop going to school, or lose access to clean water and healthcare. ' +
      'Many organizations work to protect children by providing safe spaces, education, and medical support in war zones.'
    );
  }

  if (text.includes('help') || text.includes('donate')) {
    return (
      'You can help by staying informed through reliable news sources, supporting humanitarian organizations that provide food, shelter, and medical care, ' +
      'and by amplifying verified information. On the Donation page in WarScope you will find examples of organizations that work in conflict zones.'
    );
  }

  return (
    'I try to explain wars in clear, simple language. You can ask things like:\n' +
    '- "Explain the war in Ukraine in simple terms."\n' +
    '- "What is happening in Gaza and why?"\n' +
    '- "How does war affect children?"\n' +
    '- "How can I help people in conflict areas?"'
  );
}

function Chatbot() {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi, I am the WarScope explainer. Ask me about a conflict and I will describe it in simple language.'
    }
  ]);

  const conflictHint = searchParams.get('conflict');

  useEffect(() => {
    if (conflictHint) {
      const conflict = conflicts.find((c) => c.id === conflictHint);
      if (conflict) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text:
              'You opened the AI explainer from the ' +
              conflict.name +
              ' page. Ask any question about this conflict and I will keep the explanation simple.'
          }
        ]);
      }
    }
  }, [conflictHint]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { role: 'user', text: trimmed };
    const botReply = {
      role: 'bot',
      text: generateExplanation(trimmed, conflictHint || undefined)
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot__window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === 'user'
                ? 'chatbot__message chatbot__message--user'
                : 'chatbot__message chatbot__message--bot'
            }
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbot__input-bar">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Ask about a conflict, its causes, or its impact..."
        />
        <button type="button" onClick={handleSend} className="btn btn--primary">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

