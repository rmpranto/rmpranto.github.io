'use client';

import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import {ArrowUpRight,ChevronLeft,ChevronRight,Expand,X,ImageIcon} from 'lucide-react';
import {projectAssetURL} from '@/lib/public-assets';

type GalleryImage={filename:string;caption:string};
const localImageURL=projectAssetURL;
const remoteImageURL=(filename:string)=>`https://rmpranto.github.io/assets/img/projects/${encodeURIComponent(filename)}`;

/** A single, aspect-ratio-safe viewer. Never displays mismatched report screenshots as equal-height cards. */
export function ProjectImageGallery({images,project}:{images:GalleryImage[];project:string}){
 const [selected,setSelected]=useState(0);
 const [zoomed,setZoomed]=useState(false);
 const [failed,setFailed]=useState<string[]>([]);
 const [remoteFiles,setRemoteFiles]=useState<string[]>([]);
 const imageURL=(filename:string)=>remoteFiles.includes(filename)?remoteImageURL(filename):localImageURL(filename);
 const onImageError=(filename:string)=>{if(remoteFiles.includes(filename))setFailed(list=>list.includes(filename)?list:[...list,filename]);else setRemoteFiles(list=>list.includes(filename)?list:[...list,filename]);};
 const openButton=useRef<HTMLButtonElement>(null);
 const closeButton=useRef<HTMLButtonElement>(null);
 const dialog=useRef<HTMLDivElement>(null);
 const chosen=images[selected];
 const failedSelected=failed.includes(chosen?.filename);
 const nextImage=()=>setSelected(current=>(current+1)%images.length);
 const previousImage=()=>setSelected(current=>(current+images.length-1)%images.length);
 const close=()=>{setZoomed(false);requestAnimationFrame(()=>openButton.current?.focus())};
 useEffect(()=>{
  if(!zoomed)return;
  const prior=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeButton.current?.focus();
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();close()}
   if(event.key==='ArrowRight'&&images.length>1){event.preventDefault();nextImage()}
   if(event.key==='ArrowLeft'&&images.length>1){event.preventDefault();previousImage()}
   if(event.key==='Tab'){
    const items=Array.from(dialog.current?.querySelectorAll<HTMLElement>('button,a[href]')||[]);
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
   }
  };
  document.addEventListener('keydown',onKey);
  return()=>{document.body.style.overflow=prior;document.removeEventListener('keydown',onKey)};
 // The event listener is intentionally refreshed when the selected image changes.
 },[zoomed,images.length]);
 if(!images.length)return null;
 return <section className="project-gallery-shell" aria-label={`${project} gallery`}>
   <div className="project-gallery-heading">
    <div><span className="eyebrow">PROJECT GALLERY</span><p>Actual screenshots from the original public project.</p></div>
    <span className="project-gallery-total">{String(selected+1).padStart(2,'0')} <span>/</span> {String(images.length).padStart(2,'0')}</span>
   </div>
   <div className="project-gallery-stage">
    <button type="button" ref={openButton} className="project-gallery-open" aria-label={`Enlarge image: ${chosen.caption}`} onClick={()=>setZoomed(true)}>
     {failedSelected?<span className="project-gallery-unavailable"><ImageIcon size={28}/><strong>Image unavailable</strong><small>The original project description is still available below.</small></span>:<Image src={imageURL(chosen.filename)} alt={chosen.caption} width={1440} height={900} unoptimized priority={selected===0} onError={()=>onImageError(chosen.filename)}/>}
     <span className="project-gallery-expand"><Expand size={16}/> View full size</span>
    </button>
    {images.length>1&&<div className="project-gallery-controls" aria-label="Gallery controls">
      <button type="button" onClick={previousImage} aria-label="Previous image"><ChevronLeft size={18}/></button>
      <button type="button" onClick={nextImage} aria-label="Next image"><ChevronRight size={18}/></button>
    </div>}
   </div>
   <div className="project-gallery-foot">
    <p>{chosen.caption}</p>
    <a href={imageURL(chosen.filename)} target="_blank" rel="noopener noreferrer">Open original image <ArrowUpRight size={15}/></a>
   </div>
   {images.length>1&&<div className="project-gallery-thumbnails" aria-label="Choose a project screenshot">
    {images.map((item,index)=><button type="button" key={item.filename} className={'project-gallery-thumb '+(index===selected?'is-active':'')} onClick={()=>setSelected(index)} aria-pressed={index===selected} aria-label={`Show screenshot ${index+1}: ${item.caption}`}>
      <span className="project-gallery-thumb-image">{failed.includes(item.filename)?<ImageIcon size={18} aria-hidden="true"/>:<Image src={imageURL(item.filename)} alt="" width={140} height={96} unoptimized onError={()=>onImageError(item.filename)}/>}</span>
      <span className="project-gallery-thumb-text"><small>VIEW {String(index+1).padStart(2,'0')}</small><span>{item.caption.replace(/^(Original|Additional)\s+/i,'')}</span></span>
     </button>)}
   </div>}
   {zoomed&&<div className="project-gallery-modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)close()}}>
     <div className="project-gallery-modal" ref={dialog} role="dialog" aria-modal="true" aria-label={`${project} screenshot viewer`}>
      <div className="project-gallery-modal-header"><span>{project} <small>— {selected+1} of {images.length}</small></span><button ref={closeButton} type="button" onClick={close} aria-label="Close image viewer"><X size={22}/></button></div>
      <div className="project-gallery-modal-image">{failedSelected?<p>Original image is currently unavailable.</p>:<Image src={imageURL(chosen.filename)} alt={chosen.caption} width={1800} height={1200} unoptimized onError={()=>onImageError(chosen.filename)}/>}</div>
      <div className="project-gallery-modal-footer"><span>{chosen.caption}</span><div>{images.length>1&&<><button type="button" onClick={previousImage} aria-label="Previous screenshot"><ChevronLeft size={19}/></button><button type="button" onClick={nextImage} aria-label="Next screenshot"><ChevronRight size={19}/></button></>}<a href={imageURL(chosen.filename)} target="_blank" rel="noopener noreferrer">Original <ArrowUpRight size={14}/></a></div></div>
     </div>
   </div>}
  </section>;
}
