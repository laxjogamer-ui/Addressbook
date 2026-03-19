import React, { useState } from 'react';

const CardModal = ({ card, isOpen, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    if (!isOpen || !card) return null;

    // --- સુધારો: એડ્રેસ મેળવવા માટેનું સ્પેશિયલ ફંક્શન ---
    const getDisplayAddress = (addrData) => {
        // જો કોઈ ડેટા ન હોય તો ડિફોલ્ટ એડ્રેસ
        if (!addrData) return "123 Business Town, Ahmedabad, India";

        // જો ડેટા લિસ્ટ (Array) તરીકે હોય, તો પહેલું એડ્રેસ આપો
        if (Array.isArray(addrData)) {
            return addrData[0] || "";
        }

        // જો ડેટા સ્ટ્રિંગ તરીકે હોય (જેમ કે "['Address 1']")
        if (typeof addrData === 'string') {
            try {
                const parsed = JSON.parse(addrData);
                // પાર્સ કર્યા પછી જો Array હોય તો પહેલું એડ્રેસ
                if (Array.isArray(parsed)) return parsed[0];
                return parsed;
            } catch (e) {
                // જો JSON ન હોય તો સાદી સ્ટ્રિંગ પાછી આપો
                return addrData;
            }
        }
        return addrData;
    };
    // --------------------------------------------------

    // ડમી ડેટા સેટઅપ
    const data = {
        company_name: card.company_name || "ALPHA SOLUTIONS",
        tagline: card.tagline || "Innovating the Future of Business",
        owner_name: card.owner_name || "ARJUN SINGH",
        designation: card.manager_name || "Founder & Director",

        // મોબાઈલ નંબરમાં પણ જો લિસ્ટ હોય તો પહેલો નંબર લેવા માટે
        mobile: Array.isArray(card.mobile_numbers) ? card.mobile_numbers[0] : (card.mobile_numbers || "+91 98765 43210"),

        email: card.email || "arjun.singh@alphasolutions.com",
        website: card.website || "www.alphasolutions.com",

        // --- સુધારો: અહીંયા આપણે ઉપર બનાવેલું ફંક્શન કોલ કર્યું ---
        // CreateCard માં તમે 'addresses' નામથી ડેટા મોકલો છો, એટલે અહીં 'card.addresses' લીધું છે.
        address: getDisplayAddress(card.addresses),
        // -------------------------------------------------------

        about_us: card.about_us || "Alpha Solutions specializes to custom software development & digital transformation.",
        qr_code: card.qr_code,
        whatsapp: card.whatsapp || "+91 98765 43210",
        facebook: card.facebook || "alphasolutions",
        instagram: card.instagram || "alphasolutionsofficial",
        linkedin: card.linkedin || "alphasolutionsHQ"
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    const getSocialLink = (platform, handle) => {
        if (!handle) return '#';
        if (handle.startsWith('http')) return handle;
        const cleanHandle = handle.replace('/', '');

        switch (platform) {
            case 'facebook': return `https://www.facebook.com/${cleanHandle}`;
            case 'instagram': return `https://www.instagram.com/${cleanHandle}`;
            case 'linkedin': return `https://www.linkedin.com/in/${cleanHandle}`;
            case 'whatsapp': return `https://wa.me/${handle.replace(/\D/g, '')}`;
            default: return handle;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[9999] p-4 font-sans">
            <style>
                {`
                .perspective-1000 { perspective: 1500px; }
                .card-inner {
                    position: relative; width: 100%; height: 100%;
                    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform-style: preserve-3d;
                }
                .flipped { transform: rotateY(180deg); }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                }
                .font-hand { font-family: 'Brush Script MT', cursive, italic; }
                `}
            </style>

            <div className="relative w-full max-w-[550px]">
                <div
                    className="relative w-full aspect-[1.75/1] cursor-pointer perspective-1000"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div className={`card-inner ${isFlipped ? 'flipped' : ''} shadow-2xl rounded-xl`}>

                        {/* --- FRONT SIDE --- */}
                        <div className="backface-hidden bg-[#061539] text-white rounded-xl overflow-hidden flex flex-col border border-gray-700 p-6">

                            {/* Top: Logo & Company Name */}
                            <div className="flex-1 flex flex-col items-center justify-center pt-2">
                                <h2 className="text-xl font-bold text-[#F4D03F] uppercase tracking-wider">{data.company_name}</h2>
                                <p className="text-xs text-gray-300 font-hand tracking-wide opacity-80">{data.tagline}</p>
                            </div>

                            {/* Divider */}
                            <div className="w-[85%] mx-auto h-[1px] bg-[#F4D03F]/50 mb-3"></div>

                            {/* Bottom: Contact Grid */}
                            <div className="grid grid-cols-2 gap-4 items-end">
                                {/* Left: Person Info */}
                                <div className="text-left">
                                    <h3 className="text-lg font-bold text-[#F4D03F] uppercase leading-tight">{data.owner_name}</h3>
                                    <p className="text-[10px] text-white italic mb-2 opacity-80">{data.designation}</p>

                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={handleLinkClick}
                                        className="flex items-start gap-1 mt-1 hover:text-[#F4D03F] transition-colors group"
                                    >
                                        <span className="text-[#F4D03F] text-xs mt-[1px]">📍</span>
                                        <p className="text-[9px] leading-tight text-gray-300 group-hover:text-white max-w-[140px]">
                                            {data.address}
                                        </p>
                                    </a>
                                </div>

                                {/* Right: Links (Clickable) */}
                                <div className="flex flex-col items-end gap-1">
                                    <a
                                        href={`tel:${data.mobile}`}
                                        onClick={handleLinkClick}
                                        className="flex items-center justify-end gap-2 text-[12px] hover:text-[#F4D03F] transition-colors"
                                    >
                                        <span className="font-semibold tracking-wider">{data.mobile}</span>
                                        <span className="text-[#F4D03F]">📞</span>
                                    </a>

                                    <a
                                        href={`mailto:${data.email}`}
                                        onClick={handleLinkClick}
                                        className="flex items-center justify-end gap-2 text-[12px] hover:text-[#F4D03F] transition-colors"
                                    >
                                        <span className="truncate max-w-[120px]">{data.email}</span>
                                        <span className="text-[#F4D03F]">✉️</span>
                                    </a>

                                    <a
                                        href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={handleLinkClick}
                                        className="flex items-center justify-end gap-2 text-[12px] hover:text-[#F4D03F] transition-colors"
                                    >
                                        <span className="truncate max-w-[120px]">{data.website}</span>
                                        <span className="text-[#F4D03F]">🌐</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* --- BACK SIDE --- */}
                        <div
                            className="backface-hidden bg-[#F0F2F5] text-[#061539] rounded-xl p-6 flex flex-col justify-between items-center text-center border border-gray-300 shadow-inner"
                            style={{ transform: "rotateY(180deg)" }}
                        >
                            {/* QR Section */}
                            <div className="mt-1 flex flex-col items-center">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                                    {data.qr_code ? (
                                        <img src={data.qr_code} alt="QR" className="w-20 h-20 object-contain" />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">NO QR</div>
                                    )}
                                </div>
                                <p className="text-[9px] font-bold mt-1 tracking-widest text-[#061539] uppercase">Scan to Connect</p>
                            </div>

                            {/* About Text */}
                            <div className="w-full px-2 my-2">
                                <h4 className="font-bold text-[11px] mb-1 uppercase text-[#061539] border-b border-gray-300 inline-block pb-1">About Us</h4>
                                <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                                    {data.about_us}
                                </p>
                            </div>

                            {/* Social Links Footer */}
                            <div className="w-full text-[12px] font-bold text-[#061539] mt-auto space-y-2">
                                <div className="flex justify-center gap-3 flex-wrap">
                                    <a
                                        href={getSocialLink('whatsapp', data.whatsapp)}
                                        target="_blank" rel="noreferrer" onClick={handleLinkClick}
                                        className="flex items-center gap-1 hover:text-green-600 transition-colors"
                                    >
                                        WHATSAPP: <span className='font-normal text-gray-600 underline decoration-dotted'>{data.whatsapp}</span>
                                    </a>
                                    <span className="text-gray-300">|</span>
                                    <a
                                        href={getSocialLink('facebook', data.facebook)}
                                        target="_blank" rel="noreferrer" onClick={handleLinkClick}
                                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                                    >
                                        FACEBOOK: <span className='font-normal text-gray-600 underline decoration-dotted'>/{data.facebook}</span>
                                    </a>
                                </div>

                                <div className="flex justify-center gap-3 flex-wrap">
                                    <a
                                        href={getSocialLink('instagram', data.instagram)}
                                        target="_blank" rel="noreferrer" onClick={handleLinkClick}
                                        className="flex items-center gap-1 hover:text-pink-600 transition-colors"
                                    >
                                        INSTAGRAM: <span className='font-normal text-gray-600 underline decoration-dotted'>/{data.instagram}</span>
                                    </a>
                                    <span className="text-gray-300">|</span>
                                    <a
                                        href={getSocialLink('linkedin', data.linkedin)}
                                        target="_blank" rel="noreferrer" onClick={handleLinkClick}
                                        className="flex items-center gap-1 hover:text-blue-700 transition-colors"
                                    >
                                        LINKEDIN: <span className='font-normal text-gray-600 underline decoration-dotted'>/{data.linkedin}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-5 text-center">
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardModal;