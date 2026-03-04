import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
    label: string;
    path: string;
}

interface NavItem {
    label: string;
    path: string;
    dropdown?: DropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Home', path: '/' },
    {
        label: 'About',
        path: '/about',
        dropdown: [
            { label: 'About Us', path: '/about' },
            { label: 'Our Team', path: '/about/team' },
            { label: 'Our Philosophy', path: '/about/philosophy' },
        ],
    },
    {
        label: 'Services',
        path: '/services',
        dropdown: [
            { label: 'All Services', path: '/services' },
            { label: 'Mutual Funds', path: '/services/mutual-funds' },
            { label: 'Insurance', path: '/services/insurance' },
            { label: 'Equity & Stocks', path: '/services/stocks' },
            { label: 'Financial Planning', path: '/services/financial-planning' },
            { label: 'Retirement Planning', path: '/services/retirement' },
            { label: 'Goal-Based Investing', path: '/services/goal-based' },
            { label: 'Taxation & ELSS', path: '/services/taxation' },
            { label: 'Fixed Deposits', path: '/services/fixed-deposits' },
        ],
    },
    {
        label: 'Calculators',
        path: '/calculators',
        dropdown: [
            { label: 'All Calculators', path: '/calculators' },
            { label: 'SIP Calculator', path: '/calculators/sip' },
            { label: 'Lumpsum Calculator', path: '/calculators/lumpsum' },
            { label: 'SWP Calculator', path: '/calculators/swp' },
            { label: 'Retirement Planner', path: '/calculators/retirement' },
            { label: 'Goal Planning', path: '/calculators/goal' },
            { label: 'Inflation Impact', path: '/calculators/inflation' },
            { label: 'Asset Allocation', path: '/calculators/allocation' },
        ],
    },
    {
        label: 'Insights',
        path: '/insights',
        dropdown: [
            { label: 'Market Research', path: '/research' },
            { label: 'Risk Profiling', path: '/risk-profile' },
            { label: 'Financial Blog', path: '/blog' },
        ],
    },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const handleDropdownEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveDropdown(label);
    };

    const handleDropdownLeave = () => {
        timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    return (
        <>
            {/* Top bar */}
            <div className="bg-navy text-white text-sm py-2 hidden md:block">
                <div className="container-custom flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href="tel:+919327002340" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
                            <Phone size={13} />
                            <span>+91-9327002340</span>
                        </a>
                        <a href="mailto:nitin@finfreedom33.com" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
                            <Mail size={13} />
                            <span>nitin@finfreedom33.com</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-xs">AMFI Registered Mutual Fund Distributor</span>
                        <Link to="/contact" className="bg-secondary text-white px-4 py-1 rounded-full text-xs font-semibold hover:bg-secondary-600 transition-colors">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <nav
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white shadow-nav border-b border-gray-100'
                    : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
                    }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-18">
                        <Link to="/" className="flex flex-col shrink-0 group w-fit" aria-label="Finfreedom33 Home">
                            <div className="flex items-baseline gap-0.5 whitespace-nowrap">
                                <span className="font-serif font-bold text-navy text-2xl tracking-tight leading-none">FinFreedom</span>
                                <span className="font-serif font-bold text-secondary text-2xl leading-none">33</span>
                            </div>
                            <span
                                className="text-navy text-[7.5px] font-bold tracking-[0.02em] uppercase leading-none mt-1.5 w-full block"
                                style={{ textAlignLast: 'justify', textAlign: 'justify' }}
                            >
                                AMFI Registered Mutual Fund Distributor
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                            {NAV_ITEMS.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    {item.dropdown ? (
                                        <button
                                            className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-surface text-sm ${location.pathname.startsWith(item.path) && item.path !== '/' ? 'text-primary' : ''
                                                }`}
                                            aria-expanded={activeDropdown === item.label}
                                            aria-haspopup="true"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            end={item.path === '/'}
                                            className={({ isActive }) =>
                                                `nav-link px-3 py-2 rounded-lg hover:bg-surface text-sm block ${isActive ? 'text-primary' : ''}`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    )}

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {item.dropdown && activeDropdown === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.18 }}
                                                className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-premium border border-gray-100 py-2 z-50"
                                                onMouseEnter={() => handleDropdownEnter(item.label)}
                                                onMouseLeave={handleDropdownLeave}
                                                role="menu"
                                            >
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.path}
                                                        to={sub.path}
                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-surface transition-colors"
                                                        role="menuitem"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link to="/contact" className="btn-primary btn-sm text-sm">
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={22} className="text-navy" /> : <Menu size={22} className="text-navy" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop blur when menu is open */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-[-1] lg:hidden"
                                onClick={() => setIsOpen(false)}
                            />

                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
                                id="mobile-menu"
                            >
                                <div className="container-custom py-6 space-y-2">
                                    {/* Mobile contact info */}
                                    <div className="grid grid-cols-2 gap-4 pb-6 mb-4 border-b border-gray-100">
                                        <a href="tel:+919327002340" className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface border border-gray-50 text-center group">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Phone size={18} />
                                            </div>
                                            <span className="text-xs font-semibold text-navy">Call Us</span>
                                        </a>
                                        <a href="mailto:nitin@finfreedom33.com" className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface border border-gray-50 text-center group">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <span className="text-xs font-semibold text-navy">Email Us</span>
                                        </a>
                                    </div>

                                    {NAV_ITEMS.map((item) => (
                                        <div key={item.label} className="py-0.5">
                                            {item.dropdown ? (
                                                <>
                                                    <button
                                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${mobileExpanded === item.label ? 'bg-surface text-primary' : 'text-navy hover:bg-surface'
                                                            }`}
                                                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                                                        aria-expanded={mobileExpanded === item.label}
                                                    >
                                                        <span className="font-semibold">{item.label}</span>
                                                        <ChevronDown
                                                            size={18}
                                                            className={`transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>
                                                    <AnimatePresence>
                                                        {mobileExpanded === item.label && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="ml-4 mt-1 space-y-1 overflow-hidden"
                                                            >
                                                                {item.dropdown.map((sub) => (
                                                                    <Link
                                                                        key={sub.path}
                                                                        to={sub.path}
                                                                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-surface rounded-lg transition-colors border-l-2 border-transparent hover:border-primary/30"
                                                                    >
                                                                        {sub.label}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <NavLink
                                                    to={item.path}
                                                    end={item.path === '/'}
                                                    className={({ isActive }) =>
                                                        `block px-4 py-3 rounded-xl font-semibold transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-navy hover:bg-surface'
                                                        }`
                                                    }
                                                >
                                                    {item.label}
                                                </NavLink>
                                            )}
                                        </div>
                                    ))}

                                    <div className="pt-6 mt-4 border-t border-gray-100 flex flex-col gap-3">
                                        <Link to="/contact" className="btn-primary w-full justify-center py-4 text-base">
                                            Book a Free Consultation
                                        </Link>
                                        <p className="text-center text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                                            AMFI Registered Mutual Fund Distributor
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
