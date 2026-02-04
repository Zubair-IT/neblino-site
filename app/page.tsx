'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`,
          }}
        />
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500">
                <span className="text-xl font-bold">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Neblino Labs
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
          {/* Floating Badge */}
          <div 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-float"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-300">Available for new projects</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              We Build
            </span>
            <br />
            <span className="inline-block mt-2">
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-50 animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Digital Dreams
                </span>
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transforming visionary ideas into stunning digital experiences with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> cutting-edge technology </span>
            and creative excellence
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white/20 animate-shimmer" />
              </div>
            </button>
            <button className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center space-x-2">
                <span>View Our Work</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '200+', label: 'Projects Delivered' },
              { number: '150+', label: 'Happy Clients' },
              { number: '50+', label: 'Team Members' },
              { number: '15+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                What We Do
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Crafting exceptional digital solutions that drive growth and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Web Development',
                description: 'Lightning-fast, scalable web applications built with cutting-edge frameworks and best practices',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: '📱',
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile experiences that users love and engage with daily',
                gradient: 'from-pink-500 to-orange-500',
              },
              {
                icon: '☁️',
                title: 'Cloud Solutions',
                description: 'Robust cloud infrastructure and DevOps solutions for seamless scalability and performance',
                gradient: 'from-blue-500 to-purple-500',
              },
              {
                icon: '🎨',
                title: 'UI/UX Design',
                description: 'Beautiful, intuitive interfaces that create memorable user experiences and drive conversions',
                gradient: 'from-purple-500 to-blue-500',
              },
              {
                icon: '🤖',
                title: 'AI Integration',
                description: 'Intelligent automation and AI-powered features that give your product a competitive edge',
                gradient: 'from-green-500 to-blue-500',
              },
              {
                icon: '⚡',
                title: 'Performance',
                description: 'Optimization and monitoring to ensure your applications run at peak performance 24/7',
                gradient: 'from-yellow-500 to-orange-500',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {service.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span className="text-sm font-semibold">Learn More</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative p-12 md:p-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 animate-gradient" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Build Something
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Extraordinary?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Let's turn your vision into reality. Get in touch and let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300">
                  Start Your Project
                </button>
                <button className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">N</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Neblino Labs
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Building the future of digital experiences with innovation, creativity, and cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {['Services', 'Company', 'Resources'].map((category) => (
              <div key={category}>
                <h4 className="font-bold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© 2026 Neblino Labs. Crafted with 💜 and cutting-edge tech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
