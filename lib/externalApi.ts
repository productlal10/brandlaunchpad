import { NextRequest, NextResponse } from 'next/server';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const LEGACY_EXTERNAL_API_BASE_URL = 'https://api.lal10.com';
const CURRENT_EXTERNAL_API_BASE_URL = 'https://api.erp.lal10.com';

function normalizeExternalApiUrl(value: string | null | undefined) {
  if (!value) {
    return value ?? null;
  }

  return value.startsWith(LEGACY_EXTERNAL_API_BASE_URL)
    ? `${CURRENT_EXTERNAL_API_BASE_URL}${value.slice(LEGACY_EXTERNAL_API_BASE_URL.length)}`
    : value;
}

export function joinUrl(base: string, path: string) {
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function resolveExternalApiUrl(explicitEnvKey: string, fallbackPath: string) {
  const explicitUrl = normalizeExternalApiUrl(process.env[explicitEnvKey]);
  if (explicitUrl) {
    return explicitUrl;
  }

  const baseUrl = normalizeExternalApiUrl(process.env.EXTERNAL_API_BASE_URL);
  if (!baseUrl) {
    return null;
  }

  return joinUrl(baseUrl, fallbackPath);
}

async function resolveExternalCsrfToken(req: NextRequest) {
  const explicitUrl = normalizeExternalApiUrl(process.env.EXTERNAL_AUTH_CSRF_URL);
  const baseUrl = normalizeExternalApiUrl(process.env.EXTERNAL_API_BASE_URL);
  const targetUrl = explicitUrl || (baseUrl ? joinUrl(baseUrl, '/api/launchpad/auth/csrf-token') : null);

  if (!targetUrl) {
    return null;
  }

  const cookie = req.headers.get('cookie');
  if (!cookie) {
    return null;
  }

  const headers = new Headers();
  headers.set('cookie', cookie);

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const userAgent = req.headers.get('user-agent');

  if (origin) headers.set('origin', origin);
  if (referer) headers.set('referer', referer);
  if (userAgent) headers.set('user-agent', userAgent);

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json().catch(() => null);
    if (!payload?.success || !payload?.csrfToken) {
      return null;
    }

    return String(payload.csrfToken);
  } catch (error) {
    console.warn('[External API] Unable to fetch CSRF token from upstream:', error);
    return null;
  }
}

export async function proxyToExternalApi(req: NextRequest, explicitEnvKey: string, fallbackPath: string) {
  const resolvedBaseUrl = resolveExternalApiUrl(explicitEnvKey, fallbackPath);
  if (!resolvedBaseUrl) {
    return null;
  }

  const queryString = req.nextUrl.search;
  const targetUrl = queryString
    ? `${resolvedBaseUrl}${resolvedBaseUrl.includes('?') ? '&' : ''}${queryString.replace(/^\?/, '')}`
    : resolvedBaseUrl;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('connection');
  headers.delete('content-length');

  const method = req.method.toUpperCase();
  const body = method === 'GET' || method === 'HEAD' ? undefined : await req.text();

  if (!SAFE_METHODS.has(method)) {
    const csrfToken = await resolveExternalCsrfToken(req);
    if (csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }
  }

  const response = await fetch(targetUrl, {
    method,
    headers,
    body,
    redirect: 'manual',
    cache: 'no-store',
  });

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'content-encoding' || lowerKey === 'transfer-encoding') {
      return;
    }
    responseHeaders.append(key, value);
  });

  const responseBody = method === 'HEAD' ? null : await response.arrayBuffer();
  return new NextResponse(responseBody, {
    status: response.status,
    headers: responseHeaders,
  });
}
