import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight, Shield, TrendingUp, Award } from 'lucide-react';

const FOOTER_SERVICES = [
    { label: 'Mutual Funds', path: '/services/mutual-funds' },
    { label: 'Insurance', path: '/services/insurance' },
    { label: 'Equity & Stocks', path: '/services/stocks' },
    { label: 'Financial Planning', path: '/services/financial-planning' },
    { label: 'Retirement Planning', path: '/services/retirement' },
    { label: 'Taxation & ELSS', path: '/services/taxation' },
];

const FOOTER_QUICK = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/about/team' },
    { label: 'Our Philosophy', path: '/about/philosophy' },
    { label: 'Fund Research', path: '/research' },
    { label: 'Risk Profiling', path: '/risk-profile' },
    { label: 'Investment Blog', path: '/blog' },
];

const FOOTER_CALCULATORS = [
    { label: 'SIP Calculator', path: '/calculators/sip' },
    { label: 'Lumpsum Calculator', path: '/calculators/lumpsum' },
    { label: 'SWP Calculator', path: '/calculators/swp' },
    { label: 'Retirement Planner', path: '/calculators/retirement' },
    { label: 'Goal Planning', path: '/calculators/goal' },
    { label: 'Inflation Calculator', path: '/calculators/inflation' },
];

const FOOTER_LEGAL = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Disclosures', path: '/disclosures' },
    { label: 'FAQs', path: '/faqs' },
];

export default function Footer() {
    return (
        <footer className="bg-[#050e1d] text-white relative overflow-hidden" role="contentinfo">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Newsletter bar */}
            <div className="relative border-b border-white/5">
                <div className="container-custom py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <p className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">Stay Ahead of the Markets</p>
                            <h3 className="text-white font-display font-bold text-2xl">Get Weekly Market Insights</h3>
                            <p className="text-blue-300/70 text-sm mt-1">Curated financial tips, fund updates, and investment strategies.</p>
                        </div>
                        <form
                            className="flex gap-2 w-full max-w-md"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-5 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-blue-300/50 focus:outline-none focus:border-primary focus:bg-white/12 transition-all text-sm"
                                aria-label="Email for newsletter"
                            />
                            <button
                                type="submit"
                                className="shrink-0 bg-secondary hover:bg-secondary/90 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm flex items-center gap-2"
                            >
                                Subscribe
                                <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Trust badges strip */}
            <div className="border-b border-white/5">
                <div className="container-custom py-6">
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                        {[
                            { icon: Shield, text: 'AMFI Registered MFD', sub: 'ARN No. 144870' },
                            { icon: Award, text: 'CFP® Certified', sub: 'FPSB India, Since 2009' },
                            { icon: TrendingUp, text: '₹1800 Cr+ AUA', sub: 'Assets Under Advisory' },
                        ].map(({ icon: Icon, text, sub }) => (
                            <div key={text} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center shrink-0">
                                    <Icon size={16} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold leading-none">{text}</p>
                                    <p className="text-blue-400/60 text-[11px] mt-0.5">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main footer grid */}
            <div className="relative py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10">

                        {/* Brand column — wider */}
                        <div className="xl:col-span-4">
                            <Link to="/" className="flex flex-col mb-6 w-fit" aria-label="FinFreedom33 Home">
                                <div className="flex items-baseline gap-0.5 whitespace-nowrap">
                                    <span className="font-serif font-bold text-white text-3xl tracking-tight leading-none">FinFreedom</span>
                                    <span className="font-serif font-bold text-secondary text-3xl leading-none">33</span>
                                </div>
                                <span className="text-blue-300/60 text-[8px] font-bold tracking-[0.04em] uppercase leading-none mt-2 w-full block"
                                    style={{ textAlignLast: 'justify', textAlign: 'justify' }}>
                                    AMFI Registered Mutual Fund Distributor
                                </span>
                            </Link>

                            <p className="text-blue-200/70 text-sm leading-relaxed mb-6 max-w-sm">
                                Helping individuals and families achieve financial freedom through disciplined, goal-based investing since 1999. We are not just advisors — we are your lifelong financial partners.
                            </p>

                            {/* Contact info */}
                            <div className="space-y-3 mb-8">
                                <a href="tel:+919327002340" className="flex items-center gap-3 text-blue-200/80 hover:text-white transition-colors text-sm group">
                                    <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                        <Phone size={14} className="text-secondary" />
                                    </div>
                                    <span>+91 93270 02340</span>
                                </a>
                                <a href="mailto:nitin@finfreedom33.com" className="flex items-center gap-3 text-blue-200/80 hover:text-white transition-colors text-sm group">
                                    <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                        <Mail size={14} className="text-secondary" />
                                    </div>
                                    <span>nitin@finfreedom33.com</span>
                                </a>
                                <div className="flex items-start gap-3 text-blue-200/80 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5">
                                        <MapPin size={14} className="text-secondary" />
                                    </div>
                                    <span>A-33, North Park Villa, Shantigram, Ahmedabad 382421</span>
                                </div>
                            </div>

                            {/* Social icons */}
                            <div className="flex items-center gap-2">
                                {[
                                    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
                                    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
                                    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
                                    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
                                ].map(({ icon: Icon, href, label, color }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className={`w-9 h-9 rounded-xl bg-white/8 border border-white/8 flex items-center justify-center ${color} hover:border-transparent transition-all duration-300`}
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div className="xl:col-span-2">
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-secondary inline-block rounded" />
                                Services
                            </h4>
                            <ul className="space-y-2.5">
                                {FOOTER_SERVICES.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200/70 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                                        >
                                            <ArrowRight size={11} className="text-secondary/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="xl:col-span-2">
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-secondary inline-block rounded" />
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5">
                                {FOOTER_QUICK.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200/70 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                                        >
                                            <ArrowRight size={11} className="text-secondary/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Calculators */}
                        <div className="xl:col-span-2">
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-secondary inline-block rounded" />
                                Calculators
                            </h4>
                            <ul className="space-y-2.5">
                                {FOOTER_CALCULATORS.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200/70 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                                        >
                                            <ArrowRight size={11} className="text-secondary/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="xl:col-span-2">
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-secondary inline-block rounded" />
                                Legal & Info
                            </h4>
                            <ul className="space-y-2.5 mb-8">
                                {FOOTER_LEGAL.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200/70 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                                        >
                                            <ArrowRight size={11} className="text-secondary/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Mini CTA */}
                            <div className="bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 rounded-2xl p-5">
                                <p className="text-white font-bold text-sm mb-2">Free Consultation</p>
                                <p className="text-blue-300/70 text-xs mb-4">Talk to a CFP-certified advisor today.</p>
                                <Link
                                    to="/contact"
                                    className="flex items-center gap-1.5 text-secondary font-bold text-xs hover:gap-2.5 transition-all"
                                >
                                    Book Now <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="border-t border-white/5 py-6">
                <div className="container-custom">
                    <p className="text-blue-300/40 text-xs text-center leading-relaxed max-w-4xl mx-auto">
                        Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
                        Past performance is not indicative of future results. FinFreedom33 LLP is an AMFI registered Mutual Fund Distributor.
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 py-5">
                <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-blue-300/50 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} FinFreedom33 LLP. All rights reserved. | AMFI Reg. MFD | ARN: 144870
                    </p>
                    <div className="flex items-center gap-4">
                        {FOOTER_LEGAL.slice(0, 3).map((item) => (
                            <Link key={item.path} to={item.path} className="text-blue-300/40 hover:text-white text-xs transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
