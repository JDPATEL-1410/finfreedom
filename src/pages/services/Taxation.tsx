import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ArrowRight, FileText, TrendingDown, Percent, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const TAX_STRATEGIES = [
    {
        icon: TrendingDown,
        title: 'ELSS Investments',
        desc: 'Equity Linked Savings Schemes offer the shortest lock-in (3 years) of all 80C options and high growth potential.'
    },
    {
        icon: Percent,
        title: 'Tax Loss Harvesting',
        desc: 'Legally offset your capital gains by selling underperforming assets to reduce your overall tax liability.'
    },
    {
        icon: FileText,
        title: 'Section 80C & 80D',
        desc: 'Optimizing your limit under 80C for investments and 80D for health insurance premiums for you and your parents.'
    },
    {
        icon: Award,
        title: 'NPS & PPF',
        desc: 'Utilizing long-term retirement vehicles to get additional tax benefits beyond standard limits.'
    }
];

const img = getImage('services/taxation');

export default function Taxation() {
    return (
        <>
            <Helmet>
                <title>Tax Planning & ELSS Advice | FinFreedom33 LLP</title>
                <meta name="description" content="Save taxes legally while building wealth. Expert guidance on ELSS, Section 80C, 80D, and capital gains tax planning from FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Tax Planning & ELSS"
                subtitle="Moving from automated tax deductions to intelligent tax saving strategies that grow your wealth"
                heroUrl={img.heroUrl}
                heroAlt="Tax document and calculator"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Taxation' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="section-label">Smart Tax Saving</p>
                            <h2 className="text-navy mb-6">Don't Just Save Tax, Create Wealth</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Many investors wait until March to rush into any tax-saving product just to get the deduction. This often leads to poor investment choices like high-cost, low-return traditional insurance policies.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                At FinFreedom33, we integrate tax planning into your year-round financial strategy. We focus on ELSS (Mutual Funds) because they offer the lowest lock-in and the highest historical returns among 80C options. We also help you optimize your Health Insurance (80D) and NPS (80CCD) contributions to minimize your taxable income legally.
                            </p>
                            <div className="bg-surface rounded-2xl p-6 border border-primary/10">
                                <h4 className="text-navy font-bold mb-4">The FinFreedom Advantage</h4>
                                <ul className="space-y-2">
                                    {['Capital Gains optimization', 'Tax-efficient asset allocation', 'March rush avoidance', 'Lumpsum vs SIP in ELSS'].map(p => (
                                        <li key={p} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 size={16} className="text-primary" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" alt="Wealth and tax planning" className="rounded-3xl shadow-premium h-[450px] object-cover w-full" />
                            <div className="absolute -top-6 -right-6 bg-secondary p-8 rounded-full shadow-xl">
                                <div className="text-white text-center">
                                    <p className="text-xs uppercase tracking-widest font-bold">Save Upto</p>
                                    <p className="text-3xl font-display font-black">₹46,800</p>
                                    <p className="text-[10px]">Under Sec 80C</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {TAX_STRATEGIES.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 text-primary">
                                    <s.icon size={28} />
                                </div>
                                <h3 className="text-navy font-bold text-lg mb-2">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface">
                <div className="container-custom text-center">
                    <h2 className="text-navy font-display font-bold text-3xl mb-12">Tax Savings at a Glance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-8 bg-white shadow-sm border-0">
                            <h4 className="font-bold text-navy mb-2">Section 80C</h4>
                            <p className="text-primary font-black text-2xl mb-4">₹1.50 Lakhs</p>
                            <p className="text-xs text-gray-400">Deduction for ELSS, PPF, Insurance, etc.</p>
                        </div>
                        <div className="card p-8 bg-white shadow-sm border-0">
                            <h4 className="font-bold text-navy mb-2">Section 80D</h4>
                            <p className="text-primary font-black text-2xl mb-4">₹25,000 - ₹1L</p>
                            <p className="text-xs text-gray-400">Deduction for Health Insurance premiums.</p>
                        </div>
                        <div className="card p-8 bg-white shadow-sm border-0">
                            <h4 className="font-bold text-navy mb-2">NPS (80CCD)</h4>
                            <p className="text-primary font-black text-2xl mb-4">₹50,000 Extra</p>
                            <p className="text-xs text-gray-400">Additional deduction over and above 80C.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-navy py-16">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-3xl mb-6">Stop Paying Extra Tax</h2>
                    <p className="text-blue-200 mb-8 max-w-lg mx-auto">Get your tax-savings plan ready within 24 hours. No fee, no obligations.</p>
                    <Link to="/contact" className="btn-secondary btn-lg">Optimize My Taxes <ArrowRight size={18} /></Link>
                </div>
            </section>
        </>
    );
}
