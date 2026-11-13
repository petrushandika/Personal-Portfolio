import { notFound } from 'next/navigation';
import { ProjectPage } from '../../components/projects';
import projects from '../../data/projects.json';

const aliases: Record<string,string> = {redminote12:'danaku',drivexdiwali:'14daypilot',marketplacecreatives:'reluv',bannerrefresh:'jetflow',artworks:'scalp'};
export const dynamicParams = false;
export function generateStaticParams() {
 return [...projects.map(p=>p.slug),...Object.keys(aliases)].map(slug=>({slug}));
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const project=projects.find(p=>p.slug===(aliases[slug]||slug));
 if(!project)notFound();
 return <ProjectPage project={project}/>;
}
