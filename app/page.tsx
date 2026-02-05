'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
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
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Nebula Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Nebula Clouds */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-nebula-1" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] animate-nebula-2" />
          <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[110px] animate-nebula-3" />
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-16 h-16 transform group-hover:scale-110 transition-all duration-500">
                  <img src="/neblino-logo.png" alt="Neblino Labs" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black leading-none bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  Neblino
                </span>
                <span className="text-xl font-bold leading-none text-gray-400">
                  LABS
                </span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white transition-colors group py-2"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 group-hover:w-full transition-all duration-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                </a>
              ))}
            </div>
            <button className="relative group px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-bold overflow-hidden">
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
          {/* Floating Badge with Pulse */}
          <div 
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full mb-8 group hover:scale-105 transition-transform duration-300"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
            }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
            </span>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Available for new projects</span>
          </div>

          {/* Epic Main Heading with 3D Effect */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 leading-[0.9] tracking-tight">
            <div className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-50 animate-pulse-slow" />
              <span className="relative inline-block animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] transform hover:scale-105 transition-transform duration-300">
                We Build
              </span>
            </div>
            <br />
            <div className="relative inline-block mt-4">
              <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 blur-3xl opacity-60 animate-pulse-glow" />
              <span className="relative bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Digital
              </span>
            </div>
            <br />
            <div className="relative inline-block mt-4">
              <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-3xl opacity-60 animate-pulse-glow animation-delay-1000" />
              <span className="relative bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                Masterpieces
              </span>
            </div>
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            We don't just code. We craft
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"> legendary digital experiences </span>
            that make your competitors wonder how you did it
          </p>

          {/* Epic CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-bold text-xl overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/50">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Your Project</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="group relative px-10 py-5 bg-white/5 backdrop-blur-2xl border-2 border-white/10 rounded-full font-bold text-xl hover:bg-white/10 hover:border-white/20 transform hover:scale-110 transition-all duration-300">
              <span className="flex items-center space-x-2">
                <span>View Our Magic</span>
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: '500+', label: 'Projects Launched', icon: '🚀' },
              { number: '300+', label: 'Happy Clients', icon: '😍' },
              { number: '100+', label: 'Team Experts', icon: '👥' },
              { number: '20+', label: 'Years Combined', icon: '⚡' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl hover:bg-white/10 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-5xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{stat.icon}</div>
                  <div className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full animate-scroll" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Services Section with Magnetic Cards */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold">
                OUR SUPERPOWERS
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                What We Master
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              We don't follow trends. We create them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group relative p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-700 overflow-hidden cursor-pointer transform hover:scale-105 hover:-rotate-1"
                style={{ animationDelay: service.delay }}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-gradient`} />
                
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                {/* Icon with 3D Effect */}
                <div className="relative text-7xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-2xl">
                  {service.icon}
                </div>
                
                {/* Content */}
                <h3 className="relative text-3xl font-black mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                  {service.title}
                </h3>
                <p className="relative text-gray-400 group-hover:text-gray-300 leading-relaxed text-lg transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="relative mt-8 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-3 transition-all duration-500">
                  <span className="text-sm font-bold">Explore More</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Epic CTA Section */}
      <section className="relative py-40 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative p-16 md:p-24 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-2xl border border-white/20 rounded-[3rem] overflow-hidden group hover:scale-105 transition-transform duration-700">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)] animate-pulse-slow" />
            
            {/* Floating Orbs */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl animate-float animation-delay-1000" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                Ready to Create
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  Something Legendary?
                </span>
              </h2>
              <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Let's build the digital masterpiece that will make your competitors wonder what hit them
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-xl hover:shadow-2xl hover:shadow-white/30 transform hover:scale-110 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Let's Talk Business</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
                <button className="group px-12 py-6 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-full font-black text-xl hover:bg-white/20 hover:border-white/50 transform hover:scale-110 transition-all duration-300">
                  <span className="flex items-center space-x-2">
                    <span>See Our Work</span>
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 border-t border-white/10 z-10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6 group cursor-pointer">
                <div className="relative w-14 h-14 transform group-hover:scale-110 transition-all duration-500">
                  <img src="/neblino-logo.png" alt="Neblino Labs" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black leading-none bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Neblino
                  </span>
                  <span className="text-lg font-bold leading-none text-gray-400">
                    LABS
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
                We're not just developers. We're digital artists crafting the future, one masterpiece at a time.
              </p>
              <div className="flex space-x-4">
                {['T', 'L', 'G', 'D'].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group relative w-12 h-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-125 transition-all duration-300"
                  >
                    <span className="text-sm font-bold">{social}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            {[
              { title: 'Services', links: ['Web Dev', 'Mobile Apps', 'Cloud', 'AI/ML'] },
              { title: 'Company', links: ['About', 'Team', 'Careers', 'Contact'] },
              { title: 'Resources', links: ['Blog', 'Case Studies', 'Docs', 'Support'] },
            ].map((category, index) => (
              <div key={index}>
                <h4 className="font-black text-lg mb-6">{category.title}</h4>
                <ul className="space-y-3">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-lg">
              © 2026 Neblino Labs. Crafted with 💜, ⚡, and pure magic.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
