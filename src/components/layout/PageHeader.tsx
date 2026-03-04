import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    heroUrl: string;
    heroAlt: string;
    breadcrumbs?: BreadcrumbItem[];
    centered?: boolean;
    children?: React.ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    heroUrl,
    heroAlt,
    breadcrumbs,
    centered = false,
    children,
}: PageHeaderProps) {
    return (
        <div className="relative w-full min-h-[320px] md:min-h-[380px] overflow-hidden flex items-center">
            {/* Background Image */}
            <img
                src={heroUrl}
                alt={heroAlt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="eager"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 hero-overlay" />

            {/* Content */}
            <div className="relative z-10 container-custom py-12 md:py-16 w-full">
                <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav aria-label="Breadcrumb" className="mb-4">
                            <ol className="flex flex-wrap items-center gap-1.5">
                                <li>
                                    <Link to="/" className="text-blue-200 hover:text-white text-sm transition-colors">
                                        Home
                                    </Link>
                                </li>
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={index} className="flex items-center gap-1.5">
                                        <ChevronRight size={14} className="text-blue-300/60" />
                                        {crumb.path && index < breadcrumbs.length - 1 ? (
                                            <Link to={crumb.path} className="text-blue-200 hover:text-white text-sm transition-colors">
                                                {crumb.label}
                                            </Link>
                                        ) : (
                                            <span className="text-white text-sm font-medium">{crumb.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}

                    {/* Title */}
                    <h1 className="text-white font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-2xl">
                            {subtitle}
                        </p>
                    )}

                    {/* Optional children (CTAs etc) */}
                    {children && <div className="mt-6">{children}</div>}
                </div>
            </div>
        </div>
    );
}
