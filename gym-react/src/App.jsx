import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './views/Dashboard';
import Members from './views/Members';
import Plans from './views/Plans';
import Reports from './views/Reports';
import Checkin from './views/Checkin';
import { useState } from 'react';
import './App.css';
export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSelectSection={setActiveSection} />;
      case 'members':
        return <Members />;
      case 'plans':
        return <Plans />;
      case 'reports':
        return <Reports />;
      case 'checkin':
        return <Checkin />;
      default:
        return <Dashboard onSelectSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-base text-gray-100 font-inter">
      <Navbar activeSection={activeSection} onSelectSection={setActiveSection} />
      <main className="ml-[240px] flex-1 p-10 min-h-screen overflow-y-auto flex flex-col justify-between bg-bg-base">
        <div>
          {renderSection()}
        </div>
        <Footer />
      </main>
    </div>
  );
}
