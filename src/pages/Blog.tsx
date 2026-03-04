import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search,
    Calendar,
    User,
    Clock,
    ArrowRight,
    Tag,
    TrendingUp,
    ChevronRight,
    Mail
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';
import { blogService } from '../services/blogService';
import type { BlogItem } from '../services/blogService';

export interface Post {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
}

export const MOCK_POSTS: Post[] = [
    {
        id: '1',
        title: '5 Reasons Why SIP is the Best Way to Build Long-Term Wealth',
        excerpt: 'Discover why systematic investing beats timing the market every single time. Learn the magic of compounding and rupee cost averaging.',
        category: 'Mutual Funds',
        author: 'Nitin J.',
        date: 'Oct 24, 2023',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80',
    },
    {
        id: '2',
        title: 'Decoding the New Tax Regime: Should You Switch?',
        excerpt: 'An in-depth analysis of Old vs New tax regimes for FY 2023-24. We help you calculate which one saves you more money based on your income.',
        category: 'Tax Planning',
        author: 'Aditya S.',
        date: 'Oct 18, 2023',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    },
    {
        id: '3',
        title: 'Retirement Planning at 30: Starting Early is Your Greatest Edge',
        excerpt: 'Why beginning your retirement journey in your 30s can make you a multi-crore millionaire by 60 with half the effort of starting at 40.',
        category: 'Retirement',
        author: 'Nitin J.',
        date: 'Oct 12, 2023',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
    },
    {
        id: '4',
        title: 'The Hidden Risks of Holding Too Much Cash in Savings Account',
        excerpt: 'Inflation is a silent killer of wealth. Learn how to optimize your emergency fund and invest idle cash for better post-tax returns.',
        category: 'Financial Planning',
        author: 'Nitin J.',
        date: 'Oct 05, 2023',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1621416848440-d369e4debb74?w=600&q=80',
    },
    {
        id: '5',
        title: 'Insurance vs Investment: Why You Should Never Mix the Two',
        excerpt: 'Understanding the pitfalls of endowment plans and why a combination of Term Plan + Mutual Funds is always superior.',
        category: 'Insurance',
        author: 'Aditya S.',
        date: 'Sep 28, 2023',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    },
    {
        id: '6',
        title: 'Top 5 Mid-Cap Funds to Watch in 2024',
        excerpt: 'Our research team analyzes the mid-cap space to identify funds with high quality crossover potential and strong earnings visibility.',
        category: 'Research',
        author: 'Research Team',
        date: 'Sep 21, 2023',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    },
];

const CATEGORIES = ['All', 'Mutual Funds', 'Tax Planning', 'Retirement', 'Financial Planning', 'Insurance', 'Market Insights'];

const img = getImage('blog');

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [livePosts, setLivePosts] = useState<BlogItem[]>([]);

    useEffect(() => {
        const fetchLiveBlog = async () => {
            const posts = await blogService.getLatestPosts();
            if (posts && posts.length > 0) {
                setLivePosts(posts);
            }
        };
        fetchLiveBlog();
    }, []);

    // Helper to map BlogItem to Post interface
    const adaptLivePost = (item: BlogItem): Post => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        title: item.title,
        excerpt: item.content.slice(0, 150).replace(/<[^>]*>?/gm, '') + '...',
        category: 'Market Insights',
        author: item.creator || 'Financial Desk',
        date: new Date(item.pubDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        readTime: '4 min read',
        image: item.imageUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    });

    const adaptedLivePosts = livePosts.map(adaptLivePost);
    const allPosts = [...adaptedLivePosts, ...MOCK_POSTS];

    const filteredPosts = allPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Helmet>
                <title>Wealth Blog | FinFreedom33 – Insights on Investing & Personal Finance</title>
                <meta name="description" content="Stay updated with the latest trends in mutual funds, taxation, and retirement planning. Expert articles from India's leading financial advisors." />
            </Helmet>

            <PageHeader
                title="Knowledge Center"
                subtitle="Empowering you through financial education and timely market insights"
                heroUrl={img.heroUrl}
                heroAlt="Wealth management blog"
                breadcrumbs={[{ label: 'Blog' }]}
            />

            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Main Content */}
                        <div className="lg:w-2/3 space-y-10">

                            {/* Featured Post */}
                            {allPosts[0] && selectedCategory === 'All' && !searchTerm && (
                                <Link to={`/blog/${allPosts[0].id}`} className="block group">
                                    <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-6">
                                        <img
                                            src={allPosts[0].image}
                                            alt={allPosts[0].title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                                            <span className="badge-primary mb-4">{allPosts[0].category}</span>
                                            <h2 className="text-white font-display font-bold text-2xl md:text-4xl mb-3 leading-tight group-hover:text-blue-200 transition-colors">
                                                {allPosts[0].title}
                                            </h2>
                                            <div className="flex items-center gap-6 text-blue-200 text-sm">
                                                <span className="flex items-center gap-2"><User size={14} /> {allPosts[0].author}</span>
                                                <span className="flex items-center gap-2"><Calendar size={14} /> {allPosts[0].date}</span>
                                                <span className="flex items-center gap-2"><Clock size={14} /> {allPosts[0].readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}


                            {/* Blog Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredPosts.slice(selectedCategory === 'All' && !searchTerm ? 1 : 0).map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (i % 2) * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link to={`/blog/${post.id}`} className="group block h-full flex flex-col">
                                            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] mb-4">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="badge-primary text-[10px]">{post.category}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-navy font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                                    <Clock size={12} /> {post.readTime}
                                                </span>
                                                <span className="text-primary font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read More <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {filteredPosts.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl">
                                    <p className="text-gray-400">No blog posts found matching your criteria.</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-1/3 space-y-8">

                            {/* Search Widget */}
                            <div className="card card-body">
                                <h4 className="text-navy font-bold text-lg mb-4">Search Articles</h4>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Keywords..."
                                        className="form-input pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="card card-body">
                                <h4 className="text-navy font-bold text-lg mb-4">Categories</h4>
                                <div className="flex flex-wrap lg:flex-col gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`
                                                flex-1 lg:w-full min-w-fit whitespace-nowrap flex items-center justify-between p-2.5 px-3.5 rounded-xl text-xs sm:text-sm transition-all
                                                ${selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'text-gray-500 bg-surface lg:bg-transparent hover:bg-surface'}
                                            `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Tag size={14} />
                                                {cat}
                                            </div>
                                            <ChevronRight size={14} className={`hidden lg:block ${selectedCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Trending Widget */}
                            <div className="card card-body">
                                <h4 className="text-navy font-bold text-lg mb-6 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-primary" /> Trending Now
                                </h4>
                                <div className="space-y-6">
                                    {allPosts.slice(1, 4).map((post, i) => (
                                        <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-4">
                                            <span className="text-gray-200 font-display font-bold text-3xl italic">0{i + 1}</span>
                                            <div>
                                                <h5 className="text-navy font-bold text-xs leading-tight group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </h5>
                                                <p className="text-[10px] text-gray-400 mt-1">{post.date}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter Widget */}
                            <div className="bg-gradient-primary rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="absolute -right-4 -bottom-4 text-white/10 rotate-12">
                                    <Mail size={120} />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="font-display font-bold text-xl mb-3">Expert Insights Delivery</h4>
                                    <p className="text-blue-100 text-sm mb-6">Join 5,000+ investors who receive our weekly wealth letter.</p>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-blue-200 mb-3 focus:bg-white/20 outline-none transition-all"
                                    />
                                    <button className="btn-secondary w-full">Join Now</button>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>
        </>
    );
}
