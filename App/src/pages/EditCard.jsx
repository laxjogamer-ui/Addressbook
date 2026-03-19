import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // ID મેળવવા અને Redirect કરવા

const EditCard = () => {
    const { id } = useParams(); // URL માંથી ID મળશે (દા.ત. /edit/5)
    const navigate = useNavigate(); // અપડેટ પછી લિસ્ટ પેજ પર જવા માટે

    // Form Data State
    const [formData, setFormData] = useState({
        company_name: '',
        owner_name: '',
        manager_name: '',
        email: '',
        website: '',
        notes: '',
        facebook: '',
        instagram: '',
        whatsapp: '',
        linkedin: '',
        twitter: '',
    });

    // Dynamic Lists State
    const [mobileNumbers, setMobileNumbers] = useState(['']);
    const [addresses, setAddresses] = useState(['']);

    // File States (New Uploads)
    const [cardFront, setCardFront] = useState(null);
    const [cardBack, setCardBack] = useState(null);
    const [qrCode, setQrCode] = useState(null);

    // Existing Image Previews (જૂના ફોટા બતાવવા માટે)
    const [previews, setPreviews] = useState({
        cardFront: null,
        cardBack: null,
        qrCode: null
    });

    // 1. Load Data on Component Mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cards/${id}/`);
                const data = response.data;

                // Basic Fields ભરવા
                setFormData({
                    company_name: data.company_name,
                    owner_name: data.owner_name || '',
                    manager_name: data.manager_name || '',
                    email: data.email || '',
                    website: data.website || '',
                    notes: data.notes || '',
                    facebook: data.facebook || '',
                    instagram: data.instagram || '',
                    whatsapp: data.whatsapp || '',
                    linkedin: data.linkedin || '',
                    twitter: data.twitter || '',
                });

                // Dynamic Lists ભરવા (જો ખાલી હોય તો એક ખાલી બોક્સ રાખવું)
                setMobileNumbers(data.mobile_numbers && data.mobile_numbers.length > 0 ? data.mobile_numbers : ['']);
                setAddresses(data.addresses && data.addresses.length > 0 ? data.addresses : ['']);

                // Existing Images Previews સેટ કરવા
                setPreviews({
                    cardFront: data.card_front,
                    cardBack: data.card_back,
                    qrCode: data.qr_code
                });

            } catch (error) {
                console.error("Error fetching card data:", error);
                alert("Error loading data!");
            }
        };

        fetchData();
    }, [id]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Dynamic List Change
    const handleDynamicChange = (index, value, type) => {
        if (type === 'mobile') {
            const newMobiles = [...mobileNumbers];
            newMobiles[index] = value;
            setMobileNumbers(newMobiles);
        } else {
            const newAddrs = [...addresses];
            newAddrs[index] = value;
            setAddresses(newAddrs);
        }
    };

    // Add New Field
    const addField = (type) => {
        if (type === 'mobile') setMobileNumbers([...mobileNumbers, '']);
        else setAddresses([...addresses, '']);
    };

    // Remove Field (Optional improvement)
    const removeField = (index, type) => {
        if (type === 'mobile') {
            const newMobiles = mobileNumbers.filter((_, i) => i !== index);
            setMobileNumbers(newMobiles);
        } else {
            const newAddrs = addresses.filter((_, i) => i !== index);
            setAddresses(newAddrs);
        }
    };

    // 2. Submit Updated Data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Basic Fields
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        // Files (ફક્ત ત્યારે જ મોકલો જો નવી ફાઈલ સિલેક્ટ કરી હોય)
        if (cardFront) data.append('card_front', cardFront);
        if (cardBack) data.append('card_back', cardBack);
        if (qrCode) data.append('qr_code', qrCode);

        // Arrays (Filtering and Stringifying)
        const validMobiles = mobileNumbers.filter(num => num.trim() !== '');
        const validAddresses = addresses.filter(addr => addr.trim() !== '');

        data.append('mobile_numbers', JSON.stringify(validMobiles));
        data.append('addresses', JSON.stringify(validAddresses));

        try {
            // PUT Request for Update
            await axios.put(`http://127.0.0.1:8000/api/cards/${id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Card Updated Successfully!");
            navigate('list'); // સફળ થયા બાદ લિસ્ટ પેજ પર લઈ જાઓ
        } catch (error) {
            console.error("Error updating card:", error);
            if (error.response) {
                alert("Error: " + JSON.stringify(error.response.data));
            } else {
                alert("Server connection failed!");
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-10 bg-white shadow-2xl rounded-3xl mt-10 mb-10 border border-gray-100">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-3xl font-extrabold text-blue-900">
                    Edit Visiting Card
                </h2>
                <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* SECTION 1: Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-lg text-gray-700">Basic Details</h3>
                        <p className="text-sm text-gray-500">Edit Company & Owner Info</p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="company_name" value={formData.company_name} placeholder="Company Name" onChange={handleChange} className="p-3 border rounded-xl outline-none" required />
                        <input type="text" name="owner_name" value={formData.owner_name} placeholder="Owner Name" onChange={handleChange} className="p-3 border rounded-xl outline-none" />
                        <input type="text" name="manager_name" value={formData.manager_name} placeholder="Manager Name" onChange={handleChange} className="p-3 border rounded-xl outline-none" />
                        <input type="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} className="p-3 border rounded-xl outline-none" />
                        <input type="url" name="website" value={formData.website} placeholder="Website" onChange={handleChange} className="p-3 border rounded-xl outline-none md:col-span-2" />
                    </div>
                </div>

                <hr />

                {/* SECTION 2: Dynamic Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-bold text-lg text-gray-700">Contact & Address</h3>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Mobile Numbers</label>
                            {mobileNumbers.map((num, i) => (
                                <div key={i} className="flex gap-2">
                                    <input type="text" value={num} onChange={(e) => handleDynamicChange(i, e.target.value, 'mobile')} className="w-full p-2 border rounded-lg" />
                                    {mobileNumbers.length > 1 && <button type="button" onClick={() => removeField(i, 'mobile')} className="text-red-500">x</button>}
                                </div>
                            ))}
                            <button type="button" onClick={() => addField('mobile')} className="text-blue-600 text-sm font-bold">+ Add Number</button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Addresses</label>
                            {addresses.map((addr, i) => (
                                <div key={i} className="flex gap-2">
                                    <textarea value={addr} onChange={(e) => handleDynamicChange(i, e.target.value, 'address')} className="w-full p-2 border rounded-lg" rows="2" />
                                    {addresses.length > 1 && <button type="button" onClick={() => removeField(i, 'address')} className="text-red-500 h-8">x</button>}
                                </div>
                            ))}
                            <button type="button" onClick={() => addField('address')} className="text-blue-600 text-sm font-bold">+ Add Address</button>
                        </div>
                    </div>
                </div>

                <hr />

                {/* SECTION 3: Social Media */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <h3 className="font-bold text-lg text-gray-700">Social Presence</h3>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="whatsapp" value={formData.whatsapp} placeholder="WhatsApp" onChange={handleChange} className="p-3 border rounded-xl" />
                        <input type="url" name="facebook" value={formData.facebook} placeholder="Facebook" onChange={handleChange} className="p-3 border rounded-xl" />
                        <input type="url" name="instagram" value={formData.instagram} placeholder="Instagram" onChange={handleChange} className="p-3 border rounded-xl" />
                        <input type="url" name="linkedin" value={formData.linkedin} placeholder="LinkedIn" onChange={handleChange} className="p-3 border rounded-xl" />
                    </div>
                </div>

                <hr />

                {/* SECTION 4: File Uploads (With Previews) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <h3 className="font-bold text-lg text-gray-700">Update Images</h3>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">

                        {/* Front Image */}
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl">
                            <label className="block text-xs font-bold text-gray-500 mb-2">FRONT IMAGE</label>
                            {previews.cardFront && <img src={previews.cardFront} alt="Current Front" className="h-20 mx-auto mb-2 rounded border" />}
                            <input type="file" onChange={(e) => setCardFront(e.target.files[0])} className="text-xs w-full" />
                        </div>

                        {/* Back Image */}
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl">
                            <label className="block text-xs font-bold text-gray-500 mb-2">BACK IMAGE</label>
                            {previews.cardBack && <img src={previews.cardBack} alt="Current Back" className="h-20 mx-auto mb-2 rounded border" />}
                            <input type="file" onChange={(e) => setCardBack(e.target.files[0])} className="text-xs w-full" />
                        </div>

                        {/* QR Code */}
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl">
                            <label className="block text-xs font-bold text-gray-500 mb-2">QR CODE</label>
                            {previews.qrCode && <img src={previews.qrCode} alt="Current QR" className="h-20 mx-auto mb-2 rounded border" />}
                            <input type="file" onChange={(e) => setQrCode(e.target.files[0])} className="text-xs w-full" />
                        </div>

                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <textarea name="notes" value={formData.notes} placeholder="Notes..." onChange={handleChange} className="w-full p-4 border rounded-xl" rows="3"></textarea>
                    <button type="submit" className="mt-6 w-full bg-gradient-to-r from-green-600 to-teal-700 text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all uppercase tracking-wider">
                        Update Card Details
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditCard;





