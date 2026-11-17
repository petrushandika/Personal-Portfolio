import Home from '../components/home';
import {JsonLd, pageMetadata, personJsonLd, SITE_URL} from '../lib/site';
export const metadata=pageMetadata({
 title:'Petrus Handika | Full Stack Developer (Web & AI)',
 description:'Petrus Handika is a full stack developer in Indonesia. Selected projects in web applications, APIs, data tools and AI workflows, with code-backed case studies.',
 path:'/',
});
export default function Page(){return <>
 <JsonLd data={{'@graph':[personJsonLd(),{'@type':'WebSite','@id':`${SITE_URL}/#website`,url:`${SITE_URL}/`,name:'Petrus Handika',inLanguage:'en',publisher:{'@id':`${SITE_URL}/#person`}}]}}/>
 <Home/>
</>}
