import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Award, 
  Flame,
  BookOpen,
  Code,
  Brain,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertCircle,
  BookmarkIcon,
  Trophy,
  Activity
} from 'lucide-react';
import { 
  getDashboardStats, 
  getRecentInterviews, 
  getProgressSummary,
  getSavedQuestions,
  getWeeklyProgress 
} from '../../services/operations/dashboardAPI';

const ProgressDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    recentInterviews: [],
    categoryProgress: [],
    weeklyActivity: [],
    progressSummary: null,
    savedQuestions: [],
    weeklyProgress: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const [
          statsResponse, 
          interviewsResponse, 
          progressSummaryResponse,
          savedQuestionsResponse,
          weeklyProgressResponse
        ] = await Promise.all([
          getDashboardStats(token),
          getRecentInterviews(token, 10),
          getProgressSummary(token),
          getSavedQuestions(token, 10),
          getWeeklyProgress(token, 4)
        ]);

        // Process category progress
        const categoryProgress = processInterviewsByCategory(interviewsResponse.data || []);
        
        // Process weekly activity
        const weeklyActivity = processWeeklyActivity(interviewsResponse.data || []);

        setDashboardData({
          stats: statsResponse.data,
          recentInterviews: interviewsResponse.data || [],
          categoryProgress,
          weeklyActivity,
          progressSummary: progressSummaryResponse.data || null,
          savedQuestions: savedQuestionsResponse.data || [],
          weeklyProgress: weeklyProgressResponse.data || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const processInterviewsByCategory = (interviews) => {
    const categories = {};
    
    interviews.forEach(interview => {
      const category = interview.role || 'General';
      if (!categories[category]) {
        categories[category] = {
          name: category,
          total: 0,
          completed: 0,
          averageScore: 0,
          totalScore: 0,
          timeSpent: 0
        };
      }
      
      categories[category].total += 1;
      if (interview.status === 'completed') {
        categories[category].completed += 1;
        categories[category].totalScore += interview.overallScore || 0;
        categories[category].timeSpent += interview.duration || 0;
      }
    });

    return Object.values(categories).map(cat => ({
      ...cat,
      averageScore: cat.completed > 0 ? Math.round(cat.totalScore / cat.completed) : 0,
      completionRate: cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0
    }));
  };

  const processWeeklyActivity = (interviews) => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayInterviews = interviews.filter(interview => {
        const interviewDate = new Date(interview.completedAt || interview.createdAt);
        return interviewDate.toISOString().split('T')[0] === dateStr;
      });

      last7Days.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: dayInterviews.length,
        averageScore: dayInterviews.length > 0 
          ? Math.round(dayInterviews.reduce((sum, i) => sum + (i.overallScore || 0), 0) / dayInterviews.length)
          : 0
      });
    }
    
    return last7Days;
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (current < previous) return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 75) return 'from-blue-500 to-cyan-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            My Progress Dashboard
          </h1>
          <p className="text-gray-400">Track your interview preparation journey</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {dashboardData.stats?.totalInterviews || 0}
                </div>
                <div className="text-sm text-gray-400">Total Interviews</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {getTrendIcon(dashboardData.stats?.totalInterviews || 0, 0)}
              <span className="text-gray-400">This month</span>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData.stats?.averageScore || 0)}`}>
                  {dashboardData.stats?.averageScore || 0}%
                </div>
                <div className="text-sm text-gray-400">Average Score</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {getTrendIcon(dashboardData.stats?.trend || 0, 0)}
              <span className="text-gray-400">{dashboardData.stats?.trend || 0}% trend</span>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {user?.stats?.streak || 0}
                </div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Keep it up!</span>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {Math.round((dashboardData.recentInterviews.reduce((sum, i) => sum + (i.duration || 0), 0) / 60) || 0)}h
                </div>
                <div className="text-sm text-gray-400">Time Practiced</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400">This month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Weekly Activity
              </h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dashboardData.weeklyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{day.day}</div>
                    <div 
                      className={`h-20 rounded-lg flex items-end justify-center p-2 transition-all hover:scale-105 ${
                        day.count > 0 
                          ? 'bg-gradient-to-t from-purple-600 to-purple-400' 
                          : 'bg-gray-700/50'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">
                        {day.count > 0 ? day.count : ''}
                      </div>
                    </div>
                    {day.averageScore > 0 && (
                      <div className={`text-xs mt-1 ${getScoreColor(day.averageScore)}`}>
                        {day.averageScore}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400 text-center">
                Interviews completed per day (last 7 days)
              </div>
            </div>

            {/* Enhanced Progress Summary */}
            {dashboardData.progressSummary && (
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 mt-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  Progress Overview
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">
                      {dashboardData.progressSummary.overview?.totalQuestionsAttempted || 0}
                    </div>
                    <div className="text-sm text-gray-400">Questions Attempted</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {dashboardData.progressSummary.overview?.completionRate || 0}%
                    </div>
                    <div className="text-sm text-gray-400">Completion Rate</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(dashboardData.progressSummary.overview?.totalTimeSpent / 60) || 0}h
                    </div>
                    <div className="text-sm text-gray-400">Total Time</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className={`text-2xl font-bold ${getScoreColor(dashboardData.progressSummary.overview?.averageScore || 0)}`}>
                      {dashboardData.progressSummary.overview?.averageScore || 0}%
                    </div>
                    <div className="text-sm text-gray-400">Avg Score</div>
                  </div>
                </div>
              </div>
            )}

            {/* Category Progress by Interview Type */}
            {dashboardData.progressSummary?.categoryProgress && dashboardData.progressSummary.categoryProgress.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 mt-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Progress by Interview Type
                </h3>
                <div className="space-y-4">
                  {dashboardData.progressSummary.categoryProgress.map((category, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            {category.category === 'technical' ? <Code className="w-5 h-5 text-white" /> :
                             category.category === 'behavioral' ? <Brain className="w-5 h-5 text-white" /> :
                             <BookOpen className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <div className="font-semibold text-white capitalize">{category.category}</div>
                            <div className="text-sm text-gray-400">
                              {category.questionsAttempted} questions · {category.interviewsCompleted} interviews
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(category.averageScore)}`}>
                            {category.averageScore}%
                          </div>
                          <div className="text-xs text-gray-400">Avg Score</div>
                        </div>
                      </div>
                      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getScoreGradient(category.averageScore)} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(category.progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{Math.round(category.progress)}% progress</span>
                        <span>{Math.round(category.timeSpent / 60)}h practiced</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Progress (Original) */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 mt-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Progress by Role/Domain
              </h3>
              <div className="space-y-4">
                {dashboardData.categoryProgress.length > 0 ? (
                  dashboardData.categoryProgress.map((category, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{category.name}</div>
                            <div className="text-sm text-gray-400">
                              {category.completed}/{category.total} completed
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(category.averageScore)}`}>
                            {category.averageScore}%
                          </div>
                          <div className="text-xs text-gray-400">Avg Score</div>
                        </div>
                      </div>
                      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getScoreGradient(category.averageScore)} rounded-full transition-all duration-500`}
                          style={{ width: `${category.completionRate}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{category.completionRate}% completion</span>
                        <span>{Math.round(category.timeSpent / 60)}h practiced</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No category data available</p>
                    <p className="text-sm text-gray-500">Complete more interviews to see progress</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Performance */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Recent Performance
              </h3>
              <div className="space-y-3">
                {dashboardData.recentInterviews.slice(0, 5).map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getScoreGradient(interview.overallScore || 0)} flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">
                          {interview.overallScore || 0}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white truncate">
                          {interview.role || 'Interview'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(interview.completedAt || interview.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {interview.duration || 30}min
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved/Skipped Questions */}
            {dashboardData.savedQuestions && dashboardData.savedQuestions.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BookmarkIcon className="w-5 h-5 text-pink-400" />
                  Questions to Revisit
                </h3>
                <div className="space-y-3">
                  {dashboardData.savedQuestions.slice(0, 5).map((question, index) => (
                    <div key={index} className="p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all cursor-pointer">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {question.question}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                          {question.type}
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          question.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                          question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Goals & Targets */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Goals & Targets
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Weekly Goal</span>
                    <span className="text-purple-400">
                      {dashboardData.progressSummary?.overview?.totalInterviews % 7 || 0}/5 interviews
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(((dashboardData.progressSummary?.overview?.totalInterviews % 7 || 0) / 5) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Score Target</span>
                    <span className="text-green-400">85%+</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${Math.min(((dashboardData.progressSummary?.overview?.averageScore || 0) / 85) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Streak Goal</span>
                    <span className="text-orange-400">{user?.stats?.streak || 0}/7 days</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(((user?.stats?.streak || 0) / 7) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Questions Attempted</span>
                    <span className="text-blue-400">
                      {dashboardData.progressSummary?.overview?.totalQuestionsAttempted || 0}/100
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${Math.min(((dashboardData.progressSummary?.overview?.totalQuestionsAttempted || 0) / 100) * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;