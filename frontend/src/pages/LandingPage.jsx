import React from "react";
import { Rocket, Users, MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion"; // For animations

const LandingPage = () => {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="w-full bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">TechThap</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium">About</a>
            <a href="#community" className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium">Community</a>
            <a href="#events" className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium">Events</a>
            <a
              href="/auth"
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Join Us
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 py-24 px-4">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-800 tracking-tight">
            Welcome to <span className="text-indigo-600">TechThap</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Join a vibrant community of college innovators. Connect, collaborate, and grow through events, discussions, and impactful projects.
          </p>
          <a
            href="/auth"
            className="inline-block px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1"
          >
            🚀 Start Your Tech Journey
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-16 text-indigo-800">Why TechThap?</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Users className="w-12 h-12 text-indigo-600 mb-4" />,
                title: "Student Network",
                desc: "Connect with like-minded peers across campuses to share ideas and collaborate.",
              },
              {
                icon: <MessageSquare className="w-12 h-12 text-indigo-600 mb-4" />,
                title: "Live Discussions",
                desc: "Engage in real-time debates and brainstorming sessions with innovators.",
              },
              {
                icon: <Calendar className="w-12 h-12 text-indigo-600 mb-4" />,
                title: "Tech Events",
                desc: "Participate in hackathons, workshops, and webinars to level up your skills.",
              },
              {
                icon: <Rocket className="w-12 h-12 text-indigo-600 mb-4" />,
                title: "Launch Projects",
                desc: "Build and showcase innovative projects to make your mark in the tech world.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                variants={itemVariants}
              >
                {feature.icon}
                <h4 className="font-semibold text-xl mb-3 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            Ready to Shape Your Tech Future?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students building their future with TechThap’s vibrant community.
          </p>
          <a
            href="/auth"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
          >
            Join the Community
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TechThap. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-indigo-400 transition duration-300">Privacy</a>
            <a href="#" className="text-sm hover:text-indigo-400 transition duration-300">Terms</a>
            <a href="#" className="text-sm hover:text-indigo-400 transition duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;