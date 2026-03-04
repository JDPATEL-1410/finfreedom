import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { calculateSWP, formatCurrency, formatCurrencyFull } from '../../utils/calculators';
import { generatePDFReport } from '../../utils/pdfGenerator';

const schema = z.object({
    corpus: z.number().min(100000, 'Minimum corpus ₹1 Lakh').max(1000000000),
    monthlyWithdrawal: z.number().min(1000, 'Min ₹1,000').max(10000000),
    ratePA: z.number().min(1).max(30),
    years: z.number().min(1).max(40),
});
type F = z.infer<typeof schema>;
const img = getImage('calculators/swp');

export default function SWPCalculator() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [result, setResult] = useState<ReturnType<typeof calculateSWP> | null>(null);
    const [showFormula, setShowFormula] = useState(false);
    const [isPDF, setIsPDF] = useState(false);
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<F>({
        resolver: zodResolver(schema), defaultValues: { corpus: 5000000, monthlyWithdrawal: 30000, ratePA: 8, years: 20 },
    });
    const v = watch();

    const onSubmit = (data: F) => {
        const res = calculateSWP(data.corpus, data.monthlyWithdrawal, data.ratePA, data.years);
        setResult(res);
        setChartData(res.timeline);
    };

    const handlePDF = async () => {
        if (!result) return;
        setIsPDF(true);
        await generatePDFReport({
            title: 'SWP (Systematic Withdrawal Plan) Report',
            subtitle: 'Corpus Depletion & Withdrawal Analysis',
            sections: [
                { title: 'Input Parameters', rows: [['Initial Corpus', formatCurrencyFull(v.corpus)], ['Monthly Withdrawal', formatCurrencyFull(v.monthlyWithdrawal)], ['Expected Return', `${v.ratePA}%`], ['Withdrawal Period', `${v.years} Years`]] },
                { title: 'Results', rows: [['Total Amount Withdrawn', formatCurrencyFull(result.totalWithdrawn)], ['Remaining Corpus', formatCurrencyFull(result.finalBalance)], ['Annual Income', formatCurrencyFull(v.monthlyWithdrawal * 12)]] },
            ],
            chartElementId: 'swp-chart',
        });
        setIsPDF(false);
    };

    return (
        <>
            <Helmet>
                <title>SWP Calculator | FinFreedom33 – Systematic Withdrawal Plan</title>
                <meta name="description" content="Plan your retirement income with FinFreedom33's SWP Calculator. Calculate monthly withdrawals and corpus sustainability." />
            </Helmet>
            <PageHeader title="SWP Calculator" subtitle="Plan your systematic monthly withdrawals and ensure your corpus lasts through retirement" heroUrl={img.heroUrl} heroAlt={img.heroAlt} breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'SWP Calculator' }]} />
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">SWP Parameters</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label className="form-label">Initial Corpus (₹)</label>
                                        <input type="number" className="form-input" {...register('corpus', { valueAsNumber: true })} />
                                        <input type="range" min={100000} max={100000000} step={100000} value={v.corpus || 0} onChange={e => setValue('corpus', +e.target.value)} className="w-full mt-2 accent-primary" />
                                        {errors.corpus && <p className="form-error">{errors.corpus.message}</p>}
                                        <p className="text-primary text-sm font-semibold mt-1">{formatCurrency(v.corpus || 0)}</p>
                                    </div>
                                    <div>
                                        <label className="form-label">Monthly Withdrawal (₹)</label>
                                        <input type="number" className="form-input" {...register('monthlyWithdrawal', { valueAsNumber: true })} />
                                        <input type="range" min={1000} max={500000} step={1000} value={v.monthlyWithdrawal || 0} onChange={e => setValue('monthlyWithdrawal', +e.target.value)} className="w-full mt-2 accent-primary" />
                                        {errors.monthlyWithdrawal && <p className="form-error">{errors.monthlyWithdrawal.message}</p>}
                                    </div>
                                    <div>
                                        <label className="form-label">Portfolio Return Rate (%)</label>
                                        <input type="number" step="0.5" className="form-input" {...register('ratePA', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={20} step={0.5} value={v.ratePA || 0} onChange={e => setValue('ratePA', +e.target.value)} className="w-full mt-2 accent-primary" />
                                    </div>
                                    <div>
                                        <label className="form-label">Withdrawal Period (Years)</label>
                                        <input type="number" className="form-input" {...register('years', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={40} step={1} value={v.years || 0} onChange={e => setValue('years', +e.target.value)} className="w-full mt-2 accent-primary" />
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="submit" className="btn-primary flex-1">Calculate</button>
                                        <button type="button" onClick={() => { reset(); setChartData([]); setResult(null); }} className="btn-outline px-4"><RefreshCw size={16} /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            {result && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                        {[
                                            ['Initial Corpus', formatCurrency(v.corpus || 0), 'text-navy'],
                                            ['Annual Withdrawal', formatCurrency((v.monthlyWithdrawal || 0) * 12), 'text-primary'],
                                            ['Final Corpus', formatCurrency(result.finalBalance), result.finalBalance > 0 ? 'text-green-600' : 'text-secondary']
                                        ].map(([l, val, c]) => (
                                            <div key={l} className="card card-body flex flex-col justify-center py-4 md:py-5">
                                                <p className="text-gray-400 text-[10px] md:text-xs uppercase font-bold tracking-wider mb-1 md:mb-2">{l}</p>
                                                <p className={`text-xl md:text-2xl font-display font-bold ${c}`}>{val}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="card card-body">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-navy font-semibold">Corpus Depletion Chart</h3>
                                            <button onClick={handlePDF} disabled={isPDF} className="btn-primary btn-sm text-xs flex items-center gap-1.5"><Download size={13} />{isPDF ? 'Generating...' : 'PDF Report'}</button>
                                        </div>
                                        <div id="swp-chart">
                                            <ResponsiveContainer width="100%" height={260}>
                                                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                                    <defs>
                                                        <linearGradient id="swpGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#335C8E" stopOpacity={0.4} />
                                                            <stop offset="95%" stopColor="#335C8E" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF4" />
                                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickFormatter={y => `Yr ${y}`} />
                                                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => formatCurrency(v)} />
                                                    <Tooltip formatter={(v: any) => [formatCurrency(v), 'Remaining']} />
                                                    <Area type="monotone" dataKey="balance" name="Remaining Corpus" stroke="#335C8E" fill="url(#swpGrad)" strokeWidth={2} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    {result.finalBalance <= 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
                                            ⚠️ Your corpus will be depleted before the end of the withdrawal period. Consider reducing monthly withdrawal or increasing the portfolio return.
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="card card-body">
                                <button className="w-full flex justify-between items-center text-left" onClick={() => setShowFormula(!showFormula)}>
                                    <span className="font-semibold text-navy">How SWP Works</span>
                                    {showFormula ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {showFormula && (
                                    <div className="mt-4 space-y-2 text-sm text-gray-600 border-t pt-4">
                                        <p>SWP allows regular withdrawals from your mutual fund corpus while the remaining amount continues to earn returns.</p>
                                        <p><strong>Monthly Balance:</strong> Balance(n) = Balance(n-1) × (1 + r) - W</p>
                                        <p>Where r = Monthly Rate, W = Monthly Withdrawal</p>
                                        <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">SWP in equity mutual funds benefits from long-term capital gains tax treatment (10% LTCG on gains above ₹1L per year), making it more tax-efficient than traditional pension plans.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
