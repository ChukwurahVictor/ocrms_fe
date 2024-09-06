export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const urls = {
  signupUrl: `${baseUrl}/auth/signup`,
  loginUrl: `${baseUrl}/auth/login`,
  changePasswordUrl: `${baseUrl}/auth/change-password`,
  resetPassword: `${baseUrl}/auth/reset-password`,
  requestResetPassword: `${baseUrl}/auth/request-reset-password`,
  complaints: `${baseUrl}/complaints`,
  assignComplaints: (id: string) => `${baseUrl}/complaints/${id}/assign`,
  fetchComplaint: (id: string) => `${baseUrl}/complaints/${id}`,
  fetchFrequentComplaintStats: `${baseUrl}/complaints/frequent-complaints-stats`,
  fetchUrgencyLevelStats: `${baseUrl}/complaints/urgency-level-stats`,
  fetchOpenComplaintStats: `${baseUrl}/complaints/open-complaints`,
  fetchComplaintSummary: `${baseUrl}/complaints/summary`,
  departments: `${baseUrl}/departments`,
  fetchDepartments: (id: string) => `${baseUrl}/departments/${id}`,
  staff: `${baseUrl}/staff`,
  fetchStaff: (id: string) => `${baseUrl}/staff/${id}`,
  admin: `${baseUrl}/admin`,
  fetchAdmin: (id: string) => `${baseUrl}/admin/${id}`,
  profile: `${baseUrl}/user/profile`,
  profileUpdate: `${baseUrl}/user/profile/update`,
  category: `${baseUrl}/category`,
  addComplaintFeedback: (id: string) => `${baseUrl}/complaints/${id}/feedbacks`
};

export default urls;
