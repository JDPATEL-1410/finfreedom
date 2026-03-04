import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, BarChart3, Target, Award, Users, Calculator, FileText } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';

const ALL_SERVICES = [
    {
        icon: TrendingUp,
        title: 'Mutual Funds',
        description: 'Diversified mutual fund portfolios across equity, debt, and hybrid categories—curated for your risk profile and investment horizon.',
        path: '/services/mutual-funds',
        color: 'text-primary bg-primary/10',
        highlights: ['Equity Funds', 'Debt Funds', 'Hybrid Funds', 'ELSS Funds', 'Index Funds', 'International Funds'],
    },
    {
        icon: Shield,
        title: 'Insurance',
        description: 'Comprehensive life and health insurance solutions to protect your family against unexpected financial setbacks.',
        path: '/services/insurance',
        color: 'text-secondary bg-secondary/10',
        highlights: ['Term Life Insurance', 'Health Insurance', 'ULIP', 'Child Plans', 'Pension Plans'],
    },
    {
        icon: BarChart3,
        title: 'Equity & Stocks',
        description: 'Direct equity investment guidance for building long-term wealth through fundamentally strong businesses.',
        path: '/services/stocks',
        color: 'text-green-700 bg-green-100',
        highlights: ['Direct Equity', 'Portfolio Rebalancing', 'Sectoral Analysis', 'IPO Advisory'],
    },
    {
        icon: Target,
        title: 'Financial Planning',
        description: 'Holistic financial roadmaps covering budgeting, asset allocation, estate planning, and comprehensive wealth management.',
        path: '/services/financial-planning',
        color: 'text-purple-700 bg-purple-100',
        highlights: ['Cash Flow Planning', 'Asset Allocation', 'Debt Management', 'Estate Planning'],
    },
    {
        icon: Users,
        title: 'Retirement Planning',
        description: 'Build your retirement corpus systematically so you can enjoy your golden years without financial worry.',
        path: '/services/retirement',
        color: 'text-teal-700 bg-teal-100',
        highlights: ['NPS Advisory', 'EPF Planning', 'SWP Strategy', 'Retirement Corpus'],
    },
    {
        icon: Award,
        title: 'Goal-Based Investing',
        description: 'Investments aligned to your specific life milestones—education, home, travel, marriage, and more.',
        path: '/services/goal-based',
        color: 'text-amber-700 bg-amber-100',
        highlights: ['Child Education', 'Home Purchase', 'Dream Vacation', 'Wedding Fund'],
    },
    {
        icon: Calculator,
        title: 'Taxation & ELSS',
        description: 'Smart tax planning strategies that help you legally minimize tax outgo while simultaneously building wealth.',
        path: '/services/taxation',
        color: 'text-indigo-700 bg-indigo-100',
        highlights: ['ELSS Investments', '80C Planning', 'Capital Gains', 'Tax Loss Harvesting'],
    },
    {
        icon: FileText,
        title: 'Fixed Deposits',
        description: 'Higher-yield fixed deposit options through top NBFCs and small finance banks for stable, predictable returns.',
        path: '/services/fixed-deposits',
        color: 'text-rose-700 bg-rose-100',
        highlights: ['Corporate FDs', 'NBFC FDs', 'Laddering Strategy', 'Senior Citizen FDs'],
    },
];

const img = getImage('services');

export default function Services() {
    return (
        <>
            <Helmet>
                <title>Our Services | FinFreedom33 LLP – Comprehensive Financial Solutions</title>
                <meta name="description" content="Explore FinFreedom33's comprehensive financial services: mutual funds, insurance, equity, financial planning, retirement, taxation, and more." />
            </Helmet>

            <PageHeader
                title="Our Financial Services"
                subtitle="A complete ecosystem of financial solutions to help you build, protect, and grow your wealth"
                heroUrl={img.heroUrl}
                heroAlt={img.heroAlt}
                breadcrumbs={[{ label: 'Services' }]}
            />

            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="section-label">What We Offer</p>
                        <h2 className="text-navy mb-4">Tailored Solutions for Every Financial Goal</h2>
                        <div className="divider mx-auto mb-4" />
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            We believe every individual, family, and business has unique financial aspirations. Our services are designed to meet you where you are and guide you where you want to go.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ALL_SERVICES.map((service, i) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={service.path} className="card-hover group h-full flex flex-col">
                                    <div className="card-body flex flex-col h-full">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center shrink-0`}>
                                                <service.icon size={22} />
                                            </div>
                                            <div>
                                                <h3 className="text-navy font-semibold text-lg group-hover:text-primary transition-colors">{service.title}</h3>
                                                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{service.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                                            {service.highlights.map((h) => (
                                                <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{h}</span>
                                            ))}
                                            <span className="ml-auto flex items-center gap-1 text-primary text-sm font-medium">
                                                Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="section-label">How We Work</p>
                        <h2 className="text-navy mb-4">Our 4-Step Advisory Process</h2>
                        <div className="divider mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: '01', title: 'Understand', desc: 'We begin with a comprehensive discovery session to understand your financial goals, risk tolerance, and investment timeline.' },
                            { step: '02', title: 'Analyse', desc: 'Our advisors conduct a thorough analysis of your current financial position and identify gaps and opportunities.' },
                            { step: '03', title: 'Plan', desc: 'We create a personalized financial blueprint mapping specific products and amounts to each of your goals.' },
                            { step: '04', title: 'Monitor', desc: 'Regular quarterly reviews ensure your portfolio stays aligned with your goals and adapts to life changes.' },
                        ].map((s, i) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-display font-bold text-lg">{s.step}</span>
                                </div>
                                <h3 className="text-navy font-semibold text-base mb-2">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-navy py-14">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-3xl mb-4">Start With a Free Consultation</h2>
                    <p className="text-blue-200 mb-8 max-w-lg mx-auto">Our advisors will help you identify the right services for your unique financial situation.</p>
                    <Link to="/contact" className="btn-secondary btn-lg">Book Now <ArrowRight size={18} /></Link>
                </div>
            </section>
        </>
    );
}
