import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectPage } from '../../components/projects';
import projects from '../../data/projects.json';
import articles from '../../data/articles.json';
import Home from '../../components/home';
import { JsonLd, pageMetadata, SITE_URL, absolute } from '../../lib/site';
const sections: Record<string,string> = {work:'works',timeline:'timeline',about:'about',contact:'contact'};

const aliases: Record<string,string> = {redminote12:'danaku',drivexdiwali:'14daypilot',marketplacecreatives:'reluv',bannerrefresh:'jetflow',artworks:'scalp'};
export const dynamicParams = false;
export function generateStaticParams() {
 return [...projects.map(p=>p.slug),...Object.keys(aliases),...Object.keys(sections)].map(slug=>({slug}));
}
const sectionTitles: Record<string,string> = {work:'Selected Projects',timeline:'Engineering Journey',about:'About',contact:'Contact'};

function projectMeta(project: typeof projects[number]) {
 const image = project.images[0];
 return pageMetadata({
  title: `${project.title} — ${project.category} | Petrus Handika`,
  description: `${project.summary} Case study of Petrus Handika's contribution, stack and code evidence.`.slice(0, 300),
  path: `/${project.slug}/`,
  ...(image ? { image: image.src, imageAlt: image.alt } : {}),
 });
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata> {
 const {slug}=await params;
 if(sections[slug]) {
  // Section URLs render the home page; canonical consolidates them onto the home URL.
  return pageMetadata({title:`${sectionTitles[slug]} | Petrus Handika`,description:'Petrus Handika is a full stack developer in Indonesia building web applications, APIs, data tools and AI workflows.',path:'/'});
 }
 const project=projects.find(p=>p.slug===(aliases[slug]||slug));
 if(!project) return {};
 // Legacy aliases share the target's canonical URL.
 return projectMeta(project);
}

export default async function Page({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 if(sections[slug]) return <Home initialSection={sections[slug]}/>;
 const project=projects.find(p=>p.slug===(aliases[slug]||slug));
 if(!project)notFound();
 const url = `${SITE_URL}/${project.slug}/`;
 const related = articles.filter(a=>a.project===project.slug);
 return <>
  <JsonLd data={{'@graph':[
   {'@type':'CreativeWork','@id':`${url}#work`,url,name:project.title,description:project.summary,genre:project.category,
    ...(project.images[0]?{image:absolute(project.images[0].src)}:{}),
    keywords:project.stack.join(', '),
    creator:{'@id':`${SITE_URL}/#person`,'@type':'Person',name:'Petrus Handika',url:`${SITE_URL}/`},
    ...(project.repository?{codeRepository:project.repository}:{}),
    ...(project.workType==='organization'?{sourceOrganization:{'@type':'Organization',name:project.organization}}:{})},
   {'@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:`${SITE_URL}/`},
    {'@type':'ListItem',position:2,name:project.title,item:url}]}]}}/>
  <ProjectPage project={project} articles={related.map(a=>({slug:a.slug,title:a.title,description:a.description}))}/>
 </>;
}
