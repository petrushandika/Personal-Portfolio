import type {Metadata} from 'next';
import Header from '../components/header';
import {SITE_URL, SITE_NAME} from '../lib/site';
import './globals.css';
export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:'Petrus Handika | Full Stack Developer (Web & AI)',template:'%s | Petrus Handika'},
 description:'Petrus Handika is a full stack developer in Indonesia building web applications, APIs, data tools and AI workflows.',
 applicationName:SITE_NAME,
 authors:[{name:'Petrus Handika',url:SITE_URL}],
 creator:'Petrus Handika',
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1}},
 formatDetection:{email:false,telephone:false,address:false},
};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className="scroll-smooth"><body className="__variable_ebdfad __variable_91eb3e font-quicksand antialiased"><Header/>{children}</body></html>}
