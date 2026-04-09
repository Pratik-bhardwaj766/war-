import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WarDetails from './pages/WarDetails.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import DonationsPage from './pages/DonationsPage.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/conflict/:id" element={<WarDetails />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/donate" element={<DonationsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

