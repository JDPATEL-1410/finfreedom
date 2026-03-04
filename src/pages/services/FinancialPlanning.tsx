import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Target, BarChart3, Shield, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const PLANNING_PILLARS = [
    {
        icon: Target,
        title: 'Cash Flow Management',
        desc: 'Analyzing your income, expenses, and surplus to optimize your savings rate without compromising on lifestyle.'
    },
    {
        icon: BarChart3,
        title: 'Asset Allocation',
        desc: 'Diversifying your wealth across asset classes (Equity, Debt, Gold, Real Estate) based on your risk profile.'
    },
    {
        icon: Shield,
        title: 'Risk Management',
        desc: 'Ensuring your foundation is strong with adequate life, health, and disability insurance coverage.'
    },
    {
        icon: Briefcase,
        title: 'Estate Planning',
        desc: 'Structuring your assets and legacy (Wills, Trusts) to ensure smooth wealth transfer to the next generation.'
    }
];

const img = getImage('services/financial-planning');

export default function FinancialPlanning() {
    return (
        <>
            <Helmet>
                <title>Holistic Financial Planning | FinFreedom33 LLP</title>
                <meta name="description" content="Get a comprehensive 360-degree financial plan covering retirement, education, tax, and estate planning from expert CFP-certified advisors." />
            </Helmet>

            <PageHeader
                title="Comprehensive Financial Planning"
                subtitle="Creating a personalized roadmap for your financial journey—from today's budget to tomorrow's legacy"
                heroUrl={img.heroUrl}
                heroAlt="Financial planning session"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Financial Planning' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="section-label">Our Approach</p>
                            <h2 className="text-navy mb-6">Financial Success Doesn't Happen by Accident—It Happens by Design</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Most people accumulate products—a few mutual funds here, an insurance policy there—without a cohesive strategy. Holistic financial planning is the process of looking at your entire financial life as a single ecosystem.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                At FinFreedom33, our planning process is led by Certified Financial Planners (CFP). We focus on the "Why" before the "What". Whether you're planning for your child's Harvard education or your own early retirement, we create a mathematical blueprint to get you there.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Personalized 50+ page Financial Plan', 'Asset Allocation Strategy', 'Quarterly Progress Reviews', 'Tax Optimization Analysis'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-navy font-semibold">
                                        <CheckCircle2 size={20} className="text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/contact" className="btn-primary btn-lg">Start My Plan <ArrowRight size={18} /></Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <div className="bg-surface rounded-3xl p-8 shadow-premium border border-gray-100">
                                <h4 className="text-navy font-bold text-xl mb-6">The Planning Lifecycle</h4>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Discovery', desc: 'Listing goals and current status' },
                                        { title: 'Analysis', desc: 'Gap identification & Stress testing' },
                                        { title: 'Implementation', desc: 'Portfolio construction' },
                                        { title: 'Review', desc: 'Dynamic adjustments' }
                                    ].map((s, idx) => (
                                        <div key={s.title} className="flex items-center gap-6">
                                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
                                            <div>
                                                <p className="font-bold text-navy leading-none mb-1">{s.title}</p>
                                                <p className="text-xs text-gray-400">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PLANNING_PILLARS.map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body text-center flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-6 text-primary">
                                    <p.icon size={32} />
                                </div>
                                <h3 className="text-navy font-bold text-lg mb-3">{p.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-gradient-primary">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <h2 className="font-display font-bold text-3xl mb-6">Experience the Benefit of a Written Plan</h2>
                            <p className="text-blue-100 mb-8 max-w-lg">Investors with a written financial plan are 3x more likely to feel confident about their future than those without one.</p>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-5 bg-white/10 rounded-2xl backdrop-blur-sm">
                                    <Zap className="text-secondary shrink-0" />
                                    <p className="text-sm">Stop guessing and start knowing exactly when you will reach financial freedom.</p>
                                </div>
                                <div className="flex gap-4 p-5 bg-white/10 rounded-2xl backdrop-blur-sm">
                                    <Users className="text-secondary shrink-0" />
                                    <p className="text-sm">Consolidate all family assets in one single dashboard for easy tracking.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-10 shadow-2xl">
                            <h3 className="text-navy font-bold text-2xl mb-6 text-center">Ready to get started?</h3>
                            <div className="space-y-4">
                                <p className="text-gray-500 text-sm text-center mb-6">Book a 30-minute discovery call to see if our comprehensive planning service is right for you.</p>
                                <Link to="/contact" className="btn-primary w-full text-center">Schedule Discovery Call</Link>
                                <Link to="/calculators/goal" className="btn-outline w-full text-center">Try Goal Calculator</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
