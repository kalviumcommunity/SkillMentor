import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaComments } from 'react-icons/fa';

const MentorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Dummy mentor data (replace with real API fetch)
  const mentor = {
    _id: id,
    name: 'John Doe',
    subject: 'Web Development',
    experience: '5 years',
    qualifications: 'M.Tech in Computer Science',
    city: 'Bangalore',
    profileimage: 'https://randomuser.me/api/portraits/men/32.jpg',
    fees: 500,
    slots: [
      '2025-07-10 10:00 AM',
      '2025-07-11 03:00 PM',
      '2025-07-12 05:00 PM'
    ]
  };

  const handleBooking = () => {
    if (!selectedSlot) return alert('Please select a slot');
    navigate('/payment');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row p-6 gap-6 flex-grow">
        <div className="md:w-1/3 w-full flex flex-col items-center text-center gap-3">
          <div className="relative">
            <img
              src={mentor.profileimage}
              alt={mentor.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
            />
            <FaComments
              className="absolute bottom-0 right-0 text-blue-600 bg-white rounded-full p-1 cursor-pointer text-3xl shadow"
              title="Chat with Mentor"
              onClick={() => setShowChat(true)}
            />
          </div>
          <h2 className="text-2xl font-bold">{mentor.name}</h2>
          <p className="text-gray-600">Subject: {mentor.subject}</p>
          <p className="text-gray-600">Experience: {mentor.experience}</p>
          <p className="text-gray-600">Qualification: {mentor.qualifications}</p>
          <p className="text-gray-600">City: {mentor.city}</p>
          <p className="text-green-600 font-semibold">₹{mentor.fees}/hr</p>
        </div>

        <div className="md:w-2/3 w-full">
          <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
          <div className="grid gap-3">
            {mentor.slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg border text-left transition ${
                  selectedSlot === slot
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            onClick={handleBooking}
            className="mt-6 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Chat Popup */}
      {showChat && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white shadow-lg rounded-xl flex flex-col overflow-hidden border border-gray-300 z-50">
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <span>Chat with {mentor.name}</span>
            <button onClick={() => setShowChat(false)} className="text-white font-bold">×</button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto text-sm text-gray-700">
            {/* Messages will go here */}
            <p className="text-center text-gray-400">WebSocket Chat coming soon...</p>
          </div>
          <div className="p-2 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MentorDetails;
