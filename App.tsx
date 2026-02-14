import React, { useState, useEffect } from 'react';
import { View, Course, User, ChatMessage } from './types';
import { COURSES, CATEGORIES, COURSE_TOPICS } from './constants';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import AITutor from './components/AITutor';
// Fix: Added GraduationCap to the lucide-react imports
import { ChevronRight, ArrowLeft, PlayCircle, Lock, ShieldCheck, Globe, Users, Award, Star, Search, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: 'Alex Rivera', email: 'alex@example.com' });
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setView('home');
  };

  const filteredCourses = COURSES.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingCourses = COURSES.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isLoggedIn={isLoggedIn} 
        user={user} 
        logout={handleLogout} 
      />

      <main className="flex-grow">
        {/* HOME VIEW */}
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50 to-transparent -z-10 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-bounce shadow-sm border border-indigo-100">
                        <Star size={14} fill="currentColor" />
                        Next-Gen Tech Education
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                        Master the Stack. <br />
                        <span className="text-indigo-600">Architect the Future.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-12 leading-relaxed">
                        Learn Rust systems, Ethereum smart contracts, and high-performance backend development from industry-leading architects.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <button 
                            onClick={() => setView('courses')}
                            className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            Explore Courses <ChevronRight size={20} />
                        </button>
                        <button 
                            onClick={() => setView('about')}
                            className="bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-black shadow-xl shadow-slate-100 hover:bg-slate-50 hover:-translate-y-1 transition-all"
                        >
                            Our Methodology
                        </button>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-12 grayscale opacity-40">
                        <span className="text-2xl font-black tracking-tighter">BLOCKCHAIN</span>
                        <span className="text-2xl font-black tracking-tighter">FINTECH</span>
                        <span className="text-2xl font-black tracking-tighter">SAAS</span>
                        <span className="text-2xl font-black tracking-tighter">DEVOP</span>
                    </div>
                </div>
            </section>

            {/* Stats / Proof */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100">
                    {[
                        { icon: <Users size={24} />, label: "Students", val: "50k+" },
                        { icon: <Globe size={24} />, label: "Countries", val: "120+" },
                        { icon: <ShieldCheck size={24} />, label: "Security Experts", val: "200+" },
                        { icon: <Award size={24} />, label: "Certifications", val: "15k+" }
                    ].map((s, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-indigo-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{s.icon}</div>
                            <div className="text-3xl font-black text-slate-900 mb-1">{s.val}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Featured Courses */}
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Trending Curriculums</h2>
                    <p className="text-slate-500 mt-2 font-medium">Updated weekly based on industry demand.</p>
                </div>
                <button 
                    onClick={() => setView('courses')}
                    className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                >
                    See all <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {trendingCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onClick={(c) => { setSelectedCourse(c); setView('single'); }} 
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CATALOG VIEW */}
        {view === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-in slide-in-from-bottom duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
                <div className="flex-grow w-full max-w-lg">
                    <h2 className="text-4xl font-black mb-4 tracking-tighter">Find Your Path</h2>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search skill, language or tool..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all ${
                                activeCategory === cat 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onClick={(c) => { setSelectedCourse(c); setView('single'); }} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                    <div className="inline-block p-6 rounded-full bg-slate-100 text-slate-400 mb-6">
                        <Search size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No courses found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SINGLE COURSE VIEW */}
        {view === 'single' && selectedCourse && (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <button 
              onClick={() => setView('courses')}
              className="group flex items-center gap-2 text-indigo-600 font-bold mb-10 hover:-translate-x-1 transition-transform"
            >
              <ArrowLeft size={20} /> Back to Catalog
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">{selectedCourse.category}</span>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{selectedCourse.level}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
                        {selectedCourse.title}
                    </h1>
                    <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                        {selectedCourse.longDescription || selectedCourse.description}
                    </p>
                    
                    <h3 className="text-2xl font-black mb-8 border-l-4 border-indigo-600 pl-4 uppercase tracking-tighter">Syllabus Overview</h3>
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-100 overflow-hidden">
                        <div className="divide-y divide-slate-50">
                            {COURSE_TOPICS.map((topic, i) => (
                                <div key={i} className="p-7 flex justify-between items-center group hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                            {i + 1}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <PlayCircle size={20} className="text-indigo-600" />
                                            <span className="font-bold text-slate-800 text-lg">{topic}</span>
                                        </div>
                                    </div>
                                    <Lock size={18} className="text-slate-200" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-28 space-y-8">
                        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-2xl shadow-indigo-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                            
                            <img 
                                src={selectedCourse.image} 
                                className="rounded-3xl mb-8 h-56 w-full object-cover shadow-lg"
                                alt={selectedCourse.title}
                            />
                            
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-1">Lifetime Access</span>
                                    <div className="text-5xl font-black text-slate-900">${selectedCourse.price}</div>
                                </div>
                                <div className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl font-black text-sm uppercase">Best Seller</div>
                            </div>

                            <button 
                                onClick={() => !isLoggedIn && setView('login')}
                                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all mb-4"
                            >
                                Enroll Now
                            </button>
                            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                                Includes 30-Day Money Back Guarantee
                            </p>
                        </div>

                        <div className="bg-indigo-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mb-12 -mr-12"></div>
                            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                                <Search size={20} className="text-indigo-400" /> AI-Assisted Learning
                            </h4>
                            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                                Every course comes with an AI Personal Tutor available 24/7 to explain concepts and review your code.
                            </p>
                            <button 
                                onClick={() => document.querySelector('button[class*="group bg-indigo-600"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}
                                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-2xl font-black text-sm transition-all"
                            >
                                Chat with AI Tutor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* ABOUT VIEW */}
        {view === 'about' && (
          <section className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in duration-500">
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">We craft the next generation of engineers.</h2>
            <div className="prose prose-lg text-slate-500 font-medium">
                <p className="text-xl mb-6">EduStream Pro was born out of a simple observation: traditional education moves too slow for the tech industry.</p>
                <p className="mb-6">Founded in 2024, our platform connects top-tier architects from global tech companies with eager learners. We don't just teach languages; we teach the architecture, the memory models, and the security mindsets required to build high-stakes software.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl">
                    <h4 className="font-black text-xl mb-4">Our Values</h4>
                    <ul className="space-y-4 text-slate-500 font-medium">
                        <li className="flex items-start gap-3"><ChevronRight className="text-indigo-600 mt-1" size={18}/> Hands-on project based learning</li>
                        <li className="flex items-start gap-3"><ChevronRight className="text-indigo-600 mt-1" size={18}/> Zero-theory-bloat curriculum</li>
                        <li className="flex items-start gap-3"><ChevronRight className="text-indigo-600 mt-1" size={18}/> AI integrated tutoring</li>
                    </ul>
                </div>
                <div className="bg-indigo-50 p-10 rounded-[40px] border border-indigo-100">
                    <h4 className="font-black text-xl text-indigo-900 mb-4">Instructor Profile</h4>
                    <p className="text-indigo-800/70 font-medium">Our average instructor has 12+ years of experience and has worked at companies like Google, AWS, and leading DeFi protocols.</p>
                </div>
            </div>
          </section>
        )}

        {/* CONTACT VIEW */}
        {view === 'contact' && (
          <section className="max-w-6xl mx-auto px-4 py-24 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Get in touch.</h2>
                    <p className="text-xl text-slate-500 mb-12 font-medium">Need custom enterprise training or have a specific question? We're here to help you scale.</p>
                    
                    <div className="space-y-8">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center text-indigo-600 shadow-sm"><Users size={24}/></div>
                            <div>
                                <h5 className="font-bold text-slate-800">Support Team</h5>
                                <p className="text-sm text-slate-400">Response within 2 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center text-indigo-600 shadow-sm"><Globe size={24}/></div>
                            <div>
                                <h5 className="font-bold text-slate-800">Global Offices</h5>
                                <p className="text-sm text-slate-400">London, San Francisco, Singapore</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[48px] shadow-2xl shadow-slate-100 border border-slate-50">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Name</label>
                                <input type="text" placeholder="John Doe" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Email</label>
                                <input type="email" placeholder="john@example.com" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Subject</label>
                            <input type="text" placeholder="Inquiry about Rust course" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Message</label>
                            <textarea rows={5} placeholder="Tell us how we can help..." className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium resize-none"></textarea>
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
          </section>
        )}

        {/* LOGIN VIEW */}
        {view === 'login' && (
          <section className="min-h-[80vh] flex items-center justify-center px-4 py-20 animate-in zoom-in-95 duration-500">
            <div className="bg-white w-full max-w-md p-10 rounded-[48px] shadow-2xl border border-slate-50 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-8 shadow-inner">
                    <UserIcon size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">Welcome Back</h2>
                <p className="text-slate-500 font-medium mb-10">Sign in to continue your journey.</p>
                
                <div className="space-y-4 mb-10">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 ring-indigo-500/20 outline-none font-medium" 
                        defaultValue="alex@example.com"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 ring-indigo-500/20 outline-none font-medium" 
                        defaultValue="••••••••"
                    />
                </div>

                <button 
                    onClick={handleLogin}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all mb-6"
                >
                    Sign In
                </button>
                
                <p className="text-sm text-slate-400 font-bold">
                    Don't have an account? <button className="text-indigo-600 hover:underline">Sign up for free</button>
                </p>
            </div>
          </section>
        )}
      </main>

      {/* AI Assistant - Always Available */}
      <AITutor />

      <footer className="bg-slate-900 text-white py-24 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white"><GraduationCap size={20} /></div>
                    <span className="text-lg font-black tracking-tighter uppercase italic">EduStream</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Elevating tech careers through specialized, high-performance training curriculums and AI-assisted learning.
                </p>
                <div className="flex gap-4">
                    {['twitter', 'github', 'linkedin'].map(s => (
                        <div key={s} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-indigo-600 transition-all cursor-pointer">
                            <i className={`fab fa-${s}`}></i>
                        </div>
                    ))}
                </div>
            </div>

            {[
                { title: "Curriculum", links: ["All Courses", "Rust", "Solidity", "Go Backend", "React Masters"] },
                { title: "Company", links: ["Our Story", "Methodology", "Instructors", "Careers", "News"] },
                { title: "Resources", links: ["AI Assistant", "Documentation", "Community", "Partner Program", "Scholarship"] }
            ].map(col => (
                <div key={col.title}>
                    <h5 className="font-black text-sm uppercase tracking-widest mb-8 text-indigo-400">{col.title}</h5>
                    <ul className="space-y-4">
                        {col.links.map(l => (
                            <li key={l} className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">
                                {l}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2026 EduStream Pro. Designed for performance.</p>
            <div className="flex gap-8">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

// Helper component for Login View Icons
const UserIcon: React.FC<{ size: number }> = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);