import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCard = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    category: 'Software', // ડિફોલ્ટ વેલ્યુ
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

  const [mobileNumbers, setMobileNumbers] = useState(['']);
  const [addresses, setAddresses] = useState(['']);
  const [cardFront, setCardFront] = useState(null);
  const [cardBack, setCardBack] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  // Categories નું લિસ્ટ
  const categories = [
    "Hardware",
    "Software",
    "AI",
    "Accounting",
    "Office Automation",
    "AutoCAD",
    "Multimedia",
    "Other"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const addField = (type) => {
    if (type === 'mobile') setMobileNumbers([...mobileNumbers, '']);
    else setAddresses([...addresses, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      if (formData[key] && formData[key].trim() !== '') {
        data.append(key, formData[key]);
      }
    });

    if (cardFront) data.append('card_front', cardFront);
    if (cardBack) data.append('card_back', cardBack);
    if (qrCode) data.append('qr_code', qrCode);

    const validMobiles = mobileNumbers.filter(num => num.trim() !== '');
    const validAddresses = addresses.filter(addr => addr.trim() !== '');

    data.append('mobile_numbers', JSON.stringify(validMobiles));
    data.append('addresses', JSON.stringify(validAddresses));

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cards/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Professional Card Saved Successfully!");
      console.log("Success:", response.data);
      navigate('/list');
    } catch (error) {
      if (error.response) {
        console.log("Validation Error:", error.response.data);
        alert("Error: " + JSON.stringify(error.response.data));
      } else {
        alert("Server connection failed!");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-gray-50 shadow-2xl rounded-3xl mt-10 mb-10 border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 border-b-4 border-blue-500 inline-block">
        Visiting Card Digital Entry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* SECTION 1: Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg text-gray-700">Basic Details</h3>
            <p className="text-sm text-gray-500">Company & Owner Information</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Company Name */}
            <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} className="p-3 border rounded-xl outline-none" required />

            {/* --- સુધારો: Category Dropdown --- */}
            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="p-3 border rounded-xl outline-none bg-white"
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {/* -------------------------------- */}

            <input type="text" name="owner_name" placeholder="Owner Name" onChange={handleChange} className="p-3 border rounded-xl outline-none" />
            <input type="text" name="manager_name" placeholder="Manager Name" onChange={handleChange} className="p-3 border rounded-xl outline-none" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="p-3 border rounded-xl outline-none" />
            <input type="url" name="website" placeholder="Website (https://...)" onChange={handleChange} className="p-3 border rounded-xl outline-none md:col-span-1" />
          </div>
        </div>

        <hr />

        {/* બાકીનો કોડ (Address, Social, Images) એમ જ રહેશે... */}
        {/* SECTION 2: Dynamic Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg text-gray-700">Contact & Address</h3>
            <p className="text-sm text-gray-500">Add multiple if needed</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Mobile Numbers</label>
              {mobileNumbers.map((num, i) => (
                <input key={i} type="text" value={num} onChange={(e) => handleDynamicChange(i, e.target.value, 'mobile')} placeholder={`Number ${i + 1}`} className="w-full p-2 border rounded-lg mb-2" />
              ))}
              <button type="button" onClick={() => addField('mobile')} className="text-blue-600 text-sm font-bold">+ Add Another Number</button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Full Addresses</label>
              {addresses.map((addr, i) => (
                <textarea key={i} value={addr} onChange={(e) => handleDynamicChange(i, e.target.value, 'address')} placeholder={`Address ${i + 1}`} className="w-full p-2 border rounded-lg" rows="2" />
              ))}
              <button type="button" onClick={() => addField('address')} className="text-blue-600 text-sm font-bold">+ Add Another Address</button>
            </div>
          </div>
        </div>

        <hr />

        {/* SECTION 3: Social Media Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h3 className="font-bold text-lg text-gray-700">Social Presence</h3>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="whatsapp" placeholder="WhatsApp Number" onChange={handleChange} className="p-3 border rounded-xl" />
            <input type="url" name="facebook" placeholder="Facebook Profile" onChange={handleChange} className="p-3 border rounded-xl" />
            <input type="url" name="instagram" placeholder="Instagram Profile" onChange={handleChange} className="p-3 border rounded-xl" />
            <input type="url" name="linkedin" placeholder="LinkedIn Profile" onChange={handleChange} className="p-3 border rounded-xl" />
          </div>
        </div>

        <hr />

        {/* SECTION 4: File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h3 className="font-bold text-lg text-gray-700">Card & QR Images</h3>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl">
              <label className="block text-xs font-bold text-gray-500 mb-2">FRONT IMAGE</label>
              <input type="file" onChange={(e) => setCardFront(e.target.files[0])} className="text-xs" />
            </div>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl">
              <label className="block text-xs font-bold text-gray-500 mb-2">BACK IMAGE</label>
              <input type="file" onChange={(e) => setCardBack(e.target.files[0])} className="text-xs" />
            </div>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl">
              <label className="block text-xs font-bold text-gray-500 mb-2">QR CODE</label>
              <input type="file" onChange={(e) => setQrCode(e.target.files[0])} className="text-xs" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <textarea name="notes" placeholder="Any extra notes..." onChange={handleChange} className="w-full p-4 border rounded-xl" rows="3"></textarea>
          <button type="submit" className="mt-6 w-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all uppercase tracking-wider">
            Register Digital Contact
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateCard;