import { serve } from 'https://deno.land/std@0.188.0/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.188.0/http/file_server.ts';

const setHeaders = (res) => {
  res.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Server', 'LitServer');
  res.headers.set('X-Cufoon-Request', `time=${Date.now()}`);
  return res;
};

serve(async (req) => {
  const res = await serveDir(req, {
    fsRoot: './html'
  });
  return setHeaders(res);
});
