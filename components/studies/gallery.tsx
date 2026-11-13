'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './gallery-shaders';

const names=['Aries','Chandler','Comment-NAMI','Comment-Shantanu_','DSP_173_-1','DSP_202__1','Hozier','I_Quit_smoking','Infinite_Pillar_of_Fire','Jiraya_JA','Joey','Minato','Pinkman','Princes_Ghat','PsychCat','Psych_Dog','Taurus','Untitled_Artwork 10','Untitled_Artwork 11','Untitled_Artwork 12','Untitled_Artwork 5','Untitled_Artwork 6','Untitled_Artwork 7','Untitled_Artwork 8','Untitled_Artwork 9','Wall_E','Walter_White','_Mascot'];
export const artworkImages=names.map(name=>({src:`/storage/v1/object/public/portfolio-assets/public/Sections/Artworks/arts/${name}.optimized.jpg`,alt:name.replaceAll('_',' ')}));

/** Original 8-plane, 55° perspective tunnel, with original GLSL cloth/blur/hover behavior. */
export function ArtworkGallery(){
 const ref=useRef<HTMLDivElement>(null);
 const [unsupported,setUnsupported]=useState(false);
 useEffect(()=>{
  const host=ref.current;if(!host)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch{setUnsupported(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','Spatial artwork reference gallery: scroll or use arrow keys to browse');
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(55,1,.1,1000);
  const loader=new THREE.TextureLoader();let disposed=false;
  // Decode as DOM images as well, making reference media accessible to inspection tools.
  const textures=artworkImages.map(({src})=>loader.load(src,t=>{t.colorSpace=THREE.SRGBColorSpace;}));
  const geometry=new THREE.PlaneGeometry(1,1,32,32);
  const cards=Array.from({length:8},(_,i)=>{
   const a=2.618*i%(2*Math.PI),b=(1.618*i+Math.PI/3)%(2*Math.PI);
   let x=i%3*1.2*Math.sin(a)*8/3,y=(i+1)%4*.8*Math.cos(b)*8/4;
   if(Math.abs(x)<2)x+=x>=0?2:-2;if(Math.abs(y)<2)y+=y>=0?2:-2;
   const material=new THREE.ShaderMaterial({transparent:true,uniforms:{map:{value:textures[i]},opacity:{value:1},blurAmount:{value:0},scrollForce:{value:0},time:{value:0},isHovered:{value:0}},vertexShader,fragmentShader});
   const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,50/8*i-25);scene.add(mesh);
   return {mesh,material,z:50/8*i,index:i};
  });
  const resize=()=>{const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};resize();const observer=new ResizeObserver(resize);observer.observe(host);
  let force=0,last=performance.now(),lastInput=0,frame=0,pointerY:number|null=null;
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(99,99);
  const wheel=(e:WheelEvent)=>{e.preventDefault();force+=.01*e.deltaY;lastInput=performance.now();};
  const key=(e:KeyboardEvent)=>{if(['ArrowUp','ArrowLeft','ArrowDown','ArrowRight'].includes(e.key)){e.preventDefault();force+=['ArrowUp','ArrowLeft'].includes(e.key)?-2:2;lastInput=performance.now();}};
  const move=(e:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);if(pointerY!==null){force+=(pointerY-e.clientY)*.02;pointerY=e.clientY;lastInput=performance.now();}};
  const down=(e:PointerEvent)=>{pointerY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);};const up=()=>{pointerY=null;};
  const leave=()=>{pointer.set(99,99);pointerY=null;};
  host.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',key);host.addEventListener('pointermove',move);host.addEventListener('pointerdown',down);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',leave);host.addEventListener('pointerleave',leave);host.addEventListener('lostpointercapture',up);
  const draw=(now:number)=>{if(disposed)return;const dt=Math.min((now-last)/1000,.05);last=now;if(now-lastInput>3000)force+=dt;force*=.95;
   raycaster.setFromCamera(pointer,camera);const hovered=raycaster.intersectObjects(cards.map(c=>c.mesh))[0]?.object;
   for(const card of cards){let z=card.z+force*dt*10;if(z>=50){const loops=Math.floor(z/50);z-=50*loops;card.index=(card.index+loops*8)%textures.length;}else if(z<0){const loops=Math.ceil(-z/50);z+=loops*50;card.index=((card.index-loops*8)%textures.length+textures.length)%textures.length;}card.z=(z%50+50)%50;
    const v=card.z/50,texture=textures[card.index],image=texture.image;const ratio=image?image.width/image.height:1;
    card.mesh.position.z=card.z-25;card.mesh.scale.set(ratio>1?2*ratio:2,ratio>1?2:2/ratio,1);
    let opacity=1;if(v<.05)opacity=0;else if(v<=.25)opacity=(v-.05)/.2;else if(v>=.4&&v<=.43)opacity=1-(v-.4)/.03;else if(v>.43)opacity=0;
    let blur=0;if(v<=.1)blur=8*(1-v/.1);else if(v>=.4&&v<=.43)blur=8*(v-.4)/.03;else if(v>.43)blur=8;
    const u=card.material.uniforms;u.map.value=texture;u.opacity.value=Math.max(0,Math.min(1,opacity));u.blurAmount.value=Math.max(0,Math.min(8,blur));u.scrollForce.value=force;u.time.value=now/1000;u.isHovered.value=hovered===card.mesh?1:0;
   }
   renderer.render(scene,camera);frame=requestAnimationFrame(draw);
  };frame=requestAnimationFrame(draw);
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();host.removeEventListener('wheel',wheel);window.removeEventListener('keydown',key);host.removeEventListener('pointermove',move);host.removeEventListener('pointerdown',down);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',leave);host.removeEventListener('pointerleave',leave);host.removeEventListener('lostpointercapture',up);textures.forEach(t=>t.dispose());cards.forEach(c=>c.material.dispose());geometry.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 if(unsupported)return <div className="h-screen w-full"><div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4"><p className="text-gray-600 mb-4">WebGL not supported. Showing image list:</p><div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">{artworkImages.map(image=><img key={image.src} src={image.src} alt={image.alt} className="w-full h-32 object-cover rounded"/>)}</div></div></div>;
 return <><div ref={ref} className="h-screen w-full" style={{touchAction:'none'}}/><div style={{position:'absolute',width:1,height:1,overflow:'hidden',pointerEvents:'none'}} aria-hidden="true">{artworkImages.map(image=><img key={image.src} src={image.src} alt={image.alt} />)}</div><style>{`@keyframes float{0%,100%{transform:translate(-50%,0) rotate(0deg)}50%{transform:translate(-50%,-25px) rotate(2deg)}}@keyframes blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-50px) scale(1.1)}66%{transform:translate(-20px,20px) scale(.9)}}@keyframes twinkle{0%,100%{transform:scale(.8);opacity:.4}50%{transform:scale(1.3);opacity:1}}.animate-blob{animation:blob 15s infinite alternate cubic-bezier(.4,0,.2,1)}.animate-twinkle{animation:twinkle 4s infinite ease-in-out}.animation-delay-2000{animation-delay:2s}.animation-delay-4000{animation-delay:4s}.animation-delay-6000{animation-delay:6s}`}</style></>;
}
