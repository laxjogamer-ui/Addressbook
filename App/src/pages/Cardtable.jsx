import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CardModal from './CardModal';


const Cardtable = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [zoomImage, setZoomImage] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    // JSON String ને Array માં ફેરવવા માટેનું Helper Function
    const parseJsonData = (data) => {
        try {
            if (typeof data === 'string') {
                return JSON.parse(data);
            }
            return data || [];
        } catch (e) {
            return [];
        }
    };

    const fetchCards = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cards/');
            setCards(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const filteredCards = cards.filter((card) => {
        const nameValue = card.company_name ? card.company_name.toLowerCase() : "";
        const matchesName = nameValue.includes(searchTerm.toLowerCase());
        const matchesDate = filterDate
            ? (card.created_at && card.created_at.startsWith(filterDate))
            : true;
        return matchesName && matchesDate;
    });

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cards/${id}/`);
                setCards(cards.filter((card) => card.id !== id));
            } catch (error) {
                alert("Error deleting card.");
            }
        }
    };

    const handleView = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:8000${path}`;
    };

    if (loading) return <div className="text-center mt-10 text-gray-500">Loading data...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Visiting Cards List</h2>
                <Link to="/create" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md w-full sm:w-auto text-center font-medium">
                    + Add New Card
                </Link>
            </div>

            {/* --- Filter Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Search Company</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                        />
                    </div>

                    {showSuggestions && searchTerm && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                            {filteredCards.length > 0 ? (
                                filteredCards.slice(0, 6).map((card) => (
                                    <div
                                        key={card.id}
                                        className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                                        onClick={() => {
                                            setSearchTerm(card.company_name);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        <span className="text-sm text-slate-700 font-medium">{card.company_name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-slate-400">No results found</div>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Filter by Date</label>
                    <input
                        type="date"
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-slate-600"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>

                <div className="flex items-end">
                    <button
                        onClick={() => { setSearchTerm(""); setFilterDate(""); }}
                        className="w-full bg-slate-200 text-slate-600 p-2.5 rounded-xl hover:bg-slate-300 transition font-bold text-sm uppercase tracking-wide"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-full text-left text-sm whitespace-nowrap bg-white">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-bold tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-4">Company Details</th>
                            <th className="px-6 py-4">Address</th>
                            <th className="px-6 py-4">Owner</th>
                            <th className="px-6 py-4 text-center">Images</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100" onClick={() => setShowSuggestions(false)}>
                        {filteredCards.length > 0 ? (
                            filteredCards.map((card) => {
                                // અહિયાં આપણે ડેટાને Parse કરીએ છીએ
                                const mobiles = parseJsonData(card.mobile_numbers);
                                const addresses = parseJsonData(card.addresses);

                                return (
                                    <tr key={card.id} className="hover:bg-blue-50/50 transition duration-150">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 text-base">{card.company_name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{card.category || "General"}</span>
                                                <span className="text-slate-400 text-xs">| 📞 {mobiles.length > 0 ? mobiles[0] : "N/A"}</span>
                                            </div>
                                        </td>
                                        {/* Address Column */}
                                        <td className="px-6 py-4 text-slate-600 text-xs max-w-xs truncate">
                                            {addresses.length > 0 ? addresses[0] : "-"}
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 font-medium">
                                            {card.owner_name || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                {card.card_front && (
                                                    <img
                                                        src={getImageUrl(card.card_front)}
                                                        className="w-10 h-6 object-cover rounded border border-slate-200 cursor-zoom-in hover:scale-110 transition"
                                                        onClick={() => setZoomImage(getImageUrl(card.card_front))}
                                                        alt="front"
                                                    />
                                                )}
                                                {card.card_back && (
                                                    <img
                                                        src={getImageUrl(card.card_back)}
                                                        className="w-10 h-6 object-cover rounded border border-slate-200 cursor-zoom-in hover:scale-110 transition"
                                                        onClick={() => setZoomImage(getImageUrl(card.card_back))}
                                                        alt="back"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-3">
                                                <button onClick={() => handleView(card)} className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded-full transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </button>
                                                <Link to={`/edit/${card.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.604a2.06 2.06 0 01-.859.44l-4.986 1.15a.434.434 0 01-.53-.53l1.144-4.985a2.06 2.06 0 01.44-.859l10.39-10.39ZM2.625 20.25h15.75" />
                                                    </svg>
                                                </Link>
                                                <button onClick={() => handleDelete(card.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">
                                    No cards found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal & Zoom Overlay */}
            {showModal && <CardModal isOpen={showModal} card={selectedCard} onClose={() => setShowModal(false)} />}
            {zoomImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 cursor-zoom-out" onClick={() => setZoomImage(null)}>
                    <div className="relative max-w-4xl w-full">
                        <button onClick={() => setZoomImage(null)} className="absolute -top-12 right-0 text-white text-4xl hover:text-blue-400 transition">&times;</button>
                        <img src={zoomImage} alt="Zoomed" className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/10" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cardtable;