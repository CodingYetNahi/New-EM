/* eslint-disable react-refresh/only-export-components */
import { Helmet } from 'react-helmet-async';
import { platformConfig } from '../config/platform';

interface SEOProps { title: string; description: string; path?: string; image?: string; noindex?: boolean; type?: 'website'|'article'; schema?: Record<string, unknown> | Record<string, unknown>[] }

export function SEO({ title, description, path = '/', image = '/images/blog-study-plan.svg', noindex = false, type = 'website', schema }: SEOProps) {
  const canonical = `${platformConfig.siteUrl}${path === '/' ? '' : path}`;
  const fullTitle = title.includes('ExpressMock') ? title : `${title} | ExpressMock`;
  const imageUrl = image.startsWith('http') ? image : `${platformConfig.siteUrl}${image}`;
  return <Helmet>
    <title>{fullTitle}</title><meta name="description" content={description}/><link rel="canonical" href={canonical}/>
    <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'}/>
    <meta property="og:type" content={type}/><meta property="og:site_name" content="ExpressMock"/><meta property="og:title" content={fullTitle}/><meta property="og:description" content={description}/><meta property="og:url" content={canonical}/><meta property="og:image" content={imageUrl}/>
    <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={fullTitle}/><meta name="twitter:description" content={description}/><meta name="twitter:image" content={imageUrl}/>
    {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
  </Helmet>;
}

export const organizationSchema = { '@context':'https://schema.org', '@type':'Organization', name:'ExpressMock', url:platformConfig.siteUrl, logo:`${platformConfig.siteUrl}/favicon.svg`, description:'Competitive-exam preparation and mock-test discovery platform for Indian examinations.' };

export function breadcrumbSchema(items: { name:string; path:string }[]) { return { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:items.map((item,index) => ({ '@type':'ListItem', position:index+1, name:item.name, item:`${platformConfig.siteUrl}${item.path}` })) }; }
