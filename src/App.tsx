import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Award, 
  Compass, 
  Play, 
  Volume2, 
  Mail, 
  Send, 
  Star, 
  Layers, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Monitor,
  Video,
  Music4,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { PROJECTS, TESTIMONIALS, Project } from './data';

// --- Particle Background for Dark Sections ---
const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let iframeId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() * 0.2 - 0.1),
        opacity: Math.random() * 0.5 + 0.2,
        fadeSpeed: Math.random() * 0.005 + 0.002
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(10, 14, 26, 0.95)';
      ctx.fillRect(0, 0, width, height);

      // Warm radial glow in the center
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, 'rgba(201, 168, 76, 0.04)');
      grad.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw light particles (Gold dust effect)
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeSpeed;

        if (p.opacity <= 0.1 || p.opacity >= 0.8) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Reset particle if it drifts off top or sides
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.2;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }
      });

      iframeId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(iframeId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />;
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'branding' | 'web' | 'music' | 'creative'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Monitor scroll state for transparent-to-solid navbar transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple animation detector for scrolling reveal effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Filter projects based on Selected Category
  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  // Handle Contact Form Submit with JS Validation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please state your name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Please tell us a valid email address so we can connect.');
      return;
    }
    if (!projectType) {
      setErrorMsg('Please select a project type.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setErrorMsg('Please provide a short vision overview (at least 10 characters).');
      return;
    }

    // Success response
    setIsSuccess(true);
    // Reset Form Fields
    setName('');
    setEmail('');
    setProjectType('');
    setBudgetRange('');
    setMessage('');
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-gold selection:text-navy">
      
      {/* --- 1. STICKY NAVBAR --- */}
      <nav 
        id="navbar"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${
          scrolled 
            ? 'bg-navy/95 backdrop-blur-md border-b border-gold/15 shadow-xl' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-3 group focus:outline-none" id="nav-brand-link">
          {/* Circular logo reference */}
          <img 
            src="/input_file_0.png" 
            alt="Heaven Minded Studios Logo" 
            className="w-10 h-10 rounded-full border border-gold/40 group-hover:border-gold transition-colors object-cover"
            onError={(e) => {
              // fallback if not found
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-serif text-lg md:text-2xl font-bold text-gold tracking-tight group-hover:text-gold-hover transition-colors">
            Heaven Minded Studios
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium" id="nav-desktop-links">
          <a href="#home" className="text-ivory/80 hover:text-gold transition-colors focus:underline decoration-gold">Home</a>
          <a href="#services" className="text-ivory/80 hover:text-gold transition-colors focus:underline decoration-gold">Services</a>
          <a href="#portfolio" className="text-ivory/80 hover:text-gold transition-colors focus:underline decoration-gold">Portfolio</a>
          <a href="#about" className="text-ivory/80 hover:text-gold transition-colors focus:underline decoration-gold">About</a>
          <a href="#testimonials" className="text-ivory/80 hover:text-gold transition-colors focus:underline decoration-gold">Testimonials</a>
          <a href="#contact" className="text-ivory/80 hover:text-gold transition-colors focus:underline decoration-gold">Contact</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-navy font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md hover:shadow-gold/20 focus:scale-95"
            id="nav-cta-desktop"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden text-gold focus:outline-none p-2 rounded-md hover:bg-white/5"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          id="mobile-menu-toggle-btn"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Slide-down Menu */}
        <div 
          className={`absolute top-full left-0 right-0 bg-navy/98 backdrop-blur-xl border-b border-gold/25 flex flex-col items-center gap-6 py-8 px-6 transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'
          }`}
          id="nav-mobile-menu"
        >
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-lg text-ivory/90 hover:text-gold transition-colors font-serif"
          >
            Home
          </a>
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-lg text-ivory/90 hover:text-gold transition-colors font-serif"
          >
            Services
          </a>
          <a 
            href="#portfolio" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-lg text-ivory/90 hover:text-gold transition-colors font-serif"
          >
            Portfolio
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-lg text-ivory/90 hover:text-gold transition-colors font-serif"
          >
            About
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-lg text-ivory/90 hover:text-gold transition-colors font-serif"
          >
            Testimonials
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-lg text-ivory/90 hover:text-gold transition-colors font-serif"
          >
            Contact
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className="w-full text-center py-3 bg-gold text-navy font-bold text-sm uppercase tracking-widest rounded-sm mt-2"
          >
            Start a Project
          </a>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section 
        id="home" 
        className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-navy"
        aria-label="Introduction Screen"
      >
        {/* Interactive gold dust particle canvas background */}
        <HeroCanvas />

        {/* Ambient background decorative vectors & color glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center items-center text-center relative z-10 my-auto">
          <div className="max-w-4xl space-y-8 mt-4">
            
            {/* Soft, noble top label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/20 bg-gold-light text-gold text-xs uppercase tracking-widest animate-pulse font-medium">
              <Sparkles size={14} />
              <span>Designed for the Heavenly Minded</span>
            </div>

            {/* Main Luxury Header */}
            <h1 className="text-5xl md:text-8xl font-serif text-ivory tracking-tight leading-[1.05] font-light">
              Where <span className="italic text-gold font-normal">Vision</span> Meets <span className="font-medium text-white">Purpose.</span>
            </h1>

            {/* Subheadline matching high-end cinematic copy */}
            <p className="text-lg md:text-2xl text-ivory/80 font-light max-w-2xl mx-auto leading-relaxed">
              We compile premium brands, music, cinematic assets, and transcendent digital experiences designed to inspire faith, hope, healing, and leave eternal impact.
            </p>

            {/* Trust statement */}
            <p className="text-xs md:text-sm text-gold/80 tracking-widest uppercase font-mono">
              ★ Ghana & Global • Brand Storytelling directed by AD Prince
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-hover text-navy font-bold text-sm uppercase tracking-widest rounded-xs transition-all duration-300 shadow-xl shadow-gold/10 hover:-translate-y-0.5"
                id="hero-cta-primary"
              >
                Start a Project
              </a>
              <a 
                href="#portfolio" 
                className="w-full sm:w-auto px-8 py-4 border border-ivory/30 hover:border-gold hover:text-gold text-ivory bg-transparent font-bold text-sm uppercase tracking-widest rounded-xs transition-all duration-300"
                id="hero-cta-secondary"
              >
                View Our Work
              </a>
            </div>

          </div>
        </div>

        {/* Foot indicator & scroll down anchor of Hero */}
        <div className="relative z-10 w-full text-center flex flex-col items-center gap-2 opacity-80 pt-8" id="hero-footer-indicator">
          <span className="text-xs uppercase tracking-widest text-ivory/40">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-bounce mt-1" />
        </div>
      </section>

      {/* --- 3. SERVICES SECTION --- */}
      <section 
        id="services" 
        className="py-24 md:py-32 bg-ivory text-navy relative z-10"
        aria-labelledby="services-heading"
      >
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Section Heading & Intro */}
          <div className="max-w-3xl mb-16 md:mb-24 reveal-on-scroll">
            <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Our Ecosystem</span>
            <h2 id="services-heading" className="text-4xl md:text-6xl font-serif font-light text-navy mt-2 leading-tight">
              What We <span className="italic font-normal text-gold">Create</span>
            </h2>
            <p className="text-lg text-navy/75 font-light mt-4 leading-relaxed">
              Heaven Minded Studios blends creativity, storytelling, and intentional design-thinking to craft visual and auditory assets that move souls, elevate brands, and carry eternal weight.
            </p>
          </div>

          {/* 3-Column Responsive Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" id="services-grid">
            
            {/* Card A: Brand Identity */}
            <div className="group bg-white p-8 md:p-10 border border-gold/10 hover:border-gold/40 rounded-xs transition-all duration-500 hover:-translate-y-2 glow-box flex flex-col justify-between min-h-[420px]" id="service-branding">
              <div>
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <Award size={28} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-navy tracking-tight mb-4">Brand Identity</h3>
                <p className="text-navy/70 text-sm leading-relaxed font-light mb-6">
                  Establishing soulful, premium corporate and ministry symbols that resonate deeply across nations.
                </p>
                <ul className="space-y-2.5 text-xs text-navy/80 tracking-wide font-medium">
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Logo Design & Systems</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Comprehensive Typography Guidelines</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Creative Direction by AD Prince</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Premium Visual Guidelines</li>
                </ul>
              </div>
              <div className="pt-8">
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold font-bold group-hover:text-gold-hover transition-colors">
                  Inquire Now <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Card B: Web Design & Development */}
            <div className="group bg-white p-8 md:p-10 border border-gold/10 hover:border-gold/40 rounded-xs transition-all duration-500 hover:-translate-y-2 glow-box flex flex-col justify-between min-h-[420px]" id="service-web">
              <div>
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <Monitor size={28} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-navy tracking-tight mb-4">Web Design & Dev</h3>
                <p className="text-navy/70 text-sm leading-relaxed font-light mb-6">
                  High-converting, lightning-fast digital solutions with responsive frameworks and editorial flow.
                </p>
                <ul className="space-y-2.5 text-xs text-navy/80 tracking-wide font-medium">
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Custom Landing Portals</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Responsive Screen layouts</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Pure Cinematic Scroll Interactions</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Dynamic Optimization & SEO</li>
                </ul>
              </div>
              <div className="pt-8">
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold font-bold group-hover:text-gold-hover transition-colors">
                  Inquire Now <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Card C: Content & Media Production */}
            <div className="group bg-white p-8 md:p-10 border border-gold/10 hover:border-gold/40 rounded-xs transition-all duration-500 hover:-translate-y-2 glow-box flex flex-col justify-between min-h-[420px]" id="service-media">
              <div>
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <Video size={28} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-navy tracking-tight mb-4">Media Production</h3>
                <p className="text-navy/70 text-sm leading-relaxed font-light mb-6">
                  Full audio production, Gospel broadcast designs, custom musical scores, and social video.
                </p>
                <ul className="space-y-2.5 text-xs text-navy/80 tracking-wide font-medium">
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Custom Ministry Audio Production</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Faith-Based Campaigns & Broadcasts</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Podcasting & Musical Scoring</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> High-impact social Reels & Promos</li>
                </ul>
              </div>
              <div className="pt-8">
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold font-bold group-hover:text-gold-hover transition-colors">
                  Inquire Now <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- 4. PORTFOLIO SECTION --- */}
      <section 
        id="portfolio" 
        className="py-24 md:py-32 bg-navy text-ivory relative z-10"
        aria-labelledby="portfolio-heading"
      >
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Section title & intro */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Creative Statement</span>
              <h2 id="portfolio-heading" className="text-4xl md:text-6xl font-serif font-light text-ivory mt-2 leading-tight">
                Our Work <span className="italic font-normal text-gold">Speaks</span>
              </h2>
              <p className="text-ivory/70 text-sm md:text-base font-light mt-3">
                Every asset in our gallery is crafted with rigorous visual discipline under AD Prince’s direction, integrating spiritual values with award-level art aesthetics.
              </p>
            </div>

            {/* Premium Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-3 bg-navy-light/40 border border-gold/15 p-1.5 rounded-sm" id="playlist-tabs">
              {(['all', 'branding', 'web', 'music', 'creative'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-gold text-navy font-bold shadow'
                      : 'text-ivory/60 hover:text-gold hover:bg-gold/5'
                  }`}
                  id={`tab-filter-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout containing projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-navy-light border border-gold/10 hover:border-gold/30 rounded-xs overflow-hidden transition-all duration-500 hover:-translate-y-1 block focus:outline-none"
                style={{ contentVisibility: 'auto' }}
                id={`project-card-${project.id}`}
              >
                {/* Visual Cover Layer */}
                <div className="aspect-square relative overflow-hidden bg-navy-dark">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover origin-center transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle golden hover wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono mb-1">{project.categoryLabel}</span>
                    <h4 className="text-xl font-serif text-white font-medium">{project.title}</h4>
                    <p className="text-xs text-ivory/80 line-clamp-2 mt-1">{project.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gold uppercase tracking-wider font-bold mt-3">
                      Inspect Concept <ExternalLink size={12} />
                    </span>
                  </div>
                </div>

                {/* Plain label undercard for high accessibility */}
                <div className="p-5 border-t border-gold/10 flex justify-between items-center bg-navy/40">
                  <div>
                    <h3 className="text-base text-ivory font-serif group-hover:text-gold transition-colors">{project.title}</h3>
                    <p className="text-xs text-ivory/50 mt-1">{project.client}</p>
                  </div>
                  <ChevronRight size={18} className="text-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 5. ABOUT SECTION --- */}
      <section 
        id="about" 
        className="py-24 md:py-32 bg-ivory text-navy relative z-10 overflow-hidden"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Beautiful descriptive narrative */}
            <div className="lg:col-span-7 space-y-6 reveal-on-scroll">
              <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">The Visionary Heart</span>
              <h2 id="about-heading" className="text-4xl md:text-6xl font-serif font-light text-navy leading-[1.1]">
                Heaven Minded.<br />
                <span className="italic text-gold font-normal">Purpose Built.</span>
              </h2>
              
              <div className="space-y-4 text-navy/80 font-light leading-relaxed text-sm md:text-base">
                <p>
                  Heaven Minded Studios was founded on the radical belief that creative artistry should serve a greater, deeper spiritual purpose. We create music narratives, visual stories, custom branding systems, and gorgeous digital systems that uplift hope, inspire faith, and establish permanent impact.
                </p>
                <p>
                  Led by <strong>AD Prince</strong> — an acclaimed musician, digital content director, visual missionary, and strategist from Ghana — the studio exists to go beyond standard commercial entertainment. We translate deep spiritual themes into elite luxury aesthetic products.
                </p>
                <p className="italic font-serif border-l-2 border-gold/40 pl-4 text-navy/70 text-base">
                  &ldquo;Art isn't merely meant to catch eyes; it is meant to guide minds and touch hearts toward eternal paths.&rdquo; — AD Prince, Founder
                </p>
              </div>

              {/* Status metrics bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-navy/10" id="about-stats">
                <div className="text-center md:text-left">
                  <span className="block text-3xl md:text-4xl font-serif text-gold font-bold">50+</span>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-navy/60 font-mono mt-1">Creative Projects</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-3xl md:text-4xl font-serif text-gold font-bold">3+</span>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-navy/60 font-mono mt-1">Years Experience</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-3xl md:text-4xl font-serif text-gold font-bold">100%</span>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-navy/60 font-mono mt-1">Purpose-Driven</span>
                </div>
              </div>

              {/* CTA Pathway */}
              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-navy text-white text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-navy transition-all duration-300"
                >
                  Book AD Prince For Consultation <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right: Premium aesthetic photo mockup block */}
            <div className="lg:col-span-5 relative reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              
              {/* Golden frame background details */}
              <div className="absolute inset-4 border border-gold translate-x-3 translate-y-3 pointer-events-none" />
              
              {/* Core visual showcasing the brand portrait (mockup frame using gorgeous abstract theme) */}
              <div className="relative bg-navy p-2 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1542628682-88362ab61db0?auto=format&fit=crop&q=80&w=600" 
                  alt="Creative Workspace Editorial Portrait" 
                  className="w-full h-auto aspect-[3/4] object-cover"
                  loading="lazy"
                />
                
                {/* Float tag badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-navy/95 backdrop-blur-md p-4 border border-gold/20 text-white flex items-center gap-3">
                  <img 
                    src="/input_file_0.png" 
                    alt="HMS Seal" 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-gold">Ad Prince Ghana Studio</h4>
                    <p className="text-[10px] text-ivory/60 tracking-wider uppercase font-mono">Inspiring Hope Nationwide & Abroad</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 6. TESTIMONIALS SECTION --- */}
      <section 
        id="testimonials" 
        className="py-24 md:py-32 bg-navy text-ivory relative z-10"
        aria-labelledby="testimonials-heading"
      >
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl text-center mx-auto mb-16 md:mb-24 reveal-on-scroll">
            <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Authentic Voices</span>
            <h2 id="testimonials-heading" className="text-4xl md:text-6xl font-serif font-light text-center mt-2 leading-tight">
              Voices of <span className="italic font-normal text-gold">Impact</span>
            </h2>
            <p className="text-ivory/70 text-sm md:text-base font-light mt-3 max-w-xl mx-auto">
              Read how our divine art collaborations guide ministries, spiritual communities, and purposeful business groups to reach their divine visions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" id="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={t.id} 
                className="bg-navy-light p-8 border border-gold/10 hover:border-gold/30 rounded-xs flex flex-col justify-between transition-all duration-300 relative"
                id={`testimonial-card-${t.id}`}
              >
                {/* Top star indicators */}
                <div>
                  <div className="flex items-center gap-1 text-gold mb-6" aria-label="5 Star Review">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" className="text-gold" />
                    ))}
                  </div>

                  {/* Body textual quotes */}
                  <blockquote className="text-sm text-ivory/80 italic leading-relaxed font-light mb-8">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom author and business tag */}
                <div className="border-t border-gold/15 pt-5 flex items-center gap-3">
                  <div className="w-9 h-9 bg-gold/15 rounded-full flex items-center justify-center text-gold text-xs font-bold font-mono">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic block text-sm font-serif font-medium text-gold">{t.author}</cite>
                    <span className="block text-[10px] text-ivory/55 tracking-wider uppercase font-mono mt-0.5">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 7. CINEMATIC CTA BANNER --- */}
      <section 
        id="cta-banner" 
        className="py-20 bg-gradient-to-r from-gold/90 via-gold to-gold-hover text-navy text-center relative overflow-hidden z-10"
        aria-label="Direct Conversion Section"
      >
        {/* Subtle geometric particles decoration */}
        <div className="absolute inset-0 bg-white/5 opacity-40 mix-blend-overlay pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-widest text-navy/70 font-bold font-mono">Eternal Craftsmanship</span>
          <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight font-light leading-none">
            Ready to Build Something That <span className="font-bold underline decoration-navy decoration-wavy">Lasts?</span>
          </h2>
          <p className="text-base md:text-lg text-navy/80 max-w-xl mx-auto font-light leading-relaxed">
            Let’s collaborate with premium excellence to curate visual and auditory campaigns that resonate with divine hope, healing, and intentional power.
          </p>
          <div className="pt-2">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-navy hover:bg-navy/90 text-gold text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-xl focus:scale-95"
              id="banner-cta-btn"
            >
              Book AD Prince For Consultation <ArrowRight size={14} className="text-gold" />
            </a>
          </div>
        </div>
      </section>

      {/* --- 8. CONTACT SECTION --- */}
      <section 
        id="contact" 
        className="py-24 md:py-32 bg-ivory text-navy relative z-10"
        aria-labelledby="contact-heading"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left side: Premium intuitive contact form */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="reveal-on-scroll">
                <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Get in touch</span>
                <h2 id="contact-heading" className="text-4xl md:text-6xl font-serif font-light text-navy mt-1 leading-none">
                  Let’s <span className="italic font-normal text-gold">Connect</span>
                </h2>
                <p className="text-navy/70 font-light text-sm md:text-base mt-3">
                  State your creative vision and let's structure an impactful digital project together.
                </p>
              </div>

              {/* Error Alert Display */}
              {errorMsg && (
                <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-900 text-sm font-medium rounded-xs" role="alert" id="contact-error-alert">
                  {errorMsg}
                </div>
              )}

              {/* Success Banner Overlay */}
              {isSuccess ? (
                <div className="p-8 bg-green-50 border border-emerald-300 text-navy rounded-xs space-y-4 shadow-sm" id="contact-success-block">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check size={24} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy">Message Received!</h3>
                  <p className="text-sm text-navy/70 leading-relaxed font-light">
                    Thank you for reaching out to Heaven Minded Studios. AD Prince and our production team will inspect your message and connect within 24 hours. Let's create something timeless!
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-4 py-2 bg-navy text-gold font-bold text-xs uppercase tracking-widest rounded-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6" id="consultation-booking-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name-input" className="block text-xs uppercase tracking-wider font-bold text-navy">Your Name *</label>
                      <input 
                        type="text" 
                        id="name-input" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Michael Osei"
                        className="w-full bg-white border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold p-4 text-sm text-navy rounded-xs focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email-input" className="block text-xs uppercase tracking-wider font-bold text-navy">Your Email *</label>
                      <input 
                        type="email" 
                        id="email-input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. michael@salvations.org"
                        className="w-full bg-white border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold p-4 text-sm text-navy rounded-xs focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="project-type-select" className="block text-xs uppercase tracking-wider font-bold text-navy">Project Category *</label>
                      <select 
                        id="project-type-select" 
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-white border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold p-4 text-sm text-navy rounded-xs focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select Category...</option>
                        <option value="Branding & Visuals">Branding & Logo Systems</option>
                        <option value="Premium Webb Experience">Premium Web Design & Dev</option>
                        <option value="Music & Audio Production">Music & Soundtrack Scoring</option>
                        <option value="Ministry Broadcaster Package">Ministry Multi-Media & Broadcaster assets</option>
                        <option value="Other Project">Other Creative Campaign</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget-select" className="block text-xs uppercase tracking-wider font-bold text-navy">Investment Scope</label>
                      <select 
                        id="budget-select" 
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full bg-white border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold p-4 text-sm text-navy rounded-xs focus:outline-none transition-colors"
                      >
                        <option value="">Select Range...</option>
                        <option value="Standard Ministry Package">Standard Package</option>
                        <option value="Global Branding Standard">Global Enterprise Standard</option>
                        <option value="Strategic Storytelling Partnership">Long-Term Creative Partnership</option>
                        <option value="Undetermined">To Be Outlined During Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message-textarea" className="block text-xs uppercase tracking-wider font-bold text-navy">Your Vision *</label>
                    <textarea 
                      id="message-textarea" 
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a short summary of how Heaven Minded Studios can help you inspire, transform, and communicate with divine purpose..."
                      className="w-full bg-white border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold p-4 text-sm text-navy rounded-xs focus:outline-none transition-colors"
                      required
                    ></textarea>
                    <span className="text-navy/40 text-[10px] block text-right">Minimum 10 characters required.</span>
                  </div>

                  <button 
                    type="submit"
                    className="w-full block text-center py-4 bg-navy hover:bg-gold text-white hover:text-navy hover:shadow-lg transition-all duration-300 font-bold text-xs uppercase tracking-widest rounded-sm"
                    id="submit-form-btn"
                  >
                    Send Creative Brief <Send size={12} className="inline ml-1.5" />
                  </button>
                </form>
              )}

            </div>

            {/* Right side: Studio coordinates & socials */}
            <div className="lg:col-span-5 lg:pl-8 space-y-10" id="contact-coordinates">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Location & Coordinates</span>
                <p className="text-navy/70 text-sm font-light leading-relaxed">
                  Headquartered in Accra, Ghana, supporting ministries and cinematic digital platforms around the world.
                </p>
                <div className="flex items-center gap-2 text-sm text-navy/80 font-medium">
                  <MapPin size={16} className="text-gold" />
                  <span>Accra, Ghana (Global Support)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy/80 font-medium">
                  <Mail size={16} className="text-gold" />
                  <a href="mailto:hello@heavenmindedstudios.com" className="hover:text-gold transition-colors">hello@heavenmindedstudios.com</a>
                </div>
              </div>

              {/* Founder Bio Anchor */}
              <div className="p-6 bg-white border border-gold/15 rounded-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img src="/input_file_0.png" alt="HMS" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-navy">AD Prince</h3>
                    <p className="text-[10px] text-navy/50 font-mono tracking-widest uppercase">Founder & Creative Director</p>
                  </div>
                </div>
                <p className="text-xs text-navy/70 leading-relaxed font-light">
                  AD Prince personally champions each premium project to guarantee beautiful pixel alignment and soulful theological intent.
                </p>
              </div>

              {/* Social Channels List */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-navy/50 font-bold font-mono block">Creative Portals</span>
                <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-navy/80">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">Instagram <ExternalLink size={10} /></a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">YouTube <ExternalLink size={10} /></a>
                  <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">Behance <ExternalLink size={10} /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">LinkedIn <ExternalLink size={10} /></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 9. FOOTER --- */}
      <footer 
        id="footer" 
         className="bg-navy text-ivory/60 text-sm py-12 border-t border-gold/15"
         aria-label="Copyright footer"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <img src="/input_file_0.png" alt="HMS Seal" className="w-8 h-8 rounded-full" />
                <span className="font-serif text-lg font-bold text-gold">Heaven Minded Studios</span>
              </div>
              <p className="text-xs text-ivory/70 max-w-sm font-light">
                &ldquo;Beyond Entertainment &mdash; We Inspire.&rdquo; Inspiring faith, absolute hope, visual transformation, and structural digital aesthetics.
              </p>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a href="#home" className="hover:text-white transition-colors">Home</a>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
                <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold font-mono">Creative Statement</h4>
              <p className="text-[11px] text-ivory/50 font-light leading-relaxed">
                AD Prince is dedicated to creating global visual systems for standard nonprofits, progressive ministries, and purpose-focused enterprise setups.
              </p>
            </div>

          </div>

          <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
            <span>&copy; {new Date().getFullYear()} Heaven Minded Studios. Accra, Ghana & Global.</span>
            <div className="flex gap-6">
              <a href="#home" className="hover:text-white transition-colors">Top of Page ↑</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- PREMIUM COMPONENT: PROJECT DETAIL MODAL --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedProject(null)}
          id="project-detail-lightbox"
        >
          <div 
            className="bg-navy border border-gold/30 w-full max-w-4xl rounded-xs overflow-hidden shadow-2xl relative block"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-navy/80 hover:bg-gold text-white hover:text-navy p-2 rounded-full transition-colors border border-gold/25"
              aria-label="Close Project Lightbox"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Product poster Image showcase */}
              <div className="bg-navy-dark flex items-center justify-center p-4">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-auto max-h-[500px] object-contain rounded-xs border border-gold/10"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text metadata specifications */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 text-ivory">
                <div className="space-y-4">
                  <span className="inline-block text-xs uppercase tracking-widest text-gold font-bold font-mono px-2.5 py-1 bg-gold-light border border-gold/20 rounded-full">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight font-medium">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="space-y-1 py-2 border-y border-gold/10">
                    <span className="block text-xs uppercase tracking-wider text-ivory/50 font-mono">CLIENT / INITIATIVE</span>
                    <span className="text-sm font-semibold text-gold">{selectedProject.client}</span>
                  </div>

                  <p className="text-sm text-ivory/80 leading-relaxed font-light">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-4 pt-6">
                  <p className="text-xs text-gold/80 italic font-mono uppercase tracking-widest">
                    ★ Designed in Ghana by AD Prince
                  </p>
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedProject(null)}
                    className="w-full block text-center py-3 bg-gold hover:bg-gold-hover text-navy text-xs uppercase tracking-widest font-bold tracking-widest transition-all duration-300"
                  >
                    Discuss Similar Project
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
