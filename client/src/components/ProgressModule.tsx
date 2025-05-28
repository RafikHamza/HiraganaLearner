import { useProgress } from '../hooks/useProgress';

export default function ProgressModule() {
  const { getProgressStats } = useProgress();
  const stats = getProgressStats();

  const achievements = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete first lesson',
      icon: 'fas fa-star',
      unlocked: stats.knownCount > 0,
      color: 'emerald',
    },
    {
      id: 'on-fire',
      title: 'On Fire',
      description: '3-day study streak',
      icon: 'fas fa-fire',
      unlocked: stats.studyStreak >= 3,
      color: 'indigo',
    },
    {
      id: 'vowel-master',
      title: 'Vowel Master',
      description: 'Master all vowels',
      icon: 'fas fa-trophy',
      unlocked: stats.knownCount >= 5,
      color: 'amber',
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Complete 20 in a day',
      icon: 'fas fa-medal',
      unlocked: stats.knownCount >= 20,
      color: 'purple',
    },
  ];

  const dailyGoalProgress = Math.min((stats.knownCount % 10) / 10 * 100, 100);
  const dailyGoalCount = stats.knownCount % 10;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Progress Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Overall Progress</h3>
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * stats.percentage / 100)}
                  className="transition-all duration-800 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-900">{stats.percentage}%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Characters Learned</span>
              <span className="font-medium">{stats.knownCount}/{stats.totalCharacters}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Study Streak</span>
              <span className="font-medium">{stats.studyStreak} days</span>
            </div>
          </div>
        </div>

        {/* Hiragana Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Hiragana</h3>
            <span className="text-2xl font-japanese">ひらがな</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Mastered</span>
                <span className="font-medium">{stats.knownCount}/{stats.totalCharacters}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Keep learning to unlock Katakana!
            </div>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Daily Goal</h3>
            <i className="fas fa-target text-amber-600 text-xl"></i>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Characters Practiced</span>
                <span className="font-medium">{dailyGoalCount}/10</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dailyGoalProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-emerald-600 font-medium">
              {dailyGoalCount >= 10 ? 'Daily goal achieved!' : `${10 - dailyGoalCount} more to go.`}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`text-center p-4 rounded-lg ${
                achievement.unlocked
                  ? `bg-${achievement.color}-50`
                  : 'bg-slate-100 opacity-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                achievement.unlocked
                  ? `bg-${achievement.color}-600`
                  : 'bg-slate-400'
              }`}>
                <i className={`${achievement.icon} text-white text-sm`}></i>
              </div>
              <div className={`text-xs font-medium ${
                achievement.unlocked
                  ? `text-${achievement.color}-800`
                  : 'text-slate-600'
              }`}>
                {achievement.title}
              </div>
              <div className={`text-xs ${
                achievement.unlocked
                  ? `text-${achievement.color}-600`
                  : 'text-slate-500'
              }`}>
                {achievement.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
