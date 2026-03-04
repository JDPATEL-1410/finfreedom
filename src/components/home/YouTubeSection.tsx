import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, ArrowRight, Video } from 'lucide-react';

const VIDEOS = [
    {
        id: '1L75VIKA09A',
        title: 'Building Wealth: The FinFreedom33 Story',
        description: 'An inspiring journey of Nitin Patel—an engineer who retired at 33 and built a legacy of financial freedom.',
        duration: '12:45'
    },
    {
        id: 'MWXJB5zyYww',
        title: 'Understanding Early Retirement',
        description: 'Learn the principles of retiring early and how to prepare for a life of freedom.',
        duration: '08:20'
    },
    {
        id: 'UG4BQo164vI',
        title: 'Starting Your Investment Journey',
        description: 'A step-by-step guide for beginners to start their path towards wealth creation.',
        duration: '10:15'
    },
    {
        id: 'OXRhF4RPCo4',
        title: 'Financial Wellbeing for Women',
        description: 'Empowering women to take control of their finances and build their own financial future.',
        duration: '15:30'
    },
    {
        id: 'dP4ON4C58Ok',
        title: 'FinFreedom Lifestyle & Future',
        description: 'Insights into the lifestyle of financial independence and planning for the long term.',
        duration: '09:45'
    },
    {
        id: 'akjg-aavdww',
        title: 'The Power of Mutual Funds',
        description: 'Why mutual funds are the ideal vehicle for long-term compounding and wealth.',
        duration: '11:10'
    }
];

export default function YouTubeSection() {
    const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);

    return (
        <section className="section bg-white overflow-hidden" aria-label="Featured Videos">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="section-label">Learning Center</p>
                        <h2 className="text-navy">Watch & Learn</h2>
                        <div className="divider mt-4" />
                    </motion.div>
                    <motion.a
                        href="https://www.youtube.com/@FinFreedom33"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline btn-sm shrink-0 flex items-center gap-2 group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Youtube className="text-red-600 group-hover:scale-110 transition-transform" />
                        Explore Our Channel
                        <ArrowRight size={14} />
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Main Video Player */}
                    <motion.div
                        className="lg:col-span-8 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-premium bg-navy ring-1 ring-gray-100/50">
                            <AnimatePresence mode="wait">
                                <motion.iframe
                                    key={selectedVideo.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=0&rel=0&modestbranding=1&showinfo=0`}
                                    title={selectedVideo.title}
                                    className="absolute inset-0 w-full h-full border-0 shadow-2xl"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </AnimatePresence>
                        </div>
                        <div className="mt-8 p-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">Featured Content</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-gray-400 text-xs font-medium">{selectedVideo.duration} mins</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-navy mb-4 leading-tight">
                                {selectedVideo.title}
                            </h3>
                            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl">
                                {selectedVideo.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Playlist Sidebar */}
                    <motion.div
                        className="lg:col-span-4 space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-surface/50 backdrop-blur-md rounded-[2rem] p-6 lg:p-8 border border-gray-100 shadow-sm max-h-[640px] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Video size={16} />
                                    </div>
                                    <span className="text-navy font-bold uppercase tracking-widest text-[11px]">Up Next</span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{VIDEOS.length} Videos</span>
                            </div>

                            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1 flex-1">
                                {VIDEOS.map((video) => (
                                    <button
                                        key={video.id}
                                        onClick={() => setSelectedVideo(video)}
                                        className={`w-full flex gap-4 p-4 rounded-2xl transition-all duration-500 text-left group relative ${selectedVideo.id === video.id
                                            ? 'bg-white shadow-xl shadow-primary/5 ring-1 ring-primary/10 translate-x-1'
                                            : 'hover:bg-white hover:shadow-lg hover:shadow-gray-200/50'
                                            }`}
                                    >
                                        <div className="relative shrink-0 w-24 sm:w-28 aspect-video rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-100">
                                            <img
                                                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {selectedVideo.id === video.id ? (
                                                <div className="absolute inset-0 bg-primary/40 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xl">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-primary scale-90 group-hover:scale-100 transition-transform">
                                                        <Play size={12} fill="currentColor" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/80 text-[9px] text-white font-bold backdrop-blur-sm">
                                                {video.duration}
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1 py-1">
                                            <p className={`text-xs sm:text-sm font-bold leading-snug mb-2 line-clamp-2 transition-colors duration-300 ${selectedVideo.id === video.id ? 'text-primary' : 'text-navy group-hover:text-primary'
                                                }`}>
                                                {video.title}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Financial Mastery</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA for Channel - Glassy Version */}
                        <div className="bg-navy rounded-[2rem] p-8 text-white overflow-hidden relative group border border-white/5 ring-1 ring-white/10">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform duration-500">
                                        <Youtube size={20} />
                                    </div>
                                    <h4 className="font-bold text-lg tracking-tight">Our YouTube Community</h4>
                                </div>
                                <p className="text-sm text-blue-100/70 mb-6 leading-relaxed">Join 1000+ investors. Get weekly insights on wealth creation and market strategies.</p>
                                <a
                                    href="https://www.youtube.com/@FinFreedom33"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-sm font-bold text-secondary group-hover:text-white transition-all duration-300"
                                >
                                    <span className="border-b-2 border-secondary/30 group-hover:border-white transition-colors">Visit Official Channel</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                                </a>
                            </div>
                            <Youtube
                                className="absolute -bottom-6 -right-6 text-white/5 group-hover:text-white/10 group-hover:rotate-12 transition-all duration-1000"
                                size={160}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
