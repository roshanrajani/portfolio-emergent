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
  { skill: "TypeScript", level: 92, fullMark: 100 },
  { skill: "React", level: 88, fullMark: 100 },
  { skill: "Node.js", level: 82, fullMark: 100 },
  { skill: "MongoDB", level: 78, fullMark: 100 },
  { skill: "REST APIs", level: 90, fullMark: 100 },
];

const skillsBarData = [
  { name: "Angular", level: 95, category: "Frontend" },
  { name: "HTML5/CSS3", level: 94, category: "Frontend" },
  { name: "TypeScript", level: 92, category: "Frontend" },
  { name: "SASS/SCSS", level: 90, category: "Frontend" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "JavaScript", level: 93, category: "Frontend" },
  { name: "REST APIs", level: 90, category: "Backend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "MongoDB", level: 78, category: "Backend" },
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
  { metric: "AUM Managed", value: 5.7, unit: "B", color: "#10b981" },
  { metric: "Cost Savings", value: 12, unit: "M", color: "#f59e0b" },
  { metric: "Budget Saved", value: 600, unit: "K", color: "#6366f1" },
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
      <div className="hero-particles"></div>
      <div className="hero-gradient"></div>
      
      <nav className="nav-bar" data-testid="navigation">
        <div className="nav-logo">
          <span className="logo-text">RR</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link nav-link-cta">Get in Touch</a>
        </div>
      </nav>

      <div className="hero-content">
        <div className="hero-badge">
          <Award className="badge-icon" size={16} />
          <span>STAR Award Winner • Outstanding Performance</span>
        </div>
        
        <h1 className="hero-title">
          Building <span className="gradient-text">Financial Software</span>
          <br />Solutions
        </h1>
        
        <p className="hero-subtitle">
          Lead Software Engineer with 7+ years of expertise in Angular and frontend development, 
          specializing in financial technology. Proven track record of delivering enterprise 
          solutions that drive measurable business impact.
        </p>

        <div className="hero-stats" data-testid="hero-stats">
          <div className="stat-card" ref={aumCounter.ref}>
            <div className="stat-value">
              <span className="stat-prefix">$</span>
              {aumCounter.count.toFixed(1)}
              <span className="stat-suffix">B</span>
            </div>
            <div className="stat-label">Platform AUM Managed</div>
            <div className="stat-bar">
              <div className="stat-bar-fill emerald"></div>
            </div>
          </div>
          
          <div className="stat-card" ref={savingsCounter.ref}>
            <div className="stat-value">
              <span className="stat-prefix">$</span>
              {savingsCounter.count}
              <span className="stat-suffix">M</span>
            </div>
            <div className="stat-label">Cost Savings Delivered</div>
            <div className="stat-bar">
              <div className="stat-bar-fill gold"></div>
            </div>
          </div>
          
          <div className="stat-card" ref={yearsCounter.ref}>
            <div className="stat-value">
              {yearsCounter.count}
              <span className="stat-suffix">+</span>
            </div>
            <div className="stat-label">Years of Experience</div>
            <div className="stat-bar">
              <div className="stat-bar-fill indigo"></div>
            </div>
          </div>
        </div>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary" data-testid="view-projects-btn">
            <Briefcase size={18} />
            View Projects
          </a>
          <a href="#contact" className="btn-secondary" data-testid="contact-btn">
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
              Lead Software Engineer with over <strong>seven years of experience</strong> in developing 
              and leading key projects at top financial institutions including <span className="highlight">Transamerica</span> and 
              <span className="highlight"> Wells Fargo</span>. I specialize in Angular and HTML5, with a strong focus on 
              creating innovative frontend solutions that align with business objectives.
            </p>
            <p className="about-text">
              My experience spans the entire software development lifecycle, from conceptualization to deployment. 
              I possess a robust understanding of programming within the <strong>financial domain</strong>, which allows 
              me to bridge the gap between complex business requirements and technical implementation.
            </p>
            <p className="about-text">
              I'm passionate about driving forward-thinking software solutions and have a proven track record 
              of delivering projects <span className="highlight-gold">ahead of schedule</span> and <span className="highlight-gold">under budget</span>.
            </p>
          </div>

          <div className="about-image-container">
            <div className="about-image-frame">
              <img 
                src="https://images.unsplash.com/photo-1722159475082-0a2331580de3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzcxMjU2ODQzfDA&ixlib=rb-4.1.0&q=85&w=600" 
                alt="Professional workspace"
                className="about-image"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="floating-badge">
              <Star className="badge-star" size={20} />
              <span>Top Performer</span>
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
  const backendSkills = skillsBarData.filter(s => s.category === 'Backend');

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
                    stroke="#10b981"
                    fill="#10b981"
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
                <h3 className="chart-subtitle"><Database size={18} /> Backend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={backendSkills} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b' }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                    <Tooltip 
                      contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                      {backendSkills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${40 + index * 15}, 80%, 50%)`} />
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
            { icon: <Code2 />, name: "TypeScript", type: "Frontend" },
            { icon: <Code2 />, name: "React", type: "Frontend" },
            { icon: <Database />, name: "MongoDB", type: "Backend" },
            { icon: <GitBranch />, name: "Git", type: "Tools" },
            { icon: <TrendingUp />, name: "Financial Services", type: "Domain" },
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
      role: "Lead Software Engineer",
      company: "Transamerica",
      period: "April 2023 - Present",
      location: "New Jersey, United States",
      current: true,
      description: "Leading frontend development initiatives for financial services platform.",
      achievements: ["$5.7B AUM Platform", "Quarter Ahead of Schedule", "$600K Under Budget"]
    },
    {
      role: "Lead Software Engineer",
      company: "Wells Fargo",
      period: "September 2022 - April 2023",
      location: "New York, United States",
      description: "Led software engineering projects in the financial domain.",
      achievements: ["$12M Cost Savings", "Enterprise Architecture"]
    },
    {
      role: "Senior Frontend Developer",
      company: "Transamerica",
      period: "March 2021 - August 2022",
      location: "New Jersey, United States",
      description: "Developed and maintained enterprise-level frontend applications."
    },
    {
      role: "Angular Developer",
      company: "IBM",
      period: "January 2021 - March 2021",
      location: "New York Area",
      description: "Specialized in Angular development for enterprise solutions."
    },
    {
      role: "Frontend Developer",
      company: "Paychex",
      period: "March 2018 - December 2020",
      location: "Rochester, New York",
      description: "Built and maintained frontend features for payroll and HR solutions."
    },
    {
      role: "IT Analyst",
      company: "Serco",
      period: "September 2014 - December 2015",
      location: "Hyderabad, India",
      description: "Provided technical analysis and support for IT systems."
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
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                stroke="#10b981" 
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
      title: "Financial Wellness Platform",
      description: "Pioneered the launch of a cutting-edge financial wellness platform managing $5.7 billion in AUM. Delivered a full quarter ahead of schedule and $600,000 under budget from a $7 million allocated budget.",
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwxfHxmaW50ZWNofGVufDB8fHx8MTc3MTI1NjgzM3ww&ixlib=rb-4.1.0&q=85",
      metrics: [
        { label: "AUM", value: "$5.7B", color: "#10b981" },
        { label: "Under Budget", value: "$600K", color: "#f59e0b" },
        { label: "Ahead", value: "1 Quarter", color: "#6366f1" }
      ],
      tags: ["Angular", "TypeScript", "REST APIs"]
    },
    {
      title: "Cost Transparency Solution",
      description: "Implemented an innovative cost transparency solution for aging technology assets, resulting in significant savings of $12 million for the organization.",
      image: "https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwyfHxmaW50ZWNofGVufDB8fHx8MTc3MTI1NjgzM3ww&ixlib=rb-4.1.0&q=85",
      metrics: [
        { label: "Cost Savings", value: "$12M", color: "#10b981" },
        { label: "Impact", value: "Enterprise", color: "#f59e0b" }
      ],
      tags: ["Angular", "SASS", "Financial Analysis"]
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
