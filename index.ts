import { homeRoute } from "./src/routes/home-route";

Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    switch (url.pathname) {
      case "/": return homeRoute(req);
    }

    return new Response(null, { status: 422 });
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  port: process.env.PORT || 3000,
});