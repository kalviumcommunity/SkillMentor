import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">Skill Mentor</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/find-teacher" className="text-gray-700 hover:text-blue-600">
          Find Teacher
        </Link>
        <Link to="/EnrollTeacher" className="text-gray-700 hover:text-blue-600">
          Enroll as Teacher
        </Link>

        {user && (
          <Link to="/student-dashboard" className="text-gray-700 hover:text-blue-600">
            Student Dashboard
          </Link>
        )}

        {user?.role === "teacher" && (
          <Link to="/teacher-dashboard" className="text-gray-700 hover:text-blue-600">
            Teacher Dashboard
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
          </>
        ) : (
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-2xl text-gray-700" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <div className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    Show Profile
                  </Link>
                </div>
                <div
                  onClick={() => {
                    onLogout();
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
