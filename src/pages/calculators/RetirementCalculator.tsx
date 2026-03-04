import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { calculateRetirement, formatCurrency, formatCurrencyFull } from '../../utils/calculators';
import { generatePDFReport } from '../../utils/pdfGenerator';

const schema = z.object({
    currentAge: z.number().min(18).max(70),
    retirementAge: z.number().min(40).max(80),
    lifeExpectancy: z.number().min(60).max(100),
    monthlyExpenses: z.number().min(1000).max(10000000),
    inflationRate: z.number().min(1).max(20),
    expectedReturn: z.number().min(1).max(30),
    postRetirementReturn: z.number().min(1).max(20),
}).refine(d => d.retirementAge > d.currentAge, { message: 'Retirement age must be greater than current age', path: ['retirementAge'] })
    .refine(d => d.lifeExpectancy > d.retirementAge, { message: 'Life expectancy must exceed retirement age', path: ['lifeExpectancy'] });

type F = z.infer<typeof schema>;
const img = getImage('calculators/retirement');

export default function RetirementCalculator() {
    const [result, setResult] = useState<ReturnType<typeof calculateRetirement> | null>(null);
    const [isPDF, setIsPDF] = useState(false);
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<F>({
        resolver: zodResolver(schema),
        defaultValues: { currentAge: 30, retirementAge: 60, lifeExpectancy: 85, monthlyExpenses: 50000, inflationRate: 6, expectedReturn: 12, postRetirementReturn: 8 },
    });
    const v = watch();

    const onSubmit = (data: F) => {
        setResult(calculateRetirement(data.currentAge, data.retirementAge, data.monthlyExpenses, data.inflationRate, data.expectedReturn, data.postRetirementReturn, data.lifeExpectancy));
    };

    const handlePDF = async () => {
        if (!result) return;
        setIsPDF(true);
        await generatePDFReport({
            title: 'Retirement Planning Report',
            subtitle: 'Corpus Estimation & Monthly SIP Required',
            sections: [
                { title: 'Your Profile', rows: [['Current Age', `${v.currentAge} Years`], ['Target Retirement Age', `${v.retirementAge} Years`], ['Life Expectancy', `${v.lifeExpectancy} Years`], ['Years to Retirement', `${result.yearsToRetirement} Years`]] },
                { title: 'Financial Parameters', rows: [['Current Monthly Expenses', formatCurrencyFull(v.monthlyExpenses)], ['Inflation Rate', `${v.inflationRate}%`], ['Expected Pre-Retirement Return', `${v.expectedReturn}%`], ['Post-Retirement Return', `${v.postRetirementReturn}%`]] },
                { title: 'Retirement Planning Results', rows: [['Monthly Expenses at Retirement', formatCurrencyFull(result.monthlyExpensesAtRetirement)], ['Required Retirement Corpus', formatCurrencyFull(result.retirementCorpus)], ['Monthly SIP Required', formatCurrencyFull(result.monthlySIPNeeded)]] },
            ],
            chartElementId: 'ret-chart',
        });
        setIsPDF(false);
    };

    // chartData is used in the BarChart below directly via array definition

    return (
        <>
            <Helmet>
                <title>Retirement Planner | FinFreedom33 – Calculate Your Retirement Corpus</title>
                <meta name="description" content="Plan your retirement with FinFreedom33's retirement calculator. Calculate the exact corpus needed and monthly SIP required to retire comfortably." />
            </Helmet>
            <PageHeader title="Retirement Planner" subtitle="Calculate exactly how much you need to retire comfortably and what it costs to get there" heroUrl={img.heroUrl} heroAlt={img.heroAlt} breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'Retirement Planner' }]} />
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">Retirement Details</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    {[
                                        { label: 'Current Age (Years)', name: 'currentAge' as const, min: 18, max: 70, val: v.currentAge },
                                        { label: 'Retirement Age (Years)', name: 'retirementAge' as const, min: 40, max: 80, val: v.retirementAge },
                                        { label: 'Life Expectancy (Years)', name: 'lifeExpectancy' as const, min: 60, max: 100, val: v.lifeExpectancy },
                                        { label: 'Current Monthly Expenses (₹)', name: 'monthlyExpenses' as const, min: 1000, max: 1000000, step: 1000, val: v.monthlyExpenses, format: true },
                                        { label: 'Inflation Rate (%)', name: 'inflationRate' as const, min: 1, max: 15, val: v.inflationRate },
                                        { label: 'Expected Return Pre-Retirement (%)', name: 'expectedReturn' as const, min: 1, max: 25, val: v.expectedReturn },
                                        { label: 'Post-Retirement Return (%)', name: 'postRetirementReturn' as const, min: 1, max: 15, val: v.postRetirementReturn },
                                    ].map(({ label, name, min, max, step, val, format }) => (
                                        <div key={name}>
                                            <label className="form-label">{label}</label>
                                            <input type="number" className="form-input" {...register(name, { valueAsNumber: true })} />
                                            <input type="range" min={min} max={max} step={step || 1} value={val || 0} onChange={e => setValue(name, +e.target.value)} className="w-full mt-1 accent-primary" />
                                            {errors[name] && <p className="form-error">{errors[name]?.message}</p>}
                                            {format && <p className="text-primary text-xs mt-1 font-semibold">{formatCurrency(val || 0)}</p>}
                                        </div>
                                    ))}
                                    <div className="flex gap-3 pt-2">
                                        <button type="submit" className="btn-primary flex-1">Calculate Plan</button>
                                        <button type="button" onClick={() => { reset(); setResult(null); }} className="btn-outline px-4"><RefreshCw size={16} /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            {result ? (
                                <>
                                    <div className="bg-gradient-primary rounded-2xl p-6 text-white">
                                        <p className="text-blue-200 text-sm mb-1">Target Retirement Corpus</p>
                                        <p className="text-4xl font-display font-bold mb-1">{formatCurrency(result.retirementCorpus)}</p>
                                        <p className="text-blue-200 text-sm">Based on ₹{formatCurrency(result.monthlyExpensesAtRetirement)}/month at retirement (inflation-adjusted)</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            ['Monthly SIP Required', formatCurrency(result.monthlySIPNeeded), 'text-primary', 'Start this SIP today to reach your goal'],
                                            ['Years to Retire', `${result.yearsToRetirement} Yrs`, 'text-navy', 'Time available for corpus building'],
                                            ['Retirement Duration', `${result.retirementYears} Yrs`, 'text-secondary', 'Years your corpus must sustain you'],
                                            ['Monthly at Retirement', formatCurrency(result.monthlyExpensesAtRetirement), 'text-green-600', 'Inflation-adjusted monthly expenses'],
                                        ].map(([l, v, c, s]) => (
                                            <div key={l} className="card card-body">
                                                <p className={`text-2xl font-display font-bold ${c} mb-1`}>{v}</p>
                                                <p className="text-navy font-medium text-sm">{l}</p>
                                                <p className="text-gray-400 text-xs mt-1">{s}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="card card-body" id="ret-chart">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-navy font-semibold">Retirement Overview</h3>
                                            <button onClick={handlePDF} disabled={isPDF} className="btn-primary btn-sm text-xs flex items-center gap-1.5"><Download size={13} />{isPDF ? 'Generating...' : 'PDF Report'}</button>
                                        </div>
                                        <ResponsiveContainer width="100%" height={260}>
                                            <BarChart data={[
                                                { name: 'Monthly\nExpenses Now', value: v.monthlyExpenses },
                                                { name: 'Monthly at\nRetirement', value: Math.round(result.monthlyExpensesAtRetirement) },
                                                { name: 'Monthly\nSIP Needed', value: Math.round(result.monthlySIPNeeded) },
                                            ]} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF4" />
                                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => formatCurrency(v)} />
                                                <Tooltip formatter={(v: any) => formatCurrency(v)} />
                                                <Bar dataKey="value" fill="#335C8E" radius={[6, 6, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </>
                            ) : (
                                <div className="card card-body text-center py-16 text-gray-400">
                                    <p className="text-5xl mb-4">🏖️</p>
                                    <p className="font-medium text-navy mb-2">Your retirement plan will appear here</p>
                                    <p className="text-sm">Fill in the details and click "Calculate Plan"</p>
                                </div>
                            )}
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-800">
                                <p className="font-semibold mb-2">💡 Key Insight</p>
                                <p>The power of compounding works exponentially over long periods. Starting your retirement SIP 10 years earlier can reduce your required monthly contribution by 60-70%. Time is your greatest asset—start today!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
