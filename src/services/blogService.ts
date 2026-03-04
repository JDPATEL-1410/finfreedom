import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export interface BlogItem {
    id: string;
    title: string;
    link: string;
    pubDate: string;
    content: string;
    creator: string;
    imageUrl?: string;
}

export const blogService = {
    getLatestPosts: async (): Promise<BlogItem[]> => {
        try {
            const response = await axios.get(`${API_BASE}/blog/latest`);
            return response.data;
        } catch (error) {
            console.error('Error in blogService.getLatestPosts:', error);
            return [];
        }
    }
};
