const defaultSiteUrl = 'https://expressmock.in';

function safeHttpsUrl(value: string | undefined, label: string, fallback?: string): string | null {
  const candidate = value?.trim() || fallback;
  if (!candidate) return null;
  try {
    const parsed = new URL(candidate);
    const localDev = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    if (parsed.protocol !== 'https:' && !localDev) throw new Error('Production URLs must use HTTPS');
    return parsed.toString().replace(/\/$/, '');
  } catch {
    console.error(`[ExpressMock configuration] ${label} is missing or invalid.`);
    return null;
  }
}

export const platformConfig = Object.freeze({
  siteUrl: safeHttpsUrl(import.meta.env.VITE_SITE_URL, 'VITE_SITE_URL', defaultSiteUrl) ?? defaultSiteUrl,
  studentLoginUrl: safeHttpsUrl(import.meta.env.VITE_TESTPRESS_STUDENT_URL, 'VITE_TESTPRESS_STUDENT_URL', 'https://expressmock.testpress.in'),
  adminLoginUrl: safeHttpsUrl(import.meta.env.VITE_TESTPRESS_ADMIN_URL, 'VITE_TESTPRESS_ADMIN_URL'),
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || null,
  contactFormUrl: safeHttpsUrl(import.meta.env.VITE_CONTACT_FORM_URL, 'VITE_CONTACT_FORM_URL'),
});

export function platformUrl(path = ''): string | null {
  if (!platformConfig.studentLoginUrl) return null;
  return `${platformConfig.studentLoginUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
