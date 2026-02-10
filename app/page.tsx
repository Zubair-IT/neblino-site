'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle System for Nebula Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#A855F7', '#EC4899', '#3B82F6', '#8B5CF6', '#F472B6'];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - distance / 100) * 0.2;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Hide scroll indicator after scrolling 100px
      if (currentScrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Nebula Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Nebula Clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[15%] w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[120px] animate-nebula-1" />
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-nebula-2" />
          <div className="absolute bottom-[15%] left-[40%] w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[110px] animate-nebula-3" />
          <div className="absolute top-[50%] right-[30%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] animate-nebula-1" style={{animationDelay: '2s'}} />
        </div>

        {/* Cursor Magnetic Glow */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-2xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group cursor-pointer">
              <a href="#home" onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                <div className="relative h-10 sm:h-12 w-auto">
                  <img src="/neblino.png" alt="Neblino Labs" className="h-full w-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-all duration-300" />
                </div>
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Work', href: '#work' },
                { name: 'About', href: '#about' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white transition-colors group py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>
            
            {/* Desktop CTA Button */}
            <a href="#contact" className="hidden md:block relative group px-6 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-bold text-sm lg:text-base overflow-hidden">
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6 space-y-4">
            {[
              { name: 'Home', href: '#home' },
              { name: 'Services', href: '#services' },
              { name: 'Work', href: '#work' },
              { name: 'About', href: '#about' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2 text-lg font-medium"
              >
                {item.name}
              </a>
            ))}
            <a href="#contact" className="w-full mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-bold text-base text-center block">
              Let's Talk
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 mb-12 sm:mb-16 mt-8 sm:mt-0">
          {/* Floating Badge with Pulse */}
          <div 
            className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full mb-6 sm:mb-8 group hover:scale-105 transition-transform duration-300"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
            }}
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Available for new projects</span>
          </div>

          {/* Epic Main Heading with 3D Effect */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-black mb-6 sm:mb-8 leading-[0.95] tracking-tight">
            <div className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl sm:blur-3xl opacity-50 animate-pulse-slow" />
              <span className="relative inline-block animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                We Build
              </span>
            </div>
            <br />
            <div className="relative inline-block mt-2 sm:mt-4">
              <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 blur-2xl sm:blur-3xl opacity-60 animate-pulse-glow" />
              <span className="relative bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Digital
              </span>
            </div>
            <br />
            <div className="relative inline-block mt-2 sm:mt-4">
              <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-2xl sm:blur-3xl opacity-60 animate-pulse-glow animation-delay-1000" />
              <span className="relative bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                Masterpieces
              </span>
            </div>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-light px-4">
            We don't just code. We craft
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"> legendary digital experiences </span>
            that make your competitors wonder how you did it
          </p>

          {/* Epic CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <button className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-bold text-base sm:text-lg lg:text-xl overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/50">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Start Your Project</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-white/5 backdrop-blur-2xl border-2 border-white/10 rounded-full font-bold text-base sm:text-lg lg:text-xl hover:bg-white/10 hover:border-white/20 transform hover:scale-110 transition-all duration-300">
              <span className="flex items-center justify-center space-x-2">
                <span>View Our Magic</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto px-4">
            {[
              { number: '500+', label: 'Projects Launched', icon: '🚀' },
              { number: '300+', label: 'Happy Clients', icon: '😍' },
              { number: '100+', label: 'Team Experts', icon: '👥' },
              { number: '20+', label: 'Years Combined', icon: '⚡' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl hover:bg-white/10 transform hover:scale-105 lg:hover:scale-110 hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Scroll Indicator - Only shows at top, hides on scroll */}
        {showScrollIndicator && (
          <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center animate-bounce-slow z-30 pointer-events-none transition-opacity duration-500">
            <a 
              href="#services" 
              className="flex flex-col items-center space-y-2 cursor-pointer group pointer-events-auto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-6 h-10 sm:w-7 sm:h-11 md:w-8 md:h-12 border-2 border-white/40 group-hover:border-white/60 rounded-full flex justify-center items-center p-2 transition-colors bg-black/20 backdrop-blur-sm">
                <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full animate-scroll" />
              </div>
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white font-medium transition-colors">Scroll to explore</span>
            </a>
          </div>
        )}
      </section>

      {/* Services Section with Magnetic Cards */}
      <section id="services" className="relative py-20 sm:py-28 lg:py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <div className="inline-block mb-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs sm:text-sm font-semibold">
                OUR SUPERPOWERS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 px-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                What We Master
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
              We don't follow trends. We create them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: '🚀',
                title: 'Web Development',
                description: 'Blazing-fast, pixel-perfect web applications that leave competitors in the dust',
                gradient: 'from-purple-500 via-pink-500 to-purple-500',
                delay: '0ms',
              },
              {
                icon: '📱',
                title: 'Mobile Apps',
                description: 'Native experiences so smooth, users forget they\'re using an app',
                gradient: 'from-pink-500 via-orange-500 to-pink-500',
                delay: '100ms',
              },
              {
                icon: '☁️',
                title: 'Cloud Architecture',
                description: 'Infinitely scalable infrastructure that grows with your ambitions',
                gradient: 'from-blue-500 via-purple-500 to-blue-500',
                delay: '200ms',
              },
              {
                icon: '🎨',
                title: 'UI/UX Design',
                description: 'Interfaces so beautiful, they win awards before launch',
                gradient: 'from-purple-500 via-blue-500 to-purple-500',
                delay: '300ms',
              },
              {
                icon: '🤖',
                title: 'AI Integration',
                description: 'Cutting-edge AI that makes your product feel like magic',
                gradient: 'from-green-500 via-blue-500 to-green-500',
                delay: '400ms',
              },
              {
                icon: '⚡',
                title: 'Performance',
                description: 'Lightning-speed optimization that makes Google jealous',
                gradient: 'from-yellow-500 via-orange-500 to-yellow-500',
                delay: '500ms',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-5 sm:p-6 md:p-8 lg:p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer transform hover:scale-105 hover:-rotate-1 min-h-[280px] sm:min-h-[320px] flex flex-col"
                style={{ animationDelay: service.delay }}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-gradient`} />
                
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                {/* Icon with 3D Effect - Fixed overflow issue */}
                <div className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 flex-shrink-0 overflow-visible">
                  <span className="inline-block transform group-hover:scale-110 sm:group-hover:scale-125 group-hover:rotate-6 sm:group-hover:rotate-12 transition-all duration-500 drop-shadow-2xl">
                    {service.icon}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-grow flex flex-col">
                  <h3 className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="relative text-gray-400 group-hover:text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="relative mt-3 sm:mt-4 md:mt-6 lg:mt-8 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-3 transition-all duration-500">
                    <span className="text-xs sm:text-sm font-bold">Explore More</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO - Work Section */}
      <section id="work" className="relative py-20 sm:py-28 lg:py-32 z-10 overflow-hidden">
        {/* Electric Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(168,85,247,0.1)_2px,transparent_2px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs sm:text-sm font-semibold">
                OUR WORK
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 px-4">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Projects That
              </span>
              <br />
              <span className="text-white">Dominate</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
              Real results. Real impact. Real domination.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'FinTech Revolution',
                category: 'Web App',
                description: 'AI-powered financial platform processing $50M+ monthly',
                metrics: ['10M+ users', '99.9% uptime', '2s load time'],
                gradient: 'from-purple-600 to-pink-600',
                image: '💰'
              },
              {
                title: 'HealthTech AI',
                category: 'Mobile App',
                description: 'Medical diagnosis app with 95% accuracy rate',
                metrics: ['500K downloads', '4.9★ rating', '50K daily'],
                gradient: 'from-green-600 to-blue-600',
                image: '🏥'
              },
              {
                title: 'E-Commerce Beast',
                category: 'Full Stack',
                description: 'Scalable platform handling 100K concurrent users',
                metrics: ['$10M revenue', '200% growth', '1M products'],
                gradient: 'from-orange-600 to-pink-600',
                image: '🛍️'
              },
              {
                title: 'SaaS Unicorn',
                category: 'Cloud Platform',
                description: 'B2B platform serving Fortune 500 companies',
                metrics: ['1000+ clients', '$5M ARR', '99.99% SLA'],
                gradient: 'from-blue-600 to-purple-600',
                image: '🦄'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500"
              >
                {/* Project Image/Icon */}
                <div className={`relative h-48 sm:h-56 md:h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                    {project.image}
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/50 backdrop-blur-xl rounded-full text-xs sm:text-sm font-bold">
                    {project.category}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 sm:p-6 lg:p-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-xs font-bold text-gray-300">{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <div className="flex items-center text-purple-400 group-hover:text-pink-400 transition-colors">
                    <span className="text-xs sm:text-sm font-bold">View Case Study</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS Section */}
      <section id="testimonials" className="relative py-20 sm:py-28 lg:py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm font-semibold">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 px-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Clients Love Us
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
              Don't take our word for it. Here's what legends say.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'CEO, TechCorp',
                company: 'Fortune 500',
                quote: 'Neblino Labs transformed our vision into reality. The results? 300% growth in 6 months. Absolute game-changers.',
                rating: 5,
                avatar: '👩‍💼'
              },
              {
                name: 'Marcus Rodriguez',
                role: 'CTO, StartupX',
                company: 'Series B Startup',
                quote: 'Best development team we\'ve ever worked with. Fast, professional, and they actually understand business goals.',
                rating: 5,
                avatar: '👨‍💻'
              },
              {
                name: 'Emily Watson',
                role: 'Founder, HealthAI',
                company: 'YC Backed',
                quote: 'They didn\'t just build our product—they built our competitive advantage. Worth every penny and more.',
                rating: 5,
                avatar: '👩‍⚕️'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-5 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                {/* Quote Icon */}
                <div className="text-4xl sm:text-5xl lg:text-6xl text-purple-500/20 mb-3 sm:mb-4">"</div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-base sm:text-lg lg:text-xl">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                  {testimonial.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-black text-white text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-purple-400">{testimonial.company}</div>
                  </div>
                </div>

                {/* Glow on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT Form Section */}
      <section id="contact" className="relative py-20 sm:py-28 lg:py-32 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block mb-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs sm:text-sm font-semibold">
                GET IN TOUCH
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 px-4">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's Build
              </span>
              <br />
              <span className="text-white">Together</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
              Ready to dominate your industry? Let's talk.
            </p>
          </div>

          {/* Contact Form */}
          <div className="relative p-5 sm:p-8 lg:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-2xl sm:rounded-3xl" />
            
            <form className="relative space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all outline-none text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all outline-none text-sm sm:text-base"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-300 mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all outline-none text-sm sm:text-base"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-300 mb-2">Project Budget</label>
                <select className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all outline-none text-sm sm:text-base">
                  <option value="">Select budget range</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k+">$100K+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-300 mb-2">Tell us about your project *</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all outline-none resize-none text-sm sm:text-base"
                  placeholder="Describe your project, goals, and timeline..."
                />
              </div>

              <button
                type="submit"
                className="group relative w-full px-8 py-4 sm:px-12 sm:py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-black text-base sm:text-lg lg:text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/50"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {[
              { icon: '📧', label: 'Email', value: 'hello@neblinolabs.com' },
              { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: '📍', label: 'Location', value: 'San Francisco, CA' }
            ].map((info, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl hover:border-white/20 transition-all">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{info.icon}</div>
                <div className="text-xs sm:text-sm text-gray-500 mb-1">{info.label}</div>
                <div className="font-bold text-white text-sm sm:text-base">{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Epic CTA Section */}
      <section className="relative py-20 sm:py-28 lg:py-32 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 md:p-16 lg:p-24 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-2xl border border-white/20 rounded-3xl lg:rounded-[3rem] overflow-hidden group hover:scale-105 transition-transform duration-700">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)] animate-pulse-slow" />
            
            {/* Floating Orbs */}
            <div className="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-500/30 rounded-full blur-3xl animate-float animation-delay-1000" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight px-4">
                Ready to Create
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  Something Legendary?
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Let's build the digital masterpiece that will make your competitors wonder what hit them
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <button className="group relative px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 bg-white text-black rounded-full font-black text-base sm:text-lg lg:text-xl hover:shadow-2xl hover:shadow-white/30 transform hover:scale-110 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Let's Talk Business</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
                <button className="group px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-full font-black text-base sm:text-lg lg:text-xl hover:bg-white/20 hover:border-white/50 transform hover:scale-110 transition-all duration-300">
                  <span className="flex items-center justify-center space-x-2">
                    <span>See Our Work</span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MONSTER Footer with Electric Energy */}
      <footer className="relative overflow-hidden z-10">
        {/* Electric Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.2),transparent_50%)]" />
        </div>
        
        {/* Animated Lightning Lines */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse animation-delay-1000" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Epic CTA Section */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl sm:blur-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-60 animate-pulse-glow" />
                <h3 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-gradient drop-shadow-2xl px-4">
                  Ready to Dominate?
                </h3>
              </div>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium px-4">
              Join the elite. Build legendary products. Crush the competition.
            </p>
            <button className="group relative px-8 py-4 sm:px-10 sm:py-4 lg:px-12 lg:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-black text-base sm:text-lg lg:text-xl overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/50">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Building Now</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Glowing Divider */}
          <div className="relative h-px mb-10 sm:mb-12 lg:mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-70 blur-sm" />
          </div>

          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
            {/* Logo & Description */}
            <div className="sm:col-span-2 text-center sm:text-left">
              <div className="group cursor-pointer mb-4 sm:mb-6 inline-block">
                <div className="relative h-12 sm:h-14 w-auto">
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                  <img src="/neblino.png" alt="Neblino Labs" className="relative h-full w-auto object-contain drop-shadow-2xl transform group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>
              <p className="text-gray-200 text-sm sm:text-base mb-6 sm:mb-8 max-w-sm leading-relaxed font-medium mx-auto sm:mx-0">
                Digital artists. Code wizards. Future builders. We don't follow trends—we create them.
              </p>
              
              {/* Social Links with Glow */}
              <div className="flex space-x-3 justify-center sm:justify-start">
                {[
                  { letter: 'T', label: 'Twitter', color: 'from-blue-500 to-cyan-400', href: 'https://twitter.com' },
                  { letter: 'L', label: 'LinkedIn', color: 'from-blue-600 to-blue-400', href: 'https://linkedin.com' },
                  { letter: 'G', label: 'GitHub', color: 'from-purple-600 to-pink-500', href: 'https://github.com' },
                  { letter: 'D', label: 'Dribbble', color: 'from-pink-500 to-rose-400', href: 'https://dribbble.com' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:border-white/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 text-xs sm:text-sm font-black text-white group-hover:scale-110 transition-transform">{social.letter}</span>
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className={`absolute -inset-1 bg-gradient-to-br ${social.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Links Sections - Horizontal on Mobile */}
            <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {[
                { 
                  title: 'SERVICES', 
                  links: [
                    { name: 'Web Development', href: '#services' },
                    { name: 'Mobile Apps', href: '#services' },
                    { name: 'Cloud Solutions', href: '#services' },
                    { name: 'AI Integration', href: '#services' }
                  ] 
                },
                { 
                  title: 'COMPANY', 
                  links: [
                    { name: 'Our Work', href: '#work' },
                    { name: 'Testimonials', href: '#testimonials' },
                    { name: 'Services', href: '#services' },
                    { name: 'Contact', href: '#contact' }
                  ] 
                },
                { 
                  title: 'CONNECT', 
                  links: [
                    { name: 'Get in Touch', href: '#contact' },
                    { name: 'View Projects', href: '#work' },
                    { name: 'Our Services', href: '#services' },
                    { name: 'Client Reviews', href: '#testimonials' }
                  ] 
                },
              ].map((category, index) => (
                <div key={index} className="text-center sm:text-left">
                  <h4 className="font-black text-xs uppercase tracking-widest mb-3 sm:mb-4 lg:mb-6 text-white">
                    {category.title}
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.href}
                          className="group text-gray-300 hover:text-white text-xs sm:text-sm transition-all duration-300 inline-flex items-center font-medium"
                        >
                          <span className="hidden sm:inline w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Bar with Glow */}
          <div className="relative pt-6 sm:pt-8 border-t border-white/20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
              <p className="text-gray-300 text-xs sm:text-sm font-medium">
                © 2026 Neblino Labs. Built with 
                <span className="inline-block mx-1 animate-pulse text-yellow-400">⚡</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 font-black">pure energy</span>
                <span className="inline-block mx-1 animate-pulse text-orange-400">🔥</span>
              </p>
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
                <a href="#contact" className="text-gray-300 hover:text-purple-300 transition-colors">Privacy</a>
                <a href="#contact" className="text-gray-300 hover:text-pink-300 transition-colors">Terms</a>
                <a href="#contact" className="text-gray-300 hover:text-blue-300 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
