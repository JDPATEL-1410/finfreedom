import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { calculateSIP, generateYearlyData, formatCurrency, formatCurrencyFull } from '../../utils/calculators';
import { generatePDFReport } from '../../utils/pdfGenerator';

const schema = z.object({
    monthlyAmount: z.number().min(500, 'Minimum SIP amount is ₹500').max(10000000),
    expectedReturn: z.number().min(1).max(50),
    tenure: z.number().min(1).max(50),
});

type FormValues = z.infer<typeof schema>;

const CHART_COLORS = ['#335C8E', '#EB3E4A'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="card p-4 shadow-card-hover min-w-[160px]">
                <p className="text-navy font-semibold text-sm mb-2">Year {label}</p>
                {payload.map((p: any) => (
                    <p key={p.name} className="text-sm" style={{ color: p.color }}>
                        {p.name}: {formatCurrency(p.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const img = getImage('calculators/sip');

export default function SIPCalculator() {
    const [searchParams] = useSearchParams();
    const [_result, setResult] = useState<ReturnType<typeof calculateSIP> | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [showFormula, setShowFormula] = useState(false);
    const [isPDFLoading, setIsPDFLoading] = useState(false);
    const [shareMsg, setShareMsg] = useState('');

    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            monthlyAmount: Number(searchParams.get('m')) || 10000,
            expectedReturn: Number(searchParams.get('r')) || 12,
            tenure: Number(searchParams.get('t')) || 10,
        },
    });

    const values = watch();

    const onSubmit = useCallback((data: FormValues) => {
        const res = calculateSIP(data.monthlyAmount, data.expectedReturn, data.tenure);
        setResult(res);
        setChartData(generateYearlyData(data.monthlyAmount, data.expectedReturn, data.tenure, 'sip'));
    }, []);

    // Live calculation
    const liveResult = calculateSIP(values.monthlyAmount || 0, values.expectedReturn || 0, values.tenure || 0);

    const handleShare = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('m', String(values.monthlyAmount));
        url.searchParams.set('r', String(values.expectedReturn));
        url.searchParams.set('t', String(values.tenure));
        navigator.clipboard.writeText(url.toString()).then(() => {
            setShareMsg('Link copied!');
            setTimeout(() => setShareMsg(''), 2000);
        });
    };

    const handleDownloadPDF = async () => {
        setIsPDFLoading(true);
        await generatePDFReport({
            title: 'SIP Investment Calculator Report',
            subtitle: `Systematic Investment Plan Projection`,
            sections: [
                {
                    title: 'Investment Parameters',
                    rows: [
                        ['Monthly SIP Amount', formatCurrencyFull(values.monthlyAmount)],
                        ['Expected Annual Return', `${values.expectedReturn}%`],
                        ['Investment Tenure', `${values.tenure} Years`],
                    ],
                },
                {
                    title: 'Projected Results',
                    rows: [
                        ['Total Amount Invested', formatCurrencyFull(liveResult.invested)],
                        ['Estimated Returns', formatCurrencyFull(liveResult.gains)],
                        ['Future Value (Maturity)', formatCurrencyFull(liveResult.futureValue)],
                        ['Wealth Multiple', `${(liveResult.futureValue / liveResult.invested).toFixed(2)}x`],
                    ],
                },
            ],
            chartElementId: 'sip-chart',
        });
        setIsPDFLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>SIP Calculator | FinFreedom33 – Plan Your Systematic Investments</title>
                <meta name="description" content="Free SIP calculator to estimate your mutual fund SIP returns. Calculate maturity amount, total invested, and wealth created over time." />
            </Helmet>

            <PageHeader
                title="SIP Calculator"
                subtitle="Estimate the future value of your Systematic Investment Plan (SIP) with our intuitive calculator"
                heroUrl={img.heroUrl}
                heroAlt={img.heroAlt}
                breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'SIP Calculator' }]}
            />

            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Input Form */}
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">Enter SIP Details</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Monthly Amount */}
                                    <div>
                                        <label className="form-label">Monthly SIP Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            {...register('monthlyAmount', { valueAsNumber: true })}
                                            placeholder="10000"
                                            min={500}
                                            id="sip-monthly"
                                        />
                                        <input
                                            type="range"
                                            min={500}
                                            max={200000}
                                            step={500}
                                            value={values.monthlyAmount || 0}
                                            onChange={(e) => setValue('monthlyAmount', Number(e.target.value))}
                                            className="w-full mt-2 accent-primary"
                                            aria-label="Monthly SIP amount slider"
                                        />
                                        {errors.monthlyAmount && <p className="form-error">{errors.monthlyAmount.message}</p>}
                                        <p className="text-primary text-sm font-semibold mt-1">{formatCurrency(values.monthlyAmount || 0)}/month</p>
                                    </div>

                                    {/* Expected Return */}
                                    <div>
                                        <label className="form-label">Expected Annual Return (%)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            {...register('expectedReturn', { valueAsNumber: true })}
                                            placeholder="12"
                                            step="0.5"
                                            id="sip-return"
                                        />
                                        <input
                                            type="range"
                                            min={1}
                                            max={30}
                                            step={0.5}
                                            value={values.expectedReturn || 0}
                                            onChange={(e) => setValue('expectedReturn', Number(e.target.value))}
                                            className="w-full mt-2 accent-primary"
                                            aria-label="Expected return slider"
                                        />
                                        {errors.expectedReturn && <p className="form-error">{errors.expectedReturn.message}</p>}
                                    </div>

                                    {/* Tenure */}
                                    <div>
                                        <label className="form-label">Investment Tenure (Years)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            {...register('tenure', { valueAsNumber: true })}
                                            placeholder="10"
                                            id="sip-tenure"
                                        />
                                        <input
                                            type="range"
                                            min={1}
                                            max={40}
                                            step={1}
                                            value={values.tenure || 0}
                                            onChange={(e) => setValue('tenure', Number(e.target.value))}
                                            className="w-full mt-2 accent-primary"
                                            aria-label="Tenure slider"
                                        />
                                        {errors.tenure && <p className="form-error">{errors.tenure.message}</p>}
                                        <p className="text-gray-400 text-xs mt-1">{values.tenure} years ({(values.tenure || 0) * 12} months)</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button type="submit" className="btn-primary flex-1">Calculate</button>
                                        <button type="button" onClick={() => { reset(); setResult(null); setChartData([]); }} className="btn-outline px-4" title="Reset">
                                            <RefreshCw size={16} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Live Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                {[
                                    { label: 'Amount Invested', value: formatCurrency(liveResult.invested), color: 'text-navy' },
                                    { label: 'Estimated Returns', value: formatCurrency(liveResult.gains), color: 'text-green-600' },
                                    { label: 'Future Value', value: formatCurrency(liveResult.futureValue), color: 'text-primary' },
                                ].map((s) => (
                                    <div key={s.label} className="card card-body text-center py-4 md:py-5">
                                        <p className={`text-xl md:text-2xl font-display font-bold ${s.color} mb-1`}>{s.value}</p>
                                        <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider font-medium">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Donut Chart */}
                            <div className="card card-body">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-navy font-semibold">Investment Breakdown</h3>
                                    <div className="flex gap-2">
                                        <button onClick={handleShare} className="btn-outline btn-sm text-xs flex items-center gap-1.5" title="Share link">
                                            <Share2 size={13} />
                                            {shareMsg || 'Share'}
                                        </button>
                                        <button
                                            onClick={handleDownloadPDF}
                                            disabled={isPDFLoading}
                                            className="btn-primary btn-sm text-xs flex items-center gap-1.5"
                                        >
                                            <Download size={13} />
                                            {isPDFLoading ? 'Generating...' : 'PDF Report'}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                                    <div className="relative">
                                        <PieChart width={160} height={160}>
                                            <Pie
                                                data={[
                                                    { name: 'Invested', value: Math.round(liveResult.invested) },
                                                    { name: 'Returns', value: Math.round(liveResult.gains) },
                                                ]}
                                                cx={75}
                                                cy={75}
                                                innerRadius={50}
                                                outerRadius={75}
                                                paddingAngle={3}
                                                dataKey="value"
                                            >
                                                {CHART_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                                            </Pie>
                                            <Tooltip formatter={(v: any) => formatCurrency(v)} />
                                        </PieChart>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-[10px] text-gray-400 uppercase font-medium">Growth</span>
                                            <span className="text-xs font-bold text-navy">
                                                {((liveResult.gains / (liveResult.invested || 1)) * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-3.5 flex-1 w-full">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center gap-2 text-gray-600">
                                                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                                                Invested amount
                                            </span>
                                            <span className="font-bold text-navy">{formatCurrency(liveResult.invested)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center gap-2 text-gray-600">
                                                <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" />
                                                Wealth Gained
                                            </span>
                                            <span className="font-bold text-green-600">{formatCurrency(liveResult.gains)}</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3.5 flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider text-[10px]">Total Value</span>
                                            <span className="font-bold text-primary text-lg">{formatCurrency(liveResult.futureValue)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-500 italic">Expected wealth multiple</span>
                                            <span className="font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-lg">{(liveResult.futureValue / (liveResult.invested || 1)).toFixed(2)}x</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Area Chart */}
                            {chartData.length > 0 && (
                                <div className="card card-body" id="sip-chart">
                                    <h3 className="text-navy font-semibold mb-4">Year-wise Growth</h3>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#335C8E" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#335C8E" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#EB3E4A" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#EB3E4A" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF4" />
                                            <XAxis dataKey="year" tick={{ fontSize: 11 }} tickFormatter={(v) => `Yr ${v}`} />
                                            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => formatCurrency(v)} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend />
                                            <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="#335C8E" fill="url(#colorValue)" strokeWidth={2} />
                                            <Area type="monotone" dataKey="invested" name="Invested Amount" stroke="#EB3E4A" fill="url(#colorInvested)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Formula */}
                            <div className="card card-body">
                                <button
                                    className="w-full flex items-center justify-between text-left"
                                    onClick={() => setShowFormula(!showFormula)}
                                    aria-expanded={showFormula}
                                >
                                    <span className="font-semibold text-navy">Formula & Assumptions</span>
                                    {showFormula ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {showFormula && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                                        <p><strong className="text-navy">SIP Formula:</strong> FV = P × [((1 + r)ⁿ - 1) / r] × (1 + r)</p>
                                        <p>Where: <strong>P</strong> = Monthly SIP, <strong>r</strong> = Monthly Rate (Annual Rate / 12), <strong>n</strong> = Total Months</p>
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
                                            <p><strong>Assumptions:</strong></p>
                                            <p>• Returns are compounded monthly at the specified annual rate</p>
                                            <p>• SIP is made at the beginning of each month (annuity due)</p>
                                            <p>• Returns shown are pre-tax and pre-expense ratio</p>
                                            <p>• Actual returns will vary based on market conditions</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Calculators */}
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-navy font-bold text-xl">Explore Other Calculators</h3>
                            <Link to="/calculators" className="text-primary font-bold text-sm hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { name: 'Lumpsum Calculator', path: '/calculators/lumpsum' },
                                { name: 'SWP Calculator', path: '/calculators/swp' },
                                { name: 'Retirement Planner', path: '/calculators/retirement' },
                                { name: 'Goal Planning', path: '/calculators/goal' },
                            ].map((c) => (
                                <Link key={c.path} to={c.path} className="card card-body text-center hover:shadow-card-hover hover:-translate-y-1 transition-all group border-b-2 border-b-transparent hover:border-b-primary">
                                    <p className="text-navy font-bold text-sm group-hover:text-primary transition-colors">{c.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
