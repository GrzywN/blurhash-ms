import { blurhashRoute } from './src/routes/blurhash-route';
import { homeRoute } from './src/routes/home-route';
import { log } from './src/utils/logger';

const port = process.env.PORT || 3000;

log(`Server is running on port ${port}`);

Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);

    switch (url.pathname) {
      case '/':
        return homeRoute(req);
      case '/blurhash':
        return await blurhashRoute(req);
    }

    return new Response(null, { status: 400 });
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
  port,
});
