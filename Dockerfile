FROM oven/bun:latest

WORKDIR /app

COPY package.json package.json
RUN bun install --ignore-scripts

COPY . .

EXPOSE 3000

CMD ["bun", "index.ts"]
