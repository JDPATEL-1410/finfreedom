import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// Removed unused MessageCircle import
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import ScrollToTop from './ScrollToTop';
import ScrollProgress from '../common/ScrollProgress';


export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <ScrollProgress />
            <Navbar />
            <main id="main-content" className="flex-1" tabIndex={-1}>
                <Outlet />
            </main>
            <Footer />
            <WhatsAppFloat />
            <ScrollToTop />
        </div>

    );
}
