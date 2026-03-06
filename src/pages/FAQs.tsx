import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    ChevronDown,
    ChevronRight,
    Search,
    HelpCircle,
    MessageCircle,
    Phone,
    ArrowRight
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';
import { Link } from 'react-router-dom';

const FAQS = [
    {
        category: 'General Queries',
        items: [
            {
                q: 'What services does FinFreedom33 provide?',
                a: 'We provide comprehensive financial services including Mutual Fund distributor services, Life and Health insurance, Equity advisory, Retirement planning, Tax planning (ELSS), and Holistic financial planning.'
            },
            {
                q: 'Is FinFreedom33 a registered entity?',
                a: 'Yes, FinFreedom33 LLP is an AMFI Registered Mutual Fund Distributor (ARN Number: 144870). Our founder, Nitin J., is a veteran in the industry with over 25 years of experience.'
            },
            {
                q: 'Where are you located?',
                a: 'Our head office is in Ahmedabad, Gujarat, located at Shantigram Township, Near Vaishnodevi Circle, S.G. Highway. However, we serve clients across India and NRI clients globally through our digital platform.'
            }
        ]
    },
    {
        category: 'Investments & Mutual Funds',
        items: [
            {
                q: 'How do I start a SIP?',
                a: 'Starting a SIP is easy. You can book a consultation with us, and we will help you with the KYC process, fund selection, and setting up the electronic mandate for monthly investments.'
            },
            {
                q: 'What is the minimum amount to start investing?',
                a: 'You can start a SIP for as low as ₹500 per month. For lumpsum investments, most schemes accept a minimum of ₹5,000.'
            },
            {
                q: 'How do I track my portfolio?',
                a: 'All our clients get access to our premium mobile app and web portal where they can track their multi-asset portfolio live, view capital gains reports, and execute transactions.'
            }
        ]
    },
    {
        category: 'Safety & Risk',
        items: [
            {
                q: 'Is my money safe with FinFreedom33?',
                a: 'When you invest through us, your money goes directly to the Asset Management Company (AMC) or Insurance Company. We act as an intermediary and advisor. Your holdings are in your own name in the respective schemes.'
            },
            {
                q: 'Can I withdraw my money anytime?',
                a: 'For open-ended mutual funds, you can withdraw your money on any working day. The amount is usually credited to your bank account within 1-3 working days depending on the scheme type.'
            }
        ]
    }
];

const img = getImage('about');

export default function FAQs() {
    const [activeTab, setActiveTab] = useState(FAQS[0].category);
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleItem = (q: string) => {
        setOpenItems(prev =>
            prev.includes(q) ? prev.filter(i => i !== q) : [...prev, q]
        );
    };

    const filteredFaqs = FAQS.map(cat => ({
        ...cat,
        items: cat.items.filter(i =>
            i.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <>
            <Helmet>
                <title>FAQs - Frequently Asked Questions | FinFreedom33</title>
                <meta name="description" content="Find answers to common questions about mutual funds, insurance, financial planning, and our services at FinFreedom33." />
            </Helmet>

            <PageHeader
                title="Help Center"
                subtitle="Find quick answers to common questions regarding wealth management and our services"
                heroUrl={img.heroUrl}
                heroAlt="Help and Support"
                breadcrumbs={[{ label: 'FAQs' }]}
            />

            <section className="section bg-surface">
                <div className="container-custom">

                    {/* Search Header */}
                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                className="form-input pl-14 py-5 rounded-2xl shadow-premium border-0"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Nav Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="space-y-2 sticky top-24">
                                {FAQS.map((cat, _catIdx) => (
                                    <button
                                        key={cat.category}
                                        onClick={() => setActiveTab(cat.category)}
                                        className={`
                      w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold transition-all
                      ${activeTab === cat.category
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white text-gray-500 hover:bg-white/80'}
                    `}
                                    >
                                        {cat.category}
                                        <ChevronRight size={16} className={activeTab === cat.category ? 'opacity-100' : 'opacity-0'} />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 p-6 bg-navy rounded-3xl text-white">
                                <HelpCircle size={32} className="text-blue-300 mb-4" />
                                <h4 className="font-display font-bold text-lg mb-2">Still have questions?</h4>
                                <p className="text-blue-200 text-sm mb-6">Can't find the answer you're looking for? Talk to our team.</p>
                                <Link to="/contact" className="btn-secondary btn-sm w-full text-center">Contact Support</Link>
                            </div>
                        </div>

                        <div className="lg:w-3/4 space-y-8">
                            {filteredFaqs.map((cat, _catIdx) => (

                                <div
                                    key={cat.category}
                                    className={activeTab === cat.category || searchTerm ? 'block' : 'hidden md:hidden lg:hidden'}
                                >
                                    <h3 className="text-navy font-display font-bold text-2xl mb-6">{cat.category}</h3>
                                    <div className="space-y-4">
                                        {cat.items.map((item, _idx) => (
                                            <div
                                                key={_idx}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleItem(item.q)}
                                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <span className="text-navy font-semibold md:text-lg pr-4">{item.q}</span>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-transform ${openItems.includes(item.q) ? 'rotate-180 bg-primary/10 text-primary' : 'text-gray-400'}`}>
                                                        <ChevronDown size={20} />
                                                    </div>
                                                </button>

                                                <AnimatePresence>
                                                    {openItems.includes(item.q) && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                                                                {item.a}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {filteredFaqs.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl">
                                    <p className="text-gray-400 mb-4">No results for "{searchTerm}"</p>
                                    <button onClick={() => setSearchTerm('')} className="text-primary font-bold">Show all questions</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-6 p-8 bg-surface rounded-3xl border border-gray-100 items-start group hover:border-primary/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                                <MessageCircle size={28} />
                            </div>
                            <div>
                                <h4 className="text-navy font-bold text-xl mb-2">Chat with an Expert</h4>
                                <p className="text-gray-500 text-sm mb-4">Get instant answers for small queries on WhatsApp.</p>
                                <a href="https://wa.me/919327002340" className="text-primary font-bold text-sm flex items-center gap-1">Message Now <ArrowRight size={14} /></a>
                            </div>
                        </div>

                        <div className="flex gap-6 p-8 bg-surface rounded-3xl border border-gray-100 items-start group hover:border-primary/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 transition-transform group-hover:scale-110">
                                <Phone size={28} />
                            </div>
                            <div>
                                <h4 className="text-navy font-bold text-xl mb-2">Request a Callback</h4>
                                <p className="text-gray-500 text-sm mb-4">Leave your number and we'll call you back within 2 hours.</p>
                                <Link to="/contact" className="text-orange-600 font-bold text-sm flex items-center gap-1">Schedule Call <ArrowRight size={14} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
