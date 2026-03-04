import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calculator,
    TrendingUp,
    Briefcase,
    Calendar,
    Target,
    ArrowRight,
    TrendingDown,
    PieChart
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';

const CALCULATORS = [
    {
        title: 'SIP Calculator',
        description: 'Calculate the future value of your monthly systematic investments.',
        path: '/calculators/sip',
        icon: Calendar,
        color: 'text-blue-600 bg-blue-50',
    },
    {
        title: 'Lumpsum Calculator',
        description: 'Estimate returns on your one-time mutual fund investments.',
        path: '/calculators/lumpsum',
        icon: TrendingUp,
        color: 'text-green-600 bg-green-50',
    },
    {
        title: 'SWP Calculator',
        description: 'Plan your regular withdrawals and check corpus sustainability.',
        path: '/calculators/swp',
        icon: Briefcase,
        color: 'text-purple-600 bg-purple-50',
    },
    {
        title: 'Retirement Planner',
        description: 'Find out exactly how much you need to save for a comfortable retirement.',
        path: '/calculators/retirement',
        icon: Target,
        color: 'text-orange-600 bg-orange-50',
    },
    {
        title: 'Goal Planner',
        description: 'Plan specifically for education, home, wedding, or any other milestone.',
        path: '/calculators/goal',
        icon: Calculator,
        color: 'text-indigo-600 bg-indigo-50',
    },
    {
        title: 'Inflation Calculator',
        description: 'Understand how inflation affects your purchasing power over time.',
        path: '/calculators/inflation',
        icon: TrendingDown,
        color: 'text-red-600 bg-red-50',
    },
    {
        title: 'Asset Allocation',
        description: 'Visualize and optimize your portfolio mix across different asset classes.',
        path: '/calculators/allocation',
        icon: PieChart,
        color: 'text-teal-600 bg-teal-50',
    },
];

const img = getImage('calculators');

export default function Calculators() {
    return (
        <>
            <Helmet>
                <title>Financial Calculators | FinFreedom33 LLP</title>
                <meta name="description" content="Use our comprehensive suite of financial calculators to plan your SIP, retirement, goals, and more. Free investment tools from FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Financial Calculators"
                subtitle="Empower your financial decisions with our precise planning tools"
                heroUrl={img.heroUrl}
                heroAlt={img.heroAlt}
                breadcrumbs={[{ label: 'Calculators' }]}
            />

            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="section-label">Investment Tools</p>
                        <h2 className="text-navy mb-4">Plan Your Path to Financial Freedom</h2>
                        <div className="divider mx-auto mb-4" />
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Our suite of calculators is designed to help you visualize your financial future. Whether you're starting a SIP, planning for retirement, or saving for a specific goal, these tools provide the clarity you need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CALCULATORS.map((calc, i) => (
                            <motion.div
                                key={calc.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={calc.path} className="card-hover group h-full block">
                                    <div className="card-body h-full flex flex-col">
                                        <div className={`w-12 h-12 rounded-xl ${calc.color} flex items-center justify-center mb-6`}>
                                            <calc.icon size={24} />
                                        </div>
                                        <h3 className="text-navy font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                                            {calc.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-6 flex-grow">
                                            {calc.description}
                                        </p>
                                        <div className="flex items-center text-primary font-medium text-sm mt-auto">
                                            Open Calculator <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Use Our Calculators */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-navy mb-6">Why Use Our Financial Calculators?</h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: 'Precision & Accuracy',
                                        desc: 'Developed using industry-standard financial formulas to ensure you get accurate estimates for your investments.'
                                    },
                                    {
                                        title: 'Visual Clarity',
                                        desc: 'Interactive charts and graphs help you visualize the compounding effect and wealth creation over time.'
                                    },
                                    {
                                        title: 'Empowered Decisions',
                                        desc: 'Remove the guesswork from your financial planning. Know exactly how much you need to reach your goals.'
                                    },
                                    {
                                        title: 'PDF Reports',
                                        desc: 'Generate professional reports of your calculations to share with your family or financial advisor.'
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-navy font-semibold text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-3xl -rotate-2" />
                            <img
                                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
                                alt="Financial planning tools"
                                className="relative rounded-2xl shadow-premium aspect-square object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-navy py-16">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-3xl mb-6">Need a Professional Portfolio Review?</h2>
                    <p className="text-blue-200 mb-10 max-w-2xl mx-auto">
                        Calculators are great for general planning, but real wealth management requires a human touch. Let our experts design a tailored strategy for you.
                    </p>
                    <Link to="/contact" className="btn-secondary btn-lg inline-flex items-center gap-2">
                        Get Expert Advice <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </>
    );
}
