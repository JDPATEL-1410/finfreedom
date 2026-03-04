// Centralized image map for Finfreedom33
export interface ImageEntry {
    heroUrl: string;
    heroAlt: string;
    thumbUrl: string;
    thumbAlt: string;
}

export const IMAGES: Record<string, ImageEntry> = {
    home: {
        heroUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
        heroAlt: 'Modern city skyline representing financial growth and prosperity',
        thumbUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
        thumbAlt: 'Financial advisor meeting with clients',
    },
    about: {
        heroUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80',
        heroAlt: 'Financial advisor team in a professional setting',
        thumbUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
        thumbAlt: 'Professional team discussing financial strategy',
    },
    services: {
        heroUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
        heroAlt: 'Financial services and wealth management',
        thumbUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        thumbAlt: 'Financial planning documents and charts',
    },
    'services/mutual-funds': {
        heroUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
        heroAlt: 'Mutual funds investment growth charts',
        thumbUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
        thumbAlt: 'Investment portfolio growth',
    },
    'services/insurance': {
        heroUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
        heroAlt: 'Insurance protection and family security',
        thumbUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        thumbAlt: 'Family insurance protection',
    },
    'services/stocks': {
        heroUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
        heroAlt: 'Stock market trading and equity investments',
        thumbUrl: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&q=80',
        thumbAlt: 'Stock market charts and trading',
    },
    'services/financial-planning': {
        heroUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80',
        heroAlt: 'Financial planning and wealth strategies',
        thumbUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        thumbAlt: 'Financial planning documents',
    },
    'services/retirement': {
        heroUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80',
        heroAlt: 'Retirement planning and peaceful living',
        thumbUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        thumbAlt: 'Retirement planning',
    },
    'services/goal-based': {
        heroUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&q=80',
        heroAlt: 'Goal based investing and target achievement',
        thumbUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
        thumbAlt: 'Goal achievement and targets',
    },
    'services/taxation': {
        heroUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1920&q=80',
        heroAlt: 'Tax planning and financial compliance',
        thumbUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80',
        thumbAlt: 'Tax planning documents',
    },
    'services/fixed-deposits': {
        heroUrl: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1920&q=80',
        heroAlt: 'Fixed deposit and secure investments',
        thumbUrl: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80',
        thumbAlt: 'Secure investment options',
    },
    calculators: {
        heroUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&q=80',
        heroAlt: 'Financial calculators and planning tools',
        thumbUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
        thumbAlt: 'Financial calculator',
    },
    'calculators/sip': {
        heroUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
        heroAlt: 'SIP calculator showing systematic investment growth',
        thumbUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
        thumbAlt: 'SIP investment growth',
    },
    'calculators/lumpsum': {
        heroUrl: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=1920&q=80',
        heroAlt: 'Lump sum investment calculator',
        thumbUrl: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80',
        thumbAlt: 'Lumpsum investment',
    },
    'calculators/swp': {
        heroUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1920&q=80',
        heroAlt: 'Systematic withdrawal plan calculator',
        thumbUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80',
        thumbAlt: 'Withdrawal planning',
    },
    'calculators/retirement': {
        heroUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80',
        heroAlt: 'Retirement planning calculator',
        thumbUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        thumbAlt: 'Retirement planning',
    },
    'calculators/goal': {
        heroUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&q=80',
        heroAlt: 'Goal planning calculator for future targets',
        thumbUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
        thumbAlt: 'Goal planning',
    },
    'calculators/inflation': {
        heroUrl: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1920&q=80',
        heroAlt: 'Inflation impact calculator',
        thumbUrl: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80',
        thumbAlt: 'Inflation impact',
    },
    'calculators/allocation': {
        heroUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
        heroAlt: 'Asset allocation visualizer',
        thumbUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        thumbAlt: 'Asset allocation chart',
    },
    research: {
        heroUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
        heroAlt: 'Fund research analytics dashboard',
        thumbUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        thumbAlt: 'Research analytics',
    },
    'risk-profile': {
        heroUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
        heroAlt: 'Risk profiling and investment decision making',
        thumbUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        thumbAlt: 'Risk assessment',
    },
    blog: {
        heroUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80',
        heroAlt: 'Financial news and investment insights',
        thumbUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
        thumbAlt: 'Financial news reading',
    },
    contact: {
        heroUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
        heroAlt: 'Contact our financial advisory team',
        thumbUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        thumbAlt: 'Professional office contact',
    },
    faqs: {
        heroUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=1920&q=80',
        heroAlt: 'Frequently asked questions about investments',
        thumbUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80',
        thumbAlt: 'FAQ and help',
    },
};

export const getImage = (key: string): ImageEntry => {
    return IMAGES[key] || {
        heroUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
        heroAlt: 'Finfreedom33 wealth management',
        thumbUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        thumbAlt: 'Finfreedom33',
    };
};
