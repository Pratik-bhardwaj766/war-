import Chatbot from '../components/Chatbot.jsx';

function ChatbotPage() {
  return (
    <section className="page page--padded">
      <header className="page__header">
        <h1>AI Conflict Explainer</h1>
        <p>
          Ask questions about wars and conflicts, and get simple, human-readable explanations
          without heavy jargon.
        </p>
      </header>
      <Chatbot />
    </section>
  );
}

export default ChatbotPage;

