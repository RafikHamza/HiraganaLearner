import { useState } from 'react';
import { TabType } from '../types/learning';
import Header from '../components/Header';
import HiraganaModule from '../components/HiraganaModule';
import KatakanaModule from '../components/KatakanaModule';
import VocabularyModule from '../components/VocabularyModule';
import ProgressModule from '../components/ProgressModule';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<TabType>('hiragana');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
  };

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'hiragana':
        return <HiraganaModule onShowToast={handleShowToast} />;
      case 'katakana':
        return <KatakanaModule onShowToast={handleShowToast} />;
      case 'vocabulary':
        return <VocabularyModule onShowToast={handleShowToast} />;
      case 'progress':
        return <ProgressModule />;
      default:
        return <HiraganaModule onShowToast={handleShowToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentTab={currentTab} onTabChange={handleTabChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Success Toast */}
      <div 
        className={`fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-transform duration-300 ${
          showToast ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center space-x-2">
          <i className="fas fa-check-circle"></i>
          <span>{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}
