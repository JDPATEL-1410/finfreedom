import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { calculateGoal, formatCurrency, formatCurrencyFull } from '../../utils/calculators';
import { generatePDFReport } from '../../utils/pdfGenerator';

const GOAL_PRESETS = [
    { label: "Child's Education", amount: 2500000, years: 15 },
    { label: 'Dream Home', amount: 5000000, years: 7 },
    { label: 'World Tour', amount: 1000000, years: 3 },
    { label: 'Car Purchase', amount: 1500000, years: 4 },
    { label: 'Wedding Fund', amount: 2000000, years: 5 },
];

const schema = z.object({
    goalName: z.string().min(1, 'Enter a goal name'),
    targetAmount: z.number().min(1000).max(1000000000),
    years: z.number().min(1).max(40),
    expectedReturn: z.number().min(1).max(30),
});
type F = z.infer<typeof schema>;
const img = getImage('calculators/goal');

export default function GoalCalculator() {
    const [isPDF, setIsPDF] = useState(false);
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<F>({
        resolver: zodResolver(schema),
        defaultValues: { goalName: "Child's Education", targetAmount: 2500000, years: 15, expectedReturn: 12 },
    });
    const v = watch();
    const liveResult = calculateGoal(v.targetAmount || 0, v.years || 1, v.expectedReturn || 1);

    const onSubmit = () => {
        // Form handled by live updates
    };

    const handlePDF = async () => {
        setIsPDF(true);
        await generatePDFReport({
            title: `Goal Planning Report: ${v.goalName}`,
            subtitle: 'Investment Required to Achieve Your Goal',
            sections: [
                { title: 'Goal Details', rows: [['Goal Name', v.goalName], ['Target Amount', formatCurrencyFull(v.targetAmount)], ['Time Horizon', `${v.years} Years`], ['Expected Return', `${v.expectedReturn}%`]] },
                { title: 'Investment Required', rows: [['Monthly SIP Required', formatCurrencyFull(liveResult.monthlySIP)], ['Lump Sum Required Today', formatCurrencyFull(liveResult.lumpsumNeeded)], ['Total SIP Investment', formatCurrencyFull(liveResult.monthlySIP * v.years * 12)], ['SIP Wealth Created', formatCurrencyFull(v.targetAmount - liveResult.monthlySIP * v.years * 12)]] },
            ],
            chartElementId: 'goal-chart',
        });
        setIsPDF(false);
    };

    return (
        <>
            <Helmet>
                <title>Goal Planning Calculator | FinFreedom33</title>
                <meta name="description" content="Calculate how much to invest monthly to achieve any financial goal—education, home, travel, and more." />
            </Helmet>
            <PageHeader title="Goal Planning Calculator" subtitle="Discover exactly how much you need to invest to achieve any financial goal on time" heroUrl={img.heroUrl} heroAlt={img.heroAlt} breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'Goal Planning' }]} />
            <section className="section bg-surface">
                <div className="container-custom">
                    {/* Presets */}
                    <div className="mb-8">
                        <p className="text-sm font-bold text-navy mb-4 uppercase tracking-wider text-[10px]">Quick Goal Presets:</p>
                        <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
                            {GOAL_PRESETS.map(p => (
                                <button
                                    key={p.label}
                                    type="button"
                                    onClick={() => { setValue('goalName', p.label); setValue('targetAmount', p.amount); setValue('years', p.years); }}
                                    className="px-5 py-2.5 rounded-2xl text-sm border border-gray-200 bg-white text-navy hover:border-primary hover:text-primary transition-all whitespace-nowrap shadow-sm hover:shadow-md"
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">Goal Details</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div>
                                        <label className="form-label">Goal Name</label>
                                        <input type="text" className="form-input" {...register('goalName')} placeholder="e.g. Child's Education" />
                                        {errors.goalName && <p className="form-error">{errors.goalName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="form-label">Target Amount (₹)</label>
                                        <input type="number" className="form-input" {...register('targetAmount', { valueAsNumber: true })} />
                                        <input type="range" min={10000} max={50000000} step={10000} value={v.targetAmount || 0} onChange={e => setValue('targetAmount', +e.target.value)} className="w-full mt-1 accent-primary" />
                                        {errors.targetAmount && <p className="form-error">{errors.targetAmount.message}</p>}
                                        <p className="text-primary text-sm font-semibold mt-1">{formatCurrency(v.targetAmount || 0)}</p>
                                    </div>
                                    <div>
                                        <label className="form-label">Time Horizon (Years)</label>
                                        <input type="number" className="form-input" {...register('years', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={30} step={1} value={v.years || 0} onChange={e => setValue('years', +e.target.value)} className="w-full mt-1 accent-primary" />
                                    </div>
                                    <div>
                                        <label className="form-label">Expected Annual Return (%)</label>
                                        <input type="number" step="0.5" className="form-input" {...register('expectedReturn', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={25} step={0.5} value={v.expectedReturn || 0} onChange={e => setValue('expectedReturn', +e.target.value)} className="w-full mt-1 accent-primary" />
                                    </div>
                                    <div className="flex gap-3 pt-1">
                                        <button type="submit" className="btn-primary flex-1">Plan My Goal</button>
                                        <button type="button" onClick={() => reset()} className="btn-outline px-4"><RefreshCw size={16} /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-gradient-primary rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-primary/20">
                                <p className="text-blue-200 text-xs md:text-sm mb-1 uppercase tracking-widest font-bold">Target: {v.goalName}</p>
                                <p className="text-3xl md:text-5xl font-display font-bold mb-3">{formatCurrency(v.targetAmount || 0)}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-blue-100 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <RefreshCw size={14} className="text-secondary" />
                                        In {v.years} years
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Download size={14} className="text-secondary" />
                                        At {v.expectedReturn}% returns
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    ['Monthly SIP Required', formatCurrency(liveResult.monthlySIP), 'text-primary', 'Start this SIP today'],
                                    ['Lumpsum Required', formatCurrency(liveResult.lumpsumNeeded), 'text-navy', 'One-time investment needed'],
                                ].map(([l, val, c, s]) => (
                                    <div key={l} className="card card-body flex flex-col justify-center">
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">{l}</p>
                                        <p className={`text-2xl md:text-3xl font-display font-bold ${c} mb-1.5`}>{val}</p>
                                        <p className="text-gray-500 text-xs italic">{s}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="card card-body" id="goal-chart">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-navy font-semibold">Investment Comparison</h3>
                                    <button onClick={handlePDF} disabled={isPDF} className="btn-primary btn-sm text-xs flex items-center gap-1.5"><Download size={13} />{isPDF ? 'Generating...' : 'PDF Report'}</button>
                                </div>
                                <ResponsiveContainer width="100%" height={240}>
                                    <BarChart data={[
                                        { name: 'Monthly SIP\n(× months)', value: Math.round(liveResult.monthlySIP * v.years * 12), label: 'SIP Route' },
                                        { name: 'Lumpsum\n(Today)', value: Math.round(liveResult.lumpsumNeeded), label: 'Lumpsum Route' },
                                        { name: 'Target\nAmount', value: v.targetAmount || 0, label: 'Target' },
                                    ]} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF4" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} tickFormatter={v => formatCurrency(v)} />
                                        <Tooltip formatter={(v: number | undefined) => [formatCurrency(v || 0), 'Value']} />
                                        <Bar dataKey="value" fill="#335C8E" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800">
                                <p className="font-semibold mb-1">💡 Pro Tip</p>
                                <p>SIP is more flexible than lumpsum—you can start with a small amount and increase it annually (Step-Up SIP). A 10% annual step-up can help you reach your goal faster.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
