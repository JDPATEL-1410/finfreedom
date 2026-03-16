import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Mail, Phone, CheckCircle2 } from 'lucide-react';
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

const TEAM_CATEGORIES = [
    {
        title: 'Founders & Directors',
        members: [
            {
                name: 'Nitin Patel',
                role: 'Founder & Director',
                image: nitinPatel,
                qualifications: 'B.E., DBM, CFP®',
                bio: 'A visionary leader with over 25 years of experience in financial markets, dedicated to empowering families with financial freedom.'
            },
            {
                name: 'Anjali Patel',
                role: 'Founder & Director',
                image: anjaliPatel,
                qualifications: 'Founder Member',
                bio: 'Strategist and co-founder driving the core values and mission of FinFreedom33 since its inception.'
            },
            {
                name: 'Anishi Patel',
                role: 'Director',
                image: anishiPatel,
                qualifications: 'BBA',
                bio: 'Managing business development and strategic planning to ensure sustainable growth and client satisfaction.'
            },
        ]
    },
    {
        title: 'Sr. Executives',
        members: [
            {
                name: 'Aditya Bhavsar',
                role: 'Sr. Executive',
                image: adityaBhavsar,
                qualifications: 'Master of Commerce',
                bio: 'Expert in operational excellence and advanced portfolio management strategies.'
            },
            {
                name: 'Chetan Prajapati',
                role: 'Sr. Executive',
                image: chetanPrajapati,
                qualifications: 'MBA (Finance)',
                bio: 'Specializing in market research and strategic implementation for high-net-worth individuals.'
            },
        ]
    },
    {
        title: 'Relationship Managers',
        members: [
            { name: 'Priyanka Makwana', role: 'Relationship Manager', image: priyankaMakwana },
            { name: 'Ravi Vanecha', role: 'Relationship Manager', image: raviVanecha },
            { name: 'Ravi Solanki', role: 'Relationship Manager', image: raviSolanki },
            { name: 'Vipul Solanki', role: 'Relationship Manager', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80' },
            { name: 'Drishti Ahuja', role: 'Relationship Manager', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' },
            { name: 'Bhavik Dave', role: 'Relationship Manager', image: bhavikDave },
        ]
    },
    {
        title: 'Operations & Accounting',
        members: [
            { name: 'Nirav Vora', role: 'Back Office', image: niravVora },
            { name: 'Binal Vaghela', role: 'Back Office', image: binalVaghela },
            { name: 'Anil Modi', role: 'Accountant', image: anilModi },
        ]
    }
];

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

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="section-label">Our Leadership & Team</p>
                        <h2 className="text-navy mb-6">Experience You Can Trust</h2>
                        <div className="divider mx-auto mb-6" />
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We are not just consultants; we are partners in your financial journey. Our team combines professional expertise with a human-centric approach to wealth management.
                        </p>
                    </div>

                    {TEAM_CATEGORIES.map((category, catIdx) => (
                        <div key={category.title} className="mb-20 last:mb-0">
                            <div className="flex items-center gap-4 mb-10">
                                <h3 className="text-2xl font-display font-bold text-navy whitespace-nowrap">{category.title}</h3>
                                <div className="h-px bg-gray-100 w-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.members.map((member, i) => (
                                    <motion.div
                                        key={member.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <div className="card h-full flex flex-col overflow-hidden border-0 shadow-premium hover:shadow-2xl transition-all duration-500 rounded-3xl">
                                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                                <img 
                                                    src={member.image} 
                                                    alt={member.name} 
                                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>

                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="mb-4">
                                                    <h4 className="text-navy font-display font-bold text-xl mb-1">{member.name}</h4>
                                                    <p className="text-primary font-bold text-xs tracking-widest uppercase">{member.role}</p>
                                                    {'qualifications' in member && member.qualifications && (
                                                        <p className="text-[10px] bg-blue-50 text-primary font-bold px-3 py-1 rounded-full inline-block mt-3">
                                                            {member.qualifications}
                                                        </p>
                                                    )}
                                                </div>

                                                {'bio' in member && member.bio && (
                                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                                        {member.bio}
                                                    </p>
                                                )}

                                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                                        <CheckCircle2 size={12} className="text-green-500" />
                                                        Verified Expert
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <a href="mailto:contact@finfreedom33.com" className="text-gray-400 hover:text-primary transition-colors">
                                                            <Mail size={16} />
                                                        </a>
                                                        <a href="tel:+919825000000" className="text-gray-400 hover:text-primary transition-colors">
                                                            <Phone size={16} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section bg-surface overflow-hidden">
                <div className="container-custom">
                    <div className="bg-navy rounded-[3rem] p-10 md:p-20 text-center relative">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10 text-white">
                            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Connect With Our Team</h2>
                            <p className="text-blue-200 mb-10 max-w-lg mx-auto">Our experts are here to guide you through every financial milestone. Let's start a conversation today.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="/contact" className="btn-secondary btn-lg">Schedule a Meeting</a>
                                <a href="mailto:contact@finfreedom33.com" className="btn-outline-white btn-lg flex items-center gap-2">Send an Email</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
