import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Calendar, Lock, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const FD_BENEFITS = [
    {
        icon: ShieldCheck,
        title: 'Safe & Secure',
        desc: 'Invest in high-rated (AAA/AA+) corporate FDs that offer higher returns than banks with manageable risks.'
    },
    {
        icon: TrendingUp,
        title: 'Superior Returns',
        desc: 'Earn up to 1-2% higher than traditional bank fixed deposits with leading NBFCs and banks.'
    },
    {
        icon: Calendar,
        title: 'Flexible Tenure',
        desc: 'Choose tenures from 12 months to 120 months based on your liquidity requirements.'
    },
    {
        icon: Lock,
        title: 'Guaranteed Income',
        desc: 'Locks in your interest rate for the entire tenure, insulating you from future rate cuts.'
    }
];

const img = getImage('services/fixed-deposits');

export default function FixedDeposits() {
    return (
        <>
            <Helmet>
                <title>Corporate Fixed Deposits | FinFreedom33 LLP</title>
                <meta name="description" content="Earn higher interest rates than your bank savings account. High-rated corporate fixed deposits and NBFC FDs through FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Corporate Fixed Deposits"
                subtitle="Secure, high-yield fixed income options for those who value stability and predictable growth"
                heroUrl={img.heroUrl}
                heroAlt="Savings and FD"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Fixed Deposits' }]}
            />

            <section className="section bg-white text-navy">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="section-label">Stable Returns</p>
                            <h2 className="text-navy mb-6">Beyond Traditional Bank FDs</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                In a falling interest rate environment, bank FDs often fail to beat inflation after taxes. Corporate Fixed Deposits (CFDs) and Non-Banking Financial Company (NBFC) FDs offer a compelling alternative for the conservative portion of your portfolio.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                At FinFreedom33, we strictly recommend only high-rated corporate FDs (AAA or AA+ ratings) from reputed conglomerates like HDFC, Bajaj Finance, Shriram, and Mahindra Finance. We help you use "FD Laddering" strategies to ensure both high returns and periodic liquidity.
                            </p>
                            <div className="bg-surface p-6 rounded-2xl border border-gray-100 mb-8">
                                <h4 className="font-bold mb-4">Why Invest Through Us?</h4>
                                <ul className="space-y-2">
                                    {['Zero paperwork - fully digital onboarding', 'Consolidated view of all your FDs', 'Timely maturity reminders', 'Competitive yield analysis across 15+ providers'].map(p => (
                                        <li key={p} className="flex items-center gap-2 text-sm text-gray-400">
                                            <CheckCircle2 size={16} className="text-primary" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/contact" className="btn-primary">Compare FD Rates <ArrowRight size={18} /></Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80" alt="Fixed deposit growth" className="rounded-3xl shadow-premium h-[450px] object-cover w-full" />
                            <div className="absolute top-6 left-6 card p-5 shadow-2xl bg-white/95 backdrop-blur-sm">
                                <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-1">Current Best Rate</p>
                                <p className="text-4xl font-display font-black text-navy leading-none">8.50%<span className="text-lg font-bold"> p.a.</span></p>
                                <p className="text-[10px] text-gray-400 mt-2">*For Senior Citizens on specific tenures</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FD_BENEFITS.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                    <b.icon size={24} />
                                </div>
                                <h3 className="text-navy font-bold text-lg mb-2">{b.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-navy text-white text-center">
                <div className="container-custom">
                    <h2 className="font-display font-bold text-3xl mb-4">Diversify Your Fixed Income</h2>
                    <p className="text-blue-200 mb-10 max-w-xl mx-auto">Move your idle cash to high-yield corporate FDs and start earning more than your savings account.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="btn-secondary btn-lg">Request Latest FD Rates</Link>
                        <Link to="/calculators/lumpsum" className="btn-outline-white btn-lg">Calculate Maturity Value</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
