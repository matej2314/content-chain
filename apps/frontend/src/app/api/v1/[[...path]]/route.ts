import { proxyToApi } from '@/shared/api/bff-proxy';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

async function handle(request: Request, context: RouteContext): Promise<Response> {
  try {
    const { path } = await context.params;
    return await proxyToApi(request, path);
  } catch (reason: unknown) {
    const message = reason instanceof Error ? reason.message : 'Proxy failed';
    console.error(message);
    return Response.json({ code: 'INTERNAL_ERROR', message: 'Proxy failed' }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
export const HEAD = handle;
