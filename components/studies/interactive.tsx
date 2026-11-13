'use client';

import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

/** Shared reference card: editable content, original geometry, progressive reveal. */
export function StudyCard({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{duration:.6,delay,ease:[.22,1,.36,1]}} className={`${className.includes('bg-') ? '' : 'bg-white'} rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col ${className}`}>{children}</motion.div>;
}

const CarouselContext = createContext(0);
export function Carousel({ children, className }: { children: ReactNode; className?: string }) {
  const [slide, setSlide] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);
  useEffect(() => { setCount(ref.current?.querySelector('[data-slide-track]')?.children.length || 1); }, []);
  return <CarouselContext.Provider value={slide}><div ref={ref} className={className} onKeyDown={e => { if(e.key === 'ArrowRight') setSlide(s => Math.min(count-1,s+1)); if(e.key === 'ArrowLeft') setSlide(s=>Math.max(0,s-1)); }} tabIndex={0} aria-label="Reference slides">
    {children}
    <button aria-label="Previous slide" onClick={() => setSlide(s=>Math.max(0,s-1))} disabled={slide===0} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg z-10 bg-white disabled:opacity-40">‹</button>
    <button aria-label="Next slide" onClick={() => setSlide(s=>Math.min(count-1,s+1))} disabled={slide===count-1} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg z-10 bg-white disabled:opacity-40">›</button>
    <div className="absolute bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 lg:gap-2 p-1.5 px-3 lg:p-2 lg:px-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">{Array.from({length:count},(_,i)=><button key={i} aria-label={`Go to slide ${i+1}`} onClick={()=>setSlide(i)} className={`h-1.5 lg:h-2 rounded-full transition-all ${i===slide?'w-6 lg:w-8 bg-white':'w-1.5 lg:w-2 bg-white/50'}`} />)}</div>
  </div></CarouselContext.Provider>;
}
export function SlideTrack({children}:{children:ReactNode}) {
  const slide=useContext(CarouselContext);
  return <div data-slide-track className="flex w-full items-center h-full" style={{transform:`translateX(-${slide*100}%)`,transition:'transform .45s ease'}}>{children}</div>;
}

type WorkflowNode={x:number;y:number;title:string;description?:string|null;image?:string|null;content:ReactNode};
export function Workflow({ title, nodes: initialNodes, connections }: {title:string;nodes:WorkflowNode[];connections:number[][]}) {
  const [nodes,setNodes]=useState(initialNodes);
  const [selected,setSelected]=useState<WorkflowNode|null>(null);
  const [zoom,setZoom]=useState(1);
  const panCleanup=useRef<(()=>void)|null>(null);
  useEffect(()=>()=>panCleanup.current?.(),[]);
  const drag=useRef<{id:number;x:number;y:number;originX:number;originY:number;moved:boolean}|null>(null);
  useEffect(()=>{ if(!selected)return; const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setSelected(null);}; window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close); },[selected]);
  const width=Math.max(800,...nodes.map(n=>n.x+270));const height=Math.max(600,...nodes.map(n=>n.y+(n.image?250:150)));
  return <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white/60 backdrop-blur p-4 sm:p-6 shadow-sm">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-600">Reference</div><span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-black/50">{title}</span></div></div>
    <div className="relative h-[400px] w-full overflow-auto rounded-xl border border-black/5 bg-[#fbfbfb] shadow-inner sm:h-[500px] md:h-[600px] custom-scrollbar" style={{minHeight:400}} onPointerDown={e=>{if(e.target!==e.currentTarget && !(e.target as Element).classList.contains("relative"))return;panCleanup.current?.();const el=e.currentTarget,x=e.clientX,y=e.clientY,left=el.scrollLeft,top=el.scrollTop;el.setPointerCapture(e.pointerId);const move=(ev:PointerEvent)=>{el.scrollLeft=left+x-ev.clientX;el.scrollTop=top+y-ev.clientY;};const up=()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up);el.removeEventListener("lostpointercapture",up);if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);panCleanup.current=null;};panCleanup.current=up;el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);el.addEventListener("lostpointercapture",up);}}><div className="relative" style={{minWidth:width*zoom,minHeight:height*zoom}}><div style={{width,height,transform:`scale(${zoom})`,transformOrigin:"0 0"}}>
      <svg className="absolute top-0 left-0 pointer-events-none" width={width} height={height} style={{overflow:'visible'}}>{connections.map(([from,to])=>{const a=nodes[from],b=nodes[to];const x=a.x+220,y=a.y+40,tx=b.x,ty=b.y+40;return <path key={`${from}-${to}`} d={`M${x},${y} C${x+(tx-x)*.5},${y} ${tx-(tx-x)*.5},${ty} ${tx},${ty}`} fill="none" stroke="currentColor" strokeWidth={2} strokeDasharray="8,6" strokeLinecap="round" opacity={.35} className="text-foreground text-black/40"/>;})}</svg>
      {nodes.map((node,id)=><div key={id} role="button" tabIndex={0} aria-label={`Inspect ${node.title}`} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(node);}}} className="absolute cursor-grab" style={{width:220,transform:`translate(${node.x}px,${node.y}px)`,touchAction:'none',userSelect:'none'}}
        onPointerDown={e=>{e.stopPropagation();e.currentTarget.setPointerCapture(e.pointerId);drag.current={id,x:e.clientX,y:e.clientY,originX:node.x,originY:node.y,moved:false};}}
        onPointerMove={e=>{const d=drag.current;if(!d||d.id!==id)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.abs(dx)+Math.abs(dy)>4)d.moved=true;setNodes(ns=>ns.map((n,i)=>i===id?{...n,x:Math.max(0,d.originX+dx/zoom),y:Math.max(0,d.originY+dy/zoom)}:n));}}
        onPointerUp={()=>{if(drag.current&&!drag.current.moved)setSelected(node);drag.current=null;}} onPointerCancel={()=>{drag.current=null;}} onLostPointerCapture={()=>{drag.current=null;}}>{node.content}</div>)}
    </div></div></div>
    <div className="absolute bottom-8 right-8 flex rounded-lg border border-black/10 bg-white shadow-sm"><button aria-label="Zoom out" className="px-3 py-2" onClick={()=>setZoom(z=>Math.max(.4,z-.1))}>−</button><button aria-label="Reset zoom" className="px-3 py-2 text-xs" onClick={()=>setZoom(1)}>{Math.round(zoom*100)}%</button><button aria-label="Zoom in" className="px-3 py-2" onClick={()=>setZoom(z=>Math.min(2,z+.1))}>+</button></div>
    {selected&&createPortal(<div role="presentation" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={()=>setSelected(null)}><div role="dialog" aria-modal="true" aria-label={selected.title} onClick={e=>e.stopPropagation()} className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-2xl"><button autoFocus aria-label="Close reference" onClick={()=>setSelected(null)} className="absolute right-4 top-4 rounded-full p-2 hover:bg-black/5">✕</button><h2 className="text-2xl font-bold tracking-tight text-black mb-6">{selected.title}</h2>{selected.description&&<p className="mb-6 p-4 rounded-xl bg-black/5 text-sm md:text-base leading-relaxed text-black/80 font-medium">{selected.description}</p>}{selected.image&&<img src={selected.image} alt={selected.title} className="w-full h-auto max-h-[60vh] object-contain rounded-xl"/>}</div></div>,document.body)}
  </div>;
}

export { ArtworkGallery } from "./gallery";

export function ReferenceFilm(){
  return <iframe src="https://www.youtube.com/embed/5K65VAHS37U?autoplay=1&mute=1&loop=1&playlist=5K65VAHS37U&playsinline=1&controls=0&modestbranding=1" title="DriveX Diwali Cinematic Film" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="w-full h-full absolute inset-0" style={{border:0}} />;
}
