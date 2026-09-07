import axios from "axios";

const API_BASE_URL = "/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminLogin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const getAdminEnquiries = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/${id}/status`,
    { status },
    { headers: getAuthHeaders(), withCredentials: true }
  );
  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const getAdminFAQs = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/faqs/admin`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const createFAQ = async (faqData) => {
  const response = await axios.post(`${API_BASE_URL}/admin/faqs`, faqData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const updateFAQ = async (id, faqData) => {
  const response = await axios.put(`${API_BASE_URL}/admin/faqs/${id}`, faqData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const deleteFAQ = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/faqs/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const getPricingSettings = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/pricing/admin`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const updatePricingSettings = async (settings) => {
  const response = await axios.put(`${API_BASE_URL}/admin/pricing/admin`, settings, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const getAdminContacts = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/contacts`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/contacts/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export default {
  adminLogin,
  getAdminEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  getAdminFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getPricingSettings,
  updatePricingSettings,
  getAdminContacts,
  deleteContact,
};
