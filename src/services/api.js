import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Auth endpoints
export const authService = {
    login: async (phone, otp) => {
        const response = await api.post('/auth/login', {
            phone,
            otp,
        });
        return response.data;
    },
    register: async (email, phone, name) => {
        const response = await api.post('/auth/register', {
            email,
            phone,
            name,
        });
        return response.data;
    },
    sendOtp: async (phone) => {
        const response = await api.post('/auth/send-otp', { phone });
        return response.data;
    },
    verifyOtp: async (phone, otp) => {
        const response = await api.post('/auth/verify-otp', { phone, otp });
        return response.data;
    },
};
// Places endpoints
export const placesService = {
    getPlaces: async (filters) => {
        const response = await api.get('/places', { params: filters });
        return response.data;
    },
    getPlaceById: async (id) => {
        const response = await api.get(`/places/${id}`);
        return response.data;
    },
    searchPlaces: async (query, filters) => {
        const response = await api.get('/places/search', {
            params: { q: query, ...filters },
        });
        return response.data;
    },
    getNearbyPlaces: async (lat, lon, distance = 50) => {
        const response = await api.get('/places/nearby', {
            params: { latitude: lat, longitude: lon, distance },
        });
        return response.data;
    },
    getFeaturedPlaces: async () => {
        const response = await api.get('/places/featured');
        return response.data;
    },
    getPlacesByCategory: async (category) => {
        const response = await api.get(`/places/category/${category}`);
        return response.data;
    },
};
// User endpoints
export const userService = {
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await api.put('/users/profile', data);
        return response.data;
    },
    uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await api.post('/users/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};
// Donations endpoints
export const donationService = {
    getDonationTiers: async () => {
        const response = await api.get('/donations/tiers');
        return response.data;
    },
    createDonation: async (tierId, amount) => {
        const response = await api.post('/donations', { tierId, amount });
        return response.data;
    },
};
// Community endpoints
export const communityService = {
    getCommunityUpdates: async (page = 1) => {
        const response = await api.get('/community/updates', { params: { page } });
        return response.data;
    },
    postUpdate: async (content, media) => {
        const formData = new FormData();
        formData.append('content', content);
        if (media) {
            media.forEach((file) => formData.append('media', file));
        }
        const response = await api.post('/community/updates', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};
// Volunteer endpoints
export const volunteerService = {
    getVolunteerDashboard: async () => {
        const response = await api.get('/volunteer/dashboard');
        return response.data;
    },
    submitPlaceData: async (data) => {
        const response = await api.post('/volunteer/submissions', data);
        return response.data;
    },
};
export default api;
