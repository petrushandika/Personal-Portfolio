import type {Metadata} from 'next';
import Header from '../components/header';
import './globals.css';
export const metadata:Metadata={title:'Petrus Handika | Full Stack Developer',description:'Petrus Handika - Full stack developer based in Indonesia. Web applications, APIs, data and AI.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className="scroll-smooth"><body className="__variable_ebdfad __variable_91eb3e font-quicksand antialiased"><Header/>{children}</body></html>}
