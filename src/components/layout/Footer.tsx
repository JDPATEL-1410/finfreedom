import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const FOOTER_SERVICES = [
    { label: 'Mutual Funds', path: '/services/mutual-funds' },
    { label: 'Insurance', path: '/services/insurance' },
    { label: 'Equity & Stocks', path: '/services/stocks' },
    { label: 'Financial Planning', path: '/services/financial-planning' },
    { label: 'Retirement Planning', path: '/services/retirement' },
    { label: 'Taxation & ELSS', path: '/services/taxation' },
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
    { label: 'Commission Disclosure', path: '/disclosures' },
    { label: 'FAQs', path: '/faqs' },
];

export default function Footer() {
    return (
        <footer className="bg-navy text-white" role="contentinfo">
            {/* Newsletter bar */}
            <div className="bg-gradient-primary py-10">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-white font-display font-semibold text-xl mb-1">
                                Stay informed with market insights
                            </h3>
                            <p className="text-blue-200 text-sm">
                                Subscribe to receive curated financial news, market updates, and investment tips.
                            </p>
                        </div>
                        <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/15 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                                aria-label="Email for newsletter"
                            />
                            <button type="submit" className="btn-outline-white px-5 py-2.5 text-sm shrink-0">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="py-14">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Brand column */}
                        <div className="lg:col-span-1">
                            <Link to="/" className="flex flex-col mb-6 group w-fit" aria-label="Finfreedom33 Home">
                                <div className="flex items-baseline gap-0.5 whitespace-nowrap">
                                    <span className="font-serif font-bold text-white text-2xl tracking-tight leading-none">FinFreedom</span>
                                    <span className="font-serif font-bold text-secondary text-2xl leading-none">33</span>
                                </div>
                                <span
                                    className="text-blue-300 text-[7.5px] font-bold tracking-[0.02em] uppercase leading-none mt-1.5 w-full block"
                                    style={{ textAlignLast: 'justify', textAlign: 'justify' }}
                                >
                                    AMFI Registered Mutual Fund Distributor
                                </span>
                            </Link>
                            <p className="text-blue-200 text-sm leading-relaxed mb-5">
                                AMFI Registered Mutual Fund Distributor helping individuals and families achieve financial freedom through disciplined, goal-based investing since 1999.
                            </p>
                            <div className="space-y-2.5">
                                <a href="tel:+919327002340" className="flex items-start gap-2.5 text-blue-200 hover:text-white transition-colors text-sm">
                                    <Phone size={14} className="mt-0.5 shrink-0 text-secondary" />
                                    <span>+91-9327002340</span>
                                </a>
                                <a href="mailto:nitin@finfreedom33.com" className="flex items-start gap-2.5 text-blue-200 hover:text-white transition-colors text-sm">
                                    <Mail size={14} className="mt-0.5 shrink-0 text-secondary" />
                                    <span>nitin@finfreedom33.com</span>
                                </a>
                                <div className="flex items-start gap-2.5 text-blue-200 text-sm">
                                    <MapPin size={14} className="mt-0.5 shrink-0 text-secondary" />
                                    <span>Ahmedabad, Gujarat, India</span>
                                </div>
                            </div>
                            {/* Socials */}
                            <div className="flex items-center gap-3 mt-6">
                                {[
                                    { icon: Facebook, href: '#', label: 'Facebook' },
                                    { icon: Twitter, href: '#', label: 'Twitter' },
                                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                    { icon: Youtube, href: '#', label: 'YouTube' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                                    >
                                        <Icon size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Our Services</h4>
                            <ul className="space-y-2.5">
                                {FOOTER_SERVICES.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5 transition-colors group"
                                        >
                                            <ArrowRight size={12} className="text-secondary group-hover:translate-x-0.5 transition-transform" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Calculators */}
                        <div>
                            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Calculators</h4>
                            <ul className="space-y-2.5">
                                {FOOTER_CALCULATORS.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5 transition-colors group"
                                        >
                                            <ArrowRight size={12} className="text-secondary group-hover:translate-x-0.5 transition-transform" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal & Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Legal & Info</h4>
                            <ul className="space-y-2.5">
                                {FOOTER_LEGAL.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5 transition-colors group"
                                        >
                                            <ArrowRight size={12} className="text-secondary group-hover:translate-x-0.5 transition-transform" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <Link
                                    to="/research"
                                    className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors group"
                                >
                                    <span>Fund Research</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link
                                    to="/risk-profile"
                                    className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors group mt-2"
                                >
                                    <span>Risk Profiling</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link
                                    to="/blog"
                                    className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors group mt-2"
                                >
                                    <span>Investment Blog</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 py-5">
                <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-blue-300 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} FinFreedom33 LLP. All rights reserved. | AMFI Registered Mutual Fund Distributor | ARN No.: [ARN Number]
                    </p>
                    <p className="text-blue-300/60 text-xs text-center">
                        Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully.
                    </p>
                </div>
            </div>
        </footer>
    );
}
