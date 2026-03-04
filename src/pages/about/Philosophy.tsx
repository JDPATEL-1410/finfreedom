import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Shield, Users, Zap, Award, BarChartHorizontal } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';

const PRINCIPLES = [
    {
        icon: TrendingUp,
        title: 'The Power of Compounding',
        desc: 'Albert Einstein called it the 8th wonder of the world. We believe that time, not timing, is the single most important factor in wealth creation. Our strategies are designed to keep you invested through market cycles to harness this exponential power.'
    },
    {
        icon: Target,
        title: 'Goal-Based Framework',
        desc: 'Investing without a goal is like sailing without a destination. Every rupee you invest through us is mapped to a tangible life milestone—be it your child\'s graduation or your dream retirement—ensuring you stay focused when markets get noisy.'
    },
    {
        icon: Shield,
        title: 'Risk-Adjusted Returns',
        desc: 'High returns are meaningless if you can\'t sleep at night. We prioritize risk management and asset allocation over chasing the latest fad. We profile your psychological and financial risk capacity before making a single recommendation.'
    },
    {
        icon: Users,
        title: 'Unbiased Intermediation',
        desc: 'We are agnostic about fund houses or insurance companies. Our allegiance is to the client. We evaluate products based on objective data—process, performance, and price—ensuring you get what is best for YOU.'
    }
];

export default function Philosophy() {
    return (
        <>
            <Helmet>
                <title>Investment Philosophy | FinFreedom33 LLP</title>
                <meta name="description" content="Discover the core principles of FinFreedom33 - Compounding, Goal-based planning, Risk management, and Unbiased advice." />
            </Helmet>

            <PageHeader
                title="Our Investment Philosophy"
                subtitle="Principles that have guided hundreds of families to achieve financial independence over 25+ years"
                heroUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
                heroAlt="Philosophy and strategy"
                breadcrumbs={[{ label: 'About', path: '/about' }, { label: 'Philosophy' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="section-label">Core Beliefs</p>
                        <h2 className="text-navy mb-6">Invest with Clarity, Purpose, and Discipline</h2>
                        <div className="divider mx-auto mb-6" />
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We don't believe in "get rich quick" schemes or market timing. We believe in the boring, beautiful consistency of disciplined investing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {PRINCIPLES.map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body hover:border-primary/30 transition-all group p-8"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                    <p.icon size={32} />
                                </div>
                                <h3 className="text-navy font-bold text-xl mb-4">{p.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-navy rounded-[40px] overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 md:p-16">
                                <h3 className="text-white font-display font-bold text-3xl mb-6">The FinFreedom Code</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Simplicity', desc: 'Financial planning should be easy to understand and even easier to execute.' },
                                        { title: 'Discipline', desc: 'The ability to stay invested when everyone else is panicking.' },
                                        { title: 'Transparency', desc: 'No hidden agendas, no hidden commissions, just honest advice.' }
                                    ].map(item => (
                                        <div key={item.title} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                                                <Zap size={20} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold mb-1">{item.title}</p>
                                                <p className="text-blue-200 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative hidden lg:block">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Team collaborating" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-navy to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-surface">
                <div className="container-custom text-center">
                    <p className="section-label">A Professional Standard</p>
                    <h2 className="text-navy mb-8">Backed by Industry-Leading Certifications</h2>
                    <div className="flex flex-wrap justify-center gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white shadow-premium flex items-center justify-center mb-3">
                                <Award size={40} className="text-primary" />
                            </div>
                            <p className="font-bold text-navy">CFP Registered</p>
                            <p className="text-xs text-gray-400">FPSB India Since 2009</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white shadow-premium flex items-center justify-center mb-3">
                                <BarChartHorizontal size={40} className="text-primary" />
                            </div>
                            <p className="font-bold text-navy">AMFI Registered</p>
                            <p className="text-xs text-gray-400">Mutual Fund Distributor</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-primary py-16">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-3xl mb-4">Invest with a Strategy</h2>
                    <p className="text-blue-200 mb-8 max-w-lg mx-auto">Experience our goal-based philosophy in action. Book your discovery session now.</p>
                    <Link to="/contact" className="btn-secondary btn-lg">Book Discovery Call</Link>
                </div>
            </section>
        </>
    );
}
