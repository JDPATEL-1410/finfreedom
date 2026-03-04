import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Calendar,
    User,
    Clock,
    ArrowLeft,
    Share2,
    Bookmark,
    Facebook,
    Twitter,
    Linkedin,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_POSTS } from './Blog';
import { blogService } from '../services/blogService';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [livePost, setLivePost] = useState<any>(null);

    const mockPost = MOCK_POSTS.find(p => p.id === id);

    useEffect(() => {
        const checkLivePost = async () => {
            if (mockPost) {
                return;
            }

            const posts = await blogService.getLatestPosts();
            const found = posts.find(p => (p.id || p.link) === id);
            if (found) {
                setLivePost({
                    id: found.id || found.link,
                    title: found.title,
                    excerpt: found.content.slice(0, 150).replace(/<[^>]*>?/gm, '') + '...',
                    category: 'Market Insights',
                    author: found.creator || 'Financial Desk',
                    date: new Date(found.pubDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                    readTime: '4 min read',
                    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
                    content: found.content,
                    link: found.link
                });
            }
        };
        checkLivePost();
    }, [id, mockPost]);

    const post = mockPost || livePost;


    if (!post) {
        return (
            <div className="section min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <h2 className="text-navy text-3xl font-bold mb-4">Post Not Found</h2>
                    <Link to="/blog" className="btn-primary">Back to Blog</Link>
                </div>
            </div>
        );
    }

    // Related posts (excluding current)
    const relatedPosts = MOCK_POSTS.filter(p => p.id !== id).slice(0, 3);

    return (
        <>
            <Helmet>
                <title>{post.title} | FinFreedom33 Blog</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            {/* Article Hero */}
            <header className="relative pt-32 pb-16 bg-navy overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src={post.image} alt="" className="w-full h-full object-cover blur-sm" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />

                <div className="container-custom relative z-10">
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-8 text-sm font-semibold"
                    >
                        <ArrowLeft size={16} /> Back to Insights
                    </button>

                    <div className="max-w-4xl">
                        <span className="badge-secondary mb-6">{post.category}</span>
                        <h1 className="text-white font-display font-bold text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-blue-200 text-sm md:text-base border-t border-white/10 pt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-white/10">
                                    <User size={20} className="text-blue-300" />
                                </div>
                                <span className="font-semibold text-white">{post.author}</span>
                            </div>
                            <span className="flex items-center gap-2"><Calendar size={18} /> {post.date}</span>
                            <span className="flex items-center gap-2"><Clock size={18} /> {post.readTime}</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Article Content */}
                        <article className="lg:w-2/3">
                            <div className="rounded-3xl overflow-hidden mb-12 shadow-premium">
                                <img src={post.image} alt={post.title} className="w-full h-auto" />
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                                <p className="text-xl text-navy font-medium leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface rounded-r-2xl">
                                    {post.excerpt}
                                </p>

                                {livePost ? (
                                    <div className="space-y-8">
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            {livePost.content.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                        <div className="bg-surface p-10 rounded-[2rem] border-2 border-dashed border-primary/20 text-center">
                                            <h3 className="text-navy font-bold text-2xl mb-4">Read Full Article</h3>
                                            <p className="text-gray-500 mb-8">This article was originally published on Economic Times. Click below to view the full story with charts and expert analysis.</p>
                                            <a
                                                href={livePost.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary btn-lg inline-flex items-center gap-3"
                                            >
                                                External Article <ExternalLinkIcon size={20} />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        </p>

                                        <h2 className="text-navy font-display font-bold text-3xl pt-6">Understanding the Core Concepts</h2>
                                        <p>
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                        </p>

                                        <div className="bg-blue-50 rounded-3xl p-8 my-10 border border-blue-100 italic">
                                            "Wealth is not about having a lot of money; it's about having a lot of options. The goal of investing is to create those options for your future self."
                                        </div>

                                        <h3 className="text-navy font-display font-bold text-2xl pt-4">Strategic Execution</h3>
                                        <p>
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                        </p>

                                        <ul className="space-y-4 my-8">
                                            <li className="flex gap-4">
                                                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 mt-1">1</span>
                                                <span>Start small but stay consistent with your SIPs.</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 mt-1">2</span>
                                                <span>Diversify across asset classes based on your risk profile.</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 mt-1">3</span>
                                                <span>Review your portfolio annually with a certified professional.</span>
                                            </li>
                                        </ul>
                                    </>
                                )}

                                <p className="mt-8 pt-8 border-t border-gray-100 italic text-gray-400">
                                    Disclaimer: The information provided in this blog is for educational purposes only and should not be construed as investment advice. Please consult with your financial advisor before making any investment decisions.
                                </p>
                            </div>

                            {/* Share & Meta */}
                            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 items-center justify-between">
                                <div className="flex gap-4">
                                    <span className="text-navy font-bold text-sm flex items-center gap-2">
                                        <Share2 size={16} className="text-primary" /> Share this Insight
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-navy hover:text-white transition-all"><Facebook size={18} /></button>
                                        <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-navy hover:text-white transition-all"><Twitter size={18} /></button>
                                        <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-navy hover:text-white transition-all"><Linkedin size={18} /></button>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-semibold">
                                    <Bookmark size={18} /> Save for Later
                                </button>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:w-1/3 space-y-12">

                            {/* Author Bio */}
                            <div className="card p-8 bg-surface border-0 text-center">
                                <div className="w-24 h-24 rounded-full bg-white p-1 border-2 border-primary mx-auto mb-6">
                                    <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                        <User size={60} className="text-primary mt-4" />
                                    </div>
                                </div>
                                <h4 className="text-navy font-bold text-xl mb-2">{post.author}</h4>
                                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Founder, FinFreedom33</p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Nitin has 25+ years of experience in financial markets and has helped thousands of families achieve financial independence.
                                </p>
                                <Link to="/about/team" className="text-primary font-bold text-sm inline-flex items-center gap-2 border-b-2 border-primary/20 hover:border-primary transition-all">
                                    About the Author <ChevronRight size={16} />
                                </Link>
                            </div>

                            {/* Consultation CTA */}
                            <div className="bg-navy rounded-3xl p-8 text-white">
                                <h4 className="font-display font-bold text-xl mb-4">Want a plan tailored to you?</h4>
                                <p className="text-blue-200 text-sm mb-6">Book a 30-minute introductory call to discuss your financial goals.</p>
                                <Link to="/contact" className="btn-secondary w-full text-center">Free Consultation</Link>
                            </div>

                            {/* Newsletter */}
                            <div className="card card-body p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <MessageSquare size={24} className="text-primary" />
                                    <h4 className="text-navy font-bold text-lg">Wealth Letter</h4>
                                </div>
                                <p className="text-gray-500 text-sm mb-6">Weekly insights on market trends and investment strategies.</p>
                                <form className="space-y-4">
                                    <input type="email" placeholder="Email@example.com" className="form-input" />
                                    <button className="btn-primary w-full">Join Now</button>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Recommended Reading */}
            <section className="section bg-surface overflow-hidden">
                <div className="container-custom">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="section-label">Read Next</p>
                            <h2 className="text-navy">Recommended Insights</h2>
                        </div>
                        <Link to="/blog" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            All Articles <ChevronRight size={20} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={`/blog/${p.id}`} className="group block h-full flex flex-col bg-white p-5 rounded-3xl shadow-sm hover:shadow-premium transition-all">
                                    <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6">
                                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-navy font-bold text-lg leading-snug group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                        {p.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                                        <span>{p.category}</span>
                                        <span>{p.date}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
