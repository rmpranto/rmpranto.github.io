'use client';
import { useEffect, useState, useRef, type ReactNode, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail, MapPin, Sun, Moon, Menu, X, FileText, Download, ExternalLink, Plus, Minus, Check, Search } from 'lucide-react';
import { site } from '@/lib/site';
import { projectAssetURL } from '@/lib/public-assets';
import { projects, featuredProjects, skills, experiences, credentials, type Project, type ProjectCategory } from '@/content/data';


function StoryWord({word,index,total,progress,reduce}:{word:string,index:number,total:number,progress:MotionValue<number>,reduce:boolean}){
 const begin=.02+(index/Math.max(total,1))*.72;
 const opacity=useTransform(progress,[Math.max(0,begin-.06),Math.min(1,begin+.11)],[.27,1]);
 return <motion.span className="story-word" style={{opacity:reduce?1:opacity}}>{word}{' '}</motion.span>;
}
export function StoryReveal({text}:{text:string}){
 const target=useRef<HTMLParagraphElement>(null);
 const reduce=!!useReducedMotion();
 const {scrollYProgress}=useScroll({target,offset:['start 86%','end 28%']});
 const words=text.trim().split(/\s+/);
 return <p ref={target} className="story-reveal-p">{words.map((word,index)=><StoryWord key={index} word={word} index={index} total={words.length} progress={scrollYProgress} reduce={reduce}/>)}</p>;
}
/** Gentle scroll-linked movement for editorial content, rather than a one-time entrance.
 * Elements remain readable while approaching the viewport. */
export function Reveal({children,className='',delay=0}: {children:ReactNode,className?:string,delay?:number}) {
  const target=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target,offset:['start 99%','start 61%']});
  const y=useTransform(scrollYProgress,[0,1],[Math.min(22,16+delay*12),0]);
  const opacity=useTransform(scrollYProgress,[0,1],[.88,1]);
  return <motion.div ref={target} className={className} style={reduce?undefined:{y,opacity}}>{children}</motion.div>;
}
function XBrandIcon(){return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3.5h4.1L20 20.5h-4.1L4 3.5Z"/><path d="M20 3.5 4 20.5"/></svg>}
function WhatsAppBrandIcon(){return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.4 11.7a8.4 8.4 0 0 1-12 7.55L3.8 20.4l1.25-4.45A8.4 8.4 0 1 1 20.4 11.7Z"/><path d="M9.05 7.85c-.3 0-.65.3-.93.72-.32.49-.45 1.04-.29 1.66.45 1.83 2.4 4.03 4.41 4.9 1.08.46 1.86.5 2.52.1.5-.3 1.06-1.01.9-1.45-.08-.2-1.4-.8-1.67-.83-.24-.04-.41.21-.8.66-.18.2-.33.24-.62.11-1.08-.48-2.06-1.31-2.63-2.32-.16-.28-.08-.46.09-.63.22-.23.45-.46.48-.7.05-.26-.72-2.12-1.46-2.22Z"/></svg>}
export const SocialLinks=({compact=false}:{compact?:boolean})=><div className={'socials social-icons-only '+(compact?'socials-compact':'')} aria-label="Social profiles">
  <a href={site.github} target="_blank" rel="noreferrer noopener" title="GitHub" aria-label="GitHub profile"><Github size={18}/></a>
  <a href={site.linkedin} target="_blank" rel="noreferrer noopener" title="LinkedIn" aria-label="LinkedIn profile"><Linkedin size={18}/></a>
  <a href={site.twitter} target="_blank" rel="noreferrer noopener" title="Twitter / X" aria-label="Twitter / X profile"><XBrandIcon/></a>
  <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" title="WhatsApp" aria-label="Start a WhatsApp chat"><WhatsAppBrandIcon/></a>
  <a href={'mailto:'+site.email} title="Email" aria-label="Email Rahat"><Mail size={18}/></a>
</div>;
export function ResumeButton({className='',children}: {className?:string,children?:ReactNode}){return <button className={className||'text-action'} onClick={()=>window.dispatchEvent(new Event('rmp:resume'))}>{children||<>View Resume <ArrowUpRight size={15}/></>}</button>}
function setHtmlTheme(theme:'dark'|'light'){document.documentElement.dataset.theme=theme;localStorage.setItem('rmp-theme',theme)}
export function ThemeToggle(){const [theme,setTheme]=useState<'dark'|'light'>('dark');useEffect(()=>{setTheme(document.documentElement.dataset.theme==='light'?'light':'dark')},[]);const flip=()=>{const t=theme==='dark'?'light':'dark';setTheme(t);setHtmlTheme(t)};return <button type="button" className="theme-toggle" aria-label={'Switch to '+(theme==='dark'?'light':'dark')+' mode'} title={'Switch to '+(theme==='dark'?'light':'dark')+' mode'} onClick={flip}>{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}</button>}
const navigation=[['About','/#about'],['Capabilities','/#capabilities'],['Projects','/#projects'],['Experience','/#experience'],['Education','/#education'],['Credentials','/#credentials'],["Get in Touch",'/#contact']];
export function Header(){
 const pathname=usePathname();
 const [menu,setMenu]=useState(false);
 const [active,setActive]=useState('');
 const {scrollYProgress}=useScroll();
 useEffect(()=>{
  // The shared header survives App Router navigation. Never keep section nodes
  // from the previous page: they become detached after /about -> /#top.
  const sections=['about','capabilities','projects','experience','education','credentials','contact'];
  let frame=0;
  const refresh=()=>{
   if(pathname==='/about'){setActive('about');return;}
   if(pathname!=='/'){
    setActive(pathname.startsWith('/projects')?'projects':'');
    return;
   }
   const midpoint=window.innerHeight*.42;
   let current='';
   for(const id of sections){
    const node=document.getElementById(id);
    if(node && node.getBoundingClientRect().top<=midpoint)current=id;
   }
   setActive(current);
  };
  const scheduleRefresh=()=>{
   window.cancelAnimationFrame(frame);
   frame=window.requestAnimationFrame(refresh);
  };
  // Account for route rendering and Next.js hash scrolling happening after navigation.
  scheduleRefresh();
  const delayed=[100,350,800].map(delay=>window.setTimeout(scheduleRefresh,delay));
  window.addEventListener('scroll',scheduleRefresh,{passive:true});
  window.addEventListener('resize',scheduleRefresh);
  window.addEventListener('hashchange',scheduleRefresh);
  window.addEventListener('popstate',scheduleRefresh);
  const onEscape=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};
  window.addEventListener('keydown',onEscape);
  return ()=>{
   window.cancelAnimationFrame(frame);
   delayed.forEach(window.clearTimeout);
   window.removeEventListener('scroll',scheduleRefresh);
   window.removeEventListener('resize',scheduleRefresh);
   window.removeEventListener('hashchange',scheduleRefresh);
   window.removeEventListener('popstate',scheduleRefresh);
   window.removeEventListener('keydown',onEscape);
  };
 },[pathname]);
 return <header className="site-header">
  <div className="container nav-inner"><Link className="wordmark" href="/#top" onClick={()=>setMenu(false)} aria-label="Rahat Maksud Pranto — back to top"><span className="wordmark-seal" aria-hidden="true">RMP<span className="brand-dot">.</span></span><span className="brand-full-name">Rahat Maksud Pranto</span></Link>
  <nav aria-label="Primary navigation" className="desktop-nav">{navigation.filter(([label])=>label!=="Get in Touch").map(([label,url])=><Link key={url} href={url} aria-current={active===url.slice(2)?'location':undefined} className={active===url.slice(2)?'nav-active':''}>{label}</Link>)}</nav>
  <div className="nav-right"><ThemeToggle/><Link href="/#contact" className="nav-contact">Get in Touch <ArrowUpRight size={15}/></Link><button className="menu-button" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(!menu)}>{menu?<X size={22}/>:<Menu size={22}/>}</button></div></div>
  <motion.span className="site-scroll-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>
  <AnimatePresence>{menu&&<motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.25}}>{navigation.filter(([label])=>label!=="Get in Touch").map(([label,url])=><Link key={url} href={url} onClick={()=>setMenu(false)}>{label}<ArrowUpRight size={16}/></Link>)}<Link className="mobile-contact" href="/#contact" onClick={()=>setMenu(false)}>Get in Touch <ArrowUpRight size={16}/></Link><ResumeButton className="mobile-resume">View Resume <FileText size={16}/></ResumeButton></motion.nav>}</AnimatePresence>
 </header>;
}
export function BackToTop(){const [visible,setVisible]=useState(false);useEffect(()=>{const onScroll=()=>setVisible(window.scrollY>520);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);return <AnimatePresence>{visible&&<motion.button type="button" className="back-to-top" title="Back to top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:14}}><ArrowUpRight className="back-to-top-arrow" size={20}/></motion.button>}</AnimatePresence>;}
export function ResumeModal(){const [open,setOpen]=useState(false);const close=useRef<HTMLButtonElement>(null);const previous=useRef<HTMLElement|null>(null);useEffect(()=>{const show=()=>{previous.current=document.activeElement as HTMLElement;setOpen(true)};window.addEventListener('rmp:resume',show);return ()=>window.removeEventListener('rmp:resume',show)},[]);useEffect(()=>{if(!open)return;close.current?.focus();const before=document.body.style.overflow;document.body.style.overflow='hidden';const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key==='Tab'){const nodes=document.querySelectorAll<HTMLElement>('.resume-modal a,.resume-modal button');if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};window.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=before;window.removeEventListener('keydown',onKey);previous.current?.focus()}},[open]);return <AnimatePresence>{open&&<motion.div className="resume-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><motion.div className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title" initial={{y:25,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}}><div className="resume-top"><div><span className="eyebrow">LATEST CV / 2026</span><h2 id="resume-title">Rahat Maksud Pranto</h2></div><button ref={close} aria-label="Close resume preview" onClick={()=>setOpen(false)}><X size={21}/></button></div><p className="resume-mobile-help">If your browser cannot display the embedded PDF, use Open in new tab.</p><iframe src={`${site.cv}#view=FitH`} title="Full CV PDF preview" className="resume-frame"/><div className="resume-actions"><a target="_blank" rel="noopener noreferrer" href={site.cv}>Open in new tab <ExternalLink size={15}/></a><a download="Rahat_Maksud_Pranto_Data_Analyst_2Y_Exp_CV.pdf" href={site.cv}>Download PDF <Download size={15}/></a></div></motion.div></motion.div>}</AnimatePresence>}
export function Portrait(){const [attempt,setAttempt]=useState(0);return <figure className="hero-portrait"><div className="portrait-frame">{attempt<2?<Image src={attempt===0?"/assets/profile/pro4.png":site.portrait} alt="Portrait of Rahat Maksud Pranto" width={470} height={580} priority unoptimized onError={()=>setAttempt(x=>x+1)} className="portrait-image"/>:<div className="portrait-fallback" role="img" aria-label="Photograph unavailable; Rahat Maksud Pranto initials">RMP<span>.</span><small>Portrait unavailable — run the asset sync</small></div>}</div></figure>}
export function Hero(){
 const reduce=useReducedMotion();
 const enter=(delay:number)=>({initial:reduce?false:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.72,delay,ease:[.16,1,.3,1] as [number,number,number,number]}});
 return <section className="hero container" id="top">
 <div className="hero-main"><div className="hero-type">

  <h1 className="hero-name"><motion.span {...enter(.13)}>Making data</motion.span><motion.span {...enter(.24)}><em>make sense.</em></motion.span></h1>
  <motion.p className="hero-subtitle" {...enter(.34)}>I’m Rahat Maksud Pranto — a Data Analyst working across data &amp; analytics engineering.</motion.p>
  <motion.p className="hero-description" {...enter(.42)}>I work where analytics, trustworthy data and practical engineering meet—building dashboards, maintaining databases and automating the work behind better decisions.</motion.p>
  <motion.div {...enter(.53)} className="hero-cta"><Link className="button button-primary" href="/#projects">Explore my work <ArrowUpRight size={17}/></Link><Link className="button button-hero-contact" href="/#contact">Get in Touch <ArrowUpRight size={17}/></Link></motion.div>
	  <motion.div {...enter(.62)} className="hero-social"><div className="hero-social-actions"><ResumeButton className="hero-resume-pill"><FileText size={16}/> Resume</ResumeButton><span className="hero-social-separator" aria-hidden="true"/><SocialLinks compact/></div><p className="hero-location"><MapPin className="hero-location-pin" aria-hidden="true" size={15} strokeWidth={1.8}/> Dhaka, Bangladesh</p></motion.div>
 </div><div className="hero-art"><div className="hero-art-grid" aria-hidden="true"/><Portrait/></div></div>
 <div className="trusted brand-wall" aria-label="Professional experience and client-project associations">
  <div className="trusted-heading brand-wall-heading"><span className="eyebrow trusted-label">PROFESSIONAL EXPERIENCE &amp; CLIENT PROJECTS</span></div>
  <div className="trusted-items brand-wall-logos">
   <div className="trusted-item brand-wall-item">
    <div className="trusted-brand-image brand-wall-logo" aria-label="V2 Technologies Ltd."><Image src="/brands/v2-mark.png" width={78} height={70} unoptimized alt="V2 Technologies logo"/><span className="trusted-brand-title">V2 Technologies Ltd.</span></div>
    <p className="brand-wall-caption">Direct employer</p>
   </div>
   <div className="trusted-item brand-wall-item">
    <div className="trusted-brand-image brand-wall-logo" aria-label="British American Tobacco Bangladesh"><Image src="/brands/bat-bangladesh.png" width={160} height={71} unoptimized alt="British American Tobacco logo"/></div>
    <p className="brand-wall-caption"><span className="brand-wall-client-name">British American Tobacco Bangladesh</span><span>Client project through V2</span></p>
   </div>
   <div className="trusted-item brand-wall-item">
    <div className="trusted-brand-image brand-wall-logo" aria-label="Banglalink"><Image src="/brands/banglalink-transparent.png" width={70} height={70} unoptimized alt="Banglalink logo"/><span className="trusted-brand-title">Banglalink</span></div>
    <p className="brand-wall-caption">Client project through V2</p>
   </div>
  </div>
 </div>
 </section>;
}
/** Clean editorial labels: no decorative timeline dot before section names. */
export function SectionHeading({number,name,aside}:{number:string,name:string,aside?:string}){
 return <div className="section-heading"><span className="section-heading-kicker">{name}</span>{aside&&<span className="eyebrow heading-aside">{aside}</span>}</div>;
}
const skillExplanations:Record<string,string>={
'PostgreSQL':'Production SQL databases, partitioning, tuning, backup and restore.',
'BigQuery':'Cloud data warehousing and analytical SQL transformations.',
'Google BigQuery':'Cloud data warehousing and analytical SQL transformations.',
'Looker Studio':'Interactive business intelligence dashboards and reporting.',
'Power BI':'Data modeling, DAX measures and interactive BI reporting.',
'SQL':'Queries, data validation, transformations and reporting models.',
'Python':'Automated data tasks, analysis and quality checks.',
'pandas':'Python-based data cleaning and transformations.',
'Power Query':'Extracting and transforming data in Microsoft BI tools.',
'DAX':'Measures and analytical calculations for Power BI.',
'Snowflake':'Familiarity with Snowflake cloud data warehouse concepts and SQL.',
'Fuzzy matching':'Comparing imperfect textual attributes for identity resolution.',
'Segmentation':'Grouping records by meaningful data attributes and definitions.',
'Data reconciliation':'Checking source and target datasets for consistency.',
'Workflow automation':'Reducing repetitive manual data processing.',
'Git':'Version control and traceable change management.',
'GitHub':'Hosting and collaborating on versioned code.',
'ETL':'Extracting, transforming and loading data for analytical use.',
'HTML/CSS (academic)':'Academic understanding of web layout and styling.'};
export function Capabilities(){return <section id="capabilities" className="section"><div className="container"><SectionHeading number="02" name="Capabilities" aside="Methods, tools and the work behind them"/><Reveal><div className="section-lead"><h2>Skills that turn ideas <em>into dependable work.</em></h2></div></Reveal><div className="capabilities-list capability-cards">{skills.map((s,i)=><Reveal key={s.name} delay={Math.min(i*.025,.18)}><article className="capability-card"><h3>{s.name}</h3><p>{s.use}</p><div className="skill-labels">{s.list.map(t=><span tabIndex={0} className="skill-pill" key={t} data-tip={skillExplanations[t]||`${t} — a documented skill applied in ${s.name.toLowerCase()}.`} aria-label={`${t}. ${skillExplanations[t]||'Documented skill in '+s.name}.`}>{t}</span>)}</div></article></Reveal>)}</div></div></section>}
export function ProjectVisual({p}:{p:Project}){return <div className={'project-visual visual-'+p.visual} aria-label="Original, conceptual project process diagram; not internal client architecture" role="img"><span className="mono visual-label">CONCEPTUAL WORKFLOW / NOT PRODUCTION ARCHITECTURE</span><div className="visual-flow">{p.stages.map((s,i)=><div className="visual-step" key={s}><span className="mono">{["A","B","C","D","E","F"][i]||"•"}</span><strong>{s}</strong>{i!==p.stages.length-1&&<div className="connector-line"/>}</div>)}</div><span className="mono visual-foot">RMP · ANALYTICAL METHOD</span></div>}
export function ProjectsShowcase(){const [index,setIndex]=useState(0);const p=featuredProjects[index];return <section id="projects" className="section"><div className="container"><SectionHeading number="03" name="Major Project Experiences" aside="Independent analytics and academic work"/><Reveal><div className="section-lead"><h2>Problems I've <em>worked through.</em></h2></div></Reveal><div className="featured-project-layout"><div className="project-tabs" role="tablist" aria-label="Select an independent or academic project">{featuredProjects.map((item,i)=><button key={item.slug} type="button" role="tab" id={`project-tab-${i}`} aria-selected={index===i} aria-controls="selected-project-panel" onClick={()=>setIndex(i)} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();setIndex((index+1)%featuredProjects.length)}if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();setIndex((index+featuredProjects.length-1)%featuredProjects.length)}}} className={index===i?'active':''}><span>{item.title}</span><ArrowUpRight size={15}/></button>)}</div><div className="project-details" id="selected-project-panel" role="tabpanel" aria-labelledby={`project-tab-${index}`}><AnimatePresence mode="wait"><motion.div key={p.slug} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.32}} className="project-panel"><div className="project-panel-copy"><span className="eyebrow">{p.eyebrow}</span><h3>{p.title}</h3><p className="project-panel-description">{p.description}</p><p className="project-panel-role"><b>My contribution</b> · {p.role}</p><div className="tag-list">{p.tools.slice(0,6).map(t=><span key={t}>{t}</span>)}</div><div className="project-panel-links"><Link className="text-action" href={`/projects/${p.slug}`}>View project details <ArrowUpRight size={16}/></Link></div></div><div className="featured-project-art">{p.image?<ProjectThumbnail src={projectAssetURL(p.image)} fallback={`https://rmpranto.github.io/assets/img/projects/${p.image}`} alt={`Dashboard or project screenshot for ${p.title}`}/>:<ProjectVisual p={p}/>}<span className="eyebrow">ORIGINAL PUBLIC PROJECT</span></div></motion.div></AnimatePresence></div></div><div className="section-tail"><div className="project-tail-links"><Link className="text-action" href="/projects">View all 8 projects <ArrowUpRight size={17}/></Link></div><span className="mono quiet">Independent analytics and academic work</span></div></div></section>}
export function Experience(){return <section id="experience" className="section"><div className="container"><SectionHeading number="04" name="Experience" aside="The path from learning to ownership"/><Reveal><div className="section-lead"><h2>Built through experience. <em>Grounded in data.</em></h2><p>A chronological account of how my responsibilities evolved from teaching to enterprise analytics and database operations.</p></div></Reveal><div className="experience-timeline">{experiences.map((job,i)=><Reveal key={job.date}><article className="timeline-entry"><div className="timeline-date">{job.date}</div><div className="timeline-spine" aria-hidden="true"><span/></div><div className="timeline-entry-main"><div className="timeline-entry-head"><div><h3>{job.role}</h3><p className="timeline-company"><a className="institution-link" href={job.org.includes("V2")?"https://v2.ltd/":"https://www.aiub.edu/"} target="_blank" rel="noopener noreferrer">{job.org}<ArrowUpRight size={13} aria-hidden="true"/></a></p></div><span className="timeline-index">{i===0?'Current role':'Experience'}</span></div><p className="timeline-overview">{job.overview}</p><ul className="timeline-highlights">{job.highlights.map(h=><li key={h}>{h}</li>)}</ul><div className="tag-list">{job.tools.map(t=><span key={t}>{t}</span>)}</div></div></article></Reveal>)}</div></div></section>}
export function AboutTeaser(){return <section id="about" className="section about-home"><div className="container"><SectionHeading number="01" name="A Little About Me" aside="The story behind the work"/><Reveal><div className="about-grid"><div className="about-intro"><h2>Curiosity led me to data.<br/><em>Real-world problems made me stay.</em></h2><p className="about-position">Rahat Maksud Pranto · Data Analyst</p><div className="about-cta"><Link className="button button-outline" href="/about">Read my full story <ArrowUpRight size={15}/></Link></div></div><div className="about-story"><p>After graduating in Computer Science and Software Engineering from AIUB, I explored different paths before finding my direction in data analytics.</p><p>At V2 Technologies, what began with SQL reports and dashboards grew into work on enterprise CRM analytics, BigQuery, PostgreSQL operations, automation and consumer identity resolution.</p><p>What motivates me most is making information more trustworthy—understanding where records come from, what can go wrong, and how to build a more reliable system.</p><SocialLinks compact/></div></div></Reveal></div></section>}
export function Education(){const education=[
 {date:'2018 — 2023',degree:'B.Sc. in Computer Science & Software Engineering (CSSE)',institution:'American International University–Bangladesh',href:'https://www.aiub.edu/',detail:'CGPA 3.31 · Final-year thesis: Smart Irrigation System Using IoT (2023)'},
 {date:'2015 — 2017',degree:'Higher Secondary Certificate (HSC)',institution:'Govt. Ananda Mohan College, Mymensingh',href:'https://www.anandamohangovtcollege.edu.bd/',detail:'Science'},
 {date:'2007 — 2015',degree:'Secondary School Certificate (SSC)',institution:'Mymensingh Zilla School',href:'http://www.mzs.edu.bd/',detail:'Science'}
 ];return <section className="section" id="education"><div className="container"><SectionHeading number="05" name="Education"/><Reveal><h2 className="standalone-title">Where it <em>started.</em></h2></Reveal><div className="education-timeline">{education.map((x,i)=><Reveal key={i}><article className="education-node"><div className="education-period">{x.date}</div><div className="education-dot" aria-hidden="true"><span className="education-dot-marker"/></div><div className="education-content"><h3>{x.degree}</h3><p><a className="institution-link" href={x.href} target="_blank" rel="noopener noreferrer">{x.institution}<ArrowUpRight size={14} aria-hidden="true"/></a></p><small>{x.detail}</small></div></article></Reveal>)}</div></div></section>}
function CredentialArtwork({src,title}:{src?:string,title:string}){const [attempt,setAttempt]=useState(0);const fallback=src?.startsWith("/assets/certifications/")?src.replace("/assets/certifications/","https://rmpranto.github.io/assets/img/certifications/"):undefined;return src&&attempt<2?<Image src={attempt===1&&fallback?fallback:src} width={180} height={130} alt={'Public credential image: '+title} unoptimized onError={()=>setAttempt(x=>x+1)}/>:<span className="credential-artwork-fallback" aria-hidden="true">Certificate image unavailable</span>}
export function Credentials(){const [all,setAll]=useState(false);return <section id="credentials" className="section"><div className="container"><SectionHeading number="06" name="Credentials" aside="Continuous learning"/><Reveal><div className="section-lead"><h2>Built through <em>study and practice.</em></h2></div></Reveal><div className="credential-list">{credentials.slice(0,all?credentials.length:5).map((c,i)=><Reveal key={c.name}><div className="credential-row"><div className="credential-artwork"><CredentialArtwork src={c.image} title={c.name}/></div><div><strong>{c.name}</strong><small>{c.issuer}</small></div>{c.url?<a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={'View credential '+c.name}>Verify <ArrowUpRight size={16}/></a>:<span className="mono quiet">Verification link unavailable</span>}</div></Reveal>)}</div><button className="text-action credentials-toggle" onClick={()=>setAll(!all)} aria-expanded={all}>{all?'Show fewer credentials':'View all 12 credentials'} {all?<Minus size={16}/>:<Plus size={16}/>}</button></div></section>}
export function Contact(){
 const [type,setType]=useState('A project or collaboration');
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [message,setMessage]=useState('');
 const [website,setWebsite]=useState('');
 const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [error,setError]=useState('');
 const submit=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(state==='sending')return;
  if(website){setState('idle');return;} // honeypot: ignore automated submissions
  setState('sending');setError('');
  try{
   const payload=new FormData();
   payload.set('name',name.trim());
   payload.set('email',email.trim());
   payload.set('inquiry_type',type);
   payload.set('message',message.trim());
   payload.set('_subject',`Portfolio inquiry: ${type}`);
   const response=await fetch('https://formspree.io/f/mzzzvbdj',{
    method:'POST',headers:{'Accept':'application/json'},body:payload
   });
   if(!response.ok){
    let reason='Your message could not be sent. Please retry or contact me by email.';
    try{const data=await response.json();if(data?.errors?.length)reason=data.errors.map((item:{message?:string})=>item.message).filter(Boolean).join(' ')||reason;}catch{}
    throw new Error(reason);
   }
   setState('success');setName('');setEmail('');setMessage('');
  }catch(err){setState('error');setError(err instanceof Error?err.message:'Submission failed. Please try again.');}
 };
 return <section id="contact" className="section contact-section"><div className="container"><SectionHeading number="07" name="Get in Touch" aside="Thoughtful work begins with a conversation"/><Reveal><h2 className="contact-headline">Have something <em>in mind?</em><br/> Get in touch.</h2></Reveal><div className="contact-grid"><div className="contact-left"><p>Whether you're exploring a collaboration, hiring for a data role, or just want to exchange ideas, I'd be glad to hear from you.</p><a className="contact-email" href={'mailto:'+site.email}>{site.email} <ArrowUpRight size={19}/></a><SocialLinks/></div><form className="contact-form" onSubmit={submit}><span className="mono quiet">WHAT BRINGS YOU HERE?</span><div className="contact-options" role="radiogroup" aria-label="Inquiry type">{['A project or collaboration','A career opportunity','Something else'].map(t=><label key={t}><input type="radio" name="inquiry" checked={type===t} onChange={()=>{setType(t);setState('idle')}} disabled={state==='sending'}/><span>{t}</span></label>)}</div><div className="contact-fields"><label>Your name<input name="name" required minLength={2} maxLength={120} value={name} onChange={e=>{setName(e.target.value);setState('idle')}} placeholder="Name" autoComplete="name" disabled={state==='sending'}/></label><label>Email address<input name="email" required type="email" maxLength={254} value={email} onChange={e=>{setEmail(e.target.value);setState('idle')}} placeholder="you@example.com" autoComplete="email" disabled={state==='sending'}/></label></div><label>Your message<textarea name="message" required minLength={10} maxLength={5000} rows={4} value={message} onChange={e=>{setMessage(e.target.value);setState('idle')}} placeholder="Tell me what you have in mind…" disabled={state==='sending'}/></label><div className="contact-honeypot" aria-hidden="true"><label>Leave this blank<input tabIndex={-1} autoComplete="off" name="_gotcha" value={website} onChange={e=>setWebsite(e.target.value)}/></label></div><button className="button button-primary" type="submit" disabled={state==='sending'} aria-busy={state==='sending'}>{state==='sending'?'Sending…':'Send Inquiry'} <ArrowUpRight size={16}/></button><p className="form-disclosure">Messages are sent securely through Formspree. If you prefer, email me directly.</p><div className="form-status" role="status" aria-live="polite">{state==='success'&&<p className="form-success"><Check size={17}/> Your inquiry was sent successfully. Thank you!</p>}{state==='error'&&<p className="form-error">{error} <a href={'mailto:'+site.email}>Email me instead</a>.</p>}</div></form></div></div></section>
}
export function Footer(){return <footer className="footer" id="site-footer"><div className="container"><div className="footer-top-grid"><div className="footer-profile"><Link href="/#top" className="footer-brand-name">Rahat Maksud Pranto</Link><p>Data Analyst working across analytics, database operations and practical engineering. Building dependable systems behind useful decisions.</p><SocialLinks compact/></div><div className="footer-nav-group"><h3>Explore</h3><Link href="/#about">About me</Link><Link href="/#capabilities">Skills &amp; tools</Link><Link href="/#projects">Projects</Link><Link href="/#experience">Experience</Link></div><div className="footer-nav-group"><h3>Resources</h3><Link href="/projects">Project archive</Link><Link href="/#credentials">Credentials</Link><ResumeButton className="footer-resume">View resume <ArrowUpRight size={14}/></ResumeButton></div><div className="footer-nav-group footer-connect"><h3>Get in touch</h3><a href={'mailto:'+site.email}>{site.email}</a><a href={site.whatsapp} target="_blank" rel="noreferrer noopener">WhatsApp <ArrowUpRight size={13}/></a><Link href="/#contact">Get in touch <ArrowUpRight size={13}/></Link></div></div><div className="footer-lower"><span>Rahat Maksud Pranto · Dhaka, Bangladesh</span><span>© 2026. All rights reserved.</span></div></div></footer>}
export function FilteredProjectGrid({initial='all'}:{initial?:'all'|ProjectCategory}){const [category,setCategory]=useState<'all'|ProjectCategory>(initial);const filtered=projects.filter(p=>category==='all'||p.category===category);const tabs:[string,'all'|ProjectCategory][]=[['All projects','all'],['Analytics & BI','analytics'],['Academic','academic']];return <><div className="filters" role="group" aria-label="Filter projects">{tabs.map(([label,k])=><button key={k} aria-pressed={category===k} className={category===k?'chosen':''} onClick={()=>setCategory(k)}>{label}</button>)}</div><div className="project-card-grid"><AnimatePresence mode="popLayout">{filtered.map(p=><motion.article layout initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}} key={p.slug} className="archive-card"><Link href={`/projects/${p.slug}`} aria-label={'Read project '+p.title}><div className="archive-image">{p.category!=='professional'&&p.image?<ProjectThumbnail src={projectAssetURL(p.image)} fallback={`https://rmpranto.github.io/assets/img/projects/${p.image}`} alt={`Original public project image for ${p.title}`}/>:<div className={'abstract-image visual-'+p.visual}><span className="mono">RMP / ORIGINAL CONCEPTUAL VISUAL</span><b>{p.title.split(' ').slice(0,3).join(' ')}</b><span>PUBLIC-SAFE / NOT PRODUCTION UI</span></div>}</div><div className="archive-card-main"><span className="eyebrow">{p.eyebrow}</span><h3>{p.title}</h3><p>{p.description}</p><div className="archive-card-bottom"><span className="mono quiet">{p.tools.slice(0,3).join(' · ')}</span><ArrowUpRight size={19}/></div></div></Link></motion.article>)}</AnimatePresence></div>{filtered.length===0&&<p>No projects in this category.</p>}</>}
function ProjectThumbnail({src,alt,fallback}:{src:string,alt:string,fallback?:string}){const [attempt,setAttempt]=useState(0);const bad=attempt>(fallback?1:0);return bad?<div className="abstract-image">Original public image unavailable.<small>Project details remain accessible.</small></div>:<Image className="archive-thumbnail" src={attempt===1&&fallback?fallback:src} width={600} height={380} alt={alt} unoptimized onError={()=>setAttempt(x=>x+1)}/> }
export function PublicProjectGallery({images,project}:{images:{filename:string,caption:string}[],project:string}){return <div className="detail-public-gallery" aria-label={`${project} original project images`}>{images.map(item=><figure key={item.filename}><a href={projectAssetURL(item.filename)} target="_blank" rel="noreferrer noopener" aria-label={`Open full image: ${item.caption}`}><ProjectThumbnail src={projectAssetURL(item.filename)} fallback={`https://rmpranto.github.io/assets/img/projects/${item.filename}`} alt={item.caption}/></a><figcaption>{item.caption} · Click image to enlarge ↗</figcaption></figure>)}</div>}

export function ReadingProgress(){const {scrollYProgress}=useScroll();return <motion.div className="reading-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>}
export function TableOfContents({headings}:{headings:{id:string,title:string}[]}){return <aside className="article-toc"><span className="eyebrow">ON THIS PAGE</span><nav aria-label="Article table of contents">{headings.map(h=><a key={h.id} href={'#'+h.id}>{h.title}</a>)}</nav></aside>}
export function CopyCode({children,language}:{children:string,language?:string}){const [copied,setCopied]=useState(false);return <div className="code-block"><div className="code-toolbar"><span className="mono">{language||'CODE'}</span><button onClick={async()=>{try{await navigator.clipboard.writeText(children);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}}}>{copied?<Check size={14}/>:<FileText size={14}/>} {copied?'Copied':'Copy'}</button></div><pre><code>{children}</code></pre></div>}


/** Short, accessible first-load sequence; never masks content for reduced-motion users. */
export function DataIntro(){
 const reduce=!!useReducedMotion();
 const [visible,setVisible]=useState(true);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setVisible(false);return;}const t=window.setTimeout(()=>setVisible(false),1050);return()=>window.clearTimeout(t)},[]);
 return <AnimatePresence>{visible&&!reduce&&<motion.div className="data-intro" initial={{opacity:1}} exit={{opacity:0,transition:{duration:.25}}} role="status" aria-label="Loading portfolio"><div className="data-intro-inner"><span className="data-intro-mark">RMP<span>.</span></span><p className="mono">Turning data into clarity</p><div className="data-intro-track"><motion.span initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.83,ease:'easeInOut'}}/></div><div className="data-intro-code mono" aria-hidden="true">SQL <span>·</span> ANALYTICS <span>·</span> ENGINEERING</div><button type="button" className="data-intro-skip" onClick={()=>setVisible(false)}>Skip intro →</button></div></motion.div>}</AnimatePresence>;
}

export function ConditionalFooter(){return <Footer/>;}
