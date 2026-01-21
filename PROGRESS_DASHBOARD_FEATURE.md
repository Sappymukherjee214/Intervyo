# Personalized User Progress Dashboard - Feature Documentation

## 📊 Overview

The **Personalized User Progress Dashboard** is a comprehensive tracking system that provides users with detailed insights into their interview preparation journey on Intervyo. This feature enables users to visualize their progress, identify areas for improvement, and stay motivated through meaningful feedback.

## ✨ Key Features

### 1. **Progress Summary Metrics**
- **Total Questions Attempted**: Track the total number of interview questions you've tackled
- **Completion Rate**: Percentage of questions completed vs. skipped
- **Total Time Spent**: Cumulative time spent on interview preparation
- **Average Score**: Overall performance metric across all interviews

### 2. **Category-Based Progress Tracking**
- Progress breakdown by interview type (technical, behavioral, system-design, coding)
- Questions attempted per category
- Average scores for each category
- Time spent in each category
- Visual progress bars showing advancement

### 3. **Role/Domain Tracking**
- Track progress across different job roles and domains
- Number of interviews completed per role
- Average performance scores by role
- Completion rates for different specializations

### 4. **Weekly Activity Visualization**
- 7-day activity graph showing daily interview completions
- Average scores per day
- Visual representation of consistency

### 5. **Saved/Skipped Questions**
- View questions you skipped during interviews
- Organized by type and difficulty
- Easy access to revisit challenging questions
- Helpful for focused practice sessions

### 6. **Goals & Targets**
- Weekly interview completion goals
- Score improvement targets
- Streak maintenance goals
- Question attempt milestones

### 7. **Recent Performance**
- List of recent interviews with scores
- Quick performance overview
- Date and duration tracking

## 🎯 API Endpoints

### Backend Routes (Dashboard)

#### 1. Get Progress Summary
```
GET /api/dashboard/progress-summary
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalQuestionsAttempted": 150,
      "totalQuestionsSkipped": 10,
      "completionRate": 93.75,
      "totalTimeSpent": 3600,
      "totalInterviews": 25,
      "averageScore": 82.5
    },
    "categoryProgress": [
      {
        "category": "technical",
        "questionsAttempted": 80,
        "interviewsCompleted": 15,
        "averageScore": 85.0,
        "timeSpent": 2000,
        "progress": 80.0
      }
    ],
    "roleProgress": [...],
    "difficultyProgress": [...],
    "recentActivity": [...]
  }
}
```

#### 2. Get Saved/Skipped Questions
```
GET /api/dashboard/saved-questions?limit=10
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "question": "Explain the concept of closures in JavaScript",
      "type": "technical",
      "difficulty": "medium",
      "category": "technical",
      "savedDate": "2026-01-20T10:00:00Z",
      "tags": ["javascript", "closures"]
    }
  ],
  "count": 10
}
```

#### 3. Get Weekly Progress
```
GET /api/dashboard/weekly-progress?weeks=4
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "week": "Week 1",
      "interviews": 5,
      "averageScore": 85.0,
      "questionsAnswered": 25
    }
  ]
}
```

## 🛠️ Technical Implementation

### Backend Components

#### Files Modified/Created:
1. **Backend/routes/Dashboard.route.js**
   - Added `/progress-summary` endpoint
   - Added `/saved-questions` endpoint
   - Added `/weekly-progress` endpoint

#### Key Functions:
- `processProgressSummary()`: Aggregates user interview data
- `calculateCategoryStats()`: Computes category-wise statistics
- `getRoleProgress()`: Tracks role-based progress
- `extractSavedQuestions()`: Retrieves skipped questions

### Frontend Components

#### Files Modified/Created:
1. **Frontend/src/components/Dashboard/ProgressDashboard.jsx**
   - Enhanced with new progress tracking sections
   - Added progress summary cards
   - Implemented category progress visualization
   - Added saved questions display

2. **Frontend/src/services/operations/dashboardAPI.js**
   - Added `getProgressSummary()` API call
   - Added `getSavedQuestions()` API call
   - Added `getWeeklyProgress()` API call

3. **Frontend/src/services/apis.js**
   - Added new API endpoint URLs

## 📈 Visual Components

### 1. **Stats Cards**
- Total Questions Attempted
- Completion Rate
- Total Time Spent
- Average Score

### 2. **Progress Bars**
- Color-coded based on performance (green: 90+, blue: 75+, yellow: 60+, red: <60)
- Animated transitions
- Percentage display

### 3. **Activity Graph**
- 7-day visualization
- Color intensity based on activity
- Score overlay

### 4. **Category Cards**
- Icon-based category identification
- Score display with color coding
- Time and question metrics

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Theme**: Modern gradient-based dark theme
- **Smooth Animations**: Progress bars and cards have smooth transitions
- **Interactive Elements**: Hover effects on cards and interactive components
- **Color-Coded Metrics**: Performance-based color coding for quick insights

## 🚀 Usage

### Accessing the Dashboard

1. Navigate to the main dashboard
2. The progress dashboard is automatically displayed or accessible via "My Progress" tab
3. All metrics update automatically as you complete interviews

### Tracking Progress

- **Complete interviews** to see progress metrics update
- **Review saved questions** to revisit challenging topics
- **Monitor goals** to stay on track with your preparation
- **Track streaks** to maintain consistency

## 📊 Data Sources

- User interview history from `Interview.model.js`
- User stats from `User.model.js`
- Question data from interview rounds
- Performance metrics from interview results

## 🔄 Future Enhancements

Potential additions for future iterations:

1. **Weekly Progress Reports**: Email summaries of progress
2. **Goal Setting**: Allow users to set custom goals
3. **Personalized Recommendations**: AI-powered suggestions based on performance
4. **Comparison Charts**: Compare progress with other users (anonymized)
5. **Export Reports**: Download progress reports as PDF
6. **Detailed Analytics**: Deep dive into specific categories
7. **Achievement Badges**: Unlock badges based on milestones
8. **Calendar Integration**: Sync practice sessions with calendar

## 🐛 Testing

### Test Cases Covered:

1. ✅ Empty state (no interviews completed)
2. ✅ Single interview completed
3. ✅ Multiple interviews across categories
4. ✅ Skipped questions display
5. ✅ Progress calculation accuracy
6. ✅ API error handling
7. ✅ Loading states
8. ✅ Responsive layout on different screens

## 📝 Notes

- All progress metrics are calculated server-side for accuracy
- Data is cached appropriately to optimize performance
- Progress calculations are based on completed interviews only
- Skipped questions are stored for later reference
- All dates are stored in UTC and converted to local timezone for display

## 🤝 Contributing

When extending this feature:

1. Maintain consistent API response structures
2. Update this documentation with new endpoints
3. Add appropriate error handling
4. Write tests for new functionality
5. Follow existing code patterns and naming conventions

## 📧 Support

For issues or questions about this feature:
- Check existing issues on GitHub
- Create a new issue with detailed description
- Tag with `feature: progress-dashboard`

---

**Feature Version**: 1.0.0
**Last Updated**: January 21, 2026
**Author**: GitHub Copilot (AI Assistant)
