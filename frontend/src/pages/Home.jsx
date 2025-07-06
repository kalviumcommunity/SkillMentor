// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Skill Mentor</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Skill Mentor is your one-stop platform to find expert mentors in any subject — whether you're a student looking to learn or an expert willing to teach. Book a mentor, attend sessions, ask doubts, or become a mentor yourself!
        </p>

        <SearchBar />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
