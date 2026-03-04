import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Target, Users, ArrowRight, Quote } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';

const VALUES = [
    { icon: Target, title: 'Client-First Always', desc: 'Every recommendation we make is driven solely by what is best for our clients—not by commissions or product targets.' },
    { icon: Award, title: 'Unbiased Expertise', desc: 'As an independent advisor, we evaluate products across all AMCs and insurers to recommend only the most suitable options.' },
    { icon: CheckCircle2, title: 'Transparent Process', desc: 'Full disclosure of fees, commissions, and charges. No surprises, no fine print. Everything is clearly communicated.' },
    { icon: Users, title: 'Long-Term Relationships', desc: 'We build enduring partnerships with our clients, supporting them through every stage of their financial journey.' },
];

const MILESTONES = [
    { year: '1999', event: 'Achieved financial freedom at age 33 through disciplined investing' },
    { year: '2000', event: 'Founded the financial consultancy practice in Ahmedabad' },
    { year: '2009', event: 'Obtained CFP Certification from FPSB India' },
    { year: '2015', event: 'Registered as AMFI Mutual Fund Distributor' },
    { year: '2018', event: 'Expanded to serve clients across Gujarat and India' },
    { year: '2024', event: 'Rebranded as FinFreedom33 LLP with digital advisory capabilities' },
];

const img = getImage('about');

export default function About() {
    return (
        <>
            <Helmet>
                <title>About Us | FinFreedom33 LLP – Your Trusted Financial Advisor</title>
                <meta name="description" content="Learn about FinFreedom33 LLP – founded by a CFP-certified engineer who achieved financial freedom at 33. Over 25 years of trusted financial advisory services in India." />
            </Helmet>

            <PageHeader
                title="About FinFreedom33"
                subtitle="A story of passion, purpose, and the power of disciplined financial planning"
                heroUrl={img.heroUrl}
                heroAlt={img.heroAlt}
                breadcrumbs={[{ label: 'About Us' }]}
            />

            {/* Founder Story */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <p className="section-label">Our Foundation</p>
                            <h2 className="text-navy mb-4">A Hobby Turned a Lifelong Profession</h2>
                            <div className="divider mb-6" />

                            <blockquote className="relative pl-6 mb-6">
                                <Quote size={32} className="absolute top-0 left-0 text-primary/20" />
                                <p className="text-gray-600 italic leading-relaxed">
                                    "I describe my journey into finance as a hobby turned profession. As an engineering alumnus, I was always drawn to the analytical nature of investments. That curiosity led me to financial freedom at the age of 33—and since then, helping others achieve the same has been my calling."
                                </p>
                                <footer className="mt-3 text-sm font-semibold text-navy">— Nitin, Founder, FinFreedom33 LLP</footer>
                            </blockquote>

                            <p className="text-gray-500 mb-4 leading-relaxed">
                                An alumnus of LD College of Engineering, Ahmedabad, and Bhartiya Vidya Bhavan, Mumbai (Diploma in Business Management), Nitin's academic foundation is complemented by a Certified Financial Planner (CFP) certification from FPSB India obtained in 2009.
                            </p>
                            <p className="text-gray-500 mb-4 leading-relaxed">
                                The road from "layman investor" to "experienced financial consultant" has been one of constant learning, memorable experiences, and above all, an unwavering commitment to the belief in the power of compounding. Investing early—even in small amounts—can create transformative wealth over time.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Today, FinFreedom33 LLP serves hundreds of families across India, offering structured, disciplined, and goal-aligned financial solutions. Our advice remains agnostic—we evaluate every available product to recommend only what genuinely serves your interest.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                                alt="FinFreedom33 advisory team in discussion"
                                className="rounded-3xl shadow-premium w-full object-cover aspect-[4/3]"
                                loading="lazy"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="card card-body text-center">
                                    <div className="text-3xl font-display font-bold text-primary mb-1">25+</div>
                                    <div className="text-gray-500 text-sm">Years Experience</div>
                                </div>
                                <div className="card card-body text-center">
                                    <div className="text-3xl font-display font-bold text-primary mb-1">500+</div>
                                    <div className="text-gray-500 text-sm">Happy Investors</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="section-label">Our Principles</p>
                        <h2 className="text-navy mb-4">What Drives Everything We Do</h2>
                        <div className="divider mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card card-body text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <v.icon size={22} className="text-primary" />
                                </div>
                                <h3 className="text-navy font-semibold text-base mb-2">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services We Offer */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="section-label">Our Solutions</p>
                            <h2 className="text-navy mb-4">A Complete Spectrum of Financial Services</h2>
                            <div className="divider mb-6" />
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                We adopt a structured and disciplined approach, providing portfolio solutions that align with your specific requirements and life milestones. Our range includes best-in-class proprietary and third-party products, evaluated without bias across all available options.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                                {[
                                    'Mutual Fund Distribution', 'Insurance Advisory', 'Equity Investment',
                                    'Fixed Deposits', 'Financial Planning', 'Taxation & ELSS',
                                    'Retirement Planning', 'Goal-Based Investing'
                                ].map((s) => (
                                    <div key={s} className="flex items-center gap-3 text-sm text-gray-700">
                                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                                        <span className="font-medium">{s}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/services" className="btn-primary">
                                Explore All Services
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Timeline */}
                        <div>
                            <p className="section-label">Our Journey</p>
                            <div className="space-y-4">
                                {MILESTONES.map((m, i) => (
                                    <motion.div
                                        key={m.year}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        viewport={{ once: true }}
                                        className="flex gap-4"
                                    >
                                        <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                                            <span className="text-white font-bold text-xs text-center leading-tight">{m.year}</span>
                                        </div>
                                        <div className="flex-1 card card-body py-4">
                                            <p className="text-gray-700 text-sm">{m.event}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-gradient-primary py-14">
                <div className="container-custom text-center">
                    <h2 className="text-white font-display font-bold text-3xl mb-4">Ready to Partner With Us?</h2>
                    <p className="text-blue-200 mb-8 max-w-lg mx-auto">Meet our team and discover how we can craft a personalized financial plan tailored to your unique goals.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/contact" className="btn-secondary btn-lg w-full sm:w-auto">Book a Free Consultation</Link>
                        <Link to="/about/team" className="btn-outline-white btn-lg w-full sm:w-auto">Meet Our Team</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
