import { apiConnector } from "../apiConnector";
import { dashboardEndpoints } from "../apis";

const {
  GET_DASHBOARD_STATS_API,
  GET_RECENT_INTERVIEWS_API,
  GET_LEARNING_PROGRESS_API,
  GET_DASHBOARD_OVERVIEW_API,
  UPDATE_STREAK_API,
  AWARD_XP_API,
  GET_BADGES_API,
  GET_PROGRESS_SUMMARY_API,
  GET_SAVED_QUESTIONS_API,
  GET_WEEKLY_PROGRESS_API
} = dashboardEndpoints;

// Get comprehensive dashboard stats
export const getDashboardStats = async (token) => {
  try {
    const response = await apiConnector("GET", GET_DASHBOARD_STATS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_DASHBOARD_STATS_API ERROR:", error);
    throw error;
  }
};

// Get recent interviews for dashboard
export const getRecentInterviews = async (token, limit = 5) => {
  try {
    const response = await apiConnector("GET", `${GET_RECENT_INTERVIEWS_API}?limit=${limit}`, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_RECENT_INTERVIEWS_API ERROR:", error);
    throw error;
  }
};

// Get learning progress data
export const getLearningProgress = async (token) => {
  try {
    const response = await apiConnector("GET", GET_LEARNING_PROGRESS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_LEARNING_PROGRESS_API ERROR:", error);
    throw error;
  }
};

// Get complete dashboard overview (all data in one call)
export const getDashboardOverview = async (token) => {
  try {
    const response = await apiConnector("GET", GET_DASHBOARD_OVERVIEW_API, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_DASHBOARD_OVERVIEW_API ERROR:", error);
    throw error;
  }
};

// Update user streak
export const updateStreak = async (token) => {
  try {
    const response = await apiConnector("POST", UPDATE_STREAK_API, {}, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("UPDATE_STREAK_API ERROR:", error);
    throw error;
  }
};

// Award XP points
export const awardXP = async (token, xpAmount, reason) => {
  try {
    const response = await apiConnector("POST", AWARD_XP_API, { xpAmount, reason }, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("AWARD_XP_API ERROR:", error);
    throw error;
  }
};

// Get user badges
export const getUserBadges = async (token) => {
  try {
    const response = await apiConnector("GET", GET_BADGES_API, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_BADGES_API ERROR:", error);
    throw error;
  }
};

// Get progress summary with detailed stats
export const getProgressSummary = async (token) => {
  try {
    const response = await apiConnector("GET", GET_PROGRESS_SUMMARY_API, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_PROGRESS_SUMMARY_API ERROR:", error);
    throw error;
  }
};

// Get saved/bookmarked questions
export const getSavedQuestions = async (token, limit = 10) => {
  try {
    const response = await apiConnector("GET", `${GET_SAVED_QUESTIONS_API}?limit=${limit}`, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_SAVED_QUESTIONS_API ERROR:", error);
    throw error;
  }
};

// Get weekly progress chart data
export const getWeeklyProgress = async (token, weeks = 4) => {
  try {
    const response = await apiConnector("GET", `${GET_WEEKLY_PROGRESS_API}?weeks=${weeks}`, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("GET_WEEKLY_PROGRESS_API ERROR:", error);
    throw error;
  }
};