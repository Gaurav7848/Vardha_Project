import axios from "axios";

const API_BASE_URL = "/api";

export const createEnquiry = async (enquiryData) => {
  const response = await axios.post(`${API_BASE_URL}/enquiries`, enquiryData);
  return response.data;
};

export const getEnquiryById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/enquiries/${id}`);
  return response.data;
};

export const submitContact = async (contactData) => {
  const response = await axios.post(`${API_BASE_URL}/contact`, contactData);
  return response.data;
};

export default {
  createEnquiry,
  getEnquiryById,
  submitContact,
};
