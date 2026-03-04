import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Download,
    Shield,
    Zap,
    Clock,
    Briefcase
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';
import { generatePDFReport } from '../utils/pdfGenerator';

interface Question {
    id: number;
    text: string;
    category: string;
    options: {
        text: string;
        score: number;
        description?: string;
    }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        category: 'Investment Horizon',
        text: 'What is your primary investment time horizon?',
        options: [
            { text: 'Less than 1 year', score: 1, description: 'Prioritizing liquidity' },
            { text: '1 to 3 years', score: 2, description: 'Short-term goals' },
            { text: '3 to 7 years', score: 5, description: 'Medium-term growth' },
            { text: 'Over 7 years', score: 8, description: 'Long-term wealth building' },
        ],
    },
    {
        id: 2,
        category: 'Financial Knowledge',
        text: 'How would you describe your understanding of financial markets and investments?',
        options: [
            { text: 'Minimal', score: 1, description: 'I am new to investing' },
            { text: 'Basic', score: 3, description: 'I understand savings and FDs' },
            { text: 'Good', score: 6, description: 'I understand Mutual Funds and Stocks' },
            { text: 'Expert', score: 9, description: 'I actively manage my portfolio' },
        ],
    },
    {
        id: 3,
        category: 'Risk Capacity',
        text: 'What percentage of your monthly income are you comfortable investing?',
        options: [
            { text: 'Less than 10%', score: 1 },
            { text: '10% to 25%', score: 4 },
            { text: '25% to 50%', score: 7 },
            { text: 'More than 50%', score: 10 },
        ],
    },
    {
        id: 4,
        category: 'Risk Tolerance',
        text: 'If your portfolio value fell by 20% in a month due to market volatility, what would you do?',
        options: [
            { text: 'Sell everything immediately', score: -5, description: 'Stop the losses' },
            { text: 'Sell some portion', score: 1, description: 'Reduce exposure' },
            { text: 'Do nothing / Wait it out', score: 6, description: 'Stick to the plan' },
            { text: 'Invest more', score: 10, description: 'Buy the dip' },
        ],
    },
    {
        id: 5,
        category: 'Objective',
        text: 'What is your primary investment objective?',
        options: [
            { text: 'Capital Preservation', score: 1, description: 'I cannot afford to lose my principal' },
            { text: 'Regular Income', score: 3, description: 'Need monthly cash flow' },
            { text: 'Balanced Growth', score: 7, description: 'Mix of stability and growth' },
            { text: 'Maximum Wealth', score: 12, description: 'High growth over decades' },
        ],
    },
];

const PROFILES = [
    {
        range: [0, 15],
        name: 'Conservative',
        description: 'You prioritize capital safety and stability over high returns. You are likely approaching a major goal or have a low risk tolerance.',
        allocation: [
            { name: 'Debt & Cash', value: 75, color: '#EB3E4A' },
            { name: 'Equity', value: 15, color: '#335C8E' },
            { name: 'Gold', value: 10, color: '#F59E0B' },
        ],
    },
    {
        range: [16, 28],
        name: 'Moderate',
        description: 'You seek a balance between stability and growth. You are comfortable with some market fluctuations in exchange for higher long-term returns.',
        allocation: [
            { name: 'Debt', value: 45, color: '#EB3E4A' },
            { name: 'Equity', value: 45, color: '#335C8E' },
            { name: 'Gold', value: 10, color: '#F59E0B' },
        ],
    },
    {
        range: [29, 40],
        name: 'Aggressive',
        description: 'You are focused on long-term wealth creation and can weather significant market volatility. You have a long time horizon.',
        allocation: [
            { name: 'Equity', value: 75, color: '#335C8E' },
            { name: 'Debt', value: 15, color: '#EB3E4A' },
            { name: 'Gold/Others', value: 10, color: '#F59E0B' },
        ],
    },
    {
        range: [41, 100],
        name: 'Very Aggressive',
        description: 'You seek maximum capital appreciation and are willing to take high risks. Your horizon is 10+ years.',
        allocation: [
            { name: 'Equity', value: 90, color: '#335C8E' },
            { name: 'Gold/Others', value: 10, color: '#F59E0B' },
        ],
    },
];

const img = getImage('services/financial-planning');

export default function RiskProfile() {
    const [_searchParams] = useState(null); // Placeholder for useSearchParams, assuming it's not used
    const [_result] = useState(null); // Placeholder for calculateSIP, assuming it's not used
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isPDFLoading, setIsPDFLoading] = useState(false);

    const handleSelect = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = score;
        setAnswers(newAnswers);

        if (currentStep < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        } else {
            setIsFinished(true);
        }
    };

    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    const profile = PROFILES.find(p => totalScore >= p.range[0] && totalScore <= p.range[1]) || PROFILES[0];

    const reset = () => {
        setCurrentStep(0);
        setAnswers([]);
        setIsFinished(false);
    };

    const handleDownloadPDF = async () => {
        setIsPDFLoading(true);
        await generatePDFReport({
            title: 'Risk Profiling Report',
            subtitle: `Investor Risk Assessment for FinFreedom33`,
            sections: [
                {
                    title: 'Assessment Summary',
                    rows: [
                        ['Total Risk Score', `${totalScore}/50`],
                        ['Risk Category', profile.name],
                    ],
                },
                {
                    title: 'Recommended Asset Allocation',
                    rows: profile.allocation.map(a => [a.name, `${a.value}%`]),
                },
            ],
            chartElementId: 'risk-chart',
            disclaimer: 'This risk profile is based on your responses and is for indicative purposes. Please consult with our advisors for a personalized investment strategy.'
        });
        setIsPDFLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>Risk Profiling | FinFreedom33 LLP</title>
                <meta name="description" content="Discover your investor personality. Take our 2-minute risk profiling questionnaire to get a recommended asset allocation." />
            </Helmet>

            <PageHeader
                title="Discover Your Risk Profile"
                subtitle="The first step in any successful investment journey is understanding your true risk appetite"
                heroUrl={img.heroUrl}
                heroAlt="Risk assessment"
                breadcrumbs={[{ label: 'Risk Profile' }]}
                centered={true}
            />

            <section className="section bg-surface">
                <div className="container-custom max-w-4xl">
                    {!isFinished ? (
                        <div className="card shadow-premium overflow-hidden">
                            {/* Progress Bar */}
                            <div className="h-2 bg-gray-100">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                                />
                            </div>

                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-primary font-bold text-sm tracking-widest uppercase">
                                                Step {currentStep + 1} of {QUESTIONS.length}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span className="text-gray-400 text-sm">{QUESTIONS[currentStep].category}</span>
                                        </div>

                                        <h2 className="text-navy font-display font-bold text-2xl md:text-3xl mb-10 leading-snug">
                                            {QUESTIONS[currentStep].text}
                                        </h2>

                                        <div className="grid grid-cols-1 gap-4">
                                            {QUESTIONS[currentStep].options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSelect(opt.score)}
                                                    className={`
                                                        flex items-center text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden
                                                        ${answers[currentStep] === opt.score
                                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                                                            : 'border-gray-100 hover:border-primary/20 hover:bg-gray-50'}
                                                    `}
                                                >
                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all shrink-0
                                                        ${answers[currentStep] === opt.score ? 'border-primary bg-primary' : 'border-gray-200 group-hover:border-primary/50'}
                                                    `}>
                                                        {answers[currentStep] === opt.score && <CheckCircle2 size={14} className="text-white" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-navy font-bold text-lg leading-tight mb-0.5">{opt.text}</p>
                                                        {opt.description && (
                                                            <p className="text-gray-400 text-sm">{opt.description}</p>
                                                        )}
                                                    </div>
                                                    <ChevronRight size={20} className={`text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1 ${answers[currentStep] === opt.score ? 'text-primary opacity-100' : 'opacity-0 sm:opacity-100'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                                    <button
                                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                        disabled={currentStep === 0}
                                        className="flex items-center gap-2 text-gray-400 hover:text-navy disabled:opacity-0 transition-all font-medium"
                                    >
                                        <ChevronLeft size={20} /> Previous
                                    </button>
                                    <p className="text-gray-300 text-sm italic">Takes less than 2 minutes</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="card p-8 md:p-12 shadow-premium text-center">
                                <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6">
                                    <Shield size={40} />
                                </div>
                                <h2 className="text-navy font-display font-bold text-3xl mb-4">You are an "{profile.name}" Investor</h2>
                                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
                                    {profile.description}
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
                                    <div id="risk-chart" className="aspect-square bg-white rounded-3xl p-4">
                                        <h4 className="text-navy font-semibold text-center mb-4">Recommended Allocation</h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={profile.allocation}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={100}
                                                    innerRadius={60}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {profile.allocation.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-navy font-semibold text-xl">Next Steps</h4>
                                        <div className="space-y-4">
                                            {[
                                                { icon: Zap, text: 'Schedule a free 1-on-1 portfolio review' },
                                                { icon: Clock, text: 'Discuss your goals and timeline with Nitin' },
                                                { icon: Briefcase, text: 'Receive a personalized investment plan' },
                                            ].map((step, idx) => (
                                                <div key={idx} className="flex gap-4 items-start">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                        <step.icon size={20} className="text-primary" />
                                                    </div>
                                                    <p className="text-gray-600 text-sm pt-2">{step.text}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-6">
                                            <button
                                                onClick={handleDownloadPDF}
                                                disabled={isPDFLoading}
                                                className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
                                            >
                                                <Download size={20} />
                                                {isPDFLoading ? 'Generating...' : 'Download Report'}
                                            </button>
                                            <button
                                                onClick={reset}
                                                className="btn-outline flex-1 py-4 flex items-center justify-center gap-2"
                                            >
                                                <RotateCcw size={20} />
                                                Retake Quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-navy rounded-3xl p-8 md:p-12 text-center">
                                <h3 className="text-white font-display font-bold text-2xl mb-4">Ready to implement this strategy?</h3>
                                <p className="text-blue-200 mb-8 max-w-xl mx-auto">Our advisors will help you select the best specific funds and products to match your "{profile.name}" risk profile.</p>
                                <a href="/contact" className="btn-secondary btn-lg">Book Free Consultation</a>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
}
