import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { 
  Mail, MapPin, Linkedin, ExternalLink, Award, TrendingUp, 
  Calendar, Building2, GraduationCap, Code2, Database, 
  GitBranch, Layers, ChevronDown, Send, Briefcase, Star
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, LineChart, Line
} from "recharts";

// Skills Data for Charts
const skillsRadarData = [
  { skill: "Angular", level: 95, fullMark: 100 },
  { skill: "React", level: 90, fullMark: 100 },
  { skill: "CSS/SCSS", level: 95, fullMark: 100 },
  { skill: "TypeScript", level: 92, fullMark: 100 },
  { skill: "Animations", level: 88, fullMark: 100 },
  { skill: "UI/UX", level: 90, fullMark: 100 },
];

const skillsBarData = [
  { name: "Angular", level: 95, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "CSS/SCSS", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 92, category: "Frontend" },
  { name: "JavaScript", level: 94, category: "Frontend" },
  { name: "HTML5", level: 98, category: "Frontend" },
  { name: "Tailwind", level: 88, category: "Styling" },
  { name: "Animations", level: 85, category: "Styling" },
  { name: "Figma", level: 80, category: "Styling" },
];

// Career Growth Data
const careerGrowthData = [
  { year: "2014", role: "IT Analyst", level: 1, company: "Serco" },
  { year: "2018", role: "Frontend Dev", level: 2, company: "Paychex" },
  { year: "2021", role: "Angular Dev", level: 3, company: "IBM" },
  { year: "2021", role: "Senior Dev", level: 4, company: "Transamerica" },
  { year: "2022", role: "Lead Engineer", level: 5, company: "Wells Fargo" },
  { year: "2023", role: "Lead Engineer", level: 6, company: "Transamerica" },
];

// Project Impact Data
const projectImpactData = [
  { metric: "Users Reached", value: 5, unit: "M+", color: "#38bdf8" }, // blue
  { metric: "Components Built", value: 50, unit: "+", color: "#f59e0b" }, // orange
  { metric: "Performance Score", value: 98, unit: "/100", color: "#a21caf" }, // purple
];

// Animated Counter Hook
const useCountUp = (end, duration = 2000, start = 0, decimals = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = progress * (end - start) + start;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, start]);

  return { count, ref };
};

// Section Reveal Hook
const useSectionReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { isVisible, ref };
};

// Hero Section
const HeroSection = () => {
  const aumCounter = useCountUp(5.7, 2500, 0, 1); // Added decimals=1 for 5.7
  const savingsCounter = useCountUp(12, 2500);
  const yearsCounter = useCountUp(7, 2000);

  return (
    <section className="hero-section" data-testid="hero-section">
      {/* Background Image only, no overlay, no profile image */}
      <div className="hero-bg no-blur" style={{ backgroundImage: "url(assets/roshan3.jpeg)" }} />
      <div className="hero-particles"></div>
      <nav className="nav-bar" data-testid="navigation">
        <div className="nav-logo">
          <span className="logo-text">Roshan Rajani</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link nav-link-cta">Get in Touch</a>
        </div>
      </nav>

      <div className="hero-content no-bg">
        {/* Profile image removed for full background visibility */}
        <div className="hero-badge no-bg-badge">
          <Award className="badge-icon" size={16} />
          <span>STAR Award Winner • UI Excellence</span>
        </div>
        <h1 className="hero-title no-bg-title">
          Crafting <span className="gradient-text">Beautiful User</span>
          <br />
          Experiences
        </h1>
        <p className="hero-subtitle no-bg-subtitle">
          Senior UI Developer with 7+ years of expertise creating pixel-perfect interfaces, 
          seamless animations, and intuitive user experiences. Passionate about turning 
          complex requirements into elegant, performant frontend solutions.
        </p>
        <div className="hero-stats no-bg-stats" data-testid="hero-stats">
          <div className="stat-card no-bg-stat" ref={aumCounter.ref}>
            <div className="stat-value no-bg-value">
              {aumCounter.count.toFixed(1)}
              <span className="stat-suffix">M+</span>
            </div>
            <div className="stat-label no-bg-label">Users Impacted</div>
          </div>
          <div className="stat-card no-bg-stat" ref={savingsCounter.ref}>
            <div className="stat-value no-bg-value">
              {savingsCounter.count}
              <span className="stat-suffix">+</span>
            </div>
            <div className="stat-label no-bg-label">Projects Delivered</div>
          </div>
          <div className="stat-card no-bg-stat" ref={yearsCounter.ref}>
            <div className="stat-value no-bg-value">
              {yearsCounter.count}
              <span className="stat-suffix">+</span>
            </div>
            <div className="stat-label no-bg-label">Years of UI Craft</div>
          </div>
        </div>
        <div className="hero-buttons no-bg-buttons">
          <a href="#projects" className="btn-primary no-bg-btn" data-testid="view-projects-btn">
            <Briefcase size={18} />
            View Projects
          </a>
          <a href="#contact" className="btn-secondary no-bg-btn" data-testid="contact-btn">
            <Mail size={18} />
            Get in Touch
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <ChevronDown className="scroll-icon" />
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { isVisible, ref } = useSectionReveal();

  return (
    <section id="about" className={`about-section ${isVisible ? 'visible' : ''}`} ref={ref} data-testid="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Transforming Vision into Code</h2>
        </div>

        <div className="about-grid">
          <div className="about-content">
            <p className="about-text">
              Senior UI Developer with over <strong>seven years of experience</strong> crafting 
              exceptional user interfaces at leading companies including <span className="highlight">Transamerica</span> and 
              <span className="highlight"> Wells Fargo</span>. I specialize in Angular, React, and modern CSS, with a passion for 
              creating visually stunning and highly performant web applications.
            </p>
            <p className="about-text">
              My expertise spans the entire frontend spectrum — from responsive layouts and micro-animations 
              to complex state management and design system architecture. I believe that <strong>great UI is invisible</strong>; 
              it just works, delights, and gets out of the user's way.
            </p>
            <p className="about-text">
              I thrive on turning Figma designs into pixel-perfect reality, optimizing performance to the millisecond, 
              and building <span className="highlight-gold">accessible, beautiful interfaces</span> that users love.
            </p>
          </div>

          <div className="about-image-container">
            <div className="about-image-frame">
              <img 
                src= "assets/roshan3.jpeg"
                alt="Rosh Raj"
                className="about-image"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="floating-badge">
              <Star className="badge-star" size={20} />
              <span>UI Specialist</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section with Charts
const SkillsSection = () => {
  const { isVisible, ref } = useSectionReveal();
  const [activeTab, setActiveTab] = useState('radar');

  const frontendSkills = skillsBarData.filter(s => s.category === 'Frontend');
  const stylingSkills = skillsBarData.filter(s => s.category === 'Styling');

  return (
    <section id="skills" className={`skills-section ${isVisible ? 'visible' : ''}`} ref={ref} data-testid="skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Technical Skills</span>
          <h2 className="section-title">Technologies & Expertise</h2>
        </div>

        <div className="skills-tabs">
          <button 
            className={`skill-tab ${activeTab === 'radar' ? 'active' : ''}`}
            onClick={() => setActiveTab('radar')}
            data-testid="radar-chart-tab"
          >
            Skill Radar
          </button>
          <button 
            className={`skill-tab ${activeTab === 'bars' ? 'active' : ''}`}
            onClick={() => setActiveTab('bars')}
            data-testid="bar-chart-tab"
          >
            Proficiency Bars
          </button>
        </div>

        <div className="skills-chart-container">
          {activeTab === 'radar' ? (
            <div className="radar-chart-wrapper" data-testid="radar-chart">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <Radar
                    name="Skill Level"
                    dataKey="level"
                    stroke="#38bdf8"
                    fill="#a21caf"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bar-charts-grid" data-testid="bar-charts">
              <div className="bar-chart-section">
                <h3 className="chart-subtitle"><Code2 size={18} /> Frontend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={frontendSkills} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b' }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                    <Tooltip 
                      contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                      {frontendSkills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${160 + index * 10}, 70%, 45%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bar-chart-section">
                <h3 className="chart-subtitle"><Layers size={18} /> Styling & Design</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={stylingSkills} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b' }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                    <Tooltip 
                      contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                      {stylingSkills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${280 + index * 20}, 70%, 55%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        <div className="skills-grid">
          {[
            { icon: <Layers />, name: "Angular", type: "Frontend" },
            { icon: <Code2 />, name: "React", type: "Frontend" },
            { icon: <Code2 />, name: "CSS/SCSS", type: "Styling" },
            { icon: <Layers />, name: "Tailwind", type: "Styling" },
            { icon: <GitBranch />, name: "Git", type: "Tools" },
            { icon: <TrendingUp />, name: "UI/UX Design", type: "Design" },
          ].map((skill, i) => (
            <div key={i} className="skill-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="skill-icon">{skill.icon}</div>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-type">{skill.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section with Timeline
const ExperienceSection = () => {
  const { isVisible, ref } = useSectionReveal();

  const experiences = [
    {
      role: "Lead UI Developer",
      company: "Transamerica",
      period: "April 2023 - Present",
      location: "New Jersey, United States",
      current: true,
      description: "Leading UI/UX development for enterprise financial platform, building design systems and mentoring junior developers.",
      achievements: ["5M+ Users Dashboard", "Design System Lead", "98 Performance Score"]
    },
    {
      role: "Senior UI Developer",
      company: "Wells Fargo",
      period: "September 2022 - April 2023",
      location: "New York, United States",
      description: "Led UI development for customer-facing banking applications with focus on accessibility.",
      achievements: ["WCAG 2.1 AA Compliance", "Component Library"]
    },
    {
      role: "Senior Frontend Developer",
      company: "Transamerica",
      period: "March 2021 - August 2022",
      location: "New Jersey, United States",
      description: "Built responsive interfaces and interactive data visualizations for enterprise dashboards."
    },
    {
      role: "Angular Developer",
      company: "IBM",
      period: "January 2021 - March 2021",
      location: "New York Area",
      description: "Developed enterprise UI components and contributed to design system documentation."
    },
    {
      role: "Frontend Developer",
      company: "Paychex",
      period: "March 2018 - December 2020",
      location: "Rochester, New York",
      description: "Created pixel-perfect UI implementations and smooth micro-animations for HR platform."
    },
    {
      role: "UI Developer",
      company: "Serco",
      period: "September 2014 - December 2015",
      location: "Hyderabad, India",
      description: "Started career building responsive web interfaces and learning modern CSS techniques."
    }
  ];

  return (
    <section id="experience" className={`experience-section ${isVisible ? 'visible' : ''}`} ref={ref} data-testid="experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Career Journey</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        {/* Career Growth Chart */}
        <div className="career-chart-container" data-testid="career-chart">
          <h3 className="chart-title">Career Progression</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={careerGrowthData}>
              <defs>
                <linearGradient id="careerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="50%" stopColor="#a21caf" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                formatter={(value, name, props) => [props.payload.role, props.payload.company]}
              />
              <Area 
                type="monotone" 
                dataKey="level" 
                stroke="#a21caf" 
                fill="url(#careerGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${exp.current ? 'current' : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company">
                      <Building2 size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  {exp.current && <span className="current-badge">Current</span>}
                </div>
                
                <div className="timeline-meta">
                  <span><Calendar size={12} /> {exp.period}</span>
                  <span><MapPin size={12} /> {exp.location}</span>
                </div>
                
                <p className="timeline-description">{exp.description}</p>
                
                {exp.achievements && (
                  <div className="timeline-achievements">
                    {exp.achievements.map((ach, i) => (
                      <span key={i} className="achievement-tag">{ach}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const { isVisible, ref } = useSectionReveal();

  const projects = [
    {
      title: "Enterprise Dashboard UI",
      description: "Designed and built a comprehensive financial dashboard with real-time data visualization, interactive charts, and responsive layouts serving 5M+ users daily.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
      metrics: [
        { label: "Users", value: "5M+", color: "#38bdf8" },
        { label: "Performance", value: "98/100", color: "#f59e0b" },
        { label: "Load Time", value: "<2s", color: "#a21caf" }
      ],
      tags: ["Angular", "D3.js", "SCSS", "RxJS"]
    },
    {
      title: "Design System & Component Library",
      description: "Created a scalable design system with 50+ reusable components, comprehensive documentation, and Storybook integration used across 12+ enterprise applications.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
      metrics: [
        { label: "Components", value: "50+", color: "#a21caf" },
        { label: "Apps Using", value: "12+", color: "#f59e0b" }
      ],
      tags: ["React", "Storybook", "TypeScript", "Tailwind"]
    }
  ];

  return (
    <section id="projects" className={`projects-section ${isVisible ? 'visible' : ''}`} ref={ref} data-testid="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">Impactful Projects</h2>
        </div>

        {/* Project Impact Chart */}
        <div className="impact-chart-container" data-testid="impact-chart">
          <h3 className="chart-title">Project Impact Metrics</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={projectImpactData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 12 }} width={100} />
              <Tooltip 
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                formatter={(value, name, props) => [`$${value}${props.payload.unit}`, props.payload.metric]}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {projectImpactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <ExternalLink size={24} />
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-metrics">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="metric-item" style={{ borderColor: metric.color }}>
                      <span className="metric-value" style={{ color: metric.color }}>{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Education Section
const EducationSection = () => {
  const { isVisible, ref } = useSectionReveal();

  return (
    <section id="education" className={`education-section ${isVisible ? 'visible' : ''}`} ref={ref} data-testid="education-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="education-grid">
          <div className="education-card">
            <div className="education-icon">
              <GraduationCap size={32} />
            </div>
            <div className="education-content">
              <h3 className="degree">Master's Degree</h3>
              <p className="field">Computer Science</p>
              <p className="institution">Texas A&M University-Kingsville</p>
              <p className="period">January 2015 - May 2017</p>
            </div>
          </div>

          <div className="education-card">
            <div className="education-icon">
              <GraduationCap size={32} />
            </div>
            <div className="education-content">
              <h3 className="degree">Bachelor of Technology</h3>
              <p className="field">Computer Science and Engineering</p>
              <p className="institution">JNTU</p>
              <p className="period">2010 - 2014</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { isVisible, ref } = useSectionReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className={`contact-section ${isVisible ? 'visible' : ''}`} ref={ref} data-testid="contact-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-subtitle">Contact Information</h3>
            
            <a href="mailto:roshraj234@gmail.com" className="contact-item" data-testid="email-link">
              <div className="contact-icon">
                <Mail size={20} />
              </div>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <span className="contact-value">roshraj234@gmail.com</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/roshr234/" target="_blank" rel="noopener noreferrer" className="contact-item" data-testid="linkedin-link">
              <div className="contact-icon">
                <Linkedin size={20} />
              </div>
              <div className="contact-details">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">linkedin.com/in/roshr234</span>
              </div>
            </a>

            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-details">
                <span className="contact-label">Location</span>
                <span className="contact-value">Jersey City, New Jersey</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your name"
                required
                data-testid="name-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                required
                data-testid="email-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Your message..."
                rows={4}
                required
                data-testid="message-input"
              />
            </div>

            <button type="submit" className="submit-btn" data-testid="submit-btn">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="footer-content">
      <p>© 2024 Rosh Raj. Built with passion for excellence.</p>
      <a href="https://app.emergent.sh/?utm_source=emergent-badge" target="_blank" rel="noopener noreferrer" className="emergent-badge">
        Made with Emergent
      </a>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App dark">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;

// --- FANCY HERO BACKGROUND CSS ---
const style = document.createElement('style');
style.innerHTML = `
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow: hidden;
    background: transparent;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('assets/roshan3.jpeg');
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    z-index: 0;
    filter: brightness(0.7) blur(1.5px) saturate(1.2);
    transition: filter 0.5s;
    animation: heroZoom 18s ease-in-out infinite alternate;
  }
  @keyframes heroZoom {
    0% { transform: scale(1) }
    100% { transform: scale(1.07) }
  }
  /* Overlay removed for full background visibility */
  .hero-content, .hero-content.no-bg {
    position: relative;
    z-index: 2;
    margin-top: 7vh;
    padding: 0 2rem 0 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    background: none !important;
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
    border: none;
    animation: fadeInUp 1.2s cubic-bezier(.23,1.01,.32,1) 0.2s both;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 700px) {
    .hero-content { padding: 1.2rem 0.5rem; border-radius: 1.2rem; }
    .hero-bg, .hero-bg-overlay { height: 120vh; }
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .hero-title, .no-bg-title {
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.1rem;
    color: #fff;
    text-shadow: 0 4px 32px rgba(16,24,39,0.55), 0 2px 24px #10b98199;
    letter-spacing: -1.5px;
    text-align: center;
  }
  .gradient-text {
    background: linear-gradient(90deg, #6366f1 10%, #f59e42 40%, #ec4899 70%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .hero-subtitle, .no-bg-subtitle {
    color: #f1f5f9;
    font-size: 1.18rem;
    margin-bottom: 2.2rem;
    font-weight: 400;
    text-shadow: 0 2px 16px #0f172a, 0 1px 8px #10b98199;
    text-align: center;
  }
  .hero-badge, .no-bg-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: none !important;
    color: #f59e42;
    font-weight: 700;
    font-size: 1.08rem;
    border-radius: 999px;
    padding: 0.4rem 1.1rem 0.4rem 0.8rem;
    margin-bottom: 1.2rem;
    box-shadow: none;
    border: none;
    letter-spacing: 0.01em;
    text-shadow: 0 2px 16px #0f172a, 0 1px 8px #f59e4299;
  }
  .hero-stats, .no-bg-stats {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2.2rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .stat-card, .no-bg-stat {
    background: none !important;
    border-radius: 0;
    padding: 0.5rem 1.1rem 0.5rem 1.1rem;
    min-width: 110px;
    box-shadow: none;
    border: none;
    text-align: center;
    transition: none;
    will-change: auto;
  }
  .stat-value, .no-bg-value {
    font-size: 2.1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.2rem;
    letter-spacing: -1px;
    text-shadow: 0 2px 12px #0f172a, 0 2px 12px #6366f199;
  }
  .stat-suffix {
    font-size: 1.1rem;
    color: #ec4899;
    margin-left: 0.1rem;
    font-weight: 600;
    text-shadow: 0 2px 8px #0f172a;
  }
  .stat-label, .no-bg-label {
    color: #38bdf8;
    font-size: 0.98rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    letter-spacing: 0.01em;
    text-shadow: 0 2px 8px #0f172a;
  }
  .hero-buttons, .no-bg-buttons {
    display: flex;
    gap: 1.2rem;
    margin-top: 1.5rem;
    justify-content: center;
  }
  .btn-primary, .btn-secondary, .no-bg-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.7rem 1.7rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    box-shadow: 0 2px 12px 0 rgba(99,102,241,0.08);
    text-decoration: none;
    background: linear-gradient(90deg, #6366f1 0%, #f59e42 50%, #ec4899 100%);
    color: #fff;
    border: 2px solid #ec4899;
    text-shadow: 0 2px 8px #0f172a;
  }
  .btn-primary.no-bg-btn:hover, .btn-secondary.no-bg-btn:hover, .no-bg-btn:hover {
    background: linear-gradient(90deg, #f59e42 0%, #6366f1 50%, #38bdf8 100%);
    color: #fff;
    border-color: #38bdf8;
  }
  .scroll-indicator {
    position: absolute;
    left: 50%;
    bottom: 2.5rem;
    transform: translateX(-50%);
    z-index: 3;
    opacity: 0.85;
    animation: bounceDown 2.2s infinite;
  }
  @keyframes bounceDown {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(18px); }
  }
`;
document.head.appendChild(style);
