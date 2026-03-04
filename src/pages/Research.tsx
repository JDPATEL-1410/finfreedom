import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Search,
    ArrowUpDown,
    ExternalLink,
    TrendingUp,
    BarChart2,
    PieChart as PieChartIcon,
    Download,
    Info
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';
import { fundService } from '../services/fundService';

interface Fund {
    id: string;
    name: string;
    category: string;
    amc: string;
    rating: number;
    nav: number;
    return1Y: number;
    return3Y: number;
    return5Y: number;
    aum: number; // in Crores
    risk: 'Low' | 'Moderate' | 'High' | 'Very High';
}

const MOCK_FUNDS: Fund[] = [
    { id: '1', name: 'ICICI Prudential Bluechip Fund', category: 'Large Cap', amc: 'ICICI Prudential', rating: 5, nav: 82.4, return1Y: 18.5, return3Y: 21.2, return5Y: 15.8, aum: 32450, risk: 'High' },
    { id: '2', name: 'HDFC Mid-Cap Opportunities Fund', category: 'Mid Cap', amc: 'HDFC Mutual Fund', rating: 4, nav: 145.2, return1Y: 28.4, return3Y: 32.1, return5Y: 18.5, aum: 45600, risk: 'Very High' },
    { id: '3', name: 'Mirae Asset Large Cap Fund', category: 'Large Cap', amc: 'Mirae Asset', rating: 5, nav: 98.6, return1Y: 16.8, return3Y: 19.5, return5Y: 14.2, aum: 35120, risk: 'High' },
    { id: '4', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', amc: 'Parag Parikh', rating: 5, nav: 65.4, return1Y: 22.1, return3Y: 26.8, return5Y: 19.2, aum: 28900, risk: 'High' },
    { id: '5', name: 'SBI Small Cap Fund', category: 'Small Cap', amc: 'SBI Mutual Fund', rating: 4, nav: 156.8, return1Y: 32.5, return3Y: 35.8, return5Y: 22.1, aum: 18450, risk: 'Very High' },
    { id: '6', name: 'Quant Active Fund', category: 'Multi Cap', amc: 'Quant Mutual Fund', rating: 5, nav: 540.2, return1Y: 35.2, return3Y: 42.5, return5Y: 26.8, aum: 5210, risk: 'Very High' },
    { id: '7', name: 'Axis Bluechip Fund', category: 'Large Cap', amc: 'Axis Mutual Fund', rating: 3, nav: 48.2, return1Y: 12.4, return3Y: 15.2, return5Y: 12.8, aum: 31200, risk: 'High' },
    { id: '8', name: 'Kotak Equity Opportunities Fund', category: 'Large & Mid Cap', amc: 'Kotak Mutual Fund', rating: 4, nav: 210.5, return1Y: 21.4, return3Y: 24.1, return5Y: 16.5, aum: 12400, risk: 'Very High' },
    { id: '9', name: 'Canara Robeco Bluechip Equity Fund', category: 'Large Cap', amc: 'Canara Robeco', rating: 5, nav: 45.8, return1Y: 17.2, return3Y: 18.9, return5Y: 14.8, aum: 9800, risk: 'High' },
    { id: '10', name: 'Nippon India Small Cap Fund', category: 'Small Cap', amc: 'Nippon India', rating: 4, nav: 112.4, return1Y: 38.2, return3Y: 45.1, return5Y: 24.5, aum: 32100, risk: 'Very High' },
];

const CATEGORIES = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'Multi Cap', 'Large & Mid Cap'];

const img = getImage('services/stocks');

export default function Research() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Fund; direction: 'asc' | 'desc' } | null>(null);

    // Live search states
    const [liveSearchQuery, setLiveSearchQuery] = useState('');
    const [liveResults, setLiveResults] = useState<any[]>([]);

    const handleSort = (key: keyof Fund) => {
        let direction: 'asc' | 'desc' = 'desc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const handleLiveSearch = async () => {
        if (!liveSearchQuery.trim()) return;
        const results = await fundService.searchSchemes(liveSearchQuery);
        setLiveResults(results.slice(0, 10)); // Limit to 10
    };

    const filteredFunds = useMemo(() => {
        let result = MOCK_FUNDS.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fund.amc.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || fund.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        if (sortConfig) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [searchTerm, selectedCategory, sortConfig]);

    return (
        <>
            <Helmet>
                <title>Mutual Fund Research | FinFreedom33 – Live Performance & Analytics</title>
                <meta name="description" content="View live mutual fund performance, research top-rated schemes, and compare returns across categories. Expert-curated lists by FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Market Research Hub"
                subtitle="Up-to-date performance analytics and data-driven insights to help you pick the right funds"
                heroUrl={img.heroUrl}
                heroAlt="Stock market research"
                breadcrumbs={[{ label: 'Research' }]}
            />

            <section className="section bg-surface">
                <div className="container-custom">

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'Sensex', value: '72,431', change: '+1.2%', up: true, icon: TrendingUp },
                            { label: 'Nifty 50', value: '22,042', change: '+0.9%', up: true, icon: BarChart2 },
                            { label: 'Funds Tracked', value: '2,500+', change: 'Updated Live', up: true, icon: PieChartIcon },
                            { label: 'Avg Small Cap 1Y', value: '34.2%', change: 'Category Avg', up: true, icon: TrendingUp },
                        ].map((stat, i) => (
                            <div key={i} className="card card-body flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} flex items-center justify-center shrink-0`}>
                                    <stat.icon size={22} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-navy font-bold text-xl">{stat.value}</p>
                                    <p className={`text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Live Fund Search */}
                    <div className="card card-body mb-8 border-0 shadow-premium bg-gradient-to-br from-white to-blue-50/30">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search ANY Mutual Fund in India (e.g. Parag Parikh, SBI Small Cap)..."
                                    className="form-input pl-12 py-4 border-primary/20 focus:border-primary"
                                    value={liveSearchQuery}
                                    onChange={(e) => setLiveSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleLiveSearch()}
                                />
                            </div>
                            <button
                                onClick={handleLiveSearch}
                                className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 shrink-0"
                            >
                                <Search size={20} />
                                Search Live
                            </button>
                        </div>

                        {liveResults.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-blue-100 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h4 className="text-navy font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Live Results
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {liveResults.map((res: any) => (
                                        <div key={res.schemeCode} className="flex items-center justify-between p-3 bg-white rounded-xl border border-blue-50 hover:border-primary/30 transition-all shadow-sm">
                                            <div className="flex-1 min-w-0 pr-4">
                                                <p className="text-navy font-bold text-sm truncate">{res.schemeName}</p>
                                                <p className="text-[10px] text-gray-400">Code: {res.schemeCode}</p>
                                            </div>
                                            <button
                                                onClick={() => window.open(`https://www.google.com/search?q=${res.schemeName}+nav`, '_blank')}
                                                className="p-2 rounded-lg bg-blue-50 text-primary hover:bg-primary hover:text-white transition-all shrink-0"
                                            >
                                                <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search and Filters */}
                    <div className="card card-body mb-8 border-0 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="text-left w-full lg:w-48">
                                <h3 className="text-navy font-bold">Recommended Lists</h3>
                                <p className="text-xs text-gray-400">Curated by our experts</p>
                            </div>
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Filter curated list..."
                                    className="form-input pl-12"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`
                                          px-4 py-2 rounded-full text-xs font-semibold transition-all
                                          ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100 hover:border-primary/30'}
                                        `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fund Table */}
                    <div className="card overflow-hidden border-0 shadow-premium">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left bg-white" role="table">
                                <thead>
                                    <tr className="bg-navy text-white text-xs uppercase tracking-widest font-bold">
                                        <th className="p-5">Fund Name</th>
                                        <th className="p-5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('category')}>
                                            <div className="flex items-center gap-2">Category <ArrowUpDown size={14} /></div>
                                        </th>
                                        <th className="p-5 cursor-pointer hover:bg-white/10 transition-colors text-center" onClick={() => handleSort('rating')}>
                                            <div className="flex items-center justify-center gap-2">Rating <ArrowUpDown size={14} /></div>
                                        </th>
                                        <th className="p-5 cursor-pointer hover:bg-white/10 transition-colors text-right" onClick={() => handleSort('return1Y')}>
                                            <div className="flex items-center justify-end gap-2">1Y Return <ArrowUpDown size={14} /></div>
                                        </th>
                                        <th className="p-5 cursor-pointer hover:bg-white/10 transition-colors text-right" onClick={() => handleSort('return3Y')}>
                                            <div className="flex items-center justify-end gap-2">3Y Return <ArrowUpDown size={14} /></div>
                                        </th>
                                        <th className="p-5 text-right">Risk</th>
                                        <th className="p-5 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredFunds.map((fund) => (
                                        <tr key={fund.id} className="hover:bg-blue-50/50 transition-colors group">
                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className="text-navy font-bold text-sm group-hover:text-primary transition-colors">{fund.name}</span>
                                                    <span className="text-gray-400 text-xs font-medium">{fund.amc}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="badge-primary text-[10px]">{fund.category}</span>
                                            </td>
                                            <td className="p-5 text-center">
                                                <div className="flex items-center justify-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < fund.rating ? 'text-amber-400' : 'text-gray-200'}>★</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-5 text-right font-bold text-green-600 text-sm">+{fund.return1Y}%</td>
                                            <td className="p-5 text-right font-bold text-green-600 text-sm">+{fund.return3Y}%</td>
                                            <td className="p-5 text-right">
                                                <span className={`
                                          text-[10px] font-bold px-2 py-1 rounded uppercase
                                          ${fund.risk === 'Very High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}
                                        `}>
                                                    {fund.risk}
                                                </span>
                                            </td>
                                            <td className="p-5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-all" title="View Details">
                                                        <ExternalLink size={16} />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-all" title="Download Factsheet">
                                                        <Download size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredFunds.length === 0 && (
                            <div className="p-12 text-center">
                                <p className="text-gray-400 text-lg">No funds matching your search criteria.</p>
                                <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="text-primary font-bold mt-2">Clear all filters</button>
                            </div>
                        )}

                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                            <Info size={14} className="text-blue-500" />
                            <p className="text-[10px] text-gray-400">
                                Data as of previous trading day. Performance figures are pre-tax and pre-expense ratio. Mutual fund investments are subject to market risks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Advisory CTA */}
            <section className="bg-navy py-12">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div>
                            <h3 className="text-white font-display font-bold text-2xl mb-2">Not sure which fund to pick?</h3>
                            <p className="text-blue-200">Our research-driven advisory will help you build a winner's portfolio.</p>
                        </div>
                        <a href="/contact" className="btn-secondary whitespace-nowrap">Schedule A Call</a>
                    </div>
                </div>
            </section>
        </>
    );
}
