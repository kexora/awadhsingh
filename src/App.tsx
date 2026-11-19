import { MapPin, Phone, Download, Globe, Zap, Cable, GraduationCap, FileText, Briefcase, User, Cpu } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';

// Dynamically detect current website URL (supports localhost, dev preview, and custom domains)
const getCurrentUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin || window.location.href;
  }
  return 'https://awadhsingh.kexora.in';
};

const portfolioData = {
  name: "AWADH KISHORE SINGH",
  role: "Senior Electrical Supervisor / Foreman",
  location: "Siwan, Bihar - 841243",
  phone: "+91 91109 13028",
  summary: "Result-driven and safety-oriented Senior Electrical Supervisor / Foreman with over 25+ years of extensive experience managing major electrical infrastructure, hospital, commercial, and renewable energy projects. Proven expertise in sub-station wiring, HT/LT panels, busduct trunking, BMS, and fire alarm systems. Demonstrated success in leading teams, interpreting engineering drawings, maintaining quality control, and executing complex electrical installations across India and the Gulf region.",
  skills: {
    power: [
      "HT / LT Panel Installation, Testing & Maintenance",
      "Busduct (Busbar) Trunking Systems",
      "Distribution Boards (DB) Wiring & Load Testing",
      "Solar Power Grid Sub-station Cabling"
    ],
    wiring: [
      "Underground & Heavy Cable Laying",
      "Building Management System (BMS) Setup",
      "Fire Detection & Alarm System Integration",
      "Hospital & Infrastructure Specialized Cabling"
    ]
  },
  experience: [
    {
      company: "Sikwal Power Projects",
      date: "Sept 2025 – Present",
      location: "New Delhi, India",
      role: "Electrical Supervisor",
      bullets: [
        "Max Super Speciality Hospital (Shalimar Bagh, New Delhi): Supervised complete electrical distribution setup, backup generator circuits, and panel commissioning for hospital infrastructure.",
        "BLK-Max Super Speciality Hospital (Rajendra Place, New Delhi): Executed HT/LT panel installations, busduct alignment, and specialized medical equipment power cabling."
      ]
    },
    {
      company: "Jhonson Green Private Limited",
      date: "Nov 2023 – Sept 2025",
      location: "Rajasthan & Gujarat, India",
      role: "Electrical Supervisor",
      bullets: [
        "245 MW NTPC Solar Project (Nokh, Rajasthan): Led panel setup, solar inverter wiring, and main power grid cabling.",
        "300 MW ABREL SPV2 Project (Patan, Gujarat): Managed electrical execution, transformer connections, and system testing."
      ]
    },
    {
      company: "PARAMOUNT",
      date: "Mar 2018 – Jan 2021",
      location: "Dubai, UAE",
      role: "Electrician Foreman",
      bullets: [
        "Supervised site electricians for major commercial developments, ensuring compliance with UAE electrical codes and safety standards."
      ]
    },
    {
      company: "ALFAYHAA Construction & Contracting",
      date: "Dec 2010 – Nov 2017",
      location: "Saudi Arabia",
      role: "Electrician Foreman",
      bullets: [
        "King Abdullah University of Science and Technology (KAUST, Jeddah): Led the electrical execution team for large-scale power distribution, main distribution board (MDB) installations, and primary substation cabling as an Electrical Foreman.",
        "Princess Nourah Bint Abdulrahman University (PNU, Riyadh): Managed field electricians during low-voltage (LV) panel setups, lighting automation control wiring, and secondary power system testing."
      ]
    },
    {
      company: "M/S E.T.A (Dubai Airport DAFZA)",
      date: "Mar 2007 – Apr 2009",
      location: "Dubai, UAE",
      role: "Senior Electrician",
      bullets: [
        "Executed low-voltage networks, BMS integration, and critical electrical maintenance in high-security airport facilities."
      ]
    },
    {
      company: "M/S Milestone Eng. Pvt. Ltd.",
      date: "Aug 1998 – Mar 2007",
      location: "New Delhi, India",
      role: "Electrician Foreman",
      bullets: [
        "Led site teams in high-rise commercial building wiring, conduit placement, and distribution box installations."
      ]
    },
    {
      company: "M/S Fortis Hospital",
      date: "Dec 1999 – Feb 2000",
      location: "Chandigarh, India",
      role: "Electrician Foreman",
      bullets: [
        "Handled emergency power cabling, backup UPS distribution circuits, and healthcare wiring systems."
      ]
    }
  ],
  education: [
    "I.T.I. Certified (Electrical Trade)",
    "Matriculation (10th) — BSEB Patna (1995)"
  ],
  details: [
    "Languages: Hindi, English",
    "Availability: Ready to relocate (India & Gulf / Middle East)"
  ]
};

const easing = [0.22, 1, 0.36, 1];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: easing } 
  }
};

const timelineItem = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: easing } 
  }
};

const lineSegment = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { 
    scaleY: 1, 
    transition: { duration: 1, ease: easing } 
  }
};

const dotVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: easing, delay: 0.1 } 
  }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-900 selection:text-white pb-1 md:pb-2 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-800 origin-left z-50 print:hidden"
        style={{ scaleX }}
      />
      
      <main id="resume-content" className="max-w-[850px] mx-auto px-5 sm:px-6 pt-6 pb-2 md:pt-12 md:pb-2">
        
        <motion.header 
          className="mb-8 md:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-5 md:mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold tracking-tight text-[#1e3a8a] uppercase mb-1.5 md:mb-1 leading-tight">
                {portfolioData.name}
              </h1>
              <h2 className="text-[15px] sm:text-lg md:text-xl text-[#2563eb] font-semibold uppercase tracking-wide">
                {portfolioData.role}
              </h2>
            </div>
            
            <PDFDownloadLink
              document={<ResumePDF data={portfolioData} websiteUrl={getCurrentUrl()} />}
              fileName="Awadh_Kishore_Singh_Resume.pdf"
              className="hidden md:inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-5 py-2.5 rounded hover:bg-blue-800 transition-colors shadow-sm text-sm font-medium print:hidden shrink-0 cursor-pointer"
            >
              {({ loading }) =>
                loading ? (
                  'Generating PDF...'
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
          </div>
          
          <div className="contact-bar flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-4 sm:gap-y-2 text-slate-700 text-[14px] md:text-sm font-medium w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>{portfolioData.location}</span>
            </div>
            <div className="hidden sm:block text-slate-300 print:inline-block">|</div>
            <a 
              href={`tel:${portfolioData.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-2 hover:text-[#2563eb] transition-colors group cursor-pointer no-underline"
              title="Call Awadh Kishore Singh"
            >
              <Phone className="w-4 h-4 text-[#2563eb] shrink-0 group-hover:scale-110 transition-transform" />
              <span>{portfolioData.phone}</span>
            </a>
            <div className="hidden sm:block text-slate-300 print:inline-block">|</div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>India & Gulf Experience (Dubai, Saudi Arabia)</span>
            </div>
          </div>

          <div className="mt-7 md:hidden print:hidden">
            <PDFDownloadLink
              document={<ResumePDF data={portfolioData} websiteUrl={getCurrentUrl()} />}
              fileName="Awadh_Kishore_Singh_Resume.pdf"
              className="inline-flex w-full items-center justify-center gap-2.5 bg-[#1e3a8a]/5 text-[#1e3a8a] border border-[#1e3a8a]/20 px-5 py-3.5 rounded-xl active:bg-[#1e3a8a]/10 transition-colors text-[14px] font-bold cursor-pointer"
            >
              {({ loading }) =>
                loading ? (
                  'Generating PDF...'
                ) : (
                  <>
                    <Download className="w-[18px] h-[18px]" />
                    Download Resume (PDF)
                  </>
                )
              }
            </PDFDownloadLink>
          </div>
        </motion.header>

        <motion.section 
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h3 className="text-base font-bold text-[#1e3a8a] uppercase tracking-wider mb-3 border-b-2 border-[#1e3a8a] pb-1.5 flex items-center gap-2">
            <User className="w-5 h-5 text-[#2563eb]" />
            Professional Summary
          </h3>
          <p className="text-[14.5px] text-slate-700 leading-relaxed text-justify">
            {portfolioData.summary}
          </p>
        </motion.section>

        <motion.section 
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h3 className="text-base font-bold text-[#1e3a8a] uppercase tracking-wider mb-3 border-b-2 border-[#1e3a8a] pb-1.5 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#2563eb]" />
            Technical Expertise
          </h3>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h4 className="text-[14.5px] font-bold text-[#2563eb] mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Power Distribution & High Voltage
              </h4>
              <ul className="space-y-1.5">
                {portfolioData.skills.power.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-700 text-[14px]">
                    <span className="text-slate-400 mt-1 text-[10px]">●</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[14.5px] font-bold text-[#2563eb] mb-2 flex items-center gap-1.5">
                <Cable className="w-4 h-4 text-slate-600" />
                Wiring & Auxiliary Systems
              </h4>
              <ul className="space-y-1.5">
                {portfolioData.skills.wiring.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-700 text-[14px]">
                    <span className="text-slate-400 mt-1 text-[10px]">●</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        <section className="mb-8">
          <motion.h3 
            className="text-base font-bold text-[#1e3a8a] uppercase tracking-wider mb-5 border-b-2 border-[#1e3a8a] pb-1.5 flex items-center gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <Briefcase className="w-5 h-5 text-[#2563eb]" />
            Career Timeline & Experience
          </motion.h3>

          <div className="timeline-container relative ml-2 pb-2">
            {portfolioData.experience.map((exp, index) => (
              <motion.div 
                key={index} 
                className="relative pl-6 md:pl-8 pb-10 timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={timelineItem}
              >
                {index !== portfolioData.experience.length - 1 && (
                  <motion.div 
                    className="absolute left-[4.5px] top-4 bottom-[-12px] w-[1.5px] bg-[#2563eb] origin-top print:hidden"
                    variants={lineSegment}
                  />
                )}

                {index !== portfolioData.experience.length - 1 && (
                  <div className="hidden print:block absolute left-[4.5px] top-4 bottom-[-12px] w-[1.5px] bg-slate-300" />
                )}
                
                <motion.div 
                  className="timeline-dot absolute left-[0px] top-1.5 w-[10px] h-[10px] rounded-full bg-[#3b82f6] ring-4 ring-white z-10 print:ring-0 print:border-none"
                  variants={dotVariant}
                />
                
                <div className="timeline-header flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-0.5">
                  <div className="text-[15px]">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-500 mx-1.5">—</span>
                    <span className="text-[#2563eb] font-semibold">{exp.company}</span>
                  </div>
                  <span className="timeline-date text-slate-500 font-medium text-[13px] whitespace-nowrap">{exp.date}</span>
                </div>
                
                <div className="text-slate-500 text-[13px] mb-2 italic">
                  {exp.location}
                </div>
                
                <ul className="space-y-1.5">
                  {exp.bullets.map((bullet, idx) => {
                    const colonIndex = bullet.indexOf(':');
                    if (colonIndex !== -1 && colonIndex < 100) {
                      return (
                        <li key={idx} className="flex items-start gap-2 text-slate-700 leading-relaxed text-[14px]">
                          <span className="text-slate-400 mt-1.5 text-[10px]">●</span>
                          <span>
                            <strong className="text-slate-900 font-semibold">{bullet.substring(0, colonIndex + 1)}</strong>
                            {bullet.substring(colonIndex + 1)}
                          </span>
                        </li>
                      )
                    }
                    return (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 leading-relaxed text-[14px]">
                        <span className="text-slate-400 mt-1.5 text-[10px]">●</span>
                        <span>{bullet}</span>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section 
          className="mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <h3 className="text-base font-bold text-[#1e3a8a] uppercase tracking-wider mb-3 border-b-2 border-[#1e3a8a] pb-1.5 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#2563eb]" />
                Education & Training
              </h3>
              <ul className="space-y-1.5">
                {portfolioData.education.map((item, index) => {
                  const parenIndex = item.indexOf(' (');
                  if (parenIndex !== -1) {
                    return (
                      <li key={index} className="flex items-start gap-2 text-slate-700 text-[14px]">
                        <span className="text-slate-400 mt-1 text-[10px]">●</span>
                        <span>
                          <strong className="text-slate-900 font-semibold">{item.substring(0, parenIndex)}</strong>
                          {item.substring(parenIndex)}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={index} className="flex items-start gap-2 text-slate-700 text-[14px]">
                      <span className="text-slate-400 mt-1 text-[10px]">●</span>
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-bold text-[#1e3a8a] uppercase tracking-wider mb-3 border-b-2 border-[#1e3a8a] pb-1.5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2563eb]" />
                Additional Details
              </h3>
              <ul className="space-y-1.5">
                {portfolioData.details.map((item, index) => {
                  const colonIndex = item.indexOf(':');
                  if (colonIndex !== -1) {
                    return (
                      <li key={index} className="flex items-start gap-2 text-slate-700 text-[14px]">
                        <span className="text-slate-400 mt-1 text-[10px]">●</span>
                        <span>
                          <strong className="text-slate-900 font-semibold">{item.substring(0, colonIndex + 1)}</strong>
                          {item.substring(colonIndex + 1)}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={index} className="flex items-start gap-2 text-slate-700 text-[14px]">
                      <span className="text-slate-400 mt-1 text-[10px]">●</span>
                      <span>{item}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </motion.section>

        <footer className="mt-6 md:mt-8 pt-3 border-t border-slate-200 text-center text-xs text-slate-500 print:hidden flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>
            © {new Date().getFullYear()} All rights reserved to{' '}
            <a 
              href="https://kexora.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:text-blue-800 no-underline"
            >
              KEXORA
            </a>
          </span>
        </footer>
      </main>
    </div>
  );
}