import { useState } from 'react';
import { TabType } from '../types/learning';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Header({ currentTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'hiragana' as TabType, label: 'ひらがな Hiragana', icon: null },
    { id: 'katakana' as TabType, label: 'カタカナ Katakana', icon: null },
    { id: 'vocabulary' as TabType, label: 'Vocabulary', icon: 'fas fa-book-open' },
    { id: 'progress' as TabType, label: 'Progress', icon: 'fas fa-chart-line' },
  ];

  const handleTabClick = (tabId: TabType) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-language text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Japanese Learning Hub</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.icon && <i className={`${tab.icon} mr-1`}></i>}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <i className="fas fa-bars text-slate-600"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentTab === tab.id
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
