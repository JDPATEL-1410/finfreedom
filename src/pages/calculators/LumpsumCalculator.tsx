import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { calculateLumpsum, generateYearlyData, formatCurrency, formatCurrencyFull } from '../../utils/calculators';
import { generatePDFReport } from '../../utils/pdfGenerator';

const schema = z.object({
    principal: z.number().min(1000, 'Minimum ₹1,000').max(100000000),
    expectedReturn: z.number().min(1).max(50),
    tenure: z.number().min(1).max(40),
});
type F = z.infer<typeof schema>;
const img = getImage('calculators/lumpsum');

export default function LumpsumCalculator() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [showFormula, setShowFormula] = useState(false);
    const [isPDF, setIsPDF] = useState(false);
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<F>({
        resolver: zodResolver(schema), defaultValues: { principal: 100000, expectedReturn: 12, tenure: 10 },
    });
    const v = watch();
    const live = calculateLumpsum(v.principal || 0, v.expectedReturn || 0, v.tenure || 0);

    const onSubmit = (data: F) => {
        setChartData(generateYearlyData(data.principal, data.expectedReturn, data.tenure, 'lumpsum'));
    };

    const handlePDF = async () => {
        setIsPDF(true);
        await generatePDFReport({
            title: 'Lumpsum Investment Calculator Report',
            subtitle: 'One-time Investment Projection',
            sections: [
                { title: 'Investment Parameters', rows: [['Investment Amount', formatCurrencyFull(v.principal)], ['Expected Annual Return', `${v.expectedReturn}%`], ['Investment Tenure', `${v.tenure} Years`]] },
                { title: 'Projected Results', rows: [['Principal Invested', formatCurrencyFull(v.principal)], ['Estimated Returns', formatCurrencyFull(live.gains)], ['Maturity Value', formatCurrencyFull(live.futureValue)], ['Wealth Multiple', `${(live.futureValue / (v.principal || 1)).toFixed(2)}x`]] },
            ],
            chartElementId: 'lump-chart',
        });
        setIsPDF(false);
    };

    return (
        <>
            <Helmet>
                <title>Lumpsum Calculator | FinFreedom33</title>
                <meta name="description" content="Calculate the future value of your one-time lump sum investment with FinFreedom33's Lumpsum Calculator." />
            </Helmet>
            <PageHeader title="Lumpsum Calculator" subtitle="Estimate the future value of your one-time investment" heroUrl={img.heroUrl} heroAlt={img.heroAlt} breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'Lumpsum Calculator' }]} />
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">Enter Investment Details</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label className="form-label">Investment Amount (₹)</label>
                                        <input type="number" className="form-input" {...register('principal', { valueAsNumber: true })} />
                                        <input type="range" min={1000} max={10000000} step={1000} value={v.principal || 0} onChange={e => setValue('principal', +e.target.value)} className="w-full mt-2 accent-primary" />
                                        {errors.principal && <p className="form-error">{errors.principal.message}</p>}
                                        <p className="text-primary text-sm font-semibold mt-1">{formatCurrency(v.principal || 0)}</p>
                                    </div>
                                    <div>
                                        <label className="form-label">Expected Annual Return (%)</label>
                                        <input type="number" step="0.5" className="form-input" {...register('expectedReturn', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={30} step={0.5} value={v.expectedReturn || 0} onChange={e => setValue('expectedReturn', +e.target.value)} className="w-full mt-2 accent-primary" />
                                    </div>
                                    <div>
                                        <label className="form-label">Investment Tenure (Years)</label>
                                        <input type="number" className="form-input" {...register('tenure', { valueAsNumber: true })} />
                                        <input type="range" min={1} max={40} step={1} value={v.tenure || 0} onChange={e => setValue('tenure', +e.target.value)} className="w-full mt-2 accent-primary" />
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="submit" className="btn-primary flex-1">Calculate</button>
                                        <button type="button" onClick={() => { reset(); setChartData([]); }} className="btn-outline px-4"><RefreshCw size={16} /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                {[
                                    ['Principal Invested', formatCurrency(live.invested), 'text-navy'],
                                    ['Estimated Returns', formatCurrency(live.gains), 'text-green-600'],
                                    ['Total Value', formatCurrency(live.futureValue), 'text-primary']
                                ].map(([l, val, c]) => (
                                    <div key={l} className="card card-body flex flex-col justify-center py-4 md:py-5">
                                        <p className="text-gray-400 text-[10px] md:text-xs uppercase font-bold tracking-wider mb-1 md:mb-2">{l}</p>
                                        <p className={`text-xl md:text-2xl font-display font-bold ${c}`}>{val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="card card-body">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-navy font-semibold">Investment Breakdown</h3>
                                    <button onClick={handlePDF} disabled={isPDF} className="btn-primary btn-sm text-xs flex items-center gap-1.5"><Download size={13} />{isPDF ? 'Generating...' : 'PDF Report'}</button>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">Growth</p>
                                            <p className="text-lg font-bold text-primary">+{((live.gains / (live.invested || 1)) * 100).toFixed(0)}%</p>
                                        </div>
                                        <ResponsiveContainer width={180} height={180}>
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Principal', value: Math.round(live.invested) },
                                                        { name: 'Returns', value: Math.round(live.gains) }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {['#335C8E', '#EB3E4A'].map((c, i) => <Cell key={i} fill={c} stroke="none" />)}
                                                </Pie>
                                                <Tooltip formatter={(v: any) => formatCurrency(v)} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-4 flex-1 w-full">
                                        {[
                                            ['Principal Invested', formatCurrency(live.invested), 'bg-primary'],
                                            ['Estimated Returns', formatCurrency(live.gains), 'bg-secondary']
                                        ].map(([l, val, bg]) => (
                                            <div key={l} className="flex justify-between items-center group">
                                                <span className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
                                                    <span className={`w-3 h-3 rounded-full ${bg} shadow-sm group-hover:scale-125 transition-transform`} />
                                                    {l}
                                                </span>
                                                <span className="font-bold text-navy text-sm md:text-base">{val}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-100 pt-4 mt-2">
                                            <div className="flex justify-between items-center bg-surface p-3 rounded-xl">
                                                <span className="font-bold text-sm text-gray-600">Total Value</span>
                                                <span className="font-black text-primary text-base md:text-lg">{formatCurrency(live.futureValue)}</span>
                                            </div>
                                            <div className="flex justify-between mt-3 px-3">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Wealth Multiple</span>
                                                <span className="font-bold text-green-600 text-sm">{(live.futureValue / (live.invested || 1)).toFixed(2)}x</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {chartData.length > 0 && (
                                <div className="card card-body" id="lump-chart">
                                    <h3 className="text-navy font-semibold mb-4">Year-wise Growth</h3>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="cv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#335C8E" stopOpacity={0.3} /><stop offset="95%" stopColor="#335C8E" stopOpacity={0} /></linearGradient>
                                                <linearGradient id="ci" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EB3E4A" stopOpacity={0.2} /><stop offset="95%" stopColor="#EB3E4A" stopOpacity={0} /></linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF4" />
                                            <XAxis dataKey="year" tick={{ fontSize: 11 }} tickFormatter={v => `Yr ${v}`} />
                                            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => formatCurrency(v)} />
                                            <Tooltip formatter={(v: any) => [formatCurrency(v), 'Value']} />
                                            <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="#335C8E" fill="url(#cv)" strokeWidth={2} />
                                            <Area type="monotone" dataKey="invested" name="Principal" stroke="#EB3E4A" fill="url(#ci)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                            <div className="card card-body">
                                <button className="w-full flex justify-between items-center text-left" onClick={() => setShowFormula(!showFormula)}>
                                    <span className="font-semibold text-navy">Formula & Assumptions</span>
                                    {showFormula ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {showFormula && (
                                    <div className="mt-4 space-y-2 text-sm text-gray-600 border-t pt-4">
                                        <p><strong>Compound Interest Formula:</strong> FV = P × (1 + r)ⁿ</p>
                                        <p>Where: P = Principal, r = Annual Rate, n = Years</p>
                                        <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">Returns are annualized and compounded yearly. Actual returns may differ based on market performance.</p>
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
