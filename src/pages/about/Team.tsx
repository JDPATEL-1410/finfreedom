import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Award, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';

const TEAM = [
    {
        name: 'Nitin J.',
        role: 'Founder & Principal Advisor',
        qualifications: 'B.E. (LDRP), DBM (Bhavans), CFP (FPSB India)',
        bio: 'With over 25 years in the financial markets, Nitin achieved financial freedom at age 33. His life mission is to help 10,000 families achieve the same through disciplined, goal-based investing.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', // Replace with real one later
        expertise: ['Wealth Management', 'Retirement Planning', 'Equity Research'],
        social: { linkedin: '#', twitter: '#' }
    },
    {
        name: 'Aditya S.',
        role: 'Associate Financial Planner',
        qualifications: 'M.Com, NISM Certified (V-A)',
        bio: 'Aditya specializes in mutual fund operations and portfolio tracking. He ensures that every client portfolio is execution-ready and aligned with their target asset allocation.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', // Replace with real one later
        expertise: ['Mutual Fund Ops', 'Insurance Planning', 'Goal Tracking'],
        social: { linkedin: '#', twitter: '#' }
    },
];

export default function Team() {
    return (
        <>
            <Helmet>
                <title>Our Team | FinFreedom33 LLP – Meet Your Advisors</title>
                <meta name="description" content="Meet the experts behind FinFreedom33. Led by a CFP professional with 25+ years of experience in the Indian financial markets." />
            </Helmet>

            <PageHeader
                title="The Minds Behind Your Wealth"
                subtitle="A team of certified professionals dedicated to shielding and growing your hard-earned money"
                heroUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
                heroAlt="FinFreedom33 Team"
                breadcrumbs={[{ label: 'About', path: '/about' }, { label: 'Our Team' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="section-label">Our Leadership</p>
                        <h2 className="text-navy mb-6">Experience You Can Trust</h2>
                        <div className="divider mx-auto mb-6" />
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We are not just distributors; we are partners in your financial journey. Our team combines engineering-led analytical rigor with deep market experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="card overflow-hidden border-0 shadow-premium group-hover:shadow-2xl transition-all duration-500 rounded-[40px]">
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />

                                        {/* Social Links Overlay */}
                                        <div className="absolute bottom-6 right-6 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                                            <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-white text-navy flex items-center justify-center hover:bg-primary hover:text-white shadow-lg transition-all"><Linkedin size={18} /></a>
                                            <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-white text-navy flex items-center justify-center hover:bg-primary hover:text-white shadow-lg transition-all"><Twitter size={18} /></a>
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-navy font-display font-bold text-2xl mb-1">{member.name}</h3>
                                                <p className="text-primary font-bold text-sm tracking-widest uppercase">{member.role}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-primary">
                                                <Award size={24} />
                                            </div>
                                        </div>

                                        <p className="text-[10px] bg-blue-50 text-primary font-bold px-3 py-1 rounded-full inline-block mb-4">
                                            {member.qualifications}
                                        </p>

                                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                            {member.bio}
                                        </p>

                                        <div className="pt-6 border-t border-gray-100">
                                            <p className="text-xs font-bold text-navy uppercase tracking-widest mb-3">Core Expertise</p>
                                            <div className="flex flex-wrap gap-2">
                                                {member.expertise.map(exp => (
                                                    <span key={exp} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 bg-surface px-3 py-1.5 rounded-lg border border-gray-100">
                                                        <CheckCircle2 size={12} className="text-green-500" />
                                                        {exp}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface overflow-hidden">
                <div className="container-custom">
                    <div className="bg-navy rounded-[3rem] p-10 md:p-20 text-center relative">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10">
                            <h2 className="text-white font-display font-bold text-3xl md:text-4xl mb-6">Ready to work with the experts?</h2>
                            <p className="text-blue-200 mb-10 max-w-lg mx-auto">Book your introductory discovery call today and let's discuss your financial roadmap.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/contact" className="btn-secondary btn-lg">Schedule Discovery Call</Link>
                                <a href="mailto:contact@finfreedom33.com" className="btn-outline-white btn-lg flex items-center gap-2"><Mail size={18} /> Email Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
