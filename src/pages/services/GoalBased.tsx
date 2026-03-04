import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, ArrowRight, GraduationCap, Home, Heart, Plane, Star, Zap } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const PRESETS = [
    { icon: GraduationCap, name: 'Child Education', desc: 'Factor in the rising costs of higher education in India and abroad.' },
    { icon: Home, name: 'Dream Home', desc: 'Accumulate the down payment for your forever home without compromising life.' },
    { icon: Plane, name: 'International Travel', desc: 'Create a dedicated fund for those annual family vacations across the globe.' },
    { icon: Heart, name: 'Child\'s Wedding', desc: 'Start early to ensure you can celebrate your child\'s big day without debt.' }
];

const img = getImage('services/goal-based');

export default function GoalBased() {
    return (
        <>
            <Helmet>
                <title>Goal-Based Investment Planning | FinFreedom33 LLP</title>
                <meta name="description" content="Map every rupee to a life goal. Professional goal planning for child education, home purchase, and luxury travel from FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Goal-Based Investing"
                subtitle="Moving from 'Investing' to 'Investing for Something'—creating purpose-driven portfolios"
                heroUrl={img.heroUrl}
                heroAlt="Target financial goals"
                breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Goal-Based' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="section-label">Purpose-Driven Wealth</p>
                            <h2 className="text-navy mb-6">Every Goal Deserves its Own Strategy</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Most investors fail because they treat their entire wealth as one big bucket. In reality, you have different goals with different horizons and different risk profiles. Your emergency fund cannot be invested like your child's 15-year education fund.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                At FinFreedom33, we help you segregate your wealth into goal-specific buckets. We provide clarity on "how much is enough" for each goal, accounting for inflation and taxation. This approach prevents you from over-investing in one area while neglecting another.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-surface rounded-2xl">
                                    <Zap className="text-secondary" size={20} />
                                    <span className="text-sm font-semibold text-navy">Priority Focused</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-surface rounded-2xl">
                                    <Star className="text-secondary" size={20} />
                                    <span className="text-sm font-semibold text-navy">Milestone Tracking</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <img src="https://images.unsplash.com/photo-1518173946687-a4c8a9ba336f?w=800&q=80" alt="Financial milestones" className="rounded-3xl shadow-premium h-[450px] object-cover w-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-12 border border-white/20">
                                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                    <Target size={40} />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRESETS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <p.icon size={24} />
                                </div>
                                <h3 className="text-navy font-bold text-lg mb-2">{p.name}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-navy text-white">
                <div className="container-custom text-center">
                    <h2 className="font-display font-bold text-3xl mb-4">Start Planning Your Next Milestone</h2>
                    <p className="text-blue-200 mb-10 max-w-xl mx-auto">Use our Goal Planner to see exactly how much you need to save to achieve your dream home, car, or education fee.</p>
                    <Link to="/calculators/goal" className="btn-secondary btn-lg">Open Goal Calculator <ArrowRight size={18} /></Link>
                </div>
            </section>
        </>
    );
}
