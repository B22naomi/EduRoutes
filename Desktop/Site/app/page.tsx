"use client";

import { useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Menu, X } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto py-4 px-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <div className="flex items-center">
          {/* EduRoutes Logo was here, moved to footer */}
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-white hover:text-blue-200 transition-colors">Features</Link>
          <Link href="#benefits" className="text-white hover:text-blue-200 transition-colors">Benefits</Link>
          <Link href="#how-it-works" className="text-white hover:text-blue-200 transition-colors">How It Works</Link>
          <Link href="#testimonials" className="text-white hover:text-blue-200 transition-colors">Testimonials</Link>
          <Link href="#team" className="text-white hover:text-blue-200 transition-colors">Team</Link>
        </nav>
        <Button className="bg-white text-blue-700 hover:bg-blue-100 rounded-full transition-colors">
          <Link href="#contact">Request Demo</Link>
        </Button>
      </header>

      {/* Hamburger Menu Icon (visible on mobile) */}
      <div className="md:hidden flex items-center pr-4">
        <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu} // Close menu when clicking outside
        ></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-blue-800 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-between items-center px-4 py-4 border-b border-blue-700">
          <Image src="/EduRoutes Logo.png" alt="EduRoutes Logo" width={100} height={33} />
          <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col p-6 space-y-6">
          <Link href="#features" className="text-white text-xl font-medium hover:text-blue-200 transition-colors border-b border-blue-700 pb-4 animate-slide-in-left" style={{ animationDelay: '0.1s' }} onClick={toggleMenu}>Features</Link>
          <Link href="#benefits" className="text-white text-xl font-medium hover:text-blue-200 transition-colors border-b border-blue-700 pb-4 animate-slide-in-left" style={{ animationDelay: '0.2s' }} onClick={toggleMenu}>Benefits</Link>
          <Link href="#how-it-works" className="text-white text-xl font-medium hover:text-blue-200 transition-colors border-b border-blue-700 pb-4 animate-slide-in-left" style={{ animationDelay: '0.3s' }} onClick={toggleMenu}>How It Works</Link>
          <Link href="#testimonials" className="text-white text-xl font-medium hover:text-blue-200 transition-colors border-b border-blue-700 pb-4 animate-slide-in-left" style={{ animationDelay: '0.4s' }} onClick={toggleMenu}>Testimonials</Link>
          <Link href="#team" className="text-white text-xl font-medium hover:text-blue-200 transition-colors pb-4 animate-slide-in-left" style={{ animationDelay: '0.5s' }} onClick={toggleMenu}>Team</Link>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-3 text-lg transition-colors mt-6 w-full animate-slide-in-left" style={{ animationDelay: '0.6s' }} onClick={toggleMenu}>
            <Link href="#contact">Request Demo</Link>
          </Button>
        </nav>
      </div>

      <main className="flex-grow">
        {/* Hero */}
        <section className="container mx-auto py-20 px-4 fade-in relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-teal-500 bg-teal-50 hover-scale transition-all duration-300 shadow-sm">
                <div className="w-4 h-4 rounded-full bg-teal-500 mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Safer and smarter school transportation</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-blue-800 leading-tight animate-slide-in-left">
                  Revolutionize Your School Bus Routes
                </h1>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  EduRoutes uses advanced algorithms and real-time tracking to optimize school bus routes, ensuring safer
                  journeys, reduced costs, and peace of mind for schools and parents.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  Get the App <span className="ml-2 transform transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 pt-4 animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center hover-scale transition-all duration-300 group">
                  <div>
                    <span className="text-gray-700 font-medium block group-hover:text-blue-700 transition-colors duration-300">Smart Routing</span>
                    <span className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300">AI-Powered Optimization</span>
                  </div>
                </div>
                <div className="flex items-center hover-scale transition-all duration-300 group">
                  <div>
                    <span className="text-gray-700 font-medium block group-hover:text-blue-700 transition-colors duration-300">Real-time Updates</span>
                    <span className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300">Live Tracking & Alerts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl hover-scale transition-all duration-500 group">
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20 z-10 group-hover:from-blue-500/30 group-hover:to-teal-500/30 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent md:hidden z-20"></div>
              
              {/* Floating elements that connect with text */}
              <div className="absolute -left-12 top-1/4 w-24 h-24 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-30"></div>
              <div className="absolute -left-8 top-1/2 w-16 h-16 bg-teal-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-30"></div>
              
              <Image 
                src="/phone-image.png" 
                alt="EduRoutes Visual" 
                fill 
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 group-hover:scale-110"
                priority
              />
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-30 animate-float">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-30 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
              </div>

              {/* Connection lines */}
              <div className="absolute -left-4 top-1/4 w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-500/50 z-30"></div>
              <div className="absolute -left-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-500/50 z-30"></div>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
        </section>

        {/* Features */}
        <section id="features" className="bg-gray-50 py-16 fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Route Optimization",
                  description: "Intelligent algorithms that create the most efficient bus routes based on student locations and school timings.",
                },
                {
                  title: "Real-time Tracking",
                  description: "Monitor bus locations in real-time, allowing schools and parents to know exactly where students are.",
                },
                {
                  title: "Safety Alerts",
                  description: "Instant notifications for delays, route changes, or any safety concerns to keep everyone informed.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover-scale transition-all duration-300">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center hover-float">
                    <Image
                      src={`/features/${feature.title.toLowerCase().replace(/\s/g, '-')}.png`}
                      alt={feature.title}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-16 fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { title: "Cost Reduction", description: "Optimize routes to reduce fuel consumption and vehicle maintenance costs." },
                { title: "Time Efficiency", description: "Reduce travel time for students with smarter routing algorithms." },
                { title: "Enhanced Safety", description: "Real-time tracking and alerts ensure student safety throughout their journey." },
                { title: "Peace of Mind", description: "Parents and school administrators can monitor transportation in real-time." },
              ].map((benefit, index) => (
                <div key={index} className="flex hover-scale transition-all duration-300">
                  <div className="mr-4 mt-1">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center hover-float">
                      <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-white py-16 fade-in">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">How EduRoutes Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Our integrated approach combines three powerful components to deliver a comprehensive solution.
            </p>

            {/* Component 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
              <div className="rounded-lg overflow-hidden shadow-lg w-96 mx-auto hover-scale transition-all duration-300">
                <div className="relative h-[400px]">
                  <Image
                    src="/how-it-works/smart-route.png"
                    alt="Smart Route Optimization Visual"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="text-left space-y-4 animate-slide-in-right">
                <div className="flex items-center">
                  <h3 className="text-2xl font-semibold text-blue-800">Smart Route Optimization</h3>
                </div>
                <p className="text-gray-600">
                  Our platform dynamically calculates the most efficient pick-up and drop-off paths using clustering algorithms that group students based on geographic proximity. Combined with live traffic data, this minimizes travel time and avoids bottlenecks.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span className="text-lg mr-2">1</span> Component 1 of 3
                </div>
              </div>
            </div>

            {/* Component 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
              <div className="text-left space-y-4 animate-slide-in-left">
                <div className="flex items-center">
                  <h3 className="text-2xl font-semibold text-blue-800">Real-Time Communication</h3>
                </div>
                <p className="text-gray-600">
                  EduRoutes enables seamless coordination among schools, transport providers, and parents through an intuitive mobile interface. Users receive real-time updates on bus locations, ETAs, route changes, and delays.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span className="text-lg mr-2">2</span> Component 2 of 3
                </div>
              </div>
               <div className="rounded-lg overflow-hidden shadow-lg md:order-2 w-96 mx-auto hover-scale transition-all duration-300">
                 <div className="relative h-[400px]">
                   <Image
                     src="/how-it-works/real-time.png"
                     alt="Real-Time Communication Visual"
                     fill
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
            </div>

            {/* Component 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg w-96 mx-auto hover-scale transition-all duration-300">
                 <div className="relative h-[400px]">
                   <Image
                    src="/how-it-works/data-driven.png"
                    alt="Data-Driven Decision Support Visual"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                 </div>
              </div>
              <div className="text-left space-y-4 animate-slide-in-right">
                 <div className="flex items-center">
                   <h3 className="text-2xl font-semibold text-blue-800">Data-Driven Decision Support</h3>
                </div>
                <p className="text-gray-600">
                  The system continuously collects and analyzes data to improve future routing and scheduling. This includes insights on travel time trends, fuel usage, stop efficiency, and student attendance patterns.
                </p>
                 <div className="flex items-center text-blue-600 font-semibold">
                  <span className="text-lg mr-2">3</span> Component 3 of 3
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "EduRoutes has transformed our school transportation system. We've reduced costs by 30% while improving safety and reliability.",
                  author: "Sarah Mtalii",
                  role: "School Transportation Director"
                },
                {
                  quote: "As a parent, I love being able to track my child's bus in real-time. It gives me peace of mind knowing exactly when they'll arrive home.",
                  author: "Wilbroda Shikwekwe",
                  role: "Parent"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover-scale transition-all duration-300">
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-blue-800">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { name: "Dida Shukri", role: "Data Scientist", image: "/team/dida-shukri.png" },
                { name: "Ruth Bonareri", role: "Data Scientist", image: "/team/ruth-bonareri.png" },
                { name: "Naomi Nyabuti", role: "Team Lead & Software Developer", image: "/team/naomi-nyabuti.png" },
                { name: "Patrose Leshinka", role: "Data Scientist", image: "/team/patrose-leshinka.png" },
                { name: "Lincoln Muraguri", role: "Software Developer", image: "/team/lincoln-muraguri.png" }
              ].map((member, index) => (
                <div 
                  key={index} 
                  className="text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-xl rounded-xl p-4 cursor-pointer group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full group-hover:ring-4 group-hover:ring-blue-500 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 transition-colors duration-300 group-hover:text-blue-600">{member.name}</h3>
                  <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-800 text-white py-16 text-center fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to revolutionize your school bus routes?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of schools that have improved safety, reduced costs, and provided peace of mind to parents.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-6 text-lg transition-colors">
              <Link href="#contact">Request a Demo Today</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <div className="mb-4">
            <Image src="/EduRoutes Logo.png" alt="EduRoutes Logo" width={80} height={26} className="mx-auto" />
          </div>
          © {new Date().getFullYear()} EduRoutes. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
