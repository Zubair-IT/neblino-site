'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'web-dev',
      icon: '🚀',
      title: 'Web Development',
      tagline: 'Lightning-Fast Digital Experiences',
      description: 'We build blazing-fast, pixel-perfect web applications that leave your competitors in the dust. From sleek landing pages to complex web platforms.',
      features: [
        'Next.js & React Mastery',
        'Performance Optimization',
        'SEO & Analytics Integration',
        'Progressive Web Apps',
        'API Development & Integration',
        'Real-time Features'
      ],
      gradient: 'from-purple-600 via-pink-600 to-purple-600',
      stats: { projects: '200+', satisfaction: '99%', speed: '3x faster' }
    },
    {
      id: 'mobile-apps',
      icon: '📱',
      title: 'Mobile Apps',
      tagline: 'Native Experiences That Wow',
      description: 'Create stunning mobile experiences that users love. Native iOS and Android apps that feel smooth, look beautiful, and perform flawlessly.',
      features: [
        'React Native Development',
        'iOS & Android Native',
        'Cross-Platform Solutions',
        'App Store Optimization',
        'Push Notifications',
        'Offline-First Architecture'
      ],
      gradient: 'from-pink-600 via-orange-500 to-pink-600',
      stats: { downloads: '1M+', rating: '4.8★', retention: '85%' }
    },
    {
      id: 'cloud',
      icon: '☁️',
      title: 'Cloud Architecture',
      tagline: 'Infinitely Scalable Infrastructure',
      description: 'Build cloud infrastructure that scales with your ambitions. From serverless to Kubernetes, we architect solutions that grow effortlessly.',
      features: [
        'AWS & Azure Expertise',
        'Serverless Architecture',
        'Kubernetes & Docker',
        'CI/CD Pipelines',
        'Auto-Scaling Solutions',
        'Cost Optimization'
      ],
      gradient: 'from-blue-600 via-purple-600 to-blue-600',
      stats: { uptime: '99.99%', scale: '10x growth', cost: '40% saved' }
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'AI Integration',
      tagline: 'Intelligence That Feels Like Magic',
      description: 'Integrate cutting-edge AI that makes your product feel magical. From ChatGPT to custom ML models, we bring intelligence to your apps.',
      features: [
        'GPT Integration',
        'Custom ML Models',
        'Computer Vision',
        'Natural Language Processing',
        'Recommendation Systems',
        'Predictive Analytics'
      ],
      gradient: 'from-green-600 via-blue-600 to-green-600',
      stats: { accuracy: '95%+', automation: '70% tasks', roi: '300%' }
    },
    {
      id: 'design',
      icon: '🎨',
      title: 'UI/UX Design',
      tagline: 'Interfaces That Win Awards',
      description: 'Design interfaces so beautiful they win awards before launch. User experiences that convert visitors into loyal customers.',
      features: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Design Systems',
        'Interaction Design',
        'Accessibility (WCAG)',
        'Brand Identity'
      ],
      gradient: 'from-purple-600 via-blue-600 to-purple-600',
      stats: { conversion: '+150%', engagement: '+200%', awards: '12' }
    },
    {
      id: 'performance',
      icon: '⚡',
      title: 'Performance Optimization',
      tagline: 'Speed That Makes Google Jealous',
      description: 'Optimize your apps to lightning speed. Core Web Vitals, load times, and performance metrics that dominate the competition.',
      features: [
        'Core Web Vitals Optimization',
        'Code Splitting & Lazy Loading',
        'Image & Asset Optimization',
        'Caching Strategies',
        'Database Query Optimization',
        'CDN Configuration'
      ],
      gradient: 'from-yellow-600 via-orange-600 to-yellow-600',
      stats: { speed: '90+ score', load: '<1s', bounce: '-60%' }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold">
              OUR SERVICES
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Services That
            </span>
            <br />
            <span className="text-white">Dominate</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We don't just build products. We craft legendary digital experiences that make your competitors wonder how you did it.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-700 overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveService(index)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
                
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="text-7xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {service.icon}
                  </div>
                  
                  {/* Title & Tagline */}
                  <h3 className="text-4xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="text-lg text-purple-400 font-bold mb-6">
                    {service.tagline}
                  </p>
                  
                  {/* Description */}
                  <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed mb-8 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-6 pt-6 border-t border-white/10">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Arrow */}
                  <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="relative p-16 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-2xl border border-white/20 rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient" />
            
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Ready to Build
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Something Epic?
                </span>
              </h2>
              <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Let's discuss your project and create something that dominates your industry.
              </p>
              <Link href="/#contact">
                <button className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-xl hover:shadow-2xl hover:shadow-white/30 transform hover:scale-110 transition-all duration-300">
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
