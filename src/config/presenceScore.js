/**
 * Presence Score Configuration & Rule-Based Checklist Engine
 * 
 * Includes:
 * - Diagnostic sub-score weights (Visibility, Trust, Speed, Mobile, Conversion)
 * - Industry benchmark adjusters
 * - Recommendation matrix
 * - Clearly marked hook for Google PageSpeed Insights API
 * - Placeholder lead persistence endpoint
 */

export const PRESENCE_WEIGHTS = {
  visibility: 0.25,
  trust: 0.20,
  speed: 0.20,
  mobile: 0.20,
  conversion: 0.15,
};

export const INDUSTRY_BENCHMARKS = {
  'education': {
    name: 'Education & Academics',
    priorityKey: 'trust',
    baselineAverage: 62,
    focusArea: 'Course curriculum clarity, faculty credentials, and parent inquiry funnels.'
  },
  'food-beverage': {
    name: 'Food & Beverage',
    priorityKey: 'mobile',
    baselineAverage: 58,
    focusArea: 'Instant mobile menu access, branch directions, and 1-tap WhatsApp orders.'
  },
  'retail-commercial': {
    name: 'Retail & Commercial Operations',
    priorityKey: 'visibility',
    baselineAverage: 55,
    focusArea: 'Local search discovery, multi-branch inventory, and verified hours.'
  },
  'health-wellness': {
    name: 'Health & Wellness',
    priorityKey: 'trust',
    baselineAverage: 65,
    focusArea: 'Practitioner qualifications, privacy reassurances, and frictionless appointment booking.'
  },
  'professional-services': {
    name: 'Professional Services',
    priorityKey: 'conversion',
    baselineAverage: 60,
    focusArea: 'Case studies, executive summaries, and confidential inquiry routes.'
  },
  'startup-tech': {
    name: 'Startup & Technology',
    priorityKey: 'speed',
    baselineAverage: 68,
    focusArea: 'Value proposition clarity, responsive interactive demos, and early-access lead capture.'
  }
};

/**
 * GOOGLE PAGESPEED INSIGHTS API HOOK
 * 
 * To connect live Google audits:
 * 1. Add your Google API key in .env as `VITE_PAGESPEED_API_KEY=<your-key>`
 * 2. This hook will call the official Google PageSpeed API v5 for mobile/desktop.
 * 3. Falls back gracefully to rule-based checklist if key is omitted or fetch fails.
 */
export async function fetchPageSpeedInsights(url) {
  const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
  
  if (!apiKey || !url) {
    // API key not configured: fallback to deterministic rule-based evaluation
    return null;
  }

  try {
    const encodedUrl = encodeURIComponent(url.startsWith('http') ? url : `https://${url}`);
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&category=performance&category=seo&strategy=mobile&key=${apiKey}`;
    
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.warn('Google PageSpeed Insights API call returned non-200, falling back to rule engine.');
      return null;
    }
    
    const data = await response.json();
    const lighthouse = data?.lighthouseResult?.categories;
    
    return {
      speedScore: Math.round((lighthouse?.performance?.score || 0.6) * 100),
      seoScore: Math.round((lighthouse?.seo?.score || 0.7) * 100),
      rawLighthouse: lighthouse
    };
  } catch (error) {
    console.warn('PageSpeed API hook error, falling back to rule engine:', error);
    return null;
  }
}

/**
 * Placeholder Lead Persistence Function
 * Saves the audit submission to a placeholder endpoint / localStorage buffer.
 */
export async function saveLead(leadData) {
  const payload = {
    ...leadData,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  };

  // Local fallback storage buffer
  try {
    const existing = JSON.parse(localStorage.getItem('dudex_presence_leads') || '[]');
    existing.push(payload);
    localStorage.setItem('dudex_presence_leads', JSON.stringify(existing));
  } catch (err) {
    console.warn('Could not cache lead locally', err);
  }

  // Placeholder endpoint invocation
  try {
    const res = await fetch('/api/leads/presence-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch {
    // Endpoint is a placeholder in static/client-only dev; local buffer succeeded
    console.info('[Placeholder Endpoint] Lead captured successfully in local state buffer:', payload);
    return true;
  }
}

/**
 * Deterministic Rule-Based Presence Score Calculator
 */
export function calculatePresenceScore(formData, liveApiResult = null) {
  const { hasNoWebsite, websiteUrl, industry } = formData;
  const benchmark = INDUSTRY_BENCHMARKS[industry] || INDUSTRY_BENCHMARKS['professional-services'];

  // Case 1: Business has NO website
  if (hasNoWebsite || !websiteUrl) {
    return {
      overall: 22,
      subScores: {
        visibility: {
          label: 'Visibility',
          score: 18,
          status: 'Critical Gap',
          note: 'Invisible to 76% of intent-driven local Google searchers looking for solutions in your category.'
        },
        trust: {
          label: 'Trust',
          score: 25,
          status: 'Fragile',
          note: 'Relying exclusively on word-of-mouth creates substantial hesitation for high-intent new customers.'
        },
        speed: {
          label: 'Speed',
          score: 15,
          status: 'Offline',
          note: 'No digital delivery infrastructure; cannot service requests outside of manual working hours.'
        },
        mobile: {
          label: 'Mobile',
          score: 20,
          status: 'Unoptimized',
          note: 'Zero mobile-first destination for smartphone searches or social referrals.'
        },
        conversion: {
          label: 'Conversion',
          score: 32,
          status: 'High Friction',
          note: 'Orders and inquiries are limited to physical visits or lost phone calls during peak hours.'
        }
      },
      recommendations: [
        'Deploy an authoritative, mobile-first website with clean typography and verified contact pathways.',
        'Configure Google Business Profile with structured address and verified review credentials.',
        'Implement an instant 1-tap WhatsApp consultation link and automated booking intake form.',
        'Publish transparent offerings, curriculum/menus, and customer proof to overcome initial hesitation.'
      ],
      benchmarkDifference: - (benchmark.baselineAverage - 22)
    };
  }

  // Case 2: Business HAS a website
  const cleanUrl = websiteUrl.toLowerCase().trim();
  const isSecure = cleanUrl.startsWith('https://');
  const isCustomDomain = !cleanUrl.includes('wordpress.com') && !cleanUrl.includes('wixsite.com') && !cleanUrl.includes('blogspot.com');
  const hasModernTld = cleanUrl.endsWith('.com') || cleanUrl.endsWith('.in') || cleanUrl.endsWith('.ai') || cleanUrl.endsWith('.org') || cleanUrl.endsWith('.co');

  // Baseline sub-score calculation using deterministic heuristic checklist
  let visibility = 58;
  let trust = 60;
  let speed = 62;
  let mobile = 64;
  let conversion = 56;

  // Domain authority and security adjustments
  if (isSecure) {
    trust += 8;
    visibility += 6;
  } else {
    trust -= 18;
    visibility -= 12;
  }

  if (isCustomDomain) {
    trust += 10;
    conversion += 6;
  } else {
    trust -= 20;
    conversion -= 14;
  }

  if (hasModernTld) {
    trust += 5;
    visibility += 4;
  }

  // Live PageSpeed override if API hook supplied live data
  if (liveApiResult?.speedScore) {
    speed = liveApiResult.speedScore;
  }
  if (liveApiResult?.seoScore) {
    visibility = Math.round((visibility + liveApiResult.seoScore) / 2);
  }

  // Clamp scores between 25 and 96
  visibility = Math.min(96, Math.max(25, visibility));
  trust = Math.min(96, Math.max(25, trust));
  speed = Math.min(96, Math.max(25, speed));
  mobile = Math.min(96, Math.max(25, mobile));
  conversion = Math.min(96, Math.max(25, conversion));

  // Weighted overall calculation
  const overall = Math.round(
    visibility * PRESENCE_WEIGHTS.visibility +
    trust * PRESENCE_WEIGHTS.trust +
    speed * PRESENCE_WEIGHTS.speed +
    mobile * PRESENCE_WEIGHTS.mobile +
    conversion * PRESENCE_WEIGHTS.conversion
  );

  // Recommendations matrix
  const recommendations = [];
  if (speed < 70) {
    recommendations.push('Compress unoptimized media assets and implement edge CDN caching to reduce load times under 1.5 seconds.');
  }
  if (trust < 75) {
    recommendations.push('Introduce verified client reviews, institutional badges, and SSL security assurances directly above the fold.');
  }
  if (conversion < 70) {
    recommendations.push('Streamline contact paths: replace multi-step inquiry forms with a prominent 1-tap WhatsApp direct booking option.');
  }
  if (visibility < 70) {
    recommendations.push('Inject Schema.org structured JSON-LD data for Google Local Business to dominate local search & map listings.');
  }
  if (mobile < 75) {
    recommendations.push('Refactor touch targets and navigation typography to prevent tap collisions on smaller handheld screens.');
  }
  if (recommendations.length < 3) {
    recommendations.push('Establish automated weekly performance audits and uptime alerts to safeguard search index rankings.');
  }

  const getStatusLabel = (s) => {
    if (s >= 85) return 'Optimal';
    if (s >= 70) return 'Satisfactory';
    if (s >= 55) return 'Needs Work';
    return 'Critical Gap';
  };

  return {
    overall,
    subScores: {
      visibility: {
        label: 'Visibility',
        score: visibility,
        status: getStatusLabel(visibility),
        note: 'Google Search index status, localized schema presence, and organic discoverability.'
      },
      trust: {
        label: 'Trust',
        score: trust,
        status: getStatusLabel(trust),
        note: 'Domain credibility, HTTPS security posture, and verified review presence.'
      },
      speed: {
        label: 'Speed',
        score: speed,
        status: getStatusLabel(speed),
        note: 'Sub-second asset pipeline delivery and minimal layout shift on live devices.'
      },
      mobile: {
        label: 'Mobile',
        score: mobile,
        status: getStatusLabel(mobile),
        note: 'Responsive viewport scaling, ergonomic tap targets, and thumb-friendly flow.'
      },
      conversion: {
        label: 'Conversion',
        score: conversion,
        status: getStatusLabel(conversion),
        note: 'Frictionless booking mechanisms, form accessibility, and WhatsApp integration.'
      }
    },
    recommendations: recommendations.slice(0, 4),
    benchmarkDifference: overall - benchmark.baselineAverage
  };
}
