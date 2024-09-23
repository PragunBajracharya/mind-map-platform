import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/mindmaps';

const createMindMap = async (data) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

const getMindMapById = async (id) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

export default { createMindMap, getMindMapById };
