import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart2, ArrowRight, TrendingUp, Search, PieChart, Layers } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const STOCK_SERVICES = [
    {
        icon: Search,
        title: 'Fundamental Analysis',
        desc: 'We identify fundamentally strong businesses with competitive moats, solid management, and sustainable earnings growth.'
    },
    {
        icon: Layers,
        title: 'Model Portfolios',
        desc: 'Choose from expert-curated stock baskets focused on themes like Quality, Growth, Value, or Dividends.'
    },
    {
        icon: PieChart,
        title: 'Portfolio Health Check',
        desc: 'Get a deep-dive analysis of your existing equity holdings with specific buy/sell/hold recommendations based on current market dynamics.'
    },
    {
        icon: TrendingUp,
        title: 'IPO Advisory',
        desc: 'Unbiased reviews and recommendations for upcoming Initial Public Offerings (IPOs) based on valuation and business potential.'
    }
];

const img = getImage('services/stocks');

export default function Stocks() {
    return (
        <>
            <Helmet>
                <title>Equity & Stock Advisory | FinFreedom33 LLP</title>
                <meta name="description" content="Build a high-conviction equity portfolio with expert guidance. Fundamental analysis, model portfolios, and IPO advisory from FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Equity & Stock Advisory"
                subtitle="Direct equity strategies focused on creating long-term wealth through concentrated high-conviction investing"
                heroUrl={img.heroUrl}
                heroAlt="Equity market research"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Stocks' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:order-2">
                            <p className="section-label">Wealth Creation through Equity</p>
                            <h2 className="text-navy mb-6">Invest in Businesses, Not Tickers</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Direct equity is often the highest-performing asset class over the long term, but it requires discipline, patience, and rigorous research. At FinFreedom33, we follow a first-principles approach to stock picking.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                We focus on "Quality at Reasonable Price" (QARP). Our team analyzes financial statements, industry tailwinds, and management integrity to find companies that can compound wealth over decades. We help you avoid the noise and focus on what truly drives stock prices: earnings growth.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-surface rounded-2xl border border-gray-100">
                                    <div className="text-2xl font-bold text-primary mb-1">Low</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Churn Rate</div>
                                </div>
                                <div className="p-4 bg-surface rounded-2xl border border-gray-100">
                                    <div className="text-2xl font-bold text-primary mb-1">High</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Conviction</div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:order-1 relative">
                            <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80" alt="Stock market analysis" className="rounded-3xl shadow-premium" />
                            <div className="absolute top-6 left-6 bg-navy/90 backdrop-blur-sm p-4 rounded-xl text-white shadow-xl">
                                <BarChart2 size={24} className="text-secondary mb-2" />
                                <p className="text-sm font-semibold">Focused Strategy</p>
                                <p className="text-[10px] text-blue-200">20-25 Stocks Only</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {STOCK_SERVICES.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body flex items-start gap-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <s.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-navy font-bold text-lg mb-2">{s.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-navy overflow-hidden">
                <div className="container-custom relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-white font-display font-bold text-3xl mb-12">Our Investment Philosophy</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Margins of Safety', desc: 'We only enter stocks when they are trading at a discount to their intrinsic value.' },
                                { title: 'Long-term Horizon', desc: 'We don\'t time the market; we spend time in the market. 3-5 years is our minimum view.' },
                                { title: 'Diversified Concentration', desc: 'Diversified across sectors, but concentrated in our best ideas to drive alpha.' }
                            ].map(p => (
                                <div key={p.title} className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                    <h4 className="text-secondary font-bold text-xl mb-4">{p.title}</h4>
                                    <p className="text-blue-100 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-navy font-display font-bold text-3xl mb-6">Explore Our Research</h2>
                    <p className="text-gray-500 mb-10 max-w-xl mx-auto">Get access to live mutual fund performance data and expert pick lists in our Research Hub.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/research" className="btn-primary btn-lg">Go to Research Hub <ArrowRight size={18} /></Link>
                        <Link to="/contact" className="btn-outline btn-lg">Talk to an Advisor</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
