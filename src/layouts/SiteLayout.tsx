import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { platformConfig } from '../config/platform';
import { Container, ExternalButton } from '../components/UI';

const navigation = [{name:'Home',to:'/'},{name:'Exams',to:'/exams'},{name:'Test Series',to:'/test-series'},{name:'Pricing',to:'/pricing'},{name:'Blog',to:'/blog'},{name:'About',to:'/about'}];
const footer = [...navigation.slice(1), {name:'Contact',to:'/contact'}, {name:'Privacy Policy',to:'/privacy-policy'}, {name:'Terms',to:'/terms'}, {name:'Refund Policy',to:'/refund-policy'}];

export function SiteLayout() {
  const [open,setOpen]=useState(false); const location=useLocation();
  useEffect(()=>{ setOpen(false); window.scrollTo({top:0,behavior:'instant'}); },[location.pathname]);
  return <div className="min-h-screen bg-white text-slate-800">
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"><Container className="flex h-12 items-center justify-between py-1">
      <Link to="/" className="flex items-center gap-2 rounded-lg font-bold text-brand-900 focus-ring" aria-label="ExpressMock home"><img src={`${import.meta.env.BASE_URL}images/expressmock-logo.png`} alt="ExpressMock" className="h-auto w-[125px] sm:w-[145px]"/></Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">{navigation.map(item=><NavLink key={item.to} to={item.to} end={item.to==='/'} className={({isActive})=>`nav-link ${isActive?'nav-link-active':''}`}>{item.name}</NavLink>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><ExternalButton href={platformConfig.studentLoginUrl} variant="secondary">Student Login</ExternalButton><ExternalButton href={platformConfig.studentLoginUrl}>Get Started</ExternalButton></div>
      <button className="rounded-lg p-2 text-brand-900 focus-ring lg:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
    </Container>{open&&<div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden"><Container className="space-y-1 py-4">{navigation.map(item=><NavLink key={item.to} to={item.to} className="block rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">{item.name}</NavLink>)}<div className="grid gap-2 pt-3 sm:grid-cols-2"><ExternalButton href={platformConfig.studentLoginUrl} variant="secondary">Student Login</ExternalButton><ExternalButton href={platformConfig.studentLoginUrl}>Get Started</ExternalButton></div></Container></div>}</header>
    <main id="main-content"><Outlet/></main>
    <footer className="bg-brand-950 py-14 text-slate-300"><Container><div className="grid gap-10 md:grid-cols-[1.2fr_2fr]"><div><Link to="/" className="text-xl font-bold text-white">Express<span className="text-blue-400">Mock</span></Link><p className="mt-4 max-w-md leading-7">Focused preparation resources and access to mock tests for Indian competitive examinations.</p></div><nav className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Footer navigation">{footer.map(item=><Link className="rounded text-sm hover:text-white focus-ring" key={item.to} to={item.to}>{item.name}</Link>)}</nav></div><div className="mt-10 border-t border-slate-700 pt-7 text-sm leading-6"><p>ExpressMock is an independent examination preparation platform and is not affiliated with the examination conducting organizations unless explicitly stated.</p><p className="mt-3">© {new Date().getFullYear()} ExpressMock. Information should be verified against official notifications.</p></div></Container></footer>
  </div>;
}
