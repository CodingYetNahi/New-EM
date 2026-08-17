import { describe, expect, it } from 'vitest';
import { platformConfig, platformUrl } from './platform';
describe('platform configuration',()=>{it('keeps the marketing and student origins separate',()=>{expect(new URL(platformConfig.siteUrl).hostname).toBe('expressmock.in');expect(new URL(platformConfig.studentLoginUrl!).hostname).toBe('tests.expressmock.in')});it('builds product links from the one configured student URL',()=>{expect(platformUrl('/products/ibps-po')).toBe(`${platformConfig.studentLoginUrl}/products/ibps-po`)})});
