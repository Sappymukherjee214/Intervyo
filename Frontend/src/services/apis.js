const BASE_URL = 'https://intervyo.onrender.com/api';
// const BASE_URL = 'http://localhost:5000/api';

export const authEndpoints = {
  SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
  REGISTER_API: `${BASE_URL}/auth/register`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  LOGOUT_API: `${BASE_URL}/auth/logout`,
  GET_CURRENT_USER_API: `${BASE_URL}/auth/me`,
};


export const profileEndpoints = {
  GET_PROFILE_API: `${BASE_URL}/profile`,
  UPDATE_PROFILE_API: `${BASE_URL}/profile`,
  UPDATE_PERSONAL_INFO_API: `${BASE_URL}/profile/personal`,
  UPDATE_PROFESSIONAL_INFO_API: `${BASE_URL}/profile/professional`,
  UPDATE_EDUCATION_API: `${BASE_URL}/profile/education`,
  UPDATE_CERTIFICATES_API: `${BASE_URL}/profile/certificates`,
  UPDATE_ACHIEVEMENTS_API: `${BASE_URL}/profile/achievements`,
  UPLOAD_PROFILE_PICTURE_API: `${BASE_URL}/profile/upload-picture`,
  DELETE_PROFILE_PICTURE_API: `${BASE_URL}/profile/picture`,
};

export const dashboardEndpoints = {
  GET_DASHBOARD_STATS_API: `${BASE_URL}/dashboard/stats`,
  GET_RECENT_INTERVIEWS_API: `${BASE_URL}/dashboard/interviews/recent`,
  GET_LEARNING_PROGRESS_API: `${BASE_URL}/dashboard/learning-progress`,
  GET_DASHBOARD_OVERVIEW_API: `${BASE_URL}/dashboard/overview`,
  UPDATE_STREAK_API: `${BASE_URL}/dashboard/update-streak`,
  AWARD_XP_API: `${BASE_URL}/dashboard/award-xp`,
  GET_BADGES_API: `${BASE_URL}/dashboard/badges`,
  GET_PROGRESS_SUMMARY_API: `${BASE_URL}/dashboard/progress-summary`,
  GET_SAVED_QUESTIONS_API: `${BASE_URL}/dashboard/saved-questions`,
  GET_WEEKLY_PROGRESS_API: `${BASE_URL}/dashboard/weekly-progress`,
};

export const interviewEndpoints = {
  // Match your backend routes
  CREATE_INTERVIEW_API: BASE_URL + '/interview/create',
  START_INTERVIEW_API: BASE_URL + '/interview/:interviewId/start',
  SUBMIT_ANSWER_API: BASE_URL + '/interview/:interviewId/answer',
  GET_HINT_API: BASE_URL + '/interview/:interviewId/hint/:questionId',
  ANALYZE_EMOTION_API: BASE_URL + '/interview/:interviewId/emotion',
  COMPLETE_INTERVIEW_API: BASE_URL + '/interview/:interviewId/complete',
  GET_RESULTS_API: `${BASE_URL}/interview/:interviewId/results`,
  // or if you have a separate detailed results endpoint:
  GET_DETAILED_RESULTS_API: `${BASE_URL}/interview/:interviewId/detailed-results`,
  GET_HISTORY_API: BASE_URL + '/interview/history',
  START_CONVERSATION_API : BASE_URL + '/interview/:interviewId/start-conversation'
};