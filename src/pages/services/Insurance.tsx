import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Heart, Activity, Umbrella, Home, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const INSURANCE_TYPES = [
    {
        icon: Umbrella,
        title: 'Term Life Insurance',
        desc: 'Pure protection for your family. Get high life cover at very affordable premiums to ensure your family\'s lifestyle remains unaffected.',
        benefits: ['High sum assured', 'Affordable premiums', 'Critical illness riders', 'Tax benefits under 80C']
    },
    {
        icon: Heart,
        title: 'Health Insurance',
        desc: 'Comprehensive medical coverage for you and your family. Guard against rising medical costs and ensure world-class treatment without stress.',
        benefits: ['Cashless hospitalization', 'No-claim bonus', 'OPD coverage', 'Pre/Post hospitalization']
    },
    {
        icon: Activity,
        title: 'Critical Illness',
        desc: 'Lumpsum payout on diagnosis of major illnesses like cancer or heart disease, helping you manage treatment costs and lifestyle changes.',
        benefits: ['Lumpsum payment', 'Loss of income protection', 'Covers 30+ illnesses', 'Survival benefit']
    },
    {
        icon: Home,
        title: 'Property Insurance',
        desc: 'Protect your most valuable asset—your home. Coverage against fire, natural calamities, burglary, and accidental damage.',
        benefits: ['Structure & contents', 'Liability cover', 'Rent loss protection', 'Low cost']
    }
];

const img = getImage('services/insurance');

export default function Insurance() {
    return (
        <>
            <Helmet>
                <title>Life & Health Insurance Solutions | FinFreedom33 LLP</title>
                <meta name="description" content="Secure your family's future with comprehensive life, health, and general insurance solutions. Professional advisory from FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Insurance & Protection"
                subtitle="Building a robust safety net to protect your family and your wealth from life's uncertainties"
                heroUrl={img.heroUrl}
                heroAlt="Insurance and protection"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Insurance' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center lg:text-left">
                            <p className="section-label">Why Insurance Matters</p>
                            <h2 className="text-navy mb-6">Wealth Creation is Meaningless Without Wealth Protection</h2>
                            <div className="divider mb-6 mx-auto lg:mx-0" />
                            <p className="text-gray-500 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Most investors focus solely on returns, ignoring the catastrophic impact that an illness or untimely demise can have on a family's financial future. Insurance is the foundation of any sound financial plan.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                At FinFreedom33, we don't just "sell" policies. We analyze your human life value, debt obligations, and future milestones to recommend the right amount of cover.
                            </p>
                            <div className="bg-blue-50/50 p-6 md:p-8 rounded-3xl border-l-4 border-primary text-left">
                                <p className="text-navy font-semibold italic text-sm md:text-base">
                                    "The first rule of wealth management: Protect what you have before you try to get what you want."
                                </p>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" alt="Family protection" className="rounded-3xl shadow-premium" />
                            <div className="absolute -bottom-6 -right-6 card p-6 shadow-card-hover hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy">100% Claim Support</h4>
                                        <p className="text-gray-400 text-xs text-nowrap">We guide you through every step</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {INSURANCE_TYPES.map((type, i) => (
                            <motion.div
                                key={type.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body hover:border-primary/20 transition-all group border-b-4 border-b-transparent hover:border-b-primary shadow-sm hover:shadow-xl"
                            >
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors shadow-inner">
                                        <type.icon size={32} className="text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h3 className="text-navy font-bold text-xl mb-3">{type.title}</h3>
                                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{type.desc}</p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                                            {type.benefits.map(b => (
                                                <li key={b} className="flex items-center gap-2.5 text-xs font-medium text-gray-500">
                                                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-navy mb-4">Our Commitment at FinFreedom33</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We partner with the most reliable insurance providers in India to ensure your claims are handled with empathy and speed.</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <span className="text-xl font-display font-bold text-gray-400 uppercase tracking-widest">HDFC Life</span>
                        <span className="text-xl font-display font-bold text-gray-400 uppercase tracking-widest">ICICI Pru</span>
                        <span className="text-xl font-display font-bold text-gray-400 uppercase tracking-widest">Max Life</span>
                        <span className="text-xl font-display font-bold text-gray-400 uppercase tracking-widest">Star Health</span>
                        <span className="text-xl font-display font-bold text-gray-400 uppercase tracking-widest">Niva Bupa</span>
                    </div>
                </div>
            </section>

            <section className="bg-navy py-16">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-3xl mb-4">Unsure about your coverage?</h2>
                    <p className="text-blue-200 mb-8 max-w-lg mx-auto">Let our advisors audit your current policies and suggest optimizations that can save you money while increasing protection.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="btn-secondary btn-lg">Book Policy Audit</Link>
                        <Link to="/risk-profile" className="btn-outline-white btn-lg">Know Your Risk Profile</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
