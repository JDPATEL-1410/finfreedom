import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, Briefcase } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';

// Import images
import nitinPatel from '../../assets/team/nitin patel.png';
import anjaliPatel from '../../assets/team/anjali patel.png';
import anishiPatel from '../../assets/team/anishi patel.png';
import adityaBhavsar from '../../assets/team/aditya bhavshar.png';
import chetanPrajapati from '../../assets/team/chetan prajapati.png';
import priyankaMakwana from '../../assets/team/priyanka makwana.png';
import raviVanecha from '../../assets/team/ravi vanecha.png';
import raviSolanki from '../../assets/team/ravi solanki.png';
import bhavikDave from '../../assets/team/bhavik dave.png';
import niravVora from '../../assets/team/nirav vora.png';
import binalVaghela from '../../assets/team/binal vaghela.png';
import anilModi from '../../assets/team/anil modi.png';
import vimalHirwani from '../../assets/team/vimal hirwani.png';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    qualifications?: string;
    bio?: string;
}

interface TeamCategory {
    title: string;
    icon: typeof Users;
    members: TeamMember[];
}

const TEAM_CATEGORIES: TeamCategory[] = [
    {
        title: 'Founders & Directors',
        icon: Award,
        members: [
            {
                name: 'Nitin Patel',
                role: 'Founder & Director',
                image: nitinPatel,
                qualifications: 'B.E., DBM, CFP®',
                bio: 'A visionary leader with over 25 years of experience in financial markets, dedicated to empowering families with financial freedom through disciplined, goal-based investing.',
            },
            {
                name: 'Anjali Patel',
                role: 'Founder & Director',
                image: anjaliPatel,
                qualifications: 'Founder Member',
                bio: 'Strategist and co-founder driving the core values and mission of FinFreedom33 LLP since its inception.',
            },
            {
                name: 'Anishi Patel',
                role: 'Director',
                image: anishiPatel,
                qualifications: 'BBA',
                bio: 'Managing business development and strategic planning to ensure sustainable growth and client satisfaction.',
            },
        ]
    },
    {
        title: 'Sr. Executives',
        icon: Briefcase,
        members: [
            {
                name: 'Aditya Bhavsar',
                role: 'Sr. Executive',
                image: adityaBhavsar,
                qualifications: 'Master of Commerce',
                bio: 'Expert in operational excellence and advanced portfolio management strategies.',
            },
            {
                name: 'Chetan Prajapati',
                role: 'Sr. Executive',
                image: chetanPrajapati,
                qualifications: 'MBA (Finance)',
                bio: 'Specializing in market research and strategic implementation for high-net-worth individuals.',
            },
        ]
    },
    {
        title: 'Relationship Managers',
        icon: Users,
        members: [
            { name: 'Priyanka Makwana', role: 'Relationship Manager', image: priyankaMakwana },
            { name: 'Ravi Vanecha', role: 'Relationship Manager', image: raviVanecha },
            { name: 'Ravi Solanki', role: 'Relationship Manager', image: raviSolanki },
            { name: 'Vimal Hirwani', role: 'Relationship Manager', image: vimalHirwani },
            { name: 'Vipul Solanki', role: 'Relationship Manager', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80' },
            { name: 'Drishti Ahuja', role: 'Relationship Manager', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' },
            { name: 'Bhavik Dave', role: 'Relationship Manager', image: bhavikDave },
        ]
    },
    {
        title: 'Operations & Accounting',
        icon: Briefcase,
        members: [
            { name: 'Nirav Vora', role: 'Back Office', image: niravVora },
            { name: 'Binal Vaghela', role: 'Back Office', image: binalVaghela },
            { name: 'Anil Modi', role: 'Accountant', image: anilModi },
        ]
    }
];

const categoryColors: Record<string, { bg: string; badge: string; dot: string }> = {
    'Founders & Directors': { bg: 'from-blue-600 to-indigo-700', badge: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
    'Sr. Executives':       { bg: 'from-violet-600 to-purple-700', badge: 'bg-violet-50 text-violet-700', dot: 'bg-violet-500' },
    'Relationship Managers':{ bg: 'from-teal-600 to-emerald-700', badge: 'bg-teal-50 text-teal-700', dot: 'bg-teal-500' },
    'Operations & Accounting':{ bg: 'from-amber-500 to-orange-600', badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
};

export default function Team() {
    return (
        <>
            <Helmet>
                <title>Our Team | FinFreedom33 LLP – Meet Your Advisors</title>
                <meta name="description" content="Meet the experts behind FinFreedom33. A dedicated team of professionals committed to shielding and growing your wealth." />
            </Helmet>

            <PageHeader
                title="The Minds Behind Your Wealth"
                subtitle="A team of dedicated professionals committed to shielding and growing your hard-earned money"
                heroUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
                heroAlt="FinFreedom33 Team"
                breadcrumbs={[{ label: 'About', path: '/about' }, { label: 'Our Team' }]}
            />

            {/* Intro strip */}
            <div className="bg-surface border-b border-gray-100 py-10">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-8 justify-center">
                        {[
                            { icon: Users, value: '20+', label: 'Team Members' },
                            { icon: Award, value: '25+', label: 'Years Experience' },
                            { icon: CheckCircle2, value: '8000+', label: 'Families Served' },
                            { icon: Briefcase, value: '4', label: 'Expert Divisions' },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 px-7 py-5">
                                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                                    <Icon size={22} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-display font-bold text-navy leading-none">{value}</p>
                                    <p className="text-gray-400 text-sm mt-0.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="section bg-white">
                <div className="container-custom space-y-28">
                    {TEAM_CATEGORIES.map((category) => {
                        const colors = categoryColors[category.title] ?? categoryColors['Sr. Executives'];
                        const Icon = category.icon;
                        const isFounders = category.title === 'Founders & Directors';

                        return (
                            <div key={category.title}>
                                {/* Section Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-5 mb-14"
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shrink-0 shadow-lg`}>
                                        <Icon size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-navy">{category.title}</h3>
                                        <p className="text-gray-400 text-sm mt-0.5">{category.members.length} member{category.members.length > 1 ? 's' : ''}</p>
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-gray-200 to-transparent flex-1" />
                                </motion.div>

                                {/* Cards */}
                                {isFounders ? (
                                    // — Founders: large horizontal "feature" cards
                                    <div className="flex flex-col gap-8">
                                        {category.members.map((member, i) => (
                                            <motion.div
                                                key={member.name}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                                className="group"
                                            >
                                                <div className={`flex flex-col ${i % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'} bg-white rounded-[2rem] shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100`}>
                                                    {/* Photo */}
                                                    <div className="sm:w-72 lg:w-80 shrink-0 relative overflow-hidden">
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-72 sm:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className={`absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r ${i % 2 === 1 ? 'sm:bg-gradient-to-l' : ''} from-white/10 to-transparent`} />
                                                    </div>
                                                    {/* Content */}
                                                    <div className="flex flex-col justify-center p-8 lg:p-12 flex-1">
                                                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full w-fit mb-4 ${colors.badge}`}>
                                                            {member.role}
                                                        </span>
                                                        <h4 className="text-navy font-display font-bold text-3xl mb-2">{member.name}</h4>
                                                        {member.qualifications && (
                                                            <p className="text-primary font-semibold text-sm mb-5">{member.qualifications}</p>
                                                        )}
                                                        {member.bio && (
                                                            <p className="text-gray-500 leading-relaxed text-base">{member.bio}</p>
                                                        )}
                                                        <div className="mt-6 flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">FinFreedom33 LLP</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    // — Others: compact cards grid
                                    <div className={`flex flex-wrap justify-center gap-6`}>
                                        {category.members.map((member, i) => (
                                            <motion.div
                                                key={member.name}
                                                initial={{ opacity: 0, y: 24 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                                viewport={{ once: true }}
                                                className="group w-40 sm:w-44 lg:w-48 shrink-0"
                                            >
                                                <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 overflow-hidden">
                                                    {/* Image */}
                                                    <div className="relative aspect-[3/4] overflow-hidden">
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        {/* Subtle bottom fade */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                                        {/* Name overlay */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                                            <h4 className="text-white font-display font-bold text-base leading-tight">{member.name}</h4>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 block opacity-90 ${
                                                                category.title === 'Relationship Managers' ? 'text-teal-300' :
                                                                category.title === 'Operations & Accounting' ? 'text-amber-300' :
                                                                'text-blue-200'
                                                            }`}>
                                                                {member.role}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* Bottom bar */}
                                                    {member.qualifications && (
                                                        <div className="px-4 py-3 border-t border-gray-50">
                                                            <p className="text-primary text-[11px] font-semibold truncate">{member.qualifications}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-surface overflow-hidden">
                <div className="container-custom">
                    <div className="bg-navy rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
                        <div className="relative z-10 text-white">
                            <p className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-4">Get in Touch</p>
                            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Ready to Grow Your Wealth?</h2>
                            <p className="text-blue-200 mb-10 max-w-lg mx-auto leading-relaxed">Our experts are here to guide you through every financial milestone. Book a free consultation today.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="/contact" className="btn-secondary btn-lg">Schedule a Meeting</a>
                                <a href="tel:+919327002340" className="btn-outline-white btn-lg">Call Us Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
