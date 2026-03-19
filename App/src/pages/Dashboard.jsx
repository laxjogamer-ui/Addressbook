import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, User, Globe, Mail, MapPin, X, Eye, Facebook, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';

const Dashboard = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null);

    const API_URL = 'http://127.0.0.1:8000';

    const categories = [
        "All", "Hardware", "Software", "AI", "Accounting",
        "Office Automation", "AutoCAD", "Multimedia", "Other"
    ];

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cards/`);
            setCards(response.data);
            setFilteredCards(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cards:", error);
            setLoading(false);
        }
    };

    const getCategoryCount = (catName) => {
        if (catName === 'All') return cards.length;
        return cards.filter(card => card.category === catName).length;
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredCards(cards);
        } else {
            setFilteredCards(cards.filter((card) => card.category === category));
        }
    };

    const safeRenderList = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [data];
        } catch (e) {
            return [data];
        }
    };

    const resolveImage = (img) => {
        if (!img) return null;
        if (img.startsWith('http')) return img;
        return `${API_URL}${img}`;
    };

    // લિંક ક્લિક કરવા માટે http:// ઉમેરવાનું ફંક્શન
    const resolveLink = (link) => {
        if (!link) return "#";
        if (link.startsWith("http://") || link.startsWith("https://")) {
            return link;
        }
        return `https://${link}`;
    };

    if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Data...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 border-l-8 border-blue-900 pl-4">
                    DASHBOARD
                </h1>
            </div>

            {/* Filter Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {categories.map((cat) => (
                    <div
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`cursor-pointer rounded-lg p-6 shadow-lg transition-transform hover:scale-105 relative overflow-hidden
              ${activeCategory === cat ? 'ring-4 ring-blue-300' : ''}
              bg-[#0a2540] text-white`}
                    >
                        <div className="flex flex-col items-center justify-center text-center h-full z-10 relative">
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90 flex items-center gap-2">
                                <User size={16} /> {cat}
                            </h3>
                            <p className="text-4xl font-extrabold text-white">
                                {getCategoryCount(cat)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                    <div key={card.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">

                        <div className="h-40 bg-gray-200 w-full relative group">
                            {card.card_front ? (
                                <img src={resolveImage(card.card_front)} alt="Front" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 bg-blue-900 text-white text-xs px-2 py-1 rounded">
                                {card.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 truncate">{card.company_name}</h3>
                            <p className="text-sm text-gray-500 mb-3">{card.owner_name}</p>

                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-blue-600" />
                                    <span className="truncate">{safeRenderList(card.mobile_numbers)[0] || "No Number"}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedCard(card)}
                                className="mt-4 w-full bg-blue-50 text-blue-700 py-2 rounded-lg font-bold hover:bg-blue-100 flex items-center justify-center gap-2"
                            >
                                <Eye size={18} /> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[999] p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto relative animate-fadeIn flex flex-col md:flex-row">

                        <button
                            onClick={() => setSelectedCard(null)}
                            className="absolute top-4 right-4 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 p-2 rounded-full transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Side: Images */}
                        <div className="bg-gray-50 p-6 md:w-1/3 flex flex-col gap-4 items-center border-r">
                            <h4 className="font-bold text-gray-500 self-start">Card Preview</h4>
                            {selectedCard.card_front && (
                                <img src={resolveImage(selectedCard.card_front)} className="w-full rounded-lg shadow-md border" alt="Front" />
                            )}
                            {selectedCard.card_back && (
                                <img src={resolveImage(selectedCard.card_back)} className="w-full rounded-lg shadow-md border" alt="Back" />
                            )}
                            {selectedCard.qr_code && (
                                <div className="mt-4 text-center">
                                    <p className="text-xs font-bold mb-1">SCAN QR</p>
                                    <img src={resolveImage(selectedCard.qr_code)} className="w-32 h-32 border-4 border-white shadow-lg" alt="QR" />
                                </div>
                            )}
                        </div>

                        {/* Right Side: Information */}
                        <div className="p-8 space-y-6 md:w-2/3">
                            <div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    {selectedCard.category}
                                </span>
                                <h2 className="text-3xl font-extrabold text-gray-800 mt-2">{selectedCard.company_name}</h2>
                                <p className="text-lg text-gray-600 font-medium flex items-center gap-2 mt-1">
                                    <User size={20} /> {selectedCard.owner_name}
                                </p>
                            </div>

                            <hr />

                            <div className="space-y-4">
                                {/* Mobile Numbers */}
                                <div>
                                    <h5 className="font-bold flex items-center gap-2 text-gray-700"><Phone size={18} /> Mobile Numbers</h5>
                                    <ul className="list-disc list-inside text-gray-600 ml-1">
                                        {safeRenderList(selectedCard.mobile_numbers)
                                            .filter(n => n && n.trim() !== "")
                                            .map((num, i) => (
                                                <li key={i}>{num}</li>
                                            ))}
                                    </ul>
                                </div>

                                {/* Addresses */}
                                <div>
                                    <h5 className="font-bold flex items-center gap-2 text-gray-700"><MapPin size={18} /> Addresses</h5>
                                    <div className="text-gray-600 ml-1 space-y-2">
                                        {safeRenderList(selectedCard.addresses)
                                            .filter(a => a && a.trim() !== "")
                                            .map((addr, i) => (
                                                <p key={i} className="bg-gray-50 p-2 rounded text-sm border">{addr}</p>
                                            ))}
                                    </div>
                                </div>

                                {/* Email */}
                                {selectedCard.email && (
                                    <div>
                                        <h5 className="font-bold flex items-center gap-2 text-gray-700"><Mail size={18} /> Email</h5>
                                        <a href={`mailto:${selectedCard.email}`} className="text-blue-600 hover:underline block ml-6">{selectedCard.email}</a>
                                    </div>
                                )}

                                {/* Website */}
                                {selectedCard.website && (
                                    <div>
                                        <h5 className="font-bold flex items-center gap-2 text-gray-700"><Globe size={18} /> Website</h5>
                                        <a href={resolveLink(selectedCard.website)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline block ml-6 break-all">
                                            {selectedCard.website}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* ----- SOCIAL MEDIA LINKS (DISPLAY AS TEXT) ----- */}
                            <div className="mt-6 border-t pt-4">
                                <h5 className="font-bold text-gray-700 mb-3 text-sm">Social Profiles</h5>
                                <div className="space-y-3">

                                    {/* WhatsApp */}
                                    {selectedCard.whatsapp && (
                                        <div className="flex items-center gap-3">
                                            <MessageCircle size={20} className="text-green-500 shrink-0" />
                                            <a href={`https://wa.me/${selectedCard.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                                                {selectedCard.whatsapp}
                                            </a>
                                        </div>
                                    )}

                                    {/* Facebook */}
                                    {selectedCard.facebook && (
                                        <div className="flex items-center gap-3">
                                            <Facebook size={20} className="text-blue-600 shrink-0" />
                                            <a href={resolveLink(selectedCard.facebook)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                                {selectedCard.facebook}
                                            </a>
                                        </div>
                                    )}

                                    {/* Instagram */}
                                    {selectedCard.instagram && (
                                        <div className="flex items-center gap-3">
                                            <Instagram size={20} className="text-pink-600 shrink-0" />
                                            <a href={resolveLink(selectedCard.instagram)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                                {selectedCard.instagram}
                                            </a>
                                        </div>
                                    )}

                                    {/* LinkedIn */}
                                    {selectedCard.linkedin && (
                                        <div className="flex items-center gap-3">
                                            <Linkedin size={20} className="text-blue-700 shrink-0" />
                                            <a href={resolveLink(selectedCard.linkedin)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                                {selectedCard.linkedin}
                                            </a>
                                        </div>
                                    )}

                                    {/* Twitter */}
                                    {selectedCard.twitter && (
                                        <div className="flex items-center gap-3">
                                            <Twitter size={20} className="text-black shrink-0" />
                                            <a href={resolveLink(selectedCard.twitter)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                                {selectedCard.twitter}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* ------------------------------------- */}

                            {selectedCard.notes && (
                                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm text-yellow-800 mt-4">
                                    <strong>Note:</strong> {selectedCard.notes}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;