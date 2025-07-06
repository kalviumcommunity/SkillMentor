import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import mentorData from '../data.json'; // Local dummy data

const FindTeacher = () => {
    const [mentors, setMentors] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [sortOption, setSortOption] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setMentors(mentorData);
    }, []);

    const applyFilters = () => {
        let filtered = [...mentorData];

        if (selectedSubject) {
            filtered = filtered.filter(m => m.subject === selectedSubject);
        }

        if (sortOption === "priceLow") {
            filtered.sort((a, b) => a.fees - b.fees);
        } else if (sortOption === "priceHigh") {
            filtered.sort((a, b) => b.fees - a.fees);
        } else if (sortOption === "ratingHigh") {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        setMentors(filtered);
    };

    const handleCardClick = (id) => {
        navigate(`/mentor/${id}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex flex-col md:flex-row gap-4 p-4 flex-grow">
                {/* Sidebar */}
                <div className="md:w-1/4 w-full space-y-4">
                    <SearchBar />

                    {/* Filter/Sort Section */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-2">Filter & Sort</h3>

                        <div className="flex flex-col gap-3">
                            {/* Filter by Subject */}
                            <select
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                value={selectedSubject}
                                className="border p-2 rounded"
                            >
                                <option value="">All Subjects</option>
                                {[...new Set(mentorData.map(m => m.subject))].map((subject, index) => (
                                    <option key={index} value={subject}>{subject}</option>
                                ))}
                            </select>

                            {/* Sort By Option */}
                            <select
                                onChange={(e) => setSortOption(e.target.value)}
                                value={sortOption}
                                className="border p-2 rounded"
                            >
                                <option value="">Sort By</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="ratingHigh">Rating: High to Low</option>
                            </select>

                            <button
                                onClick={applyFilters}
                                className="bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mentor Grid */}
                <div className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mentors.map((mentor) => (
                        <div
                            key={mentor._id}
                            onClick={() => handleCardClick(mentor._id)}
                            className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <img
                                src={mentor.profileimage}
                                alt={mentor.name}
                                className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                            />
                            <h2 className="text-xl font-semibold text-center">{mentor.name}</h2>
                            <p className="text-center text-gray-600">{mentor.subject}</p>
                            <p className="text-sm text-gray-500 text-center">Experience: {mentor.experience}</p>
                            <p className="text-sm text-gray-500 text-center">Qualification: {mentor.qualifications}</p>
                            <div className="flex justify-between mt-3 px-4">
                                <span className="text-green-600 font-medium">₹{mentor.fees}/hr</span>
                                <span className="text-yellow-500 font-semibold">⭐ {mentor.rating || "4.5"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FindTeacher;
