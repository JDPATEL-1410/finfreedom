import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { getImage } from '../data/images';
import { contactService } from '../services/contactService';

const contactSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    subject: z.string().min(1, 'Please select a subject'),
    message: z.string().min(10, 'Message should be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SUBJECTS = [
    'Mutual Fund Advisory',
    'Life/Health Insurance',
    'Retirement Planning',
    'Financial Planning',
    'Risk Profiling',
    'Corporate Training',
    'Other Query'
];

const img = getImage('contact');

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            subject: ''
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await contactService.submitForm(data);
            setIsSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | FinFreedom33 LLP – Wealth Management Experts</title>
                <meta name="description" content="Reach out to FinFreedom33 for expert financial advice. Located in Ahmedabad, Gujarat. Book a free consultation today." />
            </Helmet>

            <PageHeader
                title="Get in Touch"
                subtitle="Start your journey to financial freedom today with a free consultation"
                heroUrl={img.heroUrl}
                heroAlt="Contact us"
                breadcrumbs={[{ label: 'Contact' }]}
            />

            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h3 className="text-navy font-display font-bold text-2xl mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <Phone size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Call Us</p>
                                            <p className="text-navy font-semibold">+91-9327002340</p>
                                            <p className="text-navy font-semibold">+91-9925202340</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                            <Mail size={22} className="text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Email Us</p>
                                            <p className="text-navy font-semibold">nitin@finfreedom33.com</p>
                                            <p className="text-navy font-semibold">contact@finfreedom33.com</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                                            <MapPin size={22} className="text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Visit Us</p>
                                            <p className="text-navy font-semibold leading-relaxed">
                                                A-33, North Park Villa, <br />
                                                Beside Belvedere Golf Club, Shantigram Township, <br />
                                                Near Vaishnodevi Circle, Ahmedabad - 382421
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-surface rounded-3xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock size={20} className="text-primary" />
                                    <h4 className="text-navy font-semibold">Business Hours</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Mon - Fri</span>
                                        <span className="text-navy font-medium">9:30 AM - 6:30 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Saturday</span>
                                        <span className="text-navy font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Sunday</span>
                                        <span className="text-navy font-semibold text-primary">By Appointment Only</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="card shadow-premium p-8 md:p-10 border-0">
                                <div className="mb-8">
                                    <h3 className="text-navy font-display font-bold text-2xl mb-2">Send us a Message</h3>
                                    <p className="text-gray-500 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
                                </div>

                                <AnimatePresence mode="wait">
                                    {isSuccess ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h4 className="text-navy font-bold text-2xl mb-2">Message Sent!</h4>
                                            <p className="text-gray-600 mb-8">
                                                Thank you for reaching out. Nitin or one of our senior advisors will contact you shortly.
                                            </p>
                                            <button
                                                onClick={() => setIsSuccess(false)}
                                                className="btn-outline"
                                            >
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="form-label">Full Name</label>
                                                    <input
                                                        {...register('fullName')}
                                                        type="text"
                                                        className={`form-input ${errors.fullName ? 'border-red-300' : ''}`}
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                                                </div>
                                                <div>
                                                    <label className="form-label">Phone Number</label>
                                                    <input
                                                        {...register('phone')}
                                                        type="tel"
                                                        className={`form-input ${errors.phone ? 'border-red-300' : ''}`}
                                                        placeholder="+91 98765 43210"
                                                    />
                                                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="form-label">Email Address</label>
                                                    <input
                                                        {...register('email')}
                                                        type="email"
                                                        className={`form-input ${errors.email ? 'border-red-300' : ''}`}
                                                        placeholder="john@example.com"
                                                    />
                                                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                                                </div>
                                                <div>
                                                    <label className="form-label">Purpose of Inquiry</label>
                                                    <select
                                                        {...register('subject')}
                                                        className={`form-input appearance-none ${errors.subject ? 'border-red-300' : ''}`}
                                                    >
                                                        <option value="" disabled>Select a subject</option>
                                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                    {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="form-label">How can we help you?</label>
                                                <textarea
                                                    {...register('message')}
                                                    rows={5}
                                                    className={`form-input py-4 resize-none ${errors.message ? 'border-red-300' : ''}`}
                                                    placeholder="Tell us about your financial goals or any specific questions you have..."
                                                />
                                                {errors.message && <p className="form-error">{errors.message.message}</p>}
                                            </div>

                                            {error && (
                                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-700 text-sm">
                                                    <AlertCircle size={18} className="shrink-0" />
                                                    <p>{error}</p>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 group"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <RefreshCw size={20} className="animate-spin" />
                                                        Sending Message...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[450px] w-full relative">
                <iframe
                    title="FinFreedom33 Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.9554200356188!2d72.53232847437252!3d23.171827110743664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2960e7266de5%3A0x6513e96ce5fa6852!2sFinFreedom33%20LLP!5e0!3m2!1sen!2sin!4v1772795456598!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                />
            </section>
        </>
    );
}
