import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Target, Award, Users, BarChart3, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { blogService } from '../services/blogService';
import type { BlogItem } from '../services/blogService';
import YouTubeSection from '../components/home/YouTubeSection';


const HERO_SLIDES = [
    {
        tag: 'Systematic Investment Planning',
        title: 'Build Wealth with\nDisciplined Investing',
        subtitle: 'Start your SIP as low as ₹500/month and harness the power of compounding to achieve your financial goals.',
        cta: { label: 'Start SIP Now', to: '/calculators/sip' },
        cta2: { label: 'Learn More', to: '/services/mutual-funds' },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    },
    {
        tag: 'Goal-Based Financial Planning',
        title: 'Every Goal Deserves\na Strategy',
        subtitle: 'Whether it\'s your child\'s education, dream home, or comfortable retirement—we craft personalized plans to make it happen.',
        cta: { label: 'Plan My Goals', to: '/services/goal-based' },
        cta2: { label: 'Book Consultation', to: '/contact' },
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
    },
    {
        tag: 'Risk-Proof Your Future',
        title: 'Protect What\nMatters Most',
        subtitle: 'Comprehensive insurance and wealth protection solutions designed to secure your family\'s financial future against any uncertainty.',
        cta: { label: 'Explore Insurance', to: '/services/insurance' },
        cta2: { label: 'Risk Profile', to: '/risk-profile' },
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80',
    },
];

const STATS = [
    { value: 25, suffix: '+', label: 'Years of Experience' },
    { value: 8000, suffix: '+', label: 'Happy Families' },
    { value: 1800, suffix: 'Cr+', label: 'Assets Under Advisory' },
    { value: 100, suffix: '%', label: 'Client-First Approach' },
];


const SERVICES_GRID = [
    {
        icon: TrendingUp,
        title: 'Mutual Funds',
        description: 'Diversified equity, debt, and hybrid fund portfolios tailored to your risk appetite and investment horizon.',
        path: '/services/mutual-funds',
        color: 'bg-blue-50 text-primary',
    },
    {
        icon: Shield,
        title: 'Insurance',
        description: 'Life, health, and general insurance products to build a comprehensive safety net for your family.',
        path: '/services/insurance',
        color: 'bg-red-50 text-secondary',
    },
    {
        icon: BarChart3,
        title: 'Equity & Stocks',
        description: 'Direct equity investment strategies focused on long-term wealth creation through fundamental analysis.',
        path: '/services/stocks',
        color: 'bg-green-50 text-green-700',
    },
    {
        icon: Target,
        title: 'Goal-Based Investing',
        description: 'Structured investment plans mapped to your life milestones—education, home, travel, and retirement.',
        path: '/services/goal-based',
        color: 'bg-purple-50 text-purple-700',
    },
    {
        icon: Award,
        title: 'Taxation & ELSS',
        description: 'Smart tax planning strategies using ELSS, Section 80C, and other government-backed instruments.',
        path: '/services/taxation',
        color: 'bg-amber-50 text-amber-700',
    },
    {
        icon: Users,
        title: 'Financial Planning',
        description: 'Holistic financial planning covering budgeting, asset allocation, estate planning, and wealth management.',
        path: '/services/financial-planning',
        color: 'bg-teal-50 text-teal-700',
    },
];

const WHY_CHOOSE = [
    'AMFI Registered Mutual Fund Distributor',
    'CFP Certified Financial Planner since 2009',
    'Over 25 years of investment advisory experience',
    'Unbiased product recommendations across 40+ AMCs',
    'Transparent fee structure with zero hidden charges',
    'Personalized portfolio reviews every quarter',
    'Dedicated relationship manager for every client',
    'Digital-first platform for portfolio tracking',
];

const TESTIMONIALS = [
    {
        name: 'Soul speaks By nidhi jathal',
        role: 'Verified Google Review',
        text: 'The best financial planners and growth boosters on the planet!!!! Nitin uncle and Anjali have singularly changed the way I look at finance, and have made life so secure and amazing!! I trust them and only them with the finances of my entire family, even my extended family.. thank u fin freedom!!!',
        rating: 5,
        avatar: 'NJ',
    },
    {
        name: 'Prashant Gaudani',
        role: 'Verified Google Review',
        text: 'Five star and thumbs up👍 for finfreedom’s Excellent financial services. I am investing through finfreedom since 1998 and got superb returns and now I am enjoying my financial freedom.',
        rating: 5,
        avatar: 'PG',
    },
    {
        name: 'Yesha Jathal',
        role: 'Verified Google Review',
        text: 'My go to people for any decision finance related.. always happy to help everyone with a huge smile.. Nitin uncle and Anjali are simply the best 🙂🙂',
        rating: 5,
        avatar: 'YJ',
    },
    {
        name: 'Vanrajsinh Jhala',
        role: 'Verified Google Review',
        text: 'Excellent MF Service and Financial planning advice from Mr Nitinbhai. He advice like elder brother & family member.',
        rating: 5,
        avatar: 'VJ',
    },
];

const CALC_HIGHLIGHTS = [
    { name: 'SIP Calculator', desc: 'Plan your monthly investments', to: '/calculators/sip' },
    { name: 'Retirement Planner', desc: 'Estimate your retirement corpus', to: '/calculators/retirement' },
    { name: 'Goal Planning', desc: 'Calculate savings for any goal', to: '/calculators/goal' },
    { name: 'Tax Savings (ELSS)', desc: 'Optimize your tax liability', to: '/calculators/sip' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const duration = 1800;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current = Math.min(current + increment, target);
                        setCount(Math.floor(current));
                        if (current >= target) clearInterval(timer);
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}


const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } },
};


const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [livePosts, setLivePosts] = useState<BlogItem[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await blogService.getLatestPosts();
            if (posts && posts.length > 0) {
                setLivePosts(posts.slice(0, 3));
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setActiveSlide((p) => (p + 1) % HERO_SLIDES.length), 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[activeSlide];

    return (
        <>
            <Helmet>
                <title>FinFreedom33 | AMFI Registered Mutual Fund Distributor | Ahmedabad</title>
                <meta name="description" content="FinFreedom33 LLP - Expert mutual fund distribution, financial planning, insurance, and wealth management services. 25+ years of experience. Book a free consultation today." />
                <meta property="og:title" content="FinFreedom33 | Wealth Management & Investment Services" />
                <meta property="og:description" content="Your trusted partner for mutual funds, financial planning, insurance, and goal-based investing. AMFI Registered MFD." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FinancialService",
                    "name": "FinFreedom33 LLP",
                    "description": "AMFI Registered Mutual Fund Distributor offering comprehensive financial planning, mutual funds, insurance, and wealth management services",
                    "url": "https://finfreedom33.com",
                    "telephone": "+91-9327002340",
                    "email": "nitin@finfreedom33.com",
                    "address": { "@type": "PostalAddress", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" },
                })}</script>
            </Helmet>

            {/* Hero Slider */}
            <section className="relative w-full min-h-[85vh] md:min-h-screen flex items-center overflow-hidden" aria-label="Hero">
                {/* Background */}
                <img
                    src={slide.image}
                    alt="FinFreedom33 wealth management"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
                    key={activeSlide}
                />
                <div className="absolute inset-0 hero-overlay" />

                {/* Content */}
                <div className="relative z-10 container-custom py-20 md:py-28">
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <span className="badge bg-secondary/90 text-white mb-5 text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-1.5">
                            {slide.tag}
                        </span>
                        <h1 className="text-white font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            {slide.title.split('\n').map((line, i) => (
                                <span key={i} className="block lg:inline">
                                    {line}
                                    {i < slide.title.split('\n').length - 1 && <span className="hidden lg:inline"><br /></span>}
                                </span>
                            ))}
                        </h1>
                        <p className="text-blue-100/90 text-sm md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                            {slide.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to={slide.cta.to} className="btn-secondary btn-lg w-full sm:w-auto shadow-xl shadow-secondary/20">
                                {slide.cta.label}
                                <ArrowRight size={18} />
                            </Link>
                            <Link to={slide.cta2.to} className="btn-outline-white btn-lg w-full sm:w-auto backdrop-blur-sm">
                                {slide.cta2.label}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSlide(i)}
                                className={`transition-all duration-300 rounded-full ${i === activeSlide ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="bg-navy py-10 md:py-14" aria-label="Statistics">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                        {STATS.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-blue-300 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section bg-surface" aria-label="Our Services">
                <div className="container-custom">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <motion.div variants={fadeUp} className="text-center mb-12">
                            <p className="section-label">What We Offer</p>
                            <h2 className="text-navy mb-4">Comprehensive Financial Solutions</h2>
                            <div className="divider mx-auto mb-4" />
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                From systematic investment planning to comprehensive insurance, we offer a full spectrum of financial services to help you build, protect, and grow your wealth.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {SERVICES_GRID.map((service) => (
                                <motion.div key={service.title} variants={fadeUp}>
                                    <Link to={service.path} className="card-hover card-body flex flex-col h-full group p-6 sm:p-7">
                                        <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                            <service.icon size={22} />
                                        </div>
                                        <h3 className="text-navy font-bold text-lg mb-3 group-hover:text-primary transition-colors leading-tight">{service.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed flex-1">{service.description}</p>
                                        <div className="flex items-center gap-1.5 mt-5 text-primary text-sm font-bold">
                                            <span>Learn More</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={fadeUp} className="text-center mt-12">
                            <Link to="/services" className="btn-primary btn-lg w-full sm:w-auto">
                                View All Services
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section bg-white" aria-label="Why Choose FinFreedom33">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <p className="section-label">Why Choose Us</p>
                            <h2 className="text-navy mb-4">A Hobby Turned Lifelong Profession</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-4 leading-relaxed">
                                Founded by a CFP-certified engineer-turned-financial-planner who achieved financial freedom at 33, FinFreedom33 LLP embodies the principle that early, disciplined investing creates lasting wealth.
                            </p>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Our philosophy is simple: recommend the right product, in the right amount, at the right time—without bias, without pressure, and without hidden agendas.
                            </p>
                            <ul className="space-y-3">
                                {WHY_CHOOSE.map((point) => (
                                    <li key={point} className="flex items-center gap-3 text-sm text-gray-700">
                                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex gap-4">
                                <Link to="/about" className="btn-primary">
                                    Our Story
                                    <ArrowRight size={16} />
                                </Link>
                                <Link to="/contact" className="btn-outline">
                                    Book Consultation
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80"
                                alt="Financial advisor discussing investment strategies"
                                className="rounded-3xl shadow-premium w-full object-cover aspect-[4/3]"
                                loading="lazy"
                            />
                            <div className="absolute -bottom-6 -left-6 card p-5 shadow-card-hover">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                                        <Award size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-navy text-sm">CFP Certified</p>
                                        <p className="text-gray-400 text-xs">FPSB India, Since 2009</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* YouTube Section */}
            <YouTubeSection />

            {/* Calculator CTA Strip */}
            <section className="section bg-gradient-primary" aria-label="Financial Calculators">
                <div className="container-custom">
                    <div className="text-center mb-10">
                        <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Planning Tools</p>
                        <h2 className="text-white font-display font-bold text-3xl md:text-4xl mb-4">
                            Make Informed Financial Decisions
                        </h2>
                        <p className="text-blue-200 max-w-xl mx-auto">
                            Use our suite of calculators to estimate returns, plan for goals, and understand the true impact of your investment decisions.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {CALC_HIGHLIGHTS.map((calc) => (
                            <Link
                                key={calc.name}
                                to={calc.to}
                                className="glass rounded-2xl p-6 hover:bg-white/20 transition-all group text-left border border-white/10"
                            >
                                <h3 className="text-white font-bold mb-1.5 group-hover:-translate-y-0.5 transition-transform text-lg lg:text-base">{calc.name}</h3>
                                <p className="text-blue-100/80 text-sm leading-snug">{calc.desc}</p>
                                <div className="flex items-center gap-2 text-secondary mt-4 font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                                    <span>Try Now</span>
                                    <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/calculators" className="btn-outline-white btn-lg w-full sm:w-auto">
                            Explore All Calculators
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Google Reviews Testimonials */}
            <section className="section bg-surface overflow-hidden" aria-label="Client Testimonials">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div className="text-center md:text-left">
                            <p className="section-label">Trust & Excellence</p>
                            <h2 className="text-navy mb-4">What Our Clients Say</h2>
                            <div className="divider mx-auto md:mx-0" />
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-3">
                            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="text-2xl font-bold text-navy">5.0</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} size={18} className="text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs font-medium">Based on 15+ Google Reviews</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 border shadow-inner">
                                    <svg viewBox="0 0 24 24" className="w-full h-full">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                            </div>
                            <a
                                href="https://share.google/HshNFkEzLNnaWVhEl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-sm font-bold flex items-center gap-2 hover:underline"
                            >
                                View all reviews on Google
                                <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TESTIMONIALS.map((t, idx) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="card card-body flex flex-col justify-between group hover:border-primary/30 transition-all duration-300"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                                        "{t.text}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {t.avatar}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-navy text-sm truncate">{t.name}</p>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="https://share.google/HshNFkEzLNnaWVhEl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Write a Review on Google
                            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21.75 6.75l-4.5-4.5a1.5 1.5 0 0 0-2.12 0L3.12 14.26a1.5 1.5 0 0 0-.44 1.06V21a1.5 1.5 0 0 0 1.5 1.5h5.68a1.5 1.5 0 0 0 1.06-.44l11.01-11a1.5 1.5 0 0 0 0-2.12zM10.88 19.5H5.25v-5.63l9.01-9.01 5.63 5.63-9.01 9.01z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Blog Teaser */}
            <section className="section bg-white" aria-label="Latest Insights">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <p className="section-label">Market Insights</p>
                            <h2 className="text-navy">Latest from the Blog</h2>
                        </div>
                        <Link to="/blog" className="btn-outline btn-sm shrink-0">
                            View All Articles
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {livePosts.length > 0 ? (
                            livePosts.map((post) => (
                                <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="card-hover group">
                                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                        <img
                                            src={post.imageUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="card-body">
                                        <span className="badge-primary text-xs mb-3">Economic Times</span>
                                        <h3 className="text-navy font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs">{new Date(post.pubDate).toLocaleDateString()}</p>
                                    </div>
                                </a>
                            ))
                        ) : (
                            [
                                {
                                    title: 'Power of Compounding: Why Starting Early Matters Most',
                                    category: 'Investing Basics',
                                    date: 'February 2026',
                                    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
                                },
                                {
                                    title: 'ELSS vs PPF: Which is the Better Tax-Saving Instrument in 2026?',
                                    category: 'Tax Planning',
                                    date: 'February 2026',
                                    img: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&q=80',
                                },
                                {
                                    title: 'How to Build an Emergency Fund: A Step-by-Step Guide',
                                    category: 'Financial Planning',
                                    date: 'January 2026',
                                    img: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=80',
                                },
                            ].map((article) => (
                                <Link key={article.title} to="/blog" className="card-hover group">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={article.img}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="card-body">
                                        <span className="badge-primary text-xs mb-3">{article.category}</span>
                                        <h3 className="text-navy font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs">{article.date}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-navy py-16 md:py-20" aria-label="Call to Action">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-white font-display font-bold text-3xl md:text-5xl mb-6 leading-tight">
                            Ready to Start Your Wealth Journey?
                        </h2>
                        <p className="text-blue-100 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Book a free, no-obligation consultation with our CFP-certified advisor and get a personalized financial roadmap.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link to="/contact" className="btn-secondary btn-lg w-full sm:w-auto">
                                Book Free Consultation
                                <ArrowRight size={18} />
                            </Link>
                            <Link to="/risk-profile" className="btn-outline-white btn-lg w-full sm:w-auto">
                                Know Your Risk Profile
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
