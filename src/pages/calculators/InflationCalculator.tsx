import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { calculateInflation, formatCurrency, formatCurrencyFull } from '../../utils/calculators';
import { generatePDFReport } from '../../utils/pdfGenerator';

const schema = z.object({
    currentValue: z.number().min(1).max(100000000),
    inflationRate: z.number().min(0.5).max(20),
    years: z.number().min(1).max(40),
});
type F = z.infer<typeof schema>;
const img = getImage('calculators/inflation');

export default function InflationCalculator() {
    const [isPDF, setIsPDF] = useState(false);
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<F>({
        resolver: zodResolver(schema),
        defaultValues: { currentValue: 100000, inflationRate: 6, years: 10 },
    });
    const v = watch();
    const result = calculateInflation(v.currentValue || 0, v.inflationRate || 0, v.years || 1);

    // Generate yearly data for chart
    const chartData = Array.from({ length: v.years || 10 }, (_, i) => {
        const yr = i + 1;
        const inflated = (v.currentValue || 0) * Math.pow(1 + (v.inflationRate || 0) / 100, yr);
        const ppower = (v.currentValue || 0) / Math.pow(1 + (v.inflationRate || 0) / 100, yr);
        return { year: yr, 'Cost of Living': Math.round(inflated), 'Purchasing Power': Math.round(ppower) };
    });

    const handlePDF = async () => {
        setIsPDF(true);
        await generatePDFReport({
            title: 'Inflation Impact Calculator Report',
            subtitle: 'Understanding Purchasing Power Erosion',
            sections: [
                { title: 'Input Parameters', rows: [['Current Value / Amount', formatCurrencyFull(v.currentValue)], ['Inflation Rate', `${v.inflationRate}%`], ['Time Period', `${v.years} Years`]] },
                { title: 'Impact Analysis', rows: [['Future Cost (After Inflation)', formatCurrencyFull(result.futureValue)], ['Real Purchasing Power (Today\'s ₹)', formatCurrencyFull(result.effectivePurchasingPower)], ['Purchasing Power Lost', formatCurrencyFull(result.lossOfPTPower)], ['Inflation Factor', `${(result.futureValue / v.currentValue).toFixed(2)}x`]] },
            ],
            chartElementId: 'inflation-chart',
        });
        setIsPDF(false);
    };

    return (
        <>
            <Helmet>
                <title>Inflation Calculator | FinFreedom33 – Understand Inflation Impact</title>
                <meta name="description" content="Understand how inflation erodes your purchasing power over time and learn how to beat inflation with smart investments." />
            </Helmet>
            <PageHeader title="Inflation Impact Calculator" subtitle="Understand how inflation silently erodes your purchasing power—and how to beat it" heroUrl={img.heroUrl} heroAlt={img.heroAlt} breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'Inflation Impact' }]} />
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">Inflation Parameters</h2>
                                <form onSubmit={handleSubmit(() => { })} className="space-y-6">
                                    <div>
                                        <label className="form-label">Current Value / Monthly Expense (₹)</label>
                                        <input type="number" className="form-input" {...register('currentValue', { valueAsNumber: true })} />
                                        <input type="range" min={1000} max={10000000} step={1000} value={v.currentValue || 0} onChange={e => setValue('currentValue', +e.target.value)} className="w-full mt-2 accent-primary" />
                                        {errors.currentValue && <p className="form-error">{errors.currentValue.message}</p>}
                                        <p className="text-primary text-sm font-semibold mt-1">{formatCurrency(v.currentValue || 0)}</p>
                                    </div>
                                    <div>
                                        <label className="form-label">Expected Inflation Rate (%)</label>
                                        <input type="number" step="0.5" className="form-input" {...register('inflationRate', { valueAsNumber: true })} />
                                        <input type="range" min={0.5} max={15} step={0.5} value={v.inflationRate || 0} onChange={e => setValue('inflationRate', +e.target.value)} className="w-full mt-2 accent-primary" />
                                        <p className="text-gray-400 text-xs mt-1">India's historical avg: 5-7%</p>
                                    </div>
                                    <div>
                                        <label className="form-label">Time Period (Years)</label>
                                        <input type="number" className="form-input" {...register('years', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={40} step={1} value={v.years || 0} onChange={e => setValue('years', +e.target.value)} className="w-full mt-2 accent-primary" />
                                    </div>
                                    <button type="button" onClick={() => reset()} className="btn-outline w-full flex items-center justify-center gap-2"><RefreshCw size={15} />Reset</button>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-gradient-primary rounded-2xl p-6 text-white">
                                <p className="text-blue-200 text-sm mb-1">After {v.years} years at {v.inflationRate}% inflation</p>
                                <p className="text-4xl font-display font-bold mb-2">{formatCurrency(result.futureValue)}</p>
                                <p className="text-blue-200 text-sm">Will be the equivalent cost of what costs {formatCurrency(v.currentValue || 0)} today</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    ['Future Cost', formatCurrency(result.futureValue), 'text-secondary'],
                                    ['Real Purchasing\nPower', formatCurrency(result.effectivePurchasingPower), 'text-primary'],
                                    ['Inflation Factor', `${(result.futureValue / (v.currentValue || 1)).toFixed(2)}x`, 'text-navy'],
                                ].map(([l, val, c]) => (
                                    <div key={l} className="card card-body text-center py-4">
                                        <p className={`text-xl font-display font-bold ${c} mb-1`}>{val}</p>
                                        <p className="text-gray-400 text-xs whitespace-pre-line">{l}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="card card-body" id="inflation-chart">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-navy font-semibold">Inflation Impact Over Time</h3>
                                    <button onClick={handlePDF} disabled={isPDF} className="btn-primary btn-sm text-xs flex items-center gap-1.5"><Download size={13} />{isPDF ? 'Generating...' : 'PDF Report'}</button>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF4" />
                                        <XAxis dataKey="year" tick={{ fontSize: 11 }} tickFormatter={y => `Yr ${y}`} />
                                        <YAxis tick={{ fontSize: 11 }} tickFormatter={v => formatCurrency(v)} />
                                        <Tooltip formatter={(v: number) => formatCurrency(v)} />
                                        <Legend />
                                        <Line type="monotone" dataKey="Cost of Living" stroke="#EB3E4A" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="Purchasing Power" stroke="#335C8E" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900">
                                <p className="font-semibold mb-2">⚡ How to Beat Inflation</p>
                                <p>Equity mutual funds historically deliver 12-15% annual returns—significantly above India's 5-7% inflation. Investing in equity SIPs is the most reliable way to protect and grow your real purchasing power over time.</p>
                                <a href="/calculators/sip" className="text-primary font-semibold mt-2 inline-block">Calculate SIP Returns →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
