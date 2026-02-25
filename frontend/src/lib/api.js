import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/login/', { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const register = async (fullName, email, password) => {
    try {
        const response = await api.post('/register/', { fullName, email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProfile = async () => {
    try {
        const response = await api.get('/user/profile/', { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const updateProfile = async (data) => {
    try {
        const response = await api.put('/user/profile/update/', data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/user/history/', { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const addHistory = async (action, content) => {
    try {
        const response = await api.post('/user/history/add/', { action, content }, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

// Project API
export const getProjects = async () => {
    try {
        const response = await api.get('/projects/', { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const createProject = async (name, icon = '📁') => {
    try {
        const response = await api.post('/projects/create/', { name, icon }, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

// Chat API
export const getChatSessions = async (projectId = null) => {
    try {
        const params = projectId ? { projectId } : undefined;
        const response = await api.get('/chat/sessions/', { headers: getAuthHeader(), params });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const createChatSession = async (title, projectId = null) => {
    try {
        const payload = projectId ? { title, projectId } : { title };
        const response = await api.post('/chat/sessions/create/', payload, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getChatMessages = async (sessionId) => {
    try {
        const response = await api.get(`/chat/sessions/${sessionId}/messages/`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const replaceChatMessages = async (sessionId, messages) => {
    try {
        const response = await api.put(
            `/chat/sessions/${sessionId}/replace-messages/`,
            { messages },
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const saveChatMessage = async (sessionId, role, content) => {
    try {
        const response = await api.post('/chat/messages/save/', { sessionId, role, content }, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        // Silent fail for background saves
        console.error('Failed to save message:', error);
    }
};

export const deleteChatSession = async (sessionId) => {
    try {
        const response = await api.delete(`/chat/sessions/${sessionId}/delete/`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const deleteAllChatSessions = async () => {
    try {
        const response = await api.delete('/chat/sessions/delete-all/', { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export default api;
