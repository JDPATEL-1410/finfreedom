import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Coffee, Wallet, TrendingDown, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const RETIREMENT_OPTIONS = [
    {
        icon: Wallet,
        title: 'Corpus Building',
        desc: 'Systematic investment planning (SIP) to accumulate the required wealth before your target retirement age.'
    },
    {
        icon: TrendingDown,
        title: 'SWP Strategies',
        desc: 'Systematic Withdrawal Plans (SWP) that generate a regular monthly income while keeping your principal invested.'
    },
    {
        icon: Coffee,
        title: 'Pension & NPS',
        desc: 'Advisory on government-backed and private pension plans including National Pension System (NPS).'
    },
    {
        icon: Sun,
        title: 'Early Retirement (FIRE)',
        desc: 'Aggressive wealth building strategies for those aiming to achieve financial independence in their 30s or 40s.'
    }
];

const img = getImage('services/retirement');

export default function Retirement() {
    return (
        <>
            <Helmet>
                <title>Retirement Planning Services | FinFreedom33 LLP</title>
                <meta name="description" content="Plan for a stress-free retirement. Calculate your required corpus, automate your income, and achieve financial independence with FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Retirement Planning"
                subtitle="Ensuring your golden years are truly golden—with a guaranteed lifelong income and zero financial worries"
                heroUrl={img.heroUrl}
                heroAlt="Couple enjoying retirement"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Retirement' }]}
            />

            <section className="section bg-white text-navy">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="section-label">The Longest Vacation</p>
                            <h2 className="text-navy mb-6">Will Your Money Outlive You, or Will You Outlive Your Money?</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Retirement is no longer just about reaching age 60. With increasing life expectancies and inflation, a typical retirement could last 30+ years. Most people vastly underestimate the corpus required to sustain their current lifestyle for three decades without a monthly salary.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                At FinFreedom33, we follow the "Bucket Strategy" for retirement. We help you build separate portfolios for immediate needs, medium-term stability, and long-term growth. This ensures you have a steady "pension-like" income that increases with inflation.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/calculators/retirement" className="btn-primary btn-lg">Estimate My Corpus <ArrowRight size={18} /></Link>
                                <Link to="/contact" className="btn-outline btn-lg">Talk to an Expert</Link>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <img src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=80" alt="Retirement planning" className="rounded-3xl shadow-premium" />
                            <div className="absolute -bottom-8 left-8 bg-white p-6 rounded-2xl shadow-card-hover border border-gray-100 max-w-xs">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <p className="font-bold text-navy">Early Retirement</p>
                                </div>
                                <p className="text-xs text-gray-400">Achieve Financial Freedom at 33, just like our founder did.</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {RETIREMENT_OPTIONS.map((opt, i) => (
                            <motion.div
                                key={opt.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-surface rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <opt.icon size={28} className="text-primary" />
                                </div>
                                <h3 className="text-navy font-bold text-xl mb-3">{opt.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{opt.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-navy">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-white font-display font-bold text-4xl mb-6">The 4% Rule & Beyond</h2>
                        <p className="text-blue-200 mb-10">We use advanced Monte Carlo simulations to ensure your retirement portfolio has a 99% success rate even in the worst market conditions.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl">
                                <p className="text-secondary font-bold text-3xl mb-1">6%</p>
                                <p className="text-white text-xs uppercase tracking-widest">Inflation Buffer</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl">
                                <p className="text-secondary font-bold text-3xl mb-1">85+</p>
                                <p className="text-white text-xs uppercase tracking-widest">Life Expectancy</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl">
                                <p className="text-secondary font-bold text-3xl mb-1">100%</p>
                                <p className="text-white text-xs uppercase tracking-widest">Digital Tracking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-white text-center">
                <div className="container-custom">
                    <h2 className="text-navy font-display font-bold text-3xl mb-4">Start Planning Today</h2>
                    <p className="text-gray-500 mb-10 max-w-lg mx-auto">Every year of delay reduces your final corpus significantly. Use our planner to see the difference.</p>
                    <Link to="/calculators/retirement" className="btn-primary btn-lg">Open Retirement Planner</Link>
                </div>
            </section>
        </>
    );
}
