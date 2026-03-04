

export default function WhatsAppFloat() {
    const phoneNumber = '919327002340';
    const message = encodeURIComponent('Hello! I would like to know more about your investment services.');

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            className="fixed bottom-8 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-[1.25rem] shadow-2xl hover:bg-[#128C7E] hover:scale-110 active:scale-95 transition-all duration-500 group border-2 border-white/20 ring-4 ring-[#25D366]/10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
        >
            <span className="absolute right-full mr-5 bg-white text-navy px-4 py-2.5 rounded-2xl text-[11px] font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-gray-100 ring-1 ring-gray-100">
                Talk to our Advisor
            </span>
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.395 0 .01 5.388 0 12.044a11.778 11.778 0 001.57 5.925L0 24l6.117-1.604a11.764 11.764 0 005.926 1.608h.005c6.654 0 12.04-5.388 12.045-12.045a11.83 11.83 0 00-3.575-8.528" />
            </svg>
            <span className="absolute inset-0 rounded-[1.25rem] bg-white opacity-0 group-hover:opacity-20 animate-ping" />
        </a>
    );
}
