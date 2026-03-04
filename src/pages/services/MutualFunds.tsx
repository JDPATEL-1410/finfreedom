import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, CheckCircle2, PieChart, BarChart2, Shield, Zap, Info } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const FUND_CATEGORIES = [
    {
        name: 'Equity Funds',
        desc: 'Large cap, mid cap, small cap, flexi cap—designed for long-term capital appreciation and wealth creation.',
        best: 'Long-term (7+ years)',
        icon: TrendingUp
    },
    {
        name: 'Debt Funds',
        desc: 'Liquid, short-term, gilt, credit risk—providing stability, capital preservation, and regular income generation.',
        best: 'Short to medium term',
        icon: Shield
    },
    {
        name: 'Hybrid Funds',
        desc: 'Balanced advantage, aggressive hybrid, multi-asset—offering a mix of growth and stability through dynamic allocation.',
        best: 'Medium term (3-5 years)',
        icon: PieChart
    },
    {
        name: 'ELSS (Tax Saving)',
        desc: 'Tax-deductible equity funds with a 3-year lock-in—the perfect blend of tax optimization and growth.',
        best: 'Tax saving + growth',
        icon: Zap
    },
    {
        name: 'Index Funds & ETFs',
        desc: 'Low-cost passive investing that replicates benchmarks like Nifty 50 or Sensex for consistent market returns.',
        best: 'Low-cost long-term',
        icon: BarChart2
    },
    {
        name: 'Solution Oriented',
        desc: 'Retirement funds and children\'s education funds with specific lock-in periods tailored for life stages.',
        best: 'Goal-specific',
        icon: Info
    },
];

const img = getImage('services/mutual-funds');

export default function MutualFunds() {
    return (
        <>
            <Helmet>
                <title>Mutual Fund Investment & Distribution | FinFreedom33 LLP</title>
                <meta name="description" content="Invest in 2000+ mutual fund schemes across 40+ AMCs. Expert-curated portfolios, regular monitoring, and digital tracking from FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Mutual Fund Investments"
                subtitle="Harnessing the power of professional money management to build your long-term wealth systematically"
                heroUrl={img.heroUrl}
                heroAlt="Stock market chart and investment"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Mutual Funds' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <div className={`max-w-3xl ${true ? 'mx-auto text-center' : ''}`}>
                            <p className="section-label">Expert-Curated Portfolios</p>
                            <h2 className="text-navy mb-6">Invest in the Best, Skip the Rest</h2>
                            <div className="divider mb-6 mx-auto lg:mx-0" />
                            <p className="text-gray-500 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                With over 2,500 mutual fund schemes in India, picking the right ones can be overwhelming. Most investors simply chase last year's winners, which is a recipe for disaster. At FinFreedom33, we follow an institutional-grade research process to select funds.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                We evaluate funds based on the "5-P Framework": Philosophy, Process, People, Performance, and Price. Our goal is to find consistent performers that can weather market cycles, not just one-hit wonders.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto lg:mx-0">
                                {[
                                    'Periodic portfolio rebalancing',
                                    'Consolidated family dashboards',
                                    'Capital gains tax management',
                                    'Regular performance reviews'
                                ].map(f => (
                                    <div key={f} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="text-sm font-semibold text-navy">{f}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link to="/calculators/sip" className="btn-primary w-full sm:w-auto">Start a SIP Today</Link>
                                <Link to="/research" className="btn-outline w-full sm:w-auto">Compare Funds</Link>
                            </div>
                        </div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" alt="Mutual fund growth chart" className="rounded-3xl shadow-premium lg:h-[500px] object-cover w-full" />
                            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 hidden md:block">
                                <div className="flex items-center gap-5">
                                    <div>
                                        <p className="text-3xl font-display font-black text-primary leading-tight">40+</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Partner AMCs</p>
                                    </div>
                                    <div className="w-px h-10 bg-gray-100" />
                                    <div>
                                        <p className="text-3xl font-display font-black text-secondary leading-tight">25+</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Years of Trust</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FUND_CATEGORIES.map((cat, i) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body group hover:bg-navy hover:text-white transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white">
                                    <cat.icon size={24} />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{cat.name}</h3>
                                <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed mb-6">{cat.desc}</p>
                                <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-white/10 flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Best for: {cat.best}</span>
                                    <ArrowRight size={16} className="text-primary group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface">
                <div className="container-custom text-center">
                    <h2 className="text-navy font-display font-bold text-3xl mb-12">How SIP Works Wonders</h2>
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-premium border border-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                            {[
                                { title: 'Discipline', desc: 'Auto-debit ensures you invest every month regardless of market sentiment—building consistency over time.' },
                                { title: 'Rupee Cost Averaging', desc: 'Buy more units when prices are low and fewer when prices are high automatically, reducing average cost.' },
                                { title: 'Power of Compounding', desc: 'Interest on interest creates exponential wealth over decades. Time is your greatest asset in compounding.' }
                            ].map((item, idx) => (
                                <div key={item.title} className="relative group p-4 rounded-2xl hover:bg-surface transition-colors">
                                    <span className="absolute -top-4 -left-2 text-7xl font-black text-primary/5 select-none group-hover:text-primary/10 transition-colors">0{idx + 1}</span>
                                    <h4 className="text-navy font-bold text-xl mb-3 relative">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-navy py-16">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-4xl mb-6">Invest with Confidence</h2>
                    <p className="text-blue-200 mb-10 max-w-xl mx-auto">Get a free portfolio review or start your fresh investment journey with India's most trusted mutual fund partners.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="btn-secondary btn-lg">Book Free Consultation</Link>
                        <Link to="/calculators/sip" className="btn-outline-white btn-lg">SIP Calculator</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
