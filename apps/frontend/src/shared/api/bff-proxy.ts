import { getApiBaseUrl } from '@/shared/config/env';

const HOP_BY_HOP = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    'host',
    'content-encoding',
    'content-length',
]);

function copyRequestHeaders(source: Headers): Headers {
    const headers = new Headers();
    source.forEach((value, key) => {
        if(HOP_BY_HOP.has(key.toLowerCase())) return;
        headers.set(key,value);
    });
    return headers;
}

function copyResponseHeaders(source: Headers, contentType: string | null): Headers {
    const headers = new Headers();
    source.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if(HOP_BY_HOP.has(lowerKey) || lowerKey === 'set-cookie') return;
        headers.set(key,value);
    });
    for (const cookie of source.getSetCookie()) {
        headers.append('set-cookie', cookie);
    }
    if(contentType?.includes('text/event-stream')) {
        headers.set('cache-control', 'no-cache, no-transform');
        headers.set('x-accel-buffering', 'no');
        headers.set('content-type', 'text/event-stream');
    }
    return headers;
}

export async function proxyToApi(
    request: Request,
    pathSegments: readonly string[] | undefined,
): Promise<Response> {
    const apiBase = getApiBaseUrl();
    const suffix = pathSegments?.length ? pathSegments.join('/') : '';
    const upstreamUrl = new URL(`/api/v1/${suffix}`, `${apiBase}/`);
    const incomingUrl = new URL(request.url);
    upstreamUrl.search = incomingUrl.search;

    const method = request.method.toUpperCase();
    const hasBody = method !== 'GET' && method !== 'HEAD';
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const upstream = await fetch(upstreamUrl, {
        method,
        headers: copyRequestHeaders(request.headers),
        body,
        cache: 'no-store',
        redirect: 'manual',
    });

    const contentType = upstream.headers.get('content-type');
    return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: copyResponseHeaders(upstream.headers, contentType),
    })
}