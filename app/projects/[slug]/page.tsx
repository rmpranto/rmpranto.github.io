import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowUpRight,ArrowLeft,ArrowRight,ExternalLink} from 'lucide-react';
import {projects,findProject} from '@/content/data';
import {ProjectVisual,Reveal} from '@/components/Interface';
import {ProjectImageGallery} from '@/components/ProjectGallery';
import {publicProjectDetails} from '@/content/public-project-details';

type Props={params:Promise<{slug:string}>};
export async function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const p=findProject((await params).slug);
 return {title:p?p.title:'Project not found',description:p?.description};
}

export default async function ProjectDetail({params}:Props){
 const slug=(await params).slug;
 const p=findProject(slug);
 if(!p)notFound();
 const original=publicProjectDetails[slug];
 const index=projects.findIndex(item=>item.slug===slug);
 const previous=projects[(index+projects.length-1)%projects.length];
 const next=projects[(index+1)%projects.length];
 const category=p.category==='professional'?'Professional / Client Work':p.category==='analytics'?'Independent / Data Analytics':'Academic / Software & Data';
 const sections=original?[
  ['overview','Overview'],['objectives','Objectives'],['process','Technical workflow'],['contribution','My contribution'],['findings','Results & insights'],['reflection','Reflections']
 ]:[['overview','Overview'],['approach','Technical approach'],['impact','Outcome'],['reflection','Reflections']];
 return <article className="container interior-page detail-page project-detail-v10">
  <header className="detail-head project-detail-header">
   <div className="project-detail-breadcrumb"><Link href="/projects" className="back-link"><ArrowLeft size={15}/> All projects</Link><span className="eyebrow">{category}</span></div>
   <h1>{p.title}</h1>
   <p className="project-detail-subtitle">{p.description}</p>
   <div className="tag-list">{p.tools.map(tool=><span key={tool}>{tool}</span>)}</div>
  </header>

  {original?<ProjectImageGallery images={original.images} project={p.title}/>:<div className="project-detail-concept"><div className="detail-cover"><ProjectVisual p={p}/></div><p>Original, generalized illustration. Private client screenshots and operational data are not displayed.</p></div>}

  <section className="project-snapshot" aria-label="Project at a glance">
   <div className="project-snapshot-item"><span>PROJECT TYPE</span><strong>{category}</strong></div>
   <div className="project-snapshot-item"><span>MY ROLE</span><strong>{p.role.split(',')[0].replace(/\.$/,'')}</strong></div>
   <div className="project-snapshot-item"><span>TOOLS & METHODS</span><strong>{p.tools.slice(0,3).join(' · ')}</strong></div>
  </section>

  <div className="project-detail-reading-layout">
   <aside className="project-detail-aside">
    <span className="eyebrow">ON THIS PAGE</span>
    <nav aria-label="Project page contents">{sections.map(([id,label])=><a href={'#'+id} key={id}>{label}</a>)}</nav>
    <div className="project-detail-resources">
      <span className="eyebrow">EXPLORE MORE</span>
      {original?.resources?.map(resource=><a href={resource.url} key={resource.url} target="_blank" rel="noopener noreferrer">{resource.label} <ExternalLink size={14}/></a>)}
      {p.original&&<a href={p.original} target="_blank" rel="noopener noreferrer">Original public project <ExternalLink size={14}/></a>}
      {p.repository&&<a href={p.repository} target="_blank" rel="noopener noreferrer">Project repository <ExternalLink size={14}/></a>}
      {!p.original&&!p.repository&&!p.caseStudy&&<p>All available project details are included here.</p>}
    </div>
   </aside>

   <div className="project-reading">
    {original?<>
      <Reveal><section id="overview" className="project-reading-section">
       <span className="eyebrow">PROJECT OVERVIEW</span>
       <h2>The story behind the work</h2>
       <p className="project-opening">{original.context}</p>
       <div className="project-question"><span>THE CHALLENGE</span><p>{p.problem}</p></div>
      </section></Reveal>
      <Reveal><section id="objectives" className="project-reading-section">
       <span className="eyebrow">GOALS & SCOPE</span>
       <h2>What I set out to do</h2>
       <ul className="project-clear-list">{original.objectives.map(item=><li key={item}>{item}</li>)}</ul>
      </section></Reveal>
      <Reveal><section id="process" className="project-reading-section">
       <span className="eyebrow">PROCESS & IMPLEMENTATION</span>
       <h2>From raw data to a useful result</h2>
       <p>{p.approach}</p>
       <ul className="project-clear-list">{original.workflow.map(item=><li key={item}>{item}</li>)}</ul>
      </section></Reveal>
      <Reveal><section id="contribution" className="project-reading-section">
       <span className="eyebrow">MY ROLE & RESPONSIBILITIES</span>
       <h2>What I contributed</h2>
       <p>{p.role}</p>
       <ul className="project-clear-list">{original.contributions.map(item=><li key={item}>{item}</li>)}</ul>
      </section></Reveal>
      <Reveal><section id="findings" className="project-reading-section">
       <span className="eyebrow">RESULTS & FINDINGS</span>
       <h2>{p.category==='academic'?'What the project delivered':'What the analysis revealed'}</h2>
       <ul className="project-clear-list">{original.findings.map(item=><li key={item}>{item}</li>)}</ul>
       <div className="project-outcome"><span className="eyebrow">OUTCOME & CONTEXT</span><p>{original.outcome}</p></div>
      </section></Reveal>
     </>:<>
      <Reveal><section id="overview" className="project-reading-section">
       <span className="eyebrow">PROJECT OVERVIEW</span>
       <h2>Problem & context</h2><p className="project-opening">{p.problem}</p>
      </section></Reveal>
      <Reveal><section id="approach" className="project-reading-section">
       <span className="eyebrow">TECHNICAL APPROACH</span>
       <h2>How the work took shape</h2>
       <p>{p.approach}</p><ul className="project-clear-list">{p.stages.map(item=><li key={item}>{item}</li>)}</ul>
       <p><strong>My contribution:</strong> {p.role}</p>
      </section></Reveal>
      <Reveal><section id="impact" className="project-reading-section">
       <span className="eyebrow">OUTCOME</span><h2>What it enabled</h2><p>{p.results}</p>
       <p className="project-disclosure">This account intentionally excludes non-public client data, private systems and internal implementation details.</p>
      </section></Reveal>
     </>}
     <Reveal><section id="reflection" className="project-reading-section project-last-section">
      <span className="eyebrow">REFLECTION</span><h2>Challenges & lessons</h2>
      <ul className="project-clear-list">{p.challenges.map(item=><li key={item}>{item}</li>)}</ul>
      {p.lessons.map(item=><p key={item}>{item}</p>)}
     </section></Reveal>
   </div>
  </div>

  <nav className="next-projects project-next-navigation" aria-label="Explore other projects">
   <Link href={'/projects/'+previous.slug}><ArrowLeft size={17}/><span><small>PREVIOUS PROJECT</small><b>{previous.title}</b></span></Link>
   <Link href={'/projects/'+next.slug}><span><small>NEXT PROJECT</small><b>{next.title}</b></span><ArrowRight size={17}/></Link>
  </nav>
 </article>;
}
