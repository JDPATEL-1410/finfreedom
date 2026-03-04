import axios from 'axios';

// Note: In a real production environment, you should use a dedicated financial data provider API 
// like RapidAPI (Mutual Fund India), EOD Historical Data, or a direct MFD backend API.

const MF_API_BASE = 'https://api.mfapi.in/mf';

export interface MFDetails {
    meta: {
        fund_house: string;
        scheme_type: string;
        scheme_category: string;
        scheme_code: number;
        scheme_name: string;
    };
    data: {
        date: string;
        nav: string;
    }[];
}

export const fundService = {
    // Fetch latest NAV for a scheme
    getLatestNAV: async (schemeCode: string) => {
        try {
            const response = await axios.get(`${MF_API_BASE}/${schemeCode}/latest`);
            return response.data;
        } catch (error) {
            console.error('Error fetching NAV:', error);
            return null;
        }
    },

    // Search for schemes
    searchSchemes: async (query: string) => {
        try {
            const response = await axios.get(`${MF_API_BASE}/search?q=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching schemes:', error);
            return [];
        }
    },

    // Get full historical data (for charts)
    getSchemeDetails: async (schemeCode: string): Promise<MFDetails | null> => {
        try {
            const response = await axios.get(`${MF_API_BASE}/${schemeCode}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching fund details:', error);
            return null;
        }
    }
};
