import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | FinFreedom33</title>
            </Helmet>

            <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-12">
                <div className="container-custom max-w-2xl text-center">
                    <div className="relative mb-8">
                        <h1 className="text-[180px] font-display font-black text-navy/5 leading-none select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-full shadow-premium">
                                <Search size={64} className="text-primary animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-navy font-display font-bold text-3xl md:text-4xl mb-6">Oops! Lost in the Market?</h2>
                    <p className="text-gray-500 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                        The page you are looking for might have been moved, renamed, or is temporarily unavailable.
                        Let's get you back on track to financial freedom.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/" className="btn-primary flex items-center gap-2 px-8 py-4 w-full sm:w-auto">
                            <Home size={20} /> Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="btn-outline flex items-center gap-2 px-8 py-4 w-full sm:w-auto"
                        >
                            <ArrowLeft size={20} /> Go Back
                        </button>
                    </div>

                    <div className="mt-20 pt-12 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'SIP Calculator', path: '/calculators/sip' },
                            { label: 'Our Services', path: '/services' },
                            { label: 'Market Research', path: '/research' },
                            { label: 'Expert Insights', path: '/blog' },
                        ].map(link => (
                            <Link key={link.path} to={link.path} className="text-sm font-semibold text-gray-400 hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
