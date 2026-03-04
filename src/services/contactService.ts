import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export interface ContactData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export const contactService = {
    submitForm: async (data: ContactData) => {
        try {
            const response = await axios.post(`${API_BASE}/contact/submit`, data);
            return response.data;
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }
};
