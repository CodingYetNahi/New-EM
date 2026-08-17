import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Container({ children, className='' }: { children:ReactNode; className?:string }) { return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>; }
export function SectionTitle({ eyebrow, title, children, align='left' }: { eyebrow?:string; title:string; children?:ReactNode; align?:'left'|'center' }) { return <div className={`max-w-2xl ${align==='center'?'mx-auto text-center':''}`}><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{title}</h2>{children && <p className="mt-4 text-lg leading-8 text-slate-600">{children}</p>}</div>; }
export function InternalButton({ to, children, variant='primary', className='' }: { to:string; children:ReactNode; variant?:'primary'|'secondary'|'light'; className?:string }) { return <Link className={`button button-${variant} ${className}`} to={to}>{children}</Link>; }

type ExternalProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href:string|null; children:ReactNode; variant?:'primary'|'secondary'|'light' };
export function ExternalButton({ href, children, variant='primary', className='', ...props }: ExternalProps) {
  if (!href) return <span className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900"><AlertCircle size={17}/> Link not configured</span>;
  return <a className={`button button-${variant} ${className}`} href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}<ArrowRight size={17}/></a>;
}
export function PageHero({ eyebrow, title, children }: { eyebrow:string; title:string; children:ReactNode }) { return <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20"><Container><div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">{title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{children}</p></div></Container></section>; }
export function EmptyState({ children }: { children:ReactNode }) { return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-600">{children}</div>; }
