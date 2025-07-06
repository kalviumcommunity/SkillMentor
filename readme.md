🧠 Skill Mentor
Skill Mentor is a web platform that connects students with subject-specific mentors for personalized learning and support. It includes real-time communication, scheduling, payments, and an AI-powered assistant — all in one seamless app.

🚀 Features
👨‍🏫 Mentor Registration & Profiles – Mentors can register and list their services, including qualifications, subjects, and availability.

📚 Student Bookings – Students can search for mentors and schedule appointments.

💳 Payment Integration – Secure payment system for booking mentorship sessions.

📹 Live Video Classes (WebRTC) – Real-time video calling for online classes.

💬 Real-time Chat (WebSocket) – Chat feature for students and mentors to communicate instantly.

🔐 Google Authentication – Login and signup with Google for secure access.

🤖 AI Assistant – Students can ask syllabus-related questions and get instant answers from an AI.

🛠 Tech Stack
Frontend: React.js, Tailwind CSS, Axios

Backend: Node.js, Express.js, MongoDB, JWT, Bcrypt

Real-Time: WebRTC (video), WebSocket (chat)

Authentication: Google OAuth 2.0

AI Integration: OpenAI (for syllabus Q&A)

Email: Nodemailer for email verification and password resets



🧪 Prerequisites
Node.js (v18+ recommended)

MongoDB (local or cloud)

Google OAuth credentials

.env file with necessary variables (MONGO_URL, SECRET, ADMIN_EMAIL, etc.)



🖥️ Running the Project
1️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Frontend will typically run at: http://localhost:5173


📌 Future Enhancements
Mentor availability calendar

Stripe/Razorpay integration for payments

Rating & reviews system

AI quiz generation

Group sessions