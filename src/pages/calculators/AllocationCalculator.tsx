import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';
import { generatePDFReport } from '../../utils/pdfGenerator';
import { formatCurrencyFull } from '../../utils/calculators';

const schema = z.object({
    totalPortfolio: z.number().min(1000).max(1000000000),
    equityPct: z.number().min(0).max(100),
    debtPct: z.number().min(0).max(100),
    goldPct: z.number().min(0).max(100),
    realEstatePct: z.number().min(0).max(100),
}).refine(d => d.equityPct + d.debtPct + d.goldPct + d.realEstatePct <= 100, {
    message: 'Total allocation cannot exceed 100%',
    path: ['equityPct'],
});

type F = z.infer<typeof schema>;
const COLORS = ['#335C8E', '#EB3E4A', '#F59E0B', '#10B981'];
const ASSET_INFO = [
    { name: 'Equity / Mutual Funds', key: 'equityPct', expectedReturn: '12-15%', risk: 'High', color: '#335C8E', icon: '📈' },
    { name: 'Debt / Fixed Income', key: 'debtPct', expectedReturn: '6-9%', risk: 'Low-Medium', color: '#EB3E4A', icon: '🏦' },
    { name: 'Gold / Commodities', key: 'goldPct', expectedReturn: '8-10%', risk: 'Medium', color: '#F59E0B', icon: '🥇' },
    { name: 'Real Estate', key: 'realEstatePct', expectedReturn: '8-12%', risk: 'Medium-High', color: '#10B981', icon: '🏡' },
];

const img = getImage('calculators/allocation');

export default function AllocationCalculator() {
    const [isPDF, setIsPDF] = useState(false);
    const { register, watch, reset, setValue, formState: { errors } } = useForm<F>({
        resolver: zodResolver(schema),
        defaultValues: { totalPortfolio: 1000000, equityPct: 60, debtPct: 25, goldPct: 10, realEstatePct: 5 },
    });
    const v = watch();
    const total = (v.equityPct || 0) + (v.debtPct || 0) + (v.goldPct || 0) + (v.realEstatePct || 0);

    const pieData = ASSET_INFO.map((a, i) => ({
        name: a.name, value: (v[a.key as keyof F] as number) || 0, color: COLORS[i],
        amount: ((v[a.key as keyof F] as number || 0) / 100) * (v.totalPortfolio || 0),
    })).filter(d => d.value > 0);

    const handlePDF = async () => {
        setIsPDF(true);
        await generatePDFReport({
            title: 'Asset Allocation Report',
            subtitle: 'Portfolio Distribution Analysis',
            sections: [
                { title: 'Portfolio Details', rows: [['Total Portfolio Value', formatCurrencyFull(v.totalPortfolio)], ['Total Allocated', `${total}%`]] },
                { title: 'Asset Allocation Breakdown', rows: ASSET_INFO.map(a => [a.name, `${v[a.key as keyof F]}% = ${formatCurrencyFull(((v[a.key as keyof F] as number || 0) / 100) * (v.totalPortfolio || 0))}`]) },
            ],
            chartElementId: 'alloc-chart',
        });
        setIsPDF(false);
    };

    return (
        <>
            <Helmet>
                <title>Asset Allocation Visualizer | FinFreedom33</title>
                <meta name="description" content="Visualize and optimize your asset allocation across equity, debt, gold, and real estate with FinFreedom33's interactive allocation tool." />
            </Helmet>
            <PageHeader title="Asset Allocation Visualizer" subtitle="Design and visualize your ideal portfolio distribution across asset classes" heroUrl={img.heroUrl} heroAlt={img.heroAlt} breadcrumbs={[{ label: 'Calculators', path: '/calculators' }, { label: 'Asset Allocation' }]} />
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card card-body">
                                <h2 className="text-navy font-semibold text-xl mb-6">Portfolio Builder</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="form-label">Total Portfolio Value (₹)</label>
                                        <input type="number" className="form-input" {...register('totalPortfolio', { valueAsNumber: true })} />
                                        <input type="range" min={10000} max={100000000} step={10000} value={v.totalPortfolio || 0} onChange={e => setValue('totalPortfolio', +e.target.value)} className="w-full mt-2 accent-primary" />
                                        <p className="text-primary text-sm font-semibold mt-1">{formatCurrencyFull(v.totalPortfolio || 0)}</p>
                                    </div>
                                    {ASSET_INFO.map((asset, _i) => {

                                        const pct = (v[asset.key as keyof F] as number) || 0;
                                        return (
                                            <div key={asset.key}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <label className="form-label mb-0">{asset.icon} {asset.name}</label>
                                                    <span className="text-sm font-bold" style={{ color: asset.color }}>{pct}%</span>
                                                </div>
                                                <input type="range" min={0} max={100} step={1} value={pct} onChange={e => setValue(asset.key as keyof F, +e.target.value as any)} className="w-full" style={{ accentColor: asset.color }} />
                                                <p className="text-gray-400 text-xs mt-0.5">{formatCurrencyFull(Math.round((pct / 100) * (v.totalPortfolio || 0)))}</p>
                                            </div>
                                        );
                                    })}
                                    {errors.equityPct && <p className="form-error">{errors.equityPct.message}</p>}
                                    <div className={`text-center py-2 rounded-xl text-sm font-semibold ${total === 100 ? 'bg-green-100 text-green-700' : total > 100 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                        Total: {total}% {total === 100 ? '✓ Balanced' : total > 100 ? '⚠ Exceeds 100%' : `(${100 - total}% unallocated)`}
                                    </div>
                                    <button type="button" onClick={() => reset()} className="btn-outline w-full flex items-center justify-center gap-2"><RefreshCw size={15} />Reset to Default</button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            <div className="card card-body" id="alloc-chart">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-navy font-semibold">Allocation Breakdown</h3>
                                    <button onClick={handlePDF} disabled={isPDF} className="btn-primary btn-sm text-xs flex items-center gap-1.5"><Download size={13} />{isPDF ? 'Generating...' : 'PDF Report'}</button>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={110} innerRadius={60} paddingAngle={3} dataKey="value">
                                            {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                                        </Pie>
                                        <Tooltip formatter={(v: any, name: any) => [`${v}%`, name]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {ASSET_INFO.map((asset, i) => {
                                    const pct = (v[asset.key as keyof F] as number) || 0;
                                    const amount = Math.round((pct / 100) * (v.totalPortfolio || 0));
                                    return (
                                        <div key={asset.key} className="card card-body border-l-4" style={{ borderLeftColor: COLORS[i] }}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{asset.icon} {asset.name.split('/')[0]}</p>
                                                    <p className="text-2xl font-bold text-navy">{pct}%</p>
                                                    <p className="text-primary font-semibold text-sm">{formatCurrencyFull(amount)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`badge text-xs ${asset.risk === 'High' ? 'badge-secondary' : asset.risk === 'Low-Medium' ? 'badge-primary' : 'bg-amber-100 text-amber-700'}`}>{asset.risk} Risk</span>
                                                    <p className="text-gray-400 text-xs mt-1">Exp. Return: {asset.expectedReturn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {total < 100 && (
                                <div className="card card-body text-center py-5">
                                    <p className="text-amber-600 font-semibold">Unallocated: {100 - total}%</p>
                                    <p className="text-gray-500 text-sm mt-1">{formatCurrencyFull(Math.round(((100 - total) / 100) * (v.totalPortfolio || 0)))} remaining</p>
                                </div>
                            )}
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-800">
                                <p className="font-semibold mb-2">📊 General Allocation Guidelines</p>
                                <ul className="space-y-1 text-xs">
                                    <li>• <strong>Aggressive (5-20 yrs):</strong> 70-80% Equity, 10-15% Debt, 5-10% Gold</li>
                                    <li>• <strong>Moderate (5-15 yrs):</strong> 50-60% Equity, 25-30% Debt, 10% Gold, 5-10% RE</li>
                                    <li>• <strong>Conservative (1-5 yrs):</strong> 20-30% Equity, 50-60% Debt, 10-15% Gold</li>
                                    <li>• Rebalance annually or when any asset deviates by ±5%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
