# blurhash-ms

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Using with docker

```bash
docker build -t blurhash-ms .
```

```bash
docker run -dp 127.0.0.1:3000:3000 blurhash-ms
```

And the bun server should be running on localhost:3000.
