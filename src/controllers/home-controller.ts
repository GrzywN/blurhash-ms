function get(request: Request): Response {
  return new Response('Bun HTTP server is running!');
}

export { get };
